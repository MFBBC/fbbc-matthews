'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/tracking';

/**
 * Member story videos: drop mp4s at /public/videos/story-1.mp4 and story-2.mp4
 * (short, captioned, vertical is fine). Missing files render nothing broken —
 * the section hides itself if neither loads.
 */
const STORIES = [
  { src: '/videos/story-1.mp4', label: 'Member story — what the call was actually like' },
  { src: '/videos/story-2.mp4', label: 'Member story — 90 days later' },
];

export default function ConfirmedContent() {
  const fired = useRef(false);
  useEffect(() => {
    if (!fired.current) {
      fired.current = true;
      track('CallBooked'); // Meta standard: Schedule (see lib/tracking.ts)
    }
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-12">
      <p className="eyebrow mb-3 text-center">You&apos;re booked ✓</p>
      <h1 className="h-display text-center">Coach Nate Will See You Then.</h1>
      <p className="mx-auto mt-4 max-w-lg text-center text-lg text-steel">
        Watch for a text from Coach Nate confirming your time. Here&apos;s exactly what to
        expect — and two members who sat exactly where you&apos;re sitting.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {STORIES.map((s) => (
          <figure key={s.src} className="overflow-hidden rounded-2xl bg-ink">
            <video
              src={s.src}
              controls
              playsInline
              preload="metadata"
              className="w-full"
              style={{ aspectRatio: '9 / 16', objectFit: 'cover' }}
            />
            <figcaption className="p-3 text-center text-sm text-white/80">{s.label}</figcaption>
          </figure>
        ))}
      </div>

      <section className="mt-10 space-y-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-display text-xl font-bold uppercase">What happens on the call</h2>
          <p className="mt-1 leading-relaxed text-steel">
            20 minutes on the phone. Where you are, where you want to be, and the exact route
            between them. If it&apos;s a fit, you pick your start date. If it&apos;s not, Coach
            Nate will say so — zero pressure.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-display text-xl font-bold uppercase">Then your InBody scan</h2>
          <p className="mt-1 leading-relaxed text-steel">
            Your first studio visit starts with a free medical-grade InBody Success Scan — your
            official baseline: body fat %, muscle mass, metabolic rate.
          </p>
        </div>
        <div className="rounded-2xl border-2 border-ink p-5">
          <h2 className="font-display text-xl font-bold uppercase">The 90-Day Fit Body Promise</h2>
          <p className="mt-1 leading-relaxed">
            Do your part, and the results are guaranteed. Train at least 3× per week, track your
            nutrition in our app, and if your 90-day InBody scan doesn&apos;t show measurable
            improvement in your body composition, we coach you <strong>free until it does.</strong>
          </p>
        </div>
      </section>
    </main>
  );
}
