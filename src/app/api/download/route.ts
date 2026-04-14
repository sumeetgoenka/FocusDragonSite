import { NextResponse } from "next/server";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

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

export async function GET(request: Request) {
  try {
    const db = getDb();
    await db
      .collection("counters")
      .doc("downloads")
      .set({ count: FieldValue.increment(1) }, { merge: true });
  } catch (err) {
    console.error("Failed to increment download counter", err);
  }

  const url = new URL("/FocusDragon.dmg", request.url);
  return NextResponse.redirect(url, 302);
}
