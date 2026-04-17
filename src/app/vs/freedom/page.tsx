import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Freedom App Alternative for Mac (Free, No Subscription) — FocusDragon",
  description:
    "Tired of paying $8.99/month for Freedom? FocusDragon is a free Mac alternative with stronger locks, a root daemon, and zero cloud tracking. No account. No subscription. Ever.",
  alternates: { canonical: "https://focusdragon.app/vs/freedom" },
  openGraph: {
    title: "Freedom Alternative for Mac — FocusDragon (Free)",
    description:
      "A free, local-only alternative to Freedom.to with a tougher lock mode and no subscription.",
    url: "https://focusdragon.app/vs/freedom",
    type: "website",
  },
};

const faqs = [
  {
    q: "How does FocusDragon compare to Freedom's pricing?",
    a: "Freedom costs $8.99/month, $39.99/year, or $199.50 lifetime. FocusDragon is $0 — forever, with every feature unlocked from day one. There is no Pro tier, trial period, or paid upgrade.",
  },
  {
    q: "Does FocusDragon have Freedom's 'Locked Mode'?",
    a: "FocusDragon's random-text lock and restart-count lock are both stronger than Freedom's Locked Mode. Freedom's Locked Mode prevents you from disabling a session early, but it can still be bypassed by uninstalling the app. FocusDragon's daemon survives uninstall attempts during active locks, and its random-text mode requires typing 200+ random characters with the clipboard auto-cleared.",
  },
  {
    q: "Does FocusDragon sync across devices like Freedom does?",
    a: "No — and that's intentional. FocusDragon stores everything locally on your Mac and has no network permission. Freedom's cross-device sync is convenient but requires an account, cloud storage, and trusting their servers with your block list. If you need iOS + Windows + Android sync, Freedom wins. If you only need Mac and care about privacy, FocusDragon wins.",
  },
  {
    q: "Is FocusDragon as reliable as a paid tool like Freedom?",
    a: "FocusDragon runs a root daemon that starts on boot, monitors blocks every 1.5 seconds, auto-repairs tampering, and survives every reboot. The blocking enforcement is, if anything, more aggressive than Freedom's — it runs at the OS level rather than relying on a cross-platform layer.",
  },
  {
    q: "Can I block apps, not just websites, like Freedom does?",
    a: "Yes. FocusDragon's process-killer layer terminates blocked apps every 1.5 seconds. Renaming the binary doesn't bypass it — the daemon monitors all running processes.",
  },
];

export default function VsFreedom() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://focusdragon.app" },
          { name: "vs Freedom", url: "https://focusdragon.app/vs/freedom" },
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
            Focus shouldn&apos;t
            <br />
            <span className="gradient-text dragon-glow-text">come with a subscription.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Freedom is $8.99 a month to prevent you from doing things you don&apos;t want to be doing.{" "}
            <span className="text-white font-medium">
              FocusDragon does it for free, stays entirely on your Mac, and locks harder.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/#download"
              className="download-btn bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
            >
              Switch to FocusDragon &mdash; Free
            </Link>
            <a
              href="#price"
              className="border border-[var(--card-border)] hover:border-[var(--muted)] text-white font-medium px-7 py-4 rounded-2xl transition-colors"
            >
              See the pricing math
            </a>
          </div>
        </div>
      </section>

      {/* PRICE MATH */}
      <section id="price" className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              The <span className="gradient-text">pricing math</span>
            </h2>
            <p className="text-neutral-400 text-lg">
              Over 5 years of trying to focus, here&apos;s what each option costs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-center">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">Freedom Monthly</div>
              <div className="text-5xl font-black text-red-400 mb-2">$540</div>
              <div className="text-neutral-500 text-sm">$8.99 &times; 60 months</div>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-center">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">Freedom Annual</div>
              <div className="text-5xl font-black text-amber-400 mb-2">$200</div>
              <div className="text-neutral-500 text-sm">$39.99 &times; 5 years</div>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)]/40 p-8 text-center shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-3">FocusDragon</div>
              <div className="text-5xl font-black gradient-text mb-2">$0</div>
              <div className="text-neutral-500 text-sm">Forever. No account.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE TABLE */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              FocusDragon vs <span className="gradient-text">Freedom.to</span>
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
                ["Price", "Free forever", "$8.99/mo or $199 lifetime"],
                ["Account required", "No", "Yes"],
                ["Cloud sync", "No (local-only)", "Yes, required"],
                ["Platform", "macOS native", "Mac, iOS, Win, Android, Chrome"],
                ["Blocking layers", "6 independent", "2 (proxy + app list)"],
                ["Root daemon enforcement", "Yes", "No"],
                ["Lock modes", "6 composable types", "1 (Locked Mode)"],
                ["Random-text unlock", "Yes", "No"],
                ["Blocks System Settings", "Yes, during active lock", "No"],
                ["Blocks incognito/other browsers", "Yes, force-quits them", "Partial"],
                ["Telemetry", "Off by default", "Account analytics"],
                ["Open to audit", "Swift + C daemon", "Closed, SaaS"],
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
              tag: "01 \u00b7 No subscription",
              title: "You shouldn't rent tools that block your own browser.",
              body: "Freedom charges $8.99/month — roughly the price of Netflix — to stop you from opening Reddit. The math doesn't sit right: subscription software makes sense for products that actively deliver value every month, not for tools that succeed by doing nothing (preventing a website from loading). FocusDragon is built by one person, costs less than a coffee per month to host, and is free as a matter of principle: the people who need focus tools most are often the same people who can't justify another subscription.",
            },
            {
              tag: "02 \u00b7 Local-only",
              title: "Your block list should not live on someone else's server.",
              body: "Freedom requires an account and syncs your data to the cloud. That means the services you're trying to avoid are stored on servers outside your control. FocusDragon runs entirely on your Mac — the app literally doesn't have network permission. No account. No sync. No server that could be breached, subpoenaed, or sold. Your block list, usage patterns, and lock history never leave your machine.",
            },
            {
              tag: "03 \u00b7 Tougher locks",
              title: "Locked Mode is a speed bump. FocusDragon is a wall.",
              body: "Freedom's Locked Mode prevents you from ending a session early, but it runs from a cross-platform app that you can still force-quit or uninstall during a session. FocusDragon's root daemon keeps enforcing blocks even if you force-quit, uninstall, or reboot. Combine that with a random-text unlock (type 200+ random characters, clipboard auto-cleared) and the brain gives up long before the lock does.",
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
                <li>&middot; You only need focus on your Mac</li>
                <li>&middot; You don&apos;t want another subscription</li>
                <li>&middot; You care about privacy and local-only data</li>
                <li>&middot; You want stronger lock enforcement</li>
                <li>&middot; You&apos;re okay without cross-device sync</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">Pick Freedom if</div>
              <ul className="space-y-3 text-neutral-400">
                <li>&middot; You need blocks across Mac, iOS, Windows, Android</li>
                <li>&middot; You rely on cloud sync for a shared block list</li>
                <li>&middot; You want a managed SaaS rather than a local app</li>
                <li>&middot; Subscription pricing doesn&apos;t bother you</li>
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
            Cancel the subscription. <span className="gradient-text">Keep the focus.</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
            Download FocusDragon, import your block list in two minutes, and never pay for focus again.
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
