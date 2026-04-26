import { getDb } from "@/lib/firebase-admin";
import WorldMap from "./WorldMap";

export const dynamic = "force-dynamic";

interface Lead {
  id: string;
  email: string;
  version: string | null;
  country: string | null;
  city: string | null;
  createdAt: Date | null;
}

interface DownloadEvent {
  country: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  language: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  fromCta: string | null;
  referrer: string | null;
  userAgent: string | null;
  createdAt: Date | null;
}

function osFromUA(ua: string | null): string {
  if (!ua) return "Unknown";
  if (/Mac OS X 1[5-9]|Mac OS X 2[0-9]/.test(ua)) return "macOS 15+";
  if (/Mac OS X 14/.test(ua)) return "macOS 14";
  if (/Mac OS X 13/.test(ua)) return "macOS 13";
  if (/Mac OS X 12/.test(ua)) return "macOS 12";
  if (/Mac OS X/.test(ua)) return "macOS (older)";
  if (/Windows/.test(ua)) return "Windows";
  if (/Linux/.test(ua)) return "Linux";
  if (/iPhone|iPad/.test(ua)) return "iOS";
  return "Other";
}

function browserFromUA(ua: string | null): string {
  if (!ua) return "Unknown";
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  return "Other";
}

function hostFromReferrer(ref: string | null): string {
  if (!ref) return "(direct)";
  try {
    const u = new URL(ref);
    if (u.hostname.endsWith("focusdragon.app")) return "(internal)";
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "(invalid)";
  }
}

function tally<T>(items: T[], key: (t: T) => string | null | undefined) {
  const m: Record<string, number> = {};
  for (const it of items) {
    const k = key(it) ?? "—";
    m[k] = (m[k] ?? 0) + 1;
  }
  return Object.entries(m)
    .map(([k, count]) => ({ k, count }))
    .sort((a, b) => b.count - a.count);
}

async function loadDashboard() {
  const db = getDb();
  const [counterSnap, leadsSnap, eventsSnap] = await Promise.all([
    db.collection("counters").doc("downloads").get(),
    db.collection("downloadLeads").orderBy("createdAt", "desc").get(),
    db.collection("downloadEvents").orderBy("createdAt", "desc").limit(1000).get(),
  ]);

  const totalDownloads = (counterSnap.data()?.count as number | undefined) ?? 0;

  const leads: Lead[] = leadsSnap.docs.map((d) => {
    const x = d.data();
    return {
      id: d.id,
      email: x.email as string,
      version: (x.version as string | undefined) ?? null,
      country: (x.country as string | undefined) ?? null,
      city: (x.city as string | undefined) ?? null,
      createdAt: x.createdAt?.toDate?.() ?? null,
    };
  });

  const events: DownloadEvent[] = eventsSnap.docs.map((d) => {
    const x = d.data();
    return {
      country: (x.country as string | undefined) ?? null,
      city: (x.city as string | undefined) ?? null,
      latitude: (x.latitude as number | undefined) ?? null,
      longitude: (x.longitude as number | undefined) ?? null,
      timezone: (x.timezone as string | undefined) ?? null,
      language: (x.language as string | undefined) ?? null,
      utmSource: (x.utmSource as string | undefined) ?? null,
      utmCampaign: (x.utmCampaign as string | undefined) ?? null,
      fromCta: (x.fromCta as string | undefined) ?? null,
      referrer: (x.referrer as string | undefined) ?? null,
      userAgent: (x.userAgent as string | undefined) ?? null,
      createdAt: x.createdAt?.toDate?.() ?? null,
    };
  });

  const downloadCountries = tally(events, (e) => e.country);
  const leadCountries = tally(leads, (l) => l.country);
  const utmSources = tally(events, (e) => e.utmSource);
  const referrers = tally(events, (e) => hostFromReferrer(e.referrer));
  const languages = tally(events, (e) => e.language);
  const oses = tally(events, (e) => osFromUA(e.userAgent));
  const browsers = tally(events, (e) => browserFromUA(e.userAgent));
  const ctas = tally(events, (e) => e.fromCta);

  // Hour-of-day in user's local timezone (best-effort).
  // Falls back to UTC hour when tz is missing.
  const byHour: number[] = Array(24).fill(0);
  for (const e of events) {
    if (!e.createdAt) continue;
    let hour: number;
    if (e.timezone) {
      try {
        hour = Number(
          new Intl.DateTimeFormat("en-US", {
            timeZone: e.timezone,
            hour: "numeric",
            hour12: false,
          }).format(e.createdAt),
        );
      } catch {
        hour = e.createdAt.getUTCHours();
      }
    } else {
      hour = e.createdAt.getUTCHours();
    }
    if (Number.isFinite(hour) && hour >= 0 && hour < 24) byHour[hour]++;
  }

  const mapPoints = events
    .filter((e) => e.latitude != null && e.longitude != null)
    .map((e) => ({
      lat: e.latitude as number,
      lng: e.longitude as number,
      count: 1,
      city: e.city,
      country: e.country,
    }));

  return {
    totalDownloads,
    trackedDownloads: events.length,
    leads,
    downloadCountries,
    leadCountries,
    utmSources,
    referrers,
    languages,
    oses,
    browsers,
    ctas,
    byHour,
    mapPoints,
  };
}

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toISOString().slice(0, 16).replace("T", " ");
}

function flag(country: string | null) {
  if (!country || country.length !== 2) return "🌐";
  const A = 0x1f1e6 - "A".charCodeAt(0);
  return String.fromCodePoint(...[...country.toUpperCase()].map((c) => c.charCodeAt(0) + A));
}

export default async function AdminHome() {
  const data = await loadDashboard();
  const captureRate = data.totalDownloads > 0
    ? Math.round((data.leads.length / data.totalDownloads) * 100)
    : 0;
  const maxHour = Math.max(1, ...data.byHour);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total downloads" value={data.totalDownloads.toLocaleString()} />
        <Stat label="Emails captured" value={`${data.leads.length} (${captureRate}%)`} />
        <Stat
          label="Geo-tagged downloads"
          value={data.trackedDownloads.toLocaleString()}
          hint={
            data.trackedDownloads < data.totalDownloads
              ? `${data.totalDownloads - data.trackedDownloads} pre-tracking`
              : undefined
          }
        />
      </div>

      <section>
        <H2>World map</H2>
        <WorldMap points={data.mapPoints} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <H2>Downloads by country</H2>
          <Tally rows={data.downloadCountries} renderKey={(k) => (
            <><span className="mr-2 text-base">{flag(k)}</span>{k === "—" ? "Unknown" : k}</>
          )} empty="No tracked downloads yet." />
        </section>

        <section>
          <H2>UTM source</H2>
          <Tally rows={data.utmSources} empty="No UTM-tagged links yet. Tag your launch URLs (e.g. ?utm_source=hn&utm_campaign=launch)." />
        </section>

        <section>
          <H2>Top referrers</H2>
          <Tally rows={data.referrers} empty="No referrer data yet." />
        </section>

        <section>
          <H2>CTA clicked</H2>
          <Tally rows={data.ctas} empty="No tagged CTAs yet. Add ?from=hero to download buttons." />
        </section>

        <section>
          <H2>Language</H2>
          <Tally rows={data.languages} empty="No language data yet." />
        </section>

        <section>
          <H2>OS / Browser</H2>
          <div className="grid grid-cols-2 gap-3">
            <Tally rows={data.oses} empty="No OS data." />
            <Tally rows={data.browsers} empty="No browser data." />
          </div>
        </section>
      </div>

      <section>
        <H2>Hour of day (downloader local time)</H2>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
          <div className="flex items-end gap-1 h-24">
            {data.byHour.map((c, h) => (
              <div key={h} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-orange-500/60 rounded-sm"
                  style={{ height: `${Math.max(2, (c / maxHour) * 100)}%` }}
                  title={`${h}:00 — ${c}`}
                />
                <span className="text-[9px] opacity-50">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <H2>Email leads ({data.leads.length})</H2>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wide opacity-60">
              <tr>
                <th className="text-left px-4 py-2">When (UTC)</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Where</th>
                <th className="text-left px-4 py-2">Version</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.leads.map((l) => (
                <tr key={l.id}>
                  <td className="px-4 py-2 font-mono text-xs opacity-70">{fmt(l.createdAt)}</td>
                  <td className="px-4 py-2">{l.email}</td>
                  <td className="px-4 py-2">
                    <span className="mr-1">{flag(l.country)}</span>
                    {[l.city, l.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-2 opacity-70">{l.version ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-3">
      {children}
    </h2>
  );
}

function Tally({
  rows,
  empty,
  renderKey,
}: {
  rows: { k: string; count: number }[];
  empty: string;
  renderKey?: (k: string) => React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
      {rows.length === 0 && (
        <div className="px-4 py-3 text-sm opacity-60">{empty}</div>
      )}
      {rows.slice(0, 12).map(({ k, count }) => (
        <div key={k} className="px-4 py-2 flex items-center justify-between text-sm">
          <span className="truncate">{renderKey ? renderKey(k) : k}</span>
          <span className="opacity-70">{count}</span>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
      <div className="text-xs uppercase tracking-wide opacity-60">{label}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-xs opacity-50 mt-1">{hint}</div>}
    </div>
  );
}
