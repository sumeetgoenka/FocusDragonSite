import type { Metadata } from "next";
import {
  StepIndicator,
  Instruction,
  WaitingForApp,
  WhyItMatters,
} from "../_components";

export const metadata: Metadata = {
  title: "Step 3 — Allow in Private Browsing | FocusDragon",
  description:
    "Enable the FocusDragon Safari extension in Private Browsing mode so blocks can't be bypassed by opening a private window.",
};

export default function PrivatePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator current={3} />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-6 text-sm">
          <span className="text-[var(--muted)]">Step 3 of 3 · Safari Setup</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Allow in{" "}
          <span className="gradient-text dragon-glow-text">
            Private Browsing
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          The #1 way people bypass blockers is by opening a Private Window.
          Let&apos;s close that loophole.
        </p>
      </div>

      <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8">
        <ol className="space-y-6">
          <Instruction number={1}>
            Stay on Safari&apos;s Extensions panel with FocusDragon selected on
            the left.
          </Instruction>
          <Instruction number={2}>
            Look for a checkbox labelled{" "}
            <span className="font-semibold">
              &ldquo;Allow in Private Browsing&rdquo;
            </span>{" "}
            in the right-hand panel. It&apos;s usually just below the
            permissions list.
          </Instruction>
          <Instruction number={3}>
            <span className="font-semibold">Tick the checkbox.</span> Safari
            will ask for confirmation — click{" "}
            <span className="font-semibold">Allow</span>.
          </Instruction>
          <Instruction number={4}>
            Open a new Private Window (
            <span className="font-mono text-sm bg-[var(--background)] px-2 py-0.5 rounded">
              ⇧⌘N
            </span>
            ) and visit any website so FocusDragon can confirm the extension
            is now active in private mode.
          </Instruction>
        </ol>
      </div>

      <WhyItMatters
        emoji="🕵️"
        title="Why this matters"
        body="By default, Safari disables every extension in Private Windows — including blockers. Without this checkbox, anyone can bypass FocusDragon by just pressing Shift-Command-N and browsing wherever they want. With it on, blocks apply everywhere."
      />

      <WaitingForApp message="Open a Private Window and visit any site so FocusDragon can verify…" />
    </div>
  );
}
