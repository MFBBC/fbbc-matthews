import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fitness Resources for Matthews, Stallings & South Charlotte | Fit Body Boot Camp Matthews',
  description:
    'Local guides, honest comparisons, and straight answers about group fitness, boot camps, and weight loss programs in the Matthews NC area.',
  alternates: { canonical: '/resources' },
};

const LINKS = [
  { href: '/resources/gym-in-matthews-nc', label: 'Gym in Matthews NC — what to look for (and what we do differently)' },
  { href: '/resources/gym-in-stallings-nc', label: 'Boot camp near Stallings NC — a 10-minute drive worth making' },
  { href: '/resources/gym-in-south-charlotte', label: 'Group fitness in South Charlotte — the Sardis Rd N option' },
  { href: '/resources/burn-boot-camp-alternatives-matthews', label: 'Burn Boot Camp alternatives in Matthews' },
  { href: '/resources/fbbc-matthews-vs-other-group-fitness-matthews', label: 'FBBC Matthews vs. other group fitness options in Matthews' },
  { href: '/resources/faq/too-out-of-shape-for-boot-camp', label: '“Am I too out of shape for a boot camp?”' },
  { href: '/resources/faq/how-long-are-sessions', label: 'How long are Fit Body Boot Camp sessions?' },
  { href: '/resources/faq/why-would-this-time-be-different', label: '“I’ve failed before — why would this time be different?”' },
  { href: '/resources/faq/how-much-does-fit-body-boot-camp-cost', label: 'How much does Fit Body Boot Camp Matthews cost?' },
];

export default function ResourcesIndex() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="h-section">Resources</h1>
      <p className="mt-3 text-lg text-steel">
        Straight answers about fitness in Matthews, Stallings, and South Charlotte — no hype, no
        gatekeeping.
      </p>
      <ul className="mt-8 space-y-4">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-lg font-semibold underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
