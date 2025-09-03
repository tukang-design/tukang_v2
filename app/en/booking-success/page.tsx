"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Optional: Verify the payment session on the client side
    if (sessionId && bookingId) {
      setIsVerified(true);
    }
  }, [sessionId, bookingId]);

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-olive flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
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
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Payment Successful! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for choosing Tukang Design
            </p>
            {bookingId && (
              <p className="text-sm text-gray-500 font-mono bg-gray-100 rounded px-3 py-1 inline-block">
                Booking ID: {bookingId}
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              What happens next?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Confirmation Email
                  </h3>
                  <p className="text-gray-600">
                    You'll receive a payment confirmation email within the next
                    few minutes
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Schedule Discovery Call
                  </h3>
                  <p className="text-gray-600">
                    Check your email for a link to book your discovery call with
                    our design team
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Project Kickoff
                  </h3>
                  <p className="text-gray-600">
                    We'll discuss your project requirements, timeline, and next
                    steps
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Design & Development
                  </h3>
                  <p className="text-gray-600">
                    Your professional website will be ready within 2-3 weeks
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div className="text-left">
                <h4 className="font-semibold text-yellow-800 mb-1">
                  Important Next Step
                </h4>
                <p className="text-yellow-700 text-sm">
                  Please schedule your discovery call within the next 7 days to
                  maintain your project timeline. Check your email for the
                  scheduling link.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/en/schedule-discovery"
              className="inline-block bg-gradient-to-r from-accent to-accent/80 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/30 transform hover:scale-105 transition-all duration-300"
            >
              📅 Schedule Discovery Call Now
            </Link>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/en"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Return to Homepage
              </Link>
              <span className="hidden sm:block text-gray-400">•</span>
              <Link
                href="/en/contact"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccess() {
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
      <BookingSuccessContent />
    </Suspense>
  );
}
