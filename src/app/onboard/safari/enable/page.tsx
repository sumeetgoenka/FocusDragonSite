import type { Metadata } from "next";
import {
  StepIndicator,
  Instruction,
  WaitingForApp,
  WhyItMatters,
} from "../_components";

export const metadata: Metadata = {
  title: "Step 1 — Enable the FocusDragon Extension | FocusDragon",
  description:
    "Tick the FocusDragon checkbox in Safari Settings → Extensions to enable the FocusDragon Safari extension.",
};

export default function EnableExtensionPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator current={1} />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-6 text-sm">
          <span className="text-[var(--muted)]">Step 1 of 3 · Safari Setup</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Enable the{" "}
          <span className="gradient-text dragon-glow-text">FocusDragon</span>{" "}
          extension
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          Safari just opened to its Extensions panel. Find FocusDragon in the
          list on the left and tick the checkbox next to it.
        </p>
      </div>

      <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8">
        <ol className="space-y-6">
          <Instruction number={1}>
            Look at the Safari window that just opened. You should see{" "}
            <span className="font-mono text-sm bg-[var(--background)] px-2 py-0.5 rounded">
              Extensions
            </span>{" "}
            highlighted in the toolbar.
          </Instruction>
          <Instruction number={2}>
            On the left sidebar, find{" "}
            <span className="font-semibold">FocusDragon</span>. It will have
            an empty checkbox next to it.
          </Instruction>
          <Instruction number={3}>
            <span className="font-semibold">Click the checkbox.</span> Safari
            will pop a confirmation dialog.
          </Instruction>
          <Instruction number={4}>
            Click <span className="font-semibold">Turn On</span> in the dialog
            to enable the extension.
          </Instruction>
        </ol>
      </div>

      <WhyItMatters
        emoji="🛡️"
        title="Why this matters"
        body="Without this checkbox ticked, Safari won't load the FocusDragon extension at all — and FocusDragon won't be able to block any websites in Safari. This is the first of three required permissions."
      />

      <WaitingForApp message="Waiting for FocusDragon to detect that the extension is enabled…" />
    </div>
  );
}
