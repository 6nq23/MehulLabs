import { ConversionEvents } from '@/components/providers/ConversionEvents';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

import { ScrollProgress } from './ScrollProgress';
import { LeadCapturePopup } from './LeadCapturePopup';

/** Keeps document-wide scrolling, analytics events and the lead popup in one React island. */
interface SiteRuntimeProps {
  /** The 404 page and other noindex pages never show the lead popup. */
  showLeadPopup?: boolean;
}

export function SiteRuntime({ showLeadPopup = true }: SiteRuntimeProps) {
  return (
    <SmoothScrollProvider>
      <ConversionEvents />
      <ScrollProgress />
      {showLeadPopup && <LeadCapturePopup />}
    </SmoothScrollProvider>
  );
}
