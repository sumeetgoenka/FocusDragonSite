import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();

  const [counterSnap, leadsSnap, installsSnap] = await Promise.all([
    db.collection("counters").doc("downloads").get(),
    db.collection("downloadLeads").orderBy("createdAt", "desc").get(),
    db.collection("installs").get(),
  ]);

  const totalDownloads = (counterSnap.data()?.count as number | undefined) ?? 0;

  const leads = leadsSnap.docs.map((d) => {
    const x = d.data();
    return {
      id: d.id,
      email: x.email as string,
      version: (x.version as string | undefined) ?? null,
      country: (x.country as string | undefined) ?? null,
      city: (x.city as string | undefined) ?? null,
      ip: (x.ip as string | undefined) ?? null,
      createdAt: x.createdAt?.toDate?.()?.toISOString?.() ?? null,
    };
  });

  // Country breakdown
  const byCountry: Record<string, number> = {};
  for (const l of leads) {
    const k = l.country ?? "??";
    byCountry[k] = (byCountry[k] ?? 0) + 1;
  }
  const countries = Object.entries(byCountry)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  // Retention: count how many install UUIDs pinged within each window.
  // `installs` collection is upserted by /api/ping per active launch.
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  let active1d = 0, active7d = 0, active30d = 0;
  const versions: Record<string, number> = {};
  for (const d of installsSnap.docs) {
    const data = d.data();
    const lastSeenMs = data.lastSeenAt?.toDate?.()?.getTime?.() ?? 0;
    const age = now - lastSeenMs;
    if (age <= 1 * day) active1d++;
    if (age <= 7 * day) active7d++;
    if (age <= 30 * day) active30d++;
    const v = (data.version as string | undefined) ?? "unknown";
    versions[v] = (versions[v] ?? 0) + 1;
  }
  const totalInstalls = installsSnap.size;
  const retention7dPct = totalInstalls > 0 ? (active7d / totalInstalls) * 100 : 0;
  const retention30dPct = totalInstalls > 0 ? (active30d / totalInstalls) * 100 : 0;

  return NextResponse.json({
    totalDownloads,
    totalLeads: leads.length,
    leads,
    countries,
    installs: {
      total: totalInstalls,
      active1d,
      active7d,
      active30d,
      retention7dPct: Math.round(retention7dPct * 10) / 10,
      retention30dPct: Math.round(retention30dPct * 10) / 10,
      versions,
    },
  });
}
