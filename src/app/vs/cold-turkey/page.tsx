import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Cold Turkey Alternative for Mac (Free) — FocusDragon",
  description:
    "Cold Turkey Blocker is excellent — and costs $45. FocusDragon is a free, Mac-native alternative with similar strictness: scheduled blocks, app blocking, random-text and restart-count locks, and uninstall protection during locks.",
  alternates: { canonical: "https://www.focusdragon.app/vs/cold-turkey" },
  openGraph: {
    title: "Cold Turkey Alternative for Mac — FocusDragon (Free)",
    description:
      "Honest comparison. Similar strictness to Cold Turkey Blocker, free, Mac-native, local-only.",
    url: "https://www.focusdragon.app/vs/cold-turkey",
    type: "website",
  },
};

const faqs = [
  {
    q: "Is FocusDragon really a free alternative to Cold Turkey Blocker Pro?",
    a: "Yes. Cold Turkey Blocker Pro is a $45 one-time purchase (or $49 for the unlimited-devices license). FocusDragon is free forever with every feature unlocked — no Pro tier, no trial period, no upsell.",
  },
  {
    q: "Does FocusDragon have Cold Turkey's Frozen Turkey mode?",
    a: "Not a direct equivalent. Frozen Turkey can shut down or log out of your Mac on a timer, which FocusDragon doesn't do. Instead, FocusDragon offers a restart-count lock (requires N real reboots to unlock) and a date lock (locked until a calendar date). Different approaches to the same 'make this irreversible' goal.",
  },
  {
    q: "Does Cold Turkey have random-text unlock too?",
    a: "Yes — Cold Turkey's random-text lock is configurable from 1 to 999 characters. FocusDragon has the same feature, plus a clipboard auto-clear so you can't paste the generated string. Functionally very similar.",
  },
  {
    q: "Does FocusDragon work on Windows like Cold Turkey does?",
    a: "No. FocusDragon is Mac-only and written natively in Swift. Cold Turkey supports both Windows and macOS. If you need cross-platform, Cold Turkey is the better fit; if you're Mac-only, native is usually faster and lighter.",
  },
  {
    q: "Is Cold Turkey actually more feature-rich than FocusDragon?",
    a: "Cold Turkey wins on a few dimensions: window-title blocking on Windows, Chromium Task Manager blocking, granular URL/channel/keyword rules, per-user targeting on shared computers, and a first-party Writer/Micromanager suite. FocusDragon wins on price (free vs $45), Mac-nativeness, and restart-count locks. Feature parity is closer than most comparison pages admit.",
  },
  {
    q: "Can I import my Cold Turkey block list into FocusDragon?",
    a: "Not directly. Adding your list of domains and apps manually takes a few minutes. FocusDragon has preset categories (social media, news, gambling, adult) that cover most common blocks in one click.",
  },
];

export default function VsColdTurkey() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://www.focusdragon.app" },
          { name: "vs Cold Turkey", url: "https://www.focusdragon.app/vs/cold-turkey" },
        ]),
        faqSchema(faqs),
      ]} />

      <SiteNav />

      {/* HERO */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow-secondary" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-1.5 text-xs uppercase tracking-widest text-[var(--muted)] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Cold Turkey alternative &middot; macOS
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            Same strictness.
            <br />
            <span className="gradient-text dragon-glow-text">$45 cheaper.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Cold Turkey Blocker is genuinely one of the best focus tools ever built.
            It&apos;s also $45 for the Pro features most people actually need.{" "}
            <span className="text-white font-medium">
              FocusDragon gives you a comparable enforcement model &mdash; free, Mac-native, local-only.
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
              Compare feature-by-feature
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
          <p className="text-neutral-300 text-lg leading-relaxed">
            Cold Turkey Blocker is a mature product with years of refinement.
            If you&apos;re already paying for it and happy, there&apos;s no urgent reason to switch.
            The pitch here isn&apos;t &ldquo;we&apos;re better&rdquo; &mdash; it&apos;s &ldquo;you can get
            90% of the strictness for $0 if you&apos;re on a Mac.&rdquo;
          </p>
        </div>
      </section>

      {/* FEATURE TABLE */}
      <section id="compare" className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              FocusDragon vs <span className="gradient-text">Cold Turkey Blocker</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Based on Cold Turkey&apos;s official pricing page and feature docs, as of April 2026.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
            <div className="grid grid-cols-3 text-sm">
              <div className="p-5 font-semibold text-[var(--muted)] text-xs uppercase tracking-widest">Feature</div>
              <div className="p-5 font-semibold text-white text-center border-l border-[var(--card-border)]">
                <span className="gradient-text">FocusDragon</span>
              </div>
              <div className="p-5 font-semibold text-neutral-400 text-center border-l border-[var(--card-border)]">Cold Turkey</div>

              {[
                ["Price", "Free forever", "Free tier + $45 Pro (one-time)"],
                ["Unlimited-devices license", "N/A — free", "$49 (one-time)"],
                ["Platforms", "macOS only", "macOS + Windows"],
                ["Native Mac app", "Yes (Swift / SwiftUI)", "Yes (uses system extension)"],
                ["Blocks websites", "Yes", "Yes (requires browser extensions)"],
                ["Blocks desktop apps", "Yes (free)", "Yes (Pro only)"],
                ["Scheduled blocks", "Yes (free)", "Yes (Pro only)"],
                ["Random-text unlock", "Yes (clipboard auto-clears)", "Yes (1–999 chars)"],
                ["Restart-count lock", "Yes", "No"],
                ["Frozen / shutdown mode", "No", "Yes (Frozen Turkey)"],
                ["Window-title blocking (Win)", "N/A", "Yes"],
                ["Keyword / channel blocking", "Domains + apps", "Yes (URLs, channels, search terms)"],
                ["Uninstall protected during lock", "Yes", "Yes"],
                ["Account required", "No", "No"],
                ["Data stays local", "Yes", "Yes"],
              ].map(([feature, fd, ct], idx) => (
                <div key={feature} className="contents">
                  <div className={`p-5 text-neutral-300 ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>{feature}</div>
                  <div className={`p-5 text-white text-center border-l border-[var(--card-border)] ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>
                    {fd}
                  </div>
                  <div className={`p-5 text-neutral-400 text-center border-l border-[var(--card-border)] ${idx % 2 === 0 ? "bg-transparent" : "bg-black/20"}`}>
                    {ct}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE REAL ARGUMENTS */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto space-y-16">
          {[
            {
              tag: "01 \u00b7 Price",
              title: "Free tier vs free tier — then $45 for the good stuff.",
              body: "Both products have a free tier. Cold Turkey's free Blocker is websites-only (no app blocking, no scheduled blocks, no application password, no strong locks) — those are Pro-only at $45 one-time. FocusDragon's free tier is the full product: app blocking, scheduling, every lock type. If you specifically want Cold Turkey Pro's feature set, FocusDragon gives you most of it for $0 on Mac. If you want Cold Turkey Writer or Micromanager (their two other products), those are separate paid tools with no FocusDragon equivalent.",
            },
            {
              tag: "02 \u00b7 Native Mac",
              title: "Built on Swift and SwiftUI, not a cross-platform port.",
              body: "Cold Turkey ships on both Windows and macOS. On Mac it installs a system extension and requests Full Disk Access — solid enforcement, but a heavier footprint that doesn't feel entirely native. FocusDragon is written in Swift and SwiftUI, uses launchd for daemon management, and installs at ~6 MB. Light, fast, battery-friendly. Tradeoff: you lose Windows support. If you're dual-platform, Cold Turkey is still your pick.",
            },
            {
              tag: "03 \u00b7 Restart-count lock",
              title: "One lock type Cold Turkey doesn't have.",
              body: "Cold Turkey has timer, scheduled, time-range, password, and Frozen Turkey locks. FocusDragon has all of those equivalents plus restart-count — requires N real system reboots before the lock releases. It's a specific tool for cool-off periods: 'block sportsbooks for 5 full reboots' is enough friction to outlast most cravings. Combined with Cold Turkey-style random-text unlock, it's a pairing Cold Turkey doesn't offer.",
            },
            {
              tag: "04 \u00b7 Local-only, no account",
              title: "Nothing leaves your Mac. Ever.",
              body: "Both products store data locally — that's fair. FocusDragon goes further: the app has no network permission at all, can't phone home, has no account system, and no telemetry by default. If you enable telemetry, it sends aggregate events only (never site names or block contents). Cold Turkey is also local-first and doesn't collect stats, so this is a moderate differentiator — noted here for completeness, not as a major pitch.",
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
              Which one should <span className="gradient-text">you pick?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)]/30 p-8 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">Pick FocusDragon if</div>
              <ul className="space-y-3 text-neutral-300">
                <li>&middot; You&apos;re only on a Mac and want something native</li>
                <li>&middot; You don&apos;t want to pay $45 for a focus tool</li>
                <li>&middot; Restart-count locks appeal more than Frozen Turkey</li>
                <li>&middot; You want the full feature set without a Pro tier</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">Pick Cold Turkey if</div>
              <ul className="space-y-3 text-neutral-400">
                <li>&middot; You need Windows + Mac in one tool</li>
                <li>&middot; You want Frozen Turkey&apos;s shutdown-the-Mac option</li>
                <li>&middot; You want window-title or keyword-level granularity</li>
                <li>&middot; You also want Writer / Micromanager for writing or whitelist-only modes</li>
                <li>&middot; You&apos;re already paying and happy &mdash; no reason to switch</li>
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
            Ready to <span className="gradient-text">save $45?</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
            Download FocusDragon and get the Pro-tier enforcement model &mdash; free, forever, every feature unlocked.
          </p>
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
