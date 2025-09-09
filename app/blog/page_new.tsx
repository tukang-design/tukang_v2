import { sanityClient } from "../../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { TypedObject } from "@portabletext/types";

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

export default async function BlogPage() {
  const posts = await getBlogPosts("en");

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-olive-dark via-olive to-olive-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-accent rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-48 h-48 border border-brown-500 rotate-12"
            style={{ animation: "spin 20s linear infinite" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Breadcrumb */}
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

            {/* Hero Badge */}
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

            {/* Hero Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-accent font-mono mb-8 leading-tight">
              Design
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-brown-500 to-accent">
                Chronicles
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Explore insights, tutorials, and stories from the world of design
              and development. Learn from real projects and discover new
              approaches to creating digital experiences.
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-center">
              <div className="bg-accent/10 backdrop-blur-sm rounded-2xl border border-accent/20 px-6 py-4">
                <div className="text-2xl font-bold text-accent font-mono">
                  {posts.length}
                </div>
                <div className="text-sm text-gray-400">Articles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 mx-auto mb-8 bg-accent/10 rounded-full flex items-center justify-center">
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
              <h3 className="text-2xl font-bold text-accent mb-4">
                No articles yet
              </h3>
              <p className="text-gray-300 mb-8">
                We're working on creating some amazing content for you.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {posts.map((post) => (
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

                      <div className="absolute top-6 right-6">
                        <div className="px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs text-olive font-bold">
                          New
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 h-1 w-full bg-olive/50">
                        <div className="h-full bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                      <div className="flex items-center">
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
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-accent mb-4 leading-tight group-hover:text-accent/90 transition-colors duration-300">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-colors duration-300"
                    >
                      Read Article
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
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
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
