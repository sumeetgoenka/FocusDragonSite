import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

const text = fs.readFileSync(".env.local", "utf8");
const m = text.match(/^FIREBASE_SERVICE_ACCOUNT=(['"])(.+)\1$/m);
let raw = m[2];
raw = raw.slice(0, raw.lastIndexOf("}") + 1);
initializeApp({ credential: cert(JSON.parse(raw)) });

const db = getFirestore();
const snap = await db.collection("downloadLeads").get();
console.log(`Backfilling geo for ${snap.size} leads…`);

for (const doc of snap.docs) {
  const data = doc.data();
  if (data.country) {
    console.log(`  skip ${data.email} (already has country=${data.country})`);
    continue;
  }
  if (!data.ip) {
    console.log(`  skip ${data.email} (no ip)`);
    continue;
  }
  try {
    const r = await fetch(`http://ip-api.com/json/${data.ip}?fields=status,country,countryCode,regionName,city`);
    const j = await r.json();
    if (j.status !== "success") {
      console.log(`  fail ${data.email}: ${j.message ?? "unknown"}`);
      continue;
    }
    await doc.ref.update({
      country: j.countryCode ?? null,
      city: j.city ?? null,
      region: j.regionName ?? null,
    });
    console.log(`  ok   ${data.email} → ${j.city}, ${j.country} (${j.countryCode})`);
    await new Promise(r => setTimeout(r, 1500));
  } catch (e) {
    console.log(`  err  ${data.email}: ${e.message}`);
  }
}
console.log("done.");
