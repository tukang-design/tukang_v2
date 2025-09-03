"use client";
import Link from "next/link";
import RegionSelector, {
  getRegionDetails,
} from "../../en/components/region-selector.js";
import { useState } from "react";

interface HomePageClientProps {
  children?: React.ReactNode;
}

export default function HomePageClient({ children }: HomePageClientProps) {
  const [region, setRegion] = useState("INT"); // Default to international while detecting
  const regionDetails = getRegionDetails(region);

  return (
    <div className="min-h-screen bg-olive">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-olive-light opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              <span className="text-accent text-sm font-medium">
                Tersedia untuk Projek Baharu
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-accent font-mono leading-tight">
              Hentikan Urusan
              <br />
              <span className="text-white">Berasingan Dengan</span>
              <br />
              <span className="text-brown">Pereka & Pembangun.</span>
            </h1>

            {/* Supporting Headline */}
            <h2 className="text-xl lg:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Saya adalah pasukan seorang sahaja yang menawarkan penyelesaian
              lengkap dari A ke Z.
              <br />
              <span className="text-accent font-semibold">
                Sebagai seorang Full-Stack Designer,
              </span>{" "}
              saya sendiri yang menguruskan reka bentuk kreatif dan pembangunan
              teknikal.
            </h2>

            {/* Value Proposition */}
            <p className="text-lg text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Mengapa perlu berkoordinasi antara beberapa orang bila anda boleh
              bekerja secara langsung dengan seseorang yang memahami kedua-dua
              visi kreatif dan pelaksanaan teknikal? Saya tawarkan solusi
              lengkap dari A ke Z yang merapatkan jurang antara reka bentuk yang
              cantik dan fungsi yang mantap.
            </p>

            {/* Interactive Region Selector */}
            <div className="mb-12">
              <RegionSelector onChange={setRegion} showSelector={false} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/ms/booking"
                className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-lg font-bold text-lg hover:from-accent/90 hover:to-accent/70 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Tempah Panggilan Penemuan - {regionDetails.symbol}
                  {regionDetails.pricing?.discovery || "Percuma"}
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.002 8.002 0 01-7.908-6.747M3 12c0-4.418 3.582-8 8-8a8.002 8.002 0 017.908 6.747"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href="/ms/portfolio"
                className="px-8 py-4 border-2 border-brown text-brown rounded-lg font-bold text-lg hover:bg-brown hover:text-olive transition-all duration-300"
              >
                Lihat Hasil Kerja Saya
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION CARDS SECTION */}
      <section className="py-20 bg-olive-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-accent font-mono">
              Semua Yang Anda Perlukan. Satu Orang Untuk Dipercayai.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dari konsep awal hingga pelancaran akhir, saya mengendalikan
              setiap aspek kehadiran digital anda dengan perhatian kepada detail
              yang hanya datang daripada pemilikan peribadi terhadap keseluruhan
              proses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Design Card */}
            <div className="group bg-olive-dark rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">
                Reka Bentuk Kreatif
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Identiti jenama, reka bentuk UI/UX, dan penceritaan visual yang
                menangkap suara unik anda dan berhubung dengan khalayak anda
                pada tahap emosi.
              </p>
            </div>

            {/* Development Card */}
            <div className="group bg-olive-dark rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-brown/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown/20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-brown"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">
                Pembangunan Teknikal
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Pembangunan web moden menggunakan teknologi terkini,
                dioptimumkan untuk prestasi, keselamatan, dan skalabiliti
                merentas semua peranti.
              </p>
            </div>

            {/* Strategy Card */}
            <div className="group bg-olive-dark rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-accent mb-4">
                Perundingan Strategik
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Analisis perniagaan, penyelidikan pengguna, dan perancangan
                strategik untuk memastikan penyelesaian digital anda selaras
                sempurna dengan matlamat dan khalayak sasaran anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Server Components Section */}
      {children}

      {/* FINAL CALL-TO-ACTION SECTION */}
      <section className="py-20 bg-gradient-to-r from-brown/20 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-accent font-mono">
            Bersedia Untuk Membina Sesuatu Yang Menakjubkan?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Berhenti menguruskan pelbagai kontraktor dan permudahkan projek anda
            dengan seorang profesional yang berdedikasi.{" "}
            <span className="text-accent font-semibold">
              Mari kita cipta sesuatu yang luar biasa bersama-sama.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://calendar.google.com/calendar/u/0/r?pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-accent text-olive rounded-lg font-bold text-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center">
                Jadualkan Perundingan Percuma
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.002 8.002 0 01-7.908-6.747M3 12c0-4.418 3.582-8 8-8a8.002 8.002 0 017.908 6.747"
                  />
                </svg>
              </span>
            </a>
            <Link
              href="/ms/contact"
              className="px-8 py-4 border-2 border-brown text-brown rounded-lg font-bold text-lg hover:bg-brown hover:text-olive transition-all duration-300"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
