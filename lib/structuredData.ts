const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://tadalstudio.com";

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TADAL STUDIO",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [
    "https://www.linkedin.com/company/tadal-studio",
    "https://twitter.com/tadalstudio",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "studio@tadalstudio.com",
      areaServed: ["MY", "APAC", "GLOBAL"],
      availableLanguage: ["en", "ms"],
    },
  ],
});

export function serviceSchemaForPackage(
  pkg: "landing" | "business" | "custom"
) {
  const map: Record<
    string,
    { name: string; low: number; high?: number; description: string }
  > = {
    landing: {
      name: "Landing Page",
      low: 1500,
      high: 1500,
      description:
        "Conversion-ready landing page with lead capture and analytics basics.",
    },
    business: {
      name: "Professional Website",
      low: 3000,
      high: 5000,
      description:
        "Multi-page company website with CMS, contact, and campaign-ready pages.",
    },
    custom: {
      name: "Custom Web System",
      low: 5000,
      description:
        "Custom systems: bookings, memberships, dashboards or commerce by scope.",
    },
  };
  const p = map[pkg];
  const priceSpecification: any = {
    "@type": "MonetaryAmount",
    currency: "MYR",
    value: p.low,
  };
  if (p.high) {
    priceSpecification.priceRange = `${p.low}-${p.high}`;
  }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `TADAL STUDIO — ${p.name}`,
    description: p.description,
    provider: {
      "@type": "Organization",
      name: "TADAL STUDIO",
      url: BASE_URL,
    },
    serviceType: p.name,
    offers: {
      "@type": "Offer",
      priceSpecification,
      url: `${BASE_URL}/packages#${pkg}`,
      priceCurrency: "MYR",
    },
  };
}

export default BASE_URL;
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
    name: "TADAL STUDIO - End-to-End Design & Development",
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
      name: "TADAL STUDIO",
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
    name: "TADAL STUDIO",
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
