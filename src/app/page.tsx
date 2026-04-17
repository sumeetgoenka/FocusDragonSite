import Link from "next/link";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import JsonLd, { softwareAppSchema } from "./components/JsonLd";

export default function Home() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={softwareAppSchema} />
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
              Download for Mac &mdash; It&apos;s Free
            </a>
          </div>

          <p className="text-sm text-neutral-500 mb-3">
            macOS 13 Ventura or later &middot; Apple Silicon &amp; Intel
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY THIS EXISTS
         ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-6">
              Why this exists
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              You&apos;re not lazy.<br />
              <span className="gradient-text">You&apos;re fighting a rigged game.</span>
            </h2>
          </div>

          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              Every app on your phone and every website on your laptop was engineered by teams of people
              whose full-time job is to keep you scrolling. Variable-ratio reinforcement schedules,
              infinite feeds, autoplay, notification badges &mdash; the same techniques slot machines use.
            </p>
            <p>
              Research published in the <em>Journal of Behavioral Addictions</em> found that the average
              person checks their phone <strong className="text-white">96 times per day</strong> and
              spends <strong className="text-white">over 4 hours</strong> on distracting websites.
              Not because they&apos;re weak &mdash; because the other side has a billion-dollar budget.
            </p>
            <p>
              You&apos;ve already tried willpower. You&apos;ve tried browser extensions you disabled
              in 10 seconds. You&apos;ve tried Screen Time and turned it off when it got
              inconvenient. <strong className="text-white">That&apos;s not a character flaw. That&apos;s
              the expected outcome.</strong>
            </p>
            <p>
              FocusDragon was built by someone who went through the same cycle &mdash; install blocker,
              bypass blocker, feel guilty, repeat &mdash; and finally asked:
              <em className="text-[var(--accent)]"> what if the blocker actually refused to move?</em>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          USE CASES — WHO IS THIS FOR
         ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Built for people who <span className="gradient-text">need it to work.</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Whatever your reason, FocusDragon doesn&apos;t judge. It just blocks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { emoji: "🎓", title: "Students", desc: "Block social media during study sessions. Stop losing entire evenings to YouTube before exams." },
              { emoji: "💻", title: "Remote workers", desc: "Stay focused during work hours without a manager watching. Block distracting sites 9-to-5." },
              { emoji: "✍️", title: "Writers & creators", desc: "Enter deep work without Reddit or Twitter pulling you out every 10 minutes." },
              { emoji: "🎰", title: "Gambling recovery", desc: "Block betting sites with locks you physically cannot undo. Remove the option entirely." },
              { emoji: "😴", title: "Better sleep", desc: "Block stimulating sites after 10 PM. Stop doom-scrolling in bed until 2 AM." },
              { emoji: "📵", title: "Digital detox", desc: "Go cold turkey on specific platforms. Lock them away for a week and see what changes." },
              { emoji: "🧠", title: "ADHD & focus issues", desc: "External structure when your brain won't provide it. Make distractions physically inaccessible." },
              { emoji: "📚", title: "Researchers", desc: "Block everything except your research tools. Force yourself to stay in the material." },
              { emoji: "🏋️", title: "Habit builders", desc: "Pair blocking with any routine. Block entertainment until you've done your morning workout." },
            ].map((uc) => (
              <div key={uc.title} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
                <div className="text-2xl mb-3">{uc.emoji}</div>
                <h3 className="font-bold text-white mb-1">{uc.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
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

          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { num: "01", title: "DNS Blocking", desc: "Rewrites /etc/hosts to redirect blocked domains to 0.0.0.0. Works in every browser. VPN-proof." },
              { num: "02", title: "Process Killer", desc: "Monitors running apps every 1.5 seconds. Blocked apps are terminated on sight — can't be bypassed by renaming." },
              { num: "03", title: "Root Daemon", desc: "Runs as root with elevated privileges. Starts on boot. Repairs itself if tampered with. Can't be killed without admin access." },
              { num: "04", title: "Browser Extension", desc: "In-browser blocking with heartbeat monitoring. If the extension goes silent, the daemon force-quits the browser." },
              { num: "05", title: "Network Firewall", desc: "PF-based packet filtering blocks all outbound traffic. Whitelist-only mode lets approved domains through." },
              { num: "06", title: "Anti-Tamper", desc: "Blocks System Settings, Terminal, and Activity Monitor. Prevents uninstallation during locks. Logs bypass attempts." },
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
              { name: "Timer", desc: "Block for a set duration. Cannot unlock early. Survives reboots.", intensity: "medium" },
              { name: "Schedule", desc: "Activate on specific days and hours. \"Block weekdays 9 AM – 5 PM.\"", intensity: "medium" },
              { name: "Breakable", desc: "Non-skippable countdown delay before unlock. Enough friction to reconsider.", intensity: "low" },
              { name: "Random Text", desc: "Type a long random string to unlock. No copy-paste — clipboard is auto-cleared.", intensity: "high" },
              { name: "Restart Lock", desc: "Requires actual system reboots to unlock. The daemon counts real boot events.", intensity: "high" },
              { name: "Date Lock", desc: "Locked until a calendar date. \"Unlock on June 1st.\" No exceptions.", intensity: "extreme" },
            ].map((lock) => (
              <div key={lock.name} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-bold text-white text-lg">{lock.name}</h3>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    lock.intensity === "low" ? "bg-emerald-500/15 text-emerald-400"
                    : lock.intensity === "medium" ? "bg-amber-500/15 text-amber-400"
                    : lock.intensity === "high" ? "bg-orange-500/15 text-orange-400"
                    : "bg-red-500/15 text-red-400"
                  }`}>
                    {lock.intensity}
                  </span>
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{lock.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THE DAEMON
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
                delete it &mdash; the daemon keeps going.
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
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-5">
                Browser extensions &amp; most apps
              </div>
              <div className="text-5xl font-black text-red-400 mb-3">2 clicks</div>
              <p className="text-neutral-500 text-sm mb-6">to disable completely.</p>
              <ul className="space-y-2.5 text-neutral-500 text-sm">
                {["Disable extension in settings", "Open incognito or another browser", "Force-quit the app", "Uninstall and reinstall"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-red-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)]/30 p-8 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-5">
                FocusDragon
              </div>
              <div className="text-5xl font-black text-emerald-400 mb-3">5+ steps</div>
              <p className="text-neutral-400 text-sm mb-6">and most are blocked during a lock.</p>
              <ul className="space-y-2.5 text-neutral-300 text-sm">
                {["Daemon keeps blocking after quit", "Incognito & other browsers auto-killed", "System Settings & Terminal blocked", "Uninstall blocked during active lock"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SOCIAL PROOF
         ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              People who <span className="gradient-text">stopped fighting themselves.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                quote: "I've tried every blocker on the Mac App Store. FocusDragon is the first one I couldn't outsmart. The daemon is genuinely unkillable.",
                name: "CS student",
                detail: "Blocked Reddit during finals week",
              },
              {
                quote: "The random-text lock is the thing that finally works for me. My brain can't rationalize typing 200 characters of garbage. It just... gives up.",
                name: "Remote developer",
                detail: "Uses timer locks Mon-Fri",
              },
              {
                quote: "I used to open incognito the second I felt bored. Now Chrome just dies if the extension isn't running. There's nowhere to go.",
                name: "Freelance writer",
                detail: "Blocked 40+ sites",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
                <div className="text-[var(--accent)] text-3xl mb-4">&ldquo;</div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">{t.quote}</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-neutral-500 text-xs">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FREE MODEL + PRIVACY
         ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Free forever. <span className="gradient-text">Here&apos;s why.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 md:p-10">
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                Most blockers charge $30&ndash;$60 because they need to fund a company.
                FocusDragon is a solo project built out of personal frustration.
                There are no investors, no employees, no office.
                The hosting costs less than a coffee per month.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                Charging for a tool that helps people overcome compulsive behaviour
                felt wrong &mdash; especially when the people who need it most are often
                the ones least able to commit to yet another subscription.
              </p>
              <p className="text-neutral-300 text-lg leading-relaxed font-medium">
                So it&apos;s free. No trial period, no feature gates, no &ldquo;premium tier&rdquo;,
                no account required. Every feature, every lock type, forever.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
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
              <div className="text-4xl font-black gradient-text mb-2">Local</div>
              <div className="text-white font-semibold mb-2">100% on your Mac</div>
              <p className="text-neutral-500 text-sm">
                No cloud. No server. No tracking. Everything stays on your machine.
              </p>
            </div>
          </div>

          {/* Privacy statement */}
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="font-bold text-white text-xl mb-3">Your data stays on your Mac. Period.</h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    FocusDragon has no server, no accounts, and no cloud sync.
                    Your block list, browsing history, lock configuration, and usage patterns
                    are stored locally on your Mac and never transmitted anywhere.
                    The app doesn&apos;t even have network permission &mdash; it
                    physically cannot phone home.
                  </p>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    You can optionally enable anonymous usage telemetry (disabled by default)
                    to help prioritise features. If enabled, it sends aggregate events
                    like &ldquo;a block was started&rdquo; &mdash; never your block list contents,
                    site names, app names, or any personal information.
                  </p>
                  <Link href="/privacy" className="text-[var(--accent)] hover:underline text-sm font-medium">
                    Read the full privacy policy &rarr;
                  </Link>
                </div>
              </div>
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
            Free forever &mdash; no account required.
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
            <p>macOS 13 Ventura or later &middot; Universal binary (Apple Silicon &amp; Intel)</p>
            <p className="text-xs">
              DMG installer &middot; ~6 MB &middot; Auto-updates via Sparkle
            </p>
          </div>

          <div className="mt-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-left max-w-lg mx-auto">
            <h3 className="font-bold mb-4">Quick Install</h3>
            <ol className="space-y-3 text-[var(--muted)] text-sm">
              <li className="flex gap-3"><span className="text-[var(--accent)] font-bold">1.</span>Download the DMG file above</li>
              <li className="flex gap-3"><span className="text-[var(--accent)] font-bold">2.</span>Open the DMG and drag FocusDragon to Applications</li>
              <li className="flex gap-3"><span className="text-[var(--accent)] font-bold">3.</span>Launch FocusDragon and grant permissions when prompted</li>
              <li className="flex gap-3"><span className="text-[var(--accent)] font-bold">4.</span>Add websites &amp; apps to your block list and start focusing</li>
            </ol>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
