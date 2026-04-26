"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  version: string;
  /** Tailwind classes applied to the primary button (visual parity with
   *  whatever CTA this replaces). */
  className?: string;
  /** Optional renderProp for the button body so callers can inline an
   *  icon + arbitrary text without us shipping yet another variant. */
  children: React.ReactNode;
  /** CTA-source tag (e.g. "hero", "footer") forwarded to the download
   *  + lead endpoints so the admin can attribute conversions. */
  from?: string;
}

/**
 * Download CTA that opens a modal requiring an email BEFORE handing
 * over the DMG. Email is mandatory — the only escape is closing the
 * modal entirely (Esc / backdrop click), which means no download.
 *
 * Lead capture is fire-and-forget once a valid email is entered: if
 * POST /api/download-lead fails for any reason (network error,
 * Firebase outage), we still proceed to /api/download. Losing a lead
 * is better than blocking a user who already gave us their email.
 */
export default function DownloadButton({ version, className, children, from }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the email field when the modal opens so the user can
  // just start typing — the keyboard flow is one uninterrupted motion
  // from "click Download" to "type email, press Enter".
  useEffect(() => {
    if (open) {
      // Two-tick delay: one for React to mount, one for the browser
      // to paint before we steal focus. Without this, the focus() call
      // sometimes no-ops on Safari.
      requestAnimationFrame(() => requestAnimationFrame(() => inputRef.current?.focus()));
    }
  }, [open]);

  // Esc closes the modal. Keep it bound only while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function beginDownload() {
    // window.location assignment is the cleanest way to trigger a
    // same-origin navigation that Safari's popup blocker won't flag
    // as programmatic. /api/download issues a 302 to the versioned
    // DMG and increments the downloads counter.
    window.location.href = from ? `/api/download?from=${encodeURIComponent(from)}` : "/api/download";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email.");
      return;
    }

    setSubmitting(true);
    try {
      // Fire-and-forget — we intentionally don't gate the download
      // on a 200 response. If the lead capture fails, the download
      // still proceeds. This keeps the failure-mode user-friendly.
      await fetch("/api/download-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, version, from: from ?? null }),
      }).catch(() => {
        /* swallow — see comment above */
      });
    } finally {
      setSubmitting(false);
      setOpen(false);
      beginDownload();
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            // Click on the backdrop (not the card) closes. Matches
            // the muscle memory of every native macOS sheet.
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dl-modal-title"
            className="w-full max-w-md rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 shadow-2xl"
          >
            <h3
              id="dl-modal-title"
              className="text-2xl font-black tracking-tight mb-2"
            >
              Enter your email to download
            </h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
              We&apos;ll send the occasional release note and focus tip.
              No spam, unsubscribe any time.
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                ref={inputRef}
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full rounded-xl bg-black/40 border border-[var(--card-border)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none px-4 py-3 text-base text-white placeholder:text-neutral-500 transition-colors"
              />

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-6 py-3.5 rounded-xl transition-colors"
              >
                {submitting ? (
                  "Starting download…"
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download v{version}
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
