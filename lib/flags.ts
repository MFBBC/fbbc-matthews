/**
 * A/B tests — feature-flagged, not hardcoded (spec).
 * middleware.ts assigns each visitor a sticky 50/50 cookie per test.
 * Env override (NEXT_PUBLIC_AB_*) forces a variant for everyone —
 * use it to ship a winner without a code change.
 *
 * Tests:
 *  headline  — VSL page: (a) current headline-first  (b) mirror-moment-first
 *  q1        — /apply step 1: (a) current wording    (b) "What would change in your life…"
 *  skipPlan  — retargeting visitors who watched 75%+: (a) VSL CTA → /plan  (b) → /apply
 */
export type Variant = 'a' | 'b';

export const AB_COOKIES = {
  headline: 'ab_headline',
  q1: 'ab_q1',
  skipPlan: 'ab_skip_plan',
} as const;

export function resolveVariant(
  test: keyof typeof AB_COOKIES,
  cookieValue: string | undefined
): Variant {
  const envKey = {
    headline: process.env.NEXT_PUBLIC_AB_HEADLINE,
    q1: process.env.NEXT_PUBLIC_AB_Q1,
    skipPlan: process.env.NEXT_PUBLIC_AB_SKIP_PLAN,
  }[test];
  if (envKey === 'a' || envKey === 'b') return envKey;
  return cookieValue === 'b' ? 'b' : 'a';
}
