"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Globe,
  Award,
  Zap,
  Handshake,
  ArrowRight,
  Phone,
  Wheat,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);
  const ctaRef = useRef(null);
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Kill all existing ScrollTriggers and animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");

      // Hero Section Animations
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      heroTimeline
        .fromTo(
          ".hero-badge",
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".hero-stats > div",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-image",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.2)" },
          "-=1.2"
        )
        .fromTo(
          ".floating-card",
          { opacity: 0, scale: 0.5, rotation: -10 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.8"
        );

      // Features Section - Scroll Triggered Animations
      gsap.fromTo(
        ".feature-card",
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotation: 5,
        },
        {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          stagger: {
            each: 0.2,
            from: "start",
          },
          duration: 1,
          ease: "power3.out",
        }
      );

      // Feature card icon rotation on scroll
      gsap.to(".feature-icon", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
        rotation: 360,
        stagger: 0.2,
      });

      // Products Section - Advanced Animations
      const productCards = document.querySelectorAll(".product-card");

      productCards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -100 : 100;

        gsap.fromTo(
          card,
          {
            x: direction,
            opacity: 0,
            rotationY: 15,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "power4.out",
          }
        );

        // Parallax effect for product cards
        const productImage = card.querySelector(".product-image");
        if (productImage) {
          gsap.to(productImage, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -30,
          });
        }
      });

      // CTA Section Animation
      gsap.fromTo(
        ".cta-content",
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Background elements parallax
      gsap.to(".bg-float-1", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        rotation: 90,
      });

      gsap.to(".bg-float-2", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 150,
        rotation: -90,
      });

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      <style>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, #fbbf24 0%, #fcd34d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .product-card:hover .product-image {
          transform: scale(1.1);
        }
        .product-image {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden pt-20"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="bg-float-1 absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="bg-float-2 absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl floating"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white">
              <div className="hero-badge inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">
                  Trusted Global Agro Exporters
                </span>
              </div>

              <h1 className="hero-title text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Premium Agro Products
                <span className="gradient-text block">Global Excellence</span>
              </h1>

              <p className="hero-description text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                Shivaay International exports high-quality rice, wheat, and
                agricultural products to distributors worldwide. Your trusted
                partner for reliable global supply chain solutions.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg text-center group">
                  <Link href="/contact">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Get Free Quote</span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                  </span>
                      </Link>
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg text-center">
                  <Link href="/products">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Explore Products</span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                  </span>
                  </Link>
                </button>
              </div>

              {/* Stats */}
              <div className="hero-stats grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold text-yellow-400 stat-number">
                    50
                  </div>
                  <div className="text-blue-100 text-sm">Countries Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400 stat-number">
                    1000
                  </div>
                  <div className="text-blue-100 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">24/7</div>
                  <div className="text-blue-100 text-sm">Support</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="hero-image relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Agro Products"
                  width={2070}
                  height={1382}
                  className="rounded-2xl shadow-2xl floating"
                  unoptimized
                />
              </div>

              {/* Floating Cards */}
              <div className="floating-card absolute -top-16 -left-6 bg-white rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-shadow  duration-300 floating" >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap className="text-green-600 " size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">
                      Global Shipping
                    </div>
                    <div className="text-sm text-gray-600">Sea & Air</div>
                  </div>
                </div>
              </div>

              <div className="floating-card floating absolute -bottom-16 -right-6 bg-white rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Award className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">
                      Premium Quality
                    </div>
                    <div className="text-sm text-gray-600">Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white/60 text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4">
              <Award size={18} />
              <span className="font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Excellence in Every Export
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine traditional farming values with modern export expertise
              to deliver unparalleled quality and service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 card-hover border border-blue-100">
              <div className="feature-icon w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Global Network
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Extensive distribution network across Africa, US, and
                international markets with reliable shipping partners.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 card-hover border border-green-100">
              <div className="feature-icon w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Rigorous quality control ensuring only the finest agricultural
                products reach our international clients.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-8 card-hover border border-yellow-100">
              <div className="feature-icon w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Efficient shipping solutions by sea and air to meet your
                timeline requirements and business needs.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 card-hover border border-purple-100">
              <div className="feature-icon w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Handshake className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trusted Partnership
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Long-term relationships built on reliability, transparency, and
                exceptional customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section
        ref={productsRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
              <Wheat size={18} />
              <span className="font-semibold">Our Products</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Agro Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of high-quality agricultural products that meet
              international standards and customer expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="product-card bg-white rounded-2xl overflow-hidden card-hover shadow-lg border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600 relative overflow-hidden flex items-center justify-center">
                <div className="product-image">
                  <Sparkles className="text-white opacity-20" size={120} />
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold flex items-center gap-1">
                    <TrendingUp size={14} />
                    Premium
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Premium Basmati Rice
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Aromatic long-grain rice known for its distinctive fragrance
                  and exquisite flavor, perfect for international markets.
                </p>
                <button className="inline-flex items-center space-x-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-300 group">
                  <span>Learn More</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>

            <div className="product-card bg-white rounded-2xl overflow-hidden card-hover shadow-lg border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 relative overflow-hidden flex items-center justify-center">
                <div className="product-image">
                  <Wheat className="text-white opacity-20" size={120} />
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold flex items-center gap-1">
                    <Shield size={14} />
                    Certified
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quality Wheat Grains
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  High-protein wheat grains suitable for various culinary
                  applications, sourced from trusted farmers.
                </p>
                <button className="inline-flex items-center space-x-2 text-yellow-600 font-semibold hover:text-yellow-700 transition-colors duration-300 group">
                  <span>Learn More</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>

            <div className="product-card bg-white rounded-2xl overflow-hidden card-hover shadow-lg border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 relative overflow-hidden flex items-center justify-center">
                <div className="product-image">
                  <Sparkles className="text-white opacity-20" size={120} />
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold flex items-center gap-1">
                    <Award size={14} />
                    Organic
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Organic Spices
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Naturally grown spices with rich aroma and flavor, processed
                  under strict quality control measures.
                </p>
                <button className="inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-300 group">
                  <span>Learn More</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
              <span>View All Products</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=2128&q=80')",
          }}
        ></div>

        <div className="cta-content relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with Shivaay International and experience the difference in
            quality, reliability, and service. Join our global family of
            satisfied distributors today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group">
              <span className="flex items-center justify-center space-x-2">
                <span>Start Partnership</span>
                <Handshake
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </span>
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg group">
              <span className="flex items-center justify-center space-x-2">
                <span>Call Now</span>
                <Phone
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
