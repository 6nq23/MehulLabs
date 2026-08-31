'use client';

import { useEffect, useState } from 'react';

/**
 * Returns `null` until mounted so callers can avoid committing to a branch
 * during hydration (important for the frame set: we must not start loading
 * the 1440px sequence on a phone).
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  return reduced === true;
}
