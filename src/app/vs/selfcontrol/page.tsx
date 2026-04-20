import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "SelfControl Alternative for Mac — FocusDragon (Free, Blocks Apps Too)",
  description:
    "SelfControl is great for a simple website timer. FocusDragon extends the same PF-firewall approach with app blocking, multiple lock modes, browser-extension enforcement, and anti-tamper safeguards — also free.",
  alternates: { canonical: "https://focusdragon.app/vs/selfcontrol" },
  openGraph: {
    title: "SelfControl Alternative for Mac — FocusDragon (Free)",
    description:
      "Same PF-firewall foundation as SelfControl, plus app blocking, multiple lock modes, and anti-tamper.",
    url: "https://focusdragon.app/vs/selfcontrol",
    type: "website",
  },
};

const faqs = [
  {
    q: "Is FocusDragon also free like SelfControl?",
    a: "Yes. Both are free. SelfControl is open-source under GPL-3.0; FocusDragon is free but not open-source. There's no account or paid tier on either.",
  },
  {
    q: "Don't FocusDragon and SelfControl use the same blocking technique?",
    a: "At the network layer, yes — both rely on macOS's built-in PF (Packet Filter) firewall, plus /etc/hosts entries, plus a privileged helper. The difference is what's built on top. FocusDragon adds process-level app monitoring, browser extensions with heartbeat, multiple lock modes beyond a single timer, anti-tamper on System Settings/Terminal/Activity Monitor, and a persistent launchd daemon that auto-repairs tampering.",
  },
  {
    q: "Can VPNs bypass both SelfControl and FocusDragon?",
    a: "Yes — SelfControl's FAQ explicitly acknowledges this: 'SelfControl will not block websites properly if you're using a VPN. This is not technically feasible.' FocusDragon has the same underlying limitation at the network layer, though the process-killer and browser-extension layers still fire. No free macOS blocker currently blocks a VPN-tunneled connection at the network layer without a paid Apple Developer account and a Network Extension content filter.",
  },
  {
    q: "Does FocusDragon block apps? SelfControl doesn't.",
    a: "Yes — that's the biggest functional difference. SelfControl blocks 'websites, mail servers, or anything else on the Internet' but not desktop apps. FocusDragon's process-killer layer terminates blocked apps every 1.5 seconds, so a native Mac app (Slack, Discord, Steam, a game) on the block list won't launch.",
  },
  {
    q: "Does SelfControl have random-text or restart-count unlock?",
    a: "No. SelfControl has exactly one lock mode: a timer from 1 minute to 24 hours. Once started, the block is irreversible until the timer expires. FocusDragon offers six lock modes (timer, schedule, breakable, random-text, restart-count, date) that can be combined.",
  },
  {
    q: "Is SelfControl still maintained?",
    a: "Yes, though slowly. The GitHub repo had commits as recently as late December 2025. The official release-notes page lists version 4.0.2 without dates. Community support happens on GitHub issues; there's no paid support.",
  },
];

export default function VsSelfControl() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://focusdragon.app" },
          { name: "vs SelfControl", url: "https://focusdragon.app/vs/selfcontrol" },
        ]),
        faqSchema(faqs),
      ]} />

      <SiteNav />

      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow-secondary" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-1.5 text-xs uppercase tracking-widest text-[var(--muted)] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            SelfControl alternative &middot; macOS
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            Same foundation.
            <br />
            <span className="gradient-text dragon-glow-text">More layers on top.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            SelfControl is a beautifully minimal Mac app: one timer, one blocklist, irreversible until it ends.
            FocusDragon uses the same PF-firewall foundation and adds what SelfControl leaves out.{" "}
            <span className="text-white font-medium">
              App blocking. Multiple lock modes. Anti-tamper. Same price: free.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/#download"
              className="download-btn bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
            >
              Download FocusDragon &mdash; Free
            </Link>
            <a
              href="#compare"
              className="border border-[var(--card-border)] hover:border-[var(--muted)] text-white font-medium px-7 py-4 rounded-2xl transition-colors"
            >
              See what&apos;s added
            </a>
          </div>
        </div>
      </section>

      {/* HONEST DISCLAIMER */}
      <section className="py-16 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">
            Upfront
          </div>
          <p className="text-neutral-300 text-lg leading-relaxed mb-4">
            SelfControl is one of the most loved utilities in the Mac software community.
            It&apos;s open source under GPL-3.0, has been around since 2009, and the UI is
            a model of restraint. If all you need is a timer that blocks websites and won&apos;t let
            you cancel early, SelfControl is still a great choice.
          </p>
          <p className="text-neutral-300 text-lg leading-relaxed">
            FocusDragon is the right pick if you also need to block apps, want multiple lock types,
            or want tamper resistance on System Settings and Terminal during a lock.
          </p>
        </div>
      </section>

      {/* WHAT'S ADDED */}
      <section id="compare" className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              What FocusDragon adds on top of <span className="gradient-text">SelfControl&apos;s foundation</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Both use PF + /etc/hosts + a privileged helper. These are the additional layers.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { title: "Desktop app blocking", body: "Process monitor scans running apps every 1.5 seconds and terminates anything on the block list — Slack, Discord, Steam, any game. SelfControl blocks only internet targets, not apps." },
              { title: "Six lock modes, not one", body: "Timer, schedule, breakable-with-delay, random-text (200+ chars, clipboard auto-cleared), restart-count, and date lock. SelfControl has a single 1-minute-to-24-hour timer." },
              { title: "Scheduled and recurring blocks", body: "Blocks can fire on a recurring schedule (e.g., Mon–Fri 9 AM – 5 PM). SelfControl requires you to manually start every block." },
              { title: "Browser-extension heartbeat", body: "Extensions for Safari, Chrome, Firefox, Brave, Edge, Opera, Vivaldi, and Comet monitor in-browser activity. If the extension stops heartbeating (you try to disable it mid-lock), the browser is force-quit." },
              { title: "Anti-tamper on system tools", body: "While a lock is active, System Settings, Terminal, and Activity Monitor are blocked — so you can't disable the daemon, flush PF rules, or kill processes manually. Uninstall is also blocked during active locks." },
              { title: "Self-repairing daemon", body: "A launchd daemon runs as root, auto-restarts on crash, and re-writes /etc/hosts and PF anchors if it detects tampering. SelfControl's helper sets the block and waits for expiry." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6 flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE TABLE */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              FocusDragon vs <span className="gradient-text">SelfControl</span>
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
            <div className="grid grid-cols-3 text-sm">
              <div className="p-5 font-semibold text-[var(--muted)] text-xs uppercase tracking-widest">Feature</div>
              <div className="p-5 font-semibold text-white text-center border-l border-[var(--card-border)]">
                <span className="gradient-text">FocusDragon</span>
              </div>
              <div className="p-5 font-semibold text-neutral-400 text-center border-l border-[var(--card-border)]">SelfControl</div>

              {[
                ["Price", "Free", "Free (donationware)"],
                ["Open source", "No", "Yes (GPL-3.0)"],
                ["Network-layer technique", "PF firewall + /etc/hosts", "PF firewall + /etc/hosts"],
                ["Blocks websites", "Yes", "Yes"],
                ["Blocks desktop apps", "Yes", "No"],
                ["Blocks mail servers", "Add manually", "Yes (built-in support)"],
                ["Whitelist / exceptions mode", "Yes", "Yes"],
                ["Lock modes", "Timer, schedule, breakable, random-text, restart-count, date", "Timer only"],
                ["Scheduled recurring blocks", "Yes", "No"],
                ["Browser extensions", "Yes (8 browsers, heartbeat-monitored)", "No"],
                ["System Settings blocked during lock", "Yes", "No"],
                ["VPN-resistant at network layer", "No (PF limitation, same as SelfControl)", "No (officially acknowledged)"],
                ["Irreversible during active block", "Yes", "Yes"],
                ["Latest version", "1.1.6", "4.0.2"],
              ].map(([feature, fd, sc], idx) => (
                <div key={feature} className="contents">
                  <div className={`p-5 text-neutral-300 ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>{feature}</div>
                  <div className={`p-5 text-white text-center border-l border-[var(--card-border)] ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>
                    {fd}
                  </div>
                  <div className={`p-5 text-neutral-400 text-center border-l border-[var(--card-border)] ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>
                    {sc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHEN TO PICK WHICH */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Which one <span className="gradient-text">for you?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)]/30 p-8 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">Pick FocusDragon if</div>
              <ul className="space-y-3 text-neutral-300">
                <li>&middot; You also need to block native apps (Slack, games, Discord)</li>
                <li>&middot; You want scheduling or recurring blocks</li>
                <li>&middot; You want multiple lock types beyond a simple timer</li>
                <li>&middot; You want anti-tamper on System Settings and Terminal</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">Pick SelfControl if</div>
              <ul className="space-y-3 text-neutral-400">
                <li>&middot; You only need a one-off timer block for websites</li>
                <li>&middot; You strongly prefer open-source software (GPL-3.0)</li>
                <li>&middot; You want a minimal, single-purpose tool</li>
                <li>&middot; You already use it and it does everything you need</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12 text-center">
            Frequent <span className="gradient-text">questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6 open:border-[var(--accent)]/40 transition-colors">
                <summary className="cursor-pointer font-semibold text-white text-lg list-none flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[var(--accent)] text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-neutral-400 leading-relaxed mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            More than a <span className="gradient-text">website timer.</span>
          </h2>
          <Link
            href="/#download"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-xl px-10 py-5 rounded-2xl transition-colors"
          >
            Download FocusDragon for Mac
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
