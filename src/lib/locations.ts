export type LocationKind = 'chamber' | 'court';

export interface LocationEntry {
  slug: string;
  kind: LocationKind;
  /** For chambers: which BUSINESS.locations entry this page represents (drives NAP + geo schema). */
  businessLocationId?: 'madiyaon' | 'kaiserbagh';
  /**
   * Map embed query. Chambers use confirmed "lat,lng" from business.ts. Courts use a
   * place-name query so Google resolves the exact location — we do NOT hardcode court
   * coordinates from memory (Master Plan: never guess geo facts).
   */
  mapQuery: string;
  /** Service slugs surfaced as "related services" links on the page. */
  relatedServices: string[];
}

export const LOCATIONS: LocationEntry[] = [
  {
    slug: 'madiyaon-chamber',
    kind: 'chamber',
    businessLocationId: 'madiyaon',
    mapQuery: '26.9234755,80.9281100',
    relatedServices: ['bail-lawyer-in-lucknow', 'anticipatory-bail-lawyer-lucknow', 'property-dispute-lawyer-lucknow'],
  },
  {
    slug: 'kaiserbagh-chamber',
    kind: 'chamber',
    businessLocationId: 'kaiserbagh',
    mapQuery: '26.8565612,80.9319489',
    relatedServices: ['fir-quashing-lawyer-lucknow', 'anticipatory-bail-lawyer-lucknow', 'divorce-lawyer-in-lucknow'],
  },
  {
    // District & Sessions Court + Family Court, Qaiserbagh complex.
    slug: 'district-court-lucknow',
    kind: 'court',
    mapQuery: 'District Court Lucknow, Qaiserbagh, Lucknow',
    relatedServices: ['bail-lawyer-in-lucknow', 'divorce-lawyer-in-lucknow', 'property-dispute-lawyer-lucknow', 'maintenance-lawyer-lucknow'],
  },
  {
    // High Court of Judicature at Allahabad, Lucknow Bench — Gomti Nagar (Vibhuti Khand).
    slug: 'high-court-lucknow-bench',
    kind: 'court',
    mapQuery: 'High Court of Judicature at Allahabad Lucknow Bench, Vibhuti Khand, Gomti Nagar, Lucknow',
    relatedServices: ['fir-quashing-lawyer-lucknow', 'anticipatory-bail-lawyer-lucknow', 'bail-lawyer-in-lucknow'],
  },
];

export const LOCATION_SLUGS = LOCATIONS.map((l) => l.slug);

export function getLocation(slug: string): LocationEntry | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
