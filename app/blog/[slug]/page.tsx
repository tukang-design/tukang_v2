import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityReadClient } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";

// Define the blog post type
interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  publishedAt: string;
  body?: TypedObject | TypedObject[];
  mainImage?: {
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

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await sanityReadClient.fetch(
      `
      *[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        body,
        mainImage {
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
    `,
      { slug }
    );
    return post || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Tukang Design",
    };
  }

  return {
    title: `${post.title} | Tukang Design Blog`,
    description: post.excerpt,
    keywords: [
      "web design blog Malaysia",
      "SME digital marketing",
      "website tips",
      "online business Malaysia",
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage
        ? [post.mainImage.asset.url]
        : ["https://tukang.design/tukang-design-social-share.jpg"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.mainImage
        ? [post.mainImage.asset.url]
        : ["https://tukang.design/tukang-design-social-share.jpg"],
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-accent transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-300">{post.title}</span>
            </div>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category.slug.current}
                      className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
              <time className="text-gray-400 text-sm">
                {formatDate(post.publishedAt)}
              </time>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>

            {post.author && (
              <div className="flex items-center mt-8 pt-6 border-t border-accent/20">
                {post.author.image && (
                  <img
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="text-accent font-medium">
                    By {post.author.name}
                  </p>
                  <p className="text-gray-400 text-sm">Author</p>
                </div>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="mb-12">
              <img
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl"
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <article className="bg-olive-dark/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-accent/20">
            <div className="prose prose-lg prose-invert max-w-none">
              {post.body ? (
                <div className="text-gray-300 leading-relaxed space-y-6">
                  <PortableText
                    value={post.body}
                    components={{
                      types: {
                        image: ({ value }: any) => {
                          if (!value?.asset?.url) return null;
                          return (
                            <div className="my-8">
                              <img
                                src={value.asset.url}
                                alt={value.alt || "Blog image"}
                                className="w-full h-auto rounded-xl"
                              />
                              {value.caption && (
                                <p className="text-sm text-gray-400 mt-2 text-center italic">
                                  {value.caption}
                                </p>
                              )}
                            </div>
                          );
                        },
                      },
                      block: {
                        h2: ({ children }: any) => (
                          <h2 className="text-3xl font-bold text-accent mb-6 mt-12 font-mono">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }: any) => (
                          <h3 className="text-2xl font-bold text-accent mb-4 mt-8">
                            {children}
                          </h3>
                        ),
                        normal: ({ children }: any) => (
                          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                            {children}
                          </p>
                        ),
                        blockquote: ({ children }: any) => (
                          <blockquote className="border-l-4 border-accent pl-6 my-8 italic text-gray-300 bg-accent/5 py-4 rounded-r-lg">
                            {children}
                          </blockquote>
                        ),
                      },
                      marks: {
                        link: ({ children, value }: any) => (
                          <a
                            href={value?.href || "#"}
                            className="text-accent hover:text-accent/80 underline transition-colors duration-300"
                            target={
                              value?.href?.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              value?.href?.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {children}
                          </a>
                        ),
                        strong: ({ children }: any) => (
                          <strong className="font-bold text-accent">
                            {children}
                          </strong>
                        ),
                        em: ({ children }: any) => (
                          <em className="italic text-gray-200">{children}</em>
                        ),
                      },
                      list: {
                        bullet: ({ children }: any) => (
                          <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300">
                            {children}
                          </ul>
                        ),
                        number: ({ children }: any) => (
                          <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }: any) => (
                          <li className="text-gray-300 leading-relaxed">
                            {children}
                          </li>
                        ),
                        number: ({ children }: any) => (
                          <li className="text-gray-300 leading-relaxed">
                            {children}
                          </li>
                        ),
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="text-gray-300 leading-relaxed space-y-6">
                  <p>
                    This blog post is available in the system but the content
                    needs to be configured in Sanity CMS.
                  </p>
                </div>
              )}
            </div>
          </article>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-accent/10 text-accent rounded-xl font-medium hover:bg-accent/20 transition-all duration-300"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
