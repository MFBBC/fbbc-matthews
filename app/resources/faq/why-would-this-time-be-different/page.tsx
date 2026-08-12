import type { Metadata } from 'next';
import { ResourceCta } from '@/components/ResourceBlocks';
import { FaqSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: '“I’ve Failed Before — Why Would This Time Be Different?” | FBBC Matthews',
  description:
    'Because you’ve never had all three pieces at once: the workout, the nutrition, and people who notice when you don’t show up. Here’s why past programs failed you.',
  alternates: { canonical: '/resources/faq/why-would-this-time-be-different' },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <FaqSchema
        faqs={[{
          q: "I've failed before. Why would this time be different?",
          a: "Because you've never had all three pieces at once — the workout, the nutrition, and people who notice when you don't show up. You've been trying to do alone what was always meant to be done together.",
        }]}
      />
      <h1 className="h-section">&ldquo;I&apos;ve Failed Before. Why Would This Be Different?&rdquo;</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          Fair question — and it deserves a better answer than &ldquo;because we&apos;re
          different.&rdquo;
        </p>
        <p>
          Look back at everything you&apos;ve tried. The big-box gym gave you equipment but no
          plan and nobody who noticed when you stopped coming. The app gave you a plan but no
          human being. The diet gave you rules but no flexibility, so one birthday dinner became
          a reason to quit. Each one had a piece. None had all three.
        </p>
        <p>
          A lasting transformation needs the workout (efficient, coach-led, scaled to you), the
          nutrition (built around habits you can live with permanently, not willpower), and the
          people — someone who texts you when you miss a day, and a room that cheers your name on
          your hardest one. Remove any leg and the stool tips over. That&apos;s not a character
          flaw; it&apos;s structural.
        </p>
        <p>
          You&apos;ve been trying to do alone what was always meant to be done together. That is
          the difference.
        </p>
      </div>
      <ResourceCta headline="Get all three pieces at once" />
    </main>
  );
}
