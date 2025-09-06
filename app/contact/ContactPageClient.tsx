// Enhanced Contact Page with Modern Design
"use client";
import React from "react";
import RegionSelector, {
  getRegionDetails,
} from "../components/region-selector";
import { useState } from "react";
import { PrimaryCTA, SecondaryCTA } from "../components/CTAButton";

export default function ContactPageClient() {
  const [region, setRegion] = useState<"MY" | "SG" | "INT">("INT");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
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
    setFormError(null);

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };

    const formData: ContactForm = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
      region,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        // Reset form
        const form = e.target as HTMLFormElement;
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-olive">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-olive-dark rounded-2xl p-8 max-w-md w-full border border-accent/30">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-300 mb-6">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={closeSuccessModal}
                className="w-full bg-accent text-olive-dark font-semibold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-accent font-mono leading-tight">
              Let&apos;s Build Something Amazing Together
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your digital presence? We&apos;d love to hear about your project and discuss how we can help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
            
            {formError && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg">
                <p className="text-red-300">{formError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-olive-dark border border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-olive-dark border border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-olive-dark border border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white placeholder-gray-400 resize-none"
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Location
                </label>
                <RegionSelector region={region} setRegion={setRegion} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-olive-dark font-semibold py-4 px-6 rounded-lg hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20">
              <h3 className="text-xl font-bold text-white mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-accent"
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
                    <p className="text-white font-medium">Email</p>
                    <a
                      href="mailto:studio@tukang.design"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      studio@tukang.design
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Based in</p>
                    <p className="text-gray-300">Malaysia</p>
                    <p className="text-sm text-gray-400">Serving clients globally</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-accent"
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
                    <p className="text-white font-medium">Response Time</p>
                    <p className="text-gray-300">Within 24 hours</p>
                    <p className="text-sm text-gray-400">Monday - Friday</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20">
              <h3 className="text-xl font-bold text-white mb-4">Regional Pricing</h3>
              <p className="text-gray-300 mb-4">
                We adjust our pricing based on your location to ensure fair and accessible rates:
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">🇲🇾 Malaysia</span>
                  <span className="text-accent font-semibold">RM {regionDetails.priceRange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">🇸🇬 Singapore</span>
                  <span className="text-accent font-semibold">SGD {getRegionDetails("SG").priceRange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">🌍 International</span>
                  <span className="text-accent font-semibold">USD {getRegionDetails("INT").priceRange}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                *Starting prices for basic websites. Custom quotes available.
              </p>
            </div>

            {/* Project Process */}
            <div className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20">
              <h3 className="text-xl font-bold text-white mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-accent font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Initial Consultation</h4>
                    <p className="text-gray-300 text-sm">
                      We&apos;ll review your message and schedule a call to discuss your project in detail.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-accent font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Detailed Proposal</h4>
                    <p className="text-gray-300 text-sm">
                      You&apos;ll receive a comprehensive proposal with timeline, deliverables, and pricing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-accent font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Project Kickoff</h4>
                    <p className="text-gray-300 text-sm">
                      Once approved, we&apos;ll begin work on your project with regular updates throughout.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prefer a Quote? */}
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
              <h3 className="text-xl font-bold text-white mb-4">Prefer a Quick Quote?</h3>
              <p className="text-gray-300 mb-6">
                Get an instant quote for your project by filling out our detailed questionnaire. It only takes 5 minutes and you&apos;ll receive a comprehensive proposal immediately.
              </p>
              <PrimaryCTA href="/booking" className="w-full justify-center">
                Get Instant Quote →
              </PrimaryCTA>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
