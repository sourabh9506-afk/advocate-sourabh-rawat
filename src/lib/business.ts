export const BUSINESS = {
  name: 'Advocate Sourabh Rawat',
  phone: {
    display: '+91 90263 49246',
    tel: '+919026349246',
    wa: '919026349246',
  },
  email: 'Sourabh9506@gmail.com',
  hours: {
    weekday: 'Mon–Fri: 10AM – 6PM',
    saturday: 'Sat: 10AM – 2PM',
  },
  // Third-party profile URLs for schema.org `sameAs`. Add more as they become
  // available (Justdial, Vakilno1, Lawrato, LinkedIn, etc.).
  sameAs: [
    'https://share.google/pZkTxYt32RCd44TK0',
  ],
  locations: [
    {
      id: 'madiyaon',
      label: 'Chamber 1',
      streetAddress: '616/188/A Semra Gaudhi, Near Primary School, Thana Madiyaon',
      locality: 'Lucknow',
      region: 'Uttar Pradesh',
      postalCode: '226021',
      country: 'IN',
      lat: 26.9234755,
      lng: 80.9281100,
      mapsUrl: 'https://maps.google.com/maps?q=26.9234755,80.9281100',
    },
    {
      id: 'kaiserbagh',
      label: 'Chamber 2',
      streetAddress: 'Near CHC Building, Gate No. 8, Kaiserbagh',
      locality: 'Lucknow',
      region: 'Uttar Pradesh',
      postalCode: '226001',
      country: 'IN',
      lat: 26.8565612,
      lng: 80.9319489,
      mapsUrl: 'https://maps.google.com/maps?q=26.8565612,80.9319489',
    },
  ],
} as const;
