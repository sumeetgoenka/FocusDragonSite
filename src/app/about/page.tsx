import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — FocusDragon",
  description:
    "Meet Anay Goenka, the student from Dubai who built FocusDragon to beat his own gaming addiction — for free.",
};

export default function About() {
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
              v0.0.2
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/#comparison" className="hover:text-white transition-colors">
              Compare
            </Link>
            <Link href="/about" className="text-white font-medium transition-colors">
              About
            </Link>
            <Link href="/faqs" className="hover:text-white transition-colors">
              FAQs
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
            <span className="text-[var(--muted)]">The story behind FocusDragon</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Built by a{" "}
            <span className="gradient-text dragon-glow-text">Student</span>
            ,{" "}
            <br className="hidden md:block" />
            for Students
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
            No VC funding. No team. Just a kid who needed to get off games and
            couldn&apos;t afford the tools to do it.
          </p>
        </div>
      </section>

      {/* Profile Card */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar placeholder */}
              <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg">
                A
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-1">Anay Goenka</h2>
                <div className="flex flex-wrap gap-3 mb-5">
                  <span className="layer-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    <span>📍</span> Dubai, UAE
                  </span>
                  <span className="layer-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    <span>🏫</span> GWIS Dubai
                  </span>
                  <span className="layer-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    <span>🐉</span> Creator of FocusDragon
                  </span>
                </div>
                <p className="text-[var(--muted)] leading-relaxed">
                  Hi — I&apos;m Anay. I built FocusDragon because I was genuinely
                  struggling with a gaming addiction and needed something that
                  would actually stop me. Every free tool out there was easy to
                  bypass in seconds, and the good ones cost $40+. My parents
                  weren&apos;t going to pay for that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto pt-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            The <span className="gradient-text">Real Story</span>
          </h2>

          <div className="space-y-6">
            {/* Chapter 1 */}
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-0.5">🎮</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">The Problem</h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    I was hooked on games. Not casually hooked — the kind where
                    you glance up and three hours have vanished. School
                    assignments, sleep, everything suffered. I knew I had to
                    stop, but willpower alone wasn&apos;t cutting it.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-0.5">💸</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">The Constraint</h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    My parents weren&apos;t going to pay for a blocker app — that
                    felt like rewarding the problem. And every free alternative
                    I found was laughably easy to get around. Two clicks and
                    the extension was disabled. A minute of Googling and the
                    &quot;unbypassable&quot; tool was bypassed.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 3 */}
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-0.5">🔨</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Building the Solution</h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    So I built my own. I wanted something that would genuinely
                    stop me — not just inconvenience me. That meant
                    system-level blocking, lock mechanisms that make you
                    commit, and multiple redundant layers so there&apos;s no single
                    trick to bypass it all. And it had to be free, because
                    nobody should have to pay to fix their own focus.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 4 */}
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8 border-[var(--accent)]/30">
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-0.5">✅</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">It Worked</h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    I&apos;m no longer addicted to gaming. FocusDragon is what got
                    me there — and I&apos;m putting it out for free because if this
                    was my situation, it&apos;s definitely someone else&apos;s too. No
                    subscriptions, no paywalls, no catch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Credibility */}
      <section className="py-16 px-6 border-t border-[var(--card-border)] bg-[var(--card-bg)]">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold gradient-text">$0</div>
            <div className="text-sm text-[var(--muted)] mt-1">Cost to build</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">$0</div>
            <div className="text-sm text-[var(--muted)] mt-1">Cost to download</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">6</div>
            <div className="text-sm text-[var(--muted)] mt-1">Blocking layers</div>
          </div>
        </div>
      </section>

      {/* More about + CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to know <span className="gradient-text">more</span>?
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
            I write about what I&apos;m building, learning, and thinking about on my
            personal site.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://anaygoenka.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[var(--card-border)] hover:border-[var(--muted)] text-white font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              anaygoenka.com
            </a>
            <Link
              href="/#download"
              className="download-btn inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download FocusDragon
            </Link>
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
            <span className="text-xs text-[var(--muted)]">v0.0.2</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <a
              href="https://github.com/sumeetgoenka/FocusDragon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <span>MIT License</span>
            <span>·</span>
            <span>Made with 🐉 for focused humans</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
