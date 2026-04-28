import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";

export const metadata: Metadata = {
  title: "About — FocusDragon",
  description:
    "Meet Anay Goenka, the student from Dubai who built FocusDragon to beat his own gaming addiction — for free.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-grid">
      <SiteNav activePath="about" />

      {/* Hero — big, personal, confrontational */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            I was the kid who
            <br />
            <span className="gradient-text dragon-glow-text">
              couldn&apos;t stop gaming.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            So I built the thing that finally made me.
          </p>
        </div>
      </section>

      {/* Profile — larger, centered, breathing room */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block mb-8">
            <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-lg ring-2 ring-[var(--accent)]/20 mx-auto">
              <Image
                src="/anay.png"
                alt="Anay Goenka"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Anay Goenka</h2>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="layer-badge inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--accent)]">
              Student in Dubai
            </span>
            <span className="layer-badge inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--accent)]">
              Solo developer
            </span>
            <span className="layer-badge inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--accent)]">
              Built FocusDragon at 14
            </span>
          </div>
        </div>
      </section>

      {/* Story — flowing narrative with a timeline spine */}
      <section className="pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Vertical timeline */}
          <div className="relative">
            {/* The spine */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--accent)]/20 to-transparent"
              aria-hidden="true"
            />

            <div className="space-y-16">
              {/* Chapter 1 — The Hook */}
              <div className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-red-500/80 ring-4 ring-[var(--background)]" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Three hours. Gone.
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed mb-4">
                  I&apos;d sit down to play &quot;one quick game&quot; and look up
                  to find it was 2 AM. School assignments piling up. Sleep
                  destroyed. I wasn&apos;t casually hooked — I was genuinely
                  addicted, and I knew it.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  Willpower wasn&apos;t cutting it. I needed something external
                  to force the change.
                </p>
              </div>

              {/* Chapter 2 — The Search */}
              <div className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-amber-500/80 ring-4 ring-[var(--background)]" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Everything I tried failed.
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed mb-4">
                  Browser extensions? Two clicks to disable. The apps that
                  actually worked? $30 to $100+, subscriptions on top.
                  My parents weren&apos;t about to pay for a tool to fix a
                  problem I created.
                </p>
                <p className="text-neutral-500 italic border-l-2 border-[var(--accent)]/30 pl-5 text-base">
                  &quot;Every free blocker I found was laughably easy to bypass.
                  A minute of Googling and the &apos;unbypassable&apos; tool was
                  bypassed.&quot;
                </p>
              </div>

              {/* Chapter 3 — The Build */}
              <div className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-[var(--accent)] ring-4 ring-[var(--background)]" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  So I built my own.
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed mb-4">
                  I taught myself Swift. I learned how DNS blocking works, how
                  macOS daemons run, how to write browser extensions. Layer by
                  layer, I built something that would genuinely stop me — not
                  just inconvenience me.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  6 independent blocking layers. Lock mechanisms that force you
                  to commit. A background daemon you can&apos;t just quit.
                  If I was going to build a blocker, it was going to be the one
                  I couldn&apos;t outsmart.
                </p>
              </div>

              {/* Chapter 4 — The Result */}
              <div className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[var(--background)]" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  It <span className="gradient-text">worked</span>.
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed mb-4">
                  I&apos;m no longer addicted to gaming. FocusDragon is what
                  got me there. And I&apos;m releasing it for free because if
                  this was my situation, it&apos;s definitely someone
                  else&apos;s too.
                </p>
                <p className="text-lg text-white font-medium leading-relaxed">
                  No subscriptions. No paywalls. No accounts. No catch.
                  Nobody should have to pay to fix their own focus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — emotional close */}
      <section className="py-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            If this sounds like <span className="gradient-text">your story</span>,
            <br className="hidden sm:block" />
            this was built for you.
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-lg mx-auto">
            Download FocusDragon and take back the hours you&apos;ve been losing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#download"
              className="download-btn inline-flex items-center justify-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download for Mac — It&apos;s Free
            </Link>
            <a
              href="https://anaygoenka.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[var(--card-border)] hover:border-[var(--muted)] text-white font-medium px-7 py-4 rounded-2xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              anaygoenka.com
            </a>
          </div>
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
            <span className="text-xs text-[var(--muted)]">v1.3.5</span>
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
