import { createBrowserClient } from "@supabase/ssr";

/// Browser-side Supabase client. Used inside `"use client"` components
/// for `signInWithOtp` modal flows where we need to read the response
/// directly. OAuth provider redirects (Google, Apple) go through the
/// server actions in `app/auth/start/actions.ts` instead — those return
/// the provider's authorize URL and we redirect to it.
export function getSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
