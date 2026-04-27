import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Best Free Website Blocker for Mac (2026) — FocusDragon",
  description:
    "We tested every free website blocker for macOS. Here's the honest ranking, including which ones are actually bypass-resistant and which ones are placebo.",
  alternates: { canonical: "https://www.focusdragon.app/free-website-blocker-mac" },
  openGraph: {
    title: "Best Free Website Blocker for Mac (2026)",
    description:
      "Every free Mac website blocker, ranked. No affiliate spam — just the honest breakdown.",
    url: "https://www.focusdragon.app/free-website-blocker-mac",
    type: "article",
  },
};

const faqs = [
  {
    q: "What is the best free website blocker for Mac?",
    a: "For a full blocking suite — websites, apps, multiple lock modes, scheduled blocks — FocusDragon is the most complete free option on Mac. For a minimalist open-source timer for websites only, SelfControl is still excellent. Freedom's free tier is a strong option if you need cross-device sync across Mac + iOS + Windows + Android.",
  },
  {
    q: "Are free website blockers as good as paid ones?",
    a: "The gap is smaller than most paid tools advertise. FocusDragon is free and covers the same core feature ground as Cold Turkey Pro ($45): app blocking, scheduled blocks, multiple strict lock modes, uninstall protection during active locks. Freedom's free tier already covers basic blocking on 5+ platforms with cross-device sync. Paying makes sense mainly for Freedom Premium's scheduling/Locked Mode, or Cold Turkey's window-title and Windows support.",
  },
  {
    q: "Why would a blocker be free? What's the catch?",
    a: "FocusDragon has no paid tier, no ads, no account system, and collects no telemetry by default. It was built by a solo developer in Dubai who wanted to help people with the same problem he had. Hosting costs are a few dollars a month. There is no catch.",
  },
  {
    q: "Is there a free website blocker that blocks apps too?",
    a: "Yes. FocusDragon blocks apps via a process-killer that terminates blocked apps every 1.5 seconds. Freedom's free tier also blocks apps on Mac and Windows. SelfControl and /etc/hosts edits only block websites and network targets, not apps.",
  },
];

const tools = [
  {
    rank: 1,
    name: "FocusDragon",
    tagline: "The most complete free Mac blocker",
    price: "Free forever",
    strengths: ["Blocks websites + apps", "6 lock modes (timer, schedule, breakable, random-text, restart-count, date)", "Uninstall protection during locks", "Anti-tamper on System Settings & Terminal", "Local-only, no account"],
    weaknesses: ["Mac-only", "No cross-device sync", "Not open source"],
    verdict: "Best pick if you want a full Cold-Turkey-Pro-style feature set without paying $45. Mac-only is the real tradeoff.",
    cta: true,
    link: "/",
  },
  {
    rank: 2,
    name: "Freedom (free tier)",
    tagline: "Cross-device blocker with a useful free plan",
    price: "Free (Premium $8.99/mo)",
    strengths: ["Cross-device sync free", "Mac + Windows + iOS + Android + Chromebook", "Blocks apps on major platforms", "Focus sounds & ambience", "2-hour session cap on Free"],
    weaknesses: ["Locked Mode + scheduling are Premium-only", "Requires account + cloud sync", "Some features limited to Mac/Win"],
    verdict: "The right choice if you need blocking across 3+ devices. Sessions capped at 2 hours on Free, which is fine for most.",
    link: "/vs/freedom",
  },
  {
    rank: 3,
    name: "SelfControl",
    tagline: "Open-source minimalist website timer",
    price: "Free (GPL-3.0)",
    strengths: ["Open source (GPL-3.0)", "Uses PF firewall + /etc/hosts", "Irreversible once started", "No account", "Mac-native"],
    weaknesses: ["Websites only, no apps", "Single lock mode (timer up to 24 hrs)", "No scheduling", "VPN bypasses it (officially acknowledged)"],
    verdict: "Still excellent for a one-off website timer. Too minimal for a serious full-product replacement.",
    link: "/vs/selfcontrol",
  },
  {
    rank: 4,
    name: "macOS Screen Time",
    tagline: "Built into macOS",
    price: "Free (included)",
    strengths: ["Zero install", "Syncs to iOS", "Good for family/parental use"],
    weaknesses: ["One click to disable if you hold the passcode", "Unreliable outside Safari", "Not designed for self-blocking"],
    verdict: "Works if someone else holds the passcode. Not a self-discipline tool.",
    link: "/block-websites-on-mac",
  },
  {
    rank: 5,
    name: "StayFocusd / LeechBlock",
    tagline: "Chrome & Firefox extensions",
    price: "Free",
    strengths: ["One-click install", "Scheduled blocks"],
    weaknesses: ["Disabled in 2 clicks", "Incognito ignores them", "Other browsers ignore them"],
    verdict: "Good for gentle habit-forming, not for breaking compulsions.",
    link: "/block-websites-on-mac",
  },
  {
    rank: 6,
    name: "/etc/hosts edits",
    tagline: "The terminal method",
    price: "Free",
    strengths: ["Zero install", "Survives reboots"],
    weaknesses: ["Two terminal commands to undo", "Firefox with DoH bypasses it", "Useless against apps"],
    verdict: "Free but easily bypassed by anyone with admin on their own Mac.",
    link: "/block-websites-on-mac",
  },
];

export default function FreeWebsiteBlockerMac() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://www.focusdragon.app" },
          { name: "Free blockers ranked", url: "https://www.focusdragon.app/free-website-blocker-mac" },
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
            2026 edition &middot; no affiliate spam
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            The best free
            <br />
            <span className="gradient-text dragon-glow-text">website blocker for Mac.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Every free option for macOS, tested and ranked by what actually
            <em> can&apos;t </em>be bypassed when you&apos;re determined to bypass it.
          </p>
          <Link
            href="/#download"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
          >
            Skip to #1 &rarr;
          </Link>
        </div>
      </section>

      {/* RANKING */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto space-y-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`rounded-2xl border p-8 md:p-10 ${
                tool.rank === 1
                  ? "bg-[var(--card-bg)] border-[var(--accent)]/30 shadow-[0_0_40px_rgba(249,115,22,0.08)]"
                  : "bg-[var(--card-bg)] border-[var(--card-border)]"
              }`}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black ${
                  tool.rank === 1 ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40" : "bg-black/30 text-neutral-500 border border-[var(--card-border)]"
                }`}>
                  #{tool.rank}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-1">{tool.name}</h2>
                  <p className="text-[var(--muted)] text-sm">{tool.tagline}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-1">Price</div>
                  <div className="font-bold text-white">{tool.price}</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Strengths</div>
                  <ul className="space-y-1.5 text-sm text-neutral-300">
                    {tool.strengths.map((s) => (
                      <li key={s}>&middot; {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2">Weaknesses</div>
                  <ul className="space-y-1.5 text-sm text-neutral-300">
                    {tool.weaknesses.map((w) => (
                      <li key={w}>&middot; {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className={`${tool.rank === 1 ? "text-white" : "text-neutral-400"} text-lg leading-relaxed mb-5`}>
                <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mr-2">Verdict</span>
                {tool.verdict}
              </p>

              <Link
                href={tool.cta ? "/#download" : tool.link}
                className={`inline-flex items-center gap-2 font-semibold ${
                  tool.cta
                    ? "bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white px-6 py-3 rounded-xl transition-colors"
                    : "text-[var(--accent)] hover:underline text-sm"
                }`}
              >
                {tool.cta ? "Download FocusDragon — Free" : "Read deeper comparison →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY FD */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-center">
            Why FocusDragon is free <span className="gradient-text">at all</span>
          </h2>
          <div className="space-y-5 text-neutral-400 text-lg leading-relaxed">
            <p>
              Most website blockers charge because they have to fund a company.
              FocusDragon is a solo project. The hosting bill is less than a coffee per month.
              There are no investors, no employees, no office.
            </p>
            <p>
              The author is a student in Dubai who built it to beat his own gaming addiction.
              Charging money for a tool that helps people overcome compulsive behaviour felt wrong &mdash;
              especially when the people who need it most are often the ones least willing to commit
              to another subscription.
            </p>
            <p className="text-white font-medium">
              Free forever. Every feature. No trial. No account. No upsell. No ads.
            </p>
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
