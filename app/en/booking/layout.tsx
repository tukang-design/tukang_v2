import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Your Web Design Quote - Custom Pricing | Tukang Design",
  description: "Get a custom quote for your web design and development project. Interactive pricing calculator with transparent costs for Malaysian and Singaporean businesses.",
  keywords: "web design quote malaysia, web development pricing, custom website quote, tukang design pricing, malaysia web design cost",
  openGraph: {
    title: "Get Your Web Design Quote - Custom Pricing | Tukang Design", 
    description: "Get a custom quote for your web design and development project. Interactive pricing calculator with transparent costs.",
    url: "https://tukang.design/booking",
    type: "website",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
