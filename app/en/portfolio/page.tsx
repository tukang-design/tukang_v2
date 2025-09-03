import React from "react";
import { sanityClient } from "../../../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { PrimaryCTA, SecondaryCTA } from "../../components/CTAButton";
import ContactSection from "../../components/ContactSection";

interface PortfolioProject {
  _id: string;
  title: string;
  slug?: { current: string };
  mainImage?: {
    asset?: { url: string };
    alt?: string;
  };
  description?: string;
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
    *[_type == "portfolioProject" && language == "en"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      mainImage {
        asset -> { url },
        alt
      },
      description,
      category,
      client,
      industry
    }
  `;

  try {
    const projects = await sanityClient.fetch(query);
    return projects || [];
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <div className="min-h-screen bg-olive">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of successful projects and see how we&apos;ve
            helped businesses transform their online presence.
          </p>
        </div>

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
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/en/portfolio/${project.slug?.current || project._id}`}
                  className="group relative"
                >
                  <div className="bg-olive-dark rounded-2xl overflow-hidden border border-gray-700 hover:border-accent transition-all duration-300 hover:scale-105">
                    <div className="aspect-video relative overflow-hidden">
                      {project.mainImage?.asset?.url ? (
                        <Image
                          src={project.mainImage.asset.url}
                          alt={project.mainImage.alt || project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
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

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {Array.isArray(project.category) ? (
                          project.category.length > 0 ? (
                            project.category.slice(0, 2).map((cat, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-brown text-white text-sm rounded-full"
                              >
                                {cat}
                              </span>
                            ))
                          ) : (
                            <span className="px-3 py-1 bg-brown text-white text-sm rounded-full">
                              Project
                            </span>
                          )
                        ) : typeof project.category === "string" ? (
                          <span className="px-3 py-1 bg-brown text-white text-sm rounded-full">
                            {project.category}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-brown text-white text-sm rounded-full">
                            {project.category?.title || "Project"}
                          </span>
                        )}
                        {Array.isArray(project.category) &&
                          project.category.length > 2 && (
                            <span className="px-3 py-1 bg-gray-600 text-white text-sm rounded-full">
                              +{project.category.length - 2}
                            </span>
                          )}
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      {project.description && (
                        <div className="text-gray-300 text-sm line-clamp-2 mb-3">
                          <p>{project.description}</p>
                        </div>
                      )}

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
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <ContactSection variant="compact" className="mt-20" />
      </div>
    </div>
  );
}
