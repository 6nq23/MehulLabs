'use client';

import { useEffect } from 'react';
import { trackConversion } from '@/lib/analytics';

export function ConversionEvents() {
  useEffect(() => {
    function trackClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[data-cta-location]');
      if (link) trackConversion({ name: 'primary_cta_click', location: link.dataset.ctaLocation || 'page' });
    }
    document.addEventListener('click', trackClick);
    return () => document.removeEventListener('click', trackClick);
  }, []);
  return null;
}
