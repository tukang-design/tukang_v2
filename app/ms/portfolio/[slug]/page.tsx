import { fetchSanity } from "../../../../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Project {
  _id: string;
  title: string;
  description?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  mainImage?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  gallery?: Array<{
    asset?: {
      url: string;
    };
    alt?: string;
  }>;
  client?: string;
  industry?: string;
  role?: string;
  projectUrl?: string;
  technologies?: string[];
  category?: {
    title: string;
  };
  slug: {
    current: string;
  };
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await fetchSanity(
      `*[_type == "portfolioProject" && language == "ms" && slug.current == $slug][0]{
        _id,
        title,
        description,
        challenge,
        solution,
        results,
        mainImage{
          asset->{
            url
          },
          alt
        },
        gallery[]{
          asset->{
            url
          },
          alt
        },
        client,
        industry,
        role,
        projectUrl,
        technologies,
        category->{
          title
        },
        slug
      }`,
      { slug }
    );
    return project || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function PortfolioDetailPage({
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
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/ms/portfolio"
              className="inline-flex items-center text-accent hover:text-white transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Kembali ke Portfolio
            </Link>
          </div>

          {/* Project Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              {project.category?.title && (
                <span className="inline-block px-4 py-2 bg-brown/10 text-brown rounded-full text-sm font-medium mb-4">
                  {project.category.title}
                </span>
              )}
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-accent font-mono">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {/* Hero Image */}
          <div className="mb-16">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-accent/10">
              {project.mainImage?.asset?.url ? (
                <Image
                  src={project.mainImage.asset.url}
                  alt={project.mainImage.alt || project.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/10 to-brown/10 flex items-center justify-center">
                  <span className="text-gray-400 font-mono text-xl">
                    {project.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="bg-olive-light/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Project Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-olive-dark rounded-2xl p-8 border border-accent/10 sticky top-8">
                <h3 className="text-2xl font-bold text-accent mb-8 font-mono">
                  Butiran Projek
                </h3>

                {project.client && (
                  <div className="mb-6">
                    <h4 className="text-brown font-semibold mb-2">Klien</h4>
                    <p className="text-gray-300">{project.client}</p>
                  </div>
                )}

                {project.industry && (
                  <div className="mb-6">
                    <h4 className="text-brown font-semibold mb-2">Industri</h4>
                    <p className="text-gray-300">{project.industry}</p>
                  </div>
                )}

                {project.role && (
                  <div className="mb-6">
                    <h4 className="text-brown font-semibold mb-2">
                      Peranan Saya
                    </h4>
                    <p className="text-gray-300">{project.role}</p>
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-brown font-semibold mb-2">Teknologi</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.projectUrl && (
                  <div className="mt-8">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-accent text-olive rounded-lg font-bold hover:bg-accent/90 transition-colors duration-200"
                    >
                      Lihat Projek Langsung
                      <svg
                        className="ml-2 w-4 h-4"
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

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-12">
                {project.challenge && (
                  <div>
                    <h3 className="text-3xl font-bold text-accent mb-6 font-mono">
                      Cabaran
                    </h3>
                    <div className="bg-olive-dark rounded-2xl p-8 border border-accent/10">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                  </div>
                )}

                {project.solution && (
                  <div>
                    <h3 className="text-3xl font-bold text-accent mb-6 font-mono">
                      Penyelesaian
                    </h3>
                    <div className="bg-olive-dark rounded-2xl p-8 border border-accent/10">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                )}

                {project.results && (
                  <div>
                    <h3 className="text-3xl font-bold text-accent mb-6 font-mono">
                      Hasil
                    </h3>
                    <div className="bg-olive-dark rounded-2xl p-8 border border-accent/10">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {project.results}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-4xl font-bold text-accent mb-12 text-center font-mono">
              Galeri Projek
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-colors duration-300"
                >
                  <Image
                    src={image.asset?.url || ""}
                    alt={
                      image.alt || `${project.title} galeri imej ${index + 1}`
                    }
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brown/20 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-6 text-accent font-mono">
            Ada Projek Yang Serupa?
          </h3>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Mari kita bincangkan bagaimana kita boleh mencipta sesuatu yang
            menakjubkan bersama-sama.{" "}
            <span className="text-accent font-semibold">
              Setiap projek hebat bermula dengan perbualan.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/ms/contact"
              className="px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-lg font-bold text-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-300 transform hover:scale-105"
            >
              Mula Projek
            </Link>
            <Link
              href="/ms/portfolio"
              className="px-8 py-4 border-2 border-brown text-brown rounded-lg font-bold text-lg hover:bg-brown hover:text-olive transition-all duration-300"
            >
              Lihat Lebih Banyak Kerja
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
