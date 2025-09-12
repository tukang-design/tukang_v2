"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";

function BookingSuccessContent() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Show success message immediately - no payment verification needed
    setIsVerified(true);
  }, []);

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-olive flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Processing your submission...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-olive text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-accent"
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

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">
            Request Submitted Successfully!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thank you for your interest in working with TADAL STUDIO! We&apos;ve
            received your request and will get back to you soon.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* What happens next */}
          <div className="bg-olive-dark/30 border border-accent/20 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-accent">
              What happens next?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent text-olive rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Review & Analysis
                  </h3>
                  <p className="text-gray-300">
                    Our team will review your requirements and analyze your
                    project needs within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent text-olive rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Custom Quotation
                  </h3>
                  <p className="text-gray-300">
                    We'll prepare a detailed proposal with custom pricing based
                    on your specific goals and requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-accent text-olive rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Personal Consultation
                  </h3>
                  <p className="text-gray-300">
                    Schedule a free consultation call to discuss your project in
                    detail and answer any questions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email confirmation */}
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-accent mb-3">
              📧 Check Your Email
            </h3>
            <p className="text-gray-300">
              We've sent a confirmation email to the address you provided. You
              should receive it within the next few minutes.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Don't see it? Check your spam folder or contact us directly.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-400 mb-3">
              💬 Quick Questions?
            </h3>
            <p className="text-gray-300 mb-4">
              Have urgent questions about your project? Chat with us directly on
              WhatsApp!
            </p>
            <a
              href="https://wa.me/60174062788?text=Hi%20Tukang%20Design!%20I%20just%20submitted%20a%20booking%20request%20and%20have%20a%20few%20questions%20about%20my%20project.%20Looking%20forward%20to%20hearing%20from%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-olive-dark text-white font-semibold rounded-lg hover:bg-olive transition-all duration-300 text-center"
            >
              Return to Home
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 bg-accent text-olive font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 text-center"
            >
              View Our Work
            </Link>
          </div>

          {/* Contact Info Footer */}
          <div className="mt-8 pt-6 border-t border-accent/20 text-center">
            <p className="text-sm text-gray-400">
              Questions? Contact us at{" "}
              <a
                href="mailto:studio@tukang.design"
                className="text-accent hover:underline"
              >
                studio@tukang.design
              </a>{" "}
              or{" "}
              <a
                href="tel:+60174062788"
                className="text-accent hover:underline"
              >
                +60 17-406 2788
              </a>
            </p>
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
        <div className="min-h-screen bg-olive flex items-center justify-center p-4">
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
