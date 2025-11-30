"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Mail,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp,
  Package,
  Tag,
  Award,
  Star,
  ArrowDown,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Message {
  text: string;
  type: "success" | "error" | "info" | "";
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Testimonial {
  initials: string;
  name: string;
  company: string;
  text: string;
  bgColor: string;
  textColor: string;
}

const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<Message>({ text: "", type: "" });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [notification, setNotification] = useState<Message>({
    text: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Refs for animations
  const heroRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const formSectionRef = useRef(null);
  const benefitsSectionRef = useRef(null);
  const benefitItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);
  const faqSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);

  const faqItems: FAQItem[] = [
    {
      question: "How often will I receive the newsletter?",
      answer:
        "We send our main newsletter monthly, with occasional special editions for important market updates, new product launches, or exclusive offers. You'll typically receive 1-2 emails per month.",
    },
    {
      question: "Can I unsubscribe at any time?",
      answer:
        "Absolutely! Every newsletter includes an unsubscribe link in the footer. You can also contact us directly to be removed from our mailing list. We process unsubscribe requests immediately.",
    },
    {
      question: "What type of content do you share?",
      answer:
        "Our newsletter includes market trends, new product information, export regulations updates, pricing insights, success stories from our clients, and expert tips for agro product importers and distributors.",
    },
    {
      question: "Is my email address safe with you?",
      answer:
        "Yes, we take your privacy seriously. We never share, sell, or rent your email address to third parties. Your information is stored securely and used only for sending our newsletter and relevant updates.",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      initials: "JD",
      name: "John Davis",
      company: "Food Imports USA",
      text: "The market insights from Shivaay International's newsletter have been invaluable for our purchasing decisions. We've saved thousands by timing our orders based on their trend analysis.",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      initials: "SM",
      name: "Sarah Mohammed",
      company: "Middle East Distributors",
      text: "As a distributor in the Gulf region, staying updated on Indian agro exports is crucial. Their newsletter provides exactly the information we need to make informed decisions.",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      initials: "MC",
      name: "Michael Chen",
      company: "Asia Pacific Foods",
      text: "The quality standards and export guidelines shared in their newsletter have helped us maintain excellent relationships with our suppliers. Highly recommended for anyone in agro trade.",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  // Hero animations
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from(heroBadgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(heroTitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
      });

      gsap.from(heroDescRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Form and benefits section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formSectionRef.current, {
        scrollTrigger: {
          trigger: formSectionRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(benefitsSectionRef.current, {
        scrollTrigger: {
          trigger: benefitsSectionRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: "power2.out",
      });

      benefitItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
            opacity: 0,
            x: 20,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Testimonials animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      testimonialsRef.current.forEach((card) => {
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
    });

    return () => ctx.revert();
  }, []);

  // FAQ section animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(faqSectionRef.current, {
        scrollTrigger: {
          trigger: faqSectionRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // CTA section animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ctaSectionRef.current, {
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const showNotification = (
    msg: string,
    type: "success" | "error" | "info"
  ) => {
    setNotification({ text: msg, type: type });
    setTimeout(() => setNotification({ text: "", type: "" }), 5000);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setMessage({
        text: "Thank you for subscribing! Check your email to confirm.",
        type: "success",
      });
      setEmail("");
      setIsLoading(false);
      showNotification("Successfully subscribed to newsletter!", "success");
    }, 1000);
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700"
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
            ref={heroBadgeRef}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="text-sm font-medium text-white">
              Stay Informed
            </span>
          </div>

          <h1
            ref={heroTitleRef}
            className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Stay Updated with</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
              Our Newsletter
            </span>
          </h1>

          <p
            ref={heroDescRef}
            className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
          >
            Get the latest insights, market trends, and exclusive updates from
            Shivaay International delivered directly to your inbox.
          </p>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Subscription Form */}
            <div ref={formSectionRef} className="newsletter-content">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
                <Mail size={18} />
                <span className="font-semibold">Subscribe Now</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Join Our Community
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Be the first to know about new product launches, market
                insights, export opportunities, and industry trends. Our
                newsletter is packed with valuable information for agro product
                importers and distributors.
              </p>

              {/* Success/Error Messages */}
              {message.text && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              {/* Subscription Form */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 group disabled:opacity-70"
                >
                  <span>
                    {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
                  </span>
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time. Read our
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {" "}
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div
              ref={benefitsSectionRef}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What You'll Receive
              </h3>

              <div className="space-y-6">
                {/* Benefit Item 1 */}
                <div
                  ref={(el) => {
                    benefitItemsRef.current[0] = el;
                  }}
                  className="flex items-start space-x-4 benefit-item"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Market Insights
                    </h4>
                    <p className="text-gray-600">
                      Regular updates on global agro market trends, pricing, and
                      demand patterns.
                    </p>
                  </div>
                </div>

                {/* Benefit Item 2 */}
                <div
                  ref={(el) => {
                    benefitItemsRef.current[1] = el;
                  }}
                  className="flex items-start space-x-4 benefit-item"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      New Product Launches
                    </h4>
                    <p className="text-gray-600">
                      Be the first to know about new agro products and seasonal
                      availability.
                    </p>
                  </div>
                </div>

                {/* Benefit Item 3 */}
                <div
                  ref={(el) => {
                    benefitItemsRef.current[2] = el;
                  }}
                  className="flex items-start space-x-4 benefit-item"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Tag className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Exclusive Offers
                    </h4>
                    <p className="text-gray-600">
                      Special discounts and promotional offers available only to
                      subscribers.
                    </p>
                  </div>
                </div>

                {/* Benefit Item 4 */}
                <div
                  ref={(el) => {
                    benefitItemsRef.current[3] = el;
                  }}
                  className="flex items-start space-x-4 benefit-item"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Expert Knowledge
                    </h4>
                    <p className="text-gray-600">
                      Tips, guides, and best practices from our export
                      specialists.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      2,500+
                    </div>
                    <div className="text-sm text-gray-600">Subscribers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      Monthly
                    </div>
                    <div className="text-sm text-gray-600">Updates</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      98%
                    </div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
              <Mail size={18} />
              <span className="font-semibold">What Subscribers Say</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from distributors and importers who rely on our newsletter
              for valuable market insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  testimonialsRef.current[idx] = el;
                }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <span
                      className={`${testimonial.textColor} font-bold text-sm`}
                    >
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {`"${testimonial.text}"`}
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSectionRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-600 rounded-full px-4 py-2 mb-4">
              <Info size={18} />
              <span className="font-semibold">FAQ</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our newsletter subscription.
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden">
                <div
                  className="p-6 text-lg font-semibold text-gray-900 flex items-center justify-between cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => toggleFAQ(idx)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform duration-300 ${
                      expandedFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFAQ === idx
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        ref={ctaSectionRef}
        className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800"
      >
        <div className="absolute inset-0 bg-opacity-10 bg-black"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Stay Informed?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of industry professionals who rely on our insights
            for their business success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const element = document.getElementById("email");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center space-x-2 group"
            >
              <span>Subscribe Now</span>
              <ArrowDown
                size={20}
                className="group-hover:translate-y-1 transition-transform duration-300"
              />
            </button>
            <a
              href="/contact"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg flex items-center justify-center space-x-2 group"
            >
              <span>Contact Us</span>
              <Mail
                size={20}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Notification Toast */}
      {notification.text && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 flex items-center space-x-3 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} />
          ) : notification.type === "error" ? (
            <AlertCircle size={20} />
          ) : (
            <Info size={20} />
          )}
          <span>{notification.text}</span>
        </div>
      )}
    </div>
  );
};

export default NewsletterPage;
