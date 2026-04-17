import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "SelfControl Alternative for Mac — FocusDragon (Free, Blocks Apps Too)",
  description:
    "SelfControl only blocks websites, runs a single timer, and can be bypassed by changing DNS. FocusDragon is a free Mac alternative that also blocks apps, survives reboots, and resists every common bypass.",
  alternates: { canonical: "https://focusdragon.app/vs/selfcontrol" },
  openGraph: {
    title: "SelfControl Alternative for Mac — FocusDragon (Free)",
    description:
      "Free SelfControl alternative that also blocks apps, offers six lock types, and enforces through a root daemon.",
    url: "https://focusdragon.app/vs/selfcontrol",
    type: "website",
  },
};

const faqs = [
  {
    q: "Is FocusDragon also free like SelfControl?",
    a: "Yes. Both are free. FocusDragon is not open-source but is free forever, with no account and no upsell — the author built it to beat his own gaming addiction and releases it free as a matter of principle.",
  },
  {
    q: "Does FocusDragon block apps? SelfControl only blocks websites.",
    a: "Yes. FocusDragon blocks applications in addition to websites. A background daemon monitors running processes every 1.5 seconds and terminates anything on your block list — even if the binary is renamed.",
  },
  {
    q: "Can FocusDragon be bypassed by changing DNS or using a VPN?",
    a: "No. Unlike SelfControl (which only edits /etc/hosts), FocusDragon combines DNS-level blocking with process monitoring, PF-based network firewall rules, a browser-extension heartbeat, and a root daemon. Even if you change DNS or route traffic through a VPN, other layers still fire.",
  },
  {
    q: "Does FocusDragon survive reboots like SelfControl does?",
    a: "Yes, and more robustly. SelfControl's block survives a reboot because the /etc/hosts rewrite persists. FocusDragon's root daemon restarts on boot, re-verifies all blocks, and repairs any tampering — it doesn't just persist, it actively re-enforces.",
  },
  {
    q: "Why use FocusDragon instead of SelfControl if both are free?",
    a: "SelfControl is great for a one-off website block with a timer. FocusDragon is for people who've already bypassed SelfControl (by editing /etc/hosts, restarting into safe mode, or using another browser) and need something that can't be outsmarted. Six lock types, six blocking layers, app blocking included.",
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
            SelfControl is great.
            <br />
            <span className="gradient-text dragon-glow-text">Until you get clever.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            SelfControl blocks websites with a single /etc/hosts timer. It works &mdash; until
            you realise the block doesn&apos;t cover apps, doesn&apos;t cover VPNs, and can be
            bypassed in a minute if you know what you&apos;re doing.{" "}
            <span className="text-white font-medium">FocusDragon is free too. It just doesn&apos;t fold.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/#download"
              className="download-btn bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
            >
              Upgrade to FocusDragon &mdash; Free
            </Link>
            <a
              href="#compare"
              className="border border-[var(--card-border)] hover:border-[var(--muted)] text-white font-medium px-7 py-4 rounded-2xl transition-colors"
            >
              See the bypass list
            </a>
          </div>
        </div>
      </section>

      {/* BYPASS LIST */}
      <section id="compare" className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Every way people <span className="gradient-text">bypass SelfControl</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              If you&apos;ve used SelfControl for more than a week, you&apos;ve
              probably done at least one of these.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { bypass: "Open the blocked site in a different browser", fd: "Force-quits any browser whose extension isn't heartbeating." },
              { bypass: "Use an incognito/private window", fd: "Incognito is killed on sight by the daemon." },
              { bypass: "Change DNS to 8.8.8.8 to skip /etc/hosts", fd: "PF firewall rules block outbound traffic regardless of DNS." },
              { bypass: "Use a VPN to tunnel around it", fd: "Process-level blocks + app killer still fire." },
              { bypass: "Restart in safe mode, delete the block file", fd: "Daemon runs as root, starts on boot, re-verifies every 5s." },
              { bypass: "Just open the native Mac app (Slack, Discord, etc.)", fd: "Apps are on the block list too. Killed every 1.5s." },
              { bypass: "Wait out the timer and re-open immediately", fd: "Restart-count lock: you must actually reboot N times." },
              { bypass: "Skip the unlock delay", fd: "Random-text lock: type 200+ characters, clipboard auto-cleared." },
            ].map((row) => (
              <div key={row.bypass} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6 grid md:grid-cols-[1fr_auto_1fr] items-center gap-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-red-400/80 font-semibold mb-1">Bypass</div>
                  <div className="text-neutral-300">{row.bypass}</div>
                </div>
                <div className="hidden md:block text-[var(--accent)] font-bold text-sm">&rarr;</div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-emerald-400/80 font-semibold mb-1">FocusDragon response</div>
                  <div className="text-white">{row.fd}</div>
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
                ["Price", "Free forever", "Free (open source)"],
                ["Blocks websites", "Yes", "Yes"],
                ["Blocks apps", "Yes, process-killer", "No"],
                ["VPN/DNS-change resistant", "Yes, PF firewall layer", "No"],
                ["Bypass-resistant daemon", "Root daemon, self-repairing", "No daemon"],
                ["Lock types", "6 composable", "1 (timer)"],
                ["Restart-count lock", "Yes", "No"],
                ["Random-text unlock", "Yes", "No"],
                ["Schedule-based blocks", "Yes", "No"],
                ["Blocks System Settings", "Yes, during lock", "No"],
                ["UI design", "Native SwiftUI", "Classic Cocoa"],
                ["Active maintenance", "Yes, v1.1.0 shipping", "Intermittent"],
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
                <li>&middot; You&apos;ve already bypassed SelfControl before</li>
                <li>&middot; You also need to block native apps (Slack, games, Discord)</li>
                <li>&middot; You want multiple lock types, not just a timer</li>
                <li>&middot; You want a blocker that survives VPN/DNS changes</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">Pick SelfControl if</div>
              <ul className="space-y-3 text-neutral-400">
                <li>&middot; You only need a one-off timer block for a few websites</li>
                <li>&middot; You prefer strictly open-source tools</li>
                <li>&middot; You trust yourself not to look for bypasses</li>
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
            Stop outsmarting your own <span className="gradient-text">blocker.</span>
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
