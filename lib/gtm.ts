// Google Tag Manager Data Layer helper functions
import type {
  ServiceItem,
  AddonItem,
  QuoteData,
  DataLayerEvent,
} from "../types/gtag";

// Push events to GTM dataLayer
const pushToDataLayer = (eventData: DataLayerEvent) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(eventData);
  }
};

// Page view tracking for GTM
export const gtmPageView = (url: string) => {
  pushToDataLayer({
    event: "page_view",
    page_path: url,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Generic event tracking for GTM
export const gtmEvent = (
  eventName: string,
  parameters: Record<string, string | number | boolean> = {}
) => {
  pushToDataLayer({
    event: eventName,
    ...parameters,
  });
};

// Conversion funnel tracking for GTM
export const gtmTrackFunnelStep = ({
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
  pushToDataLayer({
    event: "funnel_step",
    step_number,
    step_name,
    service_selected,
    estimated_value,
    addons_count,
    event_category: "conversion_funnel",
  });
};

// Form submission tracking for GTM
export const gtmTrackFormSubmission = ({
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
  pushToDataLayer({
    event: "form_submit",
    form_name,
    step,
    service_type,
    estimated_value,
    event_category: "engagement",
  });
};

// Service selection tracking for GTM
export const gtmTrackServiceSelection = (service: ServiceItem) => {
  pushToDataLayer({
    event: "select_item",
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
    value: service.basePrice,
    currency: "MYR",
  });
};

// Addon selection tracking for GTM
export const gtmTrackAddonSelection = (
  addon: AddonItem,
  action: "add" | "remove"
) => {
  const eventName = action === "add" ? "add_to_cart" : "remove_from_cart";
  pushToDataLayer({
    event: eventName,
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
  });
};

// Quote submission tracking for GTM
export const gtmTrackQuoteSubmission = (quoteData: QuoteData) => {
  const currency =
    quoteData.region === "MY"
      ? "MYR"
      : quoteData.region === "SG"
      ? "SGD"
      : "USD";

  pushToDataLayer({
    event: "purchase",
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
  });

  // Also track as conversion
  pushToDataLayer({
    event: "conversion",
    conversion_id: "quote_submission",
    conversion_value: quoteData.estimatedPrice,
    currency,
  });
};
