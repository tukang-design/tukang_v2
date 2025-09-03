"use client";

import { useState, useEffect } from "react";
import { getRegionDetails } from "../en/components/region-selector.js";

// Enhanced region detection with multiple fallback methods
async function detectRegion() {
  // Method 1: Try IP-based geolocation using a free service
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const countryCode = data.country_code;

      // Map country codes to our regions
      if (countryCode === "MY") return "MY";
      if (countryCode === "SG") return "SG";

      // For other countries, return international
      return "INT";
    }
  } catch (error) {
    console.log("IP geolocation failed, falling back to browser detection");
  }

  // Method 2: Browser language detection (fallback)
  if (typeof window !== "undefined") {
    const lang = navigator.language || (navigator as any).userLanguage;
    if (lang.startsWith("ms") || lang === "ms-MY") return "MY";
    if (lang.startsWith("en-SG") || lang === "zh-SG") return "SG";
  }

  // Method 3: Timezone detection (additional fallback)
  if (typeof window !== "undefined") {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone === "Asia/Kuala_Lumpur") return "MY";
      if (timezone === "Asia/Singapore") return "SG";
    } catch (error) {
      console.log("Timezone detection failed");
    }
  }

  // Default fallback
  return "INT";
}

export default function RegionIndicator() {
  const [region, setRegion] = useState("INT");
  const [isDetecting, setIsDetecting] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mounted = true;

    const performDetection = async () => {
      try {
        const detectedRegion = await detectRegion();
        if (mounted) {
          setRegion(detectedRegion);
          setIsDetecting(false);
          // Show the indicator for 5 seconds after detection
          setIsVisible(true);
          setTimeout(() => {
            if (mounted) setIsVisible(false);
          }, 5000);
        }
      } catch (error) {
        console.log("Region detection failed, using international");
        if (mounted) {
          setRegion("INT");
          setIsDetecting(false);
          setIsVisible(true);
          setTimeout(() => {
            if (mounted) setIsVisible(false);
          }, 5000);
        }
      }
    };

    performDetection();

    return () => {
      mounted = false;
    };
  }, []);

  const regionDetails = getRegionDetails(region);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
      <div className="bg-olive-dark/90 backdrop-blur-sm border border-accent/20 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          {isDetecting ? (
            <>
              <div className="w-3 h-3 border border-accent border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-300">Detecting region...</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-gray-300">
                Prices in{" "}
                <span className="text-accent font-semibold">
                  {regionDetails.currency}
                </span>
              </span>
              <span className="text-gray-400">({regionDetails.label})</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
