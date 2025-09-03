import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  pageview,
  trackFunnelStep,
  trackFormSubmission,
  event,
  trackServiceSelection,
  trackAddonSelection,
  trackQuoteSubmission,
} from "../lib/gtag";
import {
  gtmPageView,
  gtmTrackFunnelStep,
  gtmTrackFormSubmission,
  gtmEvent,
  gtmTrackServiceSelection,
  gtmTrackAddonSelection,
  gtmTrackQuoteSubmission,
} from "../lib/gtm";

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Track in both GA4 and GTM
      pageview(url);
      gtmPageView(url);
    };

    // Track initial page load
    if (typeof window !== "undefined") {
      handleRouteChange(window.location.pathname);
    }
  }, [router]);

  return {
    trackStep: (
      stepName: string,
      stepNumber: number,
      additionalData?: Record<string, string | number>
    ) => {
      // GA4 tracking
      trackFunnelStep({
        step_name: stepName,
        step_number: stepNumber,
        service_selected: additionalData?.selected_service as string,
        estimated_value: additionalData?.estimated_value as number,
        addons_count: additionalData?.addons_count as number,
      });

      // GTM tracking
      gtmTrackFunnelStep({
        step_name: stepName,
        step_number: stepNumber,
        service_selected: additionalData?.selected_service as string,
        estimated_value: additionalData?.estimated_value as number,
        addons_count: additionalData?.addons_count as number,
      });
    },
    trackForm: (
      formName: string,
      step: string,
      serviceType?: string,
      estimatedValue?: number
    ) => {
      // GA4 tracking
      trackFormSubmission({
        form_name: formName,
        step,
        service_type: serviceType,
        estimated_value: estimatedValue,
      });

      // GTM tracking
      gtmTrackFormSubmission({
        form_name: formName,
        step,
        service_type: serviceType,
        estimated_value: estimatedValue,
      });
    },
    trackEvent: (
      action: string,
      parameters: Record<string, string | number | boolean> = {}
    ) => {
      // GA4 tracking
      event({ action, category: "user_interaction" });

      // GTM tracking
      gtmEvent(action, parameters);
    },
    trackPageView: (url: string) => {
      pageview(url);
      gtmPageView(url);
    },
    trackService: (service: any) => {
      // GA4 tracking
      trackServiceSelection(service);

      // GTM tracking
      gtmTrackServiceSelection(service);
    },
    trackAddon: (addon: any, action: "add" | "remove") => {
      // GA4 tracking
      trackAddonSelection(addon, action);

      // GTM tracking
      gtmTrackAddonSelection(addon, action);
    },
    trackQuote: (quoteData: any) => {
      // GA4 tracking
      trackQuoteSubmission(quoteData);

      // GTM tracking
      gtmTrackQuoteSubmission(quoteData);
    },
  };
};
