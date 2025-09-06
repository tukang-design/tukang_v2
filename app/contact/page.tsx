// Enhanced Contact Page with Modern Design
"use client";
import React from "react";
import Link from "next/link";
import RegionSelector, {
  getRegionDetails,
} from "../components/region-selector";
import { useState } from "react";
import { PrimaryCTA, SecondaryCTA } from "../components/CTAButton";

export default function ContactPage() {
  const [region, setRegion] = useState<"MY" | "SG" | "INT">("INT");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const regionDetails = getRegionDetails(region);

  type ContactForm = {
    name: string;
    email: string;
    message: string;
    region: "MY" | "SG" | "INT";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };

    const data: ContactForm = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
      region,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setShowSuccessModal(true);
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-olive">
      <RegionSelector onChange={setRegion} showSelector={false} />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-olive-dark via-olive to-olive-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-accent font-mono mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to start your project? Have questions about our services?
              We&apos;d love to hear from you.
            </p>
            <div className="mt-6 text-center text-lg font-semibold text-accent">
              You see rates in {regionDetails.symbol}. For custom quotes, see
              our Services page.
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Options */}
      <section className="py-20 bg-olive-dark/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-olive-dark/50 rounded-2xl p-8 border border-brown/30">
              <h2 className="text-3xl font-bold text-accent font-mono mb-6">
                Send us a Message
              </h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white font-semibold mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-olive border border-brown/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-semibold mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-olive border border-brown/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-semibold mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full bg-olive border border-brown/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                    placeholder="Tell us about your project, questions, or how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-olive font-bold py-4 px-6 rounded-lg hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Quick Actions & Contact Info */}
            <div className="space-y-8">
              {/* Quick Start Options */}
              <div className="bg-olive-dark/50 rounded-2xl p-8 border border-brown/30">
                <h3 className="text-2xl font-bold text-accent font-mono mb-6">
                  Quick Start Options
                </h3>

                <div className="space-y-4">
                  <PrimaryCTA
                    href="/booking"
                    className="w-full"
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4V3a2 2 0 012-2h4a2 2 0 012 2v4M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  >
                    Start a Project
                  </PrimaryCTA>

                  <SecondaryCTA
                    href="https://calendar.app.google/SrBsskVewCfjWUv16"
                    external
                    className="w-full"
                    icon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4V3a2 2 0 012-2h4a2 2 0 012 2v4M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  >
                    Book Discovery Call
                  </SecondaryCTA>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-olive-dark/50 rounded-2xl p-8 border border-brown/30">
                <h3 className="text-2xl font-bold text-accent font-mono mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <a
                        href="mailto:hello@tukangdesign.com"
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        hello@tukangdesign.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">WhatsApp</p>
                      <a
                        href="https://wa.me/60174062788"
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        +60 17-406 2788
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Response Time</p>
                      <p className="text-gray-300">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="bg-olive-dark/50 rounded-2xl p-8 border border-brown/30">
                <h3 className="text-2xl font-bold text-accent font-mono mb-6">
                  Common Questions
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      How long does a project take?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Landing pages: 3-5 days. Business websites: 1-2 weeks.
                      Custom systems: 2-8 weeks.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Do you offer revisions?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Yes! All packages include 2 rounds of revisions to ensure
                      you&apos;re 100% satisfied.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      What&apos;s included in support?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      30 days of free post-launch support for bug fixes and
                      minor adjustments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-olive-dark rounded-2xl p-8 max-w-md w-full mx-4 border border-accent/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">Message Sent!</h3>
              <p className="text-gray-300 mb-6">
                Thank you for reaching out! We&apos;ve received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-accent text-olive font-semibold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
