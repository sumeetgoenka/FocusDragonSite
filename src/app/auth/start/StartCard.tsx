"use client";

import { useState, useTransition } from "react";
import { signInWithProvider, signInWithEmail } from "./actions";

type EmailState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent"; message: string }
  | { kind: "error"; message: string };

export default function StartCard() {
  const [showEmail, setShowEmail] = useState(false);
  const [emailState, setEmailState] = useState<EmailState>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  function startProvider(provider: "google" | "apple") {
    startTransition(async () => {
      try {
        await signInWithProvider(provider);
      } catch (e) {
        if (e instanceof Error && e.message.startsWith("NEXT_REDIRECT")) return;
        setEmailState({ kind: "error", message: e instanceof Error ? e.message : "Sign-in failed." });
      }
    });
  }

  async function submitEmail(formData: FormData) {
    setEmailState({ kind: "submitting" });
    const res = await signInWithEmail(formData);
    setEmailState(res.ok ? { kind: "sent", message: res.message } : { kind: "error", message: res.message });
  }

  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-md p-5 space-y-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <button
        type="button"
        disabled={pending}
        onClick={() => startProvider("google")}
        className="group relative w-full flex items-center justify-center gap-3 rounded-xl bg-white text-black font-semibold text-sm py-3.5 transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_8px_24px_rgba(255,255,255,0.10)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <GoogleGlyph />
        <span>Continue with Google</span>
      </button>

      {/* Apple Sign-In deferred — re-enable when AUTH_APPLE_* secrets land. */}

      {!showEmail ? (
        <button
          type="button"
          onClick={() => setShowEmail(true)}
          className="group relative w-full flex items-center justify-center gap-2.5 rounded-xl border border-[var(--card-border)] bg-transparent text-white font-medium text-sm py-3.5 transition-all duration-200 hover:border-[rgba(249,115,22,0.5)] hover:bg-[rgba(249,115,22,0.06)]"
        >
          <MailGlyph />
          <span>Continue with email</span>
        </button>
      ) : emailState.kind === "sent" ? (
        <div className="rounded-xl border border-[rgba(249,115,22,0.35)] bg-[rgba(249,115,22,0.06)] p-4 text-sm">
          <div className="flex items-center gap-2 font-semibold text-white mb-1">
            <CheckGlyph />
            <span>Check your email</span>
          </div>
          <div className="text-neutral-400 text-xs leading-relaxed">{emailState.message}</div>
        </div>
      ) : (
        <form action={submitEmail} className="space-y-2.5">
          <input
            name="email"
            type="email"
            required
            autoFocus
            placeholder="you@example.com"
            disabled={emailState.kind === "submitting"}
            className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--background)] text-white text-sm px-4 py-3 placeholder:text-neutral-600 transition-colors focus:outline-none focus:border-[rgba(249,115,22,0.6)] focus:bg-black"
          />
          <button
            type="submit"
            disabled={emailState.kind === "submitting"}
            className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold text-sm py-3 transition-all duration-200 hover:shadow-[0_6px_24px_rgba(249,115,22,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {emailState.kind === "submitting" ? (
              <>
                <Spinner />
                <span>Sending magic link…</span>
              </>
            ) : (
              <span>Send magic link</span>
            )}
          </button>
          {emailState.kind === "error" && (
            <p className="text-xs text-red-400 px-1">{emailState.message}</p>
          )}
        </form>
      )}
    </div>
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

function MailGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75 12 13.5l9.75-6.75M3.75 18.75h16.5a1.5 1.5 0 0 0 1.5-1.5v-10.5a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5Z" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(249,115,22)" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
      <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4Z" />
    </svg>
  );
}
