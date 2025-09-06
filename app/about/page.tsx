import React from "react";
import AboutPageClient from "./AboutPageClient";

export const metadata = {
  title: "About - Tukang Design | Malaysian Web Design Studio",
  description: "Learn about Tukang Design, a passionate web design studio based in Malaysia. Discover our journey, values, and commitment to creating exceptional digital experiences.",
  openGraph: {
    title: "About - Tukang Design",
    description: "Learn about Tukang Design, a passionate web design studio based in Malaysia.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
