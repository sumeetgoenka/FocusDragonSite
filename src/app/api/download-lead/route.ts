import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase-admin";
import { enrichFromRequest } from "@/lib/enrich-request";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const enriched = enrichFromRequest(req);
    await db.collection("downloadLeads").add({
      email: rawEmail,
      version,
      createdAt: FieldValue.serverTimestamp(),
      ...enriched,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to write download lead", err);
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
