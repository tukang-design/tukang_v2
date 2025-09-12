"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SecondaryCTA, PrimaryCTA } from "./CTAButton";
import Image from "next/image";
import ScrollProgress from "./ScrollProgress";

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavLink = (path: string) => (path && path.length > 0 ? path : "/");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-olive/70 border-b border-accent/10 shadow-lg shadow-olive/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={getNavLink("")}
              className="group flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.gif"
                  alt="Tadal Studio Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-[#39FF14] text-2xl leading-none">
                  TADAL STUDIO
                </span>
              </div>
            </Link>
          </div>

          {/* Simple Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link
              href={getNavLink("")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              Home
            </Link>
            <Link
              href={getNavLink("/packages")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              Packages
            </Link>
            <Link
              href={getNavLink("/work")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              Work
            </Link>
            <Link
              href={getNavLink("/about")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              About
            </Link>
            <Link
              href={getNavLink("/contact")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              Contact
            </Link>
            <PrimaryCTA href={getNavLink("/planner")}>
              Plan My Website
            </PrimaryCTA>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              className="p-3 rounded-lg bg-olive-dark/50 border border-accent/20 text-accent hover:bg-olive-dark hover:border-accent/40 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
      </div>

      {/* Mobile Menu - Fixed Full Height Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Full Screen Backdrop */}
          <div
            className="h-screen fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel - Full Height */}
          <div className="h-screen fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-olive-dark border-l border-accent/20 z-50 lg:hidden shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-accent/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                    <span className="text-olive font-mono font-bold">T</span>
                  </div>
                  <span className="font-mono font-bold text-accent">Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
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

              {/* Mobile Navigation Links */}
              <nav className="flex-1 px-6 py-6 space-y-2">
                <Link
                  href={getNavLink("")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href={getNavLink("/work")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Work
                </Link>
                <Link
                  href={getNavLink("/packages")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Packages
                </Link>
                <Link
                  href={getNavLink("/contact")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href={getNavLink("/about")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </nav>

              {/* Mobile CTA - Sticky at bottom */}
              <div className="p-6 border-t border-accent/20">
                <PrimaryCTA
                  href={getNavLink("/planner")}
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Plan My Website
                </PrimaryCTA>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Scroll Progress Bar */}
      <ScrollProgress />
    </header>
  );
}
