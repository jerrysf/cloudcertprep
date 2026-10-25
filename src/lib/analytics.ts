/**
 * Privacy-conscious analytics adapter.
 *
 * Events are queued to window.dataLayer-style dispatch only when a provider is
 * configured via NEXT_PUBLIC_ANALYTICS_PROVIDER. Default is a no-op, so no data
 * leaves the user's browser until the site owner opts in and documents consent.
 *
 * To enable: set NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible and add the provider
 * script/consent banner. Never send answer contents or personal learning data.
 */

export const ANALYTICS_EVENTS = {
  ctaClick: "cta_click",
  practiceStart: "practice_start",
  questionSubmit: "question_submit",
  practiceComplete: "practice_complete",
  examStart: "exam_start",
  examComplete: "exam_complete",
  guideView: "guide_view",
  affiliateClick: "affiliate_click",
  studyPlanCreate: "study_plan_create",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Params }) => void;
    __ccpAnalytics?: { provider?: string };
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  if (!provider) return; // no-op by default — privacy first
  // Strip undefined values; never include question/answer payloads.
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined),
  ) as Params;
  if (provider === "plausible" && window.plausible) {
    window.plausible(event, { props: clean });
  }
}
