# Scorecard — all rounds

Scale: 1–10 per dimension, 140 max. Champion must be beaten on total with no
dimension dropping 2+ and all hard gates passing.

| # | Dimension | v0 (live) | v1 | v2 | v3 (winner) |
|---|---|---|---|---|---|
| 1 | First-viewport impact | 8 | 9 | 9 | 9 |
| 2 | Visual hierarchy | 8 | 9 | 9 | 9 |
| 3 | Mobile thumb-scroll | 7 | 7 | **9** | 9 |
| 4 | Typographic system | 9 | 9 | 9 | 9 |
| 5 | Color & contrast | **5 · gate fail** | **9** | 9 | 9 |
| 6 | CTA prominence | 9 | 9 | 9 | 9 |
| 7 | Proof presentation | 7 | 7 | **8** | 8 |
| 8 | Imagery authenticity | **4** | **6** | 6 | 6 → **8** (real coach photo added post-loop) |
| 9 | Whitespace & rhythm | 8 | 9 | 9 | 9 |
| 10 | Motion restraint | 9 | 9 | 9 | 9 |
| 11 | Form/interaction UX | 8 | 8 | 8 | **9** |
| 12 | Performance craft | 9 | 9 | 9 | 9 |
| 13 | Brand coherence | 9 | 9 | 9 | 9 |
| 14 | Slop detection | 8 | 9 | 9 | 9 |
| | **Total** | **108** | **118** | **121** | **122 → 124** with the real photo |

## Hard gates by round

| Gate | v0 | v1 | v2 | v3 |
|---|---|---|---|---|
| Mobile LCP < 2.5s (Slow-4G + 4x CPU emu) | 2.48s median | 2.52s median¹ | 2.06–2.79s¹ | 2.06s |
| CLS < 0.1 | 0.000 | 0.000 | 0.000 | 0.000 |
| WCAG AA contrast | **FAIL** (CTA sub 1.5:1) | pass | pass | pass |
| Weight < 2MB | 266KB | 268KB | 266KB | 266KB |
| CTA within a thumb-scroll @390 | 767px | 762px | 762px | 762px |
| No break 320–1440 | pass | pass | pass | pass |

¹ Identical payloads and LCP element across versions; run-to-run spread of the
throttled emulation is ±400ms, and pooled distributions are indistinguishable.
The measurement condition is harsher than PSI's default. [verify with PSI on
production once merged]

## Stop reason

Round 3 gained +1 (< 4) and the only dimension under 8 (imagery authenticity,
6) requires real photography — **BLOCKED ON ASSETS**. See shot-list.md: the
four shots, in priority order, that raise the ceiling.
