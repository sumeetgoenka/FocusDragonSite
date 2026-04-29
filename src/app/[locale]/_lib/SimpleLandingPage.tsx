import Link from "next/link";
import type { Dict } from "../../i18n/dictionary";
import type { Locale } from "../../i18n/locales";
import SiteNav from "../../components/i18n/SiteNav";
import SiteFooter from "../../components/i18n/SiteFooter";
import DownloadButton from "../../components/i18n/DownloadButton";

const APP_VERSION = "1.3.9";

interface Props {
  d: Dict;
  locale: Locale;
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
}

/// Shared shell for the SEO landing pages (`/for-students`, `/for-adhd`,
/// `/block-websites-on-mac`, `/free-website-blocker-mac`,
/// `/gambling-blocker-mac`) and comparison pages (`/vs/*`). Each page
/// gets a localised hero + CTA + the same chrome as the home page.
/// Long-form per-page body content is a Dict extension surface for
/// follow-up agents — for now the foundation gives every locale a
/// translated meta title + hero + CTA.
export default function SimpleLandingPage({ d, locale, heroTitle, heroSubtitle, cta }: Props) {
  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale} />
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-8 leading-[1.05]">
            <span className="gradient-text dragon-glow-text">{heroTitle}</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">{heroSubtitle}</p>
          <DownloadButton
            d={d}
            version={APP_VERSION}
            from="landing"
            className="download-btn group bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all inline-flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {cta}
          </DownloadButton>
          <p className="text-sm text-neutral-500 mt-6">{d.download.requirement}</p>
        </div>
      </section>

      {/* Reuse home dict for richer secondary content — keeps every locale getting useful body */}
      <section className="py-24 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 text-center">
            <span className="gradient-text">{d.home.layersTitle1}</span>
          </h2>
          <p className="text-neutral-400 text-lg text-center max-w-xl mx-auto mb-12">{d.home.layersSubtitle}</p>
          <div className="space-y-3">
            {d.home.layers.map((layer) => (
              <div key={layer.num} className="rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] p-5 flex gap-4">
                <div className="text-2xl font-black text-[var(--accent)]/40 w-10 shrink-0">{layer.num}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{layer.title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href={`/${locale}`} className="text-[var(--accent)] hover:underline text-sm font-medium">
              {d.home.privacyReadMore}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter d={d} locale={locale} />
    </div>
  );
}
