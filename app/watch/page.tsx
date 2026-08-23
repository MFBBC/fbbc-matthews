import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { resolveVariant, AB_COOKIES } from '@/lib/flags';
import { GymSchema, VideoSchema } from '@/components/Schema';
import FunnelFooter from '@/components/FunnelFooter';
import BrandHeader from '@/components/BrandHeader';
import VslHero from '@/components/VslHero';
import SalesLetter from '@/components/SalesLetter';
import { FaqSchema } from '@/components/Schema';
import { FAQS } from '@/components/SalesLetter';

export const metadata: Metadata = {
  title: 'The Reason Nothing Has Worked Isn’t You | Fit Body Boot Camp Matthews',
  description:
    "In the next 4 minutes, Coach Nate reveals the 3 missing pieces behind every lasting transformation in his gym — and why every program you've tried was missing at least two of them.",
  alternates: { canonical: '/watch' },
};

/**
 * Page 2 — the VSL page (was the homepage until the quiz-first funnel).
 * Quiz completion on / routes here; CTAs continue to /book.
 * Kept indexable: searchers landing here directly still get the full letter.
 */
export default function WatchPage() {
  const c = cookies();
  const headlineVariant = resolveVariant('headline', c.get(AB_COOKIES.headline)?.value);
  const skipPlanVariant = resolveVariant('skipPlan', c.get(AB_COOKIES.skipPlan)?.value);

  return (
    <>
      <GymSchema />
      <FaqSchema faqs={FAQS} />
      <VideoSchema />
      <BrandHeader />
      <VslHero headlineVariant={headlineVariant} skipPlanVariant={skipPlanVariant} />
      <SalesLetter />
      <FunnelFooter />
    </>
  );
}
