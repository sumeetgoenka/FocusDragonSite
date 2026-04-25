import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Collection: `downloadLeads`
// Each doc:
//   {
//     email: string,
//     createdAt: FieldValue,
//     userAgent: string | null,
//     referrer: string | null,
//     ip: string | null,
//     country: string | null,    // Vercel x-vercel-ip-country (ISO-3166)
//     city: string | null,       // Vercel x-vercel-ip-city
//     region: string | null,     // Vercel x-vercel-ip-country-region
//     version: string | null,
//   }
export async function POST(req: Request) {
  let body: { email?: unknown; version?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!rawEmail || rawEmail.length > 254 || !EMAIL_RE.test(rawEmail)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const version = typeof body.version === "string" ? body.version.slice(0, 32) : null;

  try {
    const db = getDb();
    await db.collection("downloadLeads").add({
      email: rawEmail,
      version,
      createdAt: FieldValue.serverTimestamp(),
      userAgent: req.headers.get("user-agent"),
      referrer: req.headers.get("referer"),
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip"),
      country: req.headers.get("x-vercel-ip-country"),
      city: decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? "") || null,
      region: req.headers.get("x-vercel-ip-country-region"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to write download lead", err);
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
