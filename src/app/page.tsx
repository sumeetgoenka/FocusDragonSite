import Image from "next/image";
import Link from "next/link";

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
              v1.0.0
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
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
            <Link href="/faqs" className="hover:text-white transition-colors">
              FAQs
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-8 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[var(--muted)]">
              Version 1.0.0 — Free & Open Source
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            The Toughest{" "}
            <span className="gradient-text dragon-glow-text">Free</span>{" "}
            Website &amp; App Blocker
          </h1>

          <p className="text-xl md:text-2xl text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            6 layers of distraction blocking. System-level enforcement.
            Lock mechanisms that actually work.{" "}
            <span className="text-white font-medium">Built natively for macOS.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#download"
              className="download-btn bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download for Mac
            </a>
            <a
              href="https://github.com/sumeetgoenka/FocusDragon"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--card-border)] hover:border-[var(--muted)] text-white font-medium text-lg px-8 py-4 rounded-xl transition-colors flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>

          <p className="text-sm text-[var(--muted)]">
            Requires macOS 13 Ventura or later · Universal binary (Apple Silicon &amp; Intel)
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

      {/* Problem Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Existing Blockers <span className="gradient-text">Don&apos;t Work</span>
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              Browser extensions can be disabled in 2 clicks. Paid apps cost $30-100+.
              macOS parental controls weren&apos;t designed for self-imposed blocking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="font-bold text-lg mb-3">Browser Extensions</h3>
              <ul className="space-y-2 text-[var(--muted)] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Only work in one browser
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Easy to disable or bypass
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Don&apos;t block applications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> No system-level enforcement
                </li>
              </ul>
            </div>
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-bold text-lg mb-3">Paid Apps</h3>
              <ul className="space-y-2 text-[var(--muted)] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Cost $30-100+
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Subscription models
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Closed source code
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Privacy concerns
                </li>
              </ul>
            </div>
            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="text-3xl mb-4">🍎</div>
              <h3 className="font-bold text-lg mb-3">macOS Parental Controls</h3>
              <ul className="space-y-2 text-[var(--muted)] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Designed for parents, not self-use
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Limited customization
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> No lock mechanisms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> Easy to circumvent
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — 6 Layers */}
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
                icon: "🛡️",
              },
              {
                layer: "2",
                title: "Process Monitoring",
                desc: "Continuously monitors running apps and terminates blocked ones within 1-2 seconds. Uses bundle IDs — can't be bypassed by renaming.",
                icon: "👁️",
              },
              {
                layer: "3",
                title: "Background Daemon",
                desc: "Runs as root with elevated privileges. Auto-starts on boot. Protects hosts file from tampering. Can't be killed without admin access.",
                icon: "⚙️",
              },
              {
                layer: "4",
                title: "Browser Extensions",
                desc: "Redundant blocking for Chrome, Firefox, Safari, Edge, Brave, Opera & more. Works in incognito. Blocks by IP too.",
                icon: "🧩",
              },
              {
                layer: "5",
                title: "Lock Mechanisms",
                desc: "Timer lock, random text lock, schedule lock, restart lock, and breakable lock. Choose how hard it should be to disable.",
                icon: "🔒",
              },
              {
                layer: "6",
                title: "Anti-Tamper",
                desc: "Prevents uninstallation during locks. Blocks System Settings to prevent time changes. Detects and logs bypass attempts.",
                icon: "🐉",
              },
            ].map((item) => (
              <div
                key={item.layer}
                className="feature-card rounded-2xl bg-[var(--card-bg)] p-8 relative overflow-hidden"
              >
                <div className="layer-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-[var(--accent)] mb-4">
                  Layer {item.layer}
                </div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                <span className="text-2xl">⏱️</span> 5 Lock Types
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
                  <span>— &quot;Block 9 AM - 5 PM, weekdays&quot;</span>
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
                <span className="text-2xl">🎯</span> Use Cases
              </h3>
              <ul className="space-y-3 text-[var(--muted)]">
                <li>&quot;Block Reddit during work hours&quot;</li>
                <li>&quot;No YouTube while studying for exams&quot;</li>
                <li>&quot;Block all games from 9 AM - 5 PM&quot;</li>
                <li>&quot;Lock myself out of Twitter for a week&quot;</li>
                <li>&quot;Pomodoro: 25 min work, 5 min break&quot;</li>
              </ul>
            </div>

            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                <span className="text-2xl">🖥️</span> Native macOS Experience
              </h3>
              <p className="text-[var(--muted)] leading-relaxed">
                Built with SwiftUI — not Electron. Follows Apple Human Interface
                Guidelines. Fast, responsive, and battery-friendly. Feels like it
                belongs on your Mac.
              </p>
            </div>

            <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                <span className="text-2xl">🔓</span> Free &amp; Open Source
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

      {/* Comparison Table */}
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
                {[
                  ["Price", "Free", "$39", "$40/yr", "Free"],
                  ["Open Source", "✅", "❌", "❌", "Some"],
                  ["Block Websites", "✅", "✅", "✅", "✅"],
                  ["Block Apps", "✅", "✅", "✅", "❌"],
                  ["System-Level", "✅", "✅", "✅", "❌"],
                  ["Lock Mechanisms", "5 types", "Yes", "Limited", "❌"],
                  ["macOS Native", "SwiftUI", "Electron", "Electron", "N/A"],
                  ["Browser Extensions", "✅", "✅", "✅", "✅"],
                  ["Statistics", "✅", "✅", "✅", "Limited"],
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="font-medium">{row[0]}</td>
                    <td className="text-center font-medium text-white">{row[1]}</td>
                    <td className="text-center text-[var(--muted)]">{row[2]}</td>
                    <td className="text-center text-[var(--muted)]">{row[3]}</td>
                    <td className="text-center text-[var(--muted)]">{row[4]}</td>
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
                <div className="text-4xl font-bold text-green-400 mb-2">5+ steps</div>
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
            Download FocusDragon v1.0.0
          </a>

          <div className="text-sm text-[var(--muted)] space-y-1">
            <p>macOS 13 Ventura or later · Universal binary (Apple Silicon &amp; Intel)</p>
            <p className="text-xs">
              DMG installer · ~15 MB · No auto-updates (yet)
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
            <span className="text-xs text-[var(--muted)]">v1.0.0</span>
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
