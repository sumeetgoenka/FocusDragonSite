import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — FocusDragon",
  description:
    "See what's new in every FocusDragon release — features, fixes, and improvements.",
};

/* ── Release data ─────────────────────────────────────────── */

interface Release {
  version: string;
  date: string;
  tag: "latest" | "initial" | "patch";
  summary: string;
  changes: { type: "added" | "changed" | "fixed"; text: string }[];
}

const releases: Release[] = [
  {
    version: "1.1.0",
    date: "April 13, 2026",
    tag: "latest",
    summary:
      "Onboarding overhaul and Safari enforcement rewrite.",
    changes: [
      {
        type: "added",
        text: "New onboarding flow with step-by-step info tutorials for each permission",
      },
      {
        type: "added",
        text: "Live permission status feedback — see exactly which permissions are granted",
      },
      {
        type: "changed",
        text: "Safari extension enforcement now reads state directly from disk (Full Disk Access) instead of AppleScript/heartbeat",
      },
      {
        type: "fixed",
        text: "Settings path resolution on first launch",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "April 11, 2026",
    tag: "initial",
    summary:
      "The first public release of FocusDragon — a free, unbypassable distraction blocker for macOS.",
    changes: [
      {
        type: "added",
        text: "Full UI overhaul with new design system, sidebar navigation, and native macOS styling",
      },
      {
        type: "added",
        text: "6-layer blocking: hosts file, app blocking, process monitoring, daemon enforcement, Safari extension, and tamper resistance",
      },
      {
        type: "added",
        text: "6 lock mechanisms to keep you committed during focus sessions",
      },
      {
        type: "added",
        text: "Pomodoro timer with configurable work/break intervals",
      },
      {
        type: "added",
        text: "Dashboard with focus statistics and session history",
      },
      {
        type: "added",
        text: "Block editor with emoji/color categories and inline app picker",
      },
      {
        type: "added",
        text: "Safari extension for in-browser website blocking",
      },
      {
        type: "added",
        text: "Background daemon for persistent enforcement even when the app is closed",
      },
      {
        type: "added",
        text: "Developer ID signed and Apple-notarized for Gatekeeper approval",
      },
      {
        type: "added",
        text: "Universal binary — runs natively on Apple Silicon and Intel Macs",
      },
    ],
  },
];

/* ── Badge helpers ────────────────────────────────────────── */

const typeBadge = (type: "added" | "changed" | "fixed") => {
  const styles = {
    added:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    changed:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
    fixed:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <span
      className={`inline-block text-[11px] font-semibold uppercase tracking-wider border rounded-full px-2.5 py-0.5 ${styles[type]}`}
    >
      {type}
    </span>
  );
};

const tagBadge = (tag: Release["tag"]) => {
  if (tag === "latest")
    return (
      <span className="ml-3 text-[11px] font-semibold uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 rounded-full px-2.5 py-0.5">
        Latest
      </span>
    );
  if (tag === "initial")
    return (
      <span className="ml-3 text-[11px] font-semibold uppercase tracking-wider bg-white/5 text-[var(--muted)] border border-[var(--card-border)] rounded-full px-2.5 py-0.5">
        Initial Release
      </span>
    );
  return null;
};

/* ── Page ─────────────────────────────────────────────────── */

export default function Changelog() {
  return (
    <div className="min-h-screen bg-grid">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="FocusDragon"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-lg">FocusDragon</span>
            <span className="text-xs text-[var(--muted)] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-2 py-0.5">
              v1.1.0
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/#comparison" className="hover:text-white transition-colors">
              Compare
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/changelog" className="text-white font-medium transition-colors">
              Changelog
            </Link>
            <Link href="/faqs" className="hover:text-white transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link
              href="/#download"
              className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-light)] transition-colors"
            >
              Download
            </Link>
          </div>
        </div>
      </nav>

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
                      {tagBadge(release.tag)}
                    </div>
                    <p className="text-sm text-[var(--muted)] mb-4">
                      {release.date}
                    </p>
                    <p className="text-[var(--muted)] leading-relaxed mb-6">
                      {release.summary}
                    </p>

                    {/* Changes list */}
                    <ul className="space-y-3">
                      {release.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            {typeBadge(change.type)}
                          </div>
                          <span className="text-sm text-[var(--foreground)]/80 leading-relaxed">
                            {change.text}
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
            <span className="text-xs text-[var(--muted)]">v1.1.0</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <a
              href="https://github.com/anaygoenka/FocusDragon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <span>MIT License</span>
            <span>·</span>
            <span>Made for focused humans</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
