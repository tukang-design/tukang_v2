"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SecondaryCTA, WhatsAppCTA, ArrowRightIcon } from "./CTAButton";

// Enhanced Tailwind Block Navigation Component
function NavLink({
  href,
  label,
  isActive = false,
  hasSubmenu = false,
  submenuItems = [],
}: {
  href: string;
  label: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: { href: string; label: string; description?: string }[];
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className={`group/link flex items-center px-4 py-4 rounded-lg font-medium text-base transition-all duration-300 ${
          isActive
            ? "text-accent bg-accent/10 border border-accent/20 shadow-lg shadow-accent/10"
            : "text-gray-300 hover:text-accent hover:bg-accent/5 hover:shadow-md"
        }`}
      >
        <span className="relative z-10">{label}</span>
        {hasSubmenu && (
          <svg
            className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
        <div
          className={`absolute inset-0 rounded-lg bg-gradient-to-r from-accent/5 to-accent/10 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 ${
            isActive ? "opacity-100" : ""
          }`}
        ></div>
      </Link>

      {/* Submenu */}
      {hasSubmenu && submenuItems.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-olive-dark/95 backdrop-blur-lg border border-accent/20 rounded-2xl shadow-2xl shadow-olive/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
          <div className="p-6">
            <div className="grid gap-4">
              {submenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group/submenu block p-3 rounded-xl hover:bg-accent/10 transition-all duration-200"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-accent/40 rounded-full mt-2 mr-3 group-hover/submenu:bg-accent transition-colors duration-200"></div>
                    <div>
                      <div className="font-medium text-accent group-hover/submenu:text-accent/90">
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-sm text-gray-400 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Full-Screen Mobile Menu
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Full Screen Menu */}
      <div className="h-full w-full bg-white flex flex-col">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <div className="text-gray-900 font-bold text-lg">
                Tukang Studio
              </div>
              <div className="text-gray-500 text-sm">
                Design • Code • Deploy
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-6">
          <nav className="space-y-4">
            <Link
              href="/"
              className="block py-4 px-4 text-xl font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              Home
            </Link>
            <Link
              href="/work"
              className="block py-4 px-4 text-xl font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              Work
            </Link>
            <Link
              href="/packages"
              className="block py-4 px-4 text-xl font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              Packages
            </Link>
            <Link
              href="/blog"
              className="block py-4 px-4 text-xl font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block py-4 px-4 text-xl font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-4 px-4 text-xl font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom CTAs */}
        <div className="p-6 border-t border-gray-200 space-y-4">
          <SecondaryCTA
            href="/packages"
            icon={<ArrowRightIcon />}
            className="w-full py-4 text-lg"
            onClick={onClose}
          >
            Explore Packages
          </SecondaryCTA>

          <WhatsAppCTA
            href="https://wa.me/60174062788"
            external
            className="w-full py-4 text-lg"
            onClick={onClose}
          >
            WhatsApp Us
          </WhatsAppCTA>
        </div>
      </div>
    </div>
  );
}

// Navigation Bar Component with Client-Side Features
export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const servicesSubmenu = [
    {
      href: "/packages#landing",
      label: "Landing Page",
      description: "Conversion-focused single page website",
    },
    {
      href: "/packages#business",
      label: "Professional Website",
      description: "Multi-page company site with CMS",
    },
    {
      href: "/packages#custom",
      label: "Custom Web System",
      description: "Bookings, memberships, commerce and more",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-olive/95 border-b border-accent/10 shadow-lg shadow-olive/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-2 lg:px-2">
          <div className="flex justify-between items-center h-24">
            {/* Enhanced Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-accent/25">
                    <span className="text-olive font-mono font-bold text-lg">
                      T
                    </span>
                  </div>
                  {/* Enhanced Glow effect */}
                  <div className="absolute inset-0 w-10 h-10 bg-accent/20 rounded-xl blur-md group-hover:blur-lg group-hover:bg-accent/30 transition-all duration-300"></div>
                  {/* Pulse animation */}
                  <div className="absolute inset-0 w-10 h-10 bg-accent/10 rounded-xl animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono font-bold text-[#39FF14] text-xl leading-none transition-colors duration-200">
                    Tukang Studio
                  </span>
                  <span className="text-xs text-gray-400 font-light">
                    Design • Code • Deploy
                  </span>
                </div>
              </Link>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              <NavLink href="/" label="Home" />
              <NavLink href="/work" label="Work" />
              <NavLink
                href="/packages"
                label="Packages"
                hasSubmenu={true}
                submenuItems={servicesSubmenu}
              />
              <NavLink href="/blog" label="Blog" />
              <NavLink href="/about" label="About" />

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-4 mx-3 rounded-lg text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                title="Search"
              >
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Enhanced CTA Button */}
              <div className="ml-8">
                <SecondaryCTA
                  href="/packages"
                  icon={<ArrowRightIcon />}
                  size="lg"
                >
                  Explore Packages
                </SecondaryCTA>
              </div>
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-3 rounded-lg bg-olive-dark/50 border border-accent/20 text-accent hover:bg-olive-dark hover:border-accent/40 transition-all duration-300"
              >
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-lg bg-olive-dark/50 border border-accent/20 text-accent hover:bg-olive-dark hover:border-accent/40 transition-all duration-300"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isMobileMenuOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4 border-t border-accent/10 pt-4 mt-4">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search projects, articles, packages..."
                  className="w-full pl-10 pr-4 py-3 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                  autoFocus
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
