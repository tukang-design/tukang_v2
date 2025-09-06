import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Web Design & Development Insights | Tukang Design",
  description: "Get expert insights on web design, development, and digital marketing specifically for Malaysian SMEs. Tips, tutorials, and industry best practices.",
  keywords: "web design blog malaysia, web development blog, digital marketing tips malaysia, SME web design, malaysian web design insights",
  openGraph: {
    title: "Blog - Web Design & Development Insights | Tukang Design",
    description: "Get expert insights on web design, development, and digital marketing specifically for Malaysian SMEs.",
    url: "https://tukang.design/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
