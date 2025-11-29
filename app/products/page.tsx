"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Product type definition
interface Product {
  id: string;
  name: string;
  category: "rice" | "wheat" | "spices" | "pulses";
  description: string;
  specifications: string;
  image?: string;
}

// Product data (you can move this to a separate file or fetch from API)
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Basmati Rice",
    category: "rice",
    description:
      "Aromatic long-grain rice known for its distinctive fragrance and exquisite flavor. Perfect for international markets and premium culinary applications.",
    specifications:
      "Extra long grain, aromatic, non-sticky texture, aged for superior quality",
  },
  {
    id: "2",
    name: "Quality Wheat Grains",
    category: "wheat",
    description:
      "High-protein wheat grains suitable for various culinary applications. Sourced from trusted farmers with rigorous quality control.",
    specifications:
      "High protein content, low moisture, uniform grain size, excellent milling quality",
  },
  {
    id: "3",
    name: "Organic Spices",
    category: "spices",
    description:
      "Naturally grown spices with rich aroma and flavor. Processed under strict quality control measures to preserve natural properties.",
    specifications:
      "100% organic, rich aroma, vibrant color, no artificial additives",
  },
  {
    id: "4",
    name: "Premium Lentils",
    category: "pulses",
    description:
      "High-quality lentils with excellent nutritional value. Carefully processed and packed to maintain freshness and quality.",
    specifications:
      "High protein, uniform size, clean processing, excellent cooking quality",
  },
];

// Category colors configuration
const categoryColors = {
  rice: {
    gradient: "from-amber-400 to-amber-600",
    text: "text-amber-600",
    bg: "bg-amber-100",
    icon: "fa-wheat-alt",
  },
  wheat: {
    gradient: "from-yellow-400 to-yellow-600",
    text: "text-yellow-600",
    bg: "bg-yellow-100",
    icon: "fa-bread-slice",
  },
  spices: {
    gradient: "from-red-400 to-red-600",
    text: "text-red-600",
    bg: "bg-red-100",
    icon: "fa-pepper-hot",
  },
  pulses: {
    gradient: "from-green-400 to-green-600",
    text: "text-green-600",
    bg: "bg-green-100",
    icon: "fa-seedling",
  },
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
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

// Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  const colors = categoryColors[product.category];

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 shadow-lg">
      <div
        className={`h-48 bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i
              className={`fas ${colors.icon} text-white text-6xl opacity-50`}
            ></i>
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

        {product.specifications && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              Key Specifications:
            </h4>
            <p className="text-sm text-gray-600">{product.specifications}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link
            href={`/products/${product.id}`}
            className={`inline-flex items-center space-x-2 ${colors.text} font-semibold hover:opacity-80 transition-all duration-300 group`}
          >
            <span>View Details</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
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

// Filter Buttons Component
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
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Main Products Page Component
export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on active filter and search term
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesFilter =
        activeFilter === "all" || product.category === activeFilter;
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Products Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter Section */}
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
              <i className="fas fa-search absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* No Results Message */
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                <i className="fas fa-search text-gray-400 text-5xl mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We source a wide variety of agro products. Contact us with your
            specific requirements, and we'll help you find the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Custom Enquiry</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </span>
            </Link>
            <a
              href="tel:+1234567890"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Call Our Experts</span>
                <i className="fas fa-phone group-hover:scale-110 transition-transform duration-300"></i>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
