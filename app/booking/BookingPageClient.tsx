"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useScrollToTop } from "../hooks/useScrollToTop";

// Types for the goal-based structure
type ProjectGoal = {
  id: string;
  title: string;
  description: string;
  icon: string;
  basePrice: {
    MY: number;
    USD: number;
  };
  features: RecommendedFeature[];
  popular?: boolean;
};

type RecommendedFeature = {
  id: string;
  name: string;
  description: string;
  included: boolean;
};

type AdditionalFeature = {
  id: string;
  name: string;
  description: string;
  price: {
    MY: number;
    USD: number;
  };
  complexity: "Basic" | "Intermediate" | "Advanced";
  estimatedHours: number;
};

type ProjectBrief = {
  businessName: string;
  businessDescription: string;
};

type ContactInfo = {
  name: string;
  email: string;
  phone: string;
};

type BookingStep = "goals" | "features" | "contact" | "discovery";

type UserRegion = "MY" | "USD";

// Project goals data - ordered by scale (small to bigger)
const projectGoals: ProjectGoal[] = [
  {
    id: "lead-generation",
    title: "Generate More Customer Leads",
    description: "Convert visitors into customers with optimized landing pages",
    icon: "📈",
    basePrice: { MY: 2000, USD: 700 },
    features: [
      {
        id: "conversion-design",
        name: "Conversion-Optimized Design",
        description: "Built to convert visitors",
        included: true,
      },
      {
        id: "lead-capture",
        name: "Lead Capture Forms",
        description: "Collect customer information",
        included: true,
      },
      {
        id: "call-to-actions",
        name: "Strategic Call-to-Actions",
        description: "Guide users to take action",
        included: true,
      },
      {
        id: "fast-loading",
        name: "Fast Loading Performance",
        description: "Keep visitors engaged",
        included: true,
      },
      {
        id: "mobile-first",
        name: "Mobile-First Design",
        description: "Optimized for mobile users",
        included: true,
      },
      {
        id: "social-proof",
        name: "Social Proof Elements",
        description: "Build trust with testimonials",
        included: true,
      },
    ],
  },
  {
    id: "portfolio-showcase",
    title: "Showcase Your Portfolio",
    description: "Display your work beautifully to attract new clients",
    icon: "🎨",
    basePrice: { MY: 2500, USD: 850 },
    features: [
      {
        id: "portfolio-gallery",
        name: "Interactive Portfolio Gallery",
        description: "Showcase your best work",
        included: true,
      },
      {
        id: "project-details",
        name: "Project Detail Pages",
        description: "Tell the story behind each project",
        included: true,
      },
      {
        id: "category-filtering",
        name: "Category Filtering",
        description: "Organize by project type",
        included: true,
      },
      {
        id: "image-optimization",
        name: "Image Optimization",
        description: "Fast loading high-quality images",
        included: true,
      },
      {
        id: "client-testimonials",
        name: "Client Testimonials Section",
        description: "Social proof from satisfied clients",
        included: true,
      },
      {
        id: "contact-cta",
        name: "Contact Call-to-Actions",
        description: "Convert viewers into clients",
        included: true,
      },
    ],
  },
  {
    id: "business-presence",
    title: "Build Professional Business Presence",
    description:
      "Establish credibility with a professional website that showcases your business",
    icon: "🏢",
    basePrice: { MY: 3000, USD: 1000 },
    popular: true,
    features: [
      {
        id: "responsive-design",
        name: "Mobile-Responsive Design",
        description: "Works perfectly on all devices",
        included: true,
      },
      {
        id: "professional-layout",
        name: "Professional Layout & Branding",
        description: "Clean, modern design",
        included: true,
      },
      {
        id: "about-services",
        name: "About & Services Pages",
        description: "Showcase your offerings",
        included: true,
      },
      {
        id: "contact-integration",
        name: "Contact Form Integration",
        description: "Easy customer inquiries",
        included: true,
      },
      {
        id: "seo-foundation",
        name: "SEO Foundation",
        description: "Get found on Google",
        included: true,
      },
      {
        id: "analytics-setup",
        name: "Analytics Setup",
        description: "Track your website performance",
        included: true,
      },
    ],
  },
  {
    id: "online-sales",
    title: "Start Selling Online",
    description:
      "Launch your e-commerce presence and sell products/services online",
    icon: "💳",
    basePrice: { MY: 5000, USD: 1700 },
    features: [
      {
        id: "ecommerce-setup",
        name: "E-commerce Platform Setup",
        description: "Full online store functionality",
        included: true,
      },
      {
        id: "payment-integration",
        name: "Payment Gateway Integration",
        description: "Accept online payments",
        included: true,
      },
      {
        id: "product-catalog",
        name: "Product Catalog Management",
        description: "Organize your products",
        included: true,
      },
      {
        id: "inventory-system",
        name: "Basic Inventory Management",
        description: "Track your stock",
        included: true,
      },
      {
        id: "order-management",
        name: "Order Management System",
        description: "Process customer orders",
        included: true,
      },
      {
        id: "customer-accounts",
        name: "Customer Account System",
        description: "User registration & login",
        included: true,
      },
    ],
  },
];

// Additional features
const additionalFeatures: AdditionalFeature[] = [
  {
    id: "premium-hosting",
    name: "Premium Web Hosting",
    description: "Fast, reliable hosting with SSL certificate",
    price: { MY: 150, USD: 50 },
    complexity: "Basic",
    estimatedHours: 2,
  },
  {
    id: "basic-maintenance",
    name: "Basic Maintenance Package",
    description: "Monthly updates and security monitoring",
    price: { MY: 200, USD: 70 },
    complexity: "Basic",
    estimatedHours: 4,
  },
  {
    id: "custom-logo",
    name: "Custom Logo Design",
    description: "Professional logo design tailored to your brand",
    price: { MY: 350, USD: 120 },
    complexity: "Intermediate",
    estimatedHours: 8,
  },
  {
    id: "multilingual-support",
    name: "Multi-language Support",
    description: "Support for multiple languages",
    price: { MY: 500, USD: 170 },
    complexity: "Intermediate",
    estimatedHours: 15,
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics Setup",
    description: "Detailed tracking and reporting dashboard",
    price: { MY: 450, USD: 150 },
    complexity: "Advanced",
    estimatedHours: 12,
  },
  {
    id: "content-creation",
    name: "Professional Content Creation",
    description: "Copywriting and content strategy",
    price: { MY: 1500, USD: 500 },
    complexity: "Advanced",
    estimatedHours: 25,
  },
];

export default function BookingPage() {
  const router = useRouter();

  // State management
  const [currentStep, setCurrentStep] = useState<BookingStep>("goals");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<UserRegion>("MY");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectBrief, setProjectBrief] = useState<ProjectBrief>({
    businessName: "",
    businessDescription: "",
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
  });

  // Auto-detect region on component mount
  useEffect(() => {
    const detectRegion = async () => {
      try {
        // First try geolocation API
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.country_code === "MY") {
          setSelectedRegion("MY");
        } else {
          setSelectedRegion("USD");
        }
      } catch {
        // Fallback to timezone detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (
          timezone.includes("Asia/Kuala_Lumpur") ||
          timezone.includes("Asia/Kuching")
        ) {
          setSelectedRegion("MY");
        } else {
          setSelectedRegion("USD");
        }
      }
    };

    detectRegion();
  }, []);

  // Helper functions
  const getCurrencySymbol = () => (selectedRegion === "MY" ? "RM" : "$");

  const formatPrice = (price: number) => {
    return `${getCurrencySymbol()}${price.toLocaleString()}`;
  };

  const calculateTotal = () => {
    let total = 0;

    // Add selected goals
    selectedGoals.forEach((goalId) => {
      const goal = projectGoals.find((g) => g.id === goalId);
      if (goal) {
        total += goal.basePrice[selectedRegion];
      }
    });

    // Add selected additional features
    selectedFeatures.forEach((featureId) => {
      const feature = additionalFeatures.find((f) => f.id === featureId);
      if (feature) {
        total += feature.price[selectedRegion];
      }
    });

    return total;
  };

  // Simple outline icons for each goal (toned-down, no neon fills)
  const GoalIcon = ({ id }: { id: string }) => {
    const common = "w-6 h-6 stroke-current text-accent/80";
    switch (id) {
      case "lead-generation":
        return (
          <svg className={common} fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 17l6-6 4 4 8-8"
            />
          </svg>
        );
      case "portfolio-showcase":
        return (
          <svg className={common} fill="none" viewBox="0 0 24 24">
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              ry="2"
              strokeWidth={2}
            />
            <path strokeWidth={2} d="M3 15l5-4 4 3 3-2 6 5" />
          </svg>
        );
      case "business-presence":
        return (
          <svg className={common} fill="none" viewBox="0 0 24 24">
            <path
              strokeWidth={2}
              d="M3 9h18M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9M9 9V7a2 2 0 012-2h2a2 2 0 012 2v2"
            />
          </svg>
        );
      case "online-sales":
        return (
          <svg className={common} fill="none" viewBox="0 0 24 24">
            <path
              strokeWidth={2}
              d="M3 5h2l2 12a2 2 0 002 2h8a2 2 0 002-2l1-7H7"
            />
            <circle cx="10" cy="21" r="1" strokeWidth={2} />
            <circle cx="17" cy="21" r="1" strokeWidth={2} />
          </svg>
        );
      default:
        return (
          <svg className={common} fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth={2} />
          </svg>
        );
    }
  };

  // Outline icon for additional features based on complexity
  const AddonIcon = ({
    complexity,
  }: {
    complexity: AdditionalFeature["complexity"];
  }) => {
    const common = "w-6 h-6 stroke-current text-accent/80";
    if (complexity === "Basic") {
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    }
    if (complexity === "Intermediate") {
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24">
          <path
            strokeWidth={2}
            d="M12 3l2.5 4.5L19 9l-3.5 3 1 5-4.5-2.5L7.5 17l1-5L5 9l4.5-1.5L12 3z"
          />
        </svg>
      );
    }
    // Advanced
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24">
        <path
          strokeWidth={2}
          d="M12 2l2 6h6l-5 3.5L17 18l-5-3-5 3 2-6.5L2 8h6l2-6z"
        />
      </svg>
    );
  };

  const complexityLabel = (
    c: AdditionalFeature["complexity"]
  ): "Low Complexity" | "Medium Complexity" | "High Complexity" => {
    if (c === "Basic") return "Low Complexity";
    if (c === "Intermediate") return "Medium Complexity";
    return "High Complexity";
  };

  // Determine website type based on selected goals
  const getWebsiteType = () => {
    if (selectedGoals.length === 0) return "";

    // Single goal scenarios
    if (selectedGoals.length === 1) {
      const goal = selectedGoals[0];
      if (goal === "lead-generation") return "Landing Page";
      if (goal === "portfolio-showcase") return "Portfolio Website";
      if (goal === "business-presence") return "Business Website";
      if (goal === "online-sales") return "E-commerce Website";
    }

    // Multiple goal scenarios - prioritize by complexity
    if (selectedGoals.includes("online-sales")) {
      return "E-commerce Website with Additional Features";
    }
    if (selectedGoals.includes("business-presence")) {
      return "Comprehensive Business Website";
    }
    if (selectedGoals.includes("portfolio-showcase")) {
      return "Portfolio & Business Website";
    }
    if (selectedGoals.includes("lead-generation")) {
      return "Multi-Purpose Landing Website";
    }

    return "Custom Website Solution";
  };

  // Event handlers
  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Scroll to top hook
  const { scrollToTopManual } = useScrollToTop();

  const nextStep = () => {
    const steps: BookingStep[] = ["goals", "features", "contact"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      // Scroll to top when moving to next step
      scrollToTopManual();
    }
  };

  const prevStep = () => {
    const steps: BookingStep[] = ["goals", "features", "contact"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      // Scroll to top when moving to previous step
      scrollToTopManual();
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent double submission

    try {
      setIsSubmitting(true);

      // Transform selected IDs to full objects for API
      const selectedGoalObjects = selectedGoals
        .map((goalId) => {
          const goal = projectGoals.find((g) => g.id === goalId);
          return goal
            ? {
                id: goal.id,
                title: goal.title,
                description: goal.description,
                price: goal.basePrice[selectedRegion],
              }
            : null;
        })
        .filter(Boolean);

      const selectedFeatureObjects = selectedFeatures
        .map((featureId) => {
          const feature = additionalFeatures.find((f) => f.id === featureId);
          return feature
            ? {
                id: feature.id,
                title: feature.name,
                description: feature.description,
                price: feature.price[selectedRegion],
              }
            : null;
        })
        .filter(Boolean);

      const bookingData = {
        selectedGoals: selectedGoalObjects,
        selectedFeatures: selectedFeatureObjects,
        projectBrief,
        contactInfo,
        selectedRegion,
        totalPrice: calculateTotal(),
        websiteType: getWebsiteType(),
      };

      console.log("Submitting booking data:", bookingData);

      const response = await fetch("/api/booking/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      let result: any = null;
      try {
        result = await response.json();
        console.log("Booking submission response:", result);
      } catch (parseError) {
        // Server returned non-JSON (HTML or plain text). Capture raw body for debugging.
        const raw = await response.text();
        console.error(
          "Failed to parse JSON response from /api/booking/submit:",
          parseError
        );
        console.error("Raw response:", raw);
        result = { error: "Invalid JSON response from server", raw };
      }

      if (response.ok) {
        console.log("Booking submitted successfully:", result);
        router.push("/booking-success");
      } else {
        console.error("Booking submission failed:", result);
        alert(`Submission failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdvancedRequest = () => {
    setCurrentStep("discovery");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
            Let&apos;s Build Your Digital Presence
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your goals, and we&apos;ll create a custom solution
            that drives results for your business.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-center space-x-4 mb-4">
            {["goals", "features", "contact"].map((step, index) => (
              <div
                key={step}
                className={`w-4 h-4 rounded-full ${
                  ["goals", "features", "contact"].indexOf(currentStep) >= index
                    ? "bg-accent"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-400 capitalize">
            Step {["goals", "features", "contact"].indexOf(currentStep) + 1} of
            3: {currentStep}
          </div>
        </div>

        {/* Goals Step */}
        {currentStep === "goals" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                What are your main goals?
              </h2>
              <p className="text-gray-300">
                Select the goals that best describe what you want to achieve
                (you can choose multiple)
              </p>
            </div>

            {/* Display goals as a compact list inside a single container */}
            <div className="rounded-xl border border-accent/20 bg-olive-dark/30 divide-y divide-accent/10 overflow-hidden">
              {projectGoals.map((goal, idx) => {
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <div
                    key={goal.id}
                    className={`group flex items-start justify-between p-4 sm:p-5 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-olive-dark/50 ring-1 ring-inset ring-accent/30"
                        : "hover:bg-olive-dark/40"
                    }`}
                    onClick={() => handleGoalToggle(goal.id)}
                  >
                    {/* Left: Icon */}
                    <div className="mr-3 pt-0.5 shrink-0">
                      <div className="p-2 rounded-lg border border-accent/20 bg-transparent">
                        <GoalIcon id={goal.id} />
                      </div>
                    </div>

                    {/* Middle: Title, description, avg price */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-semibold truncate text-foreground">
                          {goal.title}
                        </h3>
                        {goal.popular && (
                          <span className="px-2 py-0.5 text-[10px] sm:text-xs border border-accent/30 text-accent/80 rounded-full whitespace-nowrap">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                        {goal.description}
                      </p>
                      <div className="mt-1 text-xs text-gray-400">
                        Avg est:{" "}
                        <span className="text-gray-200 font-semibold">
                          {formatPrice(goal.basePrice[selectedRegion])}
                        </span>
                      </div>
                    </div>

                    {/* Right: Native checkbox */}
                    <div className="pl-3 shrink-0 pt-0.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleGoalToggle(goal.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-5 w-5"
                        aria-label={`Select goal: ${goal.title}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-end mt-8">
              <button
                onClick={nextStep}
                disabled={selectedGoals.length === 0}
                className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Additional Features
              </button>
            </div>

            {/* Advanced Project Option - moved below the continue CTA */}
            <div className="mt-6 p-6 bg-olive-dark/30 border border-accent/20 rounded-xl text-center">
              <h3 className="text-lg font-semibold mb-2">
                Need something more complex?
              </h3>
              <p className="text-gray-300 mb-4">
                Custom systems, advanced integrations, or enterprise solutions
              </p>
              <button
                onClick={handleAdvancedRequest}
                className="px-6 py-2 bg-accent/20 text-accent border border-accent rounded-lg hover:bg-accent/30 transition-all"
              >
                Schedule Discovery Call
              </button>
            </div>
          </div>
        )}

        {/* Features Step */}
        {currentStep === "features" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
              <p className="text-gray-300">
                Enhance your project with these optional features
              </p>
            </div>

            {
              /* Project Outcome Summary */
              // Icon above title, larger size; toned-down background
            }
            {selectedGoals.length > 0 && (
              <div className="mb-8 p-6 bg-olive-dark/50 border border-accent/20 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Project Outcome</h3>
                <div className="mb-4 p-4 bg-olive-dark/60 border border-accent/30 rounded-lg text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl mb-2">🚀</span>
                    <h4 className="text-xl font-semibold text-accent">
                      {getWebsiteType()}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-300">
                    Based on your selected goals, we&apos;ll create this type of
                    website solution for you.
                  </p>
                </div>

                <h4 className="text-lg font-semibold mb-3">
                  Included Features:
                </h4>
                <div className="space-y-4">
                  {selectedGoals
                    .map((goalId) => projectGoals.find((g) => g.id === goalId))
                    .filter((goal): goal is ProjectGoal => goal !== undefined)
                    .sort(
                      (a, b) =>
                        a.basePrice[selectedRegion] -
                        b.basePrice[selectedRegion]
                    )
                    .map((goal) => (
                      <div
                        key={goal.id}
                        className="border-l-4 border-accent pl-4"
                      >
                        <h4 className="text-lg font-semibold mb-2">
                          {goal.title}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-2">
                          {goal.features.map((feature) => (
                            <div key={feature.id} className="flex items-center">
                              <svg
                                className="w-3 h-3 mr-2 text-accent"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-xs text-gray-300">
                                {feature.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Additional features as a compact list in a single container */}
            <div className="rounded-xl border border-accent/20 bg-olive-dark/30 divide-y divide-accent/10 overflow-hidden">
              {additionalFeatures.map((feature) => {
                const isSelected = selectedFeatures.includes(feature.id);
                return (
                  <div
                    key={feature.id}
                    className={`group flex items-start justify-between p-4 sm:p-5 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-olive-dark/50 ring-1 ring-inset ring-accent/30"
                        : "hover:bg-olive-dark/40"
                    }`}
                    onClick={() => handleFeatureToggle(feature.id)}
                  >
                    {/* Middle: Title, description, price + complexity */}
                    <div className="flex-1 min-w-0 pr-3">
                      <h3 className="text-base sm:text-lg font-semibold truncate text-foreground">
                        {feature.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                        {feature.description}
                      </p>
                      <div className="mt-2 text-xs text-gray-400 flex items-center gap-3">
                        <span>
                          Price:{" "}
                          <span className="text-gray-200 font-semibold">
                            {formatPrice(feature.price[selectedRegion])}
                          </span>
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-300">
                          {complexityLabel(feature.complexity)}
                        </span>
                      </div>
                    </div>

                    {/* Right: Native checkbox */}
                    <div className="shrink-0 pt-0.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleFeatureToggle(feature.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-5 w-5"
                        aria-label={`Select feature: ${feature.name}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-4 py-2 border rounded-md"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 border rounded-md"
              >
                Continue to Contact
              </button>
            </div>
          </div>
        )}

        {/* Contact Step */}
        {currentStep === "contact" && (
          <div className="max-w-4xl mx-auto">
            {/* Project Summary at top */}
            <div className="mb-8 p-6 bg-olive-dark/50 border border-accent/20 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Project Summary</h2>

              {/* Project Outcome */}
              {selectedGoals.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Project Outcome:
                  </h3>
                  <div className="mb-4 p-3 bg-olive-dark/60 border border-accent/30 rounded-lg text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-5xl mb-1">🚀</span>
                      <h4 className="text-lg font-semibold text-accent">
                        {getWebsiteType()}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {selectedGoals.map((goalId) => {
                      const goal = projectGoals.find((g) => g.id === goalId);
                      return goal ? (
                        <div
                          key={goalId}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm">{goal.title}</span>
                          <div className="w-20 h-6 bg-gray-300 rounded opacity-60"></div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Selected Features */}
              {selectedFeatures.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Additional Features:
                  </h3>
                  <div className="space-y-2">
                    {selectedFeatures.map((featureId) => {
                      const feature = additionalFeatures.find(
                        (f) => f.id === featureId
                      );
                      return feature ? (
                        <div
                          key={featureId}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm">{feature.name}</span>
                          <div className="w-16 h-5 bg-gray-300 rounded opacity-60"></div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Total - completely hidden */}
              <div className="border-t border-accent/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    Estimated Total:
                  </span>
                  <div className="w-24 h-8 bg-gray-300 rounded opacity-60"></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Final pricing will be provided in your detailed quotation
                </p>
              </div>

              {/* Business Summary */}
              {projectBrief.businessName && (
                <div className="mt-6 pt-4 border-t border-accent/20">
                  <h3 className="text-lg font-semibold mb-3">
                    Business Details:
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <strong>Business:</strong> {projectBrief.businessName}
                    </p>
                    {projectBrief.businessDescription && (
                      <p>
                        <strong>Description:</strong>{" "}
                        {projectBrief.businessDescription}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form at bottom in container */}
            <div className="bg-olive-dark/30 border border-accent/20 rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4">
                  Contact & Business Information
                </h2>
                <p className="text-gray-300">
                  We&apos;ll use this to send you the detailed quotation
                </p>
              </div>

              <div className="space-y-6">
                {/* Business Information */}
                <div className="border-b border-accent/20 pb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Business Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={projectBrief.businessName}
                        onChange={(e) =>
                          setProjectBrief({
                            ...projectBrief,
                            businessName: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-olive-dark/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                        placeholder="Your business name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Business Description *
                      </label>
                      <textarea
                        value={projectBrief.businessDescription}
                        onChange={(e) =>
                          setProjectBrief({
                            ...projectBrief,
                            businessDescription: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full p-3 bg-olive-dark/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none resize-none"
                        placeholder="Describe what your business does and your target audience"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Contact Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-olive-dark/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-olive-dark/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-olive-dark/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                        placeholder="+60 12-345 6789"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-4 py-2 border rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !contactInfo.name ||
                  !contactInfo.email ||
                  !projectBrief.businessName ||
                  !projectBrief.businessDescription
                }
                className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-olive mr-2"></div>
                    Submitting Request...
                  </>
                ) : (
                  "Submit to Get Full Estimation Quotation"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Discovery Step */}
        {currentStep === "discovery" && (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Schedule Discovery Call</h2>
            <p className="text-gray-300 mb-8">
              For complex projects, we offer a free discovery call to understand
              your specific requirements and provide a detailed proposal.
            </p>

            <div className="bg-olive-dark/50 border border-accent/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">What to expect:</h3>
              <ul className="text-left space-y-2 mb-6">
                <li>• 30-45 minute consultation call</li>
                <li>• Technical requirements analysis</li>
                <li>• Timeline and budget discussion</li>
                <li>• Custom solution proposal</li>
              </ul>

              <Link
                href="https://calendar.app.google/SrBsskVewCfjWUv16"
                className="inline-block px-8 py-3 bg-accent text-olive font-semibold rounded-lg hover:bg-accent/90 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Discovery Call
              </Link>
            </div>

            <button
              onClick={() => setCurrentStep("goals")}
              className="mt-6 px-6 py-2 text-accent border border-accent rounded-lg hover:bg-accent/10 transition-all"
            >
              Back to Goals
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
