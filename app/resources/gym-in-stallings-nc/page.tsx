import type { Metadata } from 'next';
import { ResourceCta, MapEmbed, Nap } from '@/components/ResourceBlocks';

export const metadata: Metadata = {
  title: 'Boot Camp Near Stallings NC — 30-Minute Sessions | Fit Body Boot Camp Matthews',
  description:
    'Stallings NC residents: Fit Body Boot Camp Matthews is a short drive up Monroe Rd for 30-minute coach-led workouts, one-on-one nutrition coaching, and a written 90-Day Promise.',
  alternates: { canonical: '/resources/gym-in-stallings-nc' },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="h-section">Boot Camp Near Stallings NC: The 10-Minute Drive That Sticks</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          If you live in Stallings, Indian Trail, or along the Old Monroe Rd corridor, the gym
          options closest to home tend to be big-box floors: rows of machines, no plan, and
          nobody who notices whether you came. That works for the small percentage of people who
          love training alone. For everyone else, it&apos;s why January memberships go quiet by
          February.
        </p>
        <p>
          Fit Body Boot Camp Matthews sits just up the road on Sardis Rd N — for most of
          Stallings that&apos;s a 10–15 minute drive, and our members make it work because the
          session itself is only 30 minutes. Park, train with a coach leading every rep, and be
          back in the car in about 40 minutes door to door.
        </p>
        <p>
          The short drive buys you the three things closer options usually don&apos;t have all at
          once: coach-led 30-minute HIRT workouts, one-on-one HBC nutrition coaching, and a
          community that texts you when you miss a day. Results are tracked on an InBody scanner
          — the basis of our written 90-Day Promise.
        </p>
      </div>
      <h2 className="mt-10 font-display text-2xl font-bold uppercase">Getting here from Stallings</h2>
      <p className="mb-4 mt-2 text-steel">
        Take Stallings Rd or Old Monroe Rd toward Matthews, then Sardis Rd N — we&apos;re at
        Units 330 &amp; 340.
      </p>
      <MapEmbed title="Map from Stallings NC to Fit Body Boot Camp Matthews" />
      <div className="mt-4"><Nap /></div>
      <ResourceCta />
    </main>
  );
}
