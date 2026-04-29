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
    redirect("/?error=bad-challenge");
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-grid text-white">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-secondary" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="dragon-glow rounded-3xl mb-7">
              <Image
                src="/icon.png"
                alt="FocusDragon"
                width={96}
                height={96}
                className="rounded-2xl"
                priority
              />
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-[1.1]">
              <span className="gradient-text dragon-glow-text">Wake your dragon.</span>
            </h1>

            <p className="text-base text-neutral-400 max-w-sm leading-relaxed">
              Sign in once and your blocks, stats, and dragon stay yours —
              across reinstalls and, soon, across devices.
            </p>
          </div>

          <StartCard />

          <div className="mt-7 flex items-center justify-center gap-5 text-[11px] text-neutral-500 select-none">
            <TrustItem icon="lock" label="Privacy-first" />
            <TrustDot />
            <TrustItem icon="eye-slash" label="No tracking" />
            <TrustDot />
            <TrustItem icon="drive" label="Local-first" />
          </div>

          <details className="mt-9 mx-auto max-w-sm rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]/60 backdrop-blur px-5 py-3.5 text-xs text-neutral-400 transition-colors hover:border-[rgba(249,115,22,0.35)] [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-neutral-300 transition-colors hover:text-white select-none">
              Why do I need an account?
              <svg className="w-3.5 h-3.5 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="m9 5 7 7-7 7"/>
              </svg>
            </summary>
            <p className="mt-3 leading-relaxed text-neutral-400">
              Your dragon carries your blocks, your stats, and your streak.
              The account is how it follows you when you reinstall today —
              and onto your phone when the iOS companion lands. Nothing of
              what you block leaves your Mac.
            </p>
          </details>

          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.18em] text-neutral-600">
            FocusDragon
          </p>
        </div>
      </div>
    </main>
  );
}

function TrustItem({ icon, label }: { icon: "lock" | "eye-slash" | "drive"; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <TrustIcon name={icon} />
      <span>{label}</span>
    </span>
  );
}

function TrustDot() {
  return <span className="h-[3px] w-[3px] rounded-full bg-neutral-700" aria-hidden="true" />;
}

function TrustIcon({ name }: { name: "lock" | "eye-slash" | "drive" }) {
  const path = (() => {
    switch (name) {
      case "lock":
        return "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-3 .75v9.75A2.25 2.25 0 0 0 6.75 22.5h10.5a2.25 2.25 0 0 0 2.25-2.25v-9.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25Z";
      case "eye-slash":
        return "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88";
      case "drive":
        return "M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3m-13.5 0v2.25a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3v-2.25";
    }
  })();

  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
