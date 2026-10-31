# Monetization Plan

Principle: the site must remain genuinely useful with monetization **off**.
All integrations are config-gated and off by default.

## Phase 0 (current) — free, instrumented

- Core learning features are free with no account or paywall.
- Event hooks exist (`src/lib/analytics.ts`) for funnel measurement: CTA
  clicks, practice/exam starts and completions, affiliate clicks, study-plan
  creation. The adapter is a no-op until `NEXT_PUBLIC_ANALYTICS_PROVIDER` is
  set — recommended: self-hostable, cookieless Plausible.
- Validation metrics to watch in Search Console: impressions/clicks per query
  cluster, practice-completion rate, returning-visitor share. Decide expansion
  based on real query demand, not guesses.

## Phase 1 — affiliate revenue

- Add programs only after joining them (AWS-adjacent course platforms, books,
  hands-on labs). Centralize links in `src/lib/affiliate.ts`; never fabricate
  partnerships or commissions.
- `<AffiliateBlock context="article" />` already renders disclosure-marked
  links on article pages; contexts: `resources`, `article`, `study-plan`.
- Rules: relevance over payout; disclosure adjacent to links; never claim a
  purchase guarantees passing.

## Phase 2 — display ads

- `<AdSlot>` renders nothing until `NEXT_PUBLIC_ADS_ENABLED=true`.
- Only enable after ad-network approval, with a consent banner appropriate to
  the audience's jurisdictions (e.g., GDPR/CCPA). Never place ads inside the
  question-answering UI or between a question and its submit button.

## Phase 3 — optional premium

Candidate paid features (only if free-tier traffic validates demand):

- Cross-device sync + accounts (Supabase — the `ProgressStore` interface is the
  seam).
- Expanded/larger mock-exam pools and full-length timed simulations.
- Downloadable study reports and advanced weak-area analytics.

Do not implement payments until affiliate/ad revenue or user research justifies
the complexity.

## Revenue path to $1,000/month (working assumptions)

Two channels, not mutually exclusive:

1. **Affiliate** (~$5–15/sale for AWS course/lab referrals): ~100–150 sales/mo
   needed. Levers: per-cert hub pages recommend relevant courses, comparison
   articles capture high-intent "X vs Y" and "how to prepare" queries, results
   page suggests paid full-length exams when bank coverage is thin.
2. **Display ads** (~$10–25 RPM in the certification niche): 30–80k monthly
   pageviews needed. Levers: 200+ indexable pages now (question pages, cert
   hubs, articles); each new cert bank adds a separate long-tail pool.

Sequenced bets, highest expected ROI first:
1. Grow CLF-C02 and DVA-C02 banks (entry-level traffic pools).
2. Per-cert "how to prepare" sections with affiliate slots (closest to money).
3. Email list via `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` — repeat visits plus a
   direct channel for affiliate pushes.
4. Apply to ad network only after consistent ~10k+ monthly sessions.
