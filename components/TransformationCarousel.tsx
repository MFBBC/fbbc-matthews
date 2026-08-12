'use client';

import Image from 'next/image';

/**
 * Mobile: horizontal swipe carousel with scroll-snap (spec: carousel, not grid).
 * Desktop (md+): 3-column grid.
 * Alt-text pattern preserved from the current site (it's already good for SEO).
 */
const TRANSFORMATIONS = [
  { name: 'Monica', lbs: 80, inches: 59, img: '/images/transformations/monica.jpg' },
  { name: 'Katie', lbs: 52, inches: 58, img: '/images/transformations/katie.jpg' },
  { name: 'Shelby', lbs: 40, inches: 25, img: '/images/transformations/shelby.jpg' },
  { name: 'Barb', lbs: 80, inches: 40, img: '/images/transformations/barb.jpg' },
  { name: 'Dustin', lbs: 65, inches: 50, img: '/images/transformations/dustin.jpg' },
  { name: 'Kyle', lbs: 100, inches: 54, img: '/images/transformations/kyle.jpg' },
];

export default function TransformationCarousel() {
  return (
    <div>
      <ul
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
        aria-label="Member transformations"
      >
        {TRANSFORMATIONS.map((t) => (
          <li
            key={t.name}
            className="w-[78%] flex-none snap-center md:w-auto"
          >
            <figure className="overflow-hidden rounded-2xl bg-white shadow-md">
              <div className="relative w-full bg-sand" style={{ aspectRatio: '4 / 5' }}>
                <Image
                  src={t.img}
                  alt={`${t.name}'s before and after transformation — ${t.lbs} pounds lost`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 78vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-4 text-center">
                <p className="font-display text-xl font-bold">{t.name}</p>
                <p className="text-steel">
                  −{t.lbs} lbs · −{t.inches} inches
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-center text-xs text-steel md:hidden" aria-hidden>
        Swipe for more →
      </p>
    </div>
  );
}
