import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { resolveVariant, AB_COOKIES } from '@/lib/flags';
import { GymSchema, VideoSchema } from '@/components/Schema';
import FunnelFooter from '@/components/FunnelFooter';
import BrandHeader from '@/components/BrandHeader';
import VslHero from '@/components/VslHero';

export const metadata: Metadata = {
  title: 'The Reason Nothing Has Worked Isn’t You | Fit Body Boot Camp Matthews',
  description:
    "In the next 4 minutes, Coach Nate reveals the 3 missing pieces behind every lasting transformation in his gym — and why every program you've tried was missing at least two of them.",
  alternates: { canonical: '/' },
};

/**
 * Page 1 — VSL page. Minimal by design (spec):
 * pre-headline → headline → sub-headline → video → ONE CTA → trust strip. Nothing else.
 * The long-form content lives on /plan.
 *
 * A/B (headline test): variant B opens with the mirror-moment paragraph first,
 * callout second — per the VSL script's deployment notes.
 * A/B (skipPlan test): variant B sends 75%+ watchers straight to /apply.
 */
export default function VslPage() {
  const c = cookies();
  const headlineVariant = resolveVariant('headline', c.get(AB_COOKIES.headline)?.value);
  const skipPlanVariant = resolveVariant('skipPlan', c.get(AB_COOKIES.skipPlan)?.value);

  return (
    <>
      <GymSchema />
      <VideoSchema />
      <BrandHeader />
      <VslHero headlineVariant={headlineVariant} skipPlanVariant={skipPlanVariant} />
      <FunnelFooter />
    </>
  );
}
