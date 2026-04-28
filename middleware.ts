import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./src/app/i18n/locales";

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_SET = new Set<string>(LOCALES);

/**
 * Routing middleware.
 *
 * - Bare URL "/" or any path missing a known locale prefix → detect
 *   the user's preferred locale (cookie > Accept-Language > default
 *   English) and 302 to "/<locale>/<rest>".
 * - URLs already prefixed with a locale pass through untouched.
 * - /api, /admin, /onboard, /_next, static files: skipped entirely.
 *   /admin and /onboard stay English-only (private dashboard +
 *   extension onboarding flows).
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/onboard") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/opengraph-image" ||
    pathname.startsWith("/icon.") ||
    pathname.startsWith("/apple-icon.") ||
    pathname === "/favicon.ico" ||
    pathname === "/FocusDragon.dmg" ||
    pathname === "/appcast.xml" ||
    pathname.startsWith("/releases/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && LOCALE_SET.has(first)) {
    const res = NextResponse.next();
    res.headers.set("x-pathname", pathname);
    return res;
  }

  const locale = pickLocale(req);
  const target = new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, req.url);
  return NextResponse.redirect(target);
}

function pickLocale(req: NextRequest): string {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && LOCALE_SET.has(cookie)) return cookie;

  const accept = req.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase() ?? "";
    if (!tag) continue;
    if (LOCALE_SET.has(tag)) return tag;
    const primary = tag.split("-")[0];
    if (primary && LOCALE_SET.has(primary)) return primary;
  }

  return DEFAULT_LOCALE;
}

export const config = {
  matcher: ["/((?!_next|api|admin|onboard|.*\\..*).*)"],
};
