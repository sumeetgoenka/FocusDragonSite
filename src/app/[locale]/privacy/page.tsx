import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "../../i18n/locales";
import { t } from "../../i18n/translations";
import SiteNav from "../../components/i18n/SiteNav";
import SiteFooter from "../../components/i18n/SiteFooter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: d.privacy.metaTitle,
    description: d.privacy.metaDescription,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/privacy`])),
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale as Locale} />
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-3">{d.privacy.title}</h1>
          <p className="text-[var(--muted)] text-sm">{d.privacy.lastUpdated}</p>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {d.privacy.sections.map((s, i) => (
            <div key={i} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-7 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-3">{s.title}</h2>
              <p className="text-[var(--muted)] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}
