import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, LOCALES, type Locale } from "../../../i18n/locales";
import { t } from "../../../i18n/translations";
import SiteNav from "../../../components/i18n/SiteNav";
import SiteFooter from "../../../components/i18n/SiteFooter";
import { faqs, type FaqAnswerBlock } from "../../../faqs/faqs";
import UninstallGuide from "../../../faqs/[slug]/UninstallGuide";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return faqs.map((faq) => ({ slug: faq.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const faq = faqs.find((f) => f.slug === slug);
  if (!faq || !isLocale(locale)) return { title: "FAQ — FocusDragon" };
  return {
    title: `${faq.question} — FocusDragon FAQ`,
    description: faq.short,
    alternates: {
      canonical: `/${locale}/faqs/${slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/faqs/${slug}`])),
    },
  };
}

export default async function FaqDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const faq = faqs.find((f) => f.slug === slug);
  if (!faq) notFound();
  const d = t(locale as Locale);
  const isUninstall = faq.slug === "i-made-a-fatal-mistake";

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale as Locale} activePath="faqs" />
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto">
          <Link href={`/${locale}/faqs`} className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white transition-colors mb-10">
            {d.faqs.backToFaqs}
          </Link>
          <div className="mb-10">
            <div className="text-6xl mb-5">{faq.icon}</div>
            <div className="text-xs uppercase tracking-wider text-[var(--accent)] font-medium mb-3">{faq.category}</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">{faq.question}</h1>
          </div>
          {isUninstall ? <UninstallGuide /> : faq.answer && faq.answer.length > 0 ? (
            <article className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 md:p-10 space-y-5">
              {faq.answer.map((block, i) => <AnswerBlock key={i} block={block} />)}
            </article>
          ) : (
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-[var(--muted)]">
              This FAQ is coming soon.
            </div>
          )}
          <div className="mt-12 text-center text-sm text-neutral-500">
            <Link href={`/${locale}/contact`} className="text-[var(--accent)] hover:underline">{d.nav.contact}</Link>
          </div>
        </div>
      </section>
      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}

function AnswerBlock({ block }: { block: FaqAnswerBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="text-xl font-bold text-white mt-2">{block.text}</h2>;
    case "paragraph":
      return <p className="text-base text-[var(--muted)] leading-relaxed">{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--accent)] text-[var(--muted)] leading-relaxed">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case "code":
      return (
        <pre className="bg-black/60 border border-[var(--card-border)] rounded-xl p-4 overflow-x-auto text-sm text-white/90 font-mono">
          <code>{block.text}</code>
        </pre>
      );
    case "callout":
      return (
        <div className={`rounded-xl p-4 border text-sm leading-relaxed ${
          block.tone === "warning" ? "bg-red-500/10 border-red-500/30 text-red-200"
            : "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-white"
        }`}>{block.text}</div>
      );
  }
}
