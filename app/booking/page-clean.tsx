"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  mainGoal: string;
};

type ContactInfo = {
  name: string;
  email: string;
  company: string;
  phone: string;
};

type BookingStep = "goals" | "features" | "brief" | "contact" | "discovery";

type UserRegion = "MY" | "USD";

// Project goals data
const projectGoals: ProjectGoal[] = [
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
];

// Additional features
const additionalFeatures: AdditionalFeature[] = [
  {
    id: "custom-logo",
    name: "Custom Logo Design",
    description: "Professional logo design tailored to your brand",
    price: { MY: 350, USD: 120 },
    complexity: "Intermediate",
    estimatedHours: 8,
  },
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
    id: "advanced-analytics",
    name: "Advanced Analytics Setup",
    description: "Detailed tracking and reporting dashboard",
    price: { MY: 450, USD: 150 },
    complexity: "Advanced",
    estimatedHours: 12,
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
      } catch (error) {
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

  const nextStep = () => {
    const steps: BookingStep[] = ["goals", "features", "brief", "contact"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: BookingStep[] = ["goals", "features", "brief", "contact"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    try {
      const bookingData = {
        selectedGoals,
        selectedFeatures,
        projectBrief,
        contactInfo,
        selectedRegion,
        totalPrice: calculateTotal(),
      };

      const response = await fetch("/api/booking/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        router.push("/booking-success");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
    }
  };

  const handleAdvancedRequest = () => {
    setCurrentStep("discovery");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
            Let's Build Your Digital Presence
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your goals, and we'll create a custom solution that
            drives results for your business.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-center space-x-4 mb-4">
            {["goals", "features", "brief", "contact"].map((step, index) => (
              <div
                key={step}
                className={`w-4 h-4 rounded-full ${
                  ["goals", "features", "brief", "contact"].indexOf(
                    currentStep
                  ) >= index
                    ? "bg-accent"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-400 capitalize">
            Step{" "}
            {["goals", "features", "brief", "contact"].indexOf(currentStep) + 1}{" "}
            of 4: {currentStep}
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

            {/* Display goals as vertical list cards */}
            <div className="space-y-6">
              {projectGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`p-8 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    selectedGoals.includes(goal.id)
                      ? "bg-accent/10 border-accent text-accent"
                      : "bg-olive-dark/50 border-accent/20 text-gray-300 hover:bg-accent/5 hover:border-accent/40"
                  }`}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4">{goal.icon}</span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {goal.title}
                            {goal.popular && (
                              <span className="ml-2 px-2 py-1 text-xs bg-accent text-olive rounded-full">
                                Most Popular
                              </span>
                            )}
                          </h3>
                          <p className="text-sm opacity-80 mb-4">
                            {goal.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-accent/20 pt-4">
                        <h4 className="text-sm font-semibold mb-3 opacity-90">
                          Included Features:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {goal.features.map((feature) => (
                            <div key={feature.id} className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-accent"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm">{feature.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 text-right flex flex-col items-end">
                      <div className="text-lg font-bold">
                        {formatPrice(goal.basePrice[selectedRegion])}
                      </div>
                      <div className="text-xs opacity-60 mb-4">
                        avg estimate
                      </div>
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedGoals.includes(goal.id)
                            ? "bg-accent border-accent"
                            : "border-gray-400"
                        }`}
                      >
                        {selectedGoals.includes(goal.id) && (
                          <svg
                            className="w-3 h-3 text-olive"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Advanced Project Option */}
            <div className="mt-8 p-6 bg-olive-dark/30 border border-accent/20 rounded-xl text-center">
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

            {/* Navigation */}
            <div className="flex justify-end mt-8">
              <button
                onClick={nextStep}
                disabled={selectedGoals.length === 0}
                className="px-8 py-3 bg-accent text-olive font-semibold rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Additional Features
              </button>
            </div>
          </div>
        )}

        {/* Features Step */}
        {currentStep === "features" && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
              <p className="text-gray-300">
                Enhance your project with these optional features
              </p>
            </div>

            {/* 3-column layout for add-ons */}
            <div className="space-y-4">
              {additionalFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-xl border transition-all duration-300 ${
                    selectedFeatures.includes(feature.id)
                      ? "bg-accent/10 border-accent"
                      : "bg-olive-dark/50 border-accent/20 hover:bg-accent/5 hover:border-accent/40"
                  }`}
                >
                  {/* Column 1: Title and Description */}
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {feature.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-lg font-bold text-accent">
                        {formatPrice(feature.price[selectedRegion])}
                      </span>
                    </div>
                  </div>

                  {/* Column 2: Complexity */}
                  <div className="md:col-span-1 flex items-center">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Complexity
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          feature.complexity === "Basic"
                            ? "bg-green-500/20 text-green-400"
                            : feature.complexity === "Intermediate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {feature.complexity}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        ~{feature.estimatedHours} hours
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Checkbox */}
                  <div className="md:col-span-1 flex items-center justify-end">
                    <button
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        selectedFeatures.includes(feature.id)
                          ? "bg-accent border-accent"
                          : "border-gray-400 hover:border-accent"
                      }`}
                    >
                      {selectedFeatures.includes(feature.id) && (
                        <svg
                          className="w-4 h-4 text-olive"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-accent text-olive font-semibold rounded-lg hover:bg-accent/90 transition-all"
              >
                Continue to Project Brief
              </button>
            </div>
          </div>
        )}

        {/* Brief Step */}
        {currentStep === "brief" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Tell us about your project
              </h2>
              <p className="text-gray-300">
                Help us understand your business and goals better
              </p>
            </div>

            <div className="space-y-6">
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
                  rows={4}
                  className="w-full p-3 bg-olive-dark/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none resize-none"
                  placeholder="Describe what your business does, your target audience, and what makes you unique"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Primary Goal *
                </label>
                <select
                  value={projectBrief.mainGoal}
                  onChange={(e) =>
                    setProjectBrief({
                      ...projectBrief,
                      mainGoal: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-olive-dark/50 border border-accent/20 rounded-lg text-white focus:border-accent focus:outline-none"
                  required
                >
                  <option value="">Select your main goal</option>
                  {mainGoalOptions.map((goal) => (
                    <option key={goal} value={goal} className="bg-olive-dark">
                      {goal}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={
                  !projectBrief.businessName ||
                  !projectBrief.businessDescription ||
                  !projectBrief.mainGoal
                }
                className="px-8 py-3 bg-accent text-olive font-semibold rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Contact
              </button>
            </div>
          </div>
        )}

        {/* Contact Step */}
        {currentStep === "contact" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Contact Information
                  </h2>
                  <p className="text-gray-300">
                    We'll use this to send you the detailed quotation
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, name: e.target.value })
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
                      className="w-full p-3 bg-olive-dark/50 border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                      placeholder="Your company name"
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

              {/* Summary with blurred pricing */}
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Project Summary</h2>
                </div>

                <div className="bg-olive-dark/50 border border-accent/20 rounded-xl p-6">
                  {/* Selected Goals */}
                  {selectedGoals.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">
                        Selected Goals:
                      </h3>
                      <div className="space-y-2">
                        {selectedGoals.map((goalId) => {
                          const goal = projectGoals.find(
                            (g) => g.id === goalId
                          );
                          return goal ? (
                            <div
                              key={goalId}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm">{goal.title}</span>
                              <div className="blur-sm">
                                <span className="text-accent font-medium">
                                  {formatPrice(goal.basePrice[selectedRegion])}
                                </span>
                              </div>
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
                              <div className="blur-sm">
                                <span className="text-accent font-medium">
                                  {formatPrice(feature.price[selectedRegion])}
                                </span>
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Total (blurred) */}
                  <div className="border-t border-accent/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        Estimated Total:
                      </span>
                      <div className="blur-sm">
                        <span className="text-2xl font-bold text-accent">
                          {formatPrice(calculateTotal())}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Final pricing will be provided in your detailed quotation
                    </p>
                  </div>

                  {/* Project Brief Summary */}
                  {projectBrief.businessName && (
                    <div className="mt-6 pt-4 border-t border-accent/20">
                      <h3 className="text-lg font-semibold mb-3">
                        Business Details:
                      </h3>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p>
                          <strong>Business:</strong> {projectBrief.businessName}
                        </p>
                        <p>
                          <strong>Goal:</strong> {projectBrief.mainGoal}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!contactInfo.name || !contactInfo.email}
                className="px-8 py-3 bg-accent text-olive font-semibold rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit to Get Full Estimation Quotation
              </button>
            </div>
          </div>
        )}

        {/* Discovery Step */}
        {currentStep === "discovery" && (
          <div className="max-w-2xl mx-auto text-center">
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
                href="/schedule-discovery"
                className="inline-block px-8 py-3 bg-accent text-olive font-semibold rounded-lg hover:bg-accent/90 transition-all"
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
