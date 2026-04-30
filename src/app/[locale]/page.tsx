import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "../i18n/locales";
import { t } from "../i18n/translations";
import SiteNav from "../components/i18n/SiteNav";
import SiteFooter from "../components/i18n/SiteFooter";
import DownloadButton from "../components/i18n/DownloadButton";
import JsonLd, { softwareAppSchema } from "../components/JsonLd";

const APP_VERSION = "1.4.2";

const useCaseIcons = [
  // 9 paths matching the order in the dictionary
  "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5",
  "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z",
  "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
  "M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636",
  "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z",
  "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
  "M3.75 13.5 10.5 2.25l-.75 7.5h4.5L7.5 21.75l.75-8.25h-4.5Z",
  "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
  "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);

  return (
    <div className="min-h-screen bg-grid">
      <JsonLd data={softwareAppSchema} />
      <SiteNav d={d} locale={locale as Locale} activePath="home" />

      {/* HERO */}
      <section className="relative pt-36 pb-28 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow-secondary" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl md:text-[6rem] md:leading-[1.05] font-black tracking-tight mb-8">
            {d.home.heroTitle1}
            <br />
            <span className="gradient-text dragon-glow-text">{d.home.heroTitle2}</span>
            <br />
            <span className="text-neutral-500">{d.home.heroTitle3}</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-14 leading-relaxed">
            {d.home.heroSubtitle}{" "}
            <span className="text-white font-medium">{d.home.heroSubtitleHighlight}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5">
            <DownloadButton
              d={d}
              version={APP_VERSION}
              from="hero"
              className="download-btn group bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all flex items-center gap-3"
            >
              <svg className="w-6 h-6 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {d.download.cta}
            </DownloadButton>
          </div>
          <p className="text-sm text-neutral-500 mb-3">{d.download.requirement}</p>
        </div>
      </section>

      {/* WHY */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-6">{d.home.whyKicker}</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              {d.home.whyTitle1}<br />
              <span className="gradient-text">{d.home.whyTitle2}</span>
            </h2>
          </div>
          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>{d.home.whyP1}</p>
            <p>{d.home.whyP2}</p>
            <p>{d.home.whyP3}</p>
            <p>{d.home.whyP4}</p>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              {d.home.useCasesTitle1} <span className="gradient-text">{d.home.useCasesTitle2}</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">{d.home.useCasesSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {d.home.useCases.map((uc, i) => (
              <div key={uc.title} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
                <svg className="w-7 h-7 mb-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={useCaseIcons[i] ?? useCaseIcons[0]} />
                </svg>
                <h3 className="font-bold text-white mb-1">{uc.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section id="features" className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              <span className="gradient-text">{d.home.layersTitle1}</span> {d.home.layersTitle2}
              <br className="hidden sm:block" />
              {d.home.layersTitle3}
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">{d.home.layersSubtitle}</p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {d.home.layers.map((layer) => (
              <div key={layer.num}
                className="group flex items-start gap-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)]/40 p-6 md:p-8 transition-all hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)]">
                <div className="text-3xl font-black text-[var(--accent)]/30 group-hover:text-[var(--accent)]/60 transition-colors select-none shrink-0 w-12">{layer.num}</div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{layer.title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCKS */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              {d.home.locksTitle1}<br className="hidden sm:block" />
              <span className="gradient-text">{d.home.locksTitle2}</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">{d.home.locksSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {d.home.locks.map((lock) => (
              <div key={lock.name} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-bold text-white text-lg">{lock.name}</h3>
                  {lock.intensity && (
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      lock.intensity === "low" ? "bg-emerald-500/15 text-emerald-400"
                      : lock.intensity === "medium" ? "bg-amber-500/15 text-amber-400"
                      : lock.intensity === "high" ? "bg-orange-500/15 text-orange-400"
                      : "bg-red-500/15 text-red-400"
                    }`}>{lock.intensity}</span>
                  )}
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{lock.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAEMON */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] p-10 md:p-16 dragon-glow">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-6">{d.home.daemonKicker}</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">{d.home.daemonTitle}</h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">{d.home.daemonBody}</p>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                {d.home.daemonItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-neutral-300">
                    <svg className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTRAST */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              {d.home.contrastTitle1} <span className="gradient-text">{d.home.contrastTitle2}</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">{d.home.contrastSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-5">{d.home.themLabel}</div>
              <div className="text-5xl font-black text-red-400 mb-3">{d.home.themBig}</div>
              <p className="text-neutral-500 text-sm mb-6">{d.home.themSub}</p>
              <ul className="space-y-2.5 text-neutral-500 text-sm">
                {d.home.themItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-red-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--accent)]/30 p-8 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
              <div className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-5">{d.home.usLabel}</div>
              <div className="text-5xl font-black text-emerald-400 mb-3">{d.home.usBig}</div>
              <p className="text-neutral-400 text-sm mb-6">{d.home.usSub}</p>
              <ul className="space-y-2.5 text-neutral-300 text-sm">
                {d.home.usItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              {d.home.socialTitle1} <span className="gradient-text">{d.home.socialTitle2}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {d.home.testimonials.map((tt) => (
              <div key={tt.name} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8">
                <div className="text-[var(--accent)] text-3xl mb-4">&ldquo;</div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">{tt.quote}</p>
                <div>
                  <div className="font-semibold text-white text-sm">{tt.name}</div>
                  <div className="text-neutral-500 text-xs">{tt.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE + PRIVACY */}
      <section className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              {d.home.freeTitle1} <span className="gradient-text">{d.home.freeTitle2}</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 md:p-10">
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">{d.home.freeP1}</p>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">{d.home.freeP2}</p>
              <p className="text-neutral-300 text-lg leading-relaxed font-medium">{d.home.freeP3}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-center">
              <div className="text-4xl font-black gradient-text mb-2">{d.home.statFreeBig}</div>
              <div className="text-white font-semibold mb-2">{d.home.statFreeTitle}</div>
              <p className="text-neutral-500 text-sm">{d.home.statFreeBody}</p>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-center">
              <div className="text-4xl font-black gradient-text mb-2">{d.home.statNativeBig}</div>
              <div className="text-white font-semibold mb-2">{d.home.statNativeTitle}</div>
              <p className="text-neutral-500 text-sm">{d.home.statNativeBody}</p>
            </div>
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-center">
              <div className="text-4xl font-black gradient-text mb-2">{d.home.statLocalBig}</div>
              <div className="text-white font-semibold mb-2">{d.home.statLocalTitle}</div>
              <p className="text-neutral-500 text-sm">{d.home.statLocalBody}</p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 md:p-10">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 shrink-0 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <div>
                  <h3 className="font-bold text-white text-xl mb-3">{d.home.privacyTitle}</h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">{d.home.privacyP1}</p>
                  <p className="text-neutral-400 leading-relaxed mb-4">{d.home.privacyP2}</p>
                  <Link href={`/${locale}/privacy`} className="text-[var(--accent)] hover:underline text-sm font-medium">{d.home.privacyReadMore}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="py-28 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            {d.home.downloadTitle1} <span className="gradient-text">{d.home.downloadTitle2}</span>
            <br className="hidden sm:block" />
            {d.home.downloadTitle3}
          </h2>
          <p className="text-neutral-400 text-lg mb-12 max-w-xl mx-auto">{d.home.downloadSubtitle}</p>
          <DownloadButton
            d={d}
            version={APP_VERSION}
            from="footer"
            className="download-btn inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-xl px-10 py-5 rounded-2xl transition-colors mb-6"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {d.home.useCases /* keep dict reference local */ && `${d.download.cta}`}
          </DownloadButton>
          <div className="text-sm text-neutral-500 space-y-1">
            <p>{d.download.requirementLong}</p>
            <p className="text-xs">{d.download.sizeNote}</p>
          </div>
          <div className="mt-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-left max-w-lg mx-auto">
            <h3 className="font-bold mb-4">{d.home.quickInstallTitle}</h3>
            <ol className="space-y-3 text-[var(--muted)] text-sm">
              {d.home.quickInstallSteps.map((step, i) => (
                <li key={i} className="flex gap-3"><span className="text-[var(--accent)] font-bold">{i + 1}.</span>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}
