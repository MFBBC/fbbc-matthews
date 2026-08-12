import Link from 'next/link';
import { BIZ } from '@/lib/business';

export function ResourceCta({ headline = 'Ready to see if we’re the right fit?' }: { headline?: string }) {
  return (
    <div className="my-10 rounded-2xl bg-ink p-6 text-center text-white">
      <p className="font-display text-2xl font-bold uppercase">{headline}</p>
      <p className="mt-2 text-white/80">
        Start with a free Transformation Assessment — 20 minutes on the phone with Coach Nate,
        plus a free InBody Success Scan at the studio.
      </p>
      <Link
        href="/apply"
        className="mt-4 inline-block rounded-xl bg-cta px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-white"
        style={{ minHeight: 52 }}
      >
        Apply For Your Free Assessment →
      </Link>
    </div>
  );
}

export function MapEmbed({ title }: { title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-md" style={{ aspectRatio: '16 / 10' }}>
      <iframe
        src={BIZ.mapsEmbed}
        title={title}
        className="h-full w-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function Nap() {
  return (
    <p className="text-steel">
      {BIZ.name} · {BIZ.street}, {BIZ.city}, {BIZ.state} {BIZ.zip} ·{' '}
      <a href={BIZ.phoneHref} className="underline">{BIZ.phone}</a>
    </p>
  );
}
