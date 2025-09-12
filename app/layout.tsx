import React from "react";
import "./globals.css";
import { Lato, Roboto_Mono } from "next/font/google";

// Next/font loaders must be called at module scope
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
const martian = Roboto_Mono({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});
import NavigationBar from "./components/NavigationBar.simple";
import Footer from "./components/Footer";
import GlobalBookingSteps from "./components/GlobalBookingSteps";
import RegionIndicator from "./components/RegionIndicator";
import WhatsAppFAB from "./components/WhatsAppFAB";
import MainViewport from "./components/MainViewport";
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
  // Ensure absolute URL resolution for OG/Twitter
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://tadalstudio.com"
  ),
  title: "End-to-End Web Design & Development | TADAL STUDIO",
  description:
    "Tired of the handoff headache? TADAL STUDIO offers a seamless, end-to-end web design and development service. Get a flawless website from a single expert.",
  keywords:
    "end-to-end design development, full-stack designer malaysia, web design shah alam, complete digital solutions, custom web development, full-stack development malaysia, design to development services",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "End-to-End Web Design & Development | TADAL STUDIO",
    description:
      "Tired of the handoff headache? TADAL STUDIO offers a seamless, end-to-end web design and development service. Get a flawless website from a single expert.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://tadalstudio.com",
    siteName: "TADAL STUDIO",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL || "https://tadalstudio.com"
        }/tukang-design-social-share.jpg`,
        width: 1200,
        height: 630,
        alt: "TADAL STUDIO - End-to-End Web Design & Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "End-to-End Web Design & Development | TADAL STUDIO",
    description:
      "Tired of the handoff headache? TADAL STUDIO offers a seamless, end-to-end web design and development service. Get a flawless website from a single expert.",
    images: [
      process.env.NEXT_PUBLIC_BASE_URL ||
        "https://tadalstudio.com/tukang-design-social-share.jpg",
    ],
    site: "@tukangdesign",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://tadalstudio.com",
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
  const htmlClass = `${lato.className} ${martian.className}`;
  const businessData = createBusinessStructuredData();
  const websiteData = createWebsiteStructuredData();

  return (
    <html lang="en" className={htmlClass + " scroll-smooth"}>
      <head>
        <GoogleTagManager />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0..1,-50..200"
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${
            process.env.NEXT_PUBLIC_GA_ID || ""
          }`}
        ></script>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }}
          />
        ) : null}
        <SEO structuredData={[businessData, websiteData]} />
      </head>
      <body className="bg-olive-950/70 text-foreground antialiased animate-fade-in">
        <GoogleTagManagerNoScript />
        <NavigationBar />

        {/* Main Content */}
        <MainViewport>{children}</MainViewport>

        {/* Global Booking Steps (hidden on booking/admin) */}
        <GlobalBookingSteps />

        <Footer />

        {/* Region Detection Indicator */}
        <RegionIndicator />

        {/* Global WhatsApp Floating Action Button */}
        <WhatsAppFAB />
      </body>
    </html>
  );
}
