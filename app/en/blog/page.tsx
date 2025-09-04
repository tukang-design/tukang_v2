import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { sanityReadClient } from "../../../lib/sanity";

export const metadata: Metadata = {
  title: "Web Design Blog | Tips for Malaysian SMEs | Tukang Design",
  description:
    "Expert insights on web design, digital marketing, and online business growth for Malaysian SMEs. Get practical tips to improve your online presence.",
  keywords: [
    "web design blog Malaysia",
    "SME digital marketing",
    "website tips",
    "online business Malaysia",
  ],
  openGraph: {
    title: "Web Design Blog | Tips for Malaysian SMEs",
    description:
      "Expert insights on web design, digital marketing, and online business growth for Malaysian SMEs.",
    images: ["/og-blog.jpg"],
  },
};

// Define the blog post type
interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  publishedAt: string;
  featuredImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  author?: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
  categories?: Array<{
    title: string;
    slug: {
      current: string;
    };
  }>;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await sanityReadClient.fetch(`
      *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        featuredImage {
          asset->{
            url
          },
          alt
        },
        author-> {
          name,
          image {
            asset->{
              url
            }
          }
        },
        categories[]-> {
          title,
          slug
        }
      }
    `);
    return posts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-6">
            Web Design <span className="text-accent">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Expert insights on web design, digital marketing, and online
            business growth for Malaysian SMEs. Get practical tips to improve
            your online presence.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:gap-12">
              {/* Featured Post */}
              {posts[0] && (
                <article className="bg-olive-dark/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-accent/20">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                        <time className="text-gray-400 text-sm">
                          {formatDate(posts[0].publishedAt)}
                        </time>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
                        <Link
                          href={`/en/blog/${posts[0].slug.current}`}
                          className="hover:text-accent/80 transition-colors"
                        >
                          {posts[0].title}
                        </Link>
                      </h2>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {posts[0].excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <Link
                          href={`/en/blog/${posts[0].slug.current}`}
                          className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
                        >
                          Read More
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>

                        {posts[0].author && (
                          <div className="flex items-center gap-3">
                            {posts[0].author.image && (
                              <img
                                src={posts[0].author.image.asset.url}
                                alt={posts[0].author.name}
                                className="w-8 h-8 rounded-full"
                              />
                            )}
                            <span className="text-gray-400 text-sm">
                              {posts[0].author.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {posts[0].featuredImage && (
                      <div className="order-first md:order-last">
                        <img
                          src={posts[0].featuredImage.asset.url}
                          alt={posts[0].featuredImage.alt || posts[0].title}
                          className="w-full h-64 md:h-80 object-cover rounded-xl"
                        />
                      </div>
                    )}
                  </div>
                </article>
              )}

              {/* Other Posts */}
              {posts.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((post) => (
                    <article
                      key={post._id}
                      className="bg-olive-dark/30 backdrop-blur-lg rounded-xl p-6 border border-accent/10 hover:border-accent/30 transition-colors group"
                    >
                      {post.featuredImage && (
                        <div className="mb-4">
                          <img
                            src={post.featuredImage.asset.url}
                            alt={post.featuredImage.alt || post.title}
                            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-3">
                        <time className="text-gray-400 text-sm">
                          {formatDate(post.publishedAt)}
                        </time>
                        {post.categories && post.categories[0] && (
                          <>
                            <span className="text-gray-500">•</span>
                            <span className="text-accent text-sm">
                              {post.categories[0].title}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-accent mb-3 group-hover:text-accent/80 transition-colors">
                        <Link href={`/en/blog/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <Link
                          href={`/en/blog/${post.slug.current}`}
                          className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                        >
                          Read More →
                        </Link>

                        {post.author && (
                          <span className="text-gray-400 text-xs">
                            {post.author.name}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Coming Soon Content (when no posts exist)
            <div className="bg-olive-dark/30 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-accent/20">
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold text-accent mb-4">
                  Blog Coming Soon
                </h2>

                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  We're working on creating valuable content about web design,
                  digital marketing, and business growth strategies specifically
                  for Malaysian SMEs. Stay tuned for expert insights and
                  practical tips!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-accent font-semibold mb-2">
                      Design Tips
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Latest web design trends and best practices
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-accent font-semibold mb-2">
                      Business Growth
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Strategies to grow your online presence
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-accent font-semibold mb-2">
                      Mobile Optimization
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Making your website mobile-friendly
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/en/booking"
                    className="bg-accent text-olive px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                  >
                    Get Your Website Quote
                  </Link>
                  <Link
                    href="/en/services"
                    className="border border-accent/30 text-accent px-8 py-3 rounded-lg font-semibold hover:bg-accent/10 transition-colors"
                  >
                    View Our Services
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
