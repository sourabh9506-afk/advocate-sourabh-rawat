import { BUSINESS } from './business';

export const generateLegalServiceSchema = (locale: string) => {
  const [madiyaon, kaiserbagh] = BUSINESS.locations;

  const toPlace = (loc: typeof BUSINESS.locations[number]) => ({
    "@type": "Place",
    "name": loc.label,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": loc.streetAddress,
      "addressLocality": loc.locality,
      "addressRegion": loc.region,
      "postalCode": loc.postalCode,
      "addressCountry": loc.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": loc.lat,
      "longitude": loc.lng
    }
  });

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": BUSINESS.name,
    "image": "https://advocatelucknow.in/images/og-image.jpg",
    "@id": "https://advocatelucknow.in",
    "url": `https://advocatelucknow.in/${locale}`,
    "telephone": BUSINESS.phone.tel,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": madiyaon.streetAddress,
      "addressLocality": madiyaon.locality,
      "addressRegion": madiyaon.region,
      "postalCode": madiyaon.postalCode,
      "addressCountry": madiyaon.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": madiyaon.lat,
      "longitude": madiyaon.lng
    },
    "location": [toPlace(madiyaon), toPlace(kaiserbagh)],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Bank Transfer",
    "areaServed": {
      "@type": "City",
      "name": "Lucknow",
      "containedInPlace": {
        "@type": "State",
        "name": "Uttar Pradesh"
      }
    },
    "founder": { "@id": "https://advocatelucknow.in/#person" },
    // TODO: add sameAs URLs once available — GBP profile URL, Justdial, Vakilno1, Lawrato, LinkedIn
    "sameAs": [],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Criminal Law Representation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Civil Law Representation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Family Law Representation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Police Station Legal Assistance" } }
      ]
    }
  };
};

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://advocatelucknow.in/#person',
    name: 'Sourabh Rawat',
    jobTitle: 'Advocate',
    description: 'Advocate enrolled with the Bar Council of Uttar Pradesh, practising criminal, civil, and family law at District Court and High Court Lucknow.',
    url: 'https://advocatelucknow.in/en/about',
    image: 'https://advocatelucknow.in/images/team/sourabh.webp',
    telephone: BUSINESS.phone.tel,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.locations[0].streetAddress,
      addressLocality: BUSINESS.locations[0].locality,
      addressRegion: BUSINESS.locations[0].region,
      addressCountry: BUSINESS.locations[0].country,
    },
    worksFor: {
      '@type': 'LegalService',
      name: BUSINESS.name,
      url: 'https://advocatelucknow.in',
    },
    knowsAbout: ['Criminal Law', 'Civil Law', 'Family Law'],
    memberOf: {
      '@type': 'Organization',
      name: 'Bar Council of Uttar Pradesh',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Advocate',
      occupationLocation: {
        '@type': 'City',
        name: 'Lucknow',
      },
    },
    // TODO: add sameAs URLs once available — GBP profile URL, Justdial, Vakilno1, Lawrato, LinkedIn
    sameAs: [],
  }
}

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export function generateFAQSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
