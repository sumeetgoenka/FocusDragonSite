import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { LOCALES, DEFAULT_LOCALE } from "./app/i18n/locales";

const ADMIN_EMAILS = new Set([
  "anay.goenka@yallo.co",
  "anaythetutor@gmail.com",
]);

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_SET = new Set<string>(LOCALES);

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Admin auth — gate /admin and /api/admin (login + next-auth callbacks pass through).
  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) &&
    !pathname.startsWith("/admin/login")
  ) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const email = token?.email?.toLowerCase();
    if (!email || !ADMIN_EMAILS.has(email)) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Skip i18n routing for non-page paths.
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
  matcher: ["/((?!_next|.*\\..*).*)", "/api/admin/:path*"],
};
