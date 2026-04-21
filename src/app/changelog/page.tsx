import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Changelog — FocusDragon",
  description:
    "See what's new in every FocusDragon release — features, fixes, and improvements.",
};

/* ── Release data ─────────────────────────────────────────── */

interface Release {
  version: string;
  date: string;
  latest?: boolean;
  summary: string;
  changes: string[];
}

const releases: Release[] = [
  {
    version: "1.1.8",
    date: "April 21, 2026",
    latest: true,
    summary:
      "Bulletproof block-editor save — your typed name and URLs no longer get dropped silently.",
    changes: [
      "Fixed: creating a block while the name or website field was still focused could silently drop the edit because the TextField hadn't committed its value yet. All save-critical fields now force-commit synchronously before the handler runs",
      "Added: post-save verification that shows a visible error if a block doesn't land in the list, instead of closing the editor silently",
      "Pressing Return in the block-name field now saves",
    ],
  },
  {
    version: "1.1.7",
    date: "April 20, 2026",
    summary:
      "chrome://extensions is no longer blocked by default — extension reconfiguration works mid-block.",
    changes: [
      "New Advanced Mode toggle: \"Block chrome://extensions during blocks\" (default OFF). The browser's extensions page stays reachable during an active block unless you explicitly opt in",
      "Configurable grace period (default 60s, range 0–600s) gives you a window after a block starts to fix a broken extension before the page starts getting blocked",
      "Stale-state escape hatch: if the native messaging host is unreachable, chrome://extensions fails open instead of stranding you on the block page",
      "Fixes the \"block turned off but chrome://extensions still blocked\" bug by propagating block-state updates with a staleness timestamp",
      "Applies to Chrome, Edge, Brave, Opera, Vivaldi, Comet, and Firefox (about:addons, moz-extension://)",
    ],
  },
  {
    version: "1.1.6",
    date: "April 20, 2026",
    summary:
      "Critical onboarding fix — System Settings and Terminal are no longer force-quit outside of active locks.",
    changes: [
      "Fixed: System Settings, Terminal, and Activity Monitor were being killed even when no lock was active, preventing Full Disk Access from being granted during onboarding",
      "Fixed: \"Safari extension tampered\" alert was re-appearing every 3 seconds after dismissal — now debounces for 60 seconds after you dismiss it",
      "Fixed: missing Full Disk Access is now reported as \"grant FDA\" instead of a misleading \"extension tampered\" warning",
      "Enforcement (force-quit Safari on tamper) is now suppressed during onboarding so setup cannot be interrupted",
    ],
  },
  {
    version: "1.1.5",
    date: "April 20, 2026",
    summary:
      "Cold Turkey parity, Chrome extension, Date Lock, redesigned Block Editor.",
    changes: [
      "Cold Turkey feature parity — advanced URL matching, pre-made lists, all six break types, multi-user targeting",
      "Chrome extension + Extensions sidebar for cross-browser blocking",
      "Date Lock — lock a block until a specific future date",
      "Locked Block mode (replaces Frozen)",
      "Redesigned Block Editor with tabbed layout that fits on screen",
      "Dashboard and Statistics views",
      "Device-level blocks",
      "Launch-hang fix and tightened permission checks",
      "Sentry crash reporting + PostHog telemetry (opt-in)",
      "Native messaging host signed with Developer ID — no more recurring TCC prompts",
    ],
  },
  {
    version: "1.1.0",
    date: "April 13, 2026",
    summary:
      "Onboarding overhaul and Safari enforcement rewrite.",
    changes: [
      "Step-by-step onboarding tutorials for each permission",
      "Live permission status indicators",
      "Safari extension state now read directly from disk via Full Disk Access",
      "Fixed settings path resolution on first launch",
    ],
  },
  {
    version: "1.0.0",
    date: "April 11, 2026",
    summary:
      "The first public release of FocusDragon.",
    changes: [
      "6-layer blocking: DNS, app blocking, process monitoring, daemon, Safari extension, tamper resistance",
      "6 lock mechanisms to keep you committed",
      "Pomodoro timer with configurable intervals",
      "Dashboard with focus statistics and session history",
      "Block editor with emoji/color categories and inline app picker",
      "Safari extension for in-browser blocking",
      "Background daemon for enforcement when the app is closed",
      "Developer ID signed, Apple-notarized, universal binary",
    ],
  },
];

/* ── Helpers ──────────────────────────────────────────────── */

/* ── Page ─────────────────────────────────────────────────── */

export default function Changelog() {
  return (
    <div className="min-h-screen bg-grid">
      <SiteNav activePath="changelog" />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-8 text-sm">
            <span className="text-[var(--muted)]">What&apos;s new in FocusDragon</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="gradient-text dragon-glow-text">Changelog</span>
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
            Every feature, fix, and improvement — version by version.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* vertical timeline line */}
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--card-border)] to-transparent hidden md:block" />

            <div className="space-y-12">
              {releases.map((release) => (
                <div key={release.version} className="relative md:pl-14">
                  {/* timeline dot */}
                  <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] hidden md:block" />

                  <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold">v{release.version}</h2>
                      {release.latest && (
                        <span className="ml-2 text-[11px] font-semibold uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 rounded-full px-2.5 py-0.5">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--muted)] mb-4">
                      {release.date}
                    </p>
                    <p className="text-[var(--muted)] leading-relaxed mb-6">
                      {release.summary}
                    </p>

                    {/* Changes list */}
                    <ul className="space-y-2.5">
                      {release.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
                          <span className="text-sm text-[var(--foreground)]/80 leading-relaxed">
                            {change}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Always <span className="gradient-text">improving</span>
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
            FocusDragon updates automatically via Sparkle. Download once,
            stay up to date forever.
          </p>
          <Link
            href="/#download"
            className="download-btn inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download FocusDragon
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="FocusDragon"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="font-medium">FocusDragon</span>
            <span className="text-xs text-[var(--muted)]">v1.1.8</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <span>Made for focused humans</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
