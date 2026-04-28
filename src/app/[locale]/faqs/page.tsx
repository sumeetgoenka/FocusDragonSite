import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "../../i18n/locales";
import { t } from "../../i18n/translations";
import SiteNav from "../../components/i18n/SiteNav";
import SiteFooter from "../../components/i18n/SiteFooter";
import { faqs, faqCategories } from "../../faqs/faqs";
import FaqGrid from "../../faqs/FaqGrid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: d.faqs.metaTitle,
    description: d.faqs.metaDescription,
    alternates: {
      canonical: `/${locale}/faqs`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/faqs`])),
    },
  };
}

export default async function FaqsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale as Locale} activePath="faqs" />
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-6">
            <span className="gradient-text dragon-glow-text">{d.faqs.title}</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed mb-4">{d.faqs.subtitle}</p>
          <p className="text-sm text-neutral-500">
            <Link href={`/${locale}/contact`} className="text-[var(--accent)] hover:underline">{d.nav.contact}</Link>
          </p>
        </div>
      </section>
      <section className="pb-28">
        <FaqGrid faqs={faqs} categories={faqCategories} />
      </section>
      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}
