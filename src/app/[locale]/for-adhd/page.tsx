import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "../../i18n/locales";
import { t } from "../../i18n/translations";
import SimpleLandingPage from "../_lib/SimpleLandingPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: d.forAdhd.metaTitle,
    description: d.forAdhd.metaDescription,
    alternates: {
      canonical: `/${locale}/for-adhd`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/for-adhd`])),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);
  return (
    <SimpleLandingPage
      d={d}
      locale={locale as Locale}
      heroTitle={d.forAdhd.heroTitle}
      heroSubtitle={d.forAdhd.heroSubtitle}
      cta={d.forAdhd.cta}
    />
  );
}
