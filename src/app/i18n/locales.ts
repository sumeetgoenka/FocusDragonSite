/// Master locale list. Adding a new language is a 3-step task:
///   1. Add the entry here
///   2. Add the translation dict in `translations.ts`
///   3. Done — middleware, sitemap, switcher and routing pick it up.
export const LOCALES = [
  "en", "zh", "hi", "es", "ar", "fr", "de", "pt", "ru", "ja",
  "ko", "tr", "it", "vi", "pl", "nl", "id", "th", "fa", "bn",
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/// Right-to-left scripts.
export const RTL_LOCALES: ReadonlySet<Locale> = new Set(["ar", "fa"]);

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.has(locale);
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  hi: "हिन्दी",
  es: "Español",
  ar: "العربية",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  ja: "日本語",
  ko: "한국어",
  tr: "Türkçe",
  it: "Italiano",
  vi: "Tiếng Việt",
  pl: "Polski",
  nl: "Nederlands",
  id: "Bahasa Indonesia",
  th: "ภาษาไทย",
  fa: "فارسی",
  bn: "বাংলা",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
