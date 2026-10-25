# Exam Verification Checklist

Run this checklist **before every content release** and whenever AWS publishes
an updated exam guide. Facts to verify live in `src/lib/content/domains.ts`.

Source of truth:
<https://aws.amazon.com/certification/certified-solutions-architect-associate/>
(→ exam guide PDF, linked from that page)

## Verify each release

- [ ] Current exam code is still **SAA-C03** (or update `EXAM.code` and audit
      every domain/topic mapping).
- [ ] Question count, duration, price, delivery options.
- [ ] Passing scaled score (currently 720 / 100–1000, compensatory model).
- [ ] Domain names, numbers, and weights — update `DOMAINS[]`.
- [ ] Task statements under each domain — update `taskStatements[]`.
- [ ] In-scope / out-of-scope service list — retire or draft questions that rely
      on out-of-scope services; add topics for newly in-scope ones.
- [ ] Any answer whose correctness depends on a service feature still holds —
      spot-check `services` arrays and `references` links.
- [ ] Every `references[].url` still resolves (sample-check, or crawl with a
      link checker before release).
- [ ] `reviewStatus`/`lastReviewed` updated for re-verified questions.

## Question authoring rules

- Original scenarios only. Never reproduce real, leaked, or memorized exam
  questions.
- Teach the reasoning: `explanation` = why the correct answer is right;
  `optionExplanations` = why each distractor is wrong.
- Prefer official AWS documentation for `references`; avoid blog posts.
- If a fact cannot be verified against official docs, keep the question
  `draft`, not `published`.
