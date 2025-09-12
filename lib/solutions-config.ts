export type Tier = {
  id: string;
  name: string;
  price: string;
  goal: string;
  features: string[];
};

export const tiers: Tier[] = [
  {
    id: "landing",
    name: "Landing Page for Lead Generation",
    price: "From RM1500",
    goal: "Capture leads for a specific product, service, or campaign — focused single-page with clear CTA.",
    features: [
      "High‑engagement, interactive design",
      "Custom WhatsApp messaging for high‑intent visitors",
      "SEO configuration",
      "GA4 tracking for detailed analytics",
      "Optimized mobile layout",
      "Fast and efficient to launch",
    ],
  },
  {
    id: "business",
    name: "Professional Business Website",
    price: "From RM3000",
    goal: "Establish a comprehensive online presence with multiple pages to communicate services and credibility.",
    features: [
      "Up to 5 custom pages (Home, About, Services, Contact, Blog)",
      "Advanced contact forms with conditional logic",
      "Suitable for a multi‑page portfolio",
      // inherits landing features implicitly for copy, but we keep the list succinct
    ],
  },
  {
    id: "advanced",
    name: "Complex Advanced System",
    price: "From RM5000",
    goal: "Custom, integrated system with advanced functionality: database, user accounts, and third‑party integrations.",
    features: [
      "E‑commerce (cart, products, secure gateway)",
      "Content Management System (CMS)",
      "Booking system for scheduling",
      "User authentication & membership areas",
    ],
  },
];

export type MatrixRow = {
  need: string;
  id: string; // normalized key
  landing: boolean;
  business: boolean;
  advanced: boolean;
  note: string;
};

export const matrix: MatrixRow[] = [
  {
    id: "generate-leads",
    need: "Generate Leads or Sign‑Ups",
    landing: true,
    business: true,
    advanced: true,
    note: "Landing Page excels for a targeted campaign; Business Website for ongoing multi‑faceted lead gen.",
  },
  {
    id: "establish-presence",
    need: "Establish Professional Presence",
    landing: false,
    business: true,
    advanced: true,
    note: "Business Website is ideal with dedicated pages to detail brand and services.",
  },
  {
    id: "showcase-portfolio",
    need: "Showcase a Portfolio",
    landing: true,
    business: true,
    advanced: true,
    note: "Landing Page works for a simple showcase; Business Website fits multi‑page case studies.",
  },
  {
    id: "sell-products",
    need: "Sell Products Online",
    landing: false,
    business: false,
    advanced: true,
    note: "Requires an e‑commerce platform with a payment gateway.",
  },
  {
    id: "company-info",
    need: "Provide Company Information",
    landing: false,
    business: true,
    advanced: true,
    note: "Core function of the Business Website for credibility and transparency.",
  },
  {
    id: "create-blog",
    need: "Create a Blog",
    landing: false,
    business: false,
    advanced: true,
    note: "Needs a CMS for easy content management.",
  },
  {
    id: "accept-bookings",
    need: "Allow Clients to Book Appointments",
    landing: false,
    business: false,
    advanced: true,
    note: "Custom‑integrated booking system.",
  },
  {
    id: "membership",
    need: "Build a User Login/Membership Area",
    landing: false,
    business: false,
    advanced: true,
    note: "Requires custom user management and personalization.",
  },
  {
    id: "fast-launch",
    need: "Simple and Fast Launch",
    landing: true,
    business: false,
    advanced: false,
    note: "Landing Page is the quickest professional path for a focused goal.",
  },
];

export const predefinedGoals = matrix.map((m) => ({ id: m.id, label: m.need }));

// Consolidate features from tiers into a selectable list
const featureSet = new Set<string>();
for (const t of tiers) for (const f of t.features) featureSet.add(f);
export const predefinedFeatures = Array.from(featureSet).map((f) => ({
  id: f.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  label: f,
}));
