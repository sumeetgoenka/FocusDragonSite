import type { Metadata } from "next";
import {
  ChromeStepIndicator,
  Instruction,
  WaitingForApp,
  WhyItMatters,
} from "../_components";

export const metadata: Metadata = {
  title: "Step 2 — Allow in Incognito | FocusDragon",
  description:
    "Enable the FocusDragon Chrome extension in Incognito mode so blocks can't be bypassed.",
};

export default function IncognitoPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <ChromeStepIndicator current={2} />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-6 text-sm">
          <span className="text-[var(--muted)]">
            Step 2 of 2 &middot; Chrome Setup
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Allow in{" "}
          <span className="gradient-text dragon-glow-text">Incognito</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          Look at the tab to the left of this one — it&apos;s the FocusDragon
          extension details page. Enable incognito access there.
        </p>
      </div>

      <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8">
        <ol className="space-y-6">
          <Instruction number={1}>
            Click the tab to the{" "}
            <span className="font-semibold">left of this tab</span>. It should
            show the FocusDragon extension details page at{" "}
            <span className="font-mono text-xs bg-[var(--background)] px-2 py-0.5 rounded">
              chrome://extensions
            </span>
            .
          </Instruction>
          <Instruction number={2}>
            Scroll down until you find the{" "}
            <span className="font-semibold">
              &ldquo;Allow in Incognito&rdquo;
            </span>{" "}
            toggle.
          </Instruction>
          <Instruction number={3}>
            <span className="font-semibold">Turn the toggle on.</span> It
            should turn blue.
          </Instruction>
          <Instruction number={4}>
            Switch back to this tab. FocusDragon will automatically detect the
            change.
          </Instruction>
        </ol>
      </div>

      <WhyItMatters
        emoji="🕵️"
        title="Why this matters"
        body="The #1 way people bypass website blockers is by opening an Incognito window. By default, Chrome disables all extensions in Incognito mode. Without this toggle, anyone can bypass FocusDragon just by pressing Ctrl+Shift+N. With it enabled, blocks apply everywhere."
      />

      <WaitingForApp message="Waiting for FocusDragon to detect incognito permission..." />
    </div>
  );
}
