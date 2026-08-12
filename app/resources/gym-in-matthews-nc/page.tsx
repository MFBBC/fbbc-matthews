import type { Metadata } from 'next';
import { ResourceCta, MapEmbed, Nap } from '@/components/ResourceBlocks';

export const metadata: Metadata = {
  title: 'Gym in Matthews NC — 30-Minute Coach-Led Boot Camp | Fit Body Boot Camp Matthews',
  description:
    'Looking for a gym in Matthews NC? Fit Body Boot Camp Matthews runs 30-minute coach-led HIRT sessions, 1-on-1 HBC nutrition coaching, and an InBody-measured 90-Day Promise, minutes from downtown Matthews.',
  alternates: { canonical: '/resources/gym-in-matthews-nc' },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="h-section">Gym in Matthews NC: What Actually Gets People Results</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          Matthews has no shortage of places to work out — big-box gyms off Independence, yoga
          studios, CrossFit boxes, and boot camps. If you&apos;re searching &ldquo;gym in
          Matthews NC,&rdquo; the real question usually isn&apos;t <em>where can I exercise</em>.
          It&apos;s <em>where will I actually keep showing up</em>.
        </p>
        <p>
          Fit Body Boot Camp Matthews was built around that question. Our sessions are 30
          minutes — coach-led HIRT (High Intensity Resistance Training) built on fundamental
          movement patterns, with a metabolic Afterburn Effect that keeps working long after you
          leave. The average member age is 47, every exercise has a modified version, and someone
          brand new starts every single week.
        </p>
        <p>
          What separates a gym membership from a transformation is what happens outside the
          workout: our members get 1-on-1 HBC (Habit &amp; Behavior Change) nutrition coaching
          with a certified Master Nutrition Coach, and built-in accountability — when you
          don&apos;t show up, someone notices and someone texts you. Progress is measured on a
          medical-grade InBody scanner, which is why we can put our 90-Day Promise in writing.
        </p>
      </div>
      <h2 className="mt-10 font-display text-2xl font-bold uppercase">Where we are</h2>
      <p className="mb-4 mt-2 text-steel">
        We&apos;re on Sardis Rd N, minutes from downtown Matthews, Sardis Crossing, and the
        Highway 51 corridor — an easy stop on the way to or from work.
      </p>
      <MapEmbed title="Map to Fit Body Boot Camp Matthews — gym near Matthews NC" />
      <div className="mt-4"><Nap /></div>
      <ResourceCta headline="Compare us in person — the assessment is free" />
    </main>
  );
}
