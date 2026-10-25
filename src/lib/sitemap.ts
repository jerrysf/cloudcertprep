import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TOPICS } from "@/lib/content/topics";
import { SERVICES } from "@/lib/content/services";
import { ARTICLES } from "@/lib/content/articles";
import { publishedByTopic } from "@/lib/content/questions";

/**
 * Canonical, indexable URLs only. User-specific and session pages
 * (/results/[id], /mock-exam/[id]) and filter permutations are excluded.
 */
export function getSitemapEntries(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/practice", priority: 0.9 },
    { path: "/mock-exam", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/learn", priority: 0.8 },
    { path: "/flashcards", priority: 0.7 },
    { path: "/study-plan", priority: 0.7 },
    { path: "/progress", priority: 0.4 },
    { path: "/about", priority: 0.3 },
    { path: "/contact", priority: 0.3 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
    { path: "/affiliate-disclosure", priority: 0.2 },
    { path: "/disclaimer", priority: 0.2 },
  ];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    changeFrequency: "weekly",
    priority: r.priority,
  }));
  for (const t of TOPICS) {
    if (publishedByTopic(t.slug).length > 0) {
      entries.push({
        url: `${SITE.url}/practice/${t.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }
  for (const s of SERVICES) {
    entries.push({
      url: `${SITE.url}/services/${s.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const a of ARTICLES) {
    entries.push({
      url: `${SITE.url}/learn/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  return entries;
}
