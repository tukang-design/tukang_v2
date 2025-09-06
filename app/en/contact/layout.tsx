import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Your Web Design Quote | Tukang Design",
  description: "Ready to start your web design project? Contact Tukang Design for a free consultation. Based in Shah Alam, serving Malaysia and Singapore with end-to-end design services.",
  keywords: "contact web designer malaysia, web design consultation, tukang design contact, shah alam web designer, malaysia web design quote",
  openGraph: {
    title: "Contact Us - Get Your Web Design Quote | Tukang Design",
    description: "Ready to start your web design project? Contact Tukang Design for a free consultation.",
    url: "https://tukang.design/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
