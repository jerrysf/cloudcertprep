import { test, expect } from "@playwright/test";

// Mobile audit: measure horizontal overflow + key UX at iPhone 13 viewport.
const PAGES = [
  "/",
  "/certifications",
  "/certifications/saa-c03",
  "/certifications/roadmap",
  "/learn",
  "/learn/saa-c03-exam-guide",
  "/questions",
  "/questions/always-on-encrypted",
  "/practice",
  "/practice/design-secure-architectures",
  "/mock-exam",
  "/flashcards",
  "/study-plan",
  "/shop",
];

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

test.describe("mobile audit", () => {
  for (const path of PAGES) {
    test(`no horizontal overflow: ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => {
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        const offenders: string[] = [];
        if (docW > winW) {
          document.querySelectorAll("*").forEach((el) => {
            const r = (el as HTMLElement).getBoundingClientRect();
            if (r.width > winW + 1 && offenders.length < 5) {
              offenders.push(
                `${el.tagName}.${(el as HTMLElement).className
                  .toString()
                  .slice(0, 60)} w=${Math.round(r.width)}`,
              );
            }
          });
        }
        return { docW, winW, offenders };
      });
      expect(overflow.offenders).toEqual([]);
      expect(overflow.docW).toBeLessThanOrEqual(overflow.winW + 1);
    });
  }
});
