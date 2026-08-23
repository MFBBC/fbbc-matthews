'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Returning visitors who already finished the quiz skip straight to the
 * VSL page — never make someone re-qualify themselves.
 */
export default function QuizGate() {
  const router = useRouter();
  useEffect(() => {
    try {
      if (localStorage.getItem('fbbc_quiz_done') === '1') router.replace('/watch');
    } catch {}
  }, [router]);
  return null;
}
