# WINNER — design-loop-v3

- **Branch:** `design-loop-v3` (contains rounds 1–3; each round also lives on
  its own branch)
- **Preview:** https://fbbc-matthews-butvncq74-matthews-fit-body-boot-camp.vercel.app/
- **Score:** 108 → 122 / 140 over three rounds. Stopped: BLOCKED ON ASSETS
  (imagery authenticity is capped at 6 until real photos exist — shot-list.md).

## Every change, in plain English

**Round 1 — fix what was broken**
1. The small reassurance line under the big yellow button ("Pick a time in 30
   seconds · No credit card…") was dark gray on a black background — almost
   nobody could read it. It's now light silver: readable, and it passes
   accessibility standards.
2. The white "Tap to play" caption sat on top of text already printed on the
   video poster, so two lines of text collided. The overlay is gone; the info
   was already right below the video.
3. On phones, "Fit Body Boot Camp Matthews" and the phone number both broke
   awkwardly onto two lines. The name is now a deliberate two-line lockup
   (like the poster), and the phone number never wraps.
4. The "Meet Coach Nate" section was showing a gray box that literally said
   "Replace with real action shot" — on the live site. It's removed; the
   section is a clean text panel with a yellow accent bar until a real photo
   is taken.
5. The white offer/review cards were invisible against the white page. They
   now have a fine gray border.

**Round 2 — make the long middle easier to scroll**
6. "Here's Exactly What Happens Next" sits in a light gray band with big blue
   01 / 02 / 03 numerals — the long white text stretch now has a visual
   chapter break.
7. Each FAQ got a thin left rule, so questions are scannable.
8. Transformation photos are ~10% bigger on phones.
9. The video poster image is slightly more compressed (faster load, no
   visible difference).

**Round 3 — keyboard & polish**
10. Tabbing with a keyboard now shows a clear blue ring on the yellow buttons
    (and a yellow ring on the video play button) instead of a faint browser
    default.
11. The sticky bottom bar has a soft top shadow so it reads as floating above
    the page.

## What was deliberately NOT done
- No copy changes (4 items logged in copy-requests.md for the owner).
- No stock photos — ever. Real-photo gaps are specced in shot-list.md.
- No reordering of the sales letter, no new sections, no animations.
- No changes to tracking: pixel events, UTM passthrough, VSL quartile events
  and call links all untouched (verified present in every round's diff).

## How it was verified
- Vercel preview build per round (compile proof) + full-page screenshots at
  390/768/1440 from the deployed preview.
- Layout-break scan at 320/390/768/1024/1440 (programmatic overflow check).
- Throttled mobile metrics per round (Slow-4G + 4x CPU, Playwright/Edge):
  LCP ~2.1–2.5s, CLS 0.000, ~266KB transfer — all gates pass. Local
  Lighthouse/PSI unavailable on this machine (no Node; PSI anonymous quota
  exhausted) — re-verify with PSI once the loop's changes are on production.
- Keyboard-focus states verified by driving Tab and reading computed styles.
