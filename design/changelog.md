# Design loop changelog

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

## Round 2 — design-loop-v2 · pending

**Changed:** "What Happens Next" wrapped in a mist chapter-band (`bg-mist`,
`border-y border-line`) to break the white desert; steps restyled with large
`fbblue` display numerals 01/02/03 (numbers moved from h3 text into aria-hidden
graphic spans — wording unchanged). FAQ entries get `border-l-2 border-line`
left rules (light-band echo of the dark band's piece treatment). Carousel
cards 78% → 86% width on mobile (bigger proof imagery, sizes attr updated).
Poster `quality={70}` (LCP bytes headroom).
