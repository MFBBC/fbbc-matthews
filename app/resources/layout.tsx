import Link from 'next/link';
import { BIZ } from '@/lib/business';
import { GymSchema } from '@/components/Schema';

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GymSchema />
      <header className="border-b border-line bg-white px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/resources" className="font-display text-lg font-bold uppercase">
            FBBC Matthews · Resources
          </Link>
          <a href={BIZ.phoneHref} className="text-sm font-semibold">
            {BIZ.phone}
          </a>
        </div>
      </header>
      {children}
      <footer className="border-t border-line px-4 py-8 text-center text-sm text-steel">
        <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link href="/resources/gym-in-matthews-nc" className="underline">Gym in Matthews NC</Link>
          <Link href="/resources/gym-in-stallings-nc" className="underline">Gym in Stallings NC</Link>
          <Link href="/resources/gym-in-south-charlotte" className="underline">Gym in South Charlotte</Link>
          <Link href="/resources/burn-boot-camp-alternatives-matthews" className="underline">Burn Boot Camp alternatives</Link>
          <Link href="/" className="underline">Watch the 4-minute video</Link>
        </nav>
        <p>
          {BIZ.name} · {BIZ.street}, {BIZ.city}, {BIZ.state} {BIZ.zip} ·{' '}
          <a href={BIZ.phoneHref} className="underline">{BIZ.phone}</a>
        </p>
      </footer>
    </>
  );
}
