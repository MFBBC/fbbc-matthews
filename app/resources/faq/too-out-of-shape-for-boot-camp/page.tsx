import type { Metadata } from 'next';
import { ResourceCta } from '@/components/ResourceBlocks';
import { FaqSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: '“Am I Too Out of Shape for a Boot Camp?” | Fit Body Boot Camp Matthews',
  description:
    'The honest answer: no. Every exercise at Fit Body Boot Camp Matthews has a modified version for every level, and someone brand new starts every single week.',
  alternates: { canonical: '/resources/faq/too-out-of-shape-for-boot-camp' },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <FaqSchema
        faqs={[{
          q: 'Am I too out of shape for a boot camp?',
          a: 'No. Every exercise has a modified version for every level, every session is coach-led, and half our members started with zero experience. Someone brand new starts every single week, so you will never be the only beginner in the room.',
        }]}
      />
      <h1 className="h-section">&ldquo;Am I Too Out of Shape for a Boot Camp?&rdquo;</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          Honestly? The name is the worst thing about it. &ldquo;Boot camp&rdquo; conjures
          drill-sergeant yelling and burpees until you drop — and that image keeps the exact
          people who&apos;d benefit most standing in the parking lot.
        </p>
        <p>
          Here&apos;s what the room actually looks like at Fit Body Boot Camp Matthews: the
          average member age is 47. Half started with zero gym experience. Every single exercise
          has a modified version for every level — same movement pattern, scaled load and range —
          and a coach leads every session, adjusting for you in real time. Nobody is left to
          guess.
        </p>
        <p>
          Most importantly: someone brand new starts every single week. You will never be the
          only beginner in the room, and the members cheering loudest for the newest person are
          the ones who were new six months ago.
        </p>
        <p>
          Being out of shape isn&apos;t a reason to wait. It&apos;s the reason the program
          exists.
        </p>
      </div>
      <ResourceCta headline="Come see the room for yourself" />
    </main>
  );
}
