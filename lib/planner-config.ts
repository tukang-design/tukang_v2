export type TierId = "landing" | "business" | "advanced";
export type PlatformId = "ecommerce" | "membership" | "lms" | "marketplace";

export type TierConfig = {
  id: TierId;
  name: string;
  basePrice: number; // representative base price in MYR (used for quick totals)
  basePriceRange?: [number, number]; // optional display range
  timeline?: string;
  baseFeatures: string[];
};

export const TIERS: Record<TierId, TierConfig> = {
  landing: {
    id: "landing",
    name: "Landing Page",
    basePrice: 1500,
    basePriceRange: [1500, 3000],
    timeline: "Live in 7 days",
    baseFeatures: [
      "High‑engagement, responsive design",
      "Primary lead form integration",
      "Basic SEO setup",
      "GA4 + Search Console hookup",
    ],
  },
  business: {
    id: "business",
    name: "Professional Business Website",
    basePrice: 3000,
    basePriceRange: [3000, 5000],
    timeline: undefined,
    baseFeatures: [
      "Up to 5 pages (Home, About, Services, Contact, Blog)",
      "Mobile‑responsive, accessible UI",
      "Contact form with basic validation",
      "Basic SEO setup",
    ],
  },
  advanced: {
    id: "advanced",
    name: "Custom Web System",
    basePrice: 5000,
    // overall tier base is representative; platform-specific starting ranges are defined below
    basePriceRange: [5000, 10000],
    timeline: undefined,
    baseFeatures: [
      "Custom data model & architecture",
      "Scalable auth / accounts",
      "Integration‑ready foundations",
      "Roadmap planned in discovery",
    ],
  },
};

export type AddOn = {
  id: string;
  label: string;
  // optional single representative price (used as fallback for calculations)
  price?: number; // in MYR
  // recommended display range for estimates
  priceRange?: [number, number];
  tiers: TierId[]; // which tiers this add‑on applies to
  platforms?: PlatformId[]; // optional: limit add-on visibility to specific platform archetypes
  description?: string;
};

export const ADD_ONS: AddOn[] = [
  // Landing / Tier 1
  {
    id: "branding-basic",
    label: "Basic Logo Design & Style Guide",
    priceRange: [800, 1500],
    tiers: ["landing"],
    description:
      "We create a professional logo and define your color palette and fonts to ensure consistency.",
  },
  {
    id: "copywriting-landing",
    label: "Persuasive Sales Copywriting",
    priceRange: [500, 1200],
    tiers: ["landing"],
    description:
      "We write the content for your landing page, structured to convert visitors into customers.",
  },
  {
    id: "analytics-landing",
    label: "Advanced Tracking Setup",
    priceRange: [400, 800],
    tiers: ["landing"],
    description:
      "Integrate heatmaps and detailed conversion funnels for ad campaign optimisation.",
  },

  // Business / Tier 2
  {
    id: "branding-full",
    label: "Full Brand Identity Package",
    priceRange: [1500, 3000],
    tiers: ["business"],
    description:
      "Comprehensive logo design, color/font systems, and basic brand guidelines for consistent marketing.",
  },
  {
    id: "seo-content",
    label: "Foundational SEO Content",
    priceRange: [1500, 2500],
    tiers: ["business"],
    description:
      "Search-optimised copy for up to 5 core service pages to help you rank on Google.",
  },
  {
    id: "appointment-booking",
    label: "Appointment Booking System",
    priceRange: [800, 1200],
    tiers: ["business"],
    description:
      "Integrate a calendar system allowing clients to book appointments or consultations directly on your website.",
  },
  {
    id: "page-count",
    label: "Page Count Expansion",
    priceRange: [1000, 1800],
    tiers: ["business"],
    description:
      "Increase the site structure beyond the base pages (for example 10–15 pages).",
  },

  // Advanced / Tier 3
  {
    id: "branding-premium",
    label: "Premium E-commerce Branding",
    priceRange: [2000, 4500],
    tiers: ["advanced"],
    description:
      "Full brand identity package plus design mockups for packaging and social media campaigns.",
  },
  {
    id: "inventory-small",
    label: "Basic Inventory Migration (up to 100 products)",
    priceRange: [1000, 2000],
    tiers: ["advanced"],
    platforms: ["ecommerce", "marketplace"],
    description: "Data entry and setup for up to 100 products and variations.",
  },
  {
    id: "inventory-large",
    label: "Large Inventory Migration (100-500 products)",
    priceRange: [2000, 5000],
    tiers: ["advanced"],
    platforms: ["ecommerce", "marketplace"],
    description: "Data entry and setup for 100–500 products and variations.",
  },
  {
    id: "accounts-membership",
    label: "Customer Account & Membership System",
    priceRange: [3000, 7000],
    tiers: ["advanced"],
    platforms: ["ecommerce", "membership", "marketplace"],
    description:
      "Secure customer logins, profile management, and functionality to restrict content to paying members.",
  },
  {
    id: "advanced-automation",
    label: "Advanced Automation Integration",
    priceRange: [2500, 6000],
    tiers: ["advanced"],
    description:
      "Connect your website to external systems (logistics, accounting, CRMs) to automate workflows.",
  },
  {
    id: "course-module-builder",
    label: "Course Module Builder",
    priceRange: [4000, 8000],
    tiers: ["advanced"],
    platforms: ["lms"],
    description:
      "Develop functionality for uploading video content, creating quizzes, and managing student enrollment progress.",
  },
];

export const PLATFORM_TYPES: Record<
  PlatformId,
  {
    id: PlatformId;
    label: string;
    description: string;
    priceRange: [number, number];
  }
> = {
  ecommerce: {
    id: "ecommerce",
    label: "E-commerce Store",
    description:
      "Sell products directly to customers with inventory management and payment processing.",
    priceRange: [5000, 7500],
  },
  membership: {
    id: "membership",
    label: "Membership / Subscription Site",
    description:
      "Offer protected content or services to paying subscribers on a recurring basis.",
    priceRange: [6000, 9000],
  },
  lms: {
    id: "lms",
    label: "E-learning Platform (LMS)",
    description:
      "Host and deliver online courses with student progress tracking and content modules.",
    priceRange: [7500, 10000],
  },
  marketplace: {
    id: "marketplace",
    label: "Marketplace Platform",
    description:
      "Connect two different user types (e.g., buyers and sellers) to transact with each other. Requires complex commission and payout logic.",
    priceRange: [10000, 20000],
  },
};

export function formatMYR(amount: number) {
  return `RM ${amount.toLocaleString("en-MY")}`;
}

export function formatMYRRange(min: number, max: number) {
  return `RM ${min.toLocaleString("en-MY")} - RM ${max.toLocaleString(
    "en-MY"
  )}`;
}
