import { getDb } from "@/lib/firebase-admin";
import WorldMap from "./WorldMap";
import AreaChart from "./components/AreaChart";

export const dynamic = "force-dynamic";

interface Lead {
  id: string;
  email: string;
  version: string | null;
  country: string | null;
  city: string | null;
  createdAt: Date | null;
}

interface SupabaseUser {
  id: string;
  email: string | null;
  createdAt: Date | null;
  lastSignInAt: Date | null;
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
  visitorId: string | null;
  secondsToDownload: number | null;
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

function timeAgo(d: Date | null): string {
  if (!d) return "—";
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 30) return `${days}d ago`;
  return d.toISOString().slice(0, 10);
}

async function loadAccounts(): Promise<SupabaseUser[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url}/auth/v1/admin/users?per_page=1000`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { users?: Array<Record<string, unknown>> };
    return (data.users ?? []).map((u) => ({
      id: String(u.id ?? ""),
      email: (u.email as string) ?? null,
      createdAt: u.created_at ? new Date(u.created_at as string) : null,
      lastSignInAt: u.last_sign_in_at ? new Date(u.last_sign_in_at as string) : null,
    }));
  } catch {
    return [];
  }
}

async function loadDashboard() {
  const db = getDb();
  const [counterSnap, leadsSnap, eventsSnap, accounts] = await Promise.all([
    db.collection("counters").doc("downloads").get(),
    db.collection("downloadLeads").orderBy("createdAt", "desc").get(),
    db.collection("downloadEvents").orderBy("createdAt", "desc").limit(1000).get(),
    loadAccounts(),
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
      visitorId: (x.visitorId as string | undefined) ?? null,
      secondsToDownload: (x.secondsToDownload as number | undefined) ?? null,
      createdAt: x.createdAt?.toDate?.() ?? null,
    };
  });

  // ── Dedupe by visitor ──
  // Every download event carries a `visitorId` (hashed IP + UA + salt
  // by /api/download). Keep the EARLIEST event per visitor so each
  // person counts once, no matter how many times they hit Download.
  // Events without a visitorId (legacy / unhashable) fall through
  // individually so we don't drop them silently.
  const uniqueEvents: DownloadEvent[] = (() => {
    const byVisitor = new Map<string, DownloadEvent>();
    const orphans: DownloadEvent[] = [];
    for (const e of events) {
      if (!e.visitorId) {
        orphans.push(e);
        continue;
      }
      const existing = byVisitor.get(e.visitorId);
      if (
        !existing ||
        (e.createdAt &&
          existing.createdAt &&
          e.createdAt.getTime() < existing.createdAt.getTime())
      ) {
        byVisitor.set(e.visitorId, e);
      }
    }
    return [...byVisitor.values(), ...orphans];
  })();

  const taggedEvents = events.filter((e) => e.visitorId);
  const uniqueVisitors = new Set(taggedEvents.map((e) => e.visitorId)).size;
  const repeatClicks = Math.max(0, taggedEvents.length - uniqueVisitors);

  // Aggregate metrics use the deduped list — by-country / by-source /
  // hour-of-day / time series should reflect *people*, not click count.
  const downloadCountries = tally(uniqueEvents, (e) => e.country);
  const utmSources = tally(uniqueEvents, (e) => e.utmSource);
  const referrers = tally(uniqueEvents, (e) => hostFromReferrer(e.referrer));
  const languages = tally(uniqueEvents, (e) => e.language);
  const oses = tally(uniqueEvents, (e) => osFromUA(e.userAgent));
  const browsers = tally(uniqueEvents, (e) => browserFromUA(e.userAgent));
  const ctas = tally(uniqueEvents, (e) => e.fromCta);

  // Latency uses the deduped list: each person's first-download time
  // (further duplicates would just re-cycle the same lat measurement).
  const latencies = uniqueEvents
    .map((e) => e.secondsToDownload)
    .filter((s): s is number => typeof s === "number" && s >= 0 && s <= 86400)
    .sort((a, b) => a - b);
  const avgLatency = latencies.length
    ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
    : null;
  const medianLatency = latencies.length
    ? latencies[Math.floor(latencies.length / 2)]
    : null;

  // Hour-of-day in downloader's local timezone — deduped.
  const byHour: number[] = Array(24).fill(0);
  for (const e of uniqueEvents) {
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

  // Time series: last 30 days, unique downloaders per day (UTC).
  const dayKey = (d: Date) => d.toISOString().slice(0, 10);
  const byDay: Record<string, number> = {};
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    byDay[dayKey(d)] = 0;
  }
  for (const e of uniqueEvents) {
    if (!e.createdAt) continue;
    const k = dayKey(e.createdAt);
    if (k in byDay) byDay[k]++;
  }
  const timeSeries = Object.entries(byDay).map(([day, value]) => ({
    label: day.slice(5), // MM-DD
    value,
  }));

  const mapPoints = uniqueEvents
    .filter((e) => e.latitude != null && e.longitude != null)
    .map((e) => ({
      lat: e.latitude as number,
      lng: e.longitude as number,
      count: 1,
      city: e.city,
      country: e.country,
    }));

  // Combined activity feed
  const activity = [
    ...events.slice(0, 50).map((e) => ({
      kind: "download" as const,
      at: e.createdAt,
      label: [e.city, e.country].filter(Boolean).join(", ") || "Unknown",
      country: e.country,
      meta: e.utmSource ? `via ${e.utmSource}` : null,
    })),
    ...leads.slice(0, 50).map((l) => ({
      kind: "lead" as const,
      at: l.createdAt,
      label: l.email,
      country: l.country,
      meta: [l.city, l.country].filter(Boolean).join(", ") || null,
    })),
  ]
    .filter((a) => a.at)
    .sort((a, b) => (b.at as Date).getTime() - (a.at as Date).getTime())
    .slice(0, 25);

  const dayMs = 24 * 60 * 60 * 1000;
  const nowMs = Date.now();
  const accountsToday = accounts.filter(
    (u) => u.createdAt && nowMs - u.createdAt.getTime() < dayMs,
  ).length;
  const accounts7d = accounts.filter(
    (u) => u.createdAt && nowMs - u.createdAt.getTime() < 7 * dayMs,
  ).length;
  const recentAccounts = [...accounts]
    .filter((u) => u.createdAt)
    .sort(
      (a, b) =>
        (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime(),
    )
    .slice(0, 10);

  // Headline "Downloads" number reconciles two eras:
  //  - Events table (since 25 Apr 2026) — deduped per visitorId so a
  //    single person clicking Download 7 times only counts once.
  //  - Pre-events historical clicks — the counter was incrementing
  //    before the events table existed (commits d9f43e5 → 14e9bb7,
  //    11-day gap). We assume each of those untracked clicks is one
  //    person (best-guess; we have no visitorId to dedupe with) so
  //    they're added on top.
  // Both sources auto-balance as more events come in: as the events
  // table grows, the historical bucket shrinks toward zero. No
  // hardcoded numbers anywhere.
  const untrackedHistorical = Math.max(0, totalDownloads - events.length);
  const uniqueDownloads = uniqueEvents.length + untrackedHistorical;

  return {
    totalDownloads,
    uniqueDownloads,
    trackedDownloads: events.length,
    leads,
    downloadCountries,
    utmSources,
    referrers,
    languages,
    oses,
    browsers,
    ctas,
    byHour,
    timeSeries,
    mapPoints,
    uniqueVisitors,
    repeatClicks,
    taggedEventsCount: taggedEvents.length,
    avgLatency,
    medianLatency,
    activity,
    accountsTotal: accounts.length,
    accountsToday,
    accounts7d,
    recentAccounts,
  };
}

function fmtDuration(secs: number | null): string {
  if (secs == null) return "—";
  if (secs < 60) return `${secs}s`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ${secs % 60}s`;
  return `${Math.floor(secs / 3600)}h ${Math.floor((secs % 3600) / 60)}m`;
}

function flag(country: string | null) {
  if (!country || country.length !== 2) return "🌐";
  const A = 0x1f1e6 - "A".charCodeAt(0);
  return String.fromCodePoint(...[...country.toUpperCase()].map((c) => c.charCodeAt(0) + A));
}

function avatarFor(email: string): { initials: string; hue: number } {
  const initials = email.split("@")[0].slice(0, 2).toUpperCase();
  let h = 0;
  for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) >>> 0;
  return { initials, hue: h % 360 };
}

export default async function AdminHome() {
  const data = await loadDashboard();
  // Capture rate is now leads ÷ unique downloaders (people, not clicks).
  const captureRate = data.uniqueDownloads > 0
    ? Math.round((data.leads.length / data.uniqueDownloads) * 100)
    : 0;
  const last24h = data.activity.filter(
    (a) => a.at && Date.now() - (a.at as Date).getTime() < 24 * 60 * 60 * 1000,
  ).length;

  return (
    <div className="space-y-12">
      {/* Hero header */}
      <header className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-400/80 mb-2">
            Live overview
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome back.
          </h1>
          <p className="text-zinc-400 mt-1">
            {last24h > 0
              ? `${last24h} ${last24h === 1 ? "event" : "events"} in the last 24 hours.`
              : "No activity in the last 24 hours yet."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Pulse />
          <span className="text-xs text-zinc-400">
            Live · refreshes on reload
          </span>
        </div>
      </header>

      {/* Hero stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Downloads"
          value={data.uniqueDownloads.toLocaleString()}
          accent="from-orange-500/20 to-amber-500/0"
          icon={DownloadIcon}
        />
        <StatCard
          label="Accounts"
          value={data.accountsTotal.toLocaleString()}
          sub={
            data.accountsToday > 0
              ? `${data.accountsToday} new today · ${data.accounts7d} this week`
              : data.accounts7d > 0
                ? `${data.accounts7d} this week`
                : "no signups yet"
          }
          accent="from-sky-500/20 to-cyan-500/0"
          icon={AccountIcon}
        />
        <StatCard
          label="Email leads"
          value={data.leads.length.toLocaleString()}
          sub={`${captureRate}% capture rate`}
          accent="from-emerald-500/20 to-teal-500/0"
          icon={MailIcon}
        />
        <StatCard
          label="Unique visitors"
          value={data.uniqueVisitors.toLocaleString()}
          accent="from-indigo-500/20 to-violet-500/0"
          icon={UserIcon}
        />
        <StatCard
          label="Avg time-to-download"
          value={fmtDuration(data.avgLatency)}
          sub={data.medianLatency != null ? `median ${fmtDuration(data.medianLatency)}` : undefined}
          accent="from-fuchsia-500/20 to-pink-500/0"
          icon={ClockIcon}
        />
      </section>

      {/* Time series */}
      <Card>
        <CardHeader
          title="Downloads over time"
          subtitle="Last 30 days · UTC days"
        />
        <AreaChart points={data.timeSeries} />
      </Card>

      {/* World map */}
      <Card>
        <CardHeader
          title="Where in the world"
          subtitle={`${data.mapPoints.length.toLocaleString()} geo-tagged events`}
        />
        <WorldMap points={data.mapPoints} />
      </Card>

      {/* Two-column: Acquisition + Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Acquisition" subtitle="Where downloaders come from" />
          <div className="space-y-6">
            <SubGroup label="UTM source" empty="No UTM-tagged links yet — try ?utm_source=hn">
              <TallyBars rows={data.utmSources} accent="#f97316" />
            </SubGroup>
            <SubGroup label="Referrer">
              <TallyBars rows={data.referrers} accent="#6366f1" />
            </SubGroup>
            <SubGroup label="CTA clicked" empty="No tagged CTAs yet — try ?from=hero">
              <TallyBars rows={data.ctas} accent="#10b981" />
            </SubGroup>
          </div>
        </Card>

        <Card>
          <CardHeader title="Audience" subtitle="Who's downloading" />
          <div className="space-y-6">
            <SubGroup label="Country">
              <TallyBars
                rows={data.downloadCountries}
                accent="#f97316"
                renderKey={(k) => (
                  <>
                    <span className="mr-2 text-base">{flag(k)}</span>
                    {k === "—" ? "Unknown" : k}
                  </>
                )}
              />
            </SubGroup>
            <SubGroup label="Language">
              <TallyBars rows={data.languages} accent="#8b5cf6" />
            </SubGroup>
            <div className="grid grid-cols-2 gap-4">
              <SubGroup label="OS">
                <TallyBars rows={data.oses} accent="#06b6d4" max={4} />
              </SubGroup>
              <SubGroup label="Browser">
                <TallyBars rows={data.browsers} accent="#ec4899" max={4} />
              </SubGroup>
            </div>
          </div>
        </Card>
      </div>

      {/* Hour heatmap */}
      <Card>
        <CardHeader
          title="When do they download"
          subtitle="Hour of day · downloader local time"
        />
        <HourHeatmap counts={data.byHour} />
      </Card>

      {/* Recent signups */}
      <Card>
        <CardHeader
          title={`Recent signups (${data.accountsTotal})`}
          subtitle="Supabase auth.users · most recent first"
        />
        {data.recentAccounts.length === 0 ? (
          <p className="text-sm text-zinc-500 mt-3">No accounts yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-white/[0.06]">
            {data.recentAccounts.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between py-2.5 text-sm"
              >
                <span className="text-zinc-200 font-mono text-[13px]">
                  {u.email ?? u.id.slice(0, 8)}
                </span>
                <span className="text-zinc-500 tabular-nums">
                  {u.createdAt
                    ? `${timeAgo(u.createdAt)} · last seen ${
                        u.lastSignInAt ? timeAgo(u.lastSignInAt) : "never"
                      }`
                    : "—"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Activity feed + Leads side by side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Recent activity" subtitle="Live feed" />
          <ActivityFeed items={data.activity} />
        </Card>
        <Card className="lg:col-span-3 overflow-hidden">
          <CardHeader title={`Email leads (${data.leads.length})`} subtitle="People who shared an email" />
          <LeadsTable leads={data.leads} />
        </Card>
      </div>
    </div>
  );
}

/* ───────── components ───────── */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  accent: string;
  icon: () => React.ReactElement;
}) {
  return (
    <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} pointer-events-none`} />
      <div className="relative p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            {label}
          </span>
          <span className="text-zinc-500"><Icon /></span>
        </div>
        <div className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
          {value}
        </div>
        {sub && (
          <div className="mt-1 text-xs text-zinc-500">{sub}</div>
        )}
      </div>
    </div>
  );
}

function SubGroup({
  label,
  children,
  empty,
}: {
  label: string;
  children: React.ReactNode;
  empty?: string;
}) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-2">
        {label}
      </div>
      {children}
      {empty && (
        <ChildEmptyHint>{empty}</ChildEmptyHint>
      )}
    </div>
  );
}

function ChildEmptyHint({ children }: { children: React.ReactNode }) {
  // Renders only if no siblings rendered — simple visual fallback handled
  // via TallyBars empty state too. Kept for spec alignment.
  return <span className="hidden">{children}</span>;
}

function TallyBars({
  rows,
  accent,
  max = 8,
  renderKey,
}: {
  rows: { k: string; count: number }[];
  accent: string;
  max?: number;
  renderKey?: (k: string) => React.ReactNode;
}) {
  if (rows.length === 0) {
    return <div className="text-sm text-zinc-500">—</div>;
  }
  const top = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="space-y-1.5">
      {rows.slice(0, max).map(({ k, count }) => {
        const pct = (count / top) * 100;
        return (
          <div key={k} className="relative h-7 rounded-md overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-md"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(to right, ${accent}33, ${accent}11)`,
                borderRight: `1px solid ${accent}55`,
              }}
            />
            <div className="relative flex items-center justify-between h-full px-2.5 text-[13px]">
              <span className="truncate text-zinc-200">
                {renderKey ? renderKey(k) : k === "—" ? <span className="text-zinc-500">—</span> : k}
              </span>
              <span className="text-zinc-400 tabular-nums ml-3">{count}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HourHeatmap({ counts }: { counts: number[] }) {
  const max = Math.max(1, ...counts);
  return (
    <div>
      <div className="grid grid-cols-24 gap-1" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
        {counts.map((c, h) => {
          const intensity = c / max;
          const bg =
            c === 0
              ? "rgba(255,255,255,0.03)"
              : `rgba(249,115,22,${0.18 + intensity * 0.7})`;
          return (
            <div key={h} className="flex flex-col items-center gap-1.5">
              <div
                className="w-full aspect-square rounded-md border border-white/5"
                style={{ background: bg }}
                title={`${h.toString().padStart(2, "0")}:00 — ${c} downloads`}
              />
              <span className="text-[9px] text-zinc-600 tabular-nums">{h}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-3 text-[10px] text-zinc-500">
        <span>Less</span>
        <div className="flex gap-0.5">
          {[0.18, 0.35, 0.55, 0.75, 0.9].map((a) => (
            <div
              key={a}
              className="w-3 h-3 rounded-sm"
              style={{ background: `rgba(249,115,22,${a})` }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

interface ActivityItem {
  kind: "download" | "lead";
  at: Date | null;
  label: string;
  country: string | null;
  meta: string | null;
}

function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return <div className="text-sm text-zinc-500">No activity yet.</div>;
  }
  return (
    <ol className="space-y-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-white/[0.02] transition"
        >
          <div
            className={`flex-shrink-0 mt-0.5 h-7 w-7 rounded-full flex items-center justify-center text-xs ${
              it.kind === "lead"
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-orange-500/15 text-orange-300"
            }`}
          >
            {it.kind === "lead" ? "✉" : "↓"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm truncate">
                <span className="mr-1">{flag(it.country)}</span>
                {it.label}
              </span>
              <span className="text-[11px] text-zinc-500 flex-shrink-0">
                {timeAgo(it.at)}
              </span>
            </div>
            {it.meta && (
              <div className="text-[11px] text-zinc-500 mt-0.5">{it.meta}</div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return <div className="text-sm text-zinc-500">No leads yet.</div>;
  }
  return (
    <div className="-mx-6 -mb-6">
      <div className="max-h-[480px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.15em] text-zinc-500 sticky top-0 backdrop-blur">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Lead</th>
              <th className="text-left px-4 py-3 font-medium">Where</th>
              <th className="text-left px-4 py-3 font-medium">Version</th>
              <th className="text-right px-6 py-3 font-medium">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((l) => {
              const { initials, hue } = avatarFor(l.email);
              return (
                <tr key={l.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                        style={{
                          background: `hsl(${hue} 70% 30% / 0.5)`,
                          color: `hsl(${hue} 90% 80%)`,
                          border: `1px solid hsl(${hue} 70% 50% / 0.3)`,
                        }}
                      >
                        {initials}
                      </div>
                      <span className="text-zinc-200 truncate">{l.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    <span className="mr-1.5">{flag(l.country)}</span>
                    {[l.city, l.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {l.version ? (
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-[11px] text-zinc-400 font-mono">
                        v{l.version}
                      </span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right text-zinc-500 text-xs tabular-nums">
                    {timeAgo(l.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Pulse() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
    </span>
  );
}

/* ───────── icons (inline svg, no deps) ───────── */

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}
function AccountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6" />
      <path d="M22 11h-6" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}
