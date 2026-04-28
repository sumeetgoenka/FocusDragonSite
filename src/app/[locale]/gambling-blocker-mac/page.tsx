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
    title: d.gamblingBlocker.metaTitle,
    description: d.gamblingBlocker.metaDescription,
    alternates: {
      canonical: `/${locale}/gambling-blocker-mac`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/gambling-blocker-mac`])),
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
      heroTitle={d.gamblingBlocker.heroTitle}
      heroSubtitle={d.gamblingBlocker.heroSubtitle}
      cta={d.gamblingBlocker.cta}
    />
  );
}
