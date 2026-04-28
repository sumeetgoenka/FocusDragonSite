import Image from "next/image";
import Link from "next/link";
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
    title: d.about.metaTitle,
    description: d.about.metaDescription,
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/about`])),
    },
  };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale as Locale} activePath="about" />

      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-8">
            {d.about.heroTitle1}<br />
            <span className="gradient-text dragon-glow-text">{d.about.heroTitle2}</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">{d.about.heroSubtitle}</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block mb-8">
            <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-lg ring-2 ring-[var(--accent)]/20 mx-auto">
              <Image src="/anay.png" alt="Anay Goenka" width={112} height={112} className="w-full h-full object-cover" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Anay Goenka</h2>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="layer-badge inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--accent)]">{d.about.badgeStudent}</span>
            <span className="layer-badge inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--accent)]">{d.about.badgeSolo}</span>
            <span className="layer-badge inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--accent)]">{d.about.badgeAge}</span>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--accent)]/20 to-transparent" aria-hidden="true" />
            <div className="space-y-16">
              <div className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-red-500/80 ring-4 ring-[var(--background)]" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{d.about.chapter1Title}</h3>
                <p className="text-lg text-neutral-400 leading-relaxed mb-4">{d.about.chapter1P1}</p>
                <p className="text-lg text-neutral-400 leading-relaxed">{d.about.chapter1P2}</p>
              </div>
              <div className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-amber-500/80 ring-4 ring-[var(--background)]" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{d.about.chapter2Title}</h3>
                <p className="text-lg text-neutral-400 leading-relaxed mb-4">{d.about.chapter2P1}</p>
                <p className="text-neutral-500 italic border-l-2 border-[var(--accent)]/30 pl-5 text-base">{d.about.chapter2Quote}</p>
              </div>
              <div className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-[var(--accent)] ring-4 ring-[var(--background)]" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{d.about.chapter3Title}</h3>
                <p className="text-lg text-neutral-400 leading-relaxed mb-4">{d.about.chapter3P1}</p>
                <p className="text-lg text-neutral-400 leading-relaxed">{d.about.chapter3P2}</p>
              </div>
              <div className="relative pl-16 md:pl-20">
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[var(--background)]" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4"><span className="gradient-text">{d.about.chapter4Title}</span></h3>
                <p className="text-lg text-neutral-400 leading-relaxed mb-4">{d.about.chapter4P1}</p>
                <p className="text-lg text-white font-medium leading-relaxed">{d.about.chapter4P2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {d.about.closeTitle1} <span className="gradient-text">{d.about.closeTitle2}</span>
            <br className="hidden sm:block" />
            {d.about.closeTitle3}
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-lg mx-auto">{d.about.closeSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}#download`} className="download-btn inline-flex items-center justify-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {d.download.cta}
            </Link>
            <a href="https://anaygoenka.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[var(--card-border)] hover:border-[var(--muted)] text-white font-medium px-7 py-4 rounded-2xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {d.about.websiteLink}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}
