"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ScrollProgress from "./ScrollProgress";

export default function NavigationBar() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const isMalay = pathname.startsWith("/ms");
  const currentLang = isEnglish ? "en" : isMalay ? "ms" : "en";
  const otherLang = currentLang === "en" ? "ms" : "en";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get current page path without language prefix
  const currentPage = pathname.replace(/^\/(en|ms)/, "") || "";

  const getNavLink = (path: string) => `/${currentLang}${path}`;
  const getLangSwitchLink = () => `/${otherLang}${currentPage}`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-olive/70 border-b border-accent/10 shadow-lg shadow-olive/20">
      <div className="w-full mx-auto px-4 sm:px-4 lg:px-6">
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
                  alt="Tukang Design Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-accent text-xl leading-none">
                  Tukang Design
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
              {currentLang === "en" ? "Home" : "Utama"}
            </Link>
            <Link
              href={getNavLink("/services")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              {currentLang === "en" ? "Services" : "Perkhidmatan"}
            </Link>
            <Link
              href={getNavLink("/portfolio")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              Portfolio
            </Link>
            <Link
              href={getNavLink("/about")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              {currentLang === "en" ? "About" : "Tentang"}
            </Link>
            <Link
              href={getNavLink("/blog")}
              className="px-2 py-4 rounded-lg font-semibold text-gray-300 hover:text-accent transition-all duration-300"
            >
              Blog
            </Link>

            {/* Language Switcher */}
            <Link
              href={getLangSwitchLink()}
              className="px-2 py-2 rounded-lg font-medium text-sm text-gray-300 hover:text-accent border border-accent/20 hover:border-accent/40 transition-all duration-300"
              title={
                currentLang === "en"
                  ? "Switch to Bahasa Melayu"
                  : "Switch to English"
              }
            >
              {currentLang === "en" ? "BM" : "EN"}
            </Link>

            <Link
              href={getNavLink("/booking")}
              className="px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-xl font-bold text-base transition-all duration-300"
            >
              {currentLang === "en" ? "Book Project" : "Tempah Projek"}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Language Switcher */}
            <Link
              href={getLangSwitchLink()}
              className="px-2 py-2 rounded-lg font-medium text-sm text-gray-300 hover:text-accent border border-accent/20 hover:border-accent/40 transition-all duration-300"
              title={
                currentLang === "en"
                  ? "Switch to Bahasa Melayu"
                  : "Switch to English"
              }
            >
              {currentLang === "en" ? "BM" : "EN"}
            </Link>

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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-olive/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-olive-dark border-l border-accent/20 z-50 lg:hidden">
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
              <nav className="space-y-2">
                <Link
                  href={getNavLink("")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {currentLang === "en" ? "Home" : "Utama"}
                </Link>
                <Link
                  href={getNavLink("/portfolio")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  href={getNavLink("/services")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {currentLang === "en" ? "Services" : "Perkhidmatan"}
                </Link>
                <Link
                  href={getNavLink("/blog")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href={getNavLink("/about")}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {currentLang === "en" ? "About" : "Tentang"}
                </Link>
              </nav>

              {/* Mobile CTA */}
              <div className="mt-8 pt-6 border-t border-accent/20">
                <Link
                  href={getNavLink("/booking")}
                  className="block w-full text-center px-6 py-4 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {currentLang === "en" ? "Book Project" : "Tempah Projek"}
                </Link>
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
