import React from "react";

export const metadata = {
  title: "About - Tukang Design | Malaysian Web Design Studio",
  description:
    "Learn about Tukang Design, a passionate web design studio based in Malaysia. Discover our journey, values, and commitment to creating exceptional digital experiences.",
  openGraph: {
    title: "About - Tukang Design",
    description:
      "Learn about Tukang Design, a passionate web design studio based in Malaysia.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-olive flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          About Tukang Design
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your content goes here. This page is ready for your custom content.
        </p>
      </div>
    </div>
  );
}
