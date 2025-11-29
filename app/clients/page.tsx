"use client";

import Link from "next/link";
import Image from "next/image";

// Types
interface Client {
  id: string;
  name: string;
  country: string;
  logo?: string;
  website?: string;
  initials: string;
  gradient: string;
}

interface Region {
  icon: string;
  title: string;
  description: string;
  clientCount: string;
  bgColor: string;
  iconColor: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center z-20">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="text-sm font-medium text-white">Global Network</span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">Our Global</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
            Client Partners
          </span>
        </h1>

        <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
          Trusted by distributors and importers worldwide who rely on Shivaay
          International for premium quality agro products and reliable export
          services.
        </p>
      </div>
    </section>
  );
};

// Client Card Component
const ClientCard = ({ client }: { client: Client }) => {
  return (
    <div className="bg-white rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 shadow-sm">
      <div className="h-24 flex items-center justify-center mb-4">
        {client.logo ? (
          <Image
            src={client.logo}
            alt={client.name}
            width={100}
            height={64}
            className="max-h-16 max-w-full object-contain"
          />
        ) : (
          <div
            className={`w-16 h-16 bg-gradient-to-br ${client.gradient} rounded-xl flex items-center justify-center`}
          >
            <span className="text-white font-bold text-sm">
              {client.initials}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
        {client.name}
      </h3>
      <p className="text-sm text-gray-600 text-center">{client.country}</p>
      {client.website && (
        <a
          href={client.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-blue-600 hover:text-blue-700 text-sm mt-2"
        >
          Visit Website
        </a>
      )}
    </div>
  );
};

// Clients Grid Section Component
const ClientsGridSection = () => {
  const clients: Client[] = [
    {
      id: "1",
      name: "Global Food Distributors Inc.",
      country: "USA",
      website: "https://globalfooddistributors.com",
      initials: "GF",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "2",
      name: "Middle East Trading Company",
      country: "UAE",
      website: "https://metrading.ae",
      initials: "ME",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "3",
      name: "European Organic Markets",
      country: "Germany",
      website: "https://euorganicmarkets.eu",
      initials: "EO",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "4",
      name: "African Import Export Ltd",
      country: "South Africa",
      website: "https://africaimports.co.za",
      initials: "AI",
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      id: "5",
      name: "Asia Pacific Foods",
      country: "Singapore",
      website: "https://asiapacificfoods.sg",
      initials: "AP",
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "6",
      name: "UK Food Importers",
      country: "United Kingdom",
      website: "https://ukfoodimporters.co.uk",
      initials: "UK",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: "7",
      name: "Canadian Grains Corporation",
      country: "Canada",
      website: "https://canadagrains.ca",
      initials: "CG",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      id: "8",
      name: "Australian Markets Pty Ltd",
      country: "Australia",
      website: "https://australiamarkets.com.au",
      initials: "AM",
      gradient: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-handshake"></i>
            <span className="font-semibold">Our Partners</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are proud to serve a diverse portfolio of clients across
            continents, building lasting relationships based on trust and
            quality.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Global Reach Section Component
const GlobalReachSection = () => {
  const regions: Region[] = [
    {
      icon: "fa-flag-usa",
      title: "North America",
      description:
        "Serving major distributors in USA and Canada with premium agro products",
      clientCount: "50+ Clients",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: "fa-globe-europe",
      title: "Europe",
      description:
        "Exporting to UK, Germany, France and other European markets",
      clientCount: "80+ Clients",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: "fa-mosque",
      title: "Middle East",
      description: "Strong presence in UAE, Saudi Arabia, and GCC countries",
      clientCount: "120+ Clients",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: "fa-globe-africa",
      title: "Africa & Asia",
      description:
        "Extensive network across African nations and Southeast Asia",
      clientCount: "150+ Clients",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-globe-americas"></i>
            <span className="font-semibold">Global Reach</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Serving Clients Across Continents
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our extensive network spans multiple continents, connecting Indian
            agricultural excellence with global markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-20 h-20 ${region.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
              >
                <i
                  className={`fas ${region.icon} ${region.iconColor} text-3xl`}
                ></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {region.title}
              </h3>
              <p className="text-gray-600 mb-4">{region.description}</p>
              <div className={`font-semibold ${region.iconColor}`}>
                {region.clientCount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partnership Benefits Section Component
const PartnershipBenefitsSection = () => {
  const benefits: Benefit[] = [
    {
      icon: "fa-award",
      title: "Consistent Quality",
      description:
        "Rigorous quality control ensures every shipment meets international standards and client specifications.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: "fa-shipping-fast",
      title: "Reliable Delivery",
      description:
        "Efficient logistics and established shipping partnerships guarantee on-time delivery worldwide.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: "fa-headset",
      title: "Dedicated Support",
      description:
        "Personalized account management and 24/7 support for seamless communication and issue resolution.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: "fa-handshake",
      title: "Long-term Partnership",
      description:
        "We build lasting relationships based on trust, transparency, and mutual growth opportunities.",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-600 rounded-full px-4 py-2 mb-6">
              <i className="fas fa-star"></i>
              <span className="font-semibold">Partnership Benefits</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Clients Choose Us
            </h2>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <i
                      className={`fas ${benefit.icon} ${benefit.iconColor} text-xl`}
                    ></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-quote-left text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold">Mohammed Al-Rashid</h3>
                <p className="text-blue-100">Middle East Food Distributors</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              "Shivaay International has been our trusted partner for rice
              imports for over 3 years. Their consistent quality and reliable
              delivery have helped us grow our business significantly across the
              Middle East region."
            </p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400"></i>
              ))}
              <span className="ml-2 text-blue-100">5.0 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80')] bg-cover bg-center opacity-10"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Join Our Global Family
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Become part of our growing network of satisfied clients worldwide and
          experience the Shivaay International difference in quality and
          service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Become a Client</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
            </span>
          </Link>
          <Link
            href="/products"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg group"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>View Products</span>
              <i className="fas fa-box group-hover:scale-110 transition-transform duration-300"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Main Clients Page Component
export default function ClientsPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ClientsGridSection />
      <GlobalReachSection />
      <PartnershipBenefitsSection />
      <CTASection />
    </main>
  );
}
