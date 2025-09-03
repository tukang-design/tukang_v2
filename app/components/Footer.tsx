import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-olive-dark to-olive border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Tukang Design Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-mono font-bold text-accent text-xl">
                  Tukang Design
                </span>
                <p className="text-xs text-gray-400">
                  Your Vision, Perfectly Built.
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              A single, dedicated expert for your entire website project. From
              first sketch to final launch, we eliminate the handoff and deliver
              a flawless final product.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.threads.com/@tukangdesign.my"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-olive-dark rounded-lg border border-accent/20 text-gray-400 hover:text-accent hover:border-accent/40 transition-all duration-300"
              >
                <span className="sr-only">Threads</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.4c0-3.25.85-6.104 2.495-8.551C5.845 1.445 8.598.224 12.179.2h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.76 22.5 8.614 22.5 11.8c0 3.25-.85 6.104-2.495 8.551-1.65 2.454-4.403 3.675-7.984 3.699zM12 3c-2.987 0-5.449.953-7.123 2.756C3.203 7.56 2.5 9.8 2.5 12.4c0 2.537.703 4.777 2.377 6.544C6.551 20.947 9.013 21.9 12 21.9s5.449-.953 7.123-2.756c1.674-1.767 2.377-4.007 2.377-6.544 0-2.6-.703-4.84-2.377-6.644C17.449 3.953 15.013 3 12 3zm3.5 9.5c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5 1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/tukangdesign.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-olive-dark rounded-lg border border-accent/20 text-gray-400 hover:text-accent hover:border-accent/40 transition-all duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579641005576"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-olive-dark rounded-lg border border-accent/20 text-gray-400 hover:text-accent hover:border-accent/40 transition-all duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono font-bold text-accent mb-6 text-lg">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/en"
                  className="text-gray-300 hover:text-accent transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-accent/40 rounded-full mr-3 group-hover:bg-accent transition-colors duration-200"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/en/about"
                  className="text-gray-300 hover:text-accent transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-accent/40 rounded-full mr-3 group-hover:bg-accent transition-colors duration-200"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/en/services"
                  className="text-gray-300 hover:text-accent transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-accent/40 rounded-full mr-3 group-hover:bg-accent transition-colors duration-200"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/en/portfolio"
                  className="text-gray-300 hover:text-accent transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-accent/40 rounded-full mr-3 group-hover:bg-accent transition-colors duration-200"></span>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/en/blog"
                  className="text-gray-300 hover:text-accent transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-accent/40 rounded-full mr-3 group-hover:bg-accent transition-colors duration-200"></span>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-mono font-bold text-accent mb-6 text-lg">
              Contact
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                studio@tukang.design
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-3 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Malaysia • Singapore
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                Available for projects
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Tukang Design | A TADAL STUDIO (202503200783) Brand.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-accent text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-accent text-sm transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
