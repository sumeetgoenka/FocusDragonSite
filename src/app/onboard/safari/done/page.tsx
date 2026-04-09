import type { Metadata } from "next";
import { StepIndicator } from "../_components";

export const metadata: Metadata = {
  title: "You're set up! | FocusDragon",
  description:
    "The FocusDragon Safari extension is fully configured and ready to block.",
};

export default function DonePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator current={4} />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/40 rounded-full px-4 py-2 mb-6 text-sm">
          <span className="text-[var(--accent)]">✓ All three permissions granted</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          You&apos;re{" "}
          <span className="gradient-text dragon-glow-text">good to go</span>
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-xl mx-auto">
          Your Safari extension is correctly configured. Return to the
          FocusDragon app — you can now create blocks for any website.
        </p>
      </div>

      <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-12 mb-8">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <Stat icon="✅" label="Extension enabled" />
          <Stat icon="🌐" label="Allowed on every website" />
          <Stat icon="🕵️" label="Active in Private Browsing" />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 mb-8">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🐉</div>
          <div>
            <h3 className="font-semibold mb-1">What happens next</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Switch back to FocusDragon and create your first block. Add the
              websites you want blocked, hit Start, and FocusDragon will
              redirect any visit to those sites — in regular windows, in
              private windows, on every device that syncs Safari to your Mac.
              You can safely close this tab and the previous setup tabs.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-[var(--muted)]">
        Switch back to FocusDragon (
        <span className="font-mono text-xs bg-[var(--background)] px-2 py-0.5 rounded">
          ⌘ Tab
        </span>
        ) to continue.
      </div>
    </div>
  );
}

function Stat({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-3xl">{icon}</div>
      <div className="text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}
