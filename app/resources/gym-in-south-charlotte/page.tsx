import type { Metadata } from 'next';
import { ResourceCta, MapEmbed, Nap } from '@/components/ResourceBlocks';

export const metadata: Metadata = {
  title: 'Group Fitness in South Charlotte — Sardis Rd N | Fit Body Boot Camp Matthews',
  description:
    'Group fitness and weight loss coaching for South Charlotte: 30-minute coach-led sessions on Sardis Rd N, HBC nutrition coaching, and an InBody-measured 90-Day Promise.',
  alternates: { canonical: '/resources/gym-in-south-charlotte' },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="h-section">Group Fitness in South Charlotte: The Sardis Rd N Option</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          South Charlotte — Sardis Woods, Providence, the 28270 and 28226 zips — has plenty of
          boutique fitness. Most of it comes in two flavors: hour-long classes that are hard to
          fit into a working parent&apos;s day, or open-floor gyms where the plan is entirely up
          to you. Fit Body Boot Camp Matthews, on Sardis Rd N, was designed as the third option.
        </p>
        <p>
          Sessions are 30 minutes and coach-led, running through the morning and evening, so they
          fit before school drop-off or after work. Training is HIRT — resistance-based intervals
          around push, pull, squat, hinge, and carry — scaled to every level in the room. The
          average member is 47, and half started with zero gym experience.
        </p>
        <p>
          What makes it a program rather than a class: one-on-one HBC nutrition coaching, a
          community with built-in accountability, and progress measured on a medical-grade InBody
          scanner — the reason our 90-Day Promise can be a written guarantee rather than a
          slogan.
        </p>
      </div>
      <h2 className="mt-10 font-display text-2xl font-bold uppercase">Where we are</h2>
      <p className="mb-4 mt-2 text-steel">
        1819 Sardis Rd N puts us minutes from Sardis Rd, Rama Rd, and the Highway 51 corridor —
        an easy hop from most of South Charlotte.
      </p>
      <MapEmbed title="Map to Fit Body Boot Camp Matthews from South Charlotte" />
      <div className="mt-4"><Nap /></div>
      <ResourceCta />
    </main>
  );
}
