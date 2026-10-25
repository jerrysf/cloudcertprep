import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/results/", "/mock-exam/"],
      // note: /mock-exam (config page) stays indexable; session urls contain ids
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
