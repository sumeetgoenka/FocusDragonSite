"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "../../i18n/dictionary";
import { tpl } from "../../i18n/translations";

interface Props {
  d: Dict;
  version: string;
  className?: string;
  children: React.ReactNode;
  from?: string;
}

/// Locale-aware download CTA. Same lead-capture flow as the original
/// `DownloadButton`, but with every user-facing string driven from the
/// dictionary so non-English visitors see translated copy.
export default function DownloadButton({ d, version, className, children, from }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => requestAnimationFrame(() => inputRef.current?.focus()));
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function beginDownload() {
    window.location.href = from ? `/api/download?from=${encodeURIComponent(from)}` : "/api/download";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError(d.download.emailRequired);
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/download-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, version, from: from ?? null }),
      }).catch(() => {});
    } finally {
      setSubmitting(false);
      setOpen(false);
      beginDownload();
    }
  }

  function onSkip() {
    setOpen(false);
    beginDownload();
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="dl-modal-title"
            className="w-full max-w-md rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 shadow-2xl">
            <h3 id="dl-modal-title" className="text-2xl font-black tracking-tight mb-2">{d.download.modalTitle}</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-2">{d.download.modalLead}</p>
            <ul className="text-[var(--muted)] text-sm leading-relaxed mb-6 space-y-1.5 list-disc pl-5">
              <li>{d.download.modalBenefit1}</li>
              <li>{d.download.modalBenefit2}</li>
              <li>{d.download.modalBenefit3}</li>
            </ul>

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                ref={inputRef}
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                placeholder={d.download.emailPlaceholder}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
                className="w-full rounded-xl bg-black/40 border border-[var(--card-border)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 outline-none px-4 py-3 text-base text-white placeholder:text-neutral-500 transition-colors"
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-6 py-3.5 rounded-xl transition-colors"
              >
                {submitting ? d.download.starting : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {tpl(d.download.ctaVersion, { version })}
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button type="button" onClick={onSkip}
                className="text-[11px] text-neutral-500 hover:text-neutral-300 underline underline-offset-2 transition-colors">
                {d.download.skip}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
