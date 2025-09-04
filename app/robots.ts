import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/_next/",
          "/studio/",
          "/sanity/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/studio/", "/sanity/"],
      },
    ],
    sitemap: "https://tukang.design/sitemap.xml",
    host: "https://tukang.design",
  };
}
