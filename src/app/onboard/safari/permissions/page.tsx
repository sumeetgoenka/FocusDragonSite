import type { Metadata } from "next";
import {
  StepIndicator,
  Instruction,
  WaitingForApp,
  WhyItMatters,
} from "../_components";

export const metadata: Metadata = {
  title: "Step 2 — Allow on Every Website | FocusDragon",
  description:
    "Grant the FocusDragon Safari extension permission to read and modify every website so it can actually block.",
};

export default function PermissionsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator current={2} />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-6 text-sm">
          <span className="text-[var(--muted)]">Step 2 of 3 · Safari Setup</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Allow on{" "}
          <span className="gradient-text dragon-glow-text">every website</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          The extension is enabled — now it needs permission to actually see
          the URLs you visit. Without this, it can&apos;t block anything.
        </p>
      </div>

      <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8">
        <ol className="space-y-6">
          <Instruction number={1}>
            Make sure FocusDragon is still selected in the left sidebar of
            Safari&apos;s Extensions panel.
          </Instruction>
          <Instruction number={2}>
            Look at the bottom-right of the panel for a button labelled{" "}
            <span className="font-semibold">
              &ldquo;Always Allow on Every Website…&rdquo;
            </span>{" "}
            (or sometimes &ldquo;Edit Websites…&rdquo;).
          </Instruction>
          <Instruction number={3}>
            Click <span className="font-semibold">Always Allow on Every Website…</span>
          </Instruction>
          <Instruction number={4}>
            Safari will ask you to confirm. Click{" "}
            <span className="font-semibold">Always Allow on Every Website</span>{" "}
            in the dialog. You will see a list of websites populate, and
            FocusDragon will be granted permission for all of them.
          </Instruction>
        </ol>
      </div>

      <WhyItMatters
        emoji="🌐"
        title="Why this matters"
        body="Safari extensions don't get access to any websites by default — you have to explicitly grant them. Without this permission, the FocusDragon extension is enabled but blind: it can't see what you're browsing, so it can't block anything. This is the most commonly missed step."
      />

      <WaitingForApp message="Waiting for FocusDragon to detect that site permissions are granted…" />
    </div>
  );
}
