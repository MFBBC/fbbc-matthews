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
        {/* Mobile: deliberate stacked lockup (mirrors the poster lettermark) so the
            name never rag-wraps at 320–390px. md+: single line, as before. */}
        <p className="whitespace-nowrap font-display text-base font-black uppercase leading-[1.1] tracking-tight text-white md:text-lg md:leading-none">
          Fit Body Boot Camp
          <span className="block text-fbyellow md:ml-2 md:inline">Matthews</span>
        </p>
        <a
          href={BIZ.phoneHref}
          className="whitespace-nowrap font-display text-sm font-bold tracking-wide text-white/90 hover:text-fbyellow"
        >
          {BIZ.phone}
        </a>
      </div>
      {/* Brand blue rule under the bar */}
      <div className="h-1 bg-fbblue" />
    </header>
  );
}
