import { site } from '@/data/site';

const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/** Carry campaign tags through navigation without copying arbitrary query data or storing it. */
export function attributedHref(href: string, pageUrl: string) {
  const page = new URL(pageUrl);
  const target = new URL(href, page);
  const booking = new URL(site.bookingUrl);
  const isBooking = target.origin === booking.origin && target.pathname === booking.pathname;
  if (!isBooking && (target.origin !== page.origin || href.startsWith('#'))) return href;
  for (const key of campaignKeys) {
    const value = page.searchParams.get(key);
    if (value && !target.searchParams.has(key)) target.searchParams.set(key, value.slice(0, 200));
  }
  if (isBooking) {
    if (!target.searchParams.has('utm_source')) target.searchParams.set('utm_source', 'mlabs');
    if (!target.searchParams.has('utm_medium')) target.searchParams.set('utm_medium', 'website');
    if (!target.searchParams.has('utm_content')) target.searchParams.set('utm_content', page.pathname);
  }
  return target.href;
}
