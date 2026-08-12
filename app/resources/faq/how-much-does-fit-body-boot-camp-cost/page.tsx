import type { Metadata } from 'next';
import { ResourceCta } from '@/components/ResourceBlocks';
import { FaqSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'How Much Does Fit Body Boot Camp Matthews Cost? (Straight Answer)',
  description:
    'Pricing at Fit Body Boot Camp Matthews depends on the plan we build together on your free Transformation Call. You’ll know every number before you decide anything.',
  alternates: { canonical: '/resources/faq/how-much-does-fit-body-boot-camp-cost' },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <FaqSchema
        faqs={[{
          q: 'How much does Fit Body Boot Camp Matthews cost?',
          a: "It depends on the plan we build together — which is exactly what the free Transformation Assessment is for. Plans differ mainly in nutrition coaching and progress-meeting frequency. You'll know every number before you decide anything, and nobody will pressure you.",
        }]}
      />
      <h1 className="h-section">What Does It Cost? The Straight Answer.</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          The honest answer: it depends on the plan we build together — and that&apos;s not a
          dodge, it&apos;s the design. Our plans differ mainly in how much nutrition coaching and
          how many progress meetings are included, and the right level depends on your goal and
          what&apos;s been missing from your past attempts.
        </p>
        <p>
          That&apos;s exactly what the free Transformation Assessment is for: 20 minutes on the
          phone with Coach Nate to map where you are, where you want to be, and which plan
          bridges the gap. Two promises hold no matter what: you&apos;ll know every number before
          you decide anything, and nobody will pressure you.
        </p>
        <p>
          One more thing worth knowing while you compare prices around Matthews: our membership
          includes one-on-one nutrition coaching with a certified Master Nutrition Coach and
          InBody scan tracking — line items that are often paid add-ons elsewhere. Compare
          total cost of the result, not just the monthly number.
        </p>
      </div>
      <ResourceCta headline="Get your exact numbers on a free call" />
    </main>
  );
}
