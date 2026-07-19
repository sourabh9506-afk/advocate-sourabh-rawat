export const generateLegalServiceSchema = (locale: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Advocate Sourabh Rawat",
    "image": "https://advocatelucknow.in/images/og-image.jpg",
    "@id": "https://advocatelucknow.in",
    "url": `https://advocatelucknow.in/${locale}`,
    "telephone": "+919026349246",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "616/188/A Semra Gaudhi, Near Primary School, Thana Madiyaon",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226021",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.9234755,
      "longitude": 80.9281100
    },
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
    name: 'Sourabh Rawat',
    jobTitle: 'Advocate',
    description: 'Advocate enrolled with the Bar Council of Uttar Pradesh, practising criminal, civil, and family law at District Court and High Court Lucknow.',
    url: 'https://advocatelucknow.in/en/about',
    image: 'https://advocatelucknow.in/images/team/sourabh.webp',
    telephone: '+919026349246',
    email: 'Sourabh9506@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '616/188/A Semra Gaudhi, Thana Madiyaon',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    worksFor: {
      '@type': 'LegalService',
      name: 'Advocate Sourabh Rawat',
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

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};
