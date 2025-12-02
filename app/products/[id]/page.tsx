// app/products/[id]/page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  Globe,
  Award,
  Info,
  Check,
  Mail,
  Phone,
  Package,
  ArrowRight,
  Star,
  Truck,
  Handshake,
  Headset,
} from "lucide-react";

// 1. IMPORT GSAP & SCROLLTRIGGER
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 2. REGISTER PLUGIN GLOBALLY (outside the component)
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


const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const scope = useRef(null); // Ref for the main container

  useEffect(() => {
    const fetchData = async () => {
      if (params?.id) {
        const productId = params.id as string;

        try {
          setIsLoading(true);
          
          // Fetch the current product
          const productResponse = await fetch(`/api/products/${productId}`);
          if (!productResponse.ok) {
            setIsLoading(false);
            router.replace("/not-found");
            return;
          }
          const productData = await productResponse.json();
          setProduct(productData);

          // Fetch all products to get related ones
          const allProductsResponse = await fetch("/api/products");
          if (allProductsResponse.ok) {
            const allProducts = await allProductsResponse.json();
            // Get related products (same category, excluding current)
            const related = allProducts.filter(
              (p: Product) =>
                p.category === productData.category && p.id !== productData.id
            ).slice(0, 3);
            setRelatedProducts(related);
          }
        } catch (err) {
          console.error("Error fetching product:", err);
          setIsLoading(false);
          router.replace("/not-found");
          return;
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [params, router]);

  useEffect(() => {
    // GSAP animations - only run when product is loaded and GSAP is registered
    if (!isLoading && product) {
      // 3. USE GSAP CONTEXT FOR SCOPED ANIMATIONS AND CLEANUP
      const ctx = gsap.context(() => {
        // Reset ScrollTrigger positions before new animations
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        // Hero section animation
        gsap.from(".hero-badge", {
          duration: 1.2,
          y: 50,
          opacity: 0,
          ease: "power3.out",
        });

        // Product images animation
        gsap.from(".product-images", {
          scrollTrigger: {
            trigger: ".product-images",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          duration: 1,
          x: -50,
          opacity: 0,
          ease: "power3.out",
        });

        // Product info animation
        gsap.from(".product-info", {
          scrollTrigger: {
            trigger: ".product-info",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          duration: 1,
          x: 50,
          opacity: 0,
          ease: "power3.out",
        });

        // Related products animation
        gsap.from(".related-product", {
          scrollTrigger: {
            trigger: ".related-products-grid", // Use the parent grid as the trigger
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          duration: 1,
          y: 60,
          opacity: 0,
          stagger: 0.3,
          ease: "power3.out",
        });

        // Features animation
        gsap.from(".feature-item", {
          scrollTrigger: {
            trigger: ".features-grid", // Use the parent grid as the trigger
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          duration: 1,
          y: 40,
          opacity: 0,
          stagger: 0.2,
          ease: "power3.out",
        });

        // Ensure ScrollTrigger refreshes after content is loaded and animated
        ScrollTrigger.refresh();
      }, scope); // <- Scope the animations to the ref

      // 4. CLEANUP: Return function to revert context when component unmounts
      return () => ctx.revert();
    }
  }, [isLoading, product]); // Re-run effect when the product loads/changes

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowRight size={20} className="rotate-180" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    // 5. ATTACH REF TO THE MAIN CONTAINER
    <div ref={scope} className="bg-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl floating"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl floating"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center z-20">
          <div className="hero-badge inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="text-sm font-medium text-white">
              Premium Agro Product
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">{product.name}</span>
          </h1>

          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Premium quality {product.name.toLowerCase()} exported worldwide with
            strict quality control and international certifications.
          </p>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Images (product-images class for GSAP) */}
            <div className="product-images">
              <div className="bg-gray-100 rounded-2xl p-8 mb-6">
                <div className="h-96 flex items-center justify-center relative">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain rounded-xl"
                    />
                  ) : (
                    <div className="text-center">
                      <Package
                        className="text-gray-400 mx-auto mb-4"
                        size={96}
                      />
                      <p className="text-gray-500">Product Image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <CheckCircle size={16} />
                  <span>Premium Quality</span>
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <Globe size={16} />
                  <span>Export Ready</span>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <Award size={16} />
                  <span>Certified</span>
                </div>
              </div>
            </div>

            {/* Product Information (product-info class for GSAP) */}
            <div className="product-info">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
                <Info size={18} />
                <span className="font-semibold">Product Details</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>

              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Category:{" "}
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </span>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Check size={14} />
                  <span>In Stock</span>
                </span>
              </div>

              <div className="prose prose-lg text-gray-600 leading-relaxed mb-8">
                {product.description}
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Key Specifications
                  </h3>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="space-y-2">
                      {product.specifications.split("\n").map((spec, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check
                            className="text-green-500 flex-shrink-0 mt-1"
                            size={16}
                          />
                          <span className="text-gray-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Specifications */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Standard Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "International Quality Standards",
                    "Proper Packaging & Labeling",
                    "Quality Certifications",
                    "Timely Delivery",
                    "Customizable Quantities",
                    "Documentation Support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="text-green-500" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg text-center group flex-1"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Request Quote</span>
                    <Mail
                      size={20}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </span>
                </Link>
                <a
                  href="tel:+1234567890"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg text-center group flex-1"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Call Expert</span>
                    <Phone
                      size={20}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
              <Package size={18} />
              <span className="font-semibold">Related Products</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Similar Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover more premium agro products from our extensive range
            </p>
          </div>

          {/* Added related-products-grid class for GSAP trigger */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 shadow-lg related-product"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
                  {relatedProduct.image ? (
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="text-white opacity-50" size={96} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {relatedProduct.description.substring(0, 100)}...
                  </p>
                  <Link
                    href={`/products/${relatedProduct.id}`}
                    className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 group"
                  >
                    <span>View Details</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 rounded-full px-4 py-2 mb-4">
              <Star size={18} />
              <span className="font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Shivaay International Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our commitment to quality and
              service excellence
            </p>
          </div>

          {/* Added features-grid class for GSAP trigger */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 features-grid">
            <div className="text-center feature-item">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Rigorous quality control ensuring international standards
              </p>
            </div>

            <div className="text-center feature-item">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Global Delivery
              </h3>
              <p className="text-gray-600">
                Efficient shipping to destinations worldwide
              </p>
            </div>

            <div className="text-center feature-item">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Handshake className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trusted Partner
              </h3>
              <p className="text-gray-600">
                Reliable service with 1000+ satisfied clients
              </p>
            </div>

            <div className="text-center feature-item">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Headset className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Support
              </h3>
              <p className="text-gray-600">
                Dedicated customer service and technical support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=2128&q=80')`,
          }}
        ></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Order {product.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Contact us today for pricing, samples, and customized solutions
            tailored to your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Get Free Quote</span>
                <Mail
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
                <span>Call Our Expert</span>
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

export default ProductDetailPage;
