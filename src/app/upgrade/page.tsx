import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";

export const metadata: Metadata = {
  title: "FocusDragon Pro — Coming Soon",
  description:
    "AI-assisted focus is coming. Describe a block in plain English, let Claude build it. Use your own Anthropic key free, or wait for FocusDragon Pro.",
};

export default function Upgrade() {
  return (
    <div className="min-h-screen bg-grid">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 layer-badge rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--accent)] mb-8">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
            </svg>
            Coming soon
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            FocusDragon
            <br />
            <span className="gradient-text dragon-glow-text">Pro</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            AI-assisted focus, without the setup. We pay the Anthropic bill — you just focus.
          </p>
        </div>
      </section>

      {/* What's in Pro */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="layer-badge rounded-2xl p-6 border border-[var(--card-border)]">
              <div className="text-2xl mb-2">✨</div>
              <h3 className="text-lg font-bold mb-1">AI block builder</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Describe a block in one sentence. Claude fills in the domains,
                schedule, and lock type. Already shipped — works today with your own key.
              </p>
            </div>
            <div className="layer-badge rounded-2xl p-6 border border-[var(--card-border)]">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="text-lg font-bold mb-1">Intent-aware blocking</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                FocusDragon reads what you&apos;re doing and steps in on sustained drift —
                not just when you hit a blocklisted URL.
              </p>
            </div>
            <div className="layer-badge rounded-2xl p-6 border border-[var(--card-border)]">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-lg font-bold mb-1">Weekly focus summary</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Every Sunday, a one-page report: where your attention went, what broke
                your focus, and what to tune next week.
              </p>
            </div>
            <div className="layer-badge rounded-2xl p-6 border border-[var(--card-border)]">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-lg font-bold mb-1">Auto-detected distractions</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                FocusDragon notices new time-sinks as they appear and suggests
                blocks before they become habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / philosophy */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Free tier stays <span className="gradient-text">free</span>.
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed mb-4">
            Every blocking feature, every lock type, every enforcement
            mechanism — free, forever. That&apos;s the deal.
          </p>
          <p className="text-lg text-neutral-400 leading-relaxed mb-10">
            Pro is only for the AI features, which cost real money to run.
            If you have an Anthropic API key, you can use everything AI
            today at zero cost — paste your key in Settings → AI and go.
          </p>

          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#download"
              className="download-btn inline-flex items-center justify-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-colors"
            >
              Download FocusDragon — Free
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border border-[var(--card-border)] hover:border-[var(--muted)] text-white font-medium px-7 py-4 rounded-2xl transition-colors"
            >
              Why it&apos;s built this way
            </Link>
          </div>
        </div>
      </section>

      {/* Notify me note */}
      <section className="pb-24 px-6 border-t border-[var(--card-border)] pt-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-neutral-500 leading-relaxed">
            Pro launches once the AI features are stable and there&apos;s enough
            demand to justify the backend. No waitlist, no email capture —
            when it&apos;s ready, it&apos;ll show up in the app as an in-app upgrade.
            Until then, BYOK is the path.
          </p>
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
            <span className="text-xs text-[var(--muted)]">v1.3.1</span>
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
