/** Local, non-identifying events. No analytics vendor, storage, or network requests. */
export type ConversionEvent =
  | { name: 'primary_cta_click'; location: string }
  | { name: 'solution_select'; solution: string; location: 'solutions' | 'form' | 'campaign' }
  | { name: 'form_start' }
  | { name: 'whatsapp_handoff'; location: 'form' | 'direct' | 'fallback'; solution?: string };

export function trackConversion(event: ConversionEvent) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('mehul:conversion', { detail: event }));
}
