"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  deepLink: string;
  code: string;
}

export default function DeepLinkLauncher({ deepLink, code }: Props) {
  const [showManual, setShowManual] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.location.href = deepLink;
    const t1 = window.setTimeout(() => setShowManual(true), 1500);
    const t2 = window.setTimeout(() => setShowCopy(true), 5000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [deepLink]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-grid text-white">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-secondary" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md text-center">
          <div className="relative mx-auto mb-8 inline-flex">
            <div className="dragon-glow rounded-3xl">
              <Image
                src="/icon.png"
                alt="FocusDragon"
                width={88}
                height={88}
                className="rounded-2xl"
                priority
              />
            </div>
            <div
              className="absolute inset-0 -m-3 rounded-3xl border-2 border-[var(--accent)]/40 border-t-[var(--accent)] animate-spin"
              aria-hidden="true"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 leading-[1.1]">
            <span className="gradient-text dragon-glow-text">Opening FocusDragon…</span>
          </h1>
          <p className="text-sm text-neutral-400 mb-10 max-w-sm mx-auto leading-relaxed">
            Your dragon is waking up. You can close this tab once the app
            opens.
          </p>

          {showManual && (
            <a
              href={deepLink}
              className="download-btn inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold px-7 py-4 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
              <span>Open FocusDragon</span>
            </a>
          )}

          {showCopy && code && (
            <div className="mt-12 space-y-3">
              <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                Didn&apos;t open? Make sure FocusDragon is installed, then
                tap the button above. Or copy the sign-in code as a
                fallback.
              </p>
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]/60 backdrop-blur px-3.5 py-2 font-mono text-[11px] text-neutral-300 transition-colors hover:border-[rgba(249,115,22,0.4)] hover:text-white"
              >
                <span className="truncate max-w-[14rem]">{code}</span>
                <span className="text-[var(--accent)] font-sans font-semibold">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
            </div>
          )}

          <p className="mt-14 text-[10px] uppercase tracking-[0.18em] text-neutral-600">
            FocusDragon
          </p>
        </div>
      </div>
    </main>
  );
}
