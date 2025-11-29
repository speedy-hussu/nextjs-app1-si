"use client";

import Link from "next/link";
import Image from "next/image";

// Types
interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  bgGradient: string;
  border: string;
}

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  color: string;
}

interface Advantage {
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
          <span className="text-sm font-medium text-white">What We Offer</span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">Comprehensive</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
            Export Services
          </span>
        </h1>

        <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
          End-to-end agro export solutions tailored to meet global market
          demands. From sourcing to delivery, we handle every aspect of your
          export requirements.
        </p>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div
      className={`bg-gradient-to-br ${service.bgGradient} rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border ${service.border} shadow-lg`}
    >
      <div
        className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
      >
        <i className={`fas ${service.icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        {service.description}
      </p>
      <ul className="space-y-3 text-gray-600">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <i className="fas fa-check-circle text-green-500 text-sm"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main Services Section Component
const MainServicesSection = () => {
  const services: Service[] = [
    {
      icon: "fa-search",
      title: "Quality Sourcing",
      description:
        "We source premium quality agro products directly from trusted farmers and certified suppliers, ensuring consistent quality and reliable supply.",
      features: [
        "Direct farmer partnerships",
        "Rigorous quality checks",
        "Certified suppliers only",
      ],
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-white to-blue-50",
      border: "border-blue-100",
    },
    {
      icon: "fa-vial",
      title: "Quality Control",
      description:
        "Comprehensive quality testing and certification to meet international standards and specific client requirements.",
      features: [
        "Laboratory testing",
        "International certifications",
        "Custom quality parameters",
      ],
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-white to-green-50",
      border: "border-green-100",
    },
    {
      icon: "fa-box",
      title: "Processing & Packaging",
      description:
        "State-of-the-art processing facilities and customized packaging solutions to preserve product quality and meet market specifications.",
      features: [
        "Custom packaging",
        "Modern processing units",
        "Quality preservation",
      ],
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-white to-purple-50",
      border: "border-purple-100",
    },
    {
      icon: "fa-ship",
      title: "International Logistics",
      description:
        "Efficient shipping and logistics management by sea and air, ensuring timely delivery to destinations worldwide.",
      features: [
        "Sea & air freight",
        "Temperature control",
        "Real-time tracking",
      ],
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient: "from-white to-yellow-50",
      border: "border-yellow-100",
    },
    {
      icon: "fa-file-contract",
      title: "Documentation & Compliance",
      description:
        "Complete documentation handling and regulatory compliance for smooth customs clearance and international trade.",
      features: [
        "Export documentation",
        "Customs clearance",
        "Regulatory compliance",
      ],
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-white to-red-50",
      border: "border-red-100",
    },
    {
      icon: "fa-headset",
      title: "Customer Support",
      description:
        "Dedicated account management and 24/7 support to ensure seamless communication and address any concerns promptly.",
      features: [
        "Dedicated account managers",
        "24/7 multilingual support",
        "Regular updates",
      ],
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-white to-indigo-50",
      border: "border-indigo-100",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-cogs"></i>
            <span className="font-semibold">Our Services</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            End-to-End Export Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive agro export services that ensure quality,
            reliability, and timely delivery to international markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section Component
const ProcessSection = () => {
  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "Enquiry & Requirement Analysis",
      description:
        "We understand your specific needs, quality requirements, and delivery expectations.",
      color: "bg-blue-600",
    },
    {
      number: 2,
      title: "Sourcing & Quality Check",
      description:
        "We source the best products and conduct rigorous quality testing to meet standards.",
      color: "bg-green-600",
    },
    {
      number: 3,
      title: "Processing & Packaging",
      description:
        "Products are processed, packaged, and labeled according to your specifications.",
      color: "bg-yellow-600",
    },
    {
      number: 4,
      title: "Shipping & Delivery",
      description:
        "We handle all logistics and ensure timely delivery to your specified destination.",
      color: "bg-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-sitemap"></i>
            <span className="font-semibold">Our Process</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A streamlined export process designed for efficiency, transparency,
            and customer satisfaction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
                >
                  <span className="text-white text-2xl font-bold">
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-blue-200 hidden lg:block"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section Component
const WhyChooseUsSection = () => {
  const advantages: Advantage[] = [
    {
      icon: "fa-shield-alt",
      title: "Quality Assurance",
      description:
        "Rigorous quality control at every stage ensures that only the finest products reach our clients.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: "fa-clock",
      title: "Timely Delivery",
      description:
        "Efficient logistics and established shipping partnerships guarantee on-time delivery worldwide.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: "fa-hand-holding-usd",
      title: "Competitive Pricing",
      description:
        "Direct sourcing and efficient operations enable us to offer competitive prices without compromising quality.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: "fa-globe",
      title: "Global Network",
      description:
        "Extensive experience in exporting to multiple countries with understanding of diverse market requirements.",
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
              <span className="font-semibold">Why Choose Us</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Shivaay International Advantage
            </h2>

            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${advantage.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <i
                      className={`fas ${advantage.icon} ${advantage.iconColor} text-xl`}
                    ></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
              alt="Export Services"
              width={800}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <i className="fas fa-trophy text-green-600 text-2xl"></i>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    Trusted Partner
                  </div>
                  <div className="text-sm text-gray-600">
                    1000+ Clients Worldwide
                  </div>
                </div>
              </div>
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
          Ready to Start Exporting?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Let us handle your agro export needs with our comprehensive services
          and expertise in international trade.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Get Free Consultation</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
            </span>
          </Link>
          <a
            href="tel:+1234567890"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg group"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Call Our Experts</span>
              <i className="fas fa-phone group-hover:scale-110 transition-transform duration-300"></i>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Main Services Page Component
export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MainServicesSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <CTASection />
    </main>
  );
}
