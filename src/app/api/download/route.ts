import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const db = getDb();
    const country = request.headers.get("x-vercel-ip-country");
    const city =
      decodeURIComponent(request.headers.get("x-vercel-ip-city") ?? "") || null;
    const region = request.headers.get("x-vercel-ip-country-region");

    await Promise.all([
      db
        .collection("counters")
        .doc("downloads")
        .set({ count: FieldValue.increment(1) }, { merge: true }),
      db.collection("downloadEvents").add({
        createdAt: FieldValue.serverTimestamp(),
        country,
        city,
        region,
        userAgent: request.headers.get("user-agent"),
        referrer: request.headers.get("referer"),
      }),
    ]);
  } catch (err) {
    console.error("Failed to record download event", err);
  }

  const url = new URL("/FocusDragon.dmg", request.url);
  return NextResponse.redirect(url, 302);
}
