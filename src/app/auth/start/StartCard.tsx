"use client";

import { useState, useTransition } from "react";
import { signInWithProvider, signInWithEmail } from "./actions";

type EmailState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent"; message: string }
  | { kind: "error"; message: string };

/// Three sign-in buttons + an inline email panel. The provider buttons
/// trigger server actions that respond with a Supabase-issued redirect;
/// the email button posts an email and renders the "check your inbox"
/// state on success.
export default function StartCard() {
  const [showEmail, setShowEmail] = useState(false);
  const [emailState, setEmailState] = useState<EmailState>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  function startProvider(provider: "google" | "apple") {
    startTransition(async () => {
      try {
        await signInWithProvider(provider);
      } catch (e) {
        // redirect() throws by design — catch real errors only.
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
    <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6 space-y-3">
      <button
        type="button"
        disabled={pending}
        onClick={() => startProvider("google")}
        className="w-full flex items-center justify-center gap-3 rounded-lg border border-[var(--card-border)] bg-white text-black font-medium text-sm py-3 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <GoogleGlyph />
        Continue with Google
      </button>

      {/* Apple Sign-In deferred — re-enable when AUTH_APPLE_* secrets land. */}

      {!showEmail ? (
        <button
          type="button"
          onClick={() => setShowEmail(true)}
          className="w-full rounded-lg border border-[var(--card-border)] bg-transparent text-white font-medium text-sm py-3 hover:bg-white/5 transition-colors"
        >
          Continue with email
        </button>
      ) : emailState.kind === "sent" ? (
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] p-4 text-sm">
          <div className="font-medium text-white mb-1">Check your email</div>
          <div className="text-[var(--muted)]">{emailState.message}</div>
        </div>
      ) : (
        <form action={submitEmail} className="space-y-2">
          <input
            name="email"
            type="email"
            required
            autoFocus
            placeholder="you@example.com"
            disabled={emailState.kind === "submitting"}
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-white text-sm px-3 py-2.5 placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={emailState.kind === "submitting"}
            className="w-full rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-medium text-sm py-2.5 transition-colors disabled:opacity-60"
          >
            {emailState.kind === "submitting" ? "Sending…" : "Send magic link"}
          </button>
          {emailState.kind === "error" && (
            <p className="text-xs text-red-400">{emailState.message}</p>
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

function AppleGlyph() {
  return (
    <svg width="16" height="18" viewBox="0 0 14 17" fill="currentColor" aria-hidden="true">
      <path d="M11.624 8.998c-.013-2.05 1.673-3.038 1.749-3.085-.952-1.392-2.435-1.582-2.964-1.604-1.262-.128-2.464.744-3.105.744-.643 0-1.626-.724-2.674-.703C3.272 4.37 2.044 5.06 1.37 6.179c-1.4 2.422-.359 6.005 1.005 7.973.668.96 1.464 2.039 2.51 2-1.008-.04-1.39-.65-2.605-.65-1.215 0-1.557.63-2.51.67-1.045.04-1.84-1.038-2.516-2C-3.41 12.187-4.21 7.66-2.66 4.58A4.516 4.516 0 0 1 1.176 2.4c.973-.018 1.886.654 2.477.654.591 0 1.703-.808 2.873-.69.49.02 1.866.198 2.751 1.493-.071.044-1.643.96-1.625 2.864zM9.594 1.39C10.17.703 10.554-.244 10.45-1.18c-.804.033-1.776.535-2.366 1.222-.532.61-.997 1.575-.872 2.5.892.07 1.806-.451 2.382-1.152z" transform="translate(2 1)"/>
    </svg>
  );
}
