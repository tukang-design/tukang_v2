"use client";
import React from "react";
import { PrimaryCTA } from "../components/CTAButton";

// Note: Since this is a client component, metadata should be handled in layout.tsx or parent server component
// For analytics tracking, the page title is "Services - Web Design & Development"

export default function ServicesPage() {
  const [selected, setSelected] = React.useState<
    "landing" | "business" | "advanced" | null
  >(null);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-olive-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-slate-500 blur-3xl motion-safe:animate-pulse" />
          <div className="absolute -bottom-36 -left-36 w-[400px] h-[400px] rounded-full bg-brown-900 blur-3xl motion-safe:animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-brown-500 font-mono mb-8">
            Web Design & Development for Business Objectives
          </h1>

          <h4 className="max-w-4xl text-slate-300 text-lg lg:text-xl mb-8 ml-0 mx-auto">
            We build custom digital solutions based on defined operational
            goals.
          </h4>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {/* Step 1: Goal & Tier Selection */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 bg-background">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Service Tiers
        </h2>
        <p className="text-gray-300 mb-8">
          Choose the tier that best describes your project scope to proceed to
          the cost estimator.
        </p>
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Tier 1: Landing */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelected("landing")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected("landing");
              }
            }}
            className={`text-left bg-olive-950 p-8 rounded-2xl border ${
              selected === "landing"
                ? "border-olive-700 shadow-xl"
                : "border-accent/20"
            } transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer flex flex-col h-full`}
            aria-pressed={selected === "landing"}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-brown-400/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-brown-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="flex items-center mb-2">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-brown-400">
                    High-Performance Landing Page
                  </h3>
                </div>
              </div>
              <p className="text-slate-300 text-md leading-relaxed mb-6">
                This tier is focused on conversion efficiency. It is designed to
                receive targeted traffic from marketing campaigns and guide
                visitors toward a single, specific action (e.g., lead capture,
                pre-order, or direct sale).
              </p>
            </div>

            <div className="mb-6 flex-grow">
              <h4 className="text-lg font-semibold text-slate-200 mb-4">
                Core Functionality
              </h4>
              <div className="space-y-3 mb-6">
                {[
                  "Presents all information clearly on a single page to guide user focus.",
                  "Captures customer leads through integrated contact or sign-up forms.",
                  "Enables testing of different headlines and layouts to improve results.",
                ].map((feature, index) => (
                  <div key={index} className="flex items-top">
                    <div className="py-[0.1rem] px-[0.35rem] h-fit min-w-min bg-accent/10 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-olive-900 px-4 py-2 rounded-md flex items-center gap-4 justify-between">
              <p className="text-slate-300 text-xs">
                Price starts from <br />
                <span className="text-accent/50 text-lg">
                  RM1,000 - RM2,000
                </span>
              </p>
              <div className="w-fit mt-1 text-xs text-brown-400 py-1 px-4 bg-brown-400/10 rounded-full">
                Live in 7 days
              </div>
            </div>
            {/* CTA moved to sticky bottom action bar */}
          </div>

          {/* Solution Area 2: E-commerce */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelected("business")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected("business");
              }
            }}
            className={`text-left bg-olive-950 p-8 rounded-2xl border ${
              selected === "business"
                ? "border-olive-700 shadow-xl"
                : "border-accent/20"
            } transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer relative flex flex-col h-full`}
            aria-pressed={selected === "business"}
          >
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 hidden">
              <div className="bg-accent text-olive px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
            </div>

            <div className="mb-6">
              <div className="w-16 h-16 bg-brown-400/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-brown-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <div className="flex items-center mb-2">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-brown-400">
                    Professional Business Website
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                To establish your company's core digital presence and build
                market credibility. This solution organizes information,
                showcases capabilities, and acts as the central point of
                verification for potential clients, partners, and stakeholders.
              </p>
            </div>

            <div className="mb-6 flex-grow">
              <h4 className="text-lg font-semibold text-white mb-4">
                Core Functionality
              </h4>
              <div className="space-y-3 mb-6">
                {[
                  "Builds credibility with a professional multi-page layout (Home, Services, etc.).",
                  "Allows you to easily update website text and images yourself via an editor.",
                  "Provides a foundation for long-term growth through blog and SEO features.",
                ].map((feature, index) => (
                  <div key={index} className="flex items-top">
                    <div className="py-[0.1rem] px-[0.35rem] h-fit min-w-min bg-accent/10 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-olive-900 px-4 py-2 rounded-md flex items-center gap-4 justify-between">
              <p className="text-slate-300 text-xs">
                Price starts from <br />
                <span className="text-accent/50 text-lg">
                  RM2,500 - RM5,000
                </span>
              </p>
            </div>
            {/* CTA moved to sticky bottom action bar */}
          </div>

          {/* Solution Area 3: Content & Community */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelected("advanced")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected("advanced");
              }
            }}
            className={`text-left bg-olive-950 p-8 rounded-2xl border ${
              selected === "advanced"
                ? "border-olive-700 shadow-xl"
                : "border-accent/20"
            } transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer flex flex-col h-full`}
            aria-pressed={selected === "advanced"}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-brown-400/10 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-brown-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="flex items-center mb-2">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-brown-400">
                    Custom Web System
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                To solve complex operational challenges through custom-built
                software. This tier addresses issues where standard platforms
                fail, such as managing large inventories, automating internal
                workflows, or handling sophisticated user data.
              </p>
            </div>

            <div className="mb-4 flex-grow">
              <h4 className="text-lg font-semibold text-white mb-4">
                Core Functionality
              </h4>
              <div className="space-y-3 mb-6">
                {[
                  "Enables online sales with a secure shopping cart and payment processing.",
                  "Automates inventory tracking to prevent overselling and manual data entry.",
                  "Provides secure customer accounts for order history and profile management.",
                  "Automates repetitive tasks by connecting the site to your other business software.",
                ].map((feature, index) => (
                  <div key={index} className="flex items-top">
                    <div className="py-[0.1rem] px-[0.35rem] h-fit min-w-min bg-accent/10 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-olive-900 px-4 py-2 rounded-md flex items-center gap-4 justify-between">
              <p className="text-slate-300 text-xs">
                Price starts from <br />
                <span className="text-accent/50 text-lg">RM5,000 ++</span>
              </p>
            </div>
            {/* CTA moved to sticky bottom action bar */}
          </div>
        </div>
        {/* Sticky bottom action bar appears when a tier is selected */}
      </section>

      {selected ? (
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="max-w-7xl w-full px-6 sm:px-8">
            <div className="bg-olive-950/95 backdrop-blur-sm border border-accent/10 rounded-xl px-6 py-4 flex items-center justify-between shadow-xl pointer-events-auto">
              <div>
                <div className="text-sm text-slate-300">Selected tier</div>
                <div className="text-lg font-semibold text-white">
                  {selected === "landing"
                    ? "High-Performance Landing Page"
                    : selected === "business"
                    ? "Professional Business Website"
                    : "Custom Web System"}
                </div>
                <div className="text-sm text-slate-300">
                  {selected === "landing"
                    ? "RM1,000 - RM2,000"
                    : selected === "business"
                    ? "RM2,500 - RM5,000"
                    : "RM5,000 ++"}
                </div>
              </div>

              <div className="ml-6 flex-shrink-0">
                <PrimaryCTA href={`/planner?tier=${selected}`}>
                  Start Estimate
                </PrimaryCTA>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
