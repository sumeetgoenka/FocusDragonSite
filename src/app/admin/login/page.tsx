"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  useEffect(() => {
    const email = session?.user?.email?.toLowerCase();
    if (status === "authenticated" && (email === "anay.goenka@yallo.co" || email === "anaythetutor@gmail.com")) {
      router.replace("/admin");
    }
  }, [status, session, router]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-grid text-white">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-secondary" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center mb-9">
            <div className="dragon-glow rounded-3xl mb-6">
              <Image
                src="/icon.png"
                alt="FocusDragon"
                width={72}
                height={72}
                className="rounded-2xl"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(249,115,22,0.35)] bg-[rgba(249,115,22,0.08)] px-3 py-1 mb-4">
              <ShieldGlyph />
              <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[var(--accent)]">
                Admin
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight leading-[1.1] mb-2">
              <span className="gradient-text dragon-glow-text">Restricted access.</span>
            </h1>
            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
              Sign in with the admin Google account to view the
              FocusDragon dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-md p-5 space-y-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {error === "AccessDenied" && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
                That account isn&apos;t allowed.
              </div>
            )}

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/admin" })}
              className="group relative w-full flex items-center justify-center gap-3 rounded-xl bg-white text-black font-semibold text-sm py-3.5 transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_8px_24px_rgba(255,255,255,0.10)]"
            >
              <GoogleGlyph />
              <span>Continue with Google</span>
            </button>

            {status === "authenticated" && (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="w-full text-xs text-neutral-500 hover:text-white transition-colors py-2"
              >
                Sign out
              </button>
            )}
          </div>

          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.18em] text-neutral-600">
            FocusDragon · Admin
          </p>
        </div>
      </div>
    </main>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.614z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.892 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  );
}

function ShieldGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--accent)]" aria-hidden="true">
      <path fillRule="evenodd" d="M12 1.5a.75.75 0 0 1 .417.126c2.625 1.749 5.747 2.624 8.834 2.624a.75.75 0 0 1 .749.69 18.74 18.74 0 0 1-9.717 17.05.75.75 0 0 1-.566 0A18.74 18.74 0 0 1 2 4.94a.75.75 0 0 1 .749-.69c3.087 0 6.209-.875 8.834-2.624A.75.75 0 0 1 12 1.5Z" clipRule="evenodd" />
    </svg>
  );
}
