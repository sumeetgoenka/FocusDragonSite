import type { Metadata } from "next";
import { ChromeStepIndicator } from "../_components";

export const metadata: Metadata = {
  title: "You did it! | FocusDragon",
  description:
    "The FocusDragon Chrome extension is fully configured and ready to block.",
};

export default function DonePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <ChromeStepIndicator current={3} />

      {/* Hero */}
      <div className="text-center mb-10">
        <div
          className="text-8xl mb-6 select-none"
          style={{
            animation:
              "bounce-once 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          🎉
        </div>
        <div className="inline-flex items-center gap-2 bg-[var(--accent)]/15 border border-[var(--accent)]/40 rounded-full px-4 py-2 mb-6 text-sm font-medium">
          <span className="text-[var(--accent)]">
            &#10003; All Chrome permissions configured
          </span>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          You{" "}
          <span className="gradient-text dragon-glow-text">did it</span>!
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
          You fully set up the Chrome extension. Yay! Distractions don&apos;t
          stand a chance.
        </p>
      </div>

      {/* Checkmarks card */}
      <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-12 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Stat icon="&#10004;" label="Extension installed" />
          <Stat icon="🕵️" label="Active in Incognito" />
        </div>
      </div>

      {/* What now */}
      <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--card-bg)] p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🐉</div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-2">What happens next</h3>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              Switch back to FocusDragon and create your first block. Add the
              websites you want blocked, hit Start, and the extension will
              redirect any visit to those sites — in regular windows and in
              Incognito.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              You can safely close this tab now and{" "}
              <span className="font-mono text-xs bg-[var(--background)] px-2 py-0.5 rounded">
                ⌘ Tab
              </span>{" "}
              back into FocusDragon.
            </p>
          </div>
        </div>
      </div>

      {/* Return to app callout */}
      <div className="text-center">
        <div className="inline-block">
          <div
            className="rounded-2xl bg-[var(--accent)]/10 border-2 border-[var(--accent)]/40 p-6 mb-4"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          >
            <div className="text-2xl font-bold mb-2">
              👈 Return to FocusDragon
            </div>
            <div className="text-sm text-[var(--muted)]">
              Press{" "}
              <span className="font-mono text-xs bg-[var(--background)] px-2 py-0.5 rounded">
                ⌘ Tab
              </span>{" "}
              or click the FocusDragon icon in the Dock
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-once {
          0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
          60%  { transform: scale(1.2) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 100, 50, 0.3); }
          50%      { box-shadow: 0 0 30px 5px rgba(255, 100, 50, 0.15); }
        }
      `}</style>
    </div>
  );
}

function Stat({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="text-5xl">{icon}</div>
      <div className="text-sm text-[var(--muted)] text-center font-medium">
        {label}
      </div>
    </div>
  );
}
