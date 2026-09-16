import { ConversionEvents } from '@/components/providers/ConversionEvents';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

import { Navbar } from './Navbar';
import { ScrollProgress } from './ScrollProgress';

/** Keeps the navigation and document-wide scrolling behavior in one React island. */
interface SiteRuntimeProps {
  pathname?: string;
}

export function SiteRuntime({ pathname = '/' }: SiteRuntimeProps) {
  return (
    <SmoothScrollProvider>
      <ConversionEvents />
      <ScrollProgress />
      <Navbar pathname={pathname} />
    </SmoothScrollProvider>
  );
}
