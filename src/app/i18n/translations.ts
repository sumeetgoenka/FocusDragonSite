import type { Dict } from "./dictionary";
import type { Locale } from "./locales";
import { en } from "./locales/en";
import { de } from "./locales/de";
import { fr } from "./locales/fr";
import { nl } from "./locales/nl";
import { es } from "./locales/es";
import { pt } from "./locales/pt";
import { it } from "./locales/it";
import { pl } from "./locales/pl";
import { tr } from "./locales/tr";
import { ru } from "./locales/ru";
import { zh } from "./locales/zh";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { hi } from "./locales/hi";
import { ar } from "./locales/ar";
import { fa } from "./locales/fa";
import { vi } from "./locales/vi";
import { id } from "./locales/id";
import { th } from "./locales/th";
import { bn } from "./locales/bn";

const TRANSLATIONS: Record<Locale, Dict> = {
  en, de, fr, nl, es, pt, it, pl, tr, ru,
  zh, ja, ko, hi, ar, fa, vi, id, th, bn,
};

export function t(locale: Locale): Dict {
  return TRANSLATIONS[locale] ?? TRANSLATIONS.en;
}

export function tpl(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
