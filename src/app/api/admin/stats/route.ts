import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();

  const [counterSnap, leadsSnap] = await Promise.all([
    db.collection("counters").doc("downloads").get(),
    db.collection("downloadLeads").orderBy("createdAt", "desc").get(),
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

  return NextResponse.json({
    totalDownloads,
    totalLeads: leads.length,
    leads,
    countries,
  });
}
