import { permanentRedirect } from 'next/navigation';

/**
 * v6: quiz removed to shorten the path (friction test). Booking captures
 * contact info via the GHL calendar form instead. To restore the quiz:
 * put back the previous version of this file (QuizForm is still in
 * components/) and point CTAs back to /apply.
 */
export default function ApplyRedirect() {
  permanentRedirect('/book');
}
