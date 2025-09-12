"use client";

import { sanityClient } from "../../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import {
  PrimaryCTA,
  SecondaryCTA,
  ArrowRightIcon,
  ArrowDownIcon,
} from "../components/CTAButton";
import { TypedObject } from "@portabletext/types";
import { useEffect, useState } from "react";

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset?: { url: string }; alt?: string };
  excerpt?: string;
  body: TypedObject | TypedObject[];
  publishedAt: string;
};

export async function getBlogPosts(lang = "en"): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && !(_id in path("drafts.**"))]|order(publishedAt desc){
      _id,
      title,
      slug,
      mainImage{
        asset->{url},
        alt
      },
      excerpt,
      body,
      publishedAt
    }`,
    { lang }
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock categories for demonstration
  const categories = [
    { id: "all", name: "All Posts", count: posts.length },
    { id: "design", name: "Design", count: 0 },
    { id: "development", name: "Development", count: 0 },
    { id: "process", name: "Process", count: 0 },
    { id: "insights", name: "Insights", count: 0 },
  ];

  useEffect(() => {
    getBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-olive flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 font-mono">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive">
      {/* Advanced Hero Section with Tailwind Block Components */}
      <section className="relative py-32 bg-gradient-to-br from-olive-dark via-olive to-olive-light overflow-hidden">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-accent rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-48 h-48 border border-brown-500 rotate-12 animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-accent/30 rounded-lg rotate-45 animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>

          {/* Grid overlay removed to simplify background */}
        </div>

        {/* Glassmorphism Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Breadcrumb with Block Style */}
            <nav className="flex justify-center mb-8">
              <ol className="inline-flex items-center space-x-2 text-sm">
                <li className="flex items-center">
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-accent transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <svg
                    className="w-4 h-4 ml-2 text-gray-400"
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
                </li>
                <li className="text-accent font-medium">Blog</li>
              </ol>
            </nav>

            {/* Hero Badge Block */}
            <div className="mb-12">
              <div className="inline-flex items-center px-6 py-3 bg-accent/10 backdrop-blur-sm rounded-full text-accent text-sm font-medium mb-8 border border-accent/20 shadow-lg shadow-accent/10">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Insights & Articles
              </div>

              {/* Hero Title Block */}
              <h1 className="text-5xl lg:text-7xl font-bold text-accent font-mono mb-8 leading-tight">
                Design
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-brown-500 to-accent">
                  Chronicles
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Deep dives into design thinking, development insights, and the
                intersection of
                <span className="text-accent font-semibold">
                  {" "}
                  creativity and code
                </span>
                .
              </p>
            </div>

            {/* Stats Block Component */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="group p-8 bg-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="text-4xl font-bold text-accent font-mono mb-3">
                  {posts.length}+
                </div>
                <div className="text-gray-300 text-lg">Articles Published</div>
                <div className="mt-4 h-1 w-full bg-accent/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-1000 group-hover:w-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div className="group p-8 bg-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="text-4xl font-bold text-accent font-mono mb-3">
                  5K+
                </div>
                <div className="text-gray-300 text-lg">Monthly Readers</div>
                <div className="mt-4 h-1 w-full bg-accent/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-1000 group-hover:w-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div className="group p-8 bg-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="text-4xl font-bold text-accent font-mono mb-3">
                  12
                </div>
                <div className="text-gray-300 text-lg">Topics Covered</div>
                <div className="mt-4 h-1 w-full bg-accent/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-1000 group-hover:w-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Search & Filter Block */}
      <section className="py-20 bg-gradient-to-r from-olive-dark/80 to-olive/60 backdrop-blur-sm border-y border-accent/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Block */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mb-12">
            <div className="lg:col-span-2">
              <label className="block text-lg font-bold text-accent mb-4 font-mono">
                Search Articles
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for design insights, dev tips, process guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-olive-dark/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-accent/25 focus:border-accent transition-all duration-300 group-hover:border-accent/40 text-lg"
                />
                <svg
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-accent transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-accent mb-4 font-mono">
                Sort Articles
              </label>
              <div className="relative group">
                <select className="w-full px-5 py-5 bg-olive-dark/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl text-gray-300 focus:outline-none focus:ring-4 focus:ring-accent/25 focus:border-accent transition-all duration-300 appearance-none cursor-pointer group-hover:border-accent/40 text-lg">
                  <option
                    value="newest"
                    className="bg-olive-dark text-gray-300"
                  >
                    Latest First
                  </option>
                  <option
                    value="oldest"
                    className="bg-olive-dark text-gray-300"
                  >
                    Oldest First
                  </option>
                  <option
                    value="popular"
                    className="bg-olive-dark text-gray-300"
                  >
                    Most Popular
                  </option>
                </select>
                <svg
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none group-focus-within:text-accent transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-accent mb-6 font-mono">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-8 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? "bg-accent text-olive border-accent shadow-lg shadow-accent/30"
                      : "text-gray-300 border-accent/20 bg-olive-dark/60 backdrop-blur-sm hover:border-accent/50 hover:text-accent hover:bg-olive-dark/80"
                  }`}
                >
                  <span className="relative z-10">
                    {category.name}
                    <span className="ml-2 text-sm opacity-80">
                      ({category.count})
                    </span>
                  </span>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-accent/10 opacity-0 transition-opacity duration-300 ${
                      selectedCategory === category.id
                        ? "opacity-0"
                        : "group-hover:opacity-100"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-6 border border-accent/10">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-lg">
                Showing{" "}
                <span className="text-accent font-bold text-xl">
                  {filteredPosts.length}
                </span>{" "}
                of {posts.length} articles
              </span>
              {searchQuery && (
                <span className="text-sm text-gray-400 bg-accent/10 px-3 py-1 rounded-lg">
                  for &ldquo;
                  <span className="text-accent font-medium">{searchQuery}</span>
                  &rdquo;
                </span>
              )}
            </div>

            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-accent transition-colors duration-200 font-medium">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span>List View</span>
              </button>
              <button className="flex items-center space-x-2 text-accent font-medium">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2h2a2 2 0 002-2V7z"
                  />
                </svg>
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Blog Posts Section with Tailwind Block Components */}
      <section className="py-24 bg-gradient-to-b from-olive via-olive-dark to-olive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header Block */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-4xl lg:text-5xl font-bold text-accent font-mono mb-4 leading-tight">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-300">
                <span className="text-accent font-bold">
                  {filteredPosts.length}
                </span>{" "}
                article{filteredPosts.length !== 1 ? "s" : ""}
                {searchQuery ? " matching your search" : " available"}
              </p>
            </div>

            {/* Advanced View Toggle Block */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-2 border border-accent/10">
                <SecondaryCTA size="md">
                  <span className="hidden sm:inline">Grid</span>
                </SecondaryCTA>
                <SecondaryCTA size="md">
                  <span className="hidden sm:inline">List</span>
                </SecondaryCTA>
              </div>
            </div>
          </div>

          {/* Posts Grid or Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-24">
              {posts.length === 0 ? (
                <div className="max-w-2xl mx-auto">
                  <div className="relative mb-12">
                    <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-accent/10">
                      <svg
                        className="w-16 h-16 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-4 w-2 h-2 bg-accent rounded-full animate-ping"></div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 translate-y-4 w-1 h-1 bg-brown-500 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-accent font-mono mb-8 leading-tight">
                    Content Coming Soon
                  </h3>
                  <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed">
                    We&apos;re crafting exceptional content about design,
                    development, and digital experiences.
                    <span className="text-accent font-semibold">
                      {" "}
                      Stay tuned for insights
                    </span>{" "}
                    that will elevate your work.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <PrimaryCTA icon={<ArrowRightIcon />} iconPosition="right">
                      Subscribe for Updates
                    </PrimaryCTA>
                    <SecondaryCTA href="/work">Browse Portfolio</SecondaryCTA>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <div className="w-32 h-32 bg-gradient-to-br from-brown-500 to-brown-700 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-brown-400">
                    <svg
                      className="w-16 h-16 text-brown-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold text-accent font-mono mb-6">
                    No Results Found
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Try adjusting your search terms or browse our categories to
                    discover relevant content.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <PrimaryCTA onClick={() => setSearchQuery("")}>
                      Clear Search
                    </PrimaryCTA>
                    <SecondaryCTA onClick={() => setSelectedCategory("all")}>
                      Show All Categories
                    </SecondaryCTA>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post._id}
                  className="group relative bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/10 hover:border-accent/30 transition-all duration-700 overflow-hidden hover:transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-accent/20"
                >
                  {post.mainImage?.asset?.url && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.mainImage.asset.url}
                        alt={post.mainImage?.alt || post.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-brown-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      <div className="absolute top-6 right-6 flex flex-col space-y-2">
                        <div className="px-3 py-1 bg-olive/95 backdrop-blur-sm rounded-full text-xs text-accent font-bold border border-accent/20">
                          5 min read
                        </div>
                        <div className="px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs text-olive font-bold">
                          Featured
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 h-1 w-full bg-olive/50">
                        <div className="h-full bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <span className="px-2 py-1 bg-accent/10 text-accent rounded-lg text-xs font-bold mr-3 border border-accent/20">
                            Design
                          </span>
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-xs">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-xs">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          127
                        </div>
                        <div className="flex items-center text-xs">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          23
                        </div>
                      </div>
                    </div>

                    <h2 className="text-xl lg:text-2xl font-bold text-accent font-mono mb-4 group-hover:text-accent/90 transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3 text-base">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mr-3 border border-accent/20">
                            <span className="text-accent font-mono font-bold text-sm">
                              W
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-olive-dark"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-200">
                            Wan Shariff
                          </p>
                          <p className="text-xs text-gray-400">
                            Full-Stack Designer
                          </p>
                        </div>
                      </div>

                      <button className="group/bookmark p-2 hover:bg-accent/10 rounded-xl transition-all duration-200 border border-transparent hover:border-accent/20">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover/bookmark:text-accent transition-colors duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="group/cta flex items-center text-accent hover:text-accent/80 transition-all duration-300 font-bold group-hover:translate-x-2 text-lg"
                      >
                        Read Article
                        <svg
                          className="w-5 h-5 ml-2 group-hover/cta:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </Link>

                      <div className="flex space-x-2">
                        <span className="w-2 h-2 bg-accent/40 rounded-full animate-pulse"></span>
                        <span
                          className="w-2 h-2 bg-brown-300 rounded-full animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-accent/20 rounded-full animate-pulse"
                          style={{ animationDelay: "1s" }}
                        ></span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-brown-50 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700 pointer-events-none"></div>
                </article>
              ))}
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="text-center mt-20">
              <PrimaryCTA icon={<ArrowDownIcon />} iconPosition="right">
                Load More Articles
              </PrimaryCTA>
              <p className="text-gray-400 text-lg mt-6">
                Showing{" "}
                <span className="text-accent font-bold">
                  {filteredPosts.length}
                </span>{" "}
                of {posts.length} articles
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-gradient-to-r from-olive-dark/50 to-brown-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-olive-dark/80 backdrop-blur-sm rounded-3xl p-12 border border-accent/10">
            <h3 className="text-3xl lg:text-4xl font-bold text-accent font-mono mb-6">
              Stay Updated
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get the latest insights on design, development, and digital
              experiences delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-olive border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
              />
              <PrimaryCTA>Subscribe</PrimaryCTA>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
