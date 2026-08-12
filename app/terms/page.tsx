import type { Metadata } from 'next';
import BrandHeader from '@/components/BrandHeader';
import { BIZ } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Fit Body Boot Camp Matthews',
  robots: { index: false },
};

/**
 * Standard studio terms. NOTE FOR OWNER: baseline only, not legal advice —
 * have an attorney review, especially the 90-Day Promise section, and keep
 * these consistent with your membership agreement.
 */
export default function Terms() {
  const S = 'mt-8 font-display text-xl font-extrabold uppercase tracking-wide';
  const P = 'mt-3 leading-relaxed text-graphite';
  return (
    <>
      <BrandHeader />
      <main className="mx-auto max-w-2xl px-4 py-14">
        <h1 className="h-section">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-graphite/60">Last updated: August 2026</p>

        <p className={P}>
          These Terms govern your use of this website and your participation in the free
          Transformation Assessment offered by Fit Body Boot Camp Matthews. By using this site
          or submitting an application, you agree to them.
        </p>

        <h2 className={S}>The Free Assessment</h2>
        <p className={P}>
          The Transformation Assessment consists of a phone consultation and, by invitation, a
          complimentary InBody body composition scan at our studio. It is free, requires no
          purchase, and carries no obligation to join. Membership programs and pricing are
          discussed individually during your consultation.
        </p>

        <h2 className={S}>Results Disclaimer</h2>
        <p className={P}>
          Testimonials and transformation photos on this site reflect the real experiences of
          individual members who followed our program. Results vary by individual and depend
          on factors including effort, consistency, nutrition, and personal health. No
          specific result is promised or implied from any example shown.
        </p>

        <h2 className={S}>The 90-Day Fit Body Promise</h2>
        <p className={P}>
          The 90-Day Promise applies to enrolled members and is conditioned on completing the
          program as designed during the first 90 days of membership, which means: attending
          coached sessions at least 3 times per week, logging nutrition in our designated app
          as directed, and completing scheduled check-ins and InBody scans. Compliance is
          assessed reasonably by our coaching staff based on attendance and program records.
          If those conditions are met and your InBody scan shows no measurable improvement in
          body composition versus your baseline scan, we will extend your coaching at no
          charge until it does. The Promise is a coaching-continuation guarantee; it is not a
          refund offer, is not transferable, and full details are provided in your membership
          agreement at enrollment.
        </p>

        <h2 className={S}>Health &amp; Safety</h2>
        <p className={P}>
          Our content and coaching are fitness guidance, not medical advice. Consult your
          physician before beginning any exercise or nutrition program, particularly if you
          have a medical condition, are pregnant, or are returning from injury. You are
          responsible for exercising within your own limits.
        </p>

        <h2 className={S}>Communications</h2>
        <p className={P}>
          By submitting an application you agree to be contacted as described in our{' '}
          <a href="/privacy" className="font-bold text-fbblue underline">
            Privacy Policy
          </a>
          , including by text message. You can opt out of texts at any time by replying STOP.
        </p>

        <h2 className={S}>Intellectual Property</h2>
        <p className={P}>
          The Fit Body Boot Camp name and marks are used under franchise license. Site
          content may not be copied or reused without permission.
        </p>

        <h2 className={S}>Limitation of Liability</h2>
        <p className={P}>
          To the fullest extent permitted by law, Fit Body Boot Camp Matthews is not liable
          for indirect or consequential damages arising from use of this website. Nothing in
          these Terms limits rights you have under applicable law.
        </p>

        <h2 className={S}>Contact</h2>
        <p className={P}>
          Fit Body Boot Camp Matthews ·{' '}
          {`${BIZ.street}, ${BIZ.city}, ${BIZ.state} ${BIZ.zip}`} ·{' '}
          <a href={BIZ.phoneHref} className="font-bold text-fbblue underline">
            {BIZ.phone}
          </a>
        </p>
      </main>
    </>
  );
}
