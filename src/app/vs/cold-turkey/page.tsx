import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Cold Turkey Blocker Alternative for Mac (Free) — FocusDragon",
  description:
    "Looking for a Cold Turkey alternative for Mac? FocusDragon is a free, native macOS blocker with 6 layers of protection, lock modes Cold Turkey doesn't offer, and a daemon that runs even when the app is closed.",
  alternates: { canonical: "https://focusdragon.app/vs/cold-turkey" },
  openGraph: {
    title: "Cold Turkey Alternative for Mac — FocusDragon (Free)",
    description:
      "A free, native macOS alternative to Cold Turkey Blocker with a root daemon, random-text locks, and 6 independent blocking layers.",
    url: "https://focusdragon.app/vs/cold-turkey",
    type: "website",
  },
};

const faqs = [
  {
    q: "Is FocusDragon really free compared to Cold Turkey Blocker Pro?",
    a: "Yes. Cold Turkey Blocker Pro costs $39 for the one-time upgrade (the free version is heavily feature-gated). FocusDragon is free forever with every feature unlocked — no account, no trial, no upsell, no locked Pro tier.",
  },
  {
    q: "Is FocusDragon as strong as Cold Turkey's Frozen Turkey mode?",
    a: "In most respects, stronger. FocusDragon enforces blocks through a root daemon that keeps running even if you force-quit the app, plus a random-text unlock mode that can't be bypassed by waiting out a timer or editing settings. Cold Turkey's Frozen Turkey is a single nuclear option; FocusDragon offers six lock types you can combine.",
  },
  {
    q: "Can FocusDragon block applications like Cold Turkey can?",
    a: "Yes. FocusDragon's process-killer layer monitors running applications every 1.5 seconds and terminates blocked apps instantly, even if they're renamed or relaunched by another process.",
  },
  {
    q: "Does FocusDragon work on Windows like Cold Turkey does?",
    a: "No. FocusDragon is Mac-only and built natively in Swift and SwiftUI. That's the tradeoff: if you need cross-platform, Cold Turkey wins. If you're on Mac, FocusDragon is faster, lighter, and more integrated.",
  },
  {
    q: "Can I import my Cold Turkey block list into FocusDragon?",
    a: "FocusDragon doesn't import Cold Turkey data directly, but adding your list of domains and apps takes a few minutes. The app has preset categories (social media, news, gaming, gambling) that cover most common blocks in one click.",
  },
];

export default function VsColdTurkey() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://focusdragon.app" },
          { name: "Comparisons", url: "https://focusdragon.app/vs/cold-turkey" },
          { name: "vs Cold Turkey", url: "https://focusdragon.app/vs/cold-turkey" },
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
            Free, native,
            <br />
            <span className="gradient-text dragon-glow-text">and harder to bypass.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Cold Turkey Blocker is solid. But it&apos;s $39 for the features that
            actually work, and it wasn&apos;t built for Mac.{" "}
            <span className="text-white font-medium">
              FocusDragon is free, Mac-native, and the daemon physically refuses to stop.
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

      {/* VERDICT TABLE */}
      <section id="compare" className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              FocusDragon vs <span className="gradient-text">Cold Turkey Blocker</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              The honest comparison &mdash; including where Cold Turkey still wins.
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
                ["Price", "Free forever", "$39 one-time (Pro)"],
                ["Platform", "macOS (native Swift)", "macOS + Windows"],
                ["Blocking layers", "6 independent", "2–3 (hosts + app list)"],
                ["Root-level daemon", "Yes, always running", "No"],
                ["Blocks apps", "Yes, kills on sight every 1.5s", "Yes, via allow/block list"],
                ["Lock types", "6 (timer, schedule, breakable, random-text, restart, date)", "3 (scheduled, timed, Frozen)"],
                ["Random-text unlock", "Yes", "No"],
                ["Restart-count lock", "Yes", "No"],
                ["Browser extension heartbeat", "Force-quits browser on tamper", "No"],
                ["Blocks System Settings during lock", "Yes", "No"],
                ["Account required", "No", "No"],
                ["Data stays local", "100% local, no network perm", "Local-first"],
                ["Source visible to auditor", "Swift + C daemon (auditable)", "Closed, cross-platform"],
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

      {/* THREE DEEP ARGUMENTS */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto space-y-16">
          {[
            {
              tag: "01 \u00b7 Price",
              title: "Free beats $39, especially for a tool you need to trust.",
              body: "Cold Turkey Blocker is free to download, but the features most people actually need — Frozen Turkey, scheduled blocks that survive reboots, locking settings behind a password — are behind the $39 Pro upgrade. That's fine if you can commit. But plenty of people who need a blocker most are the ones least willing to pay for another piece of software they're not sure will work. FocusDragon is free because the person who built it was in exactly that situation. Every lock type, every blocking layer, every feature — unlocked from day one. No trial period, no account, no upsell.",
            },
            {
              tag: "02 \u00b7 Native Mac, not a port",
              title: "Built for macOS from the ground up — not cross-platform compromise.",
              body: "Cold Turkey is a cross-platform app. It works on Mac, but it wasn't designed for it — the UI feels foreign, the process enforcement uses generic techniques that don't leverage macOS primitives, and it runs heavier than it should. FocusDragon is written in Swift and SwiftUI, uses launchd for the daemon, integrates with macOS's native permission prompts, and respects system appearance. It's ~6 MB installed, sips battery, and feels like a first-party Apple tool. If you only need a Mac blocker, native is always better.",
            },
            {
              tag: "03 \u00b7 Lock strength",
              title: "Six lock types that compose. Not one nuclear button.",
              body: "Cold Turkey's Frozen Turkey is famous for being nuclear — once activated, you can't cancel it. It's effective, but it's also binary: you're either frozen out of your whole computer or you're not. FocusDragon gives you six lock types you can combine: time-based, schedule-based, random-text (type 200+ characters of gibberish to unlock), restart-count (requires N real reboots), date-based (locked until a calendar date), and breakable (a non-skippable delay that forces you to reconsider). That lets you tune difficulty: low friction for casual focus, extreme commitment for gambling or porn blocking. Cold Turkey gives you a hammer; FocusDragon gives you a toolkit.",
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
                <li>&middot; You&apos;re on a Mac and want native speed and polish</li>
                <li>&middot; You don&apos;t want to pay for a focus tool</li>
                <li>&middot; You&apos;ve bypassed blockers before and need something harder</li>
                <li>&middot; You want multiple lock types to compose together</li>
                <li>&middot; You care about privacy &mdash; no account, no cloud, no tracking</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">Pick Cold Turkey if</div>
              <ul className="space-y-3 text-neutral-400">
                <li>&middot; You need Windows &amp; Mac in one tool</li>
                <li>&middot; You have a team/org that wants centralised management</li>
                <li>&middot; You&apos;re already paying and it&apos;s working fine</li>
                <li>&middot; You prefer one monolithic nuclear lock over several composable ones</li>
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
            Stop paying to <span className="gradient-text">fix your focus.</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
            Download FocusDragon and get every lock type, every blocking layer, every feature &mdash; free forever.
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
