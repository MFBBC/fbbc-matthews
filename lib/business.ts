/** Single source of truth — NAP must exactly match the Google Business Profile. */
export const BIZ = {
  name: 'Fit Body Boot Camp Matthews',
  street: '1819 Sardis Rd N, Unit 330 & 340',
  city: 'Charlotte',
  state: 'NC',
  zip: '28270',
  phone: '(704) 284-9477',
  phoneHref: 'tel:+17042849477',
  phoneE164: '+17042849477',
  geo: { lat: 35.1348, lng: -80.7565 },
  mapsEmbed:
    'https://www.google.com/maps?q=Fit+Body+Boot+Camp+1819+Sardis+Rd+N+Unit+330+Charlotte+NC+28270&output=embed',
  rating: { value: '5.0', count: 47 }, // TODO: set count to the live Google review count
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fbbc-matthews.vercel.app';
