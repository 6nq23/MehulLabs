import { ConversionEvents } from '@/components/providers/ConversionEvents';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

import { ScrollProgress } from './ScrollProgress';
import { LeadCapturePopup } from './LeadCapturePopup';

/** Keeps document-wide scrolling, analytics events and the lead popup in one React island. */
export function SiteRuntime() {
  return (
    <SmoothScrollProvider>
      <ConversionEvents />
      <ScrollProgress />
      <LeadCapturePopup />
    </SmoothScrollProvider>
  );
}
