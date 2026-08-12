import type { Metadata } from 'next';
import { ResourceCta, Nap } from '@/components/ResourceBlocks';

export const metadata: Metadata = {
  title: 'Burn Boot Camp Alternatives in Matthews NC (An Honest Local Guide)',
  description:
    'Considering Burn Boot Camp in Matthews? Here are the real alternatives — including 30-minute HIRT sessions with 1-on-1 nutrition coaching and an InBody-measured 90-Day Promise at Fit Body Boot Camp Matthews.',
  alternates: { canonical: '/resources/burn-boot-camp-alternatives-matthews' },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="h-section">Burn Boot Camp Alternatives in Matthews, NC</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          First, credit where it&apos;s due: Burn Boot Camp is a well-run program with committed
          trainers and a strong community, and plenty of people in the Matthews area love it. If
          you&apos;re researching alternatives, it&apos;s usually for one of three practical
          reasons — session length, nutrition support, or how progress gets measured. Here&apos;s
          an honest look at the options.
        </p>
      </div>

      <h2 className="mt-10 font-display text-2xl font-bold uppercase">Your realistic options in and around Matthews</h2>
      <ul className="mt-4 space-y-4 text-lg leading-relaxed">
        <li>
          <strong>Traditional big-box gyms</strong> — lowest price, maximum flexibility, zero
          structure. Best for self-directed lifters who already know exactly what to do.
        </li>
        <li>
          <strong>CrossFit boxes</strong> — excellent coaching and community, hour-long classes,
          and a barbell-forward style that suits people who want to train like athletes.
        </li>
        <li>
          <strong>Boutique studios (cycle, yoga, Pilates)</strong> — great single-modality
          workouts; you&apos;ll typically assemble nutrition and strength work separately.
        </li>
        <li>
          <strong>Fit Body Boot Camp Matthews</strong> — that&apos;s us, so weigh this
          accordingly: 30-minute coach-led HIRT sessions instead of 45–60 minutes, one-on-one HBC
          nutrition coaching with a certified Master Nutrition Coach included in most plans, and
          progress measured on a medical-grade InBody scanner, which is what lets us put a
          90-Day Promise in writing.
        </li>
      </ul>

      <h2 className="mt-10 font-display text-2xl font-bold uppercase">How to choose</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed">
        <p>
          Ask every program the same three questions: How long are sessions, honestly, door to
          door? Who is personally responsible for my nutrition — a person or an app? And how will
          we know it&apos;s working — a mirror, a scale, or a measurement we can&apos;t argue
          with? Whichever answers fit your life is the right gym, whether that&apos;s us or not.
        </p>
      </div>
      <div className="mt-8"><Nap /></div>
      <ResourceCta headline="Want the 30-minute version of the answer?" />
    </main>
  );
}
