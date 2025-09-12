import React from "react";
import { notFound } from "next/navigation";
import { sanityClient } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../../lib/portable-text-components";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "../../components/ContactSection";

interface PortfolioProject {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: {
    asset: { url: string };
    alt: string;
  };
  gallery?: Array<{
    asset: { url: string };
    alt: string;
    caption?: string;
  }>;
  shortDescription?: PortableTextBlock[];
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  results?: PortableTextBlock[];
  category?: string[];
  client?: string;
  industry?: string;
  role?: string;
  technologies?: string[];
  projectUrl?: string;
  description?: string; // Fallback for old schema
  _isFallback?: boolean;
}

interface PortableTextBlock {
  _key: string;
  _type: string;
  children?: Array<{
    _key: string;
    _type: string;
    text: string;
  }>;
  markDefs?: unknown[];
  style?: string;
}

async function getProject(slug: string): Promise<PortfolioProject | null> {
  const query = `
    *[_type == "portfolioProject" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      mainImage {
        asset -> { url },
        alt
      },
      gallery[] {
        asset -> { url },
        alt,
        caption
      },
      shortDescription[] {
        ...,
        _type == "image" => {
          ...,
          asset -> { url },
          alt,
          caption
        }
      },
      challenge[] {
        ...,
        _type == "image" => {
          ...,
          asset -> { url },
          alt,
          caption
        }
      },
      solution[] {
        ...,
        _type == "image" => {
          ...,
          asset -> { url },
          alt,
          caption
        }
      },
      results[] {
        ...,
        _type == "image" => {
          ...,
          asset -> { url },
          alt,
          caption
        }
      },
      category,
      client,
      industry,
      role,
      technologies,
      projectUrl,
      description
    }
  `;

  try {
    const project = await sanityClient.fetch(
      query,
      {},
      { next: { revalidate: 0 } }
    );
    return project || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-olive">
      {/* Hero Section - Full width with image moved to right */}
      <div className="max-w-7xl mx-auto px-4 pt-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[60vh]">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center">
            {/* Back Button - Constrained width */}
            <div className="w-full mx-auto pt-12">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors mb-8"
              >
                <svg
                  className="w-4 h-4"
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
                Back to Work
              </Link>
            </div>
            <div className="mb-6">
              {project.category && project.category.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.category.map((cat, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-brown-500 text-white text-sm rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="px-4 py-2 bg-brown-500 text-white text-sm rounded-full">
                  Project
                </span>
              )}

              {project._isFallback && (
                <span className="ml-2 px-3 py-1 bg-accent text-white text-xs rounded">
                  English Version
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-6">
              {project.title}
            </h2>

            {/* Description with proper PortableText handling */}
            <div className="text-xl text-gray-300 prose prose-invert max-w-none">
              {project.shortDescription &&
              Array.isArray(project.shortDescription) ? (
                <PortableText
                  value={project.shortDescription}
                  components={portableTextComponents}
                />
              ) : project.description ? (
                <p>{project.description}</p>
              ) : (
                <p>Project description coming soon...</p>
              )}
            </div>
          </div>

          {/* Right side - Main Image */}
          <div className="relative h-full min-h-[60vh]">
            {project.mainImage?.asset?.url && (
              <div className="relative rounded-2xl overflow-hidden w-full h-full">
                <Image
                  src={project.mainImage.asset.url}
                  alt={project.mainImage.alt || project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section - Two columns (2xl + 5xl) */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Left Column - 2xl width (Project Details + ToC) */}
        <div className="lg:col-span-2">
          {/* Project Details */}
          <div className="bg-olive-dark rounded-2xl p-8 border border-gray-700 mb-8 sticky top-28">
            <h3 className="text-xl font-mono font-semibold text-accent mb-6">
              Project Details
            </h3>

            <div className="space-y-6">
              {project.client && (
                <div>
                  <h4 className="font-semibold text-white mb-2">Client</h4>
                  <p className="text-gray-300 text-sm">{project.client}</p>
                </div>
              )}

              {project.industry && (
                <div>
                  <h4 className="font-semibold text-white mb-2">Industry</h4>
                  <p className="text-gray-300 text-sm">{project.industry}</p>
                </div>
              )}

              {project.role && (
                <div>
                  <h4 className="font-semibold text-white mb-2">Our Role</h4>
                  <p className="text-gray-300 text-sm">{project.role}</p>
                </div>
              )}

              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.projectUrl && (
                <div>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors w-full justify-center"
                  >
                    View Live Project
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - 5xl width (Content sections) */}
        <div className="bg-olive-dark rounded-2xl p-8 border border-gray-700 mb-8 lg:col-span-5 space-y-16">
          {/* Challenge */}
          {project.challenge &&
            Array.isArray(project.challenge) &&
            project.challenge.length > 0 && (
              <section id="challenge">
                <h2 className="text-3xl font-mono font-bold text-white mb-8">
                  The Challenge
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <PortableText
                    value={project.challenge}
                    components={portableTextComponents}
                  />
                </div>
              </section>
            )}

          {/* Solution */}
          {project.solution &&
            Array.isArray(project.solution) &&
            project.solution.length > 0 && (
              <section id="solution">
                <h2 className="text-3xl font-mono font-bold text-white mb-8">
                  The Solution
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <PortableText
                    value={project.solution}
                    components={portableTextComponents}
                  />
                </div>
              </section>
            )}

          {/* Results */}
          {project.results &&
            Array.isArray(project.results) &&
            project.results.length > 0 && (
              <section id="results">
                <h2 className="text-3xl font-mono font-bold text-white mb-8">
                  The Results
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <PortableText
                    value={project.results}
                    components={portableTextComponents}
                  />
                </div>
              </section>
            )}

          {/* Project Gallery - Full width */}
          {project.gallery && project.gallery.length > 0 && (
            <section id="gallery" className="max-w-7xl mx-auto px-4 mt-20">
              <h2 className="text-3xl font-mono font-bold text-white mb-12 text-center">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-video rounded-xl overflow-hidden"
                  >
                    <Image
                      src={image.asset.url}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                        <p className="text-white text-sm">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Contact Section - Constrained width */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <ContactSection variant="compact" />
      </div>
    </div>
  );
}
