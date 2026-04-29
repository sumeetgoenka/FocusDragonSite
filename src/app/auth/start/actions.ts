"use server";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase-server";
import { SITE_ORIGIN } from "@/lib/auth-contract";

const REDIRECT_TO = `${SITE_ORIGIN}/auth/callback`;

/// Kick off the Supabase OAuth flow for Google or Apple. Returns the
/// provider's authorize URL via `redirect()`; the page calling this
/// action navigates the browser to it. The PKCE challenge sourced from
/// the macOS app is already in the `fd_pkce_challenge` httpOnly cookie
/// (set by `/auth/start/page.tsx`), so 01.4's callback can mint the
/// one-time code without re-deriving anything.
export async function signInWithProvider(provider: "google" | "apple") {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: REDIRECT_TO,
      // Supabase handles its own PKCE for the OAuth round-trip; the
      // app-side challenge in fd_pkce_challenge is a separate layer
      // used only for the final focusdragon:// deep-link in 01.4.
    },
  });

  if (error || !data?.url) {
    throw new Error(error?.message ?? "OAuth provider returned no URL");
  }

  redirect(data.url);
}

/// Send a magic-link to the supplied email. The link lands at
/// `/auth/callback` (01.4) which exchanges the OTP for a session.
export async function signInWithEmail(formData: FormData): Promise<{ ok: boolean; message: string }> {
  const raw = formData.get("email");
  if (typeof raw !== "string") {
    return { ok: false, message: "Missing email." };
  }
  const email = raw.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That doesn't look like an email." };
  }

  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: REDIRECT_TO },
  });

  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true, message: "Check your email — the link expires in 15 minutes." };
}
