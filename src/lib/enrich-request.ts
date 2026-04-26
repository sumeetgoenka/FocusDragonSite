// Shared request-enrichment helpers used by /api/download and
// /api/download-lead. Pulls Vercel geo headers + UTM params + browser
// hints into a single object the routes spread into Firestore.

import { createHash } from "crypto";

export interface EnrichedRequest {
  country: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  language: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  fromCta: string | null;
  userAgent: string | null;
  referrer: string | null;
  ip: string | null;
  // SHA256(ip + ua + salt), first 16 hex chars. Stable per
  // (network, browser) so we can de-dupe repeat clicks without
  // storing the raw IP in a way that's trivially reversible.
  visitorId: string | null;
  // Seconds between the first page view (cookie set client-side)
  // and this request. null if cookie is missing or malformed.
  secondsToDownload: number | null;
}

function asNumber(s: string | null): number | null {
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function firstAcceptedLanguage(header: string | null): string | null {
  if (!header) return null;
  // "en-GB,en;q=0.9,fr;q=0.7" → "en-GB"
  const first = header.split(",")[0]?.split(";")[0]?.trim();
  return first || null;
}

function parseLandedAt(cookieHeader: string | null): number | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [k, v] = part.trim().split("=");
    if (k === "fd_landed_at") {
      const ms = Number(v);
      return Number.isFinite(ms) && ms > 0 ? ms : null;
    }
  }
  return null;
}

function hashVisitor(ip: string | null, ua: string | null): string | null {
  if (!ip && !ua) return null;
  const salt = process.env.VISITOR_HASH_SALT ?? process.env.NEXTAUTH_SECRET ?? "fd-default-salt";
  return createHash("sha256")
    .update(`${ip ?? ""}|${ua ?? ""}|${salt}`)
    .digest("hex")
    .slice(0, 16);
}

export function enrichFromRequest(req: Request): EnrichedRequest {
  const url = new URL(req.url);
  const params = url.searchParams;
  const h = req.headers;

  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip");
  const userAgent = h.get("user-agent");
  const visitorId = hashVisitor(ip, userAgent);

  const landedAt = parseLandedAt(h.get("cookie"));
  const secondsToDownload =
    landedAt != null ? Math.max(0, Math.round((Date.now() - landedAt) / 1000)) : null;

  return {
    country: h.get("x-vercel-ip-country"),
    city: decodeURIComponent(h.get("x-vercel-ip-city") ?? "") || null,
    region: h.get("x-vercel-ip-country-region"),
    latitude: asNumber(h.get("x-vercel-ip-latitude")),
    longitude: asNumber(h.get("x-vercel-ip-longitude")),
    timezone: h.get("x-vercel-ip-timezone"),
    language: firstAcceptedLanguage(h.get("accept-language")),
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmContent: params.get("utm_content"),
    utmTerm: params.get("utm_term"),
    fromCta: params.get("from"),
    userAgent,
    referrer: h.get("referer"),
    ip,
    visitorId,
    secondsToDownload,
  };
}
