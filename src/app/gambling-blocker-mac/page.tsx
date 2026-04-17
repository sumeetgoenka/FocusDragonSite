import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Gambling Blocker for Mac (Free) — Unbypassable Locks | FocusDragon",
  description:
    "A free gambling blocker for macOS with locks you physically cannot undo. Block DraftKings, FanDuel, sportsbooks, casinos, and every crypto exchange — with a lock that survives reboots, uninstalls, and changes of heart.",
  alternates: { canonical: "https://focusdragon.app/gambling-blocker-mac" },
  openGraph: {
    title: "Free Gambling Blocker for Mac — FocusDragon",
    description:
      "Unbypassable gambling blocker for macOS. Date locks, random-text locks, and a root daemon that doesn't negotiate.",
    url: "https://focusdragon.app/gambling-blocker-mac",
    type: "article",
  },
};

const faqs = [
  {
    q: "What's the best free gambling blocker for Mac?",
    a: "FocusDragon is the most bypass-resistant free option on macOS. It blocks sports betting sites, casinos, crypto exchanges, and their native apps using six independent layers. Date-lock mode means you can commit to a gambling-free month, year, or indefinite block — and the daemon keeps enforcing even if you reinstall macOS.",
  },
  {
    q: "Can a website blocker actually stop someone with a gambling problem?",
    a: "A blocker alone can't treat a gambling addiction — it's part of a larger recovery toolkit that usually includes GamStop/GAMBAN for state registries, a therapist, and often a financial accountability partner. What a strong blocker does is remove the in-the-moment option. Most relapses happen in a window of five to fifteen minutes. If the site won't load and the app won't open during that window, the urge usually passes.",
  },
  {
    q: "How is this different from GAMBAN or GamStop?",
    a: "GamStop (UK) and state self-exclusion programs register you with operators and prevent account creation. GAMBAN is a subscription blocker ($3–$10/mo) that covers a pre-built gambling list. FocusDragon is free, macOS-native, and supplements these registries by also blocking the sites, apps, and every browser on your Mac. Use all three if you can — they work on different layers.",
  },
  {
    q: "What lock mode is best for gambling blocking?",
    a: "Date lock for serious commitments ('no gambling sites until my next payday' or 'for a year'). Combine with restart-count lock (requires N reboots to unlock) for the moments you try to rationalize your way out. The random-text lock is a good third layer — typing 200+ characters of gibberish is enough friction to snap out of a craving.",
  },
  {
    q: "Will FocusDragon block crypto exchanges and sportsbooks, not just casinos?",
    a: "Yes. Add any domain — DraftKings, FanDuel, Bet365, Coinbase, Binance, Robinhood — and the daemon enforces blocks across every browser and every app. Preset gambling categories cover 150+ common sites out of the box.",
  },
];

export default function GamblingBlockerMac() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://focusdragon.app" },
          { name: "Gambling blocker", url: "https://focusdragon.app/gambling-blocker-mac" },
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
            Gambling blocker for macOS
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            A lock you
            <br />
            <span className="gradient-text dragon-glow-text">physically can&apos;t undo.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Sportsbooks. Casinos. Crypto exchanges. Every betting app you&apos;ve
            promised yourself you&apos;d never open again.{" "}
            <span className="text-white font-medium">
              FocusDragon removes the option entirely &mdash; not for an hour, for as long as you need.
            </span>
          </p>
          <Link
            href="/#download"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
          >
            Download FocusDragon &mdash; Free
          </Link>
        </div>
      </section>

      {/* THE 15 MINUTE WINDOW */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">The science</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            Relapse happens in a <span className="gradient-text">15-minute window.</span>
          </h2>
          <div className="space-y-5 text-neutral-400 text-lg leading-relaxed">
            <p>
              Addiction researchers call it the craving curve. When an urge fires,
              it spikes sharply, peaks within 10 to 20 minutes, and then drops &mdash;
              whether or not you act on it. The vast majority of gambling relapses
              happen inside that first spike.
            </p>
            <p>
              If the app opens in those minutes, you&apos;re in. If it doesn&apos;t,
              the urge passes and an hour later it feels distant.
              <strong className="text-white"> The goal of a good blocker is not willpower.
              It&apos;s making the first 15 minutes physically impossible.</strong>
            </p>
            <p>
              FocusDragon&apos;s six blocking layers, six lock modes, and root daemon
              are built for that window. The daemon doesn&apos;t negotiate.
              The date lock doesn&apos;t flex. Uninstall is blocked while the lock is active.
              By the time you could possibly bypass it, the urge is gone.
            </p>
          </div>
        </div>
      </section>

      {/* LOCK TYPES FOR GAMBLING */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Three lock modes that <span className="gradient-text">actually hold.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Date lock",
                intensity: "extreme",
                use: "The serious one.",
                body: "Set a calendar date. The lock doesn't release until then. Works for a week, a month, a year — or indefinitely, if you set the date far enough out. Survives every reboot, every OS update, every attempt to roll the clock back.",
              },
              {
                name: "Restart lock",
                intensity: "high",
                use: "The cool-off one.",
                body: "Requires N actual system reboots to unlock. The daemon counts real boot events, so you can't fake it by force-restarting. Five reboots across a week is effectively a week-long cooldown.",
              },
              {
                name: "Random-text",
                intensity: "high",
                use: "The friction layer.",
                body: "Type 200+ random characters to unlock. No copy-paste — clipboard is auto-cleared. By character 40, most cravings have passed.",
              },
            ].map((lock) => (
              <div key={lock.name} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-7">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-bold text-white text-lg">{lock.name}</h3>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    lock.intensity === "extreme" ? "bg-red-500/15 text-red-400" : "bg-orange-500/15 text-orange-400"
                  }`}>
                    {lock.intensity}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-3">{lock.use}</div>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{lock.body}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-neutral-400 mt-10 max-w-2xl mx-auto">
            For maximum protection, stack them.{" "}
            <strong className="text-white">Date lock + restart lock</strong> is a combination
            nobody has reported getting through.
          </p>
        </div>
      </section>

      {/* WHAT GETS BLOCKED */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Every <span className="gradient-text">surface</span>, blocked.
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Preset category: <em>Gambling</em> blocks 150+ sites and apps in one click.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Sportsbooks", items: "DraftKings, FanDuel, Bet365, BetMGM, Caesars, PointsBet" },
              { title: "Online casinos", items: "Stake, Bovada, Ignition, BetOnline, MGM, WSOP" },
              { title: "Crypto & trading", items: "Binance, Coinbase, Robinhood, Kraken, Pump.fun, perps" },
              { title: "Fantasy & DFS", items: "FanDuel DFS, Underdog, PrizePicks, Sleeper" },
              { title: "Native Mac apps", items: "Any betting app, any crypto client, any trading platform" },
              { title: "Custom domains", items: "Add anything. Subdomains, regional mirrors, aggregators." },
            ].map((cat) => (
              <div key={cat.title} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
                <h3 className="font-bold text-white mb-2">{cat.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{cat.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-10">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">Support &amp; recovery</div>
          <p className="text-neutral-400 text-lg leading-relaxed mb-4">
            FocusDragon is a tool, not a cure. If you or someone you love is struggling
            with gambling, please reach out to professional support alongside using a blocker:
          </p>
          <ul className="space-y-3 text-neutral-300">
            <li>&middot; <strong className="text-white">US:</strong> 1-800-GAMBLER (National Council on Problem Gambling)</li>
            <li>&middot; <strong className="text-white">UK:</strong> GamCare &mdash; 0808 8020 133 &middot; GamStop self-exclusion</li>
            <li>&middot; <strong className="text-white">EU:</strong> Gamblers Anonymous meetings (gamblersanonymous.org)</li>
            <li>&middot; <strong className="text-white">Australia:</strong> 1800 858 858 (Gambling Help Online)</li>
          </ul>
          <p className="text-neutral-500 text-sm mt-5 italic">
            Use FocusDragon to close the door. Use these resources to walk through it.
          </p>
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
            Close the door. <span className="gradient-text">Keep it closed.</span>
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
