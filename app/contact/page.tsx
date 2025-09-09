// Enhanced Contact Page with Modern Design
"use client";
import RegionSelector, {
  getRegionDetails,
} from "../components/region-selector";
import { useState } from "react";
import { SecondaryCTA, WhatsAppCTA } from "../components/CTAButton";

export default function ContactPage() {
  const [region, setRegion] = useState<"MY" | "SG" | "INT">("INT");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Message sent successfully!");
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-olive">
      <RegionSelector onChange={setRegion} showSelector={false} />

      {/* Hero Section */}
      <section className="py-20 bg-olive">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-accent font-mono mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Not ready to decide yet or still figuring things out? Have
              questions about our services? We'd love to hear from you.
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
            <div className="card">
              <h2 className="text-3xl font-bold text-accent font-mono mb-6">
                Send us a Message
              </h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you within 24
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
                    aria-required="true"
                    className="w-full bg-olive border border-brown-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors focus-ring"
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
                    aria-required="true"
                    className="w-full bg-olive border border-brown-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors focus-ring"
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
                    aria-required="true"
                    className="w-full bg-olive border border-brown-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none focus-ring"
                    placeholder="Tell us about your project, questions, or how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-olive font-bold py-4 px-6 rounded-lg hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg focus-ring"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Quick Actions & Contact Info */}
            <div className="space-y-8">
              {/* Quick Start Options */}
              <div className="card">
                <h3 className="text-2xl font-bold text-accent font-mono mb-6">
                  Quick Start Options
                </h3>

                <div className="space-y-4">
                  <SecondaryCTA
                    href="/services"
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
                    Explore Services
                  </SecondaryCTA>

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

                  <WhatsAppCTA
                    href="https://wa.me/601126472187"
                    external
                    className="w-full"
                    icon={
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.52 3.48A11.78 11.78 0 0012.02 0C5.46 0 .2 5.26.2 11.74c0 2.07.54 4.09 1.57 5.88L0 24l6.55-1.72a11.7 11.7 0 005.47 1.39h.01c6.55 0 11.82-5.26 11.82-11.74 0-3.14-1.23-6.08-3.33-8.28zM12.03 21.2h-.01a9.44 9.44 0 01-4.81-1.32l-.34-.2-3.89 1.02 1.04-3.79-.22-.35a9.38 9.38 0 01-1.47-5.09c0-5.19 4.24-9.42 9.45-9.42 2.52 0 4.89.98 6.68 2.76 1.78 1.78 2.76 4.15 2.76 6.66 0 5.19-4.24 9.42-9.45 9.42zm5.49-7.08c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.36.22-.66.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.34.45-.5.15-.17.2-.28.3-.48.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.94-2.24-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.52.07-.8.37-.28.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.48.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.43.25-.71.25-1.32.17-1.43-.07-.11-.27-.18-.57-.33z" />
                      </svg>
                    }
                  >
                    WhatsApp Us
                  </WhatsAppCTA>
                </div>
              </div>

              {/* Contact Information */}
              <div className="card">
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
              <div className="bg-olive-dark/50 rounded-2xl p-8 border border-brown-500/30">
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
                      you're 100% satisfied.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      What's included in support?
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
    </div>
  );
}
