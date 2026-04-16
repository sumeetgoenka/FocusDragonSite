import type { Metadata } from "next";
import { Instruction, WhyItMatters } from "../_components";

export const metadata: Metadata = {
  title: "Chrome Extension Needs Attention | FocusDragon",
  description:
    "The FocusDragon Chrome extension is missing a required permission. Fix it to keep blocking working.",
};

export default function FixNoBlockPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Calm alert */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="text-6xl select-none">⚠️</div>
      </div>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 rounded-full px-4 py-2 mb-6 text-sm font-medium">
          <span className="text-amber-400">
            Chrome extension needs attention
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          A permission is{" "}
          <span className="text-amber-400">missing</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          The FocusDragon Chrome extension is missing a permission it needs
          to block websites properly. No block is currently active, so
          nothing is being enforced right now &mdash; but you should fix this
          before starting your next focus session.
        </p>
      </div>

      {/* Fix: Site Access */}
      <div className="feature-card rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8 border-2 border-amber-500/30">
        <h2 className="text-xl font-bold mb-2">
          Fix 1 &mdash; Site Access revoked
        </h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          If you changed the extension&apos;s site access to &ldquo;On
          click&rdquo; or &ldquo;On specific sites&rdquo;, the extension
          can&apos;t see which sites you visit and can&apos;t block anything.
        </p>
        <ol className="space-y-6">
          <Instruction number={1}>
            Open Chrome and go to{" "}
            <span className="font-mono text-xs bg-[var(--background)] px-2 py-0.5 rounded">
              chrome://extensions
            </span>
          </Instruction>
          <Instruction number={2}>
            Find <span className="font-semibold">FocusDragon</span> and click{" "}
            <span className="font-semibold">Details</span>.
          </Instruction>
          <Instruction number={3}>
            Scroll to{" "}
            <span className="font-semibold">Site access</span> and set it to{" "}
            <span className="font-semibold text-[var(--accent)]">
              &ldquo;On all sites&rdquo;
            </span>
            .
          </Instruction>
        </ol>
      </div>

      {/* Fix: Incognito */}
      <div className="feature-card rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8 border-2 border-amber-500/30">
        <h2 className="text-xl font-bold mb-2">
          Fix 2 &mdash; Incognito access disabled
        </h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          If you turned off &ldquo;Allow in Incognito&rdquo;, anyone can bypass
          blocks by opening an Incognito window.
        </p>
        <ol className="space-y-6">
          <Instruction number={1}>
            Open Chrome and go to{" "}
            <span className="font-mono text-xs bg-[var(--background)] px-2 py-0.5 rounded">
              chrome://extensions
            </span>
          </Instruction>
          <Instruction number={2}>
            Find <span className="font-semibold">FocusDragon</span> and click{" "}
            <span className="font-semibold">Details</span>.
          </Instruction>
          <Instruction number={3}>
            Toggle{" "}
            <span className="font-semibold text-[var(--accent)]">
              &ldquo;Allow in Incognito&rdquo;
            </span>{" "}
            back on.
          </Instruction>
        </ol>
      </div>

      <WhyItMatters
        emoji="💡"
        title="Why this matters"
        body="Without these permissions, FocusDragon can't see what pages you visit in Chrome or block them during focus sessions. Fix it now so your next block works seamlessly."
      />

      {/* Return to app */}
      <div className="text-center">
        <div className="inline-block">
          <div
            className="rounded-2xl bg-[var(--accent)]/10 border-2 border-[var(--accent)]/40 p-6 mb-4"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          >
            <div className="text-lg font-bold mb-2">
              ✅ Fix it, then return to FocusDragon
            </div>
            <div className="text-sm text-[var(--muted)]">
              Press{" "}
              <span className="font-mono text-xs bg-[var(--background)] px-2 py-0.5 rounded">
                ⌘ Tab
              </span>{" "}
              or click the FocusDragon icon in the Dock. The app will
              automatically detect when the permissions are restored.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 100, 50, 0.3); }
          50%      { box-shadow: 0 0 30px 5px rgba(255, 100, 50, 0.15); }
        }
      `}</style>
    </div>
  );
}
