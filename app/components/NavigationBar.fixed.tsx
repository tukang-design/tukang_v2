"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";

// Enhanced NavLink Component
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
        className={`group/link flex items-center px-8 py-4 rounded-lg font-medium text-base transition-all duration-300 ${
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
      {hasSubmenu && submenuItems && submenuItems.length > 0 && (
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

// Mobile Menu Component
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-olive/80 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-olive-dark border-l border-accent/20 z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                <span className="text-olive font-mono font-bold">T</span>
              </div>
              <span className="font-mono font-bold text-accent">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-olive-dark/50 border border-accent/20 text-accent hover:bg-olive-dark hover:border-accent/40 transition-all duration-300"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-2">
            <Link
              href="/en"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
              onClick={onClose}
            >
              Home
            </Link>
            <Link
              href="/en/portfolio"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
              onClick={onClose}
            >
              Portfolio
            </Link>

            {/* Services Submenu */}
            <div className="space-y-1">
              <Link
                href="/en/services"
                className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                onClick={onClose}
              >
                Services
              </Link>
              <div className="ml-4 space-y-1">
                <Link
                  href="/en/services/design"
                  className="block px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-accent hover:bg-accent/5 transition-all duration-200"
                  onClick={onClose}
                >
                  UI/UX Design
                </Link>
                <Link
                  href="/en/services/development"
                  className="block px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-accent hover:bg-accent/5 transition-all duration-200"
                  onClick={onClose}
                >
                  Development
                </Link>
                <Link
                  href="/en/services/consulting"
                  className="block px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-accent hover:bg-accent/5 transition-all duration-200"
                  onClick={onClose}
                >
                  Consulting
                </Link>
                <Link
                  href="/en/services/branding"
                  className="block px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-accent hover:bg-accent/5 transition-all duration-200"
                  onClick={onClose}
                >
                  Branding
                </Link>
              </div>
            </div>

            <Link
              href="/en/blog"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
              onClick={onClose}
            >
              Blog
            </Link>
            <Link
              href="/en/about"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
              onClick={onClose}
            >
              About
            </Link>
            <Link
              href="/en/contact"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
              onClick={onClose}
            >
              Contact
            </Link>

            {/* Language and CTA */}
            <div className="mt-8 pt-6 border-t border-accent/20">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-400">
                  Language
                </span>
                <Link
                  href="/ms"
                  className="px-3 py-1 rounded-lg border border-brown text-brown hover:bg-brown hover:text-olive transition-all duration-200 text-sm font-medium"
                  onClick={onClose}
                >
                  🇲🇾 BM
                </Link>
              </div>
              <Link
                href="/en/contact"
                className="block w-full text-center px-6 py-4 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
                onClick={onClose}
              >
                Start Project
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

// Main Navigation Bar Component
export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const servicesSubmenu = [
    {
      href: "/en/services/design",
      label: "UI/UX Design",
      description: "User interface and experience design",
    },
    {
      href: "/en/services/development",
      label: "Development",
      description: "Full-stack web development",
    },
    {
      href: "/en/services/consulting",
      label: "Consulting",
      description: "Technical strategy and advice",
    },
    {
      href: "/en/services/branding",
      label: "Branding",
      description: "Brand identity and visual systems",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-olive/95 border-b border-accent/10 shadow-lg shadow-olive/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-24">
            {/* Enhanced Logo */}
            <div className="flex items-center">
              <Link href="/en" className="group flex items-center space-x-3">
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
                  <span className="font-mono font-bold text-accent text-xl leading-none group-hover:text-accent/90 transition-colors duration-200">
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
              <NavLink href="/en" label="Home" />
              <NavLink href="/en/portfolio" label="Portfolio" />
              <NavLink
                href="/en/services"
                label="Services"
                hasSubmenu={true}
                submenuItems={servicesSubmenu}
              />
              <NavLink href="/en/blog" label="Blog" />
              <NavLink href="/en/about" label="About" />

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

              {/* Language Separator */}
              <div className="h-6 w-px bg-brown/30 mx-4"></div>

              {/* Enhanced Language Switcher */}
              <Link
                href="/ms"
                className="group px-4 py-3 rounded-lg border border-brown/40 text-brown hover:bg-brown hover:text-olive transition-all duration-300 text-base font-medium hover:shadow-md"
              >
                <span className="flex items-center">🇲🇾 BM</span>
              </Link>

              {/* Enhanced CTA Button */}
              <div className="ml-8">
                <Link
                  href="/en/contact"
                  className="group relative px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-xl font-bold text-base transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-105 overflow-hidden border border-accent/20"
                >
                  <span className="relative z-10 flex items-center">
                    Start Project
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/80 to-accent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
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
            <div className="pb-4">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-3 bg-olive-dark/50 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
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
