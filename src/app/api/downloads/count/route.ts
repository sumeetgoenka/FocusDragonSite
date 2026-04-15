import { NextResponse } from "next/server";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

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

export async function GET() {
  try {
    const db = getDb();
    const snap = await db.collection("counters").doc("downloads").get();
    const count = (snap.data()?.count as number | undefined) ?? 0;
    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
    );
  } catch (err) {
    console.error("Failed to read download count", err);
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
