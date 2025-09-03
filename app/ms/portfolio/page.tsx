import { fetchSanity } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  description?: string;
  challenge?: string;
  solution?: string;
  mainImage?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  client?: string;
  industry?: string;
  role?: string;
  slug?: {
    current: string;
  };
  category?: {
    title: string;
  };
}

export default async function PortfolioPage() {
  const projects: Project[] = await fetchSanity(
    `*[_type == "portfolioProject" && language == "ms"]{
      _id,
      title,
      description,
      challenge,
      solution,
      mainImage{
        asset->{
          url
        },
        alt
      },
      client,
      industry,
      role,
      slug,
      category->{
        title
      }
    }`
  );

  return (
    <div className="min-h-screen bg-olive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <section className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-accent font-mono">
            Hasil Kerja Kami
          </h1>
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Laman web yang direka dan dibina dengan tujuan yang jelas.
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Berikut adalah pilihan projek terkini kami yang lengkap dari A
            hingga Z. Setiap satu mewakili kerjasama rapat dengan klien untuk
            menyelesaikan cabaran perniagaan yang khusus melalui rekaan yang
            teliti dan pembangunan yang mantap.
          </p>
        </section>

        {/* Portfolio Grid */}
        <section className="mb-16">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-olive-dark rounded-2xl border border-accent/10 p-12">
                <p className="text-gray-300 mb-4 text-xl">
                  Tiada projek dijumpai.
                </p>
                <p className="text-gray-400">
                  Projek akan muncul di sini setelah ia diterbitkan dalam CMS.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: Project) => (
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
                      <h3 className="text-lg font-bold text-accent line-clamp-1">
                        {project.title}
                      </h3>
                      {project.category?.title && (
                        <span className="text-xs text-brown bg-brown/10 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                          {project.category.title}
                        </span>
                      )}
                    </div>
                    {project.client && (
                      <p className="text-gray-400 text-sm mb-2">
                        Klien: {project.client}
                      </p>
                    )}
                    {project.industry && (
                      <p className="text-gray-400 text-sm mb-2">
                        Industri: {project.industry}
                      </p>
                    )}
                    {project.role && (
                      <p className="text-gray-400 text-sm mb-2">
                        Peranan: {project.role}
                      </p>
                    )}
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {project.description ||
                        project.challenge ||
                        "Lihat butiran projek untuk mengetahui lebih lanjut mengenai kerja ini."}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
