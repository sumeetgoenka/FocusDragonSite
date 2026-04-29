"use client";

import { useEffect, useState } from "react";

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
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-[var(--background)] text-white">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 h-10 w-10 rounded-full border-2 border-neutral-700 border-t-[var(--accent)] animate-spin" aria-hidden />
        <h1 className="text-2xl font-bold tracking-tight mb-2">Opening FocusDragon…</h1>
        <p className="text-sm text-[var(--muted)] mb-8">
          You can close this tab once the app opens.
        </p>

        {showManual && (
          <a
            href={deepLink}
            className="inline-block rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold px-6 py-3 transition-colors"
          >
            Open FocusDragon
          </a>
        )}

        {showCopy && code && (
          <div className="mt-10 text-xs text-[var(--muted)]">
            <p className="mb-3">
              Didn&apos;t open? Copy this code into the app&apos;s manual sign-in field.
            </p>
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center gap-2 rounded-md border border-[var(--card-border)] bg-black/40 px-3 py-2 font-mono text-xs text-white hover:border-[var(--accent)] transition-colors"
            >
              <span className="truncate max-w-[14rem]">{code}</span>
              <span className="text-[var(--accent)]">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
