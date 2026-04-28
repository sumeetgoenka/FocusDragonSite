import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, type Locale } from "../../i18n/locales";
import { t } from "../../i18n/translations";
import SiteNav from "../../components/i18n/SiteNav";
import SiteFooter from "../../components/i18n/SiteFooter";
import { releases } from "./releases";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: d.changelog.metaTitle,
    description: d.changelog.metaDescription,
    alternates: {
      canonical: `/${locale}/changelog`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/changelog`])),
    },
  };
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale as Locale} activePath="changelog" />
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="gradient-text dragon-glow-text">{d.changelog.title}</span>
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-xl mx-auto leading-relaxed">{d.changelog.subtitle}</p>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--card-border)] to-transparent hidden md:block" />
            <div className="space-y-12">
              {releases.map((release) => (
                <div key={release.version} className="relative md:pl-14">
                  <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] hidden md:block" />
                  <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold">v{release.version}</h2>
                      {release.latest && (
                        <span className="ml-2 text-[11px] font-semibold uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 rounded-full px-2.5 py-0.5">
                          {d.changelog.latest}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--muted)] mb-4">{release.date}</p>
                    <p className="text-[var(--muted)] leading-relaxed mb-6">{release.summary}</p>
                    <ul className="space-y-2.5">
                      {release.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
                          <span className="text-sm text-[var(--foreground)]/80 leading-relaxed">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <Link href={`/${locale}#download`}
            className="download-btn inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors">
            {d.download.cta}
          </Link>
        </div>
      </section>
      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}
