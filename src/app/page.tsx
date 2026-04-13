import Image from "next/image";
import Link from "next/link";

/* ── tiny SVG icon helpers ─────────────────────────────────── */
const Check = () => (
  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const Cross = () => (
  <svg className="w-4 h-4 text-red-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const Minus = () => (
  <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-grid">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
            <Link href="/" className="text-white font-medium transition-colors">
              Home
            </Link>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#comparison" className="hover:text-white transition-colors">
              Compare
            </a>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/changelog" className="hover:text-white transition-colors">
              Changelog
            </Link>
            <Link href="/faqs" className="hover:text-white transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <a
              href="#download"
              className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-light)] transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Radial glow behind the heading */}
        <div className="hero-glow" aria-hidden="true" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Pill */}
          <div className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-5 py-2 mb-10 text-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-neutral-400">
              Free &amp; open-source&nbsp;&nbsp;·&nbsp;&nbsp;v1.1.0
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-[5.25rem] md:leading-[1.08] font-extrabold tracking-tight mb-7">
            Distraction blocking{" "}
            <br className="hidden sm:block" />
            that&apos;s{" "}
            <span className="gradient-text dragon-glow-text">
              actually hard
            </span>{" "}
            to bypass
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            6 independent blocking layers. System-level enforcement.
            Lock mechanisms that make you commit.{" "}
            <span className="text-white font-medium">Built natively for macOS.</span>
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a
              href="#download"
              className="download-btn group bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all flex items-center gap-3"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download for Mac
            </a>
            <a
              href="https://github.com/anaygoenka/FocusDragon"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 hover:border-white/25 text-white font-medium text-lg px-8 py-4 rounded-xl transition-all flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Source
            </a>
          </div>

          <p className="text-sm text-neutral-500">
            macOS 13 Ventura or later · Apple Silicon &amp; Intel
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[var(--card-border)] bg-[var(--card-bg)]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold gradient-text">6</div>
            <div className="text-sm text-[var(--muted)] mt-1">Blocking Layers</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">$0</div>
            <div className="text-sm text-[var(--muted)] mt-1">Forever Free</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">5</div>
            <div className="text-sm text-[var(--muted)] mt-1">Lock Types</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text">100%</div>
            <div className="text-sm text-[var(--muted)] mt-1">Open Source</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROBLEM SECTION
         ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Existing Blockers <span className="gradient-text">Don&apos;t Work</span>
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              Browser extensions can be disabled in 2 clicks. Paid apps cost $30–100+.
              macOS parental controls weren&apos;t designed for self-imposed blocking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Browser Extensions */}
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3">Browser Extensions</h3>
              <ul className="space-y-2.5 text-[var(--muted)] text-sm">
                <li className="flex items-center gap-2.5"><Cross /> Only work in one browser</li>
                <li className="flex items-center gap-2.5"><Cross /> Easy to disable or bypass</li>
                <li className="flex items-center gap-2.5"><Cross /> Don&apos;t block applications</li>
                <li className="flex items-center gap-2.5"><Cross /> No system-level enforcement</li>
              </ul>
            </div>
            {/* Paid Apps */}
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3">Paid Apps</h3>
              <ul className="space-y-2.5 text-[var(--muted)] text-sm">
                <li className="flex items-center gap-2.5"><Cross /> Cost $30–100+</li>
                <li className="flex items-center gap-2.5"><Cross /> Subscription models</li>
                <li className="flex items-center gap-2.5"><Cross /> Closed source code</li>
                <li className="flex items-center gap-2.5"><Cross /> Privacy concerns</li>
              </ul>
            </div>
            {/* macOS Parental Controls */}
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-3">macOS Parental Controls</h3>
              <ul className="space-y-2.5 text-[var(--muted)] text-sm">
                <li className="flex items-center gap-2.5"><Cross /> Designed for parents, not self-use</li>
                <li className="flex items-center gap-2.5"><Cross /> Limited customization</li>
                <li className="flex items-center gap-2.5"><Cross /> No lock mechanisms</li>
                <li className="flex items-center gap-2.5"><Cross /> Easy to circumvent</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — 6 LAYERS
         ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">6 Layers</span> of Protection
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              FocusDragon doesn&apos;t rely on a single mechanism. It combines six
              independent layers that make bypassing genuinely annoying.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                layer: "1",
                title: "DNS-Level Blocking",
                desc: "Modifies /etc/hosts to redirect blocked domains to 0.0.0.0. Works across all browsers. VPN-proof.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
              {
                layer: "2",
                title: "Process Monitoring",
                desc: "Continuously monitors running apps and terminates blocked ones within 1–2 seconds. Uses bundle IDs — can't be bypassed by renaming.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                layer: "3",
                title: "Background Daemon",
                desc: "Runs as root with elevated privileges. Auto-starts on boot. Protects hosts file from tampering. Can't be killed without admin access.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                  </svg>
                ),
              },
              {
                layer: "4",
                title: "Browser Extensions",
                desc: "Redundant blocking for Chrome, Firefox, Safari, Edge, Brave, Opera & more. Works in incognito. Blocks by IP too.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.657-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                  </svg>
                ),
              },
              {
                layer: "5",
                title: "Lock Mechanisms",
                desc: "Timer lock, random text lock, schedule lock, restart lock, and breakable lock. Choose how hard it should be to disable.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
              },
              {
                layer: "6",
                title: "Anti-Tamper",
                desc: "Prevents uninstallation during locks. Blocks System Settings to prevent time changes. Detects and logs bypass attempts.",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.layer}
                className="feature-card rounded-2xl bg-[var(--card-bg)] p-8 relative overflow-hidden"
              >
                <div className="layer-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-[var(--accent)] mb-4">
                  Layer {item.layer}
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-3 text-neutral-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES
         ══════════════════════════════════════════════════════ */}
      <section id="features" className="py-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for People Who <span className="gradient-text">Actually</span> Need Focus
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              Whether you&apos;re a student, remote worker, or anyone who struggles with
              distractions, FocusDragon gives you the tools to stay on track.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                5 Lock Types
              </h3>
              <ul className="space-y-3 text-[var(--muted)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] font-bold">Timer</span>
                  <span>— &quot;Block for 4 hours, cannot unlock early&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] font-bold">Random Text</span>
                  <span>— Type a 40-character random string to unlock</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] font-bold">Schedule</span>
                  <span>— &quot;Block 9 AM – 5 PM, weekdays&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] font-bold">Restart</span>
                  <span>— Must restart your Mac to unlock</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] font-bold">Breakable</span>
                  <span>— 60-second delay before unlock</span>
                </li>
              </ul>
            </div>

            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                Use Cases
              </h3>
              <ul className="space-y-3 text-[var(--muted)]">
                <li>&quot;Block Reddit during work hours&quot;</li>
                <li>&quot;No YouTube while studying for exams&quot;</li>
                <li>&quot;Block all games from 9 AM – 5 PM&quot;</li>
                <li>&quot;Lock myself out of Twitter for a week&quot;</li>
                <li>&quot;Pomodoro: 25 min work, 5 min break&quot;</li>
              </ul>
            </div>

            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                Native macOS Experience
              </h3>
              <p className="text-[var(--muted)] leading-relaxed">
                Built with SwiftUI — not Electron. Follows Apple Human Interface
                Guidelines. Fast, responsive, and battery-friendly. Feels like it
                belongs on your Mac.
              </p>
            </div>

            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                Free &amp; Open Source
              </h3>
              <p className="text-[var(--muted)] leading-relaxed">
                No subscriptions. No paywalls. No data collection. No telemetry.
                MIT licensed. Everyone deserves powerful productivity tools — you
                can audit every line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMPARISON TABLE
         ══════════════════════════════════════════════════════ */}
      <section id="comparison" className="py-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How FocusDragon <span className="gradient-text">Compares</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="comparison-table w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-4 px-4 text-[var(--muted)] font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-[var(--accent)] font-bold">FocusDragon</th>
                  <th className="text-center py-4 px-4 text-[var(--muted)] font-medium">Cold Turkey</th>
                  <th className="text-center py-4 px-4 text-[var(--muted)] font-medium">Freedom.to</th>
                  <th className="text-center py-4 px-4 text-[var(--muted)] font-medium">Extensions</th>
                </tr>
              </thead>
              <tbody>
                {([
                  ["Price",            "Free",    "$39",     "$40/yr",  "Free"],
                  ["Open Source",      "check",   "cross",   "cross",   "partial"],
                  ["Block Websites",   "check",   "check",   "check",   "check"],
                  ["Block Apps",       "check",   "check",   "check",   "cross"],
                  ["System-Level",     "check",   "check",   "check",   "cross"],
                  ["Lock Mechanisms",  "5 types", "Yes",     "Limited", "cross"],
                  ["macOS Native",     "SwiftUI", "Electron","Electron","N/A"],
                  ["Browser Extensions","check",  "check",   "check",   "check"],
                  ["Statistics",       "check",   "check",   "check",   "partial"],
                ] as const).map((row, i) => (
                  <tr key={i}>
                    <td className="font-medium">{row[0]}</td>
                    {[1, 2, 3, 4].map((col) => {
                      const val = row[col];
                      const isHighlight = col === 1;
                      let content: React.ReactNode = val;
                      if (val === "check")   content = <span className="inline-flex justify-center"><Check /></span>;
                      else if (val === "cross")   content = <span className="inline-flex justify-center"><Cross /></span>;
                      else if (val === "partial") content = <span className="inline-flex justify-center"><Minus /></span>;
                      return (
                        <td
                          key={col}
                          className={`text-center ${isHighlight ? "font-medium text-white" : "text-[var(--muted)]"}`}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why It's Tough */}
      <section className="py-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why It&apos;s <span className="gradient-text">Actually Tough</span>
          </h2>
          <p className="text-[var(--muted)] text-lg mb-10 max-w-2xl mx-auto">
            Bypassing FocusDragon requires knowing the exact mechanism, having your
            admin password, disabling the LaunchDaemon, editing protected system
            files, and during a lock — waiting for the timer, restarting your Mac,
            or typing random text.
          </p>
          <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8 md:p-12 inline-block text-left dragon-glow">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-[var(--muted)] mb-3 text-sm uppercase tracking-wider">
                  Browser Extension
                </h3>
                <div className="text-4xl font-bold text-red-400 mb-2">2 clicks</div>
                <p className="text-[var(--muted)] text-sm">5 seconds to disable</p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--muted)] mb-3 text-sm uppercase tracking-wider">
                  FocusDragon
                </h3>
                <div className="text-4xl font-bold text-emerald-400 mb-2">5+ steps</div>
                <p className="text-[var(--muted)] text-sm">
                  Annoying enough to keep you focused
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Focus</span>?
          </h2>
          <p className="text-[var(--muted)] text-lg mb-10 max-w-xl mx-auto">
            Download FocusDragon and take back control of your attention.
            Free forever — no account required.
          </p>

          <a
            href="/FocusDragon.dmg"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold text-xl px-10 py-5 rounded-2xl transition-colors mb-6"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download FocusDragon v1.1.0
          </a>

          <div className="text-sm text-[var(--muted)] space-y-1">
            <p>macOS 13 Ventura or later · Universal binary (Apple Silicon &amp; Intel)</p>
            <p className="text-xs">
              DMG installer · ~6 MB · Auto-updates via Sparkle
            </p>
          </div>

          <div className="mt-12 feature-card rounded-2xl bg-[var(--card-bg)] p-8 text-left max-w-lg mx-auto">
            <h3 className="font-bold mb-4">Quick Install</h3>
            <ol className="space-y-3 text-[var(--muted)] text-sm">
              <li className="flex gap-3">
                <span className="text-[var(--accent)] font-bold">1.</span>
                Download the DMG file above
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--accent)] font-bold">2.</span>
                Open the DMG and drag FocusDragon to Applications
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--accent)] font-bold">3.</span>
                Launch FocusDragon and grant permissions when prompted
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--accent)] font-bold">4.</span>
                Add websites &amp; apps to your block list and start focusing
              </li>
            </ol>
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
