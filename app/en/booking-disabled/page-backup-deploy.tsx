"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAnalytics } from "../../../hooks/useAnalytics";
import { SEO } from "../../../components/SEO";
import { createServiceStructuredData, createBreadcrumbStructuredData } from "../../../lib/structuredData";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams?.get("package") || "";
  const analytics = useAnalytics();

type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  priceRange: string;
  features: string[];
  popular?: boolean;
  isAdvanced?: boolean;
};

type ProjectConfiguration = {
  domain: "existing" | "new" | "";
  paymentPlan?: string;
};

type ProjectBrief = {
  businessName: string;
  businessDescription: string;
  mainGoal: string;
};

type ContactInfo = {
  name: string;
  email: string;
  company: string;
  phone: string;
};

type BookingStep =
  | "starter"
  | "configurator"
  | "brief"
  | "contact"
  | "thankyou"
  | "discovery";

// Core services for Malaysian SMEs
const coreServices: ServiceCategory[] = [
  {
    id: "landing-page",
    name: "The Landing Page",
    description:
      "High-converting single page perfect for marketing campaigns and showcases",
    basePrice: 1500,
    priceRange: "RM 1,500",
    features: [
      "Strategic UI/UX Design",
      "Mobile-Responsive Design",
      "Contact Form Integration",
      "SEO Foundation",
      "Fast Loading Performance",
      "Professional Copy Review",
    ],
  },
  {
    id: "business-website",
    name: "The Business Website",
    description: "Complete online presence for established SMEs (5-7 pages)",
    basePrice: 1899,
    priceRange: "RM 1,899",
    features: [
      "Multi-Page Website Design",
      "Professional Branding",
      "About & Services Pages",
      "Contact & Location Pages",
      "Content Management System",
      "SEO Optimization",
      "Mobile-First Design",
      "Analytics Setup",
    ],
    popular: true,
  },
];

// Note: This variable was removed as it's not currently used in the main flow
// const advancedService: ServiceCategory = {
//   id: "advanced-system",
//   name: "Advanced System",
//   description: "E-commerce, booking systems, or complex custom solutions",
//   basePrice: 5000,
//   priceRange: "RM 5,000+",
//   features: [
//     "Custom Functionality",
//     "Database Integration",
//     "User Authentication",
//     "Payment Processing",
//     "Admin Dashboard",
//     "Scalable Architecture",
//   ],
//   isAdvanced: true,
// };

// Define addon options
const addons = [
  {
    id: "domain",
    name: "Domain Registration",
    price: 60,
    description: "1 year .com domain included",
    category: "Domain",
  },
  {
    id: "page",
    name: "Additional Page",
    price: 350,
    description: "Extra custom website page",
    category: "Page",
  },
  {
    id: "contact",
    name: "Advanced Contact Form",
    price: 400,
    description: "Enhanced form with automation",
    category: "Feature",
  },
  {
    id: "blog",
    name: "Blog / News Section",
    price: 750,
    description: "Fully functional blog with CMS setup",
    category: "Feature",
  },
  {
    id: "email",
    name: "Email Auto-Reply",
    price: 450,
    description: "Automated email responses",
    category: "Feature",
  },
  {
    id: "maintenance",
    name: "Website Maintenance",
    price: 250,
    description: "Monthly updates, security & support",
    category: "Service",
  },
];

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams.get("package");

  // State for the new psychology-driven flow
  const [currentStep, setCurrentStep] = useState<BookingStep>("starter");
  const [selectedService, setSelectedService] =
    useState<ServiceCategory | null>(null);
  const [projectConfig, setProjectConfig] = useState<ProjectConfiguration>({
    domain: "",
    paymentPlan: "",
  });
  const [projectBrief, setProjectBrief] = useState<ProjectBrief>({
    businessName: "",
    businessDescription: "",
    mainGoal: "",
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [region, setRegion] = useState<"MY" | "SG" | "INT">("MY");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // Initialize analytics
  const analytics = useAnalytics();

  // Track page view on mount
  useEffect(() => {
    analytics.trackStep('booking_page_view', 1, {
      selected_service: 'none',
      addons_count: 0
    });
  }, []);

  // Track step changes
  useEffect(() => {
    const stepNumbers = {
      'starter': 1,
      'configurator': 2,
      'brief': 3,
      'contact': 4,
      'thankyou': 5,
      'discovery': 6
    };
    
    analytics.trackStep(currentStep, stepNumbers[currentStep], {
      selected_service: selectedService?.name || 'none',
      addons_count: selectedAddons.length
    });
  }, [currentStep, selectedService, selectedAddons]);

  // Preselect package based on URL parameter
  useEffect(() => {
    if (preselectedPackage && !selectedService) {
      const packageMap = {
        "landing-page": coreServices.find((s) => s.id === "landing-page"),
        "business-website": coreServices.find(
          (s) => s.id === "business-website"
        ),
      };

      const service = packageMap[preselectedPackage as keyof typeof packageMap];
      if (service) {
        setSelectedService(service);
        setCurrentStep("configurator");
      }
    }
  }, [preselectedPackage, selectedService]);

  // Auto-check domain add-on when user selects "new domain"
  useEffect(() => {
    if (projectConfig.domain === "new") {
      // Auto-add domain to selected add-ons if not already selected
      setSelectedAddons((prev) => {
        if (!prev.includes("domain")) {
          return [...prev, "domain"];
        }
        return prev;
      });
    } else if (projectConfig.domain === "existing") {
      // Remove domain from selected add-ons if user has existing domain
      setSelectedAddons((prev) => prev.filter((addon) => addon !== "domain"));
    }
  }, [projectConfig.domain]);

  // Calculate pricing for selected configuration
  const calculateConfiguredPrice = () => {
    if (!selectedService) return 0;

    // Fixed regional prices (exact values from specification)
    const servicePrices = {
      "landing-page": { MY: 1500, SG: 599, INT: 499 },
      "business-website": { MY: 1899, SG: 1199, INT: 999 },
    };

    let totalPrice =
      servicePrices[selectedService.id as keyof typeof servicePrices]?.[
        region
      ] || 0;

    // Add domain cost if new domain selected (fixed per region)
    if (projectConfig.domain === "new") {
      const domainPrices = { MY: 60, SG: 20, INT: 20 };
      totalPrice += domainPrices[region];
    }

    // Add selected add-ons (fixed regional prices)
    const addonRegionalPrices = {
      domain: { MY: 60, SG: 20, INT: 20 },
      page: { MY: 350, SG: 200, INT: 180 },
      contact: { MY: 400, SG: 250, INT: 220 },
      blog: { MY: 750, SG: 450, INT: 400 },
      email: { MY: 450, SG: 280, INT: 250 },
      maintenance: { MY: 250, SG: 150, INT: 130 },
    };

    selectedAddons.forEach((addonId) => {
      if (addonRegionalPrices[addonId as keyof typeof addonRegionalPrices]) {
        totalPrice +=
          addonRegionalPrices[addonId as keyof typeof addonRegionalPrices][
            region
          ];
      }
    });

    return Math.round(totalPrice);
  };
  const formatPrice = (price: number) => {
    if (region === "MY") return `RM${price.toLocaleString()}`;
    if (region === "SG") return `SGD${price.toLocaleString()}`;
    return `USD${price.toLocaleString()}`;
  };

  // Calculate regional price for add-ons display
  const getAddonDisplayPrice = (basePrice: number, addonId: string) => {
    // Fixed regional prices for all add-ons
    const addonPrices = {
      domain: { MY: 60, SG: 20, INT: 20 },
      page: { MY: 350, SG: 200, INT: 180 },
      contact: { MY: 400, SG: 250, INT: 220 },
      blog: { MY: 750, SG: 450, INT: 400 },
      email: { MY: 450, SG: 280, INT: 250 },
      maintenance: { MY: 250, SG: 150, INT: 130 },
    };
    return (
      addonPrices[addonId as keyof typeof addonPrices]?.[region] || basePrice
    );
  };

  // Get regional service price
  const getServiceRegionalPrice = (serviceId: string) => {
    const servicePrices = {
      "landing-page": { MY: 1500, SG: 599, INT: 499 },
      "business-website": { MY: 1899, SG: 1199, INT: 999 },
    };
    return (
      servicePrices[serviceId as keyof typeof servicePrices]?.[region] || 0
    );
  };

  // Main goal options for project brief
  const mainGoalOptions = [
    "Get more customer inquiries",
    "Look more professional and credible",
    "Sell products or services online",
    "Showcase my portfolio or work",
    "Build brand awareness",
    "Replace my outdated website",
    "Start my online presence",
  ];

  // Navigation functions
  const nextStep = () => {
    const steps: BookingStep[] = [
      "starter",
      "configurator",
      "brief",
      "contact",
      "thankyou",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: BookingStep[] = [
      "starter",
      "configurator",
      "brief",
      "contact",
      "thankyou",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };
  const handleAdvancedServiceClick = () => {
    setCurrentStep("discovery");
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Prepare comprehensive quote data
      const quoteData = {
        name: contactInfo.name,
        email: contactInfo.email,
        company: contactInfo.company,
        phone: contactInfo.phone,

        // Main service selection
        selectedService: {
          id: selectedService?.id || "unknown",
          name: selectedService?.name || "Unknown Service",
          basePrice: selectedService?.basePrice || 0,
        },

        // Add-on services
        services: selectedAddons.map((addonId) => {
          const addon = addons.find((a) => a.id === addonId);
          return {
            name: addon?.name || "Unknown Service",
            category: addon?.category || "Service",
            id: addon?.id || addonId,
            price: addon?.price || 0,
          };
        }),

        // Project configuration
        projectConfiguration: {
          domain: projectConfig.domain || "not-specified",
          paymentPlan: projectConfig.paymentPlan || "not-specified",
        },

        // Timeline and brief
        timeline: "Not specified", // This seems to be missing from current form
        projectBrief,

        // Pricing and metadata
        estimatedPrice: calculateConfiguredPrice(),
        region,
        submittedAt: new Date().toISOString(),
      };

      console.log("Submitting quote data:", quoteData);

      // Submit to API
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote");
      }

      const result = await response.json();
      console.log("Quote submitted successfully:", result);

      // Track successful quote submission
      analytics.trackQuote({
        selectedService: quoteData.selectedService,
        services: quoteData.services,
        estimatedPrice: quoteData.estimatedPrice,
        region: quoteData.region,
        transactionId: result.id || Date.now().toString()
      });

      // Track form completion
      analytics.trackForm('quote_submission', 'completed', selectedService?.name, calculateConfiguredPrice());

      // Store quote data locally for thank you page
      localStorage.setItem("submittedQuoteData", JSON.stringify(quoteData));

      // Move to thank you page
      setCurrentStep("thankyou");
    } catch (error) {
      console.error("Quote submission failed:", error);
      setPaymentError(
        (error as Error).message ||
          "Failed to submit quote request. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Prepare SEO data
  const breadcrumbData = createBreadcrumbStructuredData([
    { name: 'Home', url: 'https://tukang.my' },
    { name: 'Booking', url: 'https://tukang.my/en/booking' }
  ]);

  const serviceData = selectedService ? createServiceStructuredData(
    selectedService.name, 
    selectedService.basePrice.toString()
  ) : null;

  return (
    <>
      <SEO 
        title={`Book ${selectedService?.name || 'Website Development'} - Professional Service Quote | Tukang`}
        description={`Get a professional quote for ${selectedService?.name || 'website development services'} in Malaysia & Singapore. Custom solutions, competitive pricing, fast delivery.`}
        keywords={`book ${selectedService?.name || 'website development'}, quote, pricing, professional web services, malaysia, singapore`}
        canonical="https://tukang.my/en/booking"
        structuredData={serviceData ? [breadcrumbData, serviceData] : [breadcrumbData]}
      />
      <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive">
      {/* Header */}
      <section className="relative py-8 bg-gradient-to-br from-olive-dark via-olive to-olive-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-accent rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 border border-brown rotate-12"
            style={{ animation: "spin 20s linear infinite" }}
          ></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="/en"
                className="text-gray-400 hover:text-accent transition-colors duration-200"
              >
                Home
              </Link>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-accent font-medium">Book Project</span>
            </div>

            {/* Region Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Region:</span>
              <select
                value={region}
                onChange={(e) =>
                  setRegion(e.target.value as "MY" | "SG" | "INT")
                }
                className="bg-olive-dark border border-accent/20 rounded-lg px-3 py-1 text-accent text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="MY">🇲🇾 Malaysia (RM)</option>
                <option value="SG">🇸🇬 Singapore (SGD)</option>
                <option value="INT">🌍 International (€)</option>
              </select>
            </div>
          </nav>

          {/* Dynamic Header based on step */}
          <div className="text-center mb-8">
            {currentStep === "starter" && (
              <>
                <h2 className="text-2xl font-semibold text-accent mb-4">
                  Build Your Instant Quote - Select Your Website Package
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Choose your preferred package below to get started with your
                  personalized project estimate.
                </p>
              </>
            )}

            {currentStep === "configurator" && selectedService && (
              <>
                {/* Selected Package Summary */}
                <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-2xl border border-accent/20 p-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-4 text-left">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {selectedService.name}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {selectedService.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent">
                        {formatPrice(
                          getServiceRegionalPrice(selectedService.id)
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        {region === "MY"
                          ? "MYR"
                          : region === "SG"
                          ? "SGD"
                          : "EUR"}{" "}
                        base price
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-accent/20 pt-4">
                    <p className="text-accent font-medium text-center">
                      Step 2: Configure Your Project
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentStep === "brief" && selectedService && (
              <>
                {/* Selected Package Summary */}
                <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-2xl border border-accent/20 p-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-accent mb-2">
                        {selectedService.name}
                      </h2>
                      <p className="text-gray-300 text-sm">
                        {selectedService.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent">
                        {formatPrice(
                          getServiceRegionalPrice(selectedService.id)
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        {region === "MY"
                          ? "MYR"
                          : region === "SG"
                          ? "SGD"
                          : "EUR"}{" "}
                        base price
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-accent/20 pt-4">
                    <p className="text-accent font-medium text-center">
                      Step 3: Tell Us About Your Business
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentStep === "checkout" && (
              <>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 max-w-lg mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-accent mb-2">
                        {selectedService.name}
                      </h2>
                      <p className="text-gray-300 text-sm">
                        {selectedService.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent">
                        {formatPrice(
                          getServiceRegionalPrice(selectedService.id)
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        {region === "MY"
                          ? "MYR"
                          : region === "SG"
                          ? "SGD"
                          : "EUR"}{" "}
                        base price
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-accent/20 pt-4">
                    <p className="text-accent font-medium text-center">
                      Step 4: Secure Your Project Slot
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentStep === "discovery" && <></>}
          </div>

          {/* Progress Bar (only show for main flow, not discovery) */}
          {currentStep !== "discovery" && (
            <div className="flex justify-center items-center space-x-4 mb-8">
              {[
                { key: "starter", label: "Select Package", step: 1 },
                { key: "configurator", label: "Configure", step: 2 },
                { key: "brief", label: "Project Brief", step: 3 },
                { key: "contact", label: "Contact Info", step: 4 },
                { key: "thankyou", label: "Get Quote", step: 5 },
              ]
                .filter((step) =>
                  currentStep === "starter"
                    ? step.step <= 1
                    : currentStep === "configurator"
                    ? step.step <= 2
                    : currentStep === "brief"
                    ? step.step <= 3
                    : currentStep === "contact"
                    ? step.step <= 4
                    : step.step <= 5
                )
                .map((step, index, array) => (
                  <div key={step.key} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                        currentStep === step.key
                          ? "bg-accent text-olive border-accent"
                          : index <
                              array.findIndex((s) => s.key === currentStep) ||
                            (currentStep === "brief" &&
                              step.key === "configurator") ||
                            (currentStep === "contact" &&
                              (step.key === "configurator" ||
                                step.key === "brief")) ||
                            (currentStep === "thankyou" &&
                              (step.key === "configurator" ||
                                step.key === "brief" ||
                                step.key === "contact"))
                          ? "bg-accent/20 text-accent border-accent/50"
                          : "bg-olive-dark text-gray-400 border-gray-600"
                      }`}
                    >
                      {step.step}
                    </div>
                    {index < array.length - 1 && (
                      <div
                        className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                          index <
                            array.findIndex((s) => s.key === currentStep) ||
                          (currentStep === "brief" &&
                            step.key === "configurator") ||
                          (currentStep === "contact" &&
                            step.key === "configurator") ||
                          (currentStep === "thankyou" &&
                            (step.key === "configurator" ||
                              step.key === "brief"))
                            ? "bg-accent/50"
                            : "bg-gray-600"
                        }`}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step 1: Project Starter - Core Drive 2: Development & Accomplishment */}
          {currentStep === "starter" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {coreServices.map((service) => (
                  <div
                    key={service.id}
                    className={`relative bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border transition-all duration-500 cursor-pointer hover:transform hover:-translate-y-2 p-8 ${
                      selectedService?.id === service.id
                        ? "border-accent/50 shadow-2xl shadow-accent/20"
                        : "border-accent/20 hover:border-accent/40"
                    }`}
                    onClick={() => {
                      setSelectedService(service);
                      analytics.trackService(service);
                    }}
                  >
                    {service.popular && (
                      <div className="absolute -top-3 left-6 px-4 py-1 bg-accent text-olive text-sm font-bold rounded-full">
                        Most Popular
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed text-xl">
                      {service.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium text-brown">
                        What&apos;s included:
                      </h4>
                      {service.features.slice(0, 6).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-400"
                        >
                          <svg
                            className="w-4 h-4 text-accent mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {selectedService?.id === service.id && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-olive"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Smart Configurator - Core Drive 3: Empowerment & Core Drive 4: Ownership */}
          {currentStep === "configurator" && selectedService && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8">
                {/* Domain Configuration */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Domain Setup
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Do you have an existing domain?
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                        projectConfig.domain === "existing"
                          ? "border-accent bg-accent/10"
                          : "border-accent/20 hover:border-accent/40"
                      }`}
                      onClick={() =>
                        setProjectConfig({
                          ...projectConfig,
                          domain: "existing",
                        })
                      }
                    >
                      <div className="font-medium text-accent mb-2">
                        Yes, I&apos;ll use my own
                      </div>
                      <div className="text-sm text-gray-400">
                        You already have a domain name
                      </div>
                    </div>

                    <div
                      className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                        projectConfig.domain === "new"
                          ? "border-accent bg-accent/10"
                          : "border-accent/20 hover:border-accent/40"
                      }`}
                      onClick={() =>
                        setProjectConfig({ ...projectConfig, domain: "new" })
                      }
                    >
                      <div className="font-medium text-accent mb-2">
                        No, I need a new one
                      </div>
                      <div className="text-sm text-gray-400">
                        +{formatPrice(getAddonDisplayPrice(60, "domain"))}{" "}
                        domain registration
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add-ons Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Popular Add-ons
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Enhance your website with these optional features (can be
                    added later)
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {addons.map((addon) => (
                      <div
                        key={addon.id}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                          selectedAddons.includes(addon.id)
                            ? "border-accent bg-accent/10"
                            : "border-accent/20 hover:border-accent/40"
                        }`}
                        onClick={() => {
                          const isSelected = selectedAddons.includes(addon.id);
                          if (isSelected) {
                            setSelectedAddons(
                              selectedAddons.filter((id) => id !== addon.id)
                            );
                            analytics.trackAddon(addon, 'remove');
                          } else {
                            setSelectedAddons([...selectedAddons, addon.id]);
                            analytics.trackAddon(addon, 'add');
                          }
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-accent text-sm">
                            {addon.name}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {addon.description}
                        </div>
                        <div className="mt-2">
                          <div
                            className={`w-4 h-4 rounded border transition-all duration-300 ${
                              selectedAddons.includes(addon.id)
                                ? "border-accent bg-accent"
                                : "border-gray-600"
                            }`}
                          >
                            {selectedAddons.includes(addon.id) && (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-olive text-xs">✓</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Project Brief Lite - Core Drive 4: Ownership */}
          {currentStep === "brief" && selectedService && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8">
                <div className="space-y-6">
                  {/* Business Name */}
                  <div>
                    <label className="block text-accent font-medium mb-3">
                      What is your business name? *
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
                      placeholder="Enter your business name"
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Business Description */}
                  <div>
                    <label className="block text-accent font-medium mb-3">
                      Briefly, what does your business do? *
                    </label>
                    <textarea
                      value={projectBrief.businessDescription}
                      onChange={(e) =>
                        setProjectBrief({
                          ...projectBrief,
                          businessDescription: e.target.value,
                        })
                      }
                      placeholder="e.g., We provide accounting services for small businesses in Kuala Lumpur"
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 resize-none"
                      rows={3}
                      required
                    />
                  </div>

                  {/* Main Goal */}
                  <div>
                    <label className="block text-accent font-medium mb-3">
                      What is the single most important goal for this new
                      website? *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mainGoalOptions.map((goal) => (
                        <div
                          key={goal}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                            projectBrief.mainGoal === goal
                              ? "border-accent bg-accent/10"
                              : "border-accent/20 hover:border-accent/40"
                          }`}
                          onClick={() =>
                            setProjectBrief({ ...projectBrief, mainGoal: goal })
                          }
                        >
                          <div className="text-sm font-medium text-accent">
                            {goal}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Benefit Statement */}
                <div className="mt-8 bg-brown/10 rounded-xl p-6 border border-brown/20">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-6 h-6 text-brown flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-brown mb-2">
                        Why we ask these questions
                      </h4>
                      <p className="text-sm text-gray-300">
                        This information helps us prepare for your project
                        kick-off, ensuring we understand your goals and can
                        create a website that truly serves your business needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact Information - Lead Qualification */}
          {currentStep === "contact" && selectedService && (
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8">
                <h3 className="text-xl font-bold text-accent mb-6">
                  Contact Information
                </h3>
                <p className="text-gray-300 mb-6">
                  Please provide your contact details to receive your
                  personalized project estimate.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-accent font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, name: e.target.value })
                      }
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      placeholder="John Tan"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-accent font-medium mb-2">
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
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      placeholder="john@business.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-accent font-medium mb-2">
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
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      placeholder="+60 12-345 6789"
                    />
                  </div>

                  <div>
                    <label className="block text-accent font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={contactInfo.company}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          company: e.target.value,
                        })
                      }
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      placeholder="Your Company Sdn Bhd"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Thank You - Quote Submitted */}
          {currentStep === "thankyou" && selectedService && (
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Thank You Message */}
              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-olive"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-3xl font-bold text-accent mb-4">
                  Thank You, {contactInfo.name}!
                </h3>
                <h4 className="text-xl text-gray-300 mb-6">
                  Your Personalized Quote Has Been Sent to Your Email!
                </h4>

                <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-6">
                  <p className="text-accent font-medium mb-3">
                    📧 Check Your Inbox
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We've sent a detailed quote for your{" "}
                    <strong>{selectedService.name}</strong> project to{" "}
                    <strong>{contactInfo.email}</strong>. The email contains
                    your complete project summary, pricing breakdown, and a
                    secure payment link to get started.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-olive-dark/50 rounded-lg p-4">
                    <div className="text-accent font-bold text-lg">1</div>
                    <p className="text-sm text-gray-300">
                      Check your email for the detailed quote
                    </p>
                  </div>
                  <div className="bg-olive-dark/50 rounded-lg p-4">
                    <div className="text-accent font-bold text-lg">2</div>
                    <p className="text-sm text-gray-300">
                      Pay the 50% deposit via the secure link
                    </p>
                  </div>
                  <div className="bg-olive-dark/50 rounded-lg p-4">
                    <div className="text-accent font-bold text-lg">3</div>
                    <p className="text-sm text-gray-300">
                      Get redirected to project onboarding
                    </p>
                  </div>
                </div>

                <div className="bg-brown/10 border border-brown/20 rounded-xl p-6">
                  <p className="text-brown font-medium mb-2">⚡ What's Next?</p>
                  <p className="text-gray-300 text-sm">
                    Once you complete the deposit payment, you'll be directed to
                    our onboarding page where you can:
                  </p>
                  <ul className="text-gray-300 text-sm mt-3 space-y-1">
                    <li>• Fill out the detailed project brief</li>
                    <li>• Schedule your Project Kick-off Call</li>
                    <li>• Upload any existing brand assets</li>
                    <li>• Meet your dedicated project team</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link
                    href="/en"
                    className="px-8 py-3 bg-olive-dark text-accent rounded-xl hover:bg-olive-dark/80 transition-all duration-300 border border-accent/20 hover:border-accent/50"
                  >
                    Back to Homepage
                  </Link>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-accent text-olive rounded-xl hover:bg-accent/90 transition-all duration-300"
                  >
                    Start New Quote
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Discovery Call Page for Advanced Systems */}
          {currentStep === "discovery" && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 text-center">
                <h3 className="text-2xl font-bold text-accent mb-6">
                  Let&apos;s Discuss Your Custom Requirements
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Complex projects like e-commerce stores, booking systems, and
                  custom applications require a personalized approach.
                  Let&apos;s have a conversation about your specific needs and
                  create the perfect solution for your business.
                </p>

                {/* Calendar embed would go here */}
                <div className="bg-white rounded-2xl p-4 mb-6">
                  <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2FER0ii_SkwzbGtA7U9vXkuZNtBk0lLTF-1SqOm2-KJjbX2ItApF8VhPKyDUNGhNOjMhXCLdPQ"
                    style={{ border: 0 }}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    className="rounded-xl"
                  ></iframe>
                </div>

                <button
                  onClick={() => router.push("/en")}
                  className="px-8 py-3 bg-olive-dark text-accent rounded-xl hover:bg-olive-dark/80 transition-all duration-300 border border-accent/20 hover:border-accent/50"
                >
                  Back to Homepage
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep !== "discovery" && currentStep !== "thankyou" && (
            <div className="space-y-4 mt-12 max-w-4xl mx-auto">
              {/* Payment Error Display */}
              {paymentError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                  <p className="text-red-400 font-medium">{paymentError}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === "starter"}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentStep === "starter"
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-olive-dark border border-accent/20 text-accent hover:border-accent/40"
                  }`}
                >
                  Previous
                </button>

                {currentStep === "contact" ? (
                  <button
                    onClick={handleSubmit}
                    disabled={
                      !contactInfo.name ||
                      !contactInfo.email ||
                      !projectBrief.businessName ||
                      isProcessing
                    }
                    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      !contactInfo.name ||
                      !contactInfo.email ||
                      !projectBrief.businessName ||
                      isProcessing
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-accent to-accent/80 text-olive hover:shadow-lg hover:shadow-accent/30 transform hover:scale-105"
                    }`}
                  >
                    {isProcessing
                      ? "Sending Quote..."
                      : "� Get My Instant Quote"}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={
                      (currentStep === "starter" && !selectedService) ||
                      (currentStep === "configurator" &&
                        !projectConfig.domain) ||
                      (currentStep === "brief" &&
                        (!projectBrief.businessName ||
                          !projectBrief.businessDescription ||
                          !projectBrief.mainGoal))
                    }
                    className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                      (currentStep === "starter" && !selectedService) ||
                      (currentStep === "configurator" &&
                        !projectConfig.domain) ||
                      (currentStep === "brief" &&
                        (!projectBrief.businessName ||
                          !projectBrief.businessDescription ||
                          !projectBrief.mainGoal))
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-accent to-accent/80 text-olive hover:shadow-lg hover:shadow-accent/30"
                    }`}
                  >
                    {currentStep === "starter"
                      ? "Configure My Project"
                      : currentStep === "configurator"
                      ? "Continue to Project Brief"
                      : "Continue to Contact Info"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Advanced System Option - Only show on starter step */}
          {currentStep === "starter" && (
            <div className="text-center mt-12">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-brown/20 to-brown/10 backdrop-blur-sm rounded-3xl border border-brown/30 p-8">
                <h3 className="text-2xl font-bold text-brown mb-4">
                  Need Something More Complex?
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  E-commerce stores, booking systems, membership sites, or
                  custom web applications require a personalized approach.
                </p>
                <button
                  onClick={handleAdvancedServiceClick}
                  className="px-8 py-3 bg-brown text-white rounded-xl hover:bg-brown/80 transition-all duration-300 font-medium"
                >
                  Book Discovery Call for Custom Solutions
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-olive flex items-center justify-center">
        <div className="text-accent text-xl">Loading booking...</div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
