import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "../../i18n/locales";
import { t } from "../../i18n/translations";
import SiteNav from "../../components/i18n/SiteNav";
import SiteFooter from "../../components/i18n/SiteFooter";
import ContactForm from "./ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: d.contact.metaTitle,
    description: d.contact.metaDescription,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/contact`])),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale as Locale} activePath="contact" />
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text dragon-glow-text">{d.contact.heroTitle}</span>
          </h1>
          <p className="text-[var(--muted)] text-lg">{d.contact.heroSubtitle}</p>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <ContactForm d={d} />
        </div>
      </section>
      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}
