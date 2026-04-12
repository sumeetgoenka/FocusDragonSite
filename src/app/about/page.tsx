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
              v1.0.0
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
              <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10">
                <Image
                  src="/anay.png"
                  alt="Anay Goenka"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-1">Anay Goenka</h2>
                <div className="flex flex-wrap gap-3 mb-5">
                  <span className="layer-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    Dubai, UAE
                  </span>
                  <span className="layer-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    GWIS Dubai
                  </span>
                  <span className="layer-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    Creator of FocusDragon
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
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.657-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                  </svg>
                </div>
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
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
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
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                  </svg>
                </div>
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
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
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
            <span className="text-xs text-[var(--muted)]">v1.0.0</span>
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
