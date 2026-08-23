import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { resolveVariant, AB_COOKIES } from '@/lib/flags';
import { GymSchema } from '@/components/Schema';
import BrandHeader from '@/components/BrandHeader';
import FunnelFooter from '@/components/FunnelFooter';
import QuizForm from '@/components/QuizForm';
import QuizGate from '@/components/QuizGate';

export const metadata: Metadata = {
  title: 'Free Transformation Assessment | Fit Body Boot Camp Matthews',
  description:
    'Answer a few quick questions and Coach Nate builds your personalized transformation plan — free. For women in Matthews, Stallings & South Charlotte who are done starting over.',
  alternates: { canonical: '/' },
};

/**
 * Page 1 — quiz-first front door (spec: qualify + make the lead feel seen +
 * capture contact), then drop into the VSL page (/watch). Booking stays at
 * /book. Visitors who already completed the quiz skip ahead via QuizGate.
 */
export default function QuizPage() {
  const c = cookies();
  const q1Variant = resolveVariant('q1', c.get(AB_COOKIES.q1)?.value);

  return (
    <>
      <GymSchema />
      <QuizGate />
      <BrandHeader />
      {/* Compact hook band above the quiz — same promise, no detour. */}
      <section className="bg-ink px-4 pb-8 pt-8 text-center text-white md:pt-12">
        <p className="eyebrow-onDark mb-3">
          For women in Matthews, Stallings &amp; South Charlotte who are done starting over
        </p>
        <h1 className="h-section mx-auto max-w-2xl">
          The Reason Nothing Has Worked <span className="text-fbyellow">Isn&rsquo;t You.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-silver">
          Answer a few quick questions — 60 seconds — and Coach Nate will build your plan
          around <em>your</em> answers. Free either way.
        </p>
      </section>
      <QuizForm q1Variant={q1Variant} dest="/watch" submitLabel="See My Next Step →" />
      <FunnelFooter />
    </>
  );
}
