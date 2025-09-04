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

export function createBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tukang Design - End-to-End Design & Development",
    description:
      "End-to-end design & development services in Malaysia & Singapore. Full-stack design solutions, custom web development, and complete digital experiences.",
    url: "https://tukang.design",
    logo: "https://tukang.design/logo.png",
    image: [
      "https://tukang.design/og-image.jpg",
      "https://tukang.design/hero-image.jpg",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "studio@tukang.design",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "MY",
      addressLocality: "Shah Alam",
      addressRegion: "Selangor",
    },
    areaServed: ["Malaysia", "Singapore"],
    founder: {
      "@type": "Person",
      name: "Syazwan Shariff",
    },
    foundingDate: "2025",
    sameAs: [
      "https://www.threads.com/@tukangdesign.my",
      "https://www.instagram.com/tukangdesign.my",
    ],
  };
}

export function createServiceStructuredData(serviceName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: `Professional ${serviceName.toLowerCase()} services in Malaysia & Singapore`,
    provider: {
      "@type": "Organization",
      name: "Tukang Design",
      url: "https://tukang.design",
    },
    areaServed: ["Malaysia", "Singapore"],
    serviceType: "Digital Services",
  };
}

export function createWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tukang Design",
    url: "https://tukang.design",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tukang.design/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

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
