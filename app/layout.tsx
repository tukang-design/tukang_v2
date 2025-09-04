import React from "react";
import "./globals.css";
import NavigationBar from "./components/NavigationBar.simple";
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
    "Tukang Design - Professional Website Development Services in Malaysia",
  description:
    "Get professional website development services in Malaysia. Tukang Design offers custom web design, e-commerce solutions, and digital marketing from Shah Alam. Fast delivery, competitive pricing. Get your quote today!",
  keywords:
    "website development malaysia, web design shah alam, ecommerce website malaysia, professional web development, responsive design, SEO optimization, digital marketing malaysia, web application development",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Tukang Design - Professional Website Development Services",
    description:
      "Get professional website development services in Malaysia. Tukang Design offers custom web design, e-commerce solutions, and digital marketing from Shah Alam.",
    url: "https://tukang.design",
    siteName: "Tukang Design",
    images: [
      {
        url: "https://tukang.design/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tukang Design - Professional Website Development Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tukang Design - Professional Website Development Services",
    description:
      "Get professional website development services in Malaysia. Tukang Design offers custom web design, e-commerce solutions, and digital marketing from Shah Alam.",
    images: ["https://tukang.design/og-image.jpg"],
    site: "@tukangdesign",
  },
  alternates: {
    canonical: "https://tukang.design",
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
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-13JMFQR6YB"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-13JMFQR6YB');
            `,
          }}
        />
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
