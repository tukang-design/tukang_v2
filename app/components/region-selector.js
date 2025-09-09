"use client";

import { useState, useEffect } from "react";

const regions = [
  {
    code: "MY",
    label: "Malaysia",
    currency: "MYR",
    symbol: "RM",
    countries: ["MY"],
  },
  {
    code: "SG",
    label: "Singapore",
    currency: "SGD",
    symbol: "SGD",
    countries: ["SG"],
  },
  {
    code: "INT",
    label: "Europe / International",
    currency: "EUR",
    symbol: "€",
    countries: [],
  },
];

// Enhanced region detection with multiple fallback methods
async function detectRegion() {
  // Method 1: Try IP-based geolocation using a free service
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(timeoutId);

    if (response.ok && (response.headers.get("content-type") || "").includes("application/json")) {
      const data = await response.json();
      const countryCode = data.country_code;

      // Map country codes to our regions
      if (countryCode === "MY") return "MY";
      if (countryCode === "SG") return "SG";

      // For other countries, return international
      return "INT";
    }
  } catch (error) {
    console.log("IP geolocation failed or non-JSON; falling back to browser detection");
  }

  // Method 2: Browser language detection (fallback)
  if (typeof window !== "undefined") {
    const lang = navigator.language || navigator.userLanguage;
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

export default function RegionSelector({ onChange, showSelector = false }) {
  const [region, setRegion] = useState("INT"); // Default to international while detecting
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    let mounted = true;

    const performDetection = async () => {
      try {
        const detectedRegion = await detectRegion();
        if (mounted) {
          setRegion(detectedRegion);
          setIsDetecting(false);
          if (onChange) onChange(detectedRegion);
        }
      } catch (error) {
        console.log("Region detection failed, using international");
        if (mounted) {
          setRegion("INT");
          setIsDetecting(false);
          if (onChange) onChange("INT");
        }
      }
    };

    performDetection();

    return () => {
      mounted = false;
    };
  }, [onChange]);

  // If showSelector is false, just return the detected region info (invisible)
  if (!showSelector) {
    return null;
  }

  // Only show the selector if explicitly requested
  return (
    <div className="mb-6 flex items-center gap-2">
      <label htmlFor="region" className="font-semibold text-gray-300">
        {isDetecting ? "Detecting your region..." : "Your Region:"}
      </label>
      {isDetecting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-400">Auto-detecting...</span>
        </div>
      ) : (
        <select
          id="region"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          className="border border-accent/20 rounded-lg px-3 py-2 bg-olive-dark/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {regions.map((r) => (
            <option
              key={r.code}
              value={r.code}
              className="bg-olive-dark text-gray-300"
            >
              {r.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export function getRegionDetails(code) {
  return regions.find((r) => r.code === code) || regions[2];
}
