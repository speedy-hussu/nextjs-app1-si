// app/page.tsx
// Home Page Component with GSAP Animations

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Globe, Award, Zap, Handshake, ArrowRight, Phone } from "lucide-react";

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
}

const HomePage: React.FC = () => {
  useEffect(() => {
    // GSAP animations
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Feature cards animation
        gsap.from(".feature-card", {
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          y: 50,
          opacity: 0,
          stagger: 0.2,
          ease: "power3.out",
        });

        // Product cards animation
        gsap.from(".product-card", {
          scrollTrigger: {
            trigger: ".products-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          y: 50,
          opacity: 0,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }
  }, []);

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen hero-gradient relative overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl floating"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl floating"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl floating"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-sm font-medium">
                  Trusted Global Agro Exporters
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Premium Agro Products
                <span className="gradient-text block">Global Excellence</span>
              </h1>

              <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                Shivaay International exports high-quality rice, wheat, and
                agricultural products to distributors worldwide. Your trusted
                partner for reliable global supply chain solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/contact-us"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg text-center group"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Get Free Quote</span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </Link>
                <Link
                  href="/products"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg text-center"
                >
                  Explore Products
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">50+</div>
                  <div className="text-blue-100 text-sm">Countries Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    1000+
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
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Agro Products Export"
                  className="rounded-2xl shadow-2xl floating"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              {/* Floating Cards */}
              <div
                className="absolute -top-16 -left-6 bg-white rounded-2xl p-4 shadow-2xl floating"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">
                      Global Shipping
                    </div>
                    <div className="text-sm text-gray-600">Sea & Air</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-16 -right-6 bg-white rounded-2xl p-4 shadow-2xl floating"
                style={{ animationDelay: "1.5s" }}
              >
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
      <section className="py-20 bg-white features-section">
        <div className="max-w-7xl mx-auto px-6">
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
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 card-hover border border-blue-100 feature-card">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 card-hover border border-green-100 feature-card">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-8 card-hover border border-yellow-100 feature-card">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 card-hover border border-purple-100 feature-card">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 products-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
              <span className="text-lg">🌾</span>
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
            {/* Product 1 */}
            <div className="bg-white rounded-2xl overflow-hidden card-hover shadow-lg border border-gray-100 product-card">
              <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600 relative overflow-hidden flex items-center justify-center">
                <span className="text-6xl opacity-50">🌾</span>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold">
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
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-300 group"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-2xl overflow-hidden card-hover shadow-lg border border-gray-100 product-card">
              <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 relative overflow-hidden flex items-center justify-center">
                <span className="text-6xl opacity-50">🌽</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quality Wheat Grains
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  High-protein wheat grains suitable for various culinary
                  applications, sourced from trusted farmers.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-yellow-600 font-semibold hover:text-yellow-700 transition-colors duration-300 group"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-2xl overflow-hidden card-hover shadow-lg border border-gray-100 product-card">
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 relative overflow-hidden flex items-center justify-center">
                <span className="text-6xl opacity-50">🌶️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Organic Spices
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Naturally grown spices with rich aroma and flavor, processed
                  under strict quality control measures.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-300 group"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>View All Products</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80')`,
          }}
        ></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with Shivaay International and experience the difference in
            quality, reliability, and service. Join our global family of
            satisfied distributors today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Partnership</span>
                <Handshake
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </span>
            </Link>
            <a
              href="tel:+1234567890"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Call Now</span>
                <Phone
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
