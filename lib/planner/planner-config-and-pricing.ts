// planner-config-and-pricing.ts
// Drop this into /lib/planner/ (or anywhere), then import where needed.
// It contains:
// 1) Types for answers and outputs
// 2) Copy for step titles, helpers, and field labels
// 3) Validation rules
// 4) Recommendation logic
// 5) Pricing and range calculator
// 6) Installment calculator
// No external deps. No tech mentions in user facing copy.

// --------------------------------------
// 1) TYPES
// --------------------------------------
export type PrimaryGoal =
  | "inquiries"
  | "sell_online"
  | "bookings"
  | "trust"
  | "members"
  | "dashboard";

export type PackageType = "landing" | "business" | "custom";

export interface BusinessBasics {
  companyName: string;
  industry:
    | "Services"
    | "Retail"
    | "Education"
    | "Healthcare"
    | "Real Estate"
    | "Manufacturing"
    | "Other";
  audience: Array<"B2C" | "B2B" | "Both">;
  location?: string;
  websiteStatus: "none" | "have" | "replace";
}

export interface PagesSelection {
  home: boolean;
  about: boolean;
  services: boolean;
  work: boolean;
  contact: boolean;
  otherPages: number; // 0 if none
}

export interface FeaturesSelection {
  contactForm: boolean;
  whatsapp: boolean;
  blog: boolean;
  cms: boolean;
  store: boolean;
  booking: boolean;
  membership: boolean;
  dashboard: boolean;
  multilingualCount: number; // 0 if none
}

export interface ContentAssets {
  logoColors: "ready" | "tweak" | "work";
  copy: "ready" | "polish" | "from_scratch";
  images: "ready" | "curate" | "stock";
  legal: { privacy: boolean; terms: boolean; cookies: boolean };
  migrateCount: number; // number of items to migrate
}

export interface Integrations {
  emailMarketing?: string; // name or empty
  crm?: string;
  payments?: boolean;
  localPayments?: boolean;
  calendaring?: string;
  analytics?: boolean; // GA4 default
  other?: string;
}

export interface TimingBudget {
  idealLaunchISO: string; // yyyy-mm-dd
  flexibility: "fixed" | "flex_2w" | "flex_1m";
  budgetBand: "1_5_to_3k" | "3k_to_6k" | "6k_to_12k" | "12k_plus";
  paymentPref: "standard" | "instal_6" | "instal_12";
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone?: string;
  notes?: string;
  consent: boolean;
}

export interface PlannerAnswers {
  basics: BusinessBasics;
  goal: PrimaryGoal;
  pages: PagesSelection;
  features: FeaturesSelection;
  content: ContentAssets;
  integrations: Integrations;
  timing: TimingBudget;
  contact: ContactInfo;
}

export interface ModifierItem {
  label: string;
  amount: number; // positive surcharge or negative credit
}

export interface EstimateBreakdown {
  pkg: PackageType;
  basePrice: number;
  modifiers: ModifierItem[];
  subtotal: number; // base + modifiers sum before surge and credits
  surge: number; // urgency surcharges
  credits: number; // negative numbers here reduce price
  total: number; // final number after surge and credits
  range: { min: number; max: number };
  timelineDays: { min: number; max: number };
  rationale: string; // short why
}

// --------------------------------------
// 2) COPY FOR STEPS
// --------------------------------------
export const PLANNER_COPY = {
  titles: {
    1: "Tell us about your business",
    2: "What do you want the website to achieve",
    3: "What do you need now",
    4: "What do you already have",
    5: "Any tools to connect",
    6: "Timing and comfort",
    7: "Where should we send your estimate",
  },
  helpers: {
    1: "This aligns the content and credibility cues.",
    2: "Pick the primary outcome for this phase.",
    3: "Choose only what is needed for the first release.",
    4: "Readiness can lower cost and speed delivery.",
    5: "List only what you use now.",
    6: "Installments are available for larger scopes.",
    7: "We will send a magic link to view your estimate again.",
  },
  fields: {
    basics: {
      companyName: { label: "Company name", placeholder: "Acme Sdn Bhd" },
      industry: { label: "Industry" },
      audience: { label: "Audience" },
      location: { label: "Location (optional)", placeholder: "Shah Alam, MY" },
      websiteStatus: { label: "Website status" },
    },
    goal: {
      options: {
        inquiries: "Generate inquiries",
        sell_online: "Sell online",
        bookings: "Take bookings",
        trust: "Build trust and credibility",
        members: "Member access or gated content",
        dashboard: "Internal dashboard or tools",
      },
    },
    pages: {
      home: { label: "Home" },
      about: { label: "About" },
      services: { label: "Services" },
      work: { label: "Work or Case studies" },
      contact: { label: "Contact" },
      otherPages: { label: "Other pages", helper: "Enter a number" },
    },
    features: {
      contactForm: { label: "Contact form" },
      whatsapp: { label: "WhatsApp click" },
      blog: { label: "Blog or articles" },
      cms: { label: "Basic CMS to edit pages" },
      store: { label: "Online store" },
      booking: { label: "Booking system" },
      membership: { label: "Membership or user accounts" },
      dashboard: { label: "Dashboard or reporting" },
      multilingualCount: { label: "Extra languages", helper: "Enter a number" },
    },
    content: {
      logoColors: { label: "Logo and colors" },
      copy: { label: "Copywriting" },
      images: { label: "Images and media" },
      legal: { label: "Legal pages" },
      migrateCount: {
        label: "Existing content to migrate",
        helper: "Number of pages or posts",
      },
    },
    integrations: {
      emailMarketing: { label: "Email marketing" },
      crm: { label: "CRM" },
      payments: { label: "Payments" },
      localPayments: { label: "Local payments" },
      calendaring: { label: "Calendaring" },
      analytics: { label: "Analytics" },
      other: { label: "Other" },
    },
    timing: {
      idealLaunchISO: { label: "Ideal launch date" },
      flexibility: { label: "Flexibility" },
      budgetBand: { label: "Budget comfort" },
      paymentPref: { label: "Payment preference" },
    },
    contact: {
      fullName: { label: "Full name" },
      email: { label: "Email" },
      phone: { label: "WhatsApp or phone (optional)" },
      notes: { label: "Notes (optional)" },
      consent: { label: "I agree to be contacted about this estimate" },
    },
  },
} as const;

// --------------------------------------
// 3) VALIDATION HELPERS
// --------------------------------------
export function validateBasics(b: BusinessBasics): string[] {
  const errs: string[] = [];
  if (!b.companyName?.trim()) errs.push("Company name is required");
  if (!b.industry) errs.push("Industry is required");
  if (!b.websiteStatus) errs.push("Website status is required");
  return errs;
}

export function validateGoal(g: PrimaryGoal | undefined): string[] {
  return g ? [] : ["Please pick a primary goal"];
}

export function validatePages(p: PagesSelection): string[] {
  const count =
    [p.home, p.about, p.services, p.work, p.contact].filter(Boolean).length +
    (p.otherPages || 0);
  return count > 0 ? [] : ["Select at least one page"];
}

export function validateTiming(t: TimingBudget): string[] {
  const errs: string[] = [];
  if (!t.idealLaunchISO) errs.push("Ideal launch date is required");
  if (!t.flexibility) errs.push("Flexibility is required");
  if (!t.budgetBand) errs.push("Budget comfort is required");
  if (!t.paymentPref) errs.push("Payment preference is required");
  return errs;
}

export function validateContact(c: ContactInfo): string[] {
  const errs: string[] = [];
  if (!c.fullName?.trim()) errs.push("Full name is required");
  if (!c.email?.trim()) errs.push("Email is required");
  if (!c.consent) errs.push("Consent is required");
  return errs;
}

// --------------------------------------
// 4) RECOMMENDATION LOGIC
// --------------------------------------
export function recommendPackage(ans: PlannerAnswers): PackageType {
  const f = ans.features;
  const pageCount =
    [
      ans.pages.home,
      ans.pages.about,
      ans.pages.services,
      ans.pages.work,
      ans.pages.contact,
    ].filter(Boolean).length + (ans.pages.otherPages || 0);

  // If advanced features are on, go custom
  if (f.store || f.booking || f.membership || f.dashboard) return "custom";

  // Landing rules
  if (ans.goal === "inquiries" && pageCount <= 1 && !f.blog && !f.cms)
    return "landing";

  // Otherwise business
  if (pageCount >= 1) return "business";

  return "landing"; // fallback
}

// --------------------------------------
// 5) PRICING ENGINE
// --------------------------------------
const BASES: Record<PackageType, number> = {
  landing: 1500,
  business: 3000,
  custom: 5000,
};

interface PricingContext {
  base: number;
  modifiers: ModifierItem[];
  surge: number;
  credits: number;
  timeline: { min: number; max: number };
  rationale: string;
}

function add(mods: ModifierItem[], label: string, amount: number) {
  if (!amount) return;
  mods.push({ label, amount });
}

export function priceEstimate(ans: PlannerAnswers): EstimateBreakdown {
  const pkg = recommendPackage(ans);
  const m: ModifierItem[] = [];
  let surge = 0;
  let credit = 0;
  let timeline: { min: number; max: number } = { min: 7, max: 7 };
  let rationale = "";

  const pageCount =
    [
      ans.pages.home,
      ans.pages.about,
      ans.pages.services,
      ans.pages.work,
      ans.pages.contact,
    ].filter(Boolean).length + (ans.pages.otherPages || 0);

  if (pkg === "landing") {
    rationale = "Single page focused on inquiries";
    timeline = { min: 7, max: 7 };
    // Content readiness
    if (ans.content.copy === "polish") add(m, "Copy polish", 300);
    if (ans.content.copy === "from_scratch") add(m, "Copy from scratch", 600);
    if (ans.content.images === "curate") add(m, "Image curation", 150);
    if (ans.content.images === "stock") add(m, "Stock sourcing", 300);
    // Rush option if needed
    const daysToIdeal = daysFromToday(ans.timing.idealLaunchISO);
    if (daysToIdeal <= 5) surge += Math.round((BASES.landing + sum(m)) * 0.15);
  }

  if (pkg === "business") {
    rationale = "Multi page site with CMS and campaigns ready";
    timeline = { min: 10, max: 14 };
    // Pages beyond 5
    const extraPages = Math.max(0, pageCount - 5);
    if (extraPages)
      add(m, `Extra pages x${extraPages}`, Math.min(extraPages * 200, 1000));
    // Blog and CMS
    if (ans.features.blog || ans.features.cms)
      add(m, "Blog and CMS setup", 500);
    // Content readiness
    if (ans.content.copy === "polish") add(m, "Copy polish", 300);
    if (ans.content.copy === "from_scratch") add(m, "Copy from scratch", 600);
    if (ans.content.images === "curate") add(m, "Image curation", 150);
    if (ans.content.images === "stock") add(m, "Stock sourcing", 300);
    // Migration
    const mig = ans.content.migrateCount || 0;
    if (mig > 0) {
      if (mig <= 10) add(m, "Light migration (up to 10)", 400);
      else if (mig <= 50) add(m, "Standard migration (11 to 50)", 1200);
      else
        add(
          m,
          `Heavy migration (+${Math.ceil((mig - 50) / 50) * 50})`,
          1200 + Math.ceil((mig - 50) / 50) * 800
        );
    }
    // Urgency
    const daysToIdeal = daysFromToday(ans.timing.idealLaunchISO);
    if (daysToIdeal < 10) surge += Math.round((BASES.business + sum(m)) * 0.2);
  }

  if (pkg === "custom") {
    rationale = "Custom features for bookings, members, dashboards or commerce";
    // Baseline timeline. Adjust loosely by selected features
    let baseMin = 14;
    let baseMax = 28;
    const f = ans.features;
    // very rough complexity bump by flags
    const complexity = [f.store, f.booking, f.membership, f.dashboard].filter(
      Boolean
    ).length;
    baseMin += complexity * 3;
    baseMax += complexity * 7;
    timeline = { min: baseMin, max: baseMax };

    // Feature modules
    if (ans.features.store) add(m, "Online store basic", 2500);
    if (ans.features.booking) add(m, "Booking system basic", 2500);
    if (ans.features.membership) add(m, "Membership and access", 3000);
    if (ans.features.dashboard) add(m, "Dashboard and admin", 3000);

    // Payments setup if relevant
    if (ans.integrations?.payments || ans.integrations?.localPayments)
      add(m, "Payments setup", 1200);

    // Multilingual
    if (ans.features.multilingualCount && ans.features.multilingualCount > 0) {
      add(
        m,
        `Multilingual add on x${ans.features.multilingualCount}`,
        ans.features.multilingualCount * 800
      );
    }

    // Content readiness still matters a bit
    if (ans.content.copy === "polish") add(m, "Copy polish", 300);
    if (ans.content.copy === "from_scratch") add(m, "Copy from scratch", 600);

    // Urgency
    const daysToIdeal = daysFromToday(ans.timing.idealLaunchISO);
    if (daysToIdeal < 10) surge += Math.round((BASES.custom + sum(m)) * 0.2);
  }

  // Readiness credit
  const readyAll =
    ans.content.logoColors === "ready" &&
    ans.content.copy !== "from_scratch" &&
    (ans.content.images === "ready" || ans.content.images === "curate");
  if (readyAll) credit -= 200; // negative means discount

  const base = BASES[pkg];
  const subtotal = base + sum(m);
  const total = subtotal + surge + credit;

  // Range at ±8 percent rounded to nearest 10
  const pad = Math.max(0.08 * total, 50);
  const range = { min: round10(total - pad), max: round10(total + pad) };

  return {
    pkg,
    basePrice: base,
    modifiers: m,
    subtotal,
    surge,
    credits: credit,
    total,
    range,
    timelineDays: timeline,
    rationale,
  };
}

function sum(items: ModifierItem[]) {
  return items.reduce((acc, i) => acc + i.amount, 0);
}

function daysFromToday(iso: string): number {
  const today = new Date();
  const target = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  const ms = target.getTime() - today.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function round10(n: number): number {
  return Math.round(n / 10) * 10;
}

// --------------------------------------
// 6) INSTALLMENT CALCULATOR
// --------------------------------------
export function calcInstallment(total: number, months: 6 | 12) {
  const baseMonthly = total / months;
  const feeRate = months === 6 ? 0.06 : 0.12;
  const monthlyFee = baseMonthly * feeRate;
  const monthly = baseMonthly + monthlyFee;
  return {
    months,
    baseMonthly: round2(baseMonthly),
    monthlyFee: round2(monthlyFee),
    monthly: round2(monthly),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// --------------------------------------
// 7) EXAMPLE USAGE
// --------------------------------------
// const answers: PlannerAnswers = { ...collect from UI... };
// const est = priceEstimate(answers);
// const instal6 = calcInstallment(est.total, 6);
// const instal12 = calcInstallment(est.total, 12);
// Render the estimate screen using est.pkg, est.range, est.timelineDays, est.modifiers, etc.
