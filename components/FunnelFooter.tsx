import { BIZ } from '@/lib/business';

/** Funnel footer: legal links only — no links out of the room (spec). */
export default function FunnelFooter() {
  return (
    <footer className="border-t border-line px-4 py-8 pb-28 text-center text-sm text-steel md:pb-8">
      <p className="mb-2 font-semibold">Inspiring Fitness and Changing Lives Every Day™</p>
      <p>
        {BIZ.name} · {BIZ.street}, {BIZ.city}, {BIZ.state} {BIZ.zip} ·{' '}
        <a href={BIZ.phoneHref} className="underline">
          {BIZ.phone}
        </a>
      </p>
      <p className="mt-2">
        Results vary by individual. ·{' '}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>{' '}
        ·{' '}
        <a href="/terms" className="underline">
          Terms
        </a>
      </p>
    </footer>
  );
}
