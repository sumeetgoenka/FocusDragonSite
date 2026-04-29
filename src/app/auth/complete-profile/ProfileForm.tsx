"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AGE_RANGES, type AgeRange } from "@/lib/auth-contract";

const AGE_LABELS: Record<AgeRange, string> = {
  under18: "Under 18",
  range18to24: "18–24",
  range25to34: "25–34",
  range35to44: "35–44",
  range45plus: "45+",
};

const ERROR_LABELS: Record<string, string> = {
  display_name_invalid: "Please enter a name between 1 and 60 characters.",
  age_confirm_required: "You need to confirm you're 16 or older.",
  age_range_invalid: "Pick a valid age range.",
  unauthenticated: "Your sign-in expired. Please sign in again.",
  server_error: "Something went wrong. Please try again.",
};

export default function ProfileForm() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [ageRange, setAgeRange] = useState<AgeRange | "none">("none");
  const [ageConfirm, setAgeConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (displayName.trim().length === 0) {
      setError("display_name_invalid");
      return;
    }
    if (!ageConfirm) {
      setError("age_confirm_required");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim(),
          ageRange: ageRange === "none" ? null : ageRange,
          ageConfirm: true,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "server_error");
        setSubmitting(false);
        return;
      }
      router.replace("/auth/callback?profile_complete=1");
    } catch {
      setError("server_error");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="displayName" className="block text-sm font-semibold mb-2">
          Your name
        </label>
        <input
          id="displayName"
          type="text"
          autoFocus
          required
          maxLength={60}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full rounded-lg bg-black/60 border border-[var(--card-border)] px-4 py-3 text-white outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div>
        <label htmlFor="ageRange" className="block text-sm font-semibold mb-2">
          Your age range <span className="text-neutral-500 font-normal">(optional)</span>
        </label>
        <select
          id="ageRange"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value as AgeRange | "none")}
          className="w-full rounded-lg bg-black/60 border border-[var(--card-border)] px-4 py-3 text-white outline-none focus:border-[var(--accent)]"
        >
          <option value="none">Prefer not to say</option>
          {AGE_RANGES.map((r) => (
            <option key={r} value={r}>{AGE_LABELS[r]}</option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 text-sm text-neutral-300 cursor-pointer">
        <input
          type="checkbox"
          checked={ageConfirm}
          onChange={(e) => setAgeConfirm(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--accent)]"
          required
        />
        <span>I'm 16 or older.</span>
      </label>

      {error && (
        <p className="text-sm text-red-400">{ERROR_LABELS[error] ?? ERROR_LABELS.server_error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold py-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Finishing…" : "Finish & open app"}
      </button>
    </form>
  );
}
