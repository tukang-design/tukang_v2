"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Removed getRegionDetails import as it's not currently used
// import {
//   getRegionDetails,
// } from "../components/region-selector";

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
  paymentPlan: "full" | "installments" | "";
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
  | "checkout"
  | "discovery";

// Core services for Malaysian SMEs
const coreServices: ServiceCategory[] = [
  {
    id: "landing-page",
    name: "The Landing Page",
    description:
      "High-converting single page perfect for marketing campaigns and showcases",
    basePrice: 1500,
    priceRange: "RM 1,500 - 3,000",
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
    basePrice: 3000,
    priceRange: "RM 3,000 - 8,000",
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

export default function BookingPage() {
  const router = useRouter();

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

  // Calculate pricing for selected configuration
  const calculateConfiguredPrice = () => {
    if (!selectedService) return 0;

    const regionMultipliers = { MY: 1.0, SG: 0.63, INT: 0.25 };
    let totalPrice = selectedService.basePrice * regionMultipliers[region];

    // Add domain cost if new domain selected
    if (projectConfig.domain === "new") {
      totalPrice += 60 * regionMultipliers[region];
    }

    return Math.round(totalPrice);
  };

  const formatPrice = (price: number) => {
    if (region === "MY") return `RM${price.toLocaleString()}`;
    if (region === "SG") return `SGD${price.toLocaleString()}`;
    return `€${price.toLocaleString()}`;
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
      "checkout",
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
      "checkout",
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
    try {
      const bookingData = {
        selectedService,
        projectConfig,
        projectBrief,
        contactInfo,
        region,
        totalPrice: calculateConfiguredPrice(),
      };

      console.log("Booking submitted:", bookingData);

      // Here you would integrate with your payment system
      // For now, redirect to thank you page
      router.push("/booking/thank-you");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error processing your booking. Please try again.");
    }
  };

  return (
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
                href=""
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
                  First, which of our core services are you interested in?
                </h2>
              </>
            )}

            {currentStep === "configurator" && selectedService && (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold text-accent font-mono mb-6 leading-tight">
                  Configure Your {selectedService.name}
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Customize your project to fit your exact needs and budget.
                </p>
              </>
            )}

            {currentStep === "brief" && (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold text-accent font-mono mb-6 leading-tight">
                  Tell Us About Your Business
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  This helps us prepare for your project kick-off and get
                  started on the right foot.
                </p>
              </>
            )}

            {currentStep === "checkout" && (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold text-accent font-mono mb-6 leading-tight">
                  Secure Your Project Slot
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  You&apos;re one step away from a professional website that
                  converts visitors into customers.
                </p>
              </>
            )}

            {currentStep === "discovery" && (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold text-accent font-mono mb-6 leading-tight">
                  Book Your Discovery Call
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Let&apos;s discuss your custom requirements and create the
                  perfect solution.
                </p>
              </>
            )}
          </div>

          {/* Progress Bar (only show for main flow, not discovery) */}
          {currentStep !== "discovery" && (
            <div className="flex justify-center items-center space-x-4 mb-8">
              {[
                { key: "starter", label: "Project Brief", step: 1 },
                { key: "configurator", label: "Configure & Pay", step: 2 },
                { key: "brief", label: "Business Info", step: 2 },
                { key: "checkout", label: "Secure Payment", step: 3 },
              ]
                .filter((step) =>
                  currentStep === "starter"
                    ? step.step <= 1
                    : currentStep === "configurator"
                    ? step.step <= 2
                    : currentStep === "brief"
                    ? step.step <= 2
                    : step.step <= 3
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
                            (currentStep === "checkout" &&
                              (step.key === "configurator" ||
                                step.key === "brief"))
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
                          (currentStep === "checkout" &&
                            step.key === "configurator")
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {coreServices.map((service) => (
                  <div
                    key={service.id}
                    className={`relative bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border transition-all duration-500 cursor-pointer hover:transform hover:-translate-y-2 p-8 ${
                      selectedService?.id === service.id
                        ? "border-accent/50 shadow-2xl shadow-accent/20"
                        : "border-accent/20 hover:border-accent/40"
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    {service.popular && (
                      <div className="absolute -top-3 left-6 px-4 py-1 bg-accent text-olive text-sm font-bold rounded-full">
                        Most Popular
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-accent">
                        {service.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Price Range</div>
                        <div className="text-xl font-bold text-accent">
                          {region === "MY"
                            ? service.priceRange
                            : region === "SG"
                            ? service.priceRange
                                .replace("RM", "SGD")
                                .replace(/\d+/g, (match) =>
                                  Math.round(
                                    parseInt(match.replace(/,/g, "")) * 0.63
                                  ).toLocaleString()
                                )
                            : service.priceRange
                                .replace("RM", "€")
                                .replace(/\d+/g, (match) =>
                                  Math.round(
                                    parseInt(match.replace(/,/g, "")) * 0.25
                                  ).toLocaleString()
                                )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium text-accent">
                        What&apos;s included:
                      </h4>
                      {service.features.slice(0, 6).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-300"
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

              {/* Advanced System Option */}
              <div className="text-center mt-12">
                <div className="max-w-3xl mx-auto bg-gradient-to-br from-brown/20 to-brown/10 backdrop-blur-sm rounded-3xl border border-brown/30 p-8">
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
                        +{formatPrice(60)} domain registration
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Plan */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Payment Plan
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Choose your preferred payment option:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                        projectConfig.paymentPlan === "full"
                          ? "border-accent bg-accent/10"
                          : "border-accent/20 hover:border-accent/40"
                      }`}
                      onClick={() =>
                        setProjectConfig({
                          ...projectConfig,
                          paymentPlan: "full",
                        })
                      }
                    >
                      <div className="font-medium text-accent mb-2">
                        Full Payment
                      </div>
                      <div className="text-sm text-gray-400">
                        Pay once, save 10%
                      </div>
                    </div>

                    <div
                      className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                        projectConfig.paymentPlan === "installments"
                          ? "border-accent bg-accent/10"
                          : "border-accent/20 hover:border-accent/40"
                      }`}
                      onClick={() =>
                        setProjectConfig({
                          ...projectConfig,
                          paymentPlan: "installments",
                        })
                      }
                    >
                      <div className="font-medium text-accent mb-2">
                        3-Month Installments
                      </div>
                      <div className="text-sm text-gray-400">
                        Spread payments over 3 months
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Price Summary */}
                {projectConfig.domain && projectConfig.paymentPlan && (
                  <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                    <h3 className="text-lg font-medium text-accent mb-4">
                      Your Configuration
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">
                          {selectedService.name}
                        </span>
                        <span className="font-medium text-accent">
                          {formatPrice(selectedService.basePrice)}
                        </span>
                      </div>

                      {projectConfig.domain === "new" && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            Domain Registration
                          </span>
                          <span className="font-medium text-accent">
                            {formatPrice(60)}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-accent/20 pt-3 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-accent">
                            {projectConfig.paymentPlan === "full"
                              ? "Total Today"
                              : "First Payment"}
                          </span>
                          <span className="text-xl font-bold text-accent">
                            {formatPrice(
                              projectConfig.paymentPlan === "full"
                                ? calculateConfiguredPrice() * 0.9 // 10% discount for full payment
                                : calculateConfiguredPrice() / 3
                            )}
                          </span>
                        </div>
                        {projectConfig.paymentPlan === "installments" && (
                          <div className="text-sm text-gray-400 text-right mt-1">
                            Followed by 2 payments of{" "}
                            {formatPrice(calculateConfiguredPrice() / 3)}
                          </div>
                        )}
                        {projectConfig.paymentPlan === "full" && (
                          <div className="text-sm text-gray-400 text-right mt-1">
                            10% discount applied
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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

          {/* Step 4: Secure Checkout - Core Drive 6: Scarcity & Core Drive 8: Loss Avoidance */}
          {currentStep === "checkout" && selectedService && (
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Final Summary */}
              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8">
                <h3 className="text-2xl font-bold text-accent mb-6">
                  Project Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Service Package</span>
                    <span className="font-medium text-accent">
                      {selectedService.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Domain</span>
                    <span className="font-medium text-accent">
                      {projectConfig.domain === "existing"
                        ? "Using existing domain"
                        : "New domain included"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Payment Plan</span>
                    <span className="font-medium text-accent">
                      {projectConfig.paymentPlan === "full"
                        ? "Full Payment (10% savings)"
                        : "3-Month Installments"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Business</span>
                    <span className="font-medium text-accent">
                      {projectBrief.businessName}
                    </span>
                  </div>
                </div>

                <div className="border-t border-accent/20 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-accent">
                      {projectConfig.paymentPlan === "full"
                        ? "Total Investment"
                        : "First Payment"}
                    </span>
                    <span className="text-2xl font-bold text-accent">
                      {formatPrice(
                        projectConfig.paymentPlan === "full"
                          ? calculateConfiguredPrice() * 0.9
                          : calculateConfiguredPrice() / 3
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Urgency & Trust Signals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-brown/10 rounded-xl p-6 border border-brown/20">
                  <h4 className="font-medium text-brown mb-3">
                    Secure Your Slot
                  </h4>
                  <p className="text-sm text-gray-300">
                    By completing your booking, you&apos;re securing your slot
                    in our project schedule. We typically book out 2-3 weeks in
                    advance.
                  </p>
                </div>

                <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-medium text-accent mb-3">
                    Don&apos;t Let Customers Slip Away
                  </h4>
                  <p className="text-sm text-gray-300">
                    You&apos;re one step away from a professional website that
                    works. Don&apos;t let another customer choose your
                    competitor.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8">
                <h3 className="text-xl font-bold text-accent mb-6">
                  Contact Information
                </h3>

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
          {currentStep !== "discovery" && (
            <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
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

              {currentStep === "checkout" ? (
                <button
                  onClick={handleSubmit}
                  disabled={
                    !contactInfo.name ||
                    !contactInfo.email ||
                    !projectBrief.businessName
                  }
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    !contactInfo.name ||
                    !contactInfo.email ||
                    !projectBrief.businessName
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-accent to-accent/80 text-olive hover:shadow-lg hover:shadow-accent/30 transform hover:scale-105"
                  }`}
                >
                  🔒 Proceed to Secure Payment
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === "starter" && !selectedService) ||
                    (currentStep === "configurator" &&
                      (!projectConfig.domain || !projectConfig.paymentPlan)) ||
                    (currentStep === "brief" &&
                      (!projectBrief.businessName ||
                        !projectBrief.businessDescription ||
                        !projectBrief.mainGoal))
                  }
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                    (currentStep === "starter" && !selectedService) ||
                    (currentStep === "configurator" &&
                      (!projectConfig.domain || !projectConfig.paymentPlan)) ||
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
                    : "Continue to Checkout"}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
