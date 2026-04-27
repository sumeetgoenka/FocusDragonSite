import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Website Blocker for ADHD on Mac — External Focus Scaffolding | FocusDragon",
  description:
    "Willpower isn't a weakness — the ADHD brain needs external structure. FocusDragon is a free Mac blocker built for the moments your executive function stops answering the phone.",
  alternates: { canonical: "https://www.focusdragon.app/for-adhd" },
  openGraph: {
    title: "FocusDragon for ADHD — External Focus Scaffolding",
    description:
      "Free Mac website & app blocker designed for the ADHD brain. Six lock modes so your future self can't talk your present self out of it.",
    url: "https://www.focusdragon.app/for-adhd",
    type: "article",
  },
};

const faqs = [
  {
    q: "Is FocusDragon designed for ADHD specifically?",
    a: "The feature set is explicitly built for people whose willpower doesn't behave consistently — which describes ADHD very well. Six lock modes let you pre-commit during a motivated moment. A root daemon ensures the block persists when your dopamine-seeking brain gets clever. The app was built by someone who went through the install-blocker-bypass-blocker cycle himself.",
  },
  {
    q: "How does FocusDragon help with ADHD and hyperfocus?",
    a: "Two ways. First, it removes novelty in one click — block Reddit, YouTube, Twitter and the dopamine drip dries up, which resets your attention. Second, the restart-count and random-text lock modes mean that even during a hyperfocus crash (when motivation drops to zero), the block still holds.",
  },
  {
    q: "What's the best lock mode for ADHD?",
    a: "For most people with ADHD, the random-text lock works best — typing 200+ random characters gives the executive function just enough friction to re-engage before you click through. For serious commitments (studying for boards, writing a thesis), the date lock is stronger: you set the calendar date, and the block holds until then regardless of how you feel about it that morning.",
  },
  {
    q: "Will a blocker actually help if I have ADHD?",
    a: "Blockers are not a cure, but they're well-studied as environmental scaffolding. ADHD treatment research consistently shows that reducing environmental triggers is one of the most effective non-pharmacological interventions. The brain can't ruminate on a site that won't load.",
  },
];

export default function ForAdhd() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://www.focusdragon.app" },
          { name: "For ADHD", url: "https://www.focusdragon.app/for-adhd" },
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
            Built for the ADHD brain
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            Willpower <span className="text-neutral-500">isn&apos;t</span>
            <br />
            <span className="gradient-text dragon-glow-text">the tool.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            The ADHD brain runs on novelty and dopamine. Telling it to &ldquo;focus harder&rdquo;
            is like telling a thermostat to feel cold.{" "}
            <span className="text-white font-medium">
              FocusDragon is external scaffolding &mdash; so your executive function doesn&apos;t have to be on call.
            </span>
          </p>
          <Link
            href="/#download"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
          >
            Download &mdash; Free forever
          </Link>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">The problem</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            You&apos;re not lazy. You have <span className="gradient-text">a dopamine deficit.</span>
          </h2>
          <div className="space-y-5 text-neutral-400 text-lg leading-relaxed">
            <p>
              Every app on your phone and every website on your laptop was engineered by teams
              whose full-time job is to exploit variable-ratio reinforcement &mdash; the exact
              mechanism that slot machines use to keep people pulling the lever. For a neurotypical
              brain, that&apos;s annoying. For an ADHD brain, it&apos;s an almost perfect trap.
            </p>
            <p>
              The part of your brain that plans &mdash; the prefrontal cortex &mdash; is the same part
              that&apos;s under-activated in ADHD. Which means the system that&apos;s supposed to
              stop you from opening Reddit is the same system that isn&apos;t fully online.
              No amount of motivation fixes that in the moment.
            </p>
            <p>
              What does work: <strong className="text-white">environmental change</strong>.
              If the dopamine source is physically unreachable, your brain stops hunting for it
              and re-engages with whatever you were actually doing. This isn&apos;t theory &mdash;
              it&apos;s one of the most consistent findings in ADHD research.
            </p>
          </div>
        </div>
      </section>

      {/* THE ANGLE */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Why FocusDragon works for the <span className="gradient-text">ADHD brain</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Three design choices that matter if your focus comes and goes.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                title: "Pre-commit during a motivated moment.",
                body: "At 9 AM on a good day, you want to study. At 3 PM when you hit the wall, you don't. The random-text lock lets 9-AM-you commit on behalf of 3-PM-you — by the time 3 PM rolls around, typing 200 characters of gibberish to check Twitter feels like more work than just doing the assignment.",
              },
              {
                title: "The bypass window is closed before you get there.",
                body: "Most blockers get bypassed during a five-second lapse in executive function. You disable the extension, open the site, and then feel terrible. FocusDragon's daemon adds friction at every layer — disabling it takes more than five seconds of clear thought, which means you usually reconsider before you get through it.",
              },
              {
                title: "Block apps, not just websites.",
                body: "ADHD hunting isn't picky. If Reddit is blocked, the brain goes for Discord. If Discord's blocked, it goes for a video game. FocusDragon blocks apps with the same daemon — one block list covers games, social apps, and websites together.",
              },
            ].map((item, i) => (
              <div key={item.title} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 flex gap-6">
                <div className="shrink-0 text-4xl font-black text-[var(--accent)]/40 w-12">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUGGESTED SETUPS */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              ADHD-tested <span className="gradient-text">setups.</span>
            </h2>
            <p className="text-neutral-400 text-lg">
              Copy one. Adjust. Start tomorrow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "The deep-work slot",
                lock: "Schedule",
                setup: "Block Reddit, Twitter, YouTube, and all messaging apps Mon-Fri 9 AM – 12 PM. The daemon fires automatically; you don't need to remember to start it.",
              },
              {
                name: "The crash-proof essay",
                lock: "Date lock",
                setup: "Got a thesis due Friday? Date-lock everything distracting until Saturday morning. 3-AM-you cannot negotiate with this lock. It just won't budge.",
              },
              {
                name: "The novelty-reset weekend",
                lock: "Restart lock, 5 reboots",
                setup: "Block Instagram, TikTok, Reddit for a weekend. Requires 5 real reboots to unlock — effectively an overnight cooldown.",
              },
              {
                name: "The hyperfocus guardrail",
                lock: "Timer, 3 hours",
                setup: "When you're about to hyperfocus on the wrong thing, set a 3-hour lock on the distraction. By the time the lock ends, the craving has passed.",
              },
              {
                name: "Study sessions with no slips",
                lock: "Random-text",
                setup: "Daily study block. Random-text unlock means a momentary lapse costs real friction. Most people give up typing by character 50.",
              },
              {
                name: "Evening wind-down",
                lock: "Schedule, daily 10 PM – 7 AM",
                setup: "Block stimulating sites/apps every night. Sleep improves within a week. Morning brain works better without the first-thing-dopamine hit.",
              },
            ].map((s) => (
              <div key={s.name} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
                <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-2">
                  {s.lock}
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{s.name}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{s.setup}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH NOTE */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-10">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">A note from the builder</div>
          <p className="text-neutral-400 text-lg leading-relaxed mb-4">
            I&apos;m not a doctor and FocusDragon isn&apos;t a medical device. It&apos;s a tool built
            by a student who struggled with gaming addiction and used this exact approach to get out.
            For clinical ADHD, the best evidence points to a combination of medication, behavioural
            therapy, and environmental design &mdash; this app is a small part of that last category.
          </p>
          <p className="text-neutral-400 text-lg leading-relaxed">
            If you&apos;re not getting support yet and you suspect you have ADHD, please talk to a
            clinician. An unbypassable blocker is a great tool. It&apos;s not a replacement for care.
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
            Stop asking your brain to do <span className="gradient-text">something it can&apos;t.</span>
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
