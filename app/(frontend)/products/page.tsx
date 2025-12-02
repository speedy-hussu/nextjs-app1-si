// app/products/page.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  Phone,
  Package,
  Sprout,
  Wheat, // For Wheat Grains
  Feather, // For Rice (like a grain/lightness)
  Sparkles, // For Spices
  HeartHandshake, // For Pulses (symbolizing nourishment)
  Globe, // Replacing 🌍
  CheckCircle, // Replacing ✓
  Truck, // Replacing 🚚
} from "lucide-react";

// 1. IMPORT GSAP & SCROLLTRIGGER
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 2. REGISTER PLUGIN GLOBALLY (outside the component)
// This runs once during module loading on the client side.
if (typeof window !== "undefined") {   
  gsap.registerPlugin(ScrollTrigger);
}

// Product type
interface Product {
  id: string;
  name: string;
  category: "rice" | "wheat" | "spices" | "pulses";
  description: string;
  specifications: string;
  image?: string;
}

// Category color config (Using Lucide components)
const categoryColors = {
  rice: {
    gradient: "from-amber-400 to-amber-600",
    text: "text-amber-600",
    bg: "bg-amber-100",
    icon: Feather, // Light, long grain feeling
  },
  wheat: {
    gradient: "from-yellow-400 to-yellow-600",
    text: "text-yellow-600",
    bg: "bg-yellow-100",
    icon: Wheat, // Direct representation
  },
  spices: {
    gradient: "from-red-400 to-red-600",
    text: "text-red-600",
    bg: "bg-red-100",
    icon: Sparkles, // Vibrant, attractive symbol
  },
  pulses: {
    gradient: "from-green-400 to-green-600",
    text: "text-green-600",
    bg: "bg-green-100",
    icon: HeartHandshake, // Healthy, nourishing, supportive
  },
};

// Hero Section
const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Text Animation
      gsap.from(heroRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Background floating animation
      gsap.to(".floating", {
        y: "+=20",
        rotation: 1,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl floating"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl floating"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div
        ref={heroRef}
        className="relative max-w-7xl mx-auto px-6 text-center"
      >
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="text-sm font-medium text-white">
            Premium Agro Products
          </span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Our Premium
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
            Product Range
          </span>
        </h1>

        <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
          Discover our extensive range of high-quality agricultural products,
          carefully sourced and exported to meet international standards and
          customer expectations worldwide.
        </p>
      </div>
    </section>
  );
};

// Product Card
const ProductCard = ({ product }: { product: Product }) => {
  const colors = categoryColors[product.category];
  const IconComponent = colors.icon;

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 shadow-lg product-card">
      <div
        className={`h-48 bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}
      >
        {product.image ? (
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* Use the Lucide Icon component */}
            <IconComponent className="w-16 h-16 opacity-50 text-white" />
          </div>
        )}

        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white text-sm font-semibold">Premium</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <span
            className={`text-xs font-semibold px-3 py-1 ${colors.bg} ${colors.text} rounded-full`}
          >
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </span>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {product.description}
        </p>

{/* dont put in products put in detail page */}

        {/* {product.specifications && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">
              Key Specifications:
            </h4>
            <p className="text-sm text-gray-600">{product.specifications}</p>
          </div>
        )} */}

        <div className="flex items-center justify-between">
          <Link
            href={`/products/${product.id}`}
            className={`inline-flex items-center space-x-2 ${colors.text} font-semibold hover:opacity-80 transition-all duration-300 group`}
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-semibold"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
};

// Filter Buttons
const FilterButtons = ({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) => {
  const filters = [
    { value: "all", label: "All Products" },
    { value: "rice", label: "Rice Varieties" },
    { value: "wheat", label: "Wheat Grains" },
    { value: "spices", label: "Spices" },
    { value: "pulses", label: "Pulses" },
  ];

  return (
    <div className="inline-flex flex-wrap justify-center gap-4 mb-8">
           {" "}
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeFilter === filter.value
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          }`}
        >
                    {filter.label}       {" "}
        </button>
      ))}
         {" "}
    </div>
  );
};

// Main Page
export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scope = useRef(null); // Ref for the main container

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/products");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // GSAP Context for Scoped Animations and Automatic Cleanup
    const ctx = gsap.context(() => {
      // Kill existing ScrollTriggers before creating new ones (important for state changes)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Product cards animation on scroll
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".products-grid", // Use the grid container as the trigger
          start: "top 80%", // Start animation when the grid is 80% from the top
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.15, // Stagger the animation of each card
        ease: "power3.out",
      });

      // Why Choose section animation
      gsap.from(".why-choose-item", {
        scrollTrigger: {
          trigger: ".why-choose-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      });

      // Crucial for Next.js/React: Recalculate ScrollTrigger positions
      ScrollTrigger.refresh();
    }, scope); // <- Scope the animations to the ref

    // Cleanup function for the context, which automatically reverts all GSAP changes
    return () => ctx.revert();
  }, [activeFilter, searchTerm, products]); // Re-run effect when filters/search/products change to animate new items

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFilter =
        activeFilter === "all" || product.category === activeFilter;
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm, products]);

  return (
    <main ref={scope} className="min-h-screen bg-gray-50">
      <HeroSection />

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
                <Search className="text-red-400 w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Error Loading Products
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            // Added products-grid class for GSAP targeting
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                <Search className="text-gray-400 w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600">
                  {products.length === 0
                    ? "No products available at the moment"
                    : "Try adjusting your search or filter criteria"}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 rounded-full px-4 py-2 mb-4">
              <Sprout size={18} />
              <span className="font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quality You Can Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We ensure every product meets international standards and exceeds
              customer expectations
            </p>
          </div>

          {/* Added why-choose-grid class for GSAP targeting */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 why-choose-grid">
            <div className="text-center why-choose-item">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Rigorous quality control at every step
              </p>
            </div>

            <div className="text-center why-choose-item">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="text-green-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Global Reach
              </h3>
              <p className="text-gray-600">
                Exporting to 50+ countries worldwide
              </p>
            </div>

            <div className="text-center why-choose-item">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Certified Products
              </h3>
              <p className="text-gray-600">
                International quality certifications
              </p>
            </div>

            <div className="text-center why-choose-item">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="text-red-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">Timely shipping to your location</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We source a wide variety of agro products. Contact us with your
            specific requirements, and we&apos;ll help you find the perfect solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Custom Enquiry</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <a
              href="tel:+1234567890"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Call Our Experts</span>
                <Phone className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

