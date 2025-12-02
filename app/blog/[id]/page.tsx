"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  User,
  Calendar,
  Folder,
  Clock,
  Newspaper,
  BookOpen,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// Types
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
  excerpt?: string;
  summary?: string;
}

interface Category {
  name: string;
  count: number;
}

const CATEGORY_OPTIONS = [
  "Industry Insights",
  "Export Guidelines",
  "Quality Standards",
];

// Helper to build categories from posts
const buildCategories = (posts: BlogPost[]): Category[] => {
  return CATEGORY_OPTIONS.map((name) => ({
    name,
    count: posts.filter((post) => post.category === name).length,
  }));
};

// Hero Section Component
const HeroSection = ({ post }: { post: BlogPost }) => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
      });

      gsap.from(metaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
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

      <div className="relative max-w-4xl mx-auto px-6 text-center z-20">
        <div
          ref={badgeRef}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
        >
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="text-sm font-medium text-white">Blog Article</span>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
        >
          {post.title}
        </h1>

        <div
          ref={metaRef}
          className="flex flex-wrap justify-center items-center gap-6 text-blue-100"
        >
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Folder className="w-4 h-4" />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sidebar Components
const AboutWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(widgetRef.current, {
        scrollTrigger: {
          trigger: widgetRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 30,
        duration: 0.5,
        ease: "power2.out",
      });
    }, widgetRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={widgetRef}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">About Our Blog</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Stay updated with the latest insights, trends, and expert advice in the
        global agro export industry from Shivaay International.
      </p>
      <a
        href="/about"
        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
      >
        Learn More About Us →
      </a>
    </div>
  );
};

const RecentPostsWidget = ({
  currentPostId,
  posts,
}: {
  currentPostId: string;
  posts: BlogPost[];
}) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(widgetRef.current, {
        scrollTrigger: {
          trigger: widgetRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 30,
        duration: 0.5,
        delay: 0.05,
        ease: "power2.out",
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
        {posts
          .filter((post) => post.id !== currentPostId)
          .slice(0, 4)
          .map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Newspaper className="text-blue-600 w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
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

const CategoriesWidget = ({ categories }: { categories: Category[] }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(widgetRef.current, {
        scrollTrigger: {
          trigger: widgetRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 30,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out",
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
        {categories.map((category, index) => (
          <a
            key={index}
            href={`/blog/category/${category.name
              .toLowerCase()
              .replace(" ", "-")}`}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
          >
            <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300 text-sm">
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

const NewsletterWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(widgetRef.current, {
        scrollTrigger: {
          trigger: widgetRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 30,
        duration: 0.5,
        delay: 0.15,
        ease: "power2.out",
      });
    }, widgetRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={widgetRef}
      className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white mt-8"
    >
      <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
      <p className="text-blue-100 text-sm mb-4">
        Get the latest agro export insights delivered to your inbox.
      </p>
      <a
        href="/newsletter"
        className="block w-full bg-white text-blue-600 text-center py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
      >
        Subscribe Now
      </a>
    </div>
  );
};

// Related Articles Component
const RelatedArticles = ({
  currentPostId,
  posts,
}: {
  currentPostId: string;
  posts: BlogPost[];
}) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const relatedPosts = posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="font-semibold">Continue Reading</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Related Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover more valuable insights from our blog
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post, index) => (
            <article
              key={post.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Newspaper className="text-white w-16 h-16 opacity-50" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  <a
                    href={`/blog/${post.id}`}
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {(post.summary ||
                    post.excerpt ||
                    post.content.substring(0, 160)) + "..."}
                </p>
                <a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 group"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Main Blog Detail Page Component
export default function BlogDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = (params?.id as string) || "";

  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const summaryRef = useRef(null);
  const contentRef = useRef(null);
  const tagsRef = useRef(null);
  const authorRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      if (!postId) return;
      try {
        const [postRes, listRes] = await Promise.all([
          fetch(`/api/blog/${postId}`),
          fetch("/api/blog"),
        ]);

        if (postRes.status === 404) {
          setNotFound(true);
        } else if (postRes.ok) {
          const data: BlogPost = await postRes.json();
          setPost(data);
        }

        if (listRes.ok) {
          const list: BlogPost[] = await listRes.json();
          setAllPosts(list);
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(summaryRef.current, {
        scrollTrigger: {
          trigger: summaryRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(tagsRef.current, {
        scrollTrigger: {
          trigger: tagsRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(authorRef.current, {
        scrollTrigger: {
          trigger: authorRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(navRef.current, {
        scrollTrigger: {
          trigger: navRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const categories = useMemo(() => buildCategories(allPosts), [allPosts]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <a
            href="/blog"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Return to Blog
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroSection post={post} />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Blog Content */}
              <article className="prose prose-lg max-w-none">
                <div
                  ref={summaryRef}
                  className="bg-gray-50 rounded-2xl p-6 mb-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Article Summary
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.summary ||
                      post.excerpt ||
                      post.content.substring(0, 220)}
                  </p>
                </div>

                <div
                  ref={contentRef}
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                >
                  {post.content}
                </div>
              </article>

              {/* Tags */}
              <div
                ref={tagsRef}
                className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-gray-200"
              >
                <span className="text-gray-700 font-semibold">Tags:</span>
                <a
                  href="/blog/tag/agro-export"
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-300"
                >
                  Agro Export
                </a>
                <a
                  href="/blog/tag/quality"
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-200 transition-colors duration-300"
                >
                  Quality Standards
                </a>
                <a
                  href="/blog/tag/trade"
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-300"
                >
                  International Trade
                </a>
              </div>

              {/* Author Bio */}
              <div
                ref={authorRef}
                className="mt-12 pt-12 border-t border-gray-200"
              >
                <div className="flex items-start space-x-6 bg-gray-50 rounded-2xl p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {post.author}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Expert in agro exports and international trade with years
                      of experience helping distributors worldwide source
                      premium quality agricultural products.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div
                ref={navRef}
                className="mt-12 flex justify-between items-center pt-12 border-t border-gray-200"
              >
                <a
                  href="/blog"
                  className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to Blog</span>
                </a>
                <a
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                >
                  Contact Expert
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AboutWidget />
              <RecentPostsWidget currentPostId={postId} posts={allPosts} />
              <CategoriesWidget categories={categories} />
              <NewsletterWidget />
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles currentPostId={postId} posts={allPosts} />
    </main>
  );
}
