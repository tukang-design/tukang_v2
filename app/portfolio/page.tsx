import React from "react";
import type { Metadata } from "next";
import { sanityClient } from "../../lib/sanity";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Design Portfolio Malaysia | Selected Projects | Tadal Studio",
  description:
    "See selected projects we've delivered for SMEs and startups in Malaysia and beyond. Credible, conversion-focused websites built end-to-end.",
  openGraph: {
    title: "Web Design Portfolio Malaysia | Selected Projects | Tadal Studio",
    description:
      "See selected projects we've delivered for SMEs and startups in Malaysia and beyond.",
    url: "/work",
    type: "website",
    images: [
      {
        url: "/tukang-design-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Tadal Studio – Web Design Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Portfolio Malaysia | Selected Projects | Tadal Studio",
    description:
      "See selected projects we've delivered for SMEs and startups in Malaysia and beyond.",
    images: ["/tukang-design-social-share.jpg"],
  },
  alternates: { canonical: "/work" },
};

interface PortfolioProject {
  _id: string;
  title: string;
  slug?: { current: string };
  mainImage?: {
    asset?: { url: string };
    alt?: string;
  };
  description?: string;
  shortDescription?: any[];
  category?:
    | string[]
    | string
    | {
        title?: string;
      };
  client?: string;
  industry?: string;
  _isFallback?: boolean;
}

async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const query = `
    *[_type == "portfolioProject" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
      _id,
      title,
      slug,
      mainImage {
        asset -> { url },
        alt
      },
  shortDescription,
  // keep description as a legacy fallback if present
  description,
      category,
      client,
      industry
    }
  `;

  try {
    const projects = await sanityClient.fetch(
      query,
      {},
      { next: { revalidate: 0 } }
    );
    return projects || [];
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  // Helper: extract plain text from PortableText blocks (safe fallback)
  function extractTextFromPortableText(portableText: any[]): string {
    if (!Array.isArray(portableText)) return "";
    return portableText
      .filter((block) => block?._type === "block")
      .map((block) =>
        (block.children || [])
          .filter((child: any) => child?._type === "span")
          .map((span: any) => span.text || "")
          .join("")
      )
      .join(" ")
      .trim();
  }

  return (
    <div className="min-h-screen bg-olive">
      {/* Hero — standardized with About/Packages style */}
      <section className="relative overflow-hidden bg-olive-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-slate-500 blur-3xl motion-safe:animate-pulse" />
          <div className="absolute -bottom-36 -left-36 w-[400px] h-[400px] rounded-full bg-brown-900 blur-3xl motion-safe:animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-6xl font-normal text-accent/30 tracking-widest font-mono mb-2">
            OUR WORK
          </h1>
          <h4 className="max-w-4xl text-slate-300 font-medium text-lg lg:text-xl mb-8 ml-0 mx-auto">
            Explore our collection of successful projects and see how we&apos;ve
            helped businesses transform their online presence.
          </h4>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-lg animate-float"></div>
      </section>

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-300 text-lg">
            No portfolio projects available at the moment.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Projects will be migrated to the new enhanced schema structure.
          </p>
        </div>
      ) : (
        <section>
          <div className="max-w-4xl py-16 mx-auto flex flex-col gap-6">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/work/${project.slug?.current || project._id}`}
                className="group relative"
              >
                <div className="bg-olive-dark rounded-2xl overflow-hidden border border-gray-700 hover:border-accent transition transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <div className="md:flex min-h-80">
                    <div className="md:w-2/5 bg-cover relative overflow-hidden">
                      {project.mainImage?.asset?.url ? (
                        <Image
                          src={project.mainImage.asset.url}
                          alt={project.mainImage.alt || project.title}
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

                      {project._isFallback && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                            EN
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:w-3/5">
                      <div className="flex items-center gap-2 mb-3">
                        {Array.isArray(project.category) ? (
                          project.category.length > 0 ? (
                            project.category.slice(0, 2).map((cat, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-brown-400/10 text-brown-400 text-xs rounded-full"
                              >
                                {cat}
                              </span>
                            ))
                          ) : (
                            <span className="px-3 py-1 bg-brown-400/10 text-brown-400 text-xs rounded-full">
                              Project
                            </span>
                          )
                        ) : typeof project.category === "string" ? (
                          <span className="px-3 py-1 bg-brown-400/10 text-brown-400 text-xs rounded-full">
                            {project.category}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-brown-400/10 text-brown-400 text-xs rounded-full">
                            {project.category?.title || "Project"}
                          </span>
                        )}
                        {Array.isArray(project.category) &&
                          project.category.length > 2 && (
                            <span className="px-3 py-1 bg-gray-400/10 text-gray-400 text-xs rounded-full">
                              +{project.category.length - 2}
                            </span>
                          )}
                      </div>

                      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>

                      {(() => {
                        const excerpt = project.shortDescription
                          ? extractTextFromPortableText(
                              project.shortDescription
                            )
                          : project.description || "";
                        return (
                          excerpt && (
                            <div className="text-gray-300 text-sm line-clamp-2 mb-3">
                              <p>{excerpt}</p>
                            </div>
                          )
                        );
                      })()}

                      {project.client && (
                        <div className="text-xs text-gray-400">
                          <p>Client: {project.client}</p>
                        </div>
                      )}

                      {project.industry && (
                        <div className="text-xs text-gray-500 mt-2">
                          <p>Industry: {project.industry}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
