interface BusinessStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string[];
  telephone: string;
  email: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  areaServed: string[];
  serviceType: string[];
  priceRange: string;
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
  };
}

interface ServiceStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
  areaServed: string[];
  serviceType: string;
  offers: {
    "@type": string;
    priceCurrency: string;
    price: string;
    priceSpecification: {
      "@type": string;
      minPrice: string;
      maxPrice: string;
      priceCurrency: string;
    };
  };
}

interface WebsiteStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  potentialAction: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export const createBusinessStructuredData = (): BusinessStructuredData => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tukang - Professional Website Development",
  description:
    "Professional website development services in Malaysia and Singapore. Custom web design, e-commerce solutions, and digital marketing services.",
  url: "https://tukang.my",
  logo: "https://tukang.my/logo.png",
  image: ["https://tukang.my/og-image.jpg", "https://tukang.my/hero-image.jpg"],
  telephone: "+60-123-456-789",
  email: "hello@tukang.my",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Tech Street",
    addressLocality: "Kuala Lumpur",
    addressRegion: "Federal Territory of Kuala Lumpur",
    postalCode: "50450",
    addressCountry: "MY",
  },
  areaServed: ["Malaysia", "Singapore"],
  serviceType: [
    "Website Development",
    "Web Design",
    "E-commerce Development",
    "Mobile App Development",
    "Digital Marketing",
    "SEO Services",
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
  },
});

export const createServiceStructuredData = (
  serviceName: string,
  price: string
): ServiceStructuredData => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceName,
  description: `Professional ${serviceName.toLowerCase()} services in Malaysia and Singapore`,
  provider: {
    "@type": "Organization",
    name: "Tukang",
    url: "https://tukang.my",
  },
  areaServed: ["Malaysia", "Singapore"],
  serviceType: serviceName,
  offers: {
    "@type": "Offer",
    priceCurrency: "MYR",
    price: price,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "1500",
      maxPrice: "50000",
      priceCurrency: "MYR",
    },
  },
});

export const createWebsiteStructuredData = (): WebsiteStructuredData => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tukang",
  url: "https://tukang.my",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://tukang.my/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});

export const createBreadcrumbStructuredData = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createFAQStructuredData = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
