import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase-admin";
import { enrichFromRequest } from "@/lib/enrich-request";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const db = getDb();
    const enriched = enrichFromRequest(request);

    await Promise.all([
      db
        .collection("counters")
        .doc("downloads")
        .set({ count: FieldValue.increment(1) }, { merge: true }),
      db.collection("downloadEvents").add({
        createdAt: FieldValue.serverTimestamp(),
        ...enriched,
      }),
    ]);
  } catch (err) {
    console.error("Failed to record download event", err);
  }

  const url = new URL("/FocusDragon.dmg", request.url);
  return NextResponse.redirect(url, 302);
}
