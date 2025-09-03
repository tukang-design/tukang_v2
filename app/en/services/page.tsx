// ...existing code...
"use client";
import React from "react";
import RegionSelector, {
  getRegionDetails,
} from "../components/region-selector";
import { useState } from "react";
import {
  PrimaryCTA,
  SecondaryCTA,
  ArrowRightIcon,
} from "../../components/CTAButton";
import ContactSection from "../../components/ContactSection";

export default function ServicesPage() {
  const [region, setRegion] = useState("INT"); // Default to international while detecting
  const regionDetails = getRegionDetails(region);

  // Package pricing based on region (V2 Recalibrated)
  const packagePricing = {
    landing: {
      MY: 999,
      SG: 599,
      INT: 499,
    },
    business: {
      MY: 1899,
      SG: 1199,
      INT: 999,
    },
    // 3-month installment options
    landingInstallment: {
      MY: 333,
      SG: 199,
      INT: 169,
    },
    businessInstallment: {
      MY: 633,
      SG: 399,
      INT: 339,
    },
  };

  return (
    <div className="min-h-screen bg-olive">
      {/* REGION DETECTION - Hidden, automatic */}
      <RegionSelector onChange={setRegion} showSelector={false} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-8 text-accent font-mono leading-tight">
              One Team.
              <br />
              <span className="text-white">One Seamless Process.</span>
            </h1>

            <h2 className="text-lg lg:text-xl mb-6 text-brown max-w-4xl mx-auto leading-relaxed">
              As a team of Full-Stack experts, we personally manage your entire
              project from the first strategic sketch to the final line of code.
            </h2>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {/* Core Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h4 className="text-2xl lg:text-3xl font-bold mb-8 text-white font-mono">
            Our Core Packages
          </h4>
        </div>

        {/* Package Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Package 1: Landing Page */}
          <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-white mb-2">
                The Landing Page
              </h4>
              <div className="text-xl font-bold text-accent mb-2">
                {regionDetails.symbol}
                {
                  packagePricing.landing[
                    region as keyof typeof packagePricing.landing
                  ]
                }{" "}
                <span className="text-lg text-gray-300">one-time</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                or {regionDetails.symbol}
                {
                  packagePricing.landingInstallment[
                    region as keyof typeof packagePricing.landingInstallment
                  ]
                }{" "}
                × 3 months
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xl text-white mb-6 font-medium">
                A single, focused page built to achieve one specific business
                goal.
              </p>
            </div>

            <div className="space-y-3 mb-8 flex-grow">
              {[
                "End-to-End Design & Development",
                "Custom Single-Page UI/UX Design",
                "Mobile-Responsive Development",
                "Lead Capture Form & WhatsApp Link",
                "Basic SEO & Analytics Setup",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                    <span className="text-accent font-bold text-sm">✓</span>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 px-5 py-4 bg-white/5 rounded-lg">
              <p className="text-gray-300 font-medium mb-4">
                <span className="text-white font-semibold">Best For:</span>{" "}
                High-impact marketing campaigns, new product launches, or a
                powerful "digital name card" designed to convert visitors.
              </p>
              <p className="text-sm text-gray-300">
                ⏱️ Live within{" "}
                <span className="text-accent font-semibold px-1">
                  3-5 Business Days
                </span>
              </p>
            </div>

            <SecondaryCTA href="/en/contact" className="w-full mt-auto">
              Start My Project
            </SecondaryCTA>
          </div>

          {/* Package 2: Business Website - Most Popular */}
          <div className="bg-olive-dark/50 border-2 border-accent rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 relative flex flex-col h-full">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-accent text-olive px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-2xl font-bold text-white mb-2">
                The Business Website
              </h4>
              <div className="text-xl font-bold text-accent mb-2">
                {regionDetails.symbol}
                {
                  packagePricing.business[
                    region as keyof typeof packagePricing.business
                  ]
                }{" "}
                <span className="text-lg text-gray-300">one-time</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                or {regionDetails.symbol}
                {
                  packagePricing.businessInstallment[
                    region as keyof typeof packagePricing.businessInstallment
                  ]
                }{" "}
                × 3 months
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xl text-white mb-6">
                A multi-page website that functions as your 24/7 digital
                storefront.
              </p>
            </div>

            <div className="space-y-3 mb-8 flex-grow">
              {[
                "End-to-End Design & Development",
                "Up to 5 Custom-Designed Pages",
                "Mobile-Responsive Development",
                "On-Page SEO Foundation",
                "Google Analytics Setup",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                    <span className="text-accent font-bold text-sm">✓</span>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 px-5 py-4 bg-white/5 rounded-lg">
              <p className="text-gray-300 font-medium mb-4">
                <span className="text-white font-semibold">Best For:</span> SMEs
                and startups needing a complete, credible online presence to
                build trust and showcase their full range of services.
              </p>
              <p className="text-sm text-gray-300">
                ⏱️ Live within{" "}
                <span className="text-accent font-semibold px-1">
                  7-10 Business Days
                </span>
              </p>
            </div>

            <PrimaryCTA
              href="/en/booking?package=business-website"
              className="w-full mt-auto"
            >
              Start My Project
            </PrimaryCTA>
          </div>

          {/* Package 3: Advanced System */}
          <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-white mb-2">
                The Advanced System
              </h4>
              <div className="text-xl font-bold text-accent mb-2">
                Custom Quote
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Typically starts from {region === "MY" && "RM 5,000"}
                {region === "SG" && "SGD 4,500"}
                {region === "INT" && "€5,500"}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xl text-gray-300 mb-6">
                We partner with you to design and develop a sophisticated web
                platform that meets your unique operational needs.
              </p>
            </div>

            <div className="space-y-3 mb-8 flex-grow">
              {[
                "Full E-commerce Functionality",
                "Custom CMS Development",
                "Booking & Appointment Systems",
                "Interactive 3D Model Integration",
                "Advanced API Integrations",
                "And much more...",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                    <span className="text-accent font-bold text-sm">✓</span>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 px-5 py-4 bg-white/5 rounded-lg">
              <p className="text-gray-300 font-medium mb-4">
                <span className="text-white font-semibold">Best For:</span>{" "}
                Businesses requiring complex, tailor-made functionality such as
                e-commerce, booking systems, or custom web applications.
              </p>
            </div>

            <SecondaryCTA href="/en/contact" className="w-full mt-auto">
              Book a Discovery Call
            </SecondaryCTA>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-accent font-mono">
              Need Something More? Popular Add-ons
            </h3>
            <p className="text-lg text-gray-300">
              We can enhance any package with additional features to perfectly
              match your project requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 text-center">
            {[
              {
                title: "Additional Website Pages",
                description: "For when you need to expand your site's content.",
              },
              {
                title: "Advanced Contact Forms",
                description:
                  "Multi-step forms, conditional logic, and file uploads.",
              },
              {
                title: "Email Auto-Reply Automation",
                description:
                  "Professional, automated responses for your contact forms.",
              },
              {
                title: "Blog / News Section Setup",
                description:
                  "A fully functional blog integrated into your website.",
              },
              {
                title: "Ongoing Website Maintenance",
                description:
                  "Monthly retainers for peace of mind, covering updates, security, and support.",
              },
            ].map((addon, index) => (
              <div
                key={index}
                className="bg-olive-dark/30 border border-brown/30 rounded-xl p-6"
              >
                <h4 className="text-lg font-bold text-brown mb-2">
                  {addon.title}
                </h4>
                <p className="text-gray-300 text-sm">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT SECTION */}
        <ContactSection variant="compact" className="mt-20" />
      </section>

      {/* Bottom section with region info */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <span className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse"></span>
              <span className="text-accent text-sm font-medium">
                Pricing shown in {regionDetails.currency} for{" "}
                {regionDetails.label}
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              All proposals and invoices issued in your local currency (MYR,
              SGD, or EUR). Stripe payments accepted.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
