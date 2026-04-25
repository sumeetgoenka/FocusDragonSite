import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_EMAIL = "anay.goenka@yallo.co";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login + auth callbacks are always reachable.
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token?.email?.toLowerCase() !== ADMIN_EMAIL) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
