import type { Metadata } from 'next';
import { GymSchema, FaqSchema } from '@/components/Schema';
import BrandHeader from '@/components/BrandHeader';
import FunnelFooter from '@/components/FunnelFooter';
import { CtaButton, StickyCta } from '@/components/Cta';
import SalesLetter, { FAQS } from '@/components/SalesLetter';

export const metadata: Metadata = {
  title: 'Tom, We Have Proof | Fit Body Boot Camp Matthews',
  description:
    'You know what you did, Tom. Skipped leg day. Ghosted a gym in February. Come turn yourself in: free Transformation Call at Fit Body Boot Camp Matthews.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/tom' },
};

/**
 * Campaign page: the gag flyer ("TOM. I have proof that you cheated.").
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
            <p className="eyebrow-onDark mb-4 text-center">The evidence, as promised</p>

            <h1 className="h-display text-center">
              TOM. <span className="text-fbyellow">YOU CHEATED.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-center text-lg text-silver">
              January 2nd: &ldquo;this is my year.&rdquo; January 19th: couch. By February you
              were telling people the gym was &ldquo;too crowded anyway.&rdquo; We checked, Tom.
              You went twice.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-white">
              Not named Tom? You just scanned a stranger&rsquo;s flyer hoping for gossip.
              Respect. But the couch part sounded familiar, didn&rsquo;t it.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-center text-sm italic text-silver">
              (Actual Toms: breathe. It&rsquo;s a gym ad. Your secrets are safe. Mostly.)
            </p>

            {/* The pivot: register shifts from bit to straight talk, into the letter. */}
            <p className="mx-auto mt-6 max-w-xl text-center text-lg text-silver">
              Now the real confession: ours. We built this gym for everyone who quit in
              February. Coached 30-minute workouts. Nutrition that survives birthdays. A crew
              that notices the day you go missing. Quitting was never your character. It was
              your setup.
            </p>

            <p className="mt-4 text-center text-sm font-medium tracking-wide text-silver">
              <span className="text-fbyellow" aria-hidden>★★★★★</span> 5.0 on Google · Matthews, NC
            </p>

            <div className="mt-8">
              <CtaButton
                href="/book"
                dark
                sub="A free Transformation Call: 20 minutes, a real plan, a straight answer. Joined or not, the plan is yours."
              >
                Fine. I&rsquo;ll Turn Myself In →
              </CtaButton>
            </div>
          </div>
        </section>

        <SalesLetter />

        <StickyCta href="/book" label="Book My Free Call →" revealAfter={0.25} />
      </main>
      <FunnelFooter />
    </>
  );
}
