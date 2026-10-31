import { ARTICLES } from "@/lib/content/articles";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = [...ARTICLES]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE.url}/learn/${a.slug}</link>
      <guid isPermaLink="true">${SITE.url}/learn/${a.slug}</guid>
      <description>${escapeXml(a.description)}</description>
      <pubDate>${new Date(a.updatedAt + "T00:00:00Z").toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} — AWS Certification Study Guides</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(
      "Free AWS certification practice questions, exam guides, and study articles.",
    )}</description>
    <language>en-us</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
