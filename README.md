# CloudCertPrep

Free, open study platform for the **AWS Certified Solutions Architect – Associate (SAA-C03)** exam — original practice questions with per-option explanations, timed mock exams, a study-plan generator, flashcards, and SEO-optimized study guides.

> CloudCertPrep is an independent study resource and is not affiliated with, endorsed by, or sponsored by Amazon Web Services.

## Tech stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** · **lucide-react** icons
- **Zod** for content schema validation
- **localStorage** for anonymous progress (no account required)
- **Vitest** (unit) · **Playwright** (e2e)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Copy `.env.example` to `.env.local` if you need to configure site URL,
analytics, Search Console verification, or ads. Everything works with the
placeholders unset.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (static generation) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests (scoring, timer, persistence, schema, sitemap, study plan) |
| `npm run validate:content` | Content-only test subset (question bank integrity) |
| `npm run test:e2e` | Playwright end-to-end tests (requires a prior `npm run build`; the config starts `next start` on port 3100) |

First-time e2e setup: `npx playwright install chromium`.

## Project structure

```
src/
  app/                  # routes (App Router)
  components/           # UI + interactive client components
  lib/
    content/
      schema.ts         # Zod question schema + bank validators
      domains.ts        # official SAA-C03 exam facts (verify before edits!)
      topics.ts         # practice topics -> /practice/[slug]
      questions/        # question bank, one file per domain
      services.ts       # AWS service study guides -> /services/[slug]
      articles.ts       # in-depth articles -> /learn/[slug]
      flashcards.ts     # flashcard deck
    exam.ts             # answer evaluation, scoring, exam selection, timers
    storage.ts          # ProgressData model + localStorage store
    use-progress.ts     # useSyncExternalStore hooks over localStorage
    study-plan.ts       # study-plan generator
    sitemap.ts          # sitemap URL list (canonical, indexable only)
    analytics.ts        # privacy-first event adapter (no-op by default)
    affiliate.ts        # central affiliate-link config (empty by default)
    site.ts             # site name, nav, footer, trademark disclaimer
tests/
  unit/                 # Vitest
  e2e/                  # Playwright
```

## Adding a practice question

1. Add an object to the matching domain file in `src/lib/content/questions/`
   following the `Question` schema (see any existing entry for the shape).
2. Requirements enforced by `npm run validate:content`:
   - unique `id` (`saa-<area>-NNN`) and `slug`
   - every option has an `optionExplanations` entry
   - `correctAnswers` reference real option ids; single-choice = exactly 1
   - at least one `https://` AWS documentation reference
   - the `topic` exists in `src/lib/content/topics.ts`
3. Set `reviewStatus: "draft"` while working; only `"reviewed"`/`"published"`
   questions render on the site. Set `lastReviewed` when promoting.
4. **Never copy real exam questions.** Write original scenarios and verify every
   technical claim against official AWS documentation before publishing.

Run the checklist in `docs/exam-verification.md` whenever exam details or a
domain weighting changes.

## SEO

- Statically generated pages for all content routes; canonical URLs via
  `metadataBase` + per-page `alternates.canonical`.
- Every published question gets an indexable detail page at
  `/questions/[slug]` (stem, per-option explanations, AWS references, related
  links), discoverable via the `/questions` index, topic pages, and the
  interactive practice UI.
- `src/app/sitemap.ts` lists only canonical, indexable URLs with
  `lastModified`. User-specific pages (`/mock-exam/[id]`, `/results/[id]`) are
  `noindex` + `robots.txt` disallowed; practice filtering is client-side to
  avoid thin URL permutations.
- JSON-LD: `WebSite`/`Organization` site-wide, `Article` on guides/articles,
  `BreadcrumbList` on all content pages.
- Dynamic OG image via `src/app/opengraph-image.tsx`.
- Set `NEXT_PUBLIC_GSC_VERIFICATION` to the Search Console meta-tag token and
  submit `/sitemap.xml` after deployment.

## Analytics & monetization

- Events (`practice_start`, `exam_complete`, `affiliate_click`, …) flow through
  `src/lib/analytics.ts`, which is a **no-op** until
  `NEXT_PUBLIC_ANALYTICS_PROVIDER` is set (e.g. `plausible` + script tag).
- Ads: `<AdSlot>` renders nothing until `NEXT_PUBLIC_ADS_ENABLED=true` — enable
  only after network approval and a consent flow.
- Affiliate links are centralized in `src/lib/affiliate.ts` (empty by default)
  and always rendered alongside a disclosure.
- See `docs/monetization.md` for the full plan.

## Deployment (Vercel)

1. Push this repo to GitHub and import it into Vercel (framework preset is
   auto-detected).
2. Set `NEXT_PUBLIC_SITE_URL` to your production domain (used for canonicals,
   sitemap, OG tags).
3. Optionally set `NEXT_PUBLIC_GSC_VERIFICATION`, then verify the property in
   Google Search Console and submit `https://<domain>/sitemap.xml`.
4. Every push builds automatically; keep `npm run build` green.

## Known limitations / roadmap

- Progress lives in `localStorage` — no cross-device sync, and clearing site
  data erases it. The `ProgressStore` interface in `src/lib/storage.ts` is the
  seam for a future Supabase/Postgres backend.
- Practice scores are simple percentages, not AWS scaled scoring.
- Question bank is 65 questions — enough for topic practice; a full 65-question
  mock exam currently samples from that pool.
- Contact is a mailto link; a serverless form would need spam/rate limiting.
- Search Console/analytics/ads/affiliates are configured but intentionally
  disabled until verified and consented.
