/** Only publish owner-approved, anonymized evidence here. Pending material belongs in docs. */
export type EvidenceMedia = {
  id: string;
  caption: string;
} & (
  | { kind: 'image'; src: string; alt: string; width: number; height: number }
  | { kind: 'video'; src: string; poster: string; transcript: string; captionsSrc: string }
);

export interface OrderEvidence {
  count: number;
  basis: 'peak day' | 'daily average';
  measure: string;
  period: string;
  source: string;
}

export interface OwnedBrandExperience {
  id: string;
  name: string;
  category: string;
  context: string;
  relationship: 'owned';
  approvedOrderEvidence?: OrderEvidence;
  approvedMedia: readonly EvidenceMedia[];
}

export const ownedBrands: readonly OwnedBrandExperience[] = [
  {
    id: 'sanskruti',
    name: 'Sanskrutibydiorin',
    category: 'Seasonal products',
    context: 'Ganpati, Rakhi, and Navratri products, with order volumes that rise during festive periods.',
    relationship: 'owned',
    approvedMedia: [],
  },
  {
    id: 'diorin',
    name: 'Diorin Demifine Jewellery',
    category: 'Jewellery',
    context: 'Our jewellery business, using the infrastructure for its daily order operations.',
    relationship: 'owned',
    approvedMedia: [],
  },
];

export const ownershipDisclosure = 'Both are our own brands under one parent business—not independent clients.';

export function hasCompleteOrderEvidence(evidence?: OrderEvidence): evidence is OrderEvidence {
  return Boolean(evidence && Number.isInteger(evidence.count) && evidence.count > 0
    && ['peak day', 'daily average'].includes(evidence.basis)
    && [evidence.measure, evidence.period, evidence.source].every(value => typeof value === 'string' && value.trim().length > 0));
}
