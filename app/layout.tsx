import React from "react";
import "./globals.css";
import NavigationBar from "./components/NavigationBar.fixed";
import Footer from "./components/Footer";
import RegionIndicator from "./components/RegionIndicator";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "../components/GoogleTagManager";
import { SEO } from "../components/SEO";
import {
  createBusinessStructuredData,
  createWebsiteStructuredData,
} from "../lib/structuredData";

export const metadata = {
  title:
    "Tukang - Professional Website Development Services in Malaysia & Singapore",
  description:
    "Get professional website development services in Malaysia & Singapore. Custom web design, e-commerce solutions, and digital marketing. Fast delivery, competitive pricing. Get your quote today!",
  keywords:
    "website development malaysia, web design singapore, ecommerce website, professional web development, responsive design, SEO optimization, digital marketing, web application development",
  robots: "index, follow",
  openGraph: {
    title: "Tukang - Professional Website Development Services",
    description:
      "Get professional website development services in Malaysia & Singapore. Custom web design, e-commerce solutions, and digital marketing.",
    url: "https://tukang.my",
    siteName: "Tukang",
    images: [
      {
        url: "https://tukang.my/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tukang - Professional Website Development Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tukang - Professional Website Development Services",
    description:
      "Get professional website development services in Malaysia & Singapore. Custom web design, e-commerce solutions, and digital marketing.",
    images: ["https://tukang.my/og-image.jpg"],
    site: "@tukang",
  },
  alternates: {
    canonical: "https://tukang.my",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessData = createBusinessStructuredData();
  const websiteData = createWebsiteStructuredData();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <GoogleTagManager />
        <SEO structuredData={[businessData, websiteData]} />
      </head>
      <body className="bg-olive text-foreground font-lato antialiased">
        <GoogleTagManagerNoScript />
        <NavigationBar />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        <Footer />

        {/* Region Detection Indicator */}
        <RegionIndicator />
      </body>
    </html>
  );
}
