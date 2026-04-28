import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, isRtl, type Locale } from "../i18n/locales";
import { t } from "../i18n/translations";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: d.home.metaTitle,
    description: d.home.metaDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: d.home.metaTitle,
      description: d.home.metaDescription,
      locale,
      alternateLocale: LOCALES.filter((l) => l !== locale) as unknown as string[],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dir = isRtl(locale as Locale) ? "rtl" : "ltr";
  return (
    <div dir={dir} lang={locale} className="contents">
      {children}
    </div>
  );
}
