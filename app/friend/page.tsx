import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { resolveVariant, AB_COOKIES } from '@/lib/flags';
import { GymSchema, VideoSchema, FaqSchema } from '@/components/Schema';
import BrandHeader from '@/components/BrandHeader';
import FunnelFooter from '@/components/FunnelFooter';
import VslHero from '@/components/VslHero';
import SalesLetter, { FAQS } from '@/components/SalesLetter';

export const metadata: Metadata = {
  title: 'Your Friend Saved You a Seat | Fit Body Boot Camp Matthews',
  description:
    'A member here gave you one of their two guest seats. Claim it: a free 20-minute Transformation Call with Coach Nate in Matthews, NC. You leave with a plan either way.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/friend' },
};

/**
 * Campaign page: the member-referral flyer QR lands here.
 * Deliberately the same experience as /watch (VSL + full letter), on its own
 * URL so referral scans are attributable. Noindex; CTAs live in VslHero and
 * SalesLetter and all go to /book.
 */
export default function FriendPage() {
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
