"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SanityAsset {
  _type: "image";
  asset: {
    _ref: string;
    url: string;
  };
  alt?: string;
}

interface PortfolioProject {
  _id: string;
  title: string;
  category?: string;
  slug?: {
    current: string;
  };
  mainImage?: SanityAsset;
  galleryImages?: SanityAsset[];
  publishedAt?: string;
  featured?: boolean;
}

function PortfolioShowcase({ projects }: { projects: PortfolioProject[] }) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const currentProject = projects[currentProjectIndex];

  // Get all images for current project (main image + gallery images)
  const allImages = React.useMemo(() => {
    if (!currentProject) return [];

    const images = [];
    if (currentProject.mainImage?.asset?.url) {
      images.push({
        url: currentProject.mainImage.asset.url,
        alt: currentProject.mainImage.alt || currentProject.title,
      });
    }
    if (currentProject.galleryImages) {
      currentProject.galleryImages.forEach((img) => {
        if (img.asset?.url) {
          images.push({
            url: img.asset.url,
            alt: img.alt || currentProject.title,
          });
        }
      });
    }
    return images;
  }, [currentProject]);

  // Auto-transition images on hover
  useEffect(() => {
    if (isHovering && allImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 3000);
      return () => clearInterval(interval);
    } else {
      setCurrentImageIndex(0); // Reset to first image when not hovering
    }
  }, [isHovering, allImages.length]);

  const nextProject = () => {
    console.log(
      "Next project clicked, current:",
      currentProjectIndex,
      "total:",
      projects.length
    );
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    console.log(
      "Previous project clicked, current:",
      currentProjectIndex,
      "total:",
      projects.length
    );
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
    setCurrentImageIndex(0);
  };

  if (!currentProject) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl flex items-center justify-center card">
        <span className="text-gray-400 font-mono">No projects available</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Portfolio Card */}
      <div
        className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          {allImages.length > 0 ? (
            <Image
              src={allImages[currentImageIndex]?.url || ""}
              alt={allImages[currentImageIndex]?.alt || currentProject.title}
              fill
              className="object-cover transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center card">
              <span className="text-gray-400 font-mono">
                {currentProject.title}
              </span>
            </div>
          )}
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="space-y-4">
            {/* Category Badge */}
            {currentProject.category && (
              <span className="inline-block text-xs text-accent bg-accent/10 backdrop-blur-sm px-3 py-1 rounded-full border border-accent/20">
                {currentProject.category}
              </span>
            )}

            {/* Project Title */}
            <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
              {currentProject.title}
            </h3>

            {/* CTA Button */}
            <Link
              href={`/work/${
                currentProject.slug?.current || currentProject._id
              }`}
              className="inline-flex items-center text-accent hover:text-accent/80 transition-colors duration-200 font-medium text-lg group-hover:translate-x-2 transform transition-transform duration-300"
            >
              View Portfolio Details
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Image Indicators */}
        {allImages.length > 1 && (
          <div className="absolute top-4 right-4 flex space-x-1">
            {allImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-accent" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {projects.length > 1 && (
        <div className="flex justify-between items-center mt-6">
          {/* Previous Button */}
          <button
            onClick={prevProject}
            className="p-3 rounded-full bg-olive-dark/80 backdrop-blur-sm border border-accent/20 hover:border-accent/50 hover:bg-olive-dark transition-all duration-300 group cursor-pointer"
            type="button"
          >
            <svg
              className="w-5 h-5 text-accent group-hover:text-accent/80 transition-colors duration-200"
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
          </button>

          {/* Project Counter */}
          <div className="text-gray-300 font-mono text-sm">
            {currentProjectIndex + 1} / {projects.length}
          </div>

          {/* Next Button */}
          <button
            onClick={nextProject}
            className="p-3 rounded-full bg-olive-dark/80 backdrop-blur-sm border border-accent/20 hover:border-accent/50 hover:bg-olive-dark transition-all duration-300 group cursor-pointer"
            type="button"
          >
            <svg
              className="w-5 h-5 text-accent group-hover:text-accent/80 transition-colors duration-200"
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
          </button>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPreview() {
  // Fallback projects for immediate functionality
  const fallbackProjects: PortfolioProject[] = [
    {
      _id: "1",
      title: "E-commerce Platform",
      category: "E-commerce",
      slug: { current: "sample-project-1" },
      mainImage: {
        _type: "image",
        asset: {
          _ref: "image-1",
          url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        },
        alt: "E-commerce Platform",
      },
      galleryImages: [
        {
          _type: "image",
          asset: {
            _ref: "image-1-2",
            url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
          },
          alt: "E-commerce Dashboard",
        },
        {
          _type: "image",
          asset: {
            _ref: "image-1-3",
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80",
          },
          alt: "E-commerce Mobile",
        },
      ],
    },
    {
      _id: "2",
      title: "Corporate Website",
      category: "Business",
      slug: { current: "sample-project-2" },
      mainImage: {
        _type: "image",
        asset: {
          _ref: "image-2",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        },
        alt: "Corporate Website",
      },
      galleryImages: [
        {
          _type: "image",
          asset: {
            _ref: "image-2-2",
            url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
          },
          alt: "Corporate Mobile View",
        },
      ],
    },
    {
      _id: "3",
      title: "SaaS Application",
      category: "Software",
      slug: { current: "sample-project-3" },
      mainImage: {
        _type: "image",
        asset: {
          _ref: "image-3",
          url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        },
        alt: "SaaS Application",
      },
      galleryImages: [
        {
          _type: "image",
          asset: {
            _ref: "image-3-2",
            url: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2532&q=80",
          },
          alt: "SaaS Dashboard",
        },
      ],
    },
  ];

  return <PortfolioShowcase projects={fallbackProjects} />;
}
