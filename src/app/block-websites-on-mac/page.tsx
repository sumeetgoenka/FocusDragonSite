import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "How to Block Websites on Mac (2026 Guide) — FocusDragon",
  description:
    "The complete 2026 guide to blocking websites on macOS: every built-in method, every free tool, their weaknesses, and the one blocker that actually can't be bypassed.",
  alternates: { canonical: "https://www.focusdragon.app/block-websites-on-mac" },
  openGraph: {
    title: "How to Block Websites on Mac — The Complete 2026 Guide",
    description:
      "Every method to block websites on macOS, compared. Screen Time, /etc/hosts, SelfControl, and FocusDragon.",
    url: "https://www.focusdragon.app/block-websites-on-mac",
    type: "article",
  },
};

const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to block websites on Mac",
  description: "Step-by-step guide to blocking distracting websites on macOS using FocusDragon.",
  totalTime: "PT5M",
  step: [
    { "@type": "HowToStep", name: "Download FocusDragon", text: "Download the free DMG from focusdragon.app and drag it into Applications." },
    { "@type": "HowToStep", name: "Grant permissions", text: "Launch FocusDragon and grant the one-time admin permission required for the blocking daemon." },
    { "@type": "HowToStep", name: "Add websites to your block list", text: "Open the block list and add domains like reddit.com, youtube.com, or any custom site. Use preset categories to block groups in one click." },
    { "@type": "HowToStep", name: "Choose a lock type", text: "Pick from six lock types — timer, schedule, breakable, random-text, restart, or date — depending on how hard you want the block to be to undo." },
    { "@type": "HowToStep", name: "Start the block", text: "Press Start Lock. The daemon immediately enforces the block across every browser, even if you close or uninstall the app." },
  ],
};

const faqs = [
  {
    q: "How do I block websites on Mac for free?",
    a: "The easiest free way is to install FocusDragon — it blocks websites across every browser using /etc/hosts entries, PF firewall rules, and browser extensions enforced by a root launchd daemon. Other free options: editing /etc/hosts manually, using macOS Screen Time, installing SelfControl, or using Freedom's free tier. Each has different tradeoffs covered below.",
  },
  {
    q: "Can I block websites on Mac using Screen Time?",
    a: "Yes, macOS Screen Time supports website restrictions under Content & Privacy. The catch: it only works in Safari properly, other browsers can bypass it, and anyone with your Screen Time passcode can turn it off in seconds. It's useful for kids' devices, less useful for self-blocking when you're the one with the passcode.",
  },
  {
    q: "How do I block a website permanently on Mac?",
    a: "For truly permanent blocks, use FocusDragon's date-lock or restart-count lock modes. A date lock blocks the site until a calendar date you choose (e.g., 'unlock on January 1st'). A restart-count lock requires you to actually reboot your Mac N times before the lock releases. Both survive app reinstalls.",
  },
  {
    q: "Why can't I just edit /etc/hosts to block a website?",
    a: "You can, and it works — for about a week, until you remember the file exists. /etc/hosts is editable by any admin user in two terminal commands, only affects apps that use the system resolver (Firefox with DNS-over-HTTPS will bypass it), and doesn't cover native apps at all. FocusDragon uses /etc/hosts as one of six layers, so even if you edit it back, the PF firewall rule, daemon, and browser extensions still enforce the block.",
  },
  {
    q: "Does blocking websites on Mac slow down my computer?",
    a: "No, if the blocker is well-built. FocusDragon is written natively in Swift, is around 6 MB installed, and uses less than 0.1% CPU on average. The PF firewall rules run in the kernel and are effectively free at runtime.",
  },
];

export default function BlockWebsitesOnMac() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://www.focusdragon.app" },
          { name: "Block websites on Mac", url: "https://www.focusdragon.app/block-websites-on-mac" },
        ]),
        faqSchema(faqs),
        howTo,
      ]} />

      <SiteNav />

      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow-secondary" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-1.5 text-xs uppercase tracking-widest text-[var(--muted)] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            The complete 2026 guide
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            How to block websites
            <br />
            <span className="gradient-text dragon-glow-text">on your Mac.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Every method that exists, ranked honestly: what works, what doesn&apos;t,
            and what to pick for each situation.
          </p>
          <Link
            href="/#download"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
          >
            Jump to the best option &rarr;
          </Link>
        </div>
      </section>

      {/* TL;DR */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">TL;DR</div>
          <p className="text-neutral-300 text-lg leading-relaxed mb-4">
            If you want a <strong className="text-white">quick, casual block</strong> for one site for an hour,
            SelfControl or a browser extension is fine.
          </p>
          <p className="text-neutral-300 text-lg leading-relaxed mb-4">
            If you want a <strong className="text-white">serious block</strong> that covers websites + apps with multiple
            lock types, only Cold Turkey Pro ($45) and FocusDragon (free) do that on Mac.
          </p>
          <p className="text-neutral-300 text-lg leading-relaxed">
            None of these tools can block traffic tunnelled through a VPN at the network layer &mdash;
            that requires a paid Apple Developer Network Extension content filter, which no free Mac blocker
            currently ships. Blockers with app-killer layers (FocusDragon, Cold Turkey Pro) still catch
            the app side of the problem.
          </p>
        </div>
      </section>

      {/* METHOD 1 — HOSTS FILE */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">Method 01</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
            Editing <span className="gradient-text">/etc/hosts</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-6">
            The oldest trick on Unix: map the domain to <code className="text-[var(--accent)]">0.0.0.0</code> so nothing resolves.
            It&apos;s free, requires no software, and works across every browser. It&apos;s also the weakest option on this list.
          </p>

          <div className="rounded-2xl bg-black border border-[var(--card-border)] p-5 font-mono text-sm text-neutral-300 mb-6 overflow-x-auto">
            <div className="text-neutral-500"># Open Terminal and run:</div>
            <div><span className="text-emerald-400">sudo</span> nano /etc/hosts</div>
            <div className="text-neutral-500 mt-3"># Then add:</div>
            <div>0.0.0.0 reddit.com</div>
            <div>0.0.0.0 www.reddit.com</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Pros</div>
              <ul className="text-sm text-neutral-300 space-y-1.5">
                <li>Free, zero install</li>
                <li>Works across browsers</li>
                <li>Survives reboots</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
              <div className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2">Cons</div>
              <ul className="text-sm text-neutral-300 space-y-1.5">
                <li>Two commands to undo</li>
                <li>Bypassed by a VPN tunnelling traffic around it</li>
                <li>Doesn&apos;t cover apps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD 2 — SCREEN TIME */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">Method 02</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
            macOS <span className="gradient-text">Screen Time</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-6">
            Built into macOS under <em>System Settings &gt; Screen Time &gt; Content &amp; Privacy</em>.
            Apple designed it primarily for parental controls, so it works well if someone else holds the passcode.
            Self-discipline is a different story.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Pros</div>
              <ul className="text-sm text-neutral-300 space-y-1.5">
                <li>Built into macOS, zero install</li>
                <li>Syncs via iCloud to iOS</li>
                <li>Works well for family setups</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
              <div className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2">Cons</div>
              <ul className="text-sm text-neutral-300 space-y-1.5">
                <li>Passcode can be reset by anyone with your Apple ID</li>
                <li>Doesn&apos;t block properly outside Safari</li>
                <li>Off with one click if you&apos;re the admin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD 3 — BROWSER EXTENSIONS */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">Method 03</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
            Browser extensions (<span className="gradient-text">StayFocusd, LeechBlock</span>)
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-6">
            Free Chrome/Firefox extensions that block a list of URLs, sometimes with a timer. They&apos;re the easiest option &mdash;
            and the easiest to disable. Every extension comes with a toggle in <code className="text-[var(--accent)]">chrome://extensions</code>.
            Incognito mode ignores them entirely.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Pros</div>
              <ul className="text-sm text-neutral-300 space-y-1.5">
                <li>One-click install</li>
                <li>Good UI for custom schedules</li>
                <li>Free</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
              <div className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2">Cons</div>
              <ul className="text-sm text-neutral-300 space-y-1.5">
                <li>Two clicks to disable in extension settings</li>
                <li>Incognito ignores them</li>
                <li>Other browsers ignore them entirely</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD 4 — SELFCONTROL */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">Method 04</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
            <span className="gradient-text">SelfControl</span> (free, open-source)
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-6">
            An open-source (GPL-3.0) Mac app that blocks websites for a set timer and won&apos;t let you cancel early.
            Under the hood it uses macOS&apos;s PF packet filter plus /etc/hosts &mdash; more robust than hosts alone.
            Limitations: it only blocks websites and mail servers (not apps), has only one lock mode (a timer from 1 minute to 24 hours),
            and its own FAQ acknowledges VPNs can bypass it. Read the full comparison:{" "}
            <Link href="/vs/selfcontrol" className="text-[var(--accent)] hover:underline">FocusDragon vs SelfControl</Link>.
          </p>
        </div>
      </section>

      {/* METHOD 5 — FOCUSDRAGON */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[var(--card-bg)] border border-[var(--accent)]/30 p-10 md:p-16 dragon-glow">
            <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">
              Method 05 &middot; Our recommendation
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              <span className="gradient-text">FocusDragon</span> &mdash; free, native, unkillable
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              FocusDragon combines every other method on this list plus a few the others don&apos;t have.
              Instead of one blocking layer, it runs six. Instead of one lock type, it offers six.
              Instead of trusting the app to stay open, it runs a root daemon that keeps enforcing blocks
              even if you force-quit the app, uninstall it, or reboot.
            </p>

            <ol className="space-y-5 mb-10">
              {[
                { num: "1", title: "Download", body: "Grab the free DMG at focusdragon.app. ~6 MB." },
                { num: "2", title: "Drag to Applications", body: "Standard Mac install. Launch once." },
                { num: "3", title: "Grant permissions", body: "One-time admin prompt installs the blocking daemon." },
                { num: "4", title: "Add sites & apps", body: "Type domains, or use preset categories (social, news, gambling, adult)." },
                { num: "5", title: "Pick a lock type", body: "Timer, schedule, breakable, random-text, restart, or date lock." },
                { num: "6", title: "Start the lock", body: "Daemon activates. No uninstall during active locks." },
              ].map((step) => (
                <li key={step.num} className="flex gap-5 items-start">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] font-black flex items-center justify-center border border-[var(--accent)]/30">
                    {step.num}
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">{step.title}</div>
                    <div className="text-neutral-400">{step.body}</div>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/#download"
              className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-xl px-10 py-5 rounded-2xl transition-colors"
            >
              Download FocusDragon &mdash; Free
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              At a glance &mdash; <span className="gradient-text">every Mac blocking method</span>
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="p-4 text-left text-xs uppercase tracking-widest text-[var(--muted)] font-semibold">Method</th>
                  <th className="p-4 text-xs uppercase tracking-widest text-[var(--muted)] font-semibold">Free</th>
                  <th className="p-4 text-xs uppercase tracking-widest text-[var(--muted)] font-semibold">Blocks apps</th>
                  <th className="p-4 text-xs uppercase tracking-widest text-[var(--muted)] font-semibold">Bypass-resistant</th>
                  <th className="p-4 text-xs uppercase tracking-widest text-[var(--muted)] font-semibold">Survives reboot</th>
                </tr>
              </thead>
              <tbody className="text-neutral-300">
                {[
                  ["/etc/hosts", "Yes", "No", "No", "Yes"],
                  ["Screen Time", "Yes", "Partial", "No", "Yes"],
                  ["Browser extensions", "Yes", "No", "No", "Yes"],
                  ["SelfControl", "Yes", "No", "Medium", "Yes"],
                  ["Cold Turkey (free + $45 Pro)", "Partial", "Pro only", "Yes", "Yes"],
                  ["Freedom (free + $8.99/mo)", "Partial", "Yes", "Yes", "Yes"],
                  ["FocusDragon", "Yes", "Yes", "Yes", "Yes"],
                ].map((row, i) => (
                  <tr key={row[0]} className={`border-b border-[var(--card-border)] last:border-0 ${row[0] === "FocusDragon" ? "bg-[var(--accent)]/5" : ""}`}>
                    <td className="p-4 font-medium text-white">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className="p-4 text-center">
                        <span className={
                          cell === "Yes" ? "text-emerald-400" :
                          cell === "No" ? "text-red-400" :
                          cell.includes("Medium") || cell.includes("Partial") ? "text-amber-400" : ""
                        }>
                          {cell}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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

      <SiteFooter />
    </div>
  );
}
