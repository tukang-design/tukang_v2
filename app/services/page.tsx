"use client";
import React from "react";

// Note: Since this is a client component, metadata should be handled in layout.tsx or parent server component
// For analytics tracking, the page title is "Services - Web Design & Development"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-olive">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-accent font-mono leading-tight">
              End-to-End
              <br />
              <span className="text-white">Design & Development.</span>
            </h2>

            <h4 className="text-lg lg:text-xl mb-8 text-brown max-w-5xl mx-auto leading-relaxed">
              A seamless, unified process for building websites that are as
              technically sound as they are beautiful.
            </h4>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {/* Core Solution Areas Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Solution Areas Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Solution Area 1: Lead Generation */}
          <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-accent"
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
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-1">
                    Lead Generation Landing Page
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                We build strategic websites designed to convert your visitors
                into high-quality inquiries and scheduled calls for your service
                business.
              </p>
              <p className="text-brown text-xl font-semibold">
                Price starts from RM1,500
              </p>
            </div>

            <div className="mb-6 flex-grow">
              <h4 className="text-lg font-semibold text-white mb-4">
                Common Features:
              </h4>
              <div className="space-y-3 mb-6">
                {[
                  "Compelling Landing Pages",
                  "Advanced, Multi-Step Contact Forms",
                  "Discovery Call Scheduling Integration",
                  "Email Auto-Reply Automation",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                <span className="text-white font-semibold">Perfect for:</span>{" "}
                Service-based businesses, consultants, B2B companies, and anyone
                who needs to convert visitors into qualified inquiries.
              </p>
            </div>
          </div>

          {/* Solution Area 2: E-commerce */}
          <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 relative flex flex-col h-full">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 hidden">
              <div className="bg-accent text-olive px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-accent"
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
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-1">
                    Professional Business Website
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                We build secure and intuitive online stores that drive sales and
                make the buying process a seamless experience for your
                customers.
              </p>
              <p className="text-brown text-xl font-semibold">
                Price starts from RM3,000
              </p>
            </div>

            <div className="mb-6 flex-grow">
              <h4 className="text-lg font-semibold text-white mb-4">
                Common Features:
              </h4>
              <div className="space-y-3 mb-6">
                {[
                  "Full Product Catalogs & Management",
                  "Secure Payment Gateway Integration",
                  "Shopping Cart & Checkout Systems",
                  "Customer Account & Membership Portals",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-white font-semibold">Perfect for:</span>{" "}
                Businesses ready to sell products online, from a small boutique
                to a large-scale catalog.
              </p>
            </div>
          </div>

          {/* Solution Area 3: Content & Community */}
          <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mr-4">
                  <svg
                    className="w-8 h-8 text-accent"
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
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-1">
                    Custom Web Platforms
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                For bigger ideas, we build robust platforms with advanced
                features like custom CMS, booking systems, or membership
                portals.
              </p>
              <p className="text-brown text-xl font-semibold">
                Price starts from RM5,000
              </p>
            </div>

            <div className="mb-4 flex-grow">
              <h4 className="text-lg font-semibold text-white mb-4">
                Common Features:
              </h4>
              <div className="space-y-3 mb-6">
                {[
                  "Custom Content Management System (CMS)",
                  "Advanced Blog with Categories & Tags",
                  "Secure, Members-Only Content Areas",
                  "Community & Engagement Tools",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-white font-semibold">Perfect for:</span>{" "}
                Creators, educators, and organizations who want to publish
                content and build a loyal audience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
