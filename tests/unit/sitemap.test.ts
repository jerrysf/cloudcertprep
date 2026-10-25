import { describe, expect, it } from "vitest";
import { getSitemapEntries } from "@/lib/sitemap";

describe("sitemap", () => {
  const entries = getSitemapEntries();
  const urls = entries.map((e) => e.url);

  it("contains only canonical, indexable URLs", () => {
    for (const u of urls) {
      expect(u).not.toMatch(/\/results\//);
      expect(u).not.toMatch(/\/mock-exam\/.+/);
      expect(u).not.toContain("?"); // no filter permutations
    }
  });

  it("includes core pages", () => {
    expect(urls.some((u) => u.endsWith("/practice"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/mock-exam"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/services"))).toBe(true);
    expect(urls.some((u) => u.includes("/learn/"))).toBe(true);
    expect(urls.some((u) => u.includes("/practice/"))).toBe(true);
  });

  it("has unique URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });
});
