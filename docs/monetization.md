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
