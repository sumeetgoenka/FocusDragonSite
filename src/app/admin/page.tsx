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

async function loadDashboard() {
  const db = getDb();
  const [counterSnap, leadsSnap] = await Promise.all([
    db.collection("counters").doc("downloads").get(),
    db.collection("downloadLeads").orderBy("createdAt", "desc").get(),
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

  const byCountry: Record<string, number> = {};
  for (const l of leads) {
    const k = l.country ?? "??";
    byCountry[k] = (byCountry[k] ?? 0) + 1;
  }
  const countries = Object.entries(byCountry)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  return { totalDownloads, leads, countries };
}

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toISOString().slice(0, 16).replace("T", " ");
}

function flag(country: string | null) {
  if (!country || country.length !== 2) return "🌐";
  // ISO-3166-1 alpha-2 → regional indicator emoji
  const A = 0x1f1e6 - "A".charCodeAt(0);
  return String.fromCodePoint(...[...country.toUpperCase()].map((c) => c.charCodeAt(0) + A));
}

export default async function AdminHome() {
  const { totalDownloads, leads, countries } = await loadDashboard();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total downloads" value={totalDownloads.toLocaleString()} />
        <Stat label="Emails captured" value={leads.length.toLocaleString()} />
        <Stat
          label="Capture rate"
          value={
            totalDownloads > 0
              ? `${Math.round((leads.length / totalDownloads) * 100)}%`
              : "—"
          }
        />
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60 mb-3">
          Where in the world
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
          {countries.length === 0 && (
            <div className="px-4 py-3 text-sm opacity-60">No leads yet.</div>
          )}
          {countries.map((c) => (
            <div key={c.country} className="px-4 py-2 flex items-center justify-between text-sm">
              <span>
                <span className="mr-2 text-base">{flag(c.country)}</span>
                {c.country === "??" ? "Unknown" : c.country}
              </span>
              <span className="opacity-70">{c.count}</span>
            </div>
          ))}
        </div>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
      <div className="text-xs uppercase tracking-wide opacity-60">{label}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  );
}
