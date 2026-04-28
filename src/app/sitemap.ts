import type { MetadataRoute } from "next";
import { LOCALES } from "./i18n/locales";

const BASE_URL = "https://www.focusdragon.app";

/// Locale-aware sitemap. Every marketing route is emitted once per
/// locale, and each entry carries `alternates.languages` so search
/// engines understand the cross-locale relationships (hreflang).
/// Admin / API / onboard routes never appear here.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faqs", priority: 0.7, changeFrequency: "monthly" },
    { path: "/changelog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
    { path: "/upgrade", priority: 0.4, changeFrequency: "monthly" },
    { path: "/extension-setup", priority: 0.5, changeFrequency: "monthly" },
    { path: "/block-websites-on-mac", priority: 0.9, changeFrequency: "weekly" },
    { path: "/free-website-blocker-mac", priority: 0.9, changeFrequency: "weekly" },
    { path: "/for-adhd", priority: 0.85, changeFrequency: "monthly" },
    { path: "/for-students", priority: 0.85, changeFrequency: "monthly" },
    { path: "/gambling-blocker-mac", priority: 0.85, changeFrequency: "monthly" },
    { path: "/vs/cold-turkey", priority: 0.85, changeFrequency: "monthly" },
    { path: "/vs/freedom", priority: 0.85, changeFrequency: "monthly" },
    { path: "/vs/selfcontrol", priority: 0.85, changeFrequency: "monthly" },
  ];

  const out: MetadataRoute.Sitemap = [];
  for (const { path, priority, changeFrequency } of routes) {
    for (const locale of LOCALES) {
      const languages = Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      );
      out.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  }
  return out;
}
