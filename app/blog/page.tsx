"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  User,
  Calendar,
  ArrowRight,
  Newspaper,
  Sprout,
  Tractor,
  Ship,
  ArrowLeft,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  category: string;
  gradient: string;
  icon: string;
}

interface RecentPost {
  id: string;
  title: string;
  date: string;
  image?: string;
}

interface Category {
  name: string;
  count: number;
}

// Icon mapping
const iconMap: { [key: string]: any } = {
  "fa-newspaper": Newspaper,
  "fa-seedling": Sprout,
  "fa-tractor": Tractor,
  "fa-ship": Ship,
};

// Sample blog posts data
const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Global Agri-Exports: Trends and Opportunities",
    excerpt:
      "The global agricultural export market is undergoing significant transformation. With increasing demand for organic and sustainably sourced products...",
    author: "Rajesh Kumar",
    date: "Jan 15, 2024",
    category: "Industry",
    gradient: "from-blue-400 to-blue-600",
    icon: "fa-newspaper",
  },
  {
    id: "2",
    title: "Quality Standards in Rice Export: What Buyers Look For",
    excerpt:
      "Exporting rice requires adherence to strict quality standards that vary by destination market. Key parameters include grain length, aroma, moisture content...",
    author: "Priya Sharma",
    date: "Jan 12, 2024",
    category: "Quality",
    gradient: "from-green-400 to-green-600",
    icon: "fa-seedling",
  },
  {
    id: "3",
    title: "Sustainable Farming Practices in Modern Agriculture",
    excerpt:
      "Sustainability is no longer an option but a necessity in modern agriculture. At Shivaay International, we work with farmers who implement water conservation...",
    author: "Amit Patel",
    date: "Jan 8, 2024",
    category: "Sustainability",
    gradient: "from-yellow-400 to-yellow-600",
    icon: "fa-tractor",
  },
  {
    id: "4",
    title: "Understanding International Shipping for Agro Products",
    excerpt:
      "Shipping agricultural products internationally involves navigating complex logistics and regulations. Key considerations include proper documentation, temperature control...",
    author: "Neha Gupta",
    date: "Jan 5, 2024",
    category: "Logistics",
    gradient: "from-purple-400 to-purple-600",
    icon: "fa-ship",
  },
];

const RECENT_POSTS: RecentPost[] = [
  { id: "1", title: "The Future of Global Agri-Exports", date: "Jan 15, 2024" },
  { id: "2", title: "Quality Standards in Rice Export", date: "Jan 12, 2024" },
  { id: "3", title: "Sustainable Farming Practices", date: "Jan 8, 2024" },
  { id: "4", title: "International Shipping Guide", date: "Jan 5, 2024" },
  { id: "5", title: "Organic Certification Process", date: "Jan 1, 2024" },
];

const CATEGORIES: Category[] = [
  { name: "Industry Insights", count: 4 },
  { name: "Export Guidelines", count: 2 },
  { name: "Quality Standards", count: 3 },
];

// Hero Section Component
const HeroSection = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
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
          <span className="text-sm font-medium text-white">
            Insights & Updates
          </span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span ref={titleRef} className="text-white block">
            Shivaay International
          </span>
          <span
            ref={subtitleRef}
            className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block leading-relaxed"
          >
            Blog
          </span>
        </h1>

        <p
          ref={descRef}
          className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
        >
          Stay updated with the latest trends, insights, and news in the global
          agro export industry. Expert analysis and valuable information for
          importers and distributors.
        </p>
      </div>
    </section>
  );
};

// Blog Post Card Component
const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const cardRef = useRef(null);
  const Icon = iconMap[post.icon] || Newspaper;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 shadow-lg"
    >
      <div
        className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <Icon className="text-white w-16 h-16 opacity-50" />
        </div>
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white text-sm font-semibold">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          <a
            href={`/blog/${post.id}`}
            className="hover:text-blue-600 transition-colors duration-300"
          >
            {post.title}
          </a>
        </h2>

        <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>

        <a
          href={`/blog/${post.id}`}
          className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 group"
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </article>
  );
};

// Sidebar Search Widget Component
const SearchWidget = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(searchRef.current, {
        scrollTrigger: {
          trigger: searchRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }, searchRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={searchRef}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">Search Blog</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

// Recent Posts Widget Component
const RecentPostsWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(widgetRef.current, {
        scrollTrigger: {
          trigger: widgetRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
      });
    }, widgetRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={widgetRef}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {RECENT_POSTS.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.id}`}
            className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Newspaper className="text-blue-600 w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{post.date}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// Categories Widget Component
const CategoriesWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(widgetRef.current, {
        scrollTrigger: {
          trigger: widgetRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    }, widgetRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={widgetRef}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {CATEGORIES.map((category, index) => (
          <a
            key={index}
            href={`/blog/category/${category.name
              .toLowerCase()
              .replace(" ", "-")}`}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
          >
            <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
              {category.name}
            </span>
            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
              {category.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

// Newsletter Section Component
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newsletterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(newsletterRef.current, {
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    }, newsletterRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={newsletterRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Stay Updated</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Subscribe to our newsletter and never miss the latest insights,
          trends, and updates from the world of agro exports.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
      )}

      <div className="flex items-center space-x-2">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentPage === page
                  ? "bg-blue-800 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg flex items-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// Main Blog Page Component
export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 4;

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm) return BLOG_POSTS;

    const term = searchTerm.toLowerCase();
    return BLOG_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <HeroSection />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Blog Posts Grid */}
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {currentPosts.map((post, index) => (
                      <BlogPostCard key={post.id} post={post} index={index} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No Posts Found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search criteria
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SearchWidget onSearch={handleSearch} />
              <RecentPostsWidget />
              <CategoriesWidget />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
