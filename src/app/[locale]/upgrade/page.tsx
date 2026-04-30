import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "../../i18n/locales";
import { t } from "../../i18n/translations";
import SiteNav from "../../components/i18n/SiteNav";
import SiteFooter from "../../components/i18n/SiteFooter";
import DownloadButton from "../../components/i18n/DownloadButton";

const APP_VERSION = "1.4.2";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: d.upgrade.metaTitle,
    description: d.upgrade.metaDescription,
    alternates: {
      canonical: `/${locale}/upgrade`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/upgrade`])),
    },
  };
}

export default async function UpgradePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale as Locale} />
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">{d.upgrade.title}</h1>
          <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">{d.upgrade.subtitle}</p>
          <p className="text-neutral-400 text-base mb-12 max-w-2xl mx-auto leading-relaxed">{d.upgrade.body}</p>
          <DownloadButton
            d={d}
            version={APP_VERSION}
            from="upgrade"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {d.download.cta}
          </DownloadButton>
        </div>
      </section>
      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}
