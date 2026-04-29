import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseServer } from "@/lib/supabase-server";
import { APP_DEEPLINK } from "@/lib/auth-contract";
import DeepLinkLauncher from "./DeepLinkLauncher";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface CallbackProps {
  searchParams: Promise<{
    code?: string | string[];
    profile_complete?: string | string[];
    error?: string | string[];
    error_description?: string | string[];
  }>;
}

function pick(v: string | string[] | undefined): string | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return typeof v === "string" ? v : null;
}

function ErrorScreen({ description }: { description: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-[var(--background)] text-white">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3">Sign-in failed</h1>
        <p className="text-sm text-[var(--muted)] mb-6">{description}</p>
        <a href="/auth/start" className="text-[var(--accent)] underline">Try again</a>
      </div>
    </main>
  );
}

export default async function CallbackPage({ searchParams }: CallbackProps) {
  const params = await searchParams;
  const oauthError = pick(params.error);
  if (oauthError) {
    return <ErrorScreen description={pick(params.error_description) ?? oauthError} />;
  }

  const supabase = await getSupabaseServer();

  // Step 1: if Supabase OAuth handed us a code, consume it server-side
  // to establish the SITE's session cookie. The same code cannot be
  // re-used by the app — it's single-use. We mint a fresh magic-link
  // OTP for the app below.
  const incomingCode = pick(params.code);
  if (incomingCode) {
    const { error } = await supabase.auth.exchangeCodeForSession(incomingCode);
    if (error) {
      return <ErrorScreen description={error.message} />;
    }
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/start");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) redirect("/auth/complete-profile");

  if (!user.email) {
    return <ErrorScreen description="No email on the account; cannot mint app token." />;
  }

  // Step 2: mint a fresh single-use OTP for the app via the admin API.
  // The site's session was already established above; this is an
  // additional auth artifact scoped to the app and unrelated to the
  // site's cookie session.
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
    return <ErrorScreen description={linkErr?.message ?? "Could not create app sign-in token."} />;
  }

  const tokenHash = linkData.properties.hashed_token;
  const deepLink = `${APP_DEEPLINK}?token_hash=${encodeURIComponent(tokenHash)}`;

  return <DeepLinkLauncher deepLink={deepLink} code={tokenHash} />;
}
