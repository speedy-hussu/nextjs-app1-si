"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  TestTube,
  Package,
  Ship,
  FileText,
  Headphones,
  Settings,
  Network,
  Star,
  Shield,
  Clock,
  DollarSign,
  Globe,
  Trophy,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Types
interface Service {
  icon: any;
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
  icon: any;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

// Hero Section Component
const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(titleRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center z-20">
        <div
          ref={badgeRef}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
        >
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="text-sm font-medium text-white">What We Offer</span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          <span className="text-white block">Comprehensive</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
            Export Services
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
        >
          End-to-end agro export solutions tailored to meet global market
          demands. From sourcing to delivery, we handle every aspect of your
          export requirements.
        </p>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const Icon = service.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`bg-gradient-to-br ${service.bgGradient} rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border ${service.border} shadow-lg`}
    >
      <div
        className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
      >
        <Icon className="text-white" size={28} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>

      <p className="text-gray-600 leading-relaxed mb-6">
        {service.description}
      </p>

      <ul className="space-y-3 text-gray-600">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center space-x-3">
            <CheckCircle2 className="text-green-500" size={16} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main Services Section Component
const MainServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services: Service[] = [
    {
      icon: Search,
      title: "Quality Sourcing",
      description:
        "We source premium agro products directly from trusted farmers and certified suppliers.",
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
      icon: TestTube,
      title: "Quality Control",
      description:
        "Full quality testing and certification to meet international standards.",
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
      icon: Package,
      title: "Processing & Packaging",
      description:
        "Modern processing units and customized packaging to preserve quality.",
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
      icon: Ship,
      title: "International Logistics",
      description:
        "Efficient sea and air shipping ensuring timely global delivery.",
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
      icon: FileText,
      title: "Documentation & Compliance",
      description: "Complete documentation handling and regulatory compliance.",
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
      icon: Headphones,
      title: "Customer Support",
      description:
        "24/7 multilingual support and dedicated account management.",
      features: [
        "Dedicated account managers",
        "24/7 support",
        "Regular updates",
      ],
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-white to-indigo-50",
      border: "border-indigo-100",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4">
            <Settings size={16} />
            <span className="font-semibold">Our Services</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            End-to-End Export Solutions
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide complete agro export services ensuring premium quality,
            reliability, and timely delivery across global markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: index * 0.15,
            ease: "back.out(1.7)",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "Enquiry & Requirement Analysis",
      description:
        "We understand your product requirements and quality expectations.",
      color: "bg-blue-600",
    },
    {
      number: 2,
      title: "Sourcing & Quality Check",
      description:
        "Sourcing best products and conducting multiple quality tests.",
      color: "bg-green-600",
    },
    {
      number: 3,
      title: "Processing & Packaging",
      description:
        "Processing, packaging, and labeling according to your needs.",
      color: "bg-yellow-600",
    },
    {
      number: 4,
      title: "Shipping & Delivery",
      description: "We handle logistics and ensure timely worldwide delivery.",
      color: "bg-purple-600",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
            <Network size={16} />
            <span className="font-semibold">Our Process</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Work</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, transparent, and highly efficient export workflow designed
            to deliver the best results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                stepsRef.current[index] = el;
              }}
              className="text-center"
            >
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

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const advantagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out",
      });

      advantagesRef.current.forEach((advantage, index) => {
        if (advantage) {
          gsap.from(advantage, {
            scrollTrigger: {
              trigger: advantage,
              start: "top 85%",
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const advantages: Advantage[] = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Strict quality control to ensure premium-grade products for every shipment.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "Efficient logistics with guaranteed on-time international deliveries.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description:
        "Cost-effective export solutions without compromising quality.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Experienced in exporting to multiple countries with varied market requirements.",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-600 rounded-full px-4 py-2 mb-6">
              <Star size={16} />
              <span className="font-semibold">Why Choose Us</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Shivaay International Advantage
            </h2>

            <div className="space-y-6">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      advantagesRef.current[index] = el;
                    }}
                    className="flex items-start space-x-4"
                  >
                    <div
                      className={`w-12 h-12 ${advantage.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={advantage.iconColor} size={24} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600">{advantage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <Image
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=2064&q=80"
              alt="Export Services"
              width={800}
              height={600}
              className="rounded-2xl shadow-2xl"
            />

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Trophy className="text-green-600" size={28} />
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

// CTA Section
const CTASection = () => {
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ctaRef.current?.children || [], {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=2128&q=80')] bg-cover bg-center opacity-10"></div>

      <div ref={ctaRef} className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Start Exporting?
        </h2>

        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Let us handle your agro export needs with our expertise and complete
          service workflow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Get Free Consultation</span>
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </span>
          </Link>

          <a
            href="tel:+1234567890"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg group"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Call Our Experts</span>
              <Phone
                className="group-hover:scale-110 transition-transform duration-300"
                size={20}
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Main Page Component
export default function ServicesPage() {
  useEffect(() => {
    // Reset scroll position to top on mount
    window.scrollTo(0, 0);

    // Cleanup ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
