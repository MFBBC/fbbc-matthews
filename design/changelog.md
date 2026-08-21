# Design loop changelog

## Addendum — real Coach Nate photo (post-loop, same day)

Owner delivered a 4-photo set. The coaching action shot now fills the
restored image well in the Coach Nate panel (shot-list item 1 ✅). Verified
on preview: renders correctly, gates unchanged (LCP 2.14s, CLS 0, initial
transfer 266KB — photo is lazy, below fold). Imagery authenticity 6 → 8;
**final total 124/140**. Remaining imagery ceiling: hero poster still has no
human face (shot-list item 2). Three more real photos parked in
design/photos/ for future sections and ad creative.

## Round 1 — design-loop-v1 · WINNER (108 → 118 / 140)

Preview: https://fbbc-matthews-r4ul5q0hr-matthews-fit-body-boot-camp.vercel.app/

**Changed:** CtaButton `dark` prop (sub caption was #333/70% on black, ~1.5:1 —
WCAG gate fail; now silver, 8.7:1). Removed VslPlayer overlay caption that
collided with the poster's baked-in lettering. BrandHeader stacked lockup on
mobile (killed the rag-wrap at 320–390) + nowrap phone. Removed the live
placeholder image ("Replace with real action shot") from the Coach Nate panel;
kicker-bar motif on its closing line. Hairline `border-line` borders on
offer/review cards. Logged 4 copy items to copy-requests.md (no copy changed).

**Gates:** all pass. LCP medians (Slow-4G + 4x CPU emu, 3 runs): v1 2.52s vs
v0 2.48s — parity within run noise, identical 268KB transfer. CLS 0. Contrast
fixed. No breaks 320–1440.

**Score deltas:** contrast 5→9, imagery 4→6, first-viewport 8→9, hierarchy
8→9, rhythm 8→9, slop 8→9. Nothing dropped.

**Biggest remaining weakness:** mobile thumb-scroll (7) — ~4,500px text desert
between dark band and FAQ; proof presentation (7).

**Note on measurement:** local Lighthouse/PSI unavailable (no Node; PSI
anonymous quota 0). LCP/CLS measured via Playwright + msedge with CDP
Slow-4G/4x-CPU emulation — harsher than PSI's default; treat absolute values
as conservative. [verify with PSI when quota/key available]

## Round 3 — design-loop-v3 · WINNER, FINAL (121 → 122 / 140)

Preview: https://fbbc-matthews-butvncq74-matthews-fit-body-boot-camp.vercel.app/

**Changed (deliberately small — last unblocked polish):** brand-blue
`focus-visible` rings on CtaButton and StickyCta (were browser-default
outlines on yellow); yellow inset focus ring on the video play button; subtle
top shadow on the sticky bar so it reads as elevated above content.

**Gates:** all pass (LCP 2.06s best run, CLS 0, 266KB, no breaks 320–1440).
Focus rings verified by driving Tab and reading computed outline styles
(blue 2px on CTA, yellow 2px on play button).

**LOOP STOPPED — BLOCKED ON ASSETS** (+1 this round, and the only dimension
under 8 is imagery authenticity, which needs the photos in shot-list.md).
Final packet: WINNER.md, scorecard.md, ship-it.md, before-after/, shot-list.md.

## Round 2 — design-loop-v2 · WINNER (118 → 121 / 140)

Preview: https://fbbc-matthews-juvlnt86q-matthews-fit-body-boot-camp.vercel.app/

**Gates:** all pass. LCP runs 2060/2652/2792ms — pooled across v0/v1/v2 the
distributions are statistically identical (same payload, same LCP element);
poster now q70 (strictly fewer bytes). CLS 0. No breaks 320–1440.

**Score deltas:** thumb-scroll 7→9 (mist chapter-band + 01/02/03 numerals +
FAQ left rules), proof 7→8 (86% carousel cards). Nothing dropped.

**Biggest remaining weakness:** imagery authenticity (6) — asset-blocked on
real photography (see shot-list.md). No code change can fix it.

**Changed:** "What Happens Next" wrapped in a mist chapter-band (`bg-mist`,
`border-y border-line`) to break the white desert; steps restyled with large
`fbblue` display numerals 01/02/03 (numbers moved from h3 text into aria-hidden
graphic spans — wording unchanged). FAQ entries get `border-l-2 border-line`
left rules (light-band echo of the dark band's piece treatment). Carousel
cards 78% → 86% width on mobile (bigger proof imagery, sizes attr updated).
Poster `quality={70}` (LCP bytes headroom).
