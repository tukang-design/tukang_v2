"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  PrimaryCTA,
  SecondaryCTA,
  ArrowRightIcon,
} from "../components/CTAButton";
import ContactSection from "../components/ContactSection";
import RegionSelector, {
  getRegionDetails,
} from "../components/region-selector";

export default function AboutPageClient() {
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
    "Crafting",
    "Digital",
    "Experiences",
    "That",
    "Speak",
    "Your",
    "Brand's",
    "Language."
  ];

  // Timeline data
  const timelineData = [
    {
      year: "2020",
      title: "Foundation",
      description: "Started with a vision to bridge the gap between creative design and technical excellence.",
      icon: "🚀"
    },
    {
      year: "2021",
      title: "First Milestone",
      description: "Delivered 50+ successful projects for local and international clients.",
      icon: "🎯"
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Expanded services to include advanced CMS solutions and e-commerce platforms.",
      icon: "📈"
    },
    {
      year: "2023",
      title: "Innovation",
      description: "Pioneered new design systems and development workflows for enhanced efficiency.",
      icon: "💡"
    },
    {
      year: "2024",
      title: "Future Ready",
      description: "Leading with cutting-edge technologies and sustainable digital solutions.",
      icon: "🌟"
    }
  ];

  const values = [
    {
      title: "Quality First",
      description: "Every line of code, every pixel placement, and every user interaction is crafted with meticulous attention to detail.",
      icon: "⭐"
    },
    {
      title: "Transparent Communication",
      description: "We believe in clear, honest communication throughout the entire project lifecycle.",
      icon: "💬"
    },
    {
      title: "Continuous Innovation",
      description: "Staying ahead of industry trends to deliver future-proof solutions for our clients.",
      icon: "🔧"
    },
    {
      title: "Client Partnership",
      description: "We don't just build websites; we build lasting relationships and ongoing partnerships.",
      icon: "🤝"
    }
  ];

  return (
    <div className="min-h-screen bg-olive">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="mb-8">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-accent font-mono leading-tight">
                  {headlineWords.map((word, index) => (
                    <span
                      key={index}
                      className={`inline-block mr-3 transform transition-all duration-700 ${
                        animationStarted
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p
                  className={`transform transition-all duration-700 delay-1000 ${
                    animationStarted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <strong className="text-white">Tukang Design</strong> is more than a web design studio – we're your digital craftspeople. 
                  Founded on the principle that exceptional websites require both creative vision and technical mastery.
                </p>
                
                <p
                  className={`transform transition-all duration-700 delay-1200 ${
                    animationStarted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  Based in Malaysia and serving clients globally, we specialize in creating websites that don't just look beautiful – 
                  they work flawlessly, convert visitors into customers, and grow with your business.
                </p>
              </div>

              <div
                className={`mt-8 transform transition-all duration-700 delay-1400 ${
                  animationStarted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <PrimaryCTA href="/portfolio" className="mr-4 mb-4">
                  View Our Work
                </PrimaryCTA>
                <SecondaryCTA href="/contact">
                  Get In Touch
                </SecondaryCTA>
              </div>
            </div>

            {/* Image/Visual Content */}
            <div
              className={`transform transition-all duration-1000 delay-500 ${
                animationStarted
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20">
                  <div className="aspect-square relative overflow-hidden rounded-xl">
                    <Image
                      src="/images/BusinessCard.jpg"
                      alt="Tukang Design - Professional Web Design Studio"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-accent/30 rounded-lg animate-float"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-olive-dark/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-accent font-mono mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to becoming a trusted partner for businesses worldwide.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent/30"></div>
            
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-olive-dark z-10"></div>
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <div className="bg-olive-dark/50 rounded-2xl p-6 border border-accent/20">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <span className="text-2xl font-bold text-accent font-mono">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-accent font-mono mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our core values shape every project we undertake and every relationship we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20 hover:bg-olive-dark/70 transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <span className="text-3xl mr-4">{value.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{value.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-olive-dark/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-accent font-mono mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A passionate group of designers, developers, and digital strategists dedicated to your success.
            </p>
          </div>

          <div className="bg-olive-dark rounded-2xl p-8 lg:p-12 border border-accent/20 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">
                Currently a dedicated solo operation with big team energy.
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                While Tukang Design is currently run by a single dedicated professional, we operate with the efficiency 
                and quality standards of a full-service agency. Every project receives personal attention, direct communication, 
                and the full focus of our expertise.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                This lean approach means faster decision-making, consistent quality, and a more personal relationship 
                with your project. As we grow, we'll continue to maintain this level of personal service while expanding 
                our capabilities.
              </p>
              <SecondaryCTA href="/contact">
                Work With Us <ArrowRightIcon />
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-accent font-mono mb-6">
              Why Choose Tukang Design?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Beyond technical skills and creative vision, here's what sets us apart.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Lightning Fast Delivery</h3>
              <p className="text-gray-300">
                No lengthy approval chains or bureaucratic delays. We move fast while maintaining exceptional quality standards.
              </p>
            </div>

            <div className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Transparent Pricing</h3>
              <p className="text-gray-300">
                No hidden fees, no surprise charges. You'll know exactly what you're paying for before we start.
              </p>
            </div>

            <div className="bg-olive-dark/50 rounded-2xl p-8 border border-accent/20 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Personal Touch</h3>
              <p className="text-gray-300">
                You'll work directly with the person building your website, ensuring your vision is perfectly understood and executed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
