import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-olive-dark to-olive border-t border-accent/10">
      {/* Top bar: Brand + Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-8">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center mb-1">
              <Image
                src="/logo.svg"
                alt="Tukang Design Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono font-bold text-accent text-xl">
                Tukang Design
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center text-sm pt-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
              >
                Portfolio
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-accent transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 text-sm mt-6">
              <p className="text-sm text-gray-400">Shah Alam, Malaysia</p>
              <a
                href="mailto:studio@tukang.design"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                studio@tukang.design
              </a>
              <a
                href="tel:+60174062788"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                +60 17 406 2788
              </a>
              <div className="flex items-center justify-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                <span className="text-sm text-gray-300">
                  Available for projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width darker separator + bottom bar */}
      <div className="bg-olive-dark/80 border-t border-accent/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-gray-400 text-sm text-center">
            © 2025 Tukang Design | A TADAL STUDIO (202503200783) Brand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-400 hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
