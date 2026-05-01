import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

/// Anonymous active-install heartbeat.
///
/// The macOS app POSTs `{ uuid, version }` at most once per 12h. We upsert
/// a doc per UUID — `firstSeenAt` is set once, `lastSeenAt` updates every
/// ping. No IP, no country, no PII; the UUID lives in the user's own
/// UserDefaults and never leaves their machine in any other context.
///
/// Read side: /api/admin/stats counts how many UUIDs have a lastSeenAt
/// within the last 1d / 7d / 30d to compute retention.
export async function POST(request: Request) {
  let uuid: string | undefined;
  let version: string | undefined;

  try {
    const body = (await request.json()) as { uuid?: unknown; version?: unknown };
    if (typeof body.uuid === "string" && /^[0-9A-F-]{36}$/i.test(body.uuid)) {
      uuid = body.uuid;
    }
    if (typeof body.version === "string" && body.version.length <= 16) {
      version = body.version;
    }
  } catch {
    // Malformed body — silently drop.
  }

  if (!uuid) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const db = getDb();
    const ref = db.collection("installs").doc(uuid);
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const now = FieldValue.serverTimestamp();
      const update: Record<string, unknown> = {
        lastSeenAt: now,
        version: version ?? null,
      };
      if (!snap.exists || !snap.data()?.firstSeenAt) {
        update.firstSeenAt = now;
      }
      tx.set(ref, update, { merge: true });
    });
  } catch (err) {
    console.error("Failed to record install ping", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
