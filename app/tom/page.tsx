import type { Metadata } from 'next';
import { GymSchema, FaqSchema } from '@/components/Schema';
import BrandHeader from '@/components/BrandHeader';
import FunnelFooter from '@/components/FunnelFooter';
import { CtaButton, StickyCta } from '@/components/Cta';
import SalesLetter, { FAQS } from '@/components/SalesLetter';

export const metadata: Metadata = {
  title: 'Tom, We Have Proof | Fit Body Boot Camp Matthews',
  description:
    'You know what you did, Tom. Skipped leg day. Ghosted a gym in February. Come turn yourself in: free 20-minute session at Fit Body Boot Camp Matthews.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/tom' },
};

/**
 * Campaign page — the gag flyer ("TOM. I have proof that you cheated.").
 * The gag hero stands in for VslHero (two heroes would be absurd), pays the
 * joke off in the first screen, then hands straight to the full sales letter.
 * Funny first, warm always, zero shame. Noindex; every CTA goes to /book.
 */
export default function TomPage() {
  return (
    <>
      <GymSchema />
      <FaqSchema faqs={FAQS} />
      <BrandHeader />
      <main>
        {/* ─────────────────── DARK HERO (the gag) ─────────────────── */}
        <section className="bg-ink pb-14 pt-10 text-white md:pt-16">
          <div className="mx-auto max-w-3xl px-4">
            <p className="eyebrow-onDark mb-4 text-center">
              You scanned it. Of course you scanned it.
            </p>

            <h1 className="h-display text-center">
              TOM. <span className="text-fbyellow">Here&rsquo;s The Evidence.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-center text-lg text-silver">
              Exhibit A: the gym membership you paid for through March and used twice. Exhibit
              B: the app you told &ldquo;tomorrow&rdquo; forty-one times. Exhibit C: leg day.
              You know what you did.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-white">
              Not named Tom? Doesn&rsquo;t matter — you scanned a stranger&rsquo;s flyer looking
              for drama, and honestly, we respect that. But you know what you did too.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-center text-sm italic text-silver">
              (Actual Toms who were briefly worried: breathe. It&rsquo;s a gym. But since
              you&rsquo;re here…)
            </p>

            {/* The pivot: register shifts from bit to straight talk, into the letter. */}
            <p className="mx-auto mt-6 max-w-xl text-center text-lg text-silver">
              Here&rsquo;s the real evidence: it was never about willpower. Everything you tried
              was missing at least two of the three things that make change stick. The letter
              below is the whole case — and what booking a free 20-minute session actually gets
              you.
            </p>

            <p className="mt-4 text-center text-sm font-medium tracking-wide text-silver">
              <span className="text-fbyellow" aria-hidden>★★★★★</span> 5.0 on Google · Matthews, NC
            </p>

            <div className="mt-8">
              <CtaButton
                href="/book"
                dark
                sub="Free 20-minute Transformation Session · You leave with a plan either way · No burpees on day one"
              >
                Fine. I&rsquo;ll Turn Myself In →
              </CtaButton>
            </div>
          </div>
        </section>

        <SalesLetter />

        <StickyCta href="/book" label="Book My Free Session →" revealAfter={0.25} />
      </main>
      <FunnelFooter />
    </>
  );
}
