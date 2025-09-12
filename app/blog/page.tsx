import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityReadClient } from "../../lib/sanity";

export const metadata: Metadata = {
  title: "Web Design Insights | TADAL STUDIO",
  description:
    "Practical web design and business growth tips for Malaysian SMEs.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Web Design Insights | TADAL STUDIO",
    description:
      "Practical web design and business growth tips for Malaysian SMEs.",
    url: "/blog",
    type: "website",
    images: [
      { url: "/tukang-design-social-share.jpg", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Insights | TADAL STUDIO",
    description:
      "Practical web design and business growth tips for Malaysian SMEs.",
    images: ["/tukang-design-social-share.jpg"],
  },
};

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: { asset: { url: string }; alt?: string };
  author?: { name: string };
  categories?: Array<{ title: string }>;
};

async function getPosts(): Promise<Post[]> {
  try {
    const data = await sanityReadClient.fetch(`
      *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
  _id, title, slug, excerpt, publishedAt, mainImage{asset->{url}, alt}, author->{name}, categories[]->{title}
      }
    `);
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

function fmt(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive">
      {/* Hero — standardized with About/Packages style */}
      <section className="relative overflow-hidden bg-olive-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-slate-500 blur-3xl motion-safe:animate-pulse" />
          <div className="absolute -bottom-36 -left-36 w-[400px] h-[400px] rounded-full bg-brown-900 blur-3xl motion-safe:animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-6xl font-normal text-accent/30 tracking-widest font-mono mb-2">
            WEB DESIGN INSIGHTS
          </h1>
          <h4 className="max-w-4xl text-slate-300 font-medium text-lg lg:text-xl mb-8 ml-0 mx-auto">
            Practical tips on design, development and growth for small
            businesses.
          </h4>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      <section className="pb-20 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="bg-olive-dark/30 rounded-2xl text-center">
              No posts yet — check back soon.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.map((p, i) => (
                <Link
                  key={p._id}
                  href={`/blog/${p.slug.current}`}
                  className="group relative"
                >
                  <div className="bg-olive-dark rounded-2xl overflow-hidden border border-gray-700 hover:border-accent transition transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <div className="md:flex min-h-80">
                      <div className="md:w-2/5 bg-cover relative overflow-hidden">
                        {p.mainImage?.asset?.url ? (
                          <Image
                            src={p.mainImage.asset.url}
                            alt={p.mainImage.alt || p.title}
                            fill
                            className="object-cover transition-opacity duration-200"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-brown/20 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">
                              No image available
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6 md:w-3/5">
                        <div className="flex items-center gap-2 mb-3">
                          {Array.isArray(p.categories) ? (
                            p.categories.length > 0 ? (
                              p.categories.slice(0, 2).map((cat, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-brown-400/10 text-brown-400 text-xs rounded-full"
                                >
                                  {cat.title}
                                </span>
                              ))
                            ) : (
                              <span className="px-3 py-1 bg-brown-400/10 text-brown-400 text-xs rounded-full">
                                Post
                              </span>
                            )
                          ) : (
                            <span className="px-3 py-1 bg-brown-400/10 text-brown-400 text-xs rounded-full">
                              Post
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                          {p.title}
                        </h3>

                        {p.excerpt && (
                          <div className="text-gray-300 text-sm line-clamp-2 mb-3">
                            <p>{p.excerpt}</p>
                          </div>
                        )}

                        {p.author && (
                          <div className="text-xs text-gray-400 mt-2">
                            {p.author.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
