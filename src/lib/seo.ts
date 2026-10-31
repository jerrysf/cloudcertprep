import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/**
 * Builds complete metadata for a page: canonical, OpenGraph (title,
 * description, url — root layout only provides siteName/type), and
 * the Twitter card. Every indexable page should use this instead of
 * hand-rolling openGraph blocks.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
}): Metadata {
  const { title, description, path, ogType = "website" } = input;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      type: ogType,
    },
    twitter: { card: "summary_large_image" },
  };
}
