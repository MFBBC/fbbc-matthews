import { redirect } from 'next/navigation';

/**
 * v7: the quiz is the front door now — old /apply links go to the homepage
 * quiz. (Temporary redirect on purpose: /apply's role has changed twice.)
 */
export default function ApplyRedirect() {
  redirect('/');
}
