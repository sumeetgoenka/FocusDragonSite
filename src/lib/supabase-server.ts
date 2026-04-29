import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/// Server-side Supabase client bound to the current request's cookie jar.
/// Use from server components, route handlers, and server actions.
///
/// Env vars come from 01.1 (`NEXT_PUBLIC_SUPABASE_URL`,
/// `NEXT_PUBLIC_SUPABASE_ANON_KEY`). The anon key is safe in shared
/// JS bundles — RLS is the gate, not key secrecy.
export async function getSupabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(toSet: { name: string; value: string; options?: CookieOptions }[]) {
          for (const { name, value, options } of toSet) {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // Read-only contexts (server components) throw; ignore.
            }
          }
        },
      },
    },
  );
}
