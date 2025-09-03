"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  PrimaryCTA,
  SecondaryCTA,
  ArrowRightIcon,
} from "../../components/CTAButton";
import ContactSection from "../../components/ContactSection";
import RegionSelector, {
  getRegionDetails,
} from "../components/region-selector";

export default function AboutPage() {
  const [region, setRegion] = useState("INT");
  const [animationStarted, setAnimationStarted] = useState(false);
  const regionDetails = getRegionDetails(region);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation words for the headline
  const headlineWords = [
    { text: "A", color: "text-accent", delay: 0 },
    { text: "Better", color: "text-accent", delay: 200 },
    { text: "Way", color: "text-accent", delay: 400 },
    { text: "to", color: "text-white", delay: 600 },
    { text: "Create", color: "text-white", delay: 800 },
    { text: "Websites.", color: "text-white", delay: 1000 },
  ];

  return (
    <div className="min-h-screen bg-olive">
      {/* Region Detection - Hidden, automatic */}
      <RegionSelector onChange={setRegion} showSelector={false} />

      {/* CSS Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideUpFadeIn {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-word {
            opacity: 0;
            transform: translateY(30px);
            display: inline-block;
            animation: slideUpFadeIn 0.8s ease-out forwards;
          }
          
          .animate-subtitle {
            opacity: 0;
            transform: translateY(20px);
            animation: slideUpFadeIn 0.8s ease-out 1.2s forwards;
          }
        `,
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light opacity-90"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="text-center">
            {/* Main Headline with Animated Text Reveal */}
            <h1 className="text-5xl lg:text-6xl font-bold mb-8 font-mono leading-tight">
              {headlineWords.map((word, index) => (
                <span
                  key={index}
                  className={`animate-word ${word.color} mr-3`}
                  style={{
                    animationDelay: animationStarted
                      ? `${word.delay}ms`
                      : "9999s",
                  }}
                >
                  {word.text}
                  {index === 2 && <br />} {/* Line break after "Way" */}
                </span>
              ))}
            </h1>

            {/* Subtitle with delayed animation */}
            <h2
              className={`text-xl lg:text-2xl mb-12 text-brown max-w-3xl mx-auto leading-relaxed ${
                animationStarted ? "animate-subtitle" : "opacity-0"
              }`}
            >
              We&apos;re a new kind of web design studio, built for businesses
              that value a seamless, end-to-end partnership.
            </h2>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-brown/20 rounded-full"></div>
      </section>

      {/* Business Card Image Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-accent/20">
            <Image
              src="/images/BusinessCard.jpg"
              alt="Tukang Design Business Card - Syazwan Shariff"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
            {/* Overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        {/* Introduction / The Problem */}
        <div className="mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Tukang Design was founded to solve the costly gap between a great
              idea and a flawless final product.
            </p>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Businesses have been caught between designers who understand
              aesthetics and developers who understand code. This disconnect
              leads to compromised vision, missed deadlines, and fragmented
              websites.
            </p>

            <p className="text-2xl text-brown font-semibold mb-4">
              It's a broken model. We're here to fix it.
            </p>
          </div>
        </div>

        {/* The Solution */}
        <div className="mb-8">
          <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-white font-mono">
            The Full-Stack Model
          </h3>

          <p className="text-lg text-gray-300 mb-12 leading-relaxed">
            We are a new kind of web design studio where strategy, design, and
            development are unified, handled by a single, expert team. Just a
            seamless process from the first sketch to the final launch.
          </p>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Step 1 */}
            <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-accent font-bold text-lg">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-accent mb-2">
                    Strategy & UX
                  </h4>
                  <p className="text-gray-300">
                    We start by diving deep into your business goals and mapping
                    out a strategic user experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-accent font-bold text-lg">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-accent mb-2">
                    Visual & UI Design
                  </h4>
                  <p className="text-gray-300">
                    We craft a beautiful, custom user interface that brings your
                    brand to life.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-accent font-bold text-lg">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-accent mb-2">
                    Technical Development
                  </h4>
                  <p className="text-gray-300">
                    We write the clean, efficient, and scalable code to build
                    your website.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-olive-dark/50 border border-accent/20 rounded-2xl p-8 hover:bg-olive-dark/70 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-accent font-bold text-lg">4</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-accent mb-2">
                    Launch & Optimization
                  </h4>
                  <p className="text-gray-300">
                    We manage the entire launch process to ensure a flawless and
                    high-performance debut.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brown/10 to-brown/5 border border-brown/20 rounded-2xl p-8">
            <p className="text-lg text-gray-300 text-center">
              <span className="text-brown font-semibold">The result:</span> A
              more cohesive, higher-quality website, delivered with greater
              efficiency and zero miscommunication.
            </p>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="">
          <div className="bg-olive-dark/30 border border-brown/30 rounded-2xl p-8 mb-8">
            <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-white font-mono">
              The Philosophy & The "Why"
            </h3>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              The name{" "}
              <span className="text-accent font-semibold">"Tukang"</span>{" "}
              (craftsman) is at the heart of everything we do. It represents our
              commitment to skill, precision, and building digital experiences
              with genuine care.
            </p>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              This is the clarity and accountability your project deserves.
            </p>

            <p className="text-sm text-gray-400 italic">
              Tukang Design is the public-facing brand for our registered
              company, TADAL STUDIO.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 ">
        <ContactSection variant="compact" />
      </section>
    </div>
  );
}
