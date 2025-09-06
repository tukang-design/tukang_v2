// ...existing code...
"use client";
import React from "react";
import { PrimaryCTA } from "../../components/CTAButton";
import ContactSection from "../../components/ContactSection";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-olive">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 text-accent font-mono leading-tight">
              We Don&apos;t Just Build Websites.
              <br />
              <span className="text-white">We Build Business Solutions.</span>
            </h1>

            <h2 className="text-lg lg:text-xl mb-8 text-brown max-w-5xl mx-auto leading-relaxed">
              Our end-to-end process is designed to translate your specific business goals 
              into a high-performance, custom-built website that delivers tangible results.
            </h2>

            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Every business is unique. That&apos;s why we&apos;ve moved beyond rigid packages to offer 
              solutions tailored to your primary objectives. Whether you&apos;re looking to generate 
              leads, sell products online, or streamline your operations, we have the expertise 
              to build the exact digital tool you need. Explore our core solution areas below, 
              and when you&apos;re ready, start building your project with our Guided Project Builder.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {/* Core Solution Areas Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white font-mono">
            Our Core Solution Areas
          </h2>
        </div>

        {/* Solution Areas Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          
          {/* Solution Area 1: Lead Generation */}
          <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">
                Websites for Lead Generation
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                <span className="text-white font-semibold">Perfect for:</span> Service-based businesses, 
                consultants, B2B companies, and anyone who needs to convert visitors into qualified inquiries.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We build websites strategically designed to capture attention and guide visitors 
                toward a single action: contacting you.
              </p>
            </div>

            <div className="mb-8 flex-grow">
              <h4 className="text-lg font-semibold text-white mb-4">Common Features:</h4>
              <div className="space-y-3">
                {[
                  "Compelling Landing Pages",
                  "Advanced, Multi-Step Contact Forms", 
                  "Discovery Call Scheduling Integration",
                  "Email Auto-Reply Automation"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Area 2: E-commerce */}
          <div className="bg-olive-dark/50 border-2 border-accent rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 relative flex flex-col h-full">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-accent text-olive px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
            </div>

            <div className="mb-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">
                Websites for E-commerce
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                <span className="text-white font-semibold">Perfect for:</span> Businesses ready to sell 
                products online, from a small boutique to a large-scale catalog.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We build secure, user-friendly online stores that make browsing and buying 
                a seamless experience for your customers.
              </p>
            </div>

            <div className="mb-8 flex-grow">
              <h4 className="text-lg font-semibold text-white mb-4">Common Features:</h4>
              <div className="space-y-3">
                {[
                  "Full Product Catalogs & Management",
                  "Secure Payment Gateway Integration",
                  "Shopping Cart & Checkout Systems", 
                  "Customer Account & Membership Portals"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Area 3: Content & Community */}
          <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">
                Websites for Content & Community
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                <span className="text-white font-semibold">Perfect for:</span> Creators, educators, 
                and organizations who want to publish content and build a loyal audience.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We build robust platforms that make it easy for you to manage and share your content, 
                from a simple blog to a full membership site.
              </p>
            </div>

            <div className="mb-8 flex-grow">
              <h4 className="text-lg font-semibold text-white mb-4">Common Features:</h4>
              <div className="space-y-3">
                {[
                  "Custom Content Management System (CMS)",
                  "Advanced Blog with Categories & Tags",
                  "Secure, Members-Only Content Areas",
                  "Community & Engagement Tools"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-accent/20 rounded flex items-center justify-center mr-3">
                      <span className="text-accent font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-olive-dark/30 rounded-3xl p-12 border border-accent/20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-accent font-mono">
            Ready to Build Your Custom Solution?
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Our Guided Project Builder is the best way to get started. In just a few minutes, 
            you can outline your goals, select the features you need, and receive a detailed, 
            transparent quote directly in your inbox. It&apos;s the first step to bringing your vision to life.
          </p>

          <PrimaryCTA
            href="/en/booking"
            className="text-lg px-10 py-4"
          >
            Start Building Your Project →
          </PrimaryCTA>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactSection variant="compact" className="mt-20" />
    </div>
  );
}" "}
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

            <SecondaryCTA href="/en/booking" className="w-full mt-auto">
              Start Project
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

            <PrimaryCTA href="/en/booking" className="w-full mt-auto">
              Start Project
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

            <SecondaryCTA
              href="https://calendar.app.google/SrBsskVewCfjWUv16"
              external
              className="w-full mt-auto"
            >
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
    </div>
  );
}
