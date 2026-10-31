import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { TOPICS } from "@/lib/content/topics";
import { SERVICES } from "@/lib/content/services";
import { ARTICLES } from "@/lib/content/articles";
import {
  PUBLISHED_QUESTIONS,
  publishedByTopic,
} from "@/lib/content/questions";

const SITE_LAST_UPDATED = "2026-10-25";

function latestReviewed(slugs: string[]): string {
  const dates = slugs.sort();
  return dates[dates.length - 1] ?? SITE_LAST_UPDATED;
}

/**
 * Canonical, indexable URLs only. User-specific and session pages
 * (/results/[id], /mock-exam/[id]) and filter permutations are excluded.
 */
export function getSitemapEntries(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/practice", priority: 0.9 },
    { path: "/certifications", priority: 0.9 },
    { path: "/questions", priority: 0.8 },
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
    url: r.path === "/" ? SITE.url : `${SITE.url}${r.path}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: "weekly",
    priority: r.priority,
  }));
  for (const t of TOPICS) {
    const qs = publishedByTopic(t.slug);
    if (qs.length > 0) {
      entries.push({
        url: `${SITE.url}/practice/${t.slug}`,
        lastModified: latestReviewed(qs.map((q) => q.lastReviewed)),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }
  for (const q of PUBLISHED_QUESTIONS) {
    entries.push({
      url: `${SITE.url}/questions/${q.slug}`,
      lastModified: q.lastReviewed,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const c of CERTIFICATIONS) {
    entries.push({
      url: `${SITE.url}/certifications/${c.id}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  for (const s of SERVICES) {
    entries.push({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified: SITE_LAST_UPDATED,
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
