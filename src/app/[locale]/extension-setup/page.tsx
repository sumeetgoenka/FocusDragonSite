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
    title: d.extensionSetup.metaTitle,
    description: d.extensionSetup.metaDescription,
    alternates: {
      canonical: `/${locale}/extension-setup`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/extension-setup`])),
    },
  };
}

export default async function ExtensionSetup({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale as Locale);

  // Setup steps stay English-source for now — they're technical and the
  // browser UI strings they reference ("Allow in Incognito", "Details")
  // are themselves browser-localised. Future Dict extension can move
  // them to per-locale copy.
  const steps = [
    { title: "1. Install the FocusDragon app for Mac", body: "The extension does nothing on its own — it reads your block list and session state from the FocusDragon macOS app." },
    { title: "2. Allow native messaging", body: "The first time a session starts, your browser may ask whether to allow the extension to communicate with 'com.focusdragon.nativehost'. Click Allow." },
    { title: "3. Enable in Incognito", body: "Open chrome://extensions or the equivalent, find FocusDragon, and turn on 'Allow in Incognito'. Without this, private windows become an escape hatch." },
    { title: "4. Keep host permissions on all sites", body: "FocusDragon needs to read URLs across every site to enforce blocks. Don't restrict to specific sites." },
  ];

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav d={d} locale={locale as Locale} />
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{d.extensionSetup.title}</h1>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">{d.extensionSetup.subtitle}</p>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto space-y-5">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-7">
              <h2 className="text-xl font-bold mb-2">{s.title}</h2>
              <p className="text-[var(--muted)] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter d={d} locale={locale as Locale} />
    </div>
  );
}
