"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
  summary: string;
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

// Sample blog post data
const BLOG_POSTS: Record<string, BlogPost> = {
  "1": {
    id: "1",
    title: "The Future of Global Agri-Exports: Trends and Opportunities",
    content: `The global agricultural export market is undergoing significant transformation. With increasing demand for organic and sustainably sourced products, exporters must adapt to evolving consumer preferences and regulatory requirements.

Key trends shaping the industry include:

Digital transformation in supply chain management has revolutionized how agro products are tracked, traced, and delivered worldwide. Advanced technologies enable real-time monitoring and ensure quality maintenance throughout the export process.

Sustainability has become more than just a buzzword—it's now a fundamental requirement for international trade. Buyers increasingly prefer suppliers who can demonstrate eco-friendly farming practices and ethical sourcing.

Quality certifications remain paramount in securing international contracts. ISO standards, organic certifications, and country-specific compliance requirements must be meticulously maintained.

The rise of e-commerce platforms has opened new channels for agro exporters to reach global markets directly, bypassing traditional intermediaries and improving profit margins for farmers.

Climate change adaptation strategies are becoming essential as weather patterns affect crop yields and product availability. Forward-thinking exporters are diversifying their sourcing regions and product portfolios.`,
    author: "Rajesh Kumar",
    date: "January 15, 2024",
    category: "Industry Insights",
    readTime: 5,
    summary:
      "Explore the latest trends transforming the global agricultural export market, including digital transformation, sustainability requirements, and emerging opportunities for exporters.",
  },
  "2": {
    id: "2",
    title: "Quality Standards in Rice Export: What Buyers Look For",
    content: `Exporting rice requires adherence to strict quality standards that vary by destination market. Understanding these parameters is crucial for successful international trade.

Grain characteristics play a vital role in rice export. Buyers evaluate grain length, width, and uniformity. Basmati rice, for instance, must meet specific elongation ratios after cooking.

Moisture content typically ranges between 12-14% for export-grade rice. Higher moisture levels can lead to spoilage during shipping and storage.

Broken grain percentage must be minimized. Premium grades allow only 5% broken grains, while standard grades may accept up to 25%.

Aroma and flavor profiles are particularly important for specialty rice varieties. Natural aging processes enhance these characteristics.

Packaging standards ensure product integrity throughout the supply chain. Export-grade rice requires food-safe, moisture-resistant packaging materials.`,
    author: "Priya Sharma",
    date: "January 12, 2024",
    category: "Quality Standards",
    readTime: 4,
    summary:
      "Learn about the critical quality parameters and standards that international rice buyers expect, from grain characteristics to packaging requirements.",
  },
  "3": {
    id: "3",
    title: "Sustainable Farming Practices in Modern Agriculture",
    content: `Sustainability is no longer an option but a necessity in modern agriculture. At Shivaay International, we work with farmers who implement water conservation techniques, organic pest control, and soil health management.

Water conservation methods include drip irrigation systems that reduce water usage by up to 50% while maintaining crop yields. Rainwater harvesting provides supplementary irrigation during dry periods.

Organic farming practices eliminate synthetic pesticides and fertilizers, producing healthier crops that command premium prices in international markets.

Crop rotation strategies maintain soil fertility naturally and reduce pest populations without chemical intervention.

Carbon sequestration through sustainable practices helps combat climate change while improving soil quality for future generations.`,
    author: "Amit Patel",
    date: "January 8, 2024",
    category: "Sustainability",
    readTime: 6,
    summary:
      "Discover how modern sustainable farming practices benefit both the environment and export business profitability.",
  },
  "4": {
    id: "4",
    title: "Understanding International Shipping for Agro Products",
    content: `Shipping agricultural products internationally involves navigating complex logistics and regulations. Proper documentation, temperature control, and timing are critical factors.

Export documentation requires certificates of origin, phytosanitary certificates, and quality inspection reports. Each destination country has specific requirements.

Container selection depends on product type and shipping duration. Refrigerated containers maintain freshness for temperature-sensitive products.

Shipping routes and timing must consider seasonal factors, port congestion, and delivery deadlines to ensure products arrive in optimal condition.

Insurance coverage protects against transit risks including weather damage, delays, and handling issues.`,
    author: "Neha Gupta",
    date: "January 5, 2024",
    category: "Logistics",
    readTime: 5,
    summary:
      "Navigate the complexities of international agro product shipping with this comprehensive guide to documentation, logistics, and best practices.",
  },
};

const RECENT_POSTS: RecentPost[] = [
  { id: "1", title: "The Future of Global Agri-Exports", date: "Jan 15, 2024" },
  { id: "2", title: "Quality Standards in Rice Export", date: "Jan 12, 2024" },
  { id: "3", title: "Sustainable Farming Practices", date: "Jan 8, 2024" },
  { id: "4", title: "International Shipping Guide", date: "Jan 5, 2024" },
];

const CATEGORIES: Category[] = [
  { name: "Industry Insights", count: 4 },
  { name: "Export Guidelines", count: 2 },
  { name: "Quality Standards", count: 3 },
];

// Hero Section Component
const HeroSection = ({ post }: { post: BlogPost }) => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center z-20">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="text-sm font-medium text-white">Blog Article</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100">
          <div className="flex items-center space-x-2">
            <i className="fas fa-user"></i>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-calendar"></i>
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-folder"></i>
            <span>{post.category}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-clock"></i>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sidebar Components
const AboutWidget = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8">
    <h3 className="text-lg font-bold text-gray-900 mb-4">About Our Blog</h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">
      Stay updated with the latest insights, trends, and expert advice in the
      global agro export industry from Shivaay International.
    </p>
    <Link
      href="/about"
      className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
    >
      Learn More About Us →
    </Link>
  </div>
);

const RecentPostsWidget = ({ currentPostId }: { currentPostId: string }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8">
    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Posts</h3>
    <div className="space-y-4">
      {RECENT_POSTS.filter((post) => post.id !== currentPostId)
        .slice(0, 4)
        .map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fas fa-newspaper text-blue-600 text-sm"></i>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{post.date}</p>
            </div>
          </Link>
        ))}
    </div>
  </div>
);

const CategoriesWidget = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
    <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
    <div className="space-y-2">
      {CATEGORIES.map((category, index) => (
        <Link
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
        </Link>
      ))}
    </div>
  </div>
);

const NewsletterWidget = () => (
  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white mt-8">
    <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
    <p className="text-blue-100 text-sm mb-4">
      Get the latest agro export insights delivered to your inbox.
    </p>
    <Link
      href="/newsletter"
      className="block w-full bg-white text-blue-600 text-center py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
    >
      Subscribe Now
    </Link>
  </div>
);

// Related Articles Component
const RelatedArticles = ({ currentPostId }: { currentPostId: string }) => {
  const relatedPosts = Object.values(BLOG_POSTS)
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-book-open"></i>
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
          {relatedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <i className="fas fa-newspaper text-white text-6xl opacity-50"></i>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-calendar"></i>
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  <Link
                    href={`/blog/${post.id}`}
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.summary.substring(0, 100)}...
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 group"
                >
                  <span>Read More</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>View All Articles</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Main Blog Detail Page Component
export default function BlogDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  const post = BLOG_POSTS[postId];

  // If post not found, show error
  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Return to Blog
          </Link>
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
              {/* Featured Image */}
              {post.image && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* Blog Content */}
              <article className="prose prose-lg max-w-none">
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Article Summary
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
              </article>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-gray-200">
                <span className="text-gray-700 font-semibold">Tags:</span>
                <Link
                  href="/blog/tag/agro-export"
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-300"
                >
                  Agro Export
                </Link>
                <Link
                  href="/blog/tag/quality"
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-200 transition-colors duration-300"
                >
                  Quality Standards
                </Link>
                <Link
                  href="/blog/tag/trade"
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-300"
                >
                  International Trade
                </Link>
              </div>

              {/* Author Bio */}
              <div className="mt-12 pt-12 border-t border-gray-200">
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
              <div className="mt-12 flex justify-between items-center pt-12 border-t border-gray-200">
                <Link
                  href="/blog"
                  className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group"
                >
                  <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-300"></i>
                  <span>Back to Blog</span>
                </Link>
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                >
                  Contact Expert
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AboutWidget />
              <RecentPostsWidget currentPostId={postId} />
              <CategoriesWidget />
              <NewsletterWidget />
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles currentPostId={postId} />
    </main>
  );
}
