import type { Metadata } from "next";
import { Instruction, WhyItMatters } from "../_components";

export const metadata: Metadata = {
  title: "Chrome Was Closed — Fix Permissions | FocusDragon",
  description:
    "FocusDragon closed Chrome because a required permission was revoked. Follow these steps to fix it.",
};

export default function FixPermissionsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Alert banner */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div
          className="text-6xl select-none"
          style={{
            animation:
              "shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
          }}
        >
          🚨
        </div>
      </div>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/40 rounded-full px-4 py-2 mb-6 text-sm font-medium">
          <span className="text-red-400">
            Chrome was closed by FocusDragon
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          A required permission was{" "}
          <span className="text-red-400">revoked</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          FocusDragon detected that the Chrome extension is missing a permission
          it needs to block websites. Chrome was force-closed to prevent bypass.
          Fix it below — you have <span className="font-semibold text-[var(--accent)]">2 minutes</span> to
          re-enable it before Chrome is closed again.
        </p>
      </div>

      {/* Fix: Site Access */}
      <div className="feature-card rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8 border-2 border-red-500/30">
        <h2 className="text-xl font-bold mb-2">
          Fix 1 — Site Access revoked
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
      <div className="feature-card rounded-3xl bg-[var(--card-bg)] p-8 md:p-10 mb-8 border-2 border-red-500/30">
        <h2 className="text-xl font-bold mb-2">
          Fix 2 — Incognito access disabled
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
        emoji="🐉"
        title="Why FocusDragon does this"
        body="During an active block, FocusDragon must be able to see and redirect every page you visit — in all windows, including Incognito. If either permission is missing, the block has a hole. FocusDragon closes Chrome to protect your focus until the permissions are restored."
      />

      {/* Timer warning */}
      <div className="text-center">
        <div className="inline-block">
          <div className="rounded-2xl bg-[var(--accent)]/10 border-2 border-[var(--accent)]/40 p-6 mb-4">
            <div className="text-lg font-bold mb-2">
              ⏱️ You have 2 minutes
            </div>
            <div className="text-sm text-[var(--muted)]">
              Open Chrome, fix the permission above, then{" "}
              <span className="font-mono text-xs bg-[var(--background)] px-2 py-0.5 rounded">
                ⌘ Tab
              </span>{" "}
              back to FocusDragon. If it&apos;s not fixed within 2 minutes,
              Chrome will be closed again.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
