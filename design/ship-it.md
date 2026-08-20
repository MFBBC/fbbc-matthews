# Ship it — how to put design-loop-v3 live

## Merge (GitHub Desktop, ~2 minutes)
1. Open GitHub Desktop → make sure the current branch is **main**
   (branch dropdown → main).
2. Menu **Branch → Merge into current branch…** → choose **design-loop-v3**
   → "Create a merge commit" / Merge.
3. Click **Push origin**. Vercel deploys production automatically (~1 min).
   The live site is https://www.matthewsfbbc.com/.

(The design-loop-v0/v1/v2/v3 branches can be deleted afterwards or kept as
history — they cost nothing.)

## Verify after deploy (5 minutes, on your phone)
- Open www.matthewsfbbc.com — hard-refresh (or private/incognito window).
- Header: gym name on two tidy lines, phone number on one line, tappable.
- Under the big yellow button: the "Pick a time in 30 seconds…" line is
  light gray and readable on black.
- Video poster: no white caption overlapping the poster's own text.
- Scroll to "Meet Coach Nate": clean gray panel, NO gray "replace me" box.
- "Here's Exactly What Happens Next": light band, blue 01/02/03.
- Tap a transformation photo area and swipe: cards are large, snap cleanly.
- Bottom sticky "Book My Free Call" bar appears after you scroll a bit.

## Confirm tracking still fires (5 minutes)
- Open the site with `?utm_source=test&utm_medium=test` appended, tap the
  yellow button → the /book URL should carry the same utm_ parameters.
- Tap play on the video → in Meta Events Manager (Test Events) you should
  see `VSLPlay` (and `VSLProgress25` after ~1 min of watching).
- Tap the phone number in the header → your phone offers to call
  (704) 284-9477.
If any of those fail, roll back (below) and flag it.

## Rollback (if anything looks wrong)
Fastest, no terminal needed: **Vercel dashboard → fbbc-matthews →
Deployments → find the previous Production deployment → ⋯ menu →
"Instant Rollback"**. The site is back to the old version in seconds.

Terminal alternative:
```bash
git revert -m 1 HEAD && git push origin main
```
(reverts the merge commit on main and redeploys the old page).

## After the real photos are shot (shot-list.md)
Drop the new `coach-nate.jpg` into `public/images/`, then restore the image
block in `components/SalesLetter.tsx` — the exact code to restore is in git:
`git show design-loop-v0:components/SalesLetter.tsx` (the section commented
"Image well intentionally removed" marks the spot). Ask the design loop to
run again afterward — imagery is the one dimension still capped.
