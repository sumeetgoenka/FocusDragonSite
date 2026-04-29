import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import StartCard from "./StartCard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PKCE_COOKIE = "fd_pkce_challenge";
const PKCE_TTL_SECONDS = 15 * 60;

interface StartProps {
  searchParams: Promise<{ challenge?: string | string[] }>;
}

/// Sign-in entry point. Reached when the macOS app opens
/// `https://www.focusdragon.app/auth/start?challenge=<base64url>`. We
/// stash the challenge in an httpOnly cookie so 01.4 can read it when
/// minting the one-time `focusdragon://auth/callback?code=…` deep-link.
export default async function StartPage({ searchParams }: StartProps) {
  const params = await searchParams;
  const challengeRaw = Array.isArray(params.challenge) ? params.challenge[0] : params.challenge;

  // PKCE challenge format: base64url, 43-128 chars per RFC 7636. Reject
  // anything outside that range so we don't pin a malformed value.
  const challenge = typeof challengeRaw === "string" && /^[A-Za-z0-9_-]{43,128}$/.test(challengeRaw)
    ? challengeRaw
    : null;

  if (challenge) {
    const jar = await cookies();
    jar.set(PKCE_COOKIE, challenge, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: PKCE_TTL_SECONDS,
    });
  } else if (challengeRaw) {
    // Caller passed a challenge but it failed validation — bounce them
    // back to the homepage rather than silently signing them in without
    // the round-trip token. The macOS app will surface the failure.
    redirect("/?error=bad-challenge");
  }

  // No challenge param at all is allowed (web-only sign-in path); the
  // page still renders the buttons, just without a deep-link payload
  // for 01.4 to forward to the app.

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-16 bg-[var(--background)] text-white">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-10">
          <Image src="/icon.png" alt="FocusDragon" width={56} height={56} className="rounded-xl mb-5" />
          <h1 className="text-2xl font-bold tracking-tight">Sign in to FocusDragon</h1>
          <p className="mt-2 text-sm text-[var(--muted)] max-w-sm">
            Sign in to start using FocusDragon on this Mac.
          </p>
        </div>

        <StartCard />

        <details className="mt-8 text-xs text-[var(--muted)]">
          <summary className="cursor-pointer hover:text-white transition-colors select-none">
            Why do I need an account?
          </summary>
          <p className="mt-3 leading-relaxed">
            Your account keeps your blocks safe across reinstalls, lets us sync
            your settings to other Macs you use, and lays the groundwork for the
            iOS companion app. We never sell your data, and you can delete your
            account from inside FocusDragon at any time.
          </p>
        </details>
      </div>
    </main>
  );
}
