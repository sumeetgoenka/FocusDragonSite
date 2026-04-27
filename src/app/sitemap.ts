import type { MetadataRoute } from "next";

const BASE_URL = "https://www.focusdragon.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faqs", priority: 0.7, changeFrequency: "monthly" },
    { path: "/changelog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" },

    // SEO landing pages — launch priority
    { path: "/block-websites-on-mac", priority: 0.9, changeFrequency: "weekly" },
    { path: "/free-website-blocker-mac", priority: 0.9, changeFrequency: "weekly" },
    { path: "/for-adhd", priority: 0.85, changeFrequency: "monthly" },
    { path: "/for-students", priority: 0.85, changeFrequency: "monthly" },
    { path: "/gambling-blocker-mac", priority: 0.85, changeFrequency: "monthly" },

    // Comparison pages
    { path: "/vs/cold-turkey", priority: 0.85, changeFrequency: "monthly" },
    { path: "/vs/freedom", priority: 0.85, changeFrequency: "monthly" },
    { path: "/vs/selfcontrol", priority: 0.85, changeFrequency: "monthly" },
  ];

  return staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
