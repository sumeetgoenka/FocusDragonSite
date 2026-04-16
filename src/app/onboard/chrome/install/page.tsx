import type { Metadata } from "next";
import {
  ChromeStepIndicator,
  Instruction,
  WaitingForApp,
  WhyItMatters,
} from "../_components";

export const metadata: Metadata = {
  title: "Step 1 — Get the Chrome Extension | FocusDragon",
  description:
    "Install the FocusDragon extension from the Chrome Web Store.",
};

export default function InstallExtensionPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <ChromeStepIndicator current={1} />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-6 text-sm">
          <span className="text-[var(--muted)]">
            Step 1 of 2 &middot; Chrome Setup
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Get the{" "}
          <span className="gradient-text dragon-glow-text">Chrome</span>{" "}
          extension
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          The Chrome Web Store should be open in the window to the left. Install
          the FocusDragon extension from there.
        </p>
      </div>

      <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8">
        <ol className="space-y-6">
          <Instruction number={1}>
            Look at the Chrome window on the{" "}
            <span className="font-semibold">left side of your screen</span>.
            You should see the FocusDragon listing on the Chrome Web Store.
          </Instruction>
          <Instruction number={2}>
            Click the{" "}
            <span className="font-semibold text-[var(--accent)]">
              &ldquo;Add to Chrome&rdquo;
            </span>{" "}
            button.
          </Instruction>
          <Instruction number={3}>
            Chrome will show a permission dialog. Click{" "}
            <span className="font-semibold">Add extension</span> to confirm.
          </Instruction>
          <Instruction number={4}>
            Wait a moment while Chrome downloads and installs the extension.
            You&apos;ll see a small puzzle-piece icon appear in the toolbar.
          </Instruction>
        </ol>
      </div>

      <WhyItMatters
        emoji="🛡️"
        title="Why this matters"
        body="The FocusDragon extension runs inside Chrome to block distracting websites in real time. Without it installed, FocusDragon can only block at the system level — the extension adds an extra layer that catches everything, including direct IP access and redirects."
      />

      <WaitingForApp message="Waiting for FocusDragon to detect the extension..." />
    </div>
  );
}
