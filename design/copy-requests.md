# Copy requests — logged by the design loop, NOT changed on any branch

The loop treats live copy as approved. These are copy/content issues found during
visual audits that the owner should decide on.

## 1. Review count mismatch (data, but published to Google)
`lib/business.ts` ships `rating: { value: '5.0', count: 47 }` with the TODO
"set count to the live Google review count". The GBP had 24 reviews as of
Aug 2026. This count goes into the LocalBusiness schema — an inflated count
Google can cross-check is a trust/compliance risk. **Ask:** set to the real
live count, and re-check monthly.

## 2. Transformation captions duplicate the numbers baked into the photos
Each carousel image already contains a large "WEIGHT LOST 80 LBS / INCHES
LOST 59 IN" graphic; the caption below repeats "−80 lbs · −59 inches". Saying
it twice inside one card weakens it. **Ask:** approve trimming the caption to
just the first name (numbers stay in the image), or vice versa.

## 3. "10,000s Transformed" vs "tens of thousands"
The hero trust strip says "10,000s · Transformed"; the transformations section
says "tens of thousands of transformations". Same claim, two formats. **Ask:**
pick one phrasing for both spots.

## 4. Hero eyebrow length (mobile)
"For women in Matthews, Stallings & South Charlotte who are done starting
over" wraps to 3 lines of letter-spaced caps at 390px — heavy for an eyebrow.
**Ask:** approve a shorter variant (e.g. "For Matthews women done starting
over") or keep as is.
