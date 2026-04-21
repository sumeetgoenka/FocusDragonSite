import { NextResponse } from "next/server";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";

function getDb() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT env var not set");
    const serviceAccount = JSON.parse(raw);
    initializeApp({ credential: cert(serviceAccount) });
  }
  return getFirestore();
}

// Basic RFC-5322-ish check. Intentionally lenient — we'd rather store a
// slightly-malformed address than block a real lead because the regex was
// too strict. Downstream dedup/validation happens at export time.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Collection: `downloadLeads`
// Each doc:
//   {
//     email: string,            // lowercased, trimmed
//     createdAt: FieldValue,    // server timestamp
//     userAgent: string | null, // for later de-dup / bot filtering
//     referrer: string | null,
//     ip: string | null,        // vercel forward header, best-effort
//     version: string | null,   // the version the user downloaded
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
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to write download lead", err);
    // Never block the download over a logging failure — the client
    // proceeds to the DMG URL regardless of this response status.
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
