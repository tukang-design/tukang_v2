"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [submissionId, setSubmissionId] = useState<string>("");

  useEffect(() => {
    // Get submission ID from sessionStorage
    const storedSubmissionId = sessionStorage.getItem("bookingSubmissionId");
    if (storedSubmissionId) {
      setSubmissionId(storedSubmissionId);
      // Clear it from sessionStorage after retrieving
      sessionStorage.removeItem("bookingSubmissionId");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive via-olive-dark to-olive">
      {/* Header */}
      <section className="relative py-16 bg-gradient-to-br from-olive-dark via-olive to-olive-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-accent rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 border border-brown rotate-12"
            style={{ animation: "spin 20s linear infinite" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-24 h-24 border border-accent/30 rounded-lg"
            style={{ animation: "bounce 3s ease-in-out infinite" }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center shadow-2xl shadow-accent/30">
              <svg
                className="w-12 h-12 text-olive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-accent font-mono mb-6 leading-tight">
            Terima Kasih!
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Permintaan tempahan projek anda telah berjaya dihantar.
          </p>

          {submissionId && (
            <div className="mb-8 p-4 bg-accent/10 rounded-xl border border-accent/20 max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-1">Rujukan Tempahan</p>
              <p className="text-lg font-mono text-accent font-semibold">
                {submissionId}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message Card */}
          <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 lg:p-12 mb-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-accent mb-6">
                Kami Telah Menerima Permintaan Anda
              </h2>

              <div className="max-w-2xl mx-auto space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Terima kasih kerana memilih Tukang untuk keperluan projek
                  digital anda. Kami teruja untuk membantu merealisasikan visi
                  anda.
                </p>
                <p>
                  <strong className="text-accent">Langkah Seterusnya:</strong>{" "}
                  Sila jadualkan panggilan penemuan anda di bawah supaya kami
                  boleh membincangkan keperluan projek anda dan memberikan
                  cadangan terperinci.
                </p>
              </div>
            </div>
          </div>

          {/* Google Calendar Scheduling */}
          <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 lg:p-12 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-accent mb-4">
                Jadualkan Panggilan Penemuan Anda
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Mari kita bincangkan projek anda secara terperinci. Pilih masa
                yang sesuai untuk anda, dan kami akan menyelami keperluan, garis
                masa, dan matlamat anda.
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1V0wcP5QyFqmtA8J19rbgQwiGnIH05JiEnsB1VbKDrTdwxfL6w2Ws-apnPGx7ptV8GjvZXX1rt?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                title="Jadualkan Panggilan Penemuan"
              />
            </div>

            <div className="mt-8 text-center">
              <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                <h3 className="font-medium text-accent mb-3">
                  Apa yang dijangkakan dalam panggilan penemuan anda:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Perbincangan skop projek</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Semakan garis masa & bajet</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Keperluan teknikal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-bold text-accent mb-6">
                Lebih Suka Cara Lain Untuk Berhubung?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brown/10 rounded-xl p-6 border border-brown/20">
                  <div className="text-brown mb-3">📧</div>
                  <h4 className="font-medium text-brown mb-2">Emel</h4>
                  <p className="text-sm text-gray-300">hello@tukang.dev</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Respons dalam 4 jam
                  </p>
                </div>

                <div className="bg-brown/10 rounded-xl p-6 border border-brown/20">
                  <div className="text-brown mb-3">📱</div>
                  <h4 className="font-medium text-brown mb-2">WhatsApp</h4>
                  <p className="text-sm text-gray-300">+60 12-345 6789</p>
                  <p className="text-xs text-gray-400 mt-1">Mesej pantas</p>
                </div>

                <div className="bg-brown/10 rounded-xl p-6 border border-brown/20">
                  <div className="text-brown mb-3">💼</div>
                  <h4 className="font-medium text-brown mb-2">LinkedIn</h4>
                  <p className="text-sm text-gray-300">Berhubung dengan kami</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Rangkaian profesional
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/ms"
              className="px-8 py-4 bg-olive-dark border border-accent/20 text-accent rounded-xl font-medium transition-all duration-300 hover:border-accent/40 text-center"
            >
              Kembali ke Halaman Utama
            </Link>

            <Link
              href="/ms/portfolio"
              className="px-8 py-4 bg-olive-dark border border-accent/20 text-accent rounded-xl font-medium transition-all duration-300 hover:border-accent/40 text-center"
            >
              Lihat Kerja Kami
            </Link>

            <Link
              href="/ms/blog"
              className="px-8 py-4 bg-olive-dark border border-accent/20 text-accent rounded-xl font-medium transition-all duration-300 hover:border-accent/40 text-center"
            >
              Baca Blog Kami
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Sertai pelanggan kami yang berpuas hati
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-accent font-mono text-lg">⭐⭐⭐⭐⭐</div>
              <div className="text-gray-400">|</div>
              <div className="text-gray-400 text-sm">50+ Projek Selesai</div>
              <div className="text-gray-400">|</div>
              <div className="text-gray-400 text-sm">
                100% Kepuasan Pelanggan
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
