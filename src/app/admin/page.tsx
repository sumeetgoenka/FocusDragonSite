import { getDb } from "@/lib/firebase-admin";

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
  createdAt: Date | null;
}

async function loadDashboard() {
  const db = getDb();
  const [counterSnap, leadsSnap, eventsSnap] = await Promise.all([
    db.collection("counters").doc("downloads").get(),
    db.collection("downloadLeads").orderBy("createdAt", "desc").get(),
    db.collection("downloadEvents").orderBy("createdAt", "desc").limit(500).get(),
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
      createdAt: x.createdAt?.toDate?.() ?? null,
    };
  });

  // Combined country breakdown — every download (anonymous OR with email)
  // shows up here. Leads are a strict subset of events going forward, but
  // we count by source to keep the math honest.
  const downloadsByCountry: Record<string, number> = {};
  for (const e of events) {
    const k = e.country ?? "??";
    downloadsByCountry[k] = (downloadsByCountry[k] ?? 0) + 1;
  }
  const downloadCountries = Object.entries(downloadsByCountry)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  // Lead-only country breakdown (the historical view)
  const leadsByCountry: Record<string, number> = {};
  for (const l of leads) {
    const k = l.country ?? "??";
    leadsByCountry[k] = (leadsByCountry[k] ?? 0) + 1;
  }
  const leadCountries = Object.entries(leadsByCountry)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalDownloads,
    trackedDownloads: events.length,
    leads,
    downloadCountries,
    leadCountries,
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
  const { totalDownloads, trackedDownloads, leads, downloadCountries, leadCountries } =
    await loadDashboard();

  const captureRate = totalDownloads > 0
    ? Math.round((leads.length / totalDownloads) * 100)
    : 0;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total downloads" value={totalDownloads.toLocaleString()} />
        <Stat label="Emails captured" value={`${leads.length} (${captureRate}%)`} />
        <Stat
          label="Geo-tagged downloads"
          value={trackedDownloads.toLocaleString()}
          hint={
            trackedDownloads < totalDownloads
              ? `${totalDownloads - trackedDownloads} pre-tracking`
              : undefined
          }
        />
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-3">
          Downloads by country (anonymous, all clicks)
        </h2>
        <CountryList rows={downloadCountries} empty="No tracked downloads yet — first download after this deploy will land here." />
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-3">
          Email leads by country
        </h2>
        <CountryList rows={leadCountries} empty="No email leads yet." />
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-3">
          Emails ({leads.length})
        </h2>
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
              {leads.map((l) => (
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

function CountryList({
  rows,
  empty,
}: {
  rows: { country: string; count: number }[];
  empty: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
      {rows.length === 0 && (
        <div className="px-4 py-3 text-sm opacity-60">{empty}</div>
      )}
      {rows.map((c) => (
        <div key={c.country} className="px-4 py-2 flex items-center justify-between text-sm">
          <span>
            <span className="mr-2 text-base">{flag(c.country)}</span>
            {c.country === "??" ? "Unknown" : c.country}
          </span>
          <span className="opacity-70">{c.count}</span>
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
