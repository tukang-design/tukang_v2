import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - End-to-End Web Design & Development | Tukang Design",
  description:
    "Complete web design and development services for Malaysian SMEs. From strategy and design to development and launch - we handle everything in one seamless process.",
  keywords:
    "web design services malaysia, web development services, end-to-end design development, full-stack web services, malaysian web designers",
  openGraph: {
    title: "Services - End-to-End Web Design & Development | Tukang Design",
    description:
      "Complete web design and development services for Malaysian SMEs. From strategy and design to development and launch.",
    url: "https://tukang.design/services",
    type: "website",
    images: ["https://tukang.design/tukang-design-social-share.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
