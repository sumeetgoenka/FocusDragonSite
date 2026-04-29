import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { SITE_ORIGIN } from "@/lib/auth-contract";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/// OAuth callback — Route Handler so we can actually WRITE the session
/// cookies that `exchangeCodeForSession` produces. Server Components
/// can't write cookies in Next.js 15+; doing the exchange there would
/// silently no-op and leave the user signed-out, looping back to
/// /auth/start. (We learned that the hard way.)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const oauthError = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  if (oauthError) {
    const target = new URL("/auth/callback/error", SITE_ORIGIN);
    target.searchParams.set("description", errorDescription ?? oauthError);
    return NextResponse.redirect(target);
  }

  // Build a response we can attach cookies to. Then mint a Supabase
  // server client whose cookie adapter writes onto THIS response.
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(toSet: { name: string; value: string; options?: CookieOptions }[]) {
          for (const { name, value, options } of toSet) {
            response.cookies.set({ name, value, ...options });
          }
        },
      },
    },
  );

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const target = new URL("/auth/callback/error", SITE_ORIGIN);
      target.searchParams.set("description", error.message);
      return NextResponse.redirect(target);
    }
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/auth/start", SITE_ORIGIN));
  }

  // Profile check — gate to /auth/complete-profile if missing.
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const redirect = NextResponse.redirect(new URL("/auth/complete-profile", SITE_ORIGIN));
    // Carry forward the cookies we just wrote.
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  // Profile exists — mint a fresh single-use magic-link OTP for the
  // macOS app and redirect to the launch page that deep-links it.
  if (!user.email) {
    const target = new URL("/auth/callback/error", SITE_ORIGIN);
    target.searchParams.set("description", "No email on this account.");
    return NextResponse.redirect(target);
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: user.email,
  });

  if (linkErr || !linkData?.properties?.hashed_token) {
    const target = new URL("/auth/callback/error", SITE_ORIGIN);
    target.searchParams.set("description", linkErr?.message ?? "Could not mint app token.");
    return NextResponse.redirect(target);
  }

  const launchURL = new URL("/auth/launch", SITE_ORIGIN);
  launchURL.searchParams.set("token_hash", linkData.properties.hashed_token);

  const redirect = NextResponse.redirect(launchURL);
  response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
  return redirect;
}
