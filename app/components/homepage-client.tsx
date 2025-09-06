"use client";
import React from "react";
import { useState, useEffect } from "react";
import RegionSelector from "./region-selector";
import {
  PrimaryCTA,
  SecondaryCTA,
  TertiaryCTA,
  ArrowDownIcon,
  ArrowRightIcon,
} from "../components/CTAButton";
import ContactSection from "../components/ContactSection";

interface HomePageClientProps {
  children?: React.ReactNode;
}

export default function HomePageClient({ children }: HomePageClientProps) {
  const [region, setRegion] = useState("INT"); // Default to international while detecting
  const [animationStarted, setAnimationStarted] = useState(false);
  const [marqueeRunning, setMarqueeRunning] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);
    const runTimer = setTimeout(() => setMarqueeRunning(true), 900);
    return () => {
      clearTimeout(timer);
      clearTimeout(runTimer);
    };
  }, []);

  // Animation words for the homepage headline
  const homepageHeadlineWords = [
    { text: "Your", color: "text-white", delay: 0 },
    { text: "Vision,", color: "text-white", delay: 200 },
    { text: "Perfectly", color: "text-accent", delay: 600 },
    { text: "Built.", color: "text-accent", delay: 800 },
  ];

  return (
    <div className="min-h-screen bg-olive">
      {/* REGION DETECTION - Hidden, automatic */}
      <RegionSelector onChange={setRegion} showSelector={false} />

      <style jsx global>{`
        @keyframes bounceCustom {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-custom {
          animation: bounceCustom 4s infinite;
        }
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
          animation: slideUpFadeIn 0.8s ease-out 1s forwards;
        }
        /* Marquee banners */
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .marquee-container {
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .marquee-track {
          display: flex;
          width: 200%; /* two copies side-by-side */
        }
        /* Initial slide-in wrappers */
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .marquee-slide-left.is-in {
          animation: slideInLeft 700ms ease-out both;
        }
        .marquee-slide-right.is-in {
          animation: slideInRight 700ms ease-out both;
        }
        .marquee-left .marquee-track.running {
          animation: marqueeLeft 40s linear infinite;
        }
        .marquee-right .marquee-track.running {
          animation: marqueeRight 40s linear infinite;
        }
        .banner-segment {
          display: flex;
          gap: 1rem;
          align-items: center;
          white-space: nowrap;
          width: 50%;
          justify-content: space-around;
          padding: 0.6rem 0;
        }
      `}</style>
      {/* HERO SECTION - AWARENESS */}
      <section className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light opacity-90"></div>
        <div className="relative w-full mx-auto py-12 lg:py-24">
          <div className="text-center">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              <span className="text-accent text-sm font-medium">
                Available for New Projects
              </span>
            </div>

            {/* Main Headline with Animated Text Reveal */}
            <h1 className="max-w-7xl mx-auto text-5xl lg:text-7xl font-bold mb-6 font-mono leading-tight">
              {homepageHeadlineWords.map((word, index) => (
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
                  {index === 1 && <br />} {/* Line break after "Vision," */}
                </span>
              ))}
            </h1>

            {/* Animated Banners */}
            <div
              className={`space-y-4 ${
                animationStarted ? "animate-subtitle" : "opacity-0"
              }`}
            >
              {/* Top banner - END-TO-END moving left, slanted */}
              <div className="marquee-container w-screen relative left-1/2 -translate-x-1/2 transform rotate-[-5deg]">
                <div
                  className={`marquee-slide-left ${
                    animationStarted ? "is-in" : ""
                  }`}
                >
                  <div className="marquee-left">
                    <div
                      className={`marquee-track ${
                        marqueeRunning ? "running" : ""
                      }`}
                    >
                      <div className="banner-segment bg-olive-dark text-accent font-mono text-xl md:text-3xl">
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                      </div>
                      <div className="banner-segment bg-olive-dark text-accent font-mono text-xl md:text-3xl">
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                        <span>END-TO-END</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom banner - DESIGN & DEVELOPMENT moving right, slanted opposite */}
              <div className="marquee-container w-screen relative left-1/2 -translate-x-1/2 transform rotate-[5deg]">
                <div
                  className={`marquee-slide-right ${
                    animationStarted ? "is-in" : ""
                  }`}
                >
                  <div className="marquee-right">
                    <div
                      className={`marquee-track ${
                        marqueeRunning ? "running" : ""
                      }`}
                    >
                      <div className="banner-segment bg-olive-dark text-brown font-mono text-xl md:text-3xl">
                        <span>DESIGN & DEVELOPMENT</span>
                        <span>DESIGN & DEVELOPMENT</span>
                        <span>DESIGN & DEVELOPMENT</span>
                        <span>DESIGN & DEVELOPMENT</span>
                      </div>
                      <div className="banner-segment bg-olive-dark text-brown font-mono text-xl md:text-3xl">
                        <span>DESIGN & DEVELOPMENT</span>
                        <span>DESIGN & DEVELOPMENT</span>
                        <span>DESIGN & DEVELOPMENT</span>
                        <span>DESIGN & DEVELOPMENT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated CTA at bottom of section with 2rem margin */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mb-8">
          <SecondaryCTA
            href="#services"
            icon={
              <ArrowDownIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
            }
            className="animate-bounce-custom"
          >
            View Our Services
          </SecondaryCTA>
        </div>
      </section>

      {/* SERVICES PREVIEW SECTION - INTEREST */}
      <section id="services" className="py-20 bg-olive-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-accent font-mono leading-tight">
              End-to-End
              <br />
              <span className="text-white">Design & Development.</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A seamless, unified process for building websites that are as
              technically sound as they are beautiful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Lead Generation Landing Page */}
            <div className="group bg-olive-dark/30 rounded-2xl p-8 border border-brown/30 hover:border-brown/50 transition-all duration-300 relative justify-items-center z-20 text-center">
              <div className="w-16 h-16 bg-brown/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown/20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-brown"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Lead Generation Landing Page
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-4">
                A single, high-impact page designed to capture leads and convert
                visitors into qualified inquiries.
              </p>
            </div>

            {/* Professional Business Website */}
            <div className="group bg-olive-dark/30 rounded-2xl p-8 border border-brown/30 hover:border-brown/50 transition-all duration-300 relative justify-items-center z-20 text-center">
              <div className="w-16 h-16 bg-brown/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown/20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-brown"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Professional Business Website
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-4">
                A complete, multi-page site to build trust, showcase your brand,
                and establish credibility.
              </p>
            </div>

            {/* Custom Web Platforms */}
            <div className="group bg-olive-dark/30 rounded-2xl p-8 border border-brown/30 hover:border-brown/50 transition-all duration-300 relative z-20 justify-items-center text-center">
              <div className="w-16 h-16 bg-brown/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown/20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-brown"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Custom Web Platforms
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-4">
                Advanced solutions with e-commerce, booking systems, custom CMS,
                or membership portals.
              </p>
            </div>
          </div>

          {/* Single CTA to Services Page */}
          <div className="text-center">
            <PrimaryCTA
              href="/services"
              className="text-lg px-10 py-4 w-full sm:w-auto"
            >
              Learn More About Our Services →
            </PrimaryCTA>
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW SECTION - CONSIDERATION */}
      <section className="py-20 bg-olive">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Title and Copy (1/3 width) */}
            <div className="lg:col-span-4 lg:pr-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-accent font-mono leading-tight">
                Our Work
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Explore these case studies to see how our integrated process
                delivers websites that not only look stunning but also achieve
                real business goals.
              </p>
              {/* CTA moved after portfolio cards for better mobile order */}
              <div className="mt-10 sm:text-center lg:text-left">
                <PrimaryCTA
                  href="/portfolio"
                  icon={<ArrowRightIcon />}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View All Our Work
                </PrimaryCTA>
              </div>
            </div>

            {/* Right Column - Portfolio Showcase (2/3 width) */}
            <div className="lg:col-span-8 lg:pl-8">
              {/* Portfolio Preview Component */}
              {children}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION - CONSIDERATION */}
      <section className="py-20 bg-olive-light/50 relative overflow-hidden">
        {/* Blueprint Grid Background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 69, 19, 0.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 69, 19, 0.7) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-white font-mono">
              A Better Way <br />
              to Build Your Website.
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our seamless, end-to-end process is built on a foundation of
              clarity, accountability, and a unified vision from the first
              sketch to the final launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Unified Vision */}
            <div className="group bg-olive-dark/30 rounded-2xl p-8 border border-brown/30 hover:border-brown/50 transition-all duration-300 text-center relative z-20">
              <div className="w-20 h-20 bg-brown/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown/20 transition-colors duration-300 mx-auto">
                {/* Unified Vision Icon */}
                <svg
                  className="w-10 h-10 text-brown"
                  viewBox="0 0 8.4666665 8.466667"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m6.6094358.26460707a.26460982.26460982 0 0 0 -.1834512.07803141l-.7932333.79530032a.26460982.26460982 0 0 0 -.031006.037207c-.7215352-.35529475-1.5184459-.45572996-2.2753133-.32246091-.8672467.15270461-1.6816093.61170611-2.2639446 1.34772141-1.16467048 1.4720306-1.04142903 3.5881073.2852539 4.9159791 1.3266833 1.3278718 3.442906 1.4522231 4.9159791.2888713 1.3797685-1.089665 1.7906786-2.9904373 1.0283611-4.5402914a.26460982.26460982 0 0 0 .03824-.032039l.792717-.7927169a.26460982.26460982 0 0 0 0-.3751709l-.4743897-.4728394.2108399-.2108399a.26460982.26460982 0 0 0 -.1932697-.45320232.26460982.26460982 0 0 0 -.1819011.08009848l-.2092896.20928955-.4743897-.47490643a.26460982.26460982 0 0 0 -.1912028-.07803141zm.0041341.64078779.2868041.28680424-.8164875.8164876v-.5761922zm-2.6329143.41806234c.5383268.0023 1.0801419.144271 1.5740642.429948v.7844482l-.1033528.1033529c-.4079172-.3262043-.9237539-.5229655-1.4846639-.5229655-1.3119945 0-2.3807334 1.0687388-2.3807334 2.3807333 0 1.3119942 1.0687389 2.3807333 2.3807334 2.3807333 1.3119941 0 2.3828002-1.0687391 2.3828002-2.3807333 0-.561058-.196714-1.0765888-.5234821-1.4841472l.1038696-.1038696h.7839314c.7891542 1.3626913.4645906 3.0988467-.7782471 4.0803712-1.2657627.9996295-3.074755.8929492-4.2147299-.2480469-1.13997471-1.1409963-1.24312519-2.9498629-.2423625-4.2147299.6254768-.790542 1.5567783-1.2091309 2.5021729-1.2050945zm3.2943727.2423625.2873211.2868042-.5291667.5291667h-.5741252zm-3.3083252 1.0815877c.4170775 0 .8002717.1381218 1.1094929.3689697l-.5751587.5751587c-.1576342-.0935384-.3390659-.1508951-.5343342-.1508951-.5813677 0-1.0562662.4769657-1.0562665 1.0583334 0 .5813676.4748988 1.0588501 1.0562665 1.0588501.5813676 0 1.0588501-.4774825 1.0588501-1.0588501 0-.1948863-.057695-.375357-.1508954-.5327841l.5756757-.5756754c.2312869.3088593.3700031.6913264.3700031 1.1084595 0 1.0260113-.8276222 1.8515666-1.8536335 1.8515666-1.0260116 0-1.8515667-.8255553-1.8515667-1.8515666 0-1.0260114.8255551-1.8515667 1.8515667-1.8515667zm0 1.3224c.04763 0 .092715.0082.1364258.019637l-.3219443.3219443a.26460982.26460982 0 1 0 .3731038.3751707l.3229777-.3229776c.011254.043379.018604.088165.018604.1353923 0 .2953848-.2337822.5296834-.5291667.5296834-.2953848 0-.5270998-.2342986-.5270998-.5296834s.231715-.5291667.5270995-.5291667z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brown mb-4">
                A Unified Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                With a single expert team managing both design and development,
                your vision remains pure and uncompromised.
              </p>
            </div>

            {/* Efficient Process */}
            <div className="group bg-olive-dark/30 rounded-2xl p-8 border border-brown/30 hover:border-brown/50 transition-all duration-300 text-center relative z-20">
              <div className="w-20 h-20 bg-brown/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown/20 transition-colors duration-300 mx-auto">
                {/* Efficient Process Icon */}
                <svg
                  className="w-10 h-10 text-brown"
                  viewBox="0 -46 512 512"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m435.960938 302.972656-17.921876 24.054688 24.121094 17.972656h-53.058594c-6.675781-25.847656-30.195312-45-58.101562-45h-150c-27.90625 0-51.425781 19.152344-58.101562 45h-32.898438c-33.085938 0-60-26.914062-60-60s26.914062-60 60-60h32.898438c6.675781 25.847656 30.195312 45 58.101562 45h150c27.90625 0 51.425781-19.152344 58.101562-45h31.898438c24.050781 0 46.792969-9.328125 64.042969-26.265625 17.382812-17.066406 26.957031-39.703125 26.957031-63.734375s-9.574219-46.667969-26.957031-63.734375c-17.25-16.9375-39.992188-26.265625-64.042969-26.265625h-31.898438c-6.675781-25.847656-30.195312-45-58.101562-45h-150c-27.90625 0-51.425781 19.152344-58.101562 45h-11.898438l-56-42-18 24 24 18h-61v30h61l-24 18 18 24 56-42h11.898438c6.675781 25.847656 30.195312 45 58.101562 45h150c27.90625 0 51.425781-19.152344 58.101562-45h31.898438c33.636719 0 61 26.914062 61 60s-27.363281 60-61 60h-31.898438c-6.675781-25.847656-30.195312-45-58.101562-45h-150c-27.90625 0-51.425781 19.152344-58.101562 45h-32.898438c-49.625 0-90 40.375-90 90s40.375 90 90 90h32.898438c6.675781 25.847656 30.195312 45 58.101562 45h150c27.90625 0 51.425781-19.152344 58.101562-45h53.058594l-24.121094 17.972656 17.921876 24.054688 76.039062-57.027344zm-104.960938-212.972656h-150c-16.542969 0-30-13.457031-30-30s13.457031-30 30-30h150c16.542969 0 30 13.457031 30 30s-13.457031 30-30 30zm-150 90h150c16.542969 0 30 13.457031 30 30s-13.457031 30-30 30h-150c-16.542969 0-30-13.457031-30-30s13.457031-30 30-30zm150 210h-150c-16.542969 0-30-13.457031-30-30s13.457031 30-30 30h150c16.542969 0 30 13.457031 30 30s-13.457031 30-30 30zm0 0" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brown mb-4">
                An Efficient Process
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We eliminate the traditional bottlenecks. This means a faster
                development cycle and fewer surprises.
              </p>
            </div>

            {/* Cohesive Final Product */}
            <div className="group bg-olive-dark/30 rounded-2xl p-8 border border-brown/30 hover:border-brown/50 transition-all duration-300 text-center relative z-20">
              <div className="w-20 h-20 bg-brown/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown/20 transition-colors duration-300 mx-auto">
                {/* Cohesive Final Product Icon */}
                <svg
                  className="w-10 h-10 text-brown"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m10.6049 1.32445c.8787-.432601 1.9115-.4326 2.7902 0l8.752 4.30902c1.1372.55989 1.1372 2.17318 0 2.73306l-2.3022 1.13346 2.3022 1.13341c1.1372.5599 1.1372 2.1732 0 2.7331l-2.3022 1.1335 2.3022 1.1334c1.1372.5599 1.1372 2.1732 0 2.7331l-8.752 4.309c-.8787.4326-1.9115.4326-2.7902 0l-8.75201-4.309c-1.13719-.5599-1.137183-2.1732 0-2.7331l2.30219-1.1334-2.30219-1.1335c-1.13719-.5599-1.137183-2.1732 0-2.7331l2.30217-1.13341-2.30217-1.13346c-1.13719-.55989-1.137183-2.17318 0-2.73306zm1.9067 1.79432c-.3216-.15836-.7016-.15836-1.0232 0l-7.88322 3.88123 7.88322 3.8812c.3216.1584.7016.1584 1.0232 0l7.8832-3.8812zm-6.09261 7.49583-2.81381 1.3854 7.88322 3.8812c.3216.1584.7016.1584 1.0232 0l7.8832-3.8812-2.8138-1.3854-4.1859 2.061c-.8787.4326-1.9115.4326-2.7902-.0001zm.00002 5-2.81383 1.3854 7.88322 3.8812c.3216.1584.7016.1584 1.0232 0l7.8832-3.8812-2.8138-1.3854-4.1859 2.0609c-.8787.4326-1.9115.4326-2.7902 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brown mb-4">
                A Cohesive Final Product
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The result is a website where design and functionality are in
                perfect harmony.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
