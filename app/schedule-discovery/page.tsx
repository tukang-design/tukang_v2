"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ScheduleDiscoveryContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  type BookingDetails = {
    id: string;
    businessName: string;
    service: string;
  };

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you'd fetch booking details from your API
    // For now, we'll simulate this
    if (bookingId) {
      setTimeout(() => {
        setBookingDetails({
          id: bookingId,
          businessName: "Sample Business",
          service: "Business Website",
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-olive flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Loading your booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-accent font-mono mb-4">
            Schedule Your Discovery Call
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let&apos;s discuss your project requirements and create the perfect
            website for your business.
          </p>
          {bookingDetails && (
            <div className="mt-4 inline-block bg-accent/10 rounded-lg px-4 py-2 border border-accent/20">
              <span className="text-accent font-medium">
                Project: {bookingDetails.service} for{" "}
                {bookingDetails.businessName}
              </span>
            </div>
          )}
        </div>

        {/* Calendar Integration */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Choose Your Preferred Time
            </h2>
            <p className="text-gray-600">
              Select a time that works best for you. Our discovery calls
              typically last 30-45 minutes.
            </p>
          </div>

          {/* Calendly Embed - Replace with your actual Calendly link */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <iframe
              src="https://calendly.com/your-account/discovery-call"
              width="100%"
              height="600"
              frameBorder="0"
              className="rounded-xl"
              title="Schedule Discovery Call"
            ></iframe>
          </div>

          {/* Alternative: Custom Calendar Component */}
          <div className="bg-accent/5 rounded-xl p-6 border border-accent/20">
            <h3 className="font-semibold text-gray-900 mb-3">
              What we&apos;ll cover in your discovery call:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-accent mt-0.5"
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
                  <span className="text-gray-700">
                    Your business goals and target audience
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-accent mt-0.5"
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
                  <span className="text-gray-700">
                    Website functionality requirements
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-accent mt-0.5"
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
                  <span className="text-gray-700">
                    Design preferences and inspiration
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-accent mt-0.5"
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
                  <span className="text-gray-700">
                    Project timeline and milestones
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-accent mt-0.5"
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
                  <span className="text-gray-700">
                    Content and asset requirements
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-accent mt-0.5"
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
                  <span className="text-gray-700">
                    Next steps and project kickoff
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Need to reschedule or have questions?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <a
                  href="mailto:hello@tukangdesign.com"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  📧 hello@tukangdesign.com
                </a>
                <span className="hidden sm:block text-gray-400">•</span>
                <a
                  href="https://wa.me/60174062788"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  📱 WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link
            href=""
            className="inline-block text-gray-300 hover:text-accent transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleDiscovery() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-olive flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <ScheduleDiscoveryContent />
    </Suspense>
  );
}
