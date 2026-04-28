import { cache } from "react";
import { headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";
import { t } from "./translations";
import type { Dict } from "./dictionary";

/**
 * Locale resolution helpers that work in server components without an
 * explicit prop drill. We piggyback on the request's URL pathname
 * (carried in the `x-pathname` header set by middleware) to detect the
 * active locale; failing that, we fall back to the cookie or
 * Accept-Language. `cache()` keeps the result per-request stable so
 * Nav, Footer and any nested component see the same value.
 */
export const getRequestLocale = cache(async (): Promise<Locale> => {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first)) return first;
  return DEFAULT_LOCALE;
});

export async function getRequestDict(): Promise<Dict> {
  const locale = await getRequestLocale();
  return t(locale);
}
