import { fetchSanity } from "../../../lib/sanity";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  description?: string;
  mainImage?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  client?: string;
  slug?: {
    current: string;
  };
  category?: {
    title: string;
  };
}

export async function getPortfolioProjects(): Promise<Project[]> {
  try {
    const projects: Project[] = await fetchSanity(
      `*[_type == "portfolioProject" && language == "ms"] | order(_createdAt desc) [0...3] {
        _id,
        title,
        description,
        mainImage{
          asset->{
            url
          },
          alt
        },
        client,
        slug,
        category->{
          title
        }
      }`
    );
    return projects;
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return [];
  }
}

export default async function PortfolioPreview() {
  const projects = await getPortfolioProjects();

  return (
    <section className="py-20 bg-olive-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6 text-accent font-mono">
          Bukti Terletak Pada Produk.
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Berikut adalah beberapa contoh penyelesaian menyeluruh yang telah kami
          sampaikan kepada klien kami.
        </p>

        {/* Portfolio Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.length > 0
            ? projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/ms/portfolio/${project.slug?.current || project._id}`}
                  className="group relative overflow-hidden rounded-2xl bg-olive-dark border border-accent/10 hover:border-accent/30 transition-all duration-300 block"
                >
                  <div className="aspect-video relative overflow-hidden">
                    {project.mainImage?.asset?.url ? (
                      <Image
                        src={project.mainImage.asset.url}
                        alt={project.mainImage.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/10 to-brown/10 flex items-center justify-center">
                        <span className="text-gray-400 font-mono">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-accent">
                        {project.title}
                      </h3>
                      {project.category?.title && (
                        <span className="text-xs text-brown bg-brown/10 px-2 py-1 rounded-full">
                          {project.category.title}
                        </span>
                      )}
                    </div>
                    {project.client && (
                      <p className="text-gray-400 text-sm mb-2">
                        Klien: {project.client}
                      </p>
                    )}
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {project.description || "Lihat butiran projek"}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))
            : // Fallback if no projects are found
              [1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-2xl bg-olive-dark border border-accent/10 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="aspect-video bg-gradient-to-br from-accent/10 to-brown/10 flex items-center justify-center">
                    <span className="text-gray-400 font-mono">
                      Projek {item}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-accent mb-2">
                      Tajuk Projek {item}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Huraian ringkas projek yang menunjukkan kerja yang telah
                      disiapkan.
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
        </div>

        <Link
          href="/ms/portfolio"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-lg font-bold text-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-300 transform hover:scale-105"
        >
          Lihat Semua Kerja Kami
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
