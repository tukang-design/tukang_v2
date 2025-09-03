"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RegionSelector, {
  getRegionDetails,
} from "../../en/components/region-selector";

type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  popular?: boolean;
};

type ProjectDetails = {
  category: string;
  timeline: string;
  budget: string;
  description: string;
  features: string[];
  selectedAddOns: string[];
};

type ContactInfo = {
  name: string;
  email: string;
  company: string;
  phone: string;
};

type BookingStep =
  | "service"
  | "addons"
  | "details"
  | "contact"
  | "schedule"
  | "summary";

const services: ServiceCategory[] = [
  {
    id: "landing-page",
    name: "Halaman Pendaratan",
    description: "Kempen pemasaran berimpak tinggi & pelancaran produk baharu",
    basePrice: 1500, // MYR base price
    features: [
      "Reka Bentuk UI/UX Strategik",
      "Halaman Tunggal Responsif",
      "Integrasi Borang Hubungan",
      "Pengoptimuman SEO",
      "Prestasi Pemuatan Pantas",
      "Reka Bentuk Mobile-First",
    ],
  },
  {
    id: "business-website",
    name: "Laman Web Perniagaan",
    description:
      "Kehadiran dalam talian yang lengkap dan kredibel untuk PKS (sehingga 5-7 halaman)",
    basePrice: 3000, // MYR base price
    features: [
      "Reka Bentuk Laman Web Berbilang Halaman",
      "Penjenamaan Profesional",
      "Halaman Hubungan & Tentang",
      "Halaman Perkhidmatan/Produk",
      "Asas SEO",
      "Pengurusan Kandungan",
    ],
    popular: true,
  },
  {
    id: "advanced-system",
    name: "Sistem Lanjutan",
    description: "E-dagang, sistem tempahan, atau keperluan khas yang kompleks",
    basePrice: 5000, // MYR base price
    features: [
      "Fungsi Khas",
      "Integrasi Pangkalan Data",
      "Pengesahan Pengguna",
      "Pemprosesan Pembayaran",
      "Panel Pentadbir",
      "Seni Bina Berskala",
    ],
  },
];

type AddOn = {
  id: string;
  name: string;
  description: string;
  basePrice: number; // MYR base price
};

const addOns: AddOn[] = [
  {
    id: "additional-page",
    name: "Halaman Laman Web Tambahan",
    description: "Halaman tambahan untuk laman web anda",
    basePrice: 425, // Average of 350-500 range
  },
  {
    id: "blog-setup",
    name: "Penyediaan Bahagian Blog / Berita",
    description: "Sistem blog lengkap dengan CMS",
    basePrice: 750,
  },
  {
    id: "advanced-form",
    name: "Borang Lanjutan (Logik Bersyarat)",
    description: "Borang pintar dengan medan bersyarat",
    basePrice: 400,
  },
  {
    id: "maintenance",
    name: "Retainer Penyelenggaraan Laman Web",
    description: "Penyelenggaraan dan kemas kini bulanan",
    basePrice: 250,
  },
];

const timelines = [
  { id: "rush", label: "Segera (1-2 minggu)", multiplier: 1.5 },
  { id: "normal", label: "Biasa (3-4 minggu)", multiplier: 1 },
  { id: "extended", label: "Dilanjutkan (5-8 minggu)", multiplier: 0.8 },
];

const budgetRanges = [
  { id: "startup", label: "Pemula ($2K - $5K)", max: 5000 },
  { id: "small", label: "Perniagaan Kecil ($5K - $15K)", max: 15000 },
  { id: "medium", label: "Perniagaan Sederhana ($15K - $50K)", max: 50000 },
  { id: "enterprise", label: "Perusahaan ($50K+)", max: 100000 },
];

export default function BookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] =
    useState<ServiceCategory | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    category: "",
    timeline: "",
    budget: "",
    description: "",
    features: [],
    selectedAddOns: [],
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [region, setRegion] = useState<"MY" | "SG" | "INT">("INT");

  const regionDetails = getRegionDetails(region);

  const calculatePrice = () => {
    if (!selectedService) return 0;

    const timeline = timelines.find((t) => t.id === projectDetails.timeline);
    const multiplier = timeline?.multiplier || 1;

    return Math.round(selectedService.basePrice * multiplier);
  };

  const formatPrice = (price: number) => {
    return `${regionDetails.symbol}${price.toLocaleString()}`;
  };

  const nextStep = () => {
    const steps: BookingStep[] = [
      "service",
      "addons",
      "details",
      "contact",
      "schedule",
      "summary",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: BookingStep[] = [
      "service",
      "addons",
      "details",
      "contact",
      "schedule",
      "summary",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare booking data
      const bookingPayload = {
        service: selectedService,
        projectDetails,
        contactInfo,
        region,
        estimatedPrice: calculatePrice(),
        language: "ms",
        scheduledCall: false, // You can track this based on whether they used the schedule step
      };

      console.log("Menghantar tempahan:", bookingPayload);

      // Submit to API
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        console.log("Tempahan berjaya dihantar:", result);
        // Store submission ID for thank you page
        sessionStorage.setItem("bookingSubmissionId", result.submissionId);
        // Redirect to thank you page
        router.push("/ms/booking/thank-you");
      } else {
        throw new Error(result.error || "Gagal menghantar tempahan");
      }
    } catch (error) {
      console.error("Ralat menghantar tempahan:", error);
      alert(
        "Terdapat ralat semasa menghantar tempahan anda. Sila cuba lagi atau hubungi kami terus."
      );
    }
  };

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
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link
              href="/ms"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
            >
              Halaman Utama
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
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
            <span className="text-accent font-medium">Tempah Projek</span>
          </nav>

          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-accent font-mono mb-6 leading-tight">
              Tempah Projek Anda
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Mari hidupkan visi digital anda. Mulakan dengan proses tempahan
              yang dipermudahkan.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {[
              "service",
              "addons",
              "details",
              "contact",
              "schedule",
              "summary",
            ].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                    currentStep === step
                      ? "bg-accent text-olive border-accent"
                      : [
                          "service",
                          "addons",
                          "details",
                          "contact",
                          "schedule",
                          "summary",
                        ].indexOf(currentStep) > index
                      ? "bg-accent/20 text-accent border-accent/50"
                      : "bg-olive-dark text-gray-400 border-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 5 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                      [
                        "service",
                        "addons",
                        "details",
                        "contact",
                        "schedule",
                        "summary",
                      ].indexOf(currentStep) > index
                        ? "bg-accent/50"
                        : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Region Selector */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <RegionSelector onChange={setRegion} showSelector={true} />
      </div>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step 1: Service Selection */}
          {currentStep === "service" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-accent mb-4">
                  Pilih Perkhidmatan Anda
                </h2>
                <p className="text-gray-300">
                  Pilih perkhidmatan yang sesuai dengan keperluan projek anda
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`relative bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border transition-all duration-500 cursor-pointer hover:transform hover:-translate-y-2 p-8 ${
                      selectedService?.id === service.id
                        ? "border-accent/50 shadow-2xl shadow-accent/20"
                        : "border-accent/20 hover:border-accent/40"
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    {service.popular && (
                      <div className="absolute -top-3 left-6 px-4 py-1 bg-accent text-olive text-sm font-bold rounded-full">
                        Paling Popular
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-accent">
                        {service.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">
                          Bermula dari
                        </div>
                        <div className="text-xl font-bold text-accent">
                          {formatPrice(service.basePrice)}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium text-accent">
                        Apa yang disertakan:
                      </h4>
                      {service.features.slice(0, 4).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <svg
                            className="w-4 h-4 text-accent mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </div>
                      ))}
                      {service.features.length > 4 && (
                        <div className="text-sm text-gray-400">
                          +{service.features.length - 4} ciri lagi
                        </div>
                      )}
                    </div>

                    {selectedService?.id === service.id && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-olive"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Add-ons Selection */}
          {currentStep === "addons" && selectedService && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-accent mb-4">
                  Tingkatkan {selectedService.name} Anda
                </h2>
                <p className="text-gray-300">
                  Pilih add-on pilihan untuk mengembangkan projek anda (anda
                  boleh melangkau langkah ini)
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addOns.map((addOn) => {
                    const isSelected = projectDetails.selectedAddOns.includes(
                      addOn.id
                    );
                    const addOnPrice =
                      region === "MY"
                        ? `RM${addOn.basePrice.toLocaleString()}`
                        : region === "SG"
                        ? `SGD${Math.round(
                            addOn.basePrice * 0.63
                          ).toLocaleString()}`
                        : `€${Math.round(
                            addOn.basePrice * 0.25
                          ).toLocaleString()}`;

                    return (
                      <div
                        key={addOn.id}
                        className={`bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border transition-all duration-300 cursor-pointer p-6 ${
                          isSelected
                            ? "border-accent/50 bg-accent/5"
                            : "border-accent/20 hover:border-accent/40"
                        }`}
                        onClick={() => {
                          const newAddOns = isSelected
                            ? projectDetails.selectedAddOns.filter(
                                (id) => id !== addOn.id
                              )
                            : [...projectDetails.selectedAddOns, addOn.id];
                          setProjectDetails({
                            ...projectDetails,
                            selectedAddOns: newAddOns,
                          });
                        }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div
                              className={`w-6 h-6 rounded-lg border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? "border-accent bg-accent"
                                  : "border-accent/30"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-4 h-4 text-olive"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-accent">
                              {addOn.name}
                            </h3>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-accent">
                              {addOnPrice}
                            </div>
                            {addOn.id === "maintenance" && (
                              <div className="text-xs text-gray-400">
                                setiap bulan
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {addOn.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Add-ons Summary */}
                {projectDetails.selectedAddOns.length > 0 && (
                  <div className="mt-8 bg-accent/10 rounded-xl p-6 border border-accent/20">
                    <h3 className="text-lg font-medium text-accent mb-4">
                      Add-on Terpilih
                    </h3>
                    <div className="space-y-2">
                      {projectDetails.selectedAddOns.map((addOnId) => {
                        const addOn = addOns.find((a) => a.id === addOnId);
                        if (!addOn) return null;

                        const addOnPrice =
                          region === "MY"
                            ? `RM${addOn.basePrice.toLocaleString()}`
                            : region === "SG"
                            ? `SGD${Math.round(
                                addOn.basePrice * 0.63
                              ).toLocaleString()}`
                            : `€${Math.round(
                                addOn.basePrice * 0.25
                              ).toLocaleString()}`;

                        return (
                          <div
                            key={addOnId}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-gray-300">{addOn.name}</span>
                            <span className="text-accent font-medium">
                              {addOnPrice}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {currentStep === "details" && selectedService && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-accent mb-4">
                  Butiran Projek
                </h2>
                <p className="text-gray-300">
                  Beritahu kami lebih lanjut mengenai projek{" "}
                  {selectedService.name.toLowerCase()} anda
                </p>
              </div>

              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 space-y-8">
                {/* Timeline Selection */}
                <div>
                  <label className="block text-accent font-medium mb-4">
                    Garis Masa Projek
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {timelines.map((timeline) => (
                      <div
                        key={timeline.id}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                          projectDetails.timeline === timeline.id
                            ? "border-accent bg-accent/10"
                            : "border-accent/20 hover:border-accent/40"
                        }`}
                        onClick={() =>
                          setProjectDetails({
                            ...projectDetails,
                            timeline: timeline.id,
                          })
                        }
                      >
                        <div className="text-center">
                          <div className="font-medium text-accent">
                            {timeline.label}
                          </div>
                          {timeline.multiplier !== 1 && (
                            <div className="text-sm text-gray-400 mt-1">
                              {timeline.multiplier > 1 ? "+" : ""}
                              {Math.round((timeline.multiplier - 1) * 100)}%
                              harga
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-accent font-medium mb-4">
                    Julat Bajet
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {budgetRanges.map((budget) => (
                      <div
                        key={budget.id}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                          projectDetails.budget === budget.id
                            ? "border-accent bg-accent/10"
                            : "border-accent/20 hover:border-accent/40"
                        }`}
                        onClick={() =>
                          setProjectDetails({
                            ...projectDetails,
                            budget: budget.id,
                          })
                        }
                      >
                        <div className="font-medium text-accent">
                          {budget.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-accent font-medium mb-4">
                    Penerangan Projek
                  </label>
                  <textarea
                    value={projectDetails.description}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        description: e.target.value,
                      })
                    }
                    placeholder="Beritahu kami tentang matlamat projek anda, khalayak sasaran, dan sebarang keperluan khusus..."
                    className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 resize-none"
                    rows={6}
                  />
                </div>

                {/* Estimated Price */}
                {projectDetails.timeline && (
                  <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-accent">
                          Anggaran Harga
                        </h3>
                        <p className="text-sm text-gray-400">
                          Berdasarkan pilihan anda
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-accent">
                          {formatPrice(calculatePrice())}
                        </div>
                        <div className="text-sm text-gray-400">
                          {regionDetails.currency}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === "contact" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-accent mb-4">
                  Maklumat Hubungan
                </h2>
                <p className="text-gray-300">
                  Bagaimana kami boleh menghubungi anda untuk membincangkan
                  projek anda?
                </p>
              </div>

              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-accent font-medium mb-2">
                      Nama Penuh *
                    </label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, name: e.target.value })
                      }
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      placeholder="Ahmad bin Ali"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-accent font-medium mb-2">
                      Alamat Emel *
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          email: e.target.value,
                        })
                      }
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      placeholder="ahmad@contoh.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-accent font-medium mb-2">
                      Syarikat
                    </label>
                    <input
                      type="text"
                      value={contactInfo.company}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          company: e.target.value,
                        })
                      }
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      placeholder="Syarikat Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-accent font-medium mb-2">
                      Nombor Telefon
                    </label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          phone: e.target.value,
                        })
                      }
                      className="w-full p-4 bg-olive-dark/80 border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                      placeholder="+60 12-345 6789"
                    />
                  </div>
                </div>

                <div className="bg-brown/10 rounded-xl p-6 border border-brown/20">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-6 h-6 text-brown flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-brown mb-2">
                        Apa yang berlaku seterusnya?
                      </h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>
                          • Kami akan menyemak keperluan projek anda dalam masa
                          24 jam
                        </li>
                        <li>
                          • Jadualkan panggilan perundingan untuk membincangkan
                          butiran
                        </li>
                        <li>• Sediakan cadangan terperinci dan garis masa</li>
                        <li>
                          • Mulakan kerja setelah anda meluluskan cadangan
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Schedule Discovery Call */}
          {currentStep === "schedule" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-accent mb-4">
                  Jadualkan Panggilan Penemuan Anda
                </h2>
                <p className="text-gray-300">
                  Mari jadualkan panggilan penemuan untuk membincangkan projek
                  anda secara terperinci. Ini membantu kami memahami keperluan
                  anda dengan lebih baik dan memberikan penyelesaian yang paling
                  tepat.
                </p>
              </div>

              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Apa yang diharapkan dalam panggilan penemuan kami:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-olive text-sm font-bold">1</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white mb-1">
                          Bincangkan matlamat perniagaan anda
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Memahami visi dan keperluan anda
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-olive text-sm font-bold">2</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white mb-1">
                          Semak skop projek
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Tentukan masa dan hasil yang diharapkan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-olive text-sm font-bold">3</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white mb-1">
                          Jawab soalan anda
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Menangani sebarang kebimbangan atau pertanyaan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-olive text-sm font-bold">4</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white mb-1">
                          Berikan langkah seterusnya
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Beri anda cadangan projek yang terperinci
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Calendar Embed */}
                <div className="bg-white rounded-2xl p-4">
                  <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2FER0ii_SkwzbGtA7U9vXkuZNtBk0lLTF-1SqOm2-KJjbX2ItApF8VhPKyDUNGhNOjMhXCLdPQ"
                    style={{ border: 0 }}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    className="rounded-xl"
                  ></iframe>
                </div>

                <div className="text-center border-t border-accent/20 pt-6">
                  <p className="text-gray-300 mb-4">
                    Lebih suka berbincang melalui e-mel? Anda boleh melangkau
                    penjadualan dan kami akan menghubungi anda dalam masa 24
                    jam.
                  </p>
                  <button
                    onClick={() => setCurrentStep("summary")}
                    className="px-8 py-3 bg-olive-dark text-white rounded-xl hover:bg-olive-dark/80 transition-all duration-300 border border-gray-600 hover:border-accent/50"
                  >
                    Langkau & Teruskan Melalui E-mel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Summary */}
          {currentStep === "summary" && selectedService && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-accent mb-4">
                  Ringkasan Projek
                </h2>
                <p className="text-gray-300">
                  Sila semak butiran projek anda sebelum menghantar permintaan
                  tempahan anda
                </p>
              </div>

              <div className="bg-gradient-to-br from-olive-dark/80 to-olive-dark/60 backdrop-blur-sm rounded-3xl border border-accent/20 p-8 space-y-8">
                {/* Service Summary */}
                <div className="border-b border-accent/20 pb-6">
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Perkhidmatan Dipilih
                  </h3>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-accent">
                        {selectedService.name}
                      </h4>
                      <p className="text-gray-300 text-sm mt-1">
                        {selectedService.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent">
                        {formatPrice(calculatePrice())}
                      </div>
                      <div className="text-sm text-gray-400">
                        Anggaran Harga
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details Summary */}
                <div className="border-b border-accent/20 pb-6">
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Butiran Projek
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-400">Garis Masa</div>
                      <div className="text-accent font-medium">
                        {
                          timelines.find(
                            (t) => t.id === projectDetails.timeline
                          )?.label
                        }
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Julat Bajet</div>
                      <div className="text-accent font-medium">
                        {
                          budgetRanges.find(
                            (b) => b.id === projectDetails.budget
                          )?.label
                        }
                      </div>
                    </div>
                  </div>
                  {projectDetails.description && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-400 mb-2">
                        Penerangan
                      </div>
                      <div className="text-gray-300 bg-olive-dark/50 p-4 rounded-xl">
                        {projectDetails.description}
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Summary */}
                <div>
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Maklumat Hubungan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-400">Nama</div>
                      <div className="text-accent font-medium">
                        {contactInfo.name}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Emel</div>
                      <div className="text-accent font-medium">
                        {contactInfo.email}
                      </div>
                    </div>
                    {contactInfo.company && (
                      <div>
                        <div className="text-sm text-gray-400">Syarikat</div>
                        <div className="text-accent font-medium">
                          {contactInfo.company}
                        </div>
                      </div>
                    )}
                    {contactInfo.phone && (
                      <div>
                        <div className="text-sm text-gray-400">Telefon</div>
                        <div className="text-accent font-medium">
                          {contactInfo.phone}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
            <button
              onClick={prevStep}
              disabled={currentStep === "service"}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentStep === "service"
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-olive-dark border border-accent/20 text-accent hover:border-accent/40"
              }`}
            >
              Sebelumnya
            </button>

            {currentStep === "summary" ? (
              <button
                onClick={handleSubmit}
                disabled={!contactInfo.name || !contactInfo.email}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                  !contactInfo.name || !contactInfo.email
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-accent to-accent/80 text-olive hover:shadow-lg hover:shadow-accent/30"
                }`}
              >
                Hantar Permintaan Tempahan
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === "service" && !selectedService) ||
                  (currentStep === "details" &&
                    (!projectDetails.timeline || !projectDetails.budget)) ||
                  (currentStep === "contact" &&
                    (!contactInfo.name || !contactInfo.email)) ||
                  currentStep === "schedule"
                }
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  (currentStep === "service" && !selectedService) ||
                  (currentStep === "details" &&
                    (!projectDetails.timeline || !projectDetails.budget)) ||
                  (currentStep === "contact" &&
                    (!contactInfo.name || !contactInfo.email)) ||
                  currentStep === "schedule"
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-accent to-accent/80 text-olive hover:shadow-lg hover:shadow-accent/30"
                }`}
              >
                {currentStep === "addons"
                  ? "Teruskan"
                  : currentStep === "contact"
                  ? "Jadualkan Panggilan"
                  : "Seterusnya"}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
