import { BIZ } from '@/lib/business';

/**
 * Brand header — black bar, white lettermark, yellow location tag (brand guide:
 * logo on black/white/photo backgrounds only, never recolored).
 * Deliberately link-free on funnel pages: no nav = no exits (one room, one door).
 */
export default function BrandHeader() {
  return (
    <header className="bg-ink">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <p className="font-display text-lg font-black uppercase leading-none tracking-tight text-white">
          Fit Body Boot Camp
          <span className="ml-2 text-fbyellow">Matthews</span>
        </p>
        <a
          href={BIZ.phoneHref}
          className="font-display text-sm font-bold tracking-wide text-white/90 hover:text-fbyellow"
        >
          {BIZ.phone}
        </a>
      </div>
      {/* Brand blue rule under the bar */}
      <div className="h-1 bg-fbblue" />
    </header>
  );
}
