import React from "react";
import AboutPageClient from "./AboutPageClient";

export const metadata = {
  title: "About - Tukang Design | Full-Stack Design & Development Studio",
  description:
    "Tukang Design is a Full-Stack Design & Development studio based in Malaysia. Discover our journey, values, and commitment to creating exceptional digital experiences.",
  openGraph: {
    title: "About - Tukang Design",
    description:
      "Tukang Design is a Full-Stack Design & Development studio based in Malaysia.",
    images: ["https://tukang.design/tukang-design-social-share.jpg"],
  },
  twitter: {
    images: ["https://tukang.design/tukang-design-social-share.jpg"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
