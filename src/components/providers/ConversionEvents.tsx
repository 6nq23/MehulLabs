import { useEffect } from 'react';
import { attributedHref } from '@/lib/booking';
import { trackConversion } from '@/lib/analytics';

export function ConversionEvents() {
  useEffect(() => {
    function decorate(link: HTMLAnchorElement) {
      const href = link.getAttribute('href');
      if (href) link.href = attributedHref(href, window.location.href);
    }
    function trackClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (link) decorate(link);
      if (link?.dataset.ctaLocation) trackConversion({ name: 'primary_cta_click', location: link.dataset.ctaLocation || 'page' });
    }
    document.addEventListener('click', trackClick, true);
    return () => document.removeEventListener('click', trackClick, true);
  }, []);
  return null;
}
