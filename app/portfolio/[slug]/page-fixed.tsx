import React from "react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

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
    *[_type == "portfolioProject" && slug.current == "${slug}"][0] {
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
      shortDescription,
      challenge,
      solution,
      results,
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
    const project = await sanityClient.fetch(query);
    return project || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// Safe text extraction from PortableText
const extractTextFromPortableText = (
  portableText: PortableTextBlock[]
): string => {
  if (!Array.isArray(portableText)) return "";

  return portableText
    .filter((block) => block._type === "block")
    .map(
      (block) =>
        block.children
          ?.filter((child) => child._type === "span")
          ?.map((span) => span.text)
          ?.join("") || ""
    )
    .join(" ")
    .trim();
};

// PortableText components for rich content rendering
const portableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { url: string }; alt?: string; caption?: string };
    }) => (
      <div className="my-8">
        {value?.asset?.url && (
          <Image
            src={value.asset.url}
            alt={value.alt || ""}
            width={800}
            height={400}
            className="rounded-lg"
          />
        )}
        {value.caption && (
          <p className="text-sm text-gray-400 mt-2 text-center italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-semibold mb-4 text-accent">{children}</h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-olive">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
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

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
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

            <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-6">
              {project.title}
            </h1>

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

          {/* Project Details Sidebar */}
          <div className="bg-olive-dark rounded-2xl p-8 border border-gray-700 h-fit">
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

        {/* Main Image */}
        {project.mainImage?.asset?.url && (
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-16">
            <Image
              src={project.mainImage.asset.url}
              alt={project.mainImage.alt || project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            {/* Challenge */}
            {project.challenge &&
              Array.isArray(project.challenge) &&
              project.challenge.length > 0 && (
                <section>
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
                <section>
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
                <section>
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
          </div>
        </div>

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-mono font-bold text-white mb-12 text-center">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Call to Action */}
        <section className="mt-20 rounded-2xl p-12 text-center card">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have a Similar Project?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help bring your vision to life with
            our expertise and proven process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Start a Project
            </Link>
            <Link
              href="/work"
              className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              View More Work
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
