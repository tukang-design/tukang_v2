"use client";
import RegionSelector from "../components/region-selector";
import { useState } from "react";
import { SecondaryCTA, WhatsAppCTA, PrimaryCTA } from "../components/CTAButton";

export default function ContactPage() {
  const [region, setRegion] = useState<"MY" | "SG" | "INT">("INT");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);
  const [thanks, setThanks] = useState(false);

  type ContactForm = {
    name: string;
    email: string;
    message: string;
    region: "MY" | "SG" | "INT";
    company?: string;
    phone?: string;
    projectType?: string;
    launchDate?: string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
      company?: { value: string };
      phone?: { value: string };
      projectType?: { value: string };
      launchDate?: { value: string };
    };

    const data: ContactForm = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
      region,
      company: target.company?.value || undefined,
      phone: target.phone?.value || undefined,
      projectType: target.projectType?.value || undefined,
      launchDate: target.launchDate?.value || undefined,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Failed to send message");
      }
      setStatus({ type: "success", message: "Message sent successfully." });
      (e.target as HTMLFormElement).reset();
      setThanks(true);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Failed to send message. Please try again in a moment or WhatsApp us.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-olive page-fade">
      <RegionSelector onChange={setRegion} showSelector={false} />

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-10">
            <h1 className="text-4xl lg:text-6xl font-bold text-accent font-mono mb-4">
              Contact Tadal Studio
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Tell us what you want to build. We reply with a plan and a fixed
              quote.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-300">
              <div className="rounded-xl border border-accent/20 bg-olive-950 px-4 py-3">
                Response time: within 1 business day
              </div>
              <div className="rounded-xl border border-accent/20 bg-olive-950 px-4 py-3">
                Hours: Mon–Fri, 10:00–18:00 MYT
              </div>
              <div className="rounded-xl border border-accent/20 bg-olive-950 px-4 py-3">
                Based in: Shah Alam, Malaysia. Working worldwide.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Options */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-8 items-start">
            {/* Contact Form */}
            <div className="rounded-2xl border border-accent/20 bg-olive-950 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-accent font-mono mb-2">
                Contact form
              </h2>
              <p className="text-gray-300 mb-6">
                We only use your details to prepare your plan and quote.
              </p>

              {/* Inline status messages */}
              <div aria-live="polite" className="min-h-[1.25rem] mb-2">
                {status?.type === "success" && (
                  <div className="text-sm text-[#39FF14] font-medium">
                    {status.message}
                  </div>
                )}
                {status?.type === "error" && (
                  <div className="text-sm text-red-400 font-medium">
                    {status.message}
                  </div>
                )}
              </div>

              {!thanks ? (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-semibold mb-2"
                    >
                      Full name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      className="w-full bg-olive-900/60 border border-olive-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors focus-ring"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-semibold mb-2"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      aria-required="true"
                      className="w-full bg-olive-900/60 border border-olive-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors focus-ring"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-white font-semibold mb-2"
                    >
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full bg-olive-900/60 border border-olive-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors focus-ring"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-white font-semibold mb-2"
                    >
                      WhatsApp or phone (optional)
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full bg-olive-900/60 border border-olive-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors focus-ring"
                      placeholder="e.g. +60 17-406 2788"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-white font-semibold mb-2"
                    >
                      Project type*
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      aria-required="true"
                      className="w-full bg-olive-900/60 border border-olive-700/50 rounded-lg px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent transition-colors focus-ring"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option>Landing Page</option>
                      <option>Business Website</option>
                      <option>Custom Web System</option>
                      <option>Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="launchDate"
                      className="block text-white font-semibold mb-2"
                    >
                      Ideal launch date (optional)
                    </label>
                    <input
                      type="date"
                      id="launchDate"
                      name="launchDate"
                      className="w-full bg-olive-900/60 border border-olive-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors focus-ring"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white font-semibold mb-2"
                    >
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      aria-required="true"
                      className="w-full bg-olive-900/60 border border-olive-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none focus-ring"
                      placeholder="Tell us about your project, questions, or how we can help..."
                    />
                  </div>

                  <div className="text-sm text-slate-400">
                    We’ll only use this info to contact you about your request.
                    See our{" "}
                    <a
                      href="/privacy"
                      className="underline hover:text-slate-300"
                    >
                      Privacy Policy
                    </a>
                    .
                  </div>

                  <PrimaryCTA
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </PrimaryCTA>
                </form>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold text-accent font-mono mb-2">
                    Thanks — we’ve got your message
                  </h3>
                  <p className="text-gray-300 mb-4">
                    We will reply within 1 business day with next steps. If it
                    is urgent, WhatsApp us for a faster response.
                  </p>
                  <WhatsAppCTA
                    onClick={() =>
                      window.dispatchEvent(new Event("open-wa-fab"))
                    }
                    size="md"
                    className="mt-2"
                  >
                    WhatsApp Us
                  </WhatsAppCTA>
                </div>
              )}
            </div>

            {/* Quick Actions & Contact Info */}
            <div className="space-y-8">
              {/* Quick Start Options */}
              <div className="rounded-2xl border border-accent/20 bg-olive-950 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-accent font-mono mb-6">
                  Prefer WhatsApp?
                </h3>
                <p className="text-gray-300 mb-4">Tap to message us.</p>
                <WhatsAppCTA
                  onClick={() => window.dispatchEvent(new Event("open-wa-fab"))}
                  className="w-full"
                >
                  WhatsApp Us
                </WhatsAppCTA>
              </div>

              {/* Contact Information */}
              <div className="rounded-2xl border border-accent/20 bg-olive-950 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-accent font-mono mb-6">
                  Email
                </h3>
                <a
                  href="mailto:hello@tadal.studio"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  hello@tadal.studio
                </a>
              </div>

              {/* FAQ Preview */}
              <div className="rounded-2xl border border-accent/20 bg-olive-950 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-accent font-mono mb-6">
                  Request a short call
                </h3>
                <p className="text-gray-300 mb-3">
                  Ask for a 15 minute discovery call. We will send a calendar
                  link.
                </p>
                <SecondaryCTA
                  href="https://calendar.app.google/SrBsskVewCfjWUv16"
                  external
                >
                  Request a 15 minute call
                </SecondaryCTA>
              </div>

              {/* What happens next */}
              <div className="rounded-2xl border border-accent/20 bg-olive-950 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-accent font-mono mb-6">
                  What happens next
                </h3>
                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                  <li>
                    We review your message and reply within 1 business day.
                  </li>
                  <li>If helpful, we’ll propose a 15 minute discovery call.</li>
                  <li>
                    You receive a plan, timeline, and a fixed quote.
                    Installments are available.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
