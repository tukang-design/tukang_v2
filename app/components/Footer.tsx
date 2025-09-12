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
            <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="TADAL STUDIO Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono font-bold text-accent text-xl">
                TADAL STUDIO
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 text-sm mt-6">
              <p className="text-sm text-gray-400 font-normal">
                Based in Shah Alam, Malaysia. Available worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width darker separator + bottom bar */}
      <div className="bg-olive-dark/80 border-t border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-gray-400 text-sm text-center">
            © 2025 TADAL STUDIO Copyright (202503200783). All rights reserved.
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
