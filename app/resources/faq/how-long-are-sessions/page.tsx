import type { Metadata } from 'next';
import { ResourceCta } from '@/components/ResourceBlocks';
import { FaqSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'How Long Are Fit Body Boot Camp Sessions? (30 Minutes — Here’s Why)',
  description:
    'Fit Body Boot Camp Matthews sessions are 30 minutes, coach-led, with times through the morning and evening. Here’s why 30 minutes of HIRT outworks an hour of guessing.',
  alternates: { canonical: '/resources/faq/how-long-are-sessions' },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <FaqSchema
        faqs={[{
          q: 'How long are Fit Body Boot Camp sessions?',
          a: 'Sessions are 30 minutes, coach-led, with times available through the morning and evening. The HIRT format keeps your metabolism elevated for up to 36 hours afterward.',
        }]}
      />
      <h1 className="h-section">How Long Are Sessions? 30 Minutes. On Purpose.</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          Every session at Fit Body Boot Camp Matthews is 30 minutes, with times through the
          morning and evening. That&apos;s not a lite version of a real workout — it&apos;s the
          whole design.
        </p>
        <p>
          The format is HIRT — High Intensity Resistance Training — built on fundamental movement
          patterns (push, pull, squat, hinge, carry) with strategic active rest. Done at the
          right intensity, that combination triggers the Afterburn Effect: your metabolism stays
          elevated for up to 36 hours after you leave. You&apos;re burning fat Tuesday night from
          Monday morning&apos;s session.
        </p>
        <p>
          The practical win is bigger than the physiological one: 30 minutes is short enough to
          survive contact with a real life. Before school drop-off, on a lunch break, after work
          — it&apos;s less time than the show you&apos;re half-watching tonight. The best workout
          is the one that still happens in week seven.
        </p>
      </div>
      <ResourceCta />
    </main>
  );
}
