// Google Analytics 4 Configuration
import type {
  GtagConfig,
  GtagEventParams,
  ServiceItem,
  AddonItem,
  QuoteData,
  EcommerceItem,
} from "../types/gtag";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Log the page view with their URL
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    } as GtagConfig);
  }
};

// Log specific events happening
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    } as GtagEventParams);
  }
};

// Enhanced ecommerce tracking for conversion funnel
export const trackConversion = ({
  event_name,
  currency = "MYR",
  value,
  items = [],
  step_number,
  step_name,
}: {
  event_name: string;
  currency?: string;
  value?: number;
  items?: EcommerceItem[];
  step_number?: number;
  step_name?: string;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event_name, {
      currency,
      value,
      items,
      step_number,
      step_name: step_name,
      event_category: "ecommerce",
    } as GtagEventParams);
  }
};

// Track form submissions
export const trackFormSubmission = ({
  form_name,
  step,
  service_type,
  estimated_value,
}: {
  form_name: string;
  step: string;
  service_type?: string;
  estimated_value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_submit", {
      event_category: "engagement",
      event_label: form_name,
      custom_parameter_1: step,
      custom_parameter_2: service_type,
      value: estimated_value,
    } as GtagEventParams);
  }
};

// Track user engagement at each step
export const trackFunnelStep = ({
  step_number,
  step_name,
  service_selected,
  estimated_value,
  addons_count,
}: {
  step_number: number;
  step_name: string;
  service_selected?: string;
  estimated_value?: number;
  addons_count?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "funnel_step", {
      event_category: "conversion_funnel",
      event_label: step_name,
      step_number,
      service_type: service_selected,
      value: estimated_value,
      addons_count,
    } as GtagEventParams);
  }
};

// Track service selection
export const trackServiceSelection = (service: ServiceItem) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "select_item", {
      item_list_id: "website_services",
      item_list_name: "Website Services",
      items: [
        {
          item_id: service.id,
          item_name: service.name,
          item_category: "website_service",
          price: service.basePrice,
          quantity: 1,
        },
      ],
    } as GtagEventParams);
  }
};

// Track addon selection
export const trackAddonSelection = (
  addon: AddonItem,
  action: "add" | "remove"
) => {
  if (typeof window !== "undefined" && window.gtag) {
    const eventName = action === "add" ? "add_to_cart" : "remove_from_cart";
    window.gtag("event", eventName, {
      currency: "MYR",
      value: addon.price,
      items: [
        {
          item_id: addon.id,
          item_name: addon.name,
          item_category: "website_addon",
          price: addon.price,
          quantity: 1,
        },
      ],
    } as GtagEventParams);
  }
};

// Track successful quote submission
export const trackQuoteSubmission = (quoteData: QuoteData) => {
  if (typeof window !== "undefined" && window.gtag) {
    const currency =
      quoteData.region === "MY"
        ? "MYR"
        : quoteData.region === "SG"
        ? "SGD"
        : "USD";

    window.gtag("event", "purchase", {
      transaction_id: quoteData.transactionId || Date.now().toString(),
      currency,
      value: quoteData.estimatedPrice,
      items: [
        {
          item_id: quoteData.selectedService?.id,
          item_name: quoteData.selectedService?.name,
          item_category: "website_service",
          price: quoteData.selectedService?.basePrice || 0,
          quantity: 1,
        },
        ...quoteData.services.map((service) => ({
          item_id: service.id,
          item_name: service.name,
          item_category: "website_addon",
          price: service.price || 0,
          quantity: 1,
        })),
      ],
    } as GtagEventParams);
  }
};
