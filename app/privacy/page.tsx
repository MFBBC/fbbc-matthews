import type { Metadata } from 'next';
import BrandHeader from '@/components/BrandHeader';
import { BIZ } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Privacy Policy | Fit Body Boot Camp Matthews',
  robots: { index: false },
};

/**
 * Standard studio privacy policy. NOTE FOR OWNER: this is a solid baseline,
 * not legal advice — have an attorney (or the franchise's counsel) review it
 * before running paid traffic at scale.
 */
export default function Privacy() {
  const S = 'mt-8 font-display text-xl font-extrabold uppercase tracking-wide';
  const P = 'mt-3 leading-relaxed text-graphite';
  return (
    <>
      <BrandHeader />
      <main className="mx-auto max-w-2xl px-4 py-14">
        <h1 className="h-section">Privacy Policy</h1>
        <p className="mt-2 text-sm text-graphite/60">Last updated: August 2026</p>

        <p className={P}>
          This Privacy Policy describes how Fit Body Boot Camp Matthews (&ldquo;we,&rdquo;
          &ldquo;us&rdquo;) collects, uses, and protects your information when you use this
          website, submit an application, or book a call.
        </p>

        <h2 className={S}>Information We Collect</h2>
        <p className={P}>
          When you submit our application form, we collect the information you provide: your
          name, phone number, email address, and your answers about your fitness goals and
          history. We also automatically collect standard technical information such as your
          device type, browser, pages visited, and how you arrived at our site (for example,
          which ad you clicked).
        </p>

        <h2 className={S}>How We Use Your Information</h2>
        <p className={P}>
          We use your information to review your application, prepare for and conduct your
          Transformation Call, schedule your InBody scan, and follow up with you about our
          services. Your application answers are shared only with our coaching staff so they
          can prepare for your specific situation.
        </p>

        <h2 className={S}>Calls &amp; Text Messages</h2>
        <p className={P}>
          By submitting your phone number in our application, you consent to receive calls and
          text messages from us about your application, scheduling, and our services,
          including messages sent using automated technology. Consent is not a condition of
          purchase. Message and data rates may apply, and message frequency varies. Reply STOP
          to any text to opt out at any time, or HELP for help.
        </p>

        <h2 className={S}>Service Providers</h2>
        <p className={P}>
          We use trusted third-party platforms to operate this site and manage communications,
          including our customer relationship and scheduling platform, website hosting, and
          analytics/advertising services (such as Google Analytics and Meta&rsquo;s tools).
          These providers process your information only to provide their services to us.
        </p>

        <h2 className={S}>Cookies &amp; Advertising</h2>
        <p className={P}>
          This site uses cookies and similar technologies to measure how the site is used and
          how our advertising performs. These tools may associate your visit with an ad you
          previously viewed or clicked. You can limit tracking through your browser settings
          and through the ad preference tools offered by Google and Meta.
        </p>

        <h2 className={S}>Your Choices &amp; Rights</h2>
        <p className={P}>
          You may request access to, correction of, or deletion of your personal information
          at any time by contacting us using the details below. You can opt out of marketing
          texts by replying STOP and out of marketing emails via the unsubscribe link in any
          email.
        </p>

        <h2 className={S}>Data Security &amp; Retention</h2>
        <p className={P}>
          We take reasonable measures to protect your information and retain it only as long
          as needed for the purposes above or as required by law.
        </p>

        <h2 className={S}>Children</h2>
        <p className={P}>
          This site and our services are intended for adults. We do not knowingly collect
          information from anyone under 18.
        </p>

        <h2 className={S}>Contact Us</h2>
        <p className={P}>
          Fit Body Boot Camp Matthews · {`${BIZ.street}, ${BIZ.city}, ${BIZ.state} ${BIZ.zip}`} ·{' '}
          <a href={BIZ.phoneHref} className="font-bold text-fbblue underline">
            {BIZ.phone}
          </a>
        </p>

        <p className="mt-8 text-sm text-graphite/60">
          We may update this policy from time to time; the &ldquo;last updated&rdquo; date
          above reflects the current version.
        </p>
      </main>
    </>
  );
}
