'use client';

import { solutionSelectionEvent, type SolutionId } from '@/data/commerce';
import { trackConversion } from '@/lib/analytics';
import { ArrowIcon } from './MagneticButton';

export function SolutionLink({ id, children }: { id: SolutionId; children: React.ReactNode }) {
  return (
    <a href="#contact" className="service-link" onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      window.dispatchEvent(new CustomEvent(solutionSelectionEvent, { detail: id }));
      trackConversion({ name: 'solution_select', solution: id, location: 'solutions' });
    }}>
      {children}<ArrowIcon />
    </a>
  );
}
