import Image from "next/image";
import Link from "next/link";
import SiteNav from "./components/SiteNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-grid">
      <SiteNav />

      {/* ══════════════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-28 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow-secondary" aria-hidden="true" />

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl md:text-[6rem] md:leading-[1.05] font-black tracking-tight mb-8">
            You know you&apos;ll
            <br />
            <span className="gradient-text dragon-glow-text">
              bypass it.
            </span>
            <br />
            <span className="text-neutral-500">Not this one.</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-14 leading-relaxed">
            6 layers of system-level blocking. Locks that force you to commit.
            A background daemon you can&apos;t just quit.{" "}
            <span className="text-white font-medium">
              The free macOS blocker built for people who&apos;ve tried everything.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5">
            <a
              href="#download"
              className="download-btn group bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all flex items-center gap-3"
            >
              <svg className="w-6 h-6 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download for Mac — It&apos;s Free
            </a>
          </div>

          <p className="text-sm text-neutral-500 mb-3">
            macOS 13 Ventura or later · Apple Silicon &amp; Intel
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT STOPS YOU — 6 LAYERS
         ══════════════════════════════════════════════════════ */}
      <section id="features" className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              <span className="gradient-text">6 layers</span> between you
              <br className="hidden sm:block" />
              and your distractions.
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Every layer works independently. Bypass one, five more are still active.
            </p>
          </div>

          {/* Layers — stacked, not a grid */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                num: "01",
                title: "DNS Blocking",
                desc: "Rewrites /etc/hosts to redirect blocked domains to 0.0.0.0. Works in every browser. VPN-proof.",
              },
              {
                num: "02",
                title: "Process Killer",
                desc: "Monitors running apps every 1.5 seconds. Blocked apps are terminated on sight — can't be bypassed by renaming.",
              },
              {
                num: "03",
                title: "Root Daemon",
                desc: "Runs as root with elevated privileges. Starts on boot. Repairs itself if tampered with. Can't be killed without admin access.",
              },
              {
                num: "04",
                title: "Browser Extension",
                desc: "In-browser blocking with heartbeat monitoring. If the extension goes silent, the daemon force-quits the browser.",
              },
              {
                num: "05",
                title: "Network Firewall",
                desc: "PF-based packet filtering blocks all outbound traffic. Whitelist-only mode lets approved domains through.",
              },
              {
                num: "06",
                title: "Anti-Tamper",
                desc: "Blocks System Settings, Terminal, and Activity Monitor. Prevents uninstallation during locks. Logs bypass attempts.",
              },
            ].map((layer) => (
              <div
                key={layer.num}
                className="group flex items-start gap-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)]/40 p-6 md:p-8 transition-all hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)]"
              >
                <div className="text-3xl font-black text-[var(--accent)]/30 group-hover:text-[var(--accent)]/60 transition-colors select-none shrink-0 w-12">
                  {layer.num}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{layer.title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LOCK TYPES
         ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Locks that make you
              <br className="hidden sm:block" />
              <span className="gradient-text">mean it.</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Choose how hard it should be to quit. From a gentle nudge to
              &quot;I physically cannot access this machine until tomorrow.&quot;
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                name: "Timer",
                desc: "Block for a set duration. Cannot unlock early. Survives reboots.",
                intensity: "medium",
              },
              {
                name: "Schedule",
                desc: "Activate on specific days and hours. \"Block weekdays 9 AM – 5 PM.\"",
                intensity: "medium",
              },
              {
                name: "Breakable",
                desc: "Non-skippable countdown delay before unlock. Enough friction to reconsider.",
                intensity: "low",
              },
              {
                name: "Random Text",
                desc: "Type a long random string to unlock. No copy-paste — clipboard is auto-cleared.",
                intensity: "high",
              },
              {
                name: "Restart Lock",
                desc: "Requires actual system reboots to unlock. The daemon counts real boot events.",
                intensity: "high",
              },
              {
                name: "Date Lock",
                desc: "Locked until a calendar date. \"Unlock on June 1st.\" No exceptions.",
                intensity: "extreme",
              },
            ].map((lock) => (
              <div
                key={lock.name}
                className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-bold text-white text-lg">{lock.name}</h3>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      lock.intensity === "low"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : lock.intensity === "medium"
                          ? "bg-amber-500/15 text-amber-400"
                          : lock.intensity === "high"
                            ? "bg-orange-500/15 text-orange-400"
                            : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {lock.intensity}
                  </span>
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {lock.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THE DAEMON — dramatic single section
         ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] p-10 md:p-16 dragon-glow">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-6">
                The background daemon
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                It doesn&apos;t care
                <br />
                what you want.
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                FocusDragon installs a system daemon that runs as root.
                It starts on boot, enforces blocks even when the app is closed,
                and repairs itself if you tamper with it. Close the app, force-quit it,
                delete it — the daemon keeps going.
              </p>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                {[
                  "Monitors hosts file every 5 seconds",
                  "Kills blocked apps every 1.5 seconds",
                  "Auto-repairs tampered DNS rules",
                  "Verifies browser extension heartbeats",
                  "Force-quits browsers with stale extensions",
                  "Kills 20+ unsupported browser variants",
                  "Survives every reboot",
                  "Cannot be stopped without admin access",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-neutral-300">
                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THE CONTRAST — bypass difficulty
         ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Other blockers are a{" "}
              <span className="gradient-text">suggestion.</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">
              This is the difference between a blocker you can outsmart and one you can&apos;t.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* The others */}
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-5">
                Browser extensions &amp; most apps
              </div>
              <div className="text-5xl font-black text-red-400 mb-3">2 clicks</div>
              <p className="text-neutral-500 text-sm mb-6">to disable completely.</p>
              <ul className="space-y-2.5 text-neutral-500 text-sm">
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-red-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Disable extension in settings
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-red-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Open incognito or another browser
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-red-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Force-quit the app
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-red-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Uninstall and reinstall
                </li>
              </ul>
            </div>

            {/* FocusDragon */}
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)]/30 p-8 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-5">
                FocusDragon
              </div>
              <div className="text-5xl font-black text-emerald-400 mb-3">5+ steps</div>
              <p className="text-neutral-400 text-sm mb-6">and most are blocked during a lock.</p>
              <ul className="space-y-2.5 text-neutral-300 text-sm">
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Daemon keeps blocking after quit
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Incognito &amp; other browsers auto-killed
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  System Settings &amp; Terminal blocked
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Uninstall blocked during active lock
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FREE, NATIVE, NO CATCH
         ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16">
            What others charge <span className="gradient-text">$40+</span> for.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-center">
              <div className="text-4xl font-black gradient-text mb-2">$0</div>
              <div className="text-white font-semibold mb-2">Forever free</div>
              <p className="text-neutral-500 text-sm">
                No trial. No subscription. No upsell. No account.
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-center">
              <div className="text-4xl font-black gradient-text mb-2">SwiftUI</div>
              <div className="text-white font-semibold mb-2">Native macOS</div>
              <p className="text-neutral-500 text-sm">
                Not Electron. Fast, light, battery-friendly. Feels like it belongs on your Mac.
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-center">
              <div className="text-4xl font-black gradient-text mb-2">Zero</div>
              <div className="text-white font-semibold mb-2">Data collected</div>
              <p className="text-neutral-500 text-sm">
                Your blocklist, browsing history, and settings never leave your Mac.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DOWNLOAD
         ══════════════════════════════════════════════════════ */}
      <section id="download" className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Ready to <span className="gradient-text">stop pretending</span>
            <br className="hidden sm:block" />
            willpower is enough?
          </h2>
          <p className="text-neutral-400 text-lg mb-12 max-w-xl mx-auto">
            Download FocusDragon and take back the hours you&apos;ve been losing.
            Free forever — no account required.
          </p>

          <a
            href="/api/download"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-xl px-10 py-5 rounded-2xl transition-colors mb-6"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download FocusDragon v1.1.0
          </a>

          <div className="text-sm text-neutral-500 space-y-1">
            <p>macOS 13 Ventura or later · Universal binary (Apple Silicon &amp; Intel)</p>
            <p className="text-xs">
              DMG installer · ~6 MB · Auto-updates via Sparkle
            </p>
          </div>

          <div className="mt-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-left max-w-lg mx-auto">
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
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <span>·</span>
            <Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
