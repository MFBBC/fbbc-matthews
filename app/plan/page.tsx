import { permanentRedirect } from 'next/navigation';

/** Single-page funnel: the letter now lives on the homepage. 301 old links. */
export default function PlanRedirect() {
  permanentRedirect('/');
}
