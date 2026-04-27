import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Freedom Alternative for Mac (Free, No Subscription) — FocusDragon",
  description:
    "Freedom's Premium features — Locked Mode, scheduled sessions, unlimited durations — are $8.99/mo or $99.50 lifetime. FocusDragon gives you equivalent functionality on Mac, free and local-only.",
  alternates: { canonical: "https://www.focusdragon.app/vs/freedom" },
  openGraph: {
    title: "Freedom Alternative for Mac — FocusDragon (Free)",
    description:
      "Honest comparison of Freedom and FocusDragon. Mac-only, local-only, no account, every feature free.",
    url: "https://www.focusdragon.app/vs/freedom",
    type: "website",
  },
};

const faqs = [
  {
    q: "Does Freedom have a free tier?",
    a: "Yes — and it's genuinely useful. Freedom Free includes blocking apps, websites, or the whole internet, cross-device sync across Mac, Windows, iOS, Android, and Chromebook, unlimited devices, custom blocklists, and website exceptions on desktop. What Premium ($8.99/mo, ~$40/yr, or $99.50 lifetime at current 50% off) adds: scheduling, recurring sessions, advance sessions, Locked Mode, and unlimited-duration sessions beyond 2 hours.",
  },
  {
    q: "How does FocusDragon compare to Freedom Premium?",
    a: "Every Premium feature — scheduled blocks, Locked Mode equivalents (random-text, restart-count, date locks), and unlimited session duration — is free in FocusDragon. The tradeoff: FocusDragon is Mac-only. Freedom's cross-device sync (which is free, not Premium) and mobile support are things FocusDragon doesn't try to replicate.",
  },
  {
    q: "Can I uninstall Freedom while a Locked Mode session is active?",
    a: "No. Freedom has documented uninstall protection that prevents removing the app while a locked session is running. Locked Mode does have a 1-minute grace window at the start of a session, and Freedom allows one emergency-end request per 7 days. FocusDragon similarly prevents uninstall during active locks, with no emergency-end option — once locked, you wait it out.",
  },
  {
    q: "Does FocusDragon sync across devices like Freedom does?",
    a: "No. FocusDragon is Mac-only and local-only. The app has no network permission, no account system, no cloud sync. That's a deliberate privacy tradeoff — if you need iOS + Windows + Android sync, Freedom is the right choice. If you're Mac-only and prefer data never leaving your machine, FocusDragon is.",
  },
  {
    q: "How do the blocking mechanisms differ technically?",
    a: "Freedom on desktop uses a local proxy plus optional browser extensions. On iOS it uses a local-only VPN (via Apple's Network Extension APIs) and Safari Content Blocker. FocusDragon uses /etc/hosts rewrites, PF firewall anchors, process-level monitoring, and browser extensions with heartbeat. Different approaches — both effective, both can be bypassed by VPNs that tunnel outside the local stack.",
  },
  {
    q: "Is Freedom worth paying for if I'm on multiple devices?",
    a: "If you genuinely need blocks on Mac + iPhone + Android simultaneously, Freedom's architecture handles that well. The free tier already syncs — Premium mainly adds scheduling and Locked Mode. Many users get what they need from the free tier alone.",
  },
];

export default function VsFreedom() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://www.focusdragon.app" },
          { name: "vs Freedom", url: "https://www.focusdragon.app/vs/freedom" },
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
            Freedom alternative &middot; macOS
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            Locked Mode,
            <br />
            <span className="gradient-text dragon-glow-text">without the subscription.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Freedom Free covers the basics on every platform. Freedom Premium
            &mdash; with Locked Mode, scheduling, and unlimited sessions &mdash; is $8.99/mo or $99.50 lifetime.{" "}
            <span className="text-white font-medium">
              FocusDragon gives you Mac-native equivalents of the Premium features for $0.
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
              Compare honestly
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
            Freedom is a well-built cross-device focus tool and has been around since 2009.
            It&apos;s the right pick if you need blocks that sync across Mac + iOS + Windows + Android + Chromebook.
          </p>
          <p className="text-neutral-300 text-lg leading-relaxed">
            FocusDragon is the right pick if you only need it on Mac and want the strict-lock
            features (Locked Mode equivalents, scheduling, unlimited duration) without paying a subscription or handing over an email address.
          </p>
        </div>
      </section>

      {/* PRICING COMPARISON */}
      <section id="compare" className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Freedom&apos;s three tiers, <span className="gradient-text">honestly compared</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Pricing pulled from freedom.to/premium, April 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2">Freedom Free</div>
              <div className="text-3xl font-black text-white mb-2">$0</div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Blocks apps + sites across all devices. Cross-device sync. Unlimited devices.
                Sessions capped at 2 hours. No scheduling, no Locked Mode.
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2">Premium Monthly</div>
              <div className="text-3xl font-black text-amber-400 mb-2">$8.99<span className="text-base text-neutral-500">/mo</span></div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Adds scheduling, recurring sessions, Locked Mode, unlimited-duration sessions, Premium perks.
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2">Premium Yearly</div>
              <div className="text-3xl font-black text-amber-400 mb-2">$3.33<span className="text-base text-neutral-500">/mo</span></div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Same as Monthly, billed annually at roughly $40/yr.
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)]/40 p-6 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-2">FocusDragon</div>
              <div className="text-3xl font-black gradient-text mb-2">$0</div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Every Premium-equivalent feature, unlocked from day one. Mac only. No account, no sync, no cloud.
              </p>
            </div>
          </div>

          <p className="text-center text-neutral-500 text-sm mt-6">
            Freedom also offers a lifetime license at $99.50 (promoted at 50% off $199, as of April 2026).
          </p>
        </div>
      </section>

      {/* FEATURE TABLE */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              FocusDragon vs <span className="gradient-text">Freedom</span>
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
            <div className="grid grid-cols-3 text-sm">
              <div className="p-5 font-semibold text-[var(--muted)] text-xs uppercase tracking-widest">Feature</div>
              <div className="p-5 font-semibold text-white text-center border-l border-[var(--card-border)]">
                <span className="gradient-text">FocusDragon</span>
              </div>
              <div className="p-5 font-semibold text-neutral-400 text-center border-l border-[var(--card-border)]">Freedom</div>

              {[
                ["Price for full feature set", "Free forever", "$8.99/mo, $40/yr, or $99.50 lifetime"],
                ["Platforms", "macOS only", "Mac, Win, iOS, Android, Chromebook, Linux (ext)"],
                ["Cross-device sync", "No (local-only)", "Yes (free tier includes sync)"],
                ["Account required", "No", "Yes"],
                ["Blocks websites", "Yes", "Yes"],
                ["Blocks desktop apps", "Yes", "Yes (Mac/Windows)"],
                ["Blocks entire internet", "Yes (whitelist mode)", "Yes"],
                ["Website exceptions (whitelist)", "Yes", "Yes (Mac/Win only)"],
                ["Scheduled / recurring blocks", "Yes (free)", "Yes (Premium only)"],
                ["Locked Mode / irreversible session", "Yes (random-text, restart-count, date)", "Yes (Premium only)"],
                ["Session length cap", "Unlimited", "2 hrs on Free, unlimited on Premium"],
                ["Uninstall protected during lock", "Yes", "Yes"],
                ["Emergency end option", "No", "Yes, once per 7 days"],
                ["Focus music / ambience", "No", "Yes (all tiers)"],
                ["Local-only data", "Yes (no network perm)", "Local proxy; account data synced"],
              ].map(([feature, fd, fr], idx) => (
                <div key={feature} className="contents">
                  <div className={`p-5 text-neutral-300 ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>{feature}</div>
                  <div className={`p-5 text-white text-center border-l border-[var(--card-border)] ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>
                    {fd}
                  </div>
                  <div className={`p-5 text-neutral-400 text-center border-l border-[var(--card-border)] ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>
                    {fr}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ARGUMENTS */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto space-y-16">
          {[
            {
              tag: "01 \u00b7 Scheduling + Locked Mode for free",
              title: "Freedom's Premium features are FocusDragon's free baseline.",
              body: "The two features most people subscribe to Freedom Premium for are scheduled sessions (so blocks start automatically during work hours) and Locked Mode (so you can't end a session early in a weak moment). FocusDragon ships both at the free tier. If that's your core use case on Mac, FocusDragon replaces the subscription entirely.",
            },
            {
              tag: "02 \u00b7 Mac-only is a tradeoff, not a weakness",
              title: "If you're Mac-only, you don't need the cross-platform overhead.",
              body: "Freedom's strength is breadth: one session syncs to iPhone, Android, Windows, Mac, Chromebook. If you need that, Freedom is the right tool. But if you only have a Mac, you're paying for platform reach you don't use. FocusDragon is written natively for macOS, installs at ~6 MB, and takes full advantage of macOS primitives (launchd daemon, PF firewall, system-extension-style browser integration).",
            },
            {
              tag: "03 \u00b7 Local-only, no account",
              title: "Your block list doesn't live on anyone's server.",
              body: "Freedom requires an account and stores your configuration in the cloud so it can sync. That's essential to their architecture — but it means sites you're trying to avoid are stored on servers outside your control. FocusDragon runs entirely on your Mac. The app has no network permission, no account, no cloud sync. For people blocking things they consider private (gambling, recovery support, etc.), this matters.",
            },
          ].map((arg) => (
            <div key={arg.tag} className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12">
              <div>
                <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">{arg.tag}</div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{arg.title}</h3>
                <p className="text-neutral-400 text-lg leading-relaxed">{arg.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHEN TO PICK WHICH */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              When to pick <span className="gradient-text">which</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)]/30 p-8 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">Pick FocusDragon if</div>
              <ul className="space-y-3 text-neutral-300">
                <li>&middot; You only need blocking on your Mac</li>
                <li>&middot; You want Locked-Mode-style enforcement without a subscription</li>
                <li>&middot; You care about data staying 100% local</li>
                <li>&middot; You don&apos;t want an account or cloud sync</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">Pick Freedom if</div>
              <ul className="space-y-3 text-neutral-400">
                <li>&middot; You need blocks across Mac + iOS + Windows + Android</li>
                <li>&middot; You rely on cross-device session sync</li>
                <li>&middot; You want focus sounds, ambience, or Brain.fm tracks</li>
                <li>&middot; The 2-hour cap on Free is fine &mdash; most people don&apos;t need Premium</li>
                <li>&middot; You already use it and it works &mdash; no need to switch</li>
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
            Locked Mode, <span className="gradient-text">no subscription.</span>
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
