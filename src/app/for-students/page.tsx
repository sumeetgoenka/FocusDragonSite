import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import JsonLd, { breadcrumbSchema, faqSchema, softwareAppSchema } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Website Blocker for Students on Mac — Study Without Distraction | FocusDragon",
  description:
    "Block Reddit, YouTube, Instagram, TikTok — everything — during study hours. Free Mac website blocker built by a student, for students. No subscription, no account.",
  alternates: { canonical: "https://focusdragon.app/for-students" },
  openGraph: {
    title: "FocusDragon for Students — Study Without Distraction",
    description:
      "Free Mac website & app blocker for students. Block distractions for exams, essays, and deep study sessions.",
    url: "https://focusdragon.app/for-students",
    type: "article",
  },
};

const faqs = [
  {
    q: "Is there a good free website blocker for students on Mac?",
    a: "FocusDragon is free forever with no account, no subscription, and no feature gates. It was built by a student in Dubai who needed a blocker he couldn't afford to pay for and couldn't bypass during a weak moment. Every lock type is unlocked from day one.",
  },
  {
    q: "What's the best way to block Instagram, TikTok, and Reddit while studying?",
    a: "Use FocusDragon's preset Social Media category — one click blocks 20+ sites and their native apps. Pair it with a schedule (Mon-Fri 8 AM – 5 PM) so it activates automatically during study hours without you having to remember.",
  },
  {
    q: "How do I lock myself out of games during finals week?",
    a: "Add the games to the block list and use a date lock set to the day after your last final. FocusDragon's process-killer terminates games within 1.5 seconds of launch, so even if you forget the lock is on, the game won't open.",
  },
  {
    q: "Will this slow down my Mac while I'm studying?",
    a: "No. FocusDragon is written natively in Swift, installs at around 6 MB, and uses less than 0.1% CPU on average. It's been built to be battery-friendly so it doesn't become a reason to close it.",
  },
];

export default function ForStudents() {
  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={[
        softwareAppSchema,
        breadcrumbSchema([
          { name: "Home", url: "https://focusdragon.app" },
          { name: "For Students", url: "https://focusdragon.app/for-students" },
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
            Built by a student, for students
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            Study. Not
            <br />
            <span className="gradient-text dragon-glow-text">scroll.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Block Reddit, YouTube, Instagram, Discord, TikTok &mdash; every distraction,
            every app, every browser &mdash; for the hours you actually need to get
            something done.{" "}
            <span className="text-white font-medium">Free, forever. No account.</span>
          </p>
          <Link
            href="/#download"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
          >
            Download &mdash; $0 forever
          </Link>
        </div>
      </section>

      {/* THE REAL COST */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">The math</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            You&apos;re losing <span className="gradient-text">whole semesters.</span>
          </h2>
          <div className="space-y-5 text-neutral-400 text-lg leading-relaxed">
            <p>
              The average college student spends over <strong className="text-white">4 hours a day </strong>
              on distracting websites and apps. That&apos;s <strong className="text-white">~500 hours a semester </strong>
              &mdash; roughly three full courses worth of time &mdash; going to a feed that doesn&apos;t care about you.
            </p>
            <p>
              It&apos;s not a moral failing. The average YouTube, Instagram, and TikTok feed is optimised
              by hundreds of engineers whose full-time job is to hold your attention. You are one person
              with a part-time prefrontal cortex going up against billion-dollar systems designed to win.
            </p>
            <p>
              <strong className="text-white">The only winning move is not to play.</strong>{" "}
              Not through willpower. Through the site literally not loading.
            </p>
          </div>
        </div>
      </section>

      {/* SETUPS */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Ready-to-copy <span className="gradient-text">study setups.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: "📝",
                title: "Exam week",
                lock: "Date lock",
                config: "Block all social media + games until the day after your last exam. Cannot unlock early. Cannot uninstall. One commitment, one week, done.",
              },
              {
                icon: "📚",
                title: "Thesis / dissertation",
                lock: "Schedule + random-text",
                config: "Block Reddit, Twitter, YouTube Mon-Fri 9 AM – 6 PM with a random-text unlock for the rare legitimate exception. Friction high enough to finish the chapter.",
              },
              {
                icon: "⏰",
                title: "Pomodoro turbocharged",
                lock: "Timer, 25 min",
                config: "Start a 25-minute lock before each focus block. By minute 3, the urge to check a phone disappears because it can't.",
              },
              {
                icon: "🎮",
                title: "Games out of sight",
                lock: "Schedule, weekdays",
                config: "Block Steam, League, Valorant, and whatever else pulls you in &mdash; Mon-Thurs entirely. Weekends are fair game.",
              },
              {
                icon: "🌙",
                title: "Sleep reset",
                lock: "Schedule, 10 PM – 7 AM",
                config: "Block stimulating sites/apps from 10 PM. Sleep improves within a week. Morning brain works better without the first-thing-dopamine hit.",
              },
              {
                icon: "🧠",
                title: "Study-only browser",
                lock: "Whitelist mode",
                config: "Allow only your course platforms (Canvas, Notion, Overleaf, docs). Everything else is blocked by default. Hard to wander off.",
              },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-7">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{s.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-white text-lg">{s.title}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
                        {s.lock}
                      </span>
                    </div>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">{s.config}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT WORKS FOR STUDENTS */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Built to <span className="gradient-text">survive dorm life.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Can't be uninstalled during a lock",
                body: "Late-night brain looks for the uninstall button first. FocusDragon blocks uninstall during active locks — one more layer between you and your worst decision.",
              },
              {
                title: "Works across every browser",
                body: "Opening Firefox doesn't save you. Other browsers are force-quit if the extension isn't heartbeating. Incognito is killed on sight.",
              },
              {
                title: "Blocks the games too",
                body: "Web blockers that don't touch Steam are missing the point. The process-killer terminates blocked apps within 1.5 seconds of launch.",
              },
              {
                title: "Free because you're broke",
                body: "$40/year blockers feel insulting when you're choosing between a textbook and groceries. FocusDragon is free because it should be.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-7">
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
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
            The <span className="gradient-text">500 hours</span> you&apos;ll get back this semester.
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
