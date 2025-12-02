"use client";

import { useEffect, useRef,useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Info,
  History,
  Award,
  Target,
  Rocket,
  Eye,
  Heart,
  Medal,
  Handshake,
  Users,
  Lightbulb,
  ArrowRight,
  Boxes,
  Check,
  TrendingUp,
  Shield,
  Globe,
  Star,
  Mail,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

export default function AboutPage() {
  const countersRef = useRef<HTMLDivElement[]>([]);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);
  const testimonialsRef = useRef<(HTMLDivElement | null)[]>([]);
  const faqSectionRef = useRef(null);

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


    useEffect(() => {
      // Scroll to top on mount
      window.scrollTo(0, 0);
  
      const timer = setTimeout(() => {
        // Kill all existing animations
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
          );
  
        // Story Section Animations
        gsap.fromTo(
          ".about-content",
          { x: -80, opacity: 0 },
          {
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          }
        );
  
        gsap.fromTo(
          ".story-image",
          { x: 80, opacity: 0, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          }
        );
  
        gsap.fromTo(
          ".story-badge",
          { scale: 0, opacity: 0 },
          {
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.5,
            ease: "back.out(2)",
          }
        );
  
        // Stats counter animation
        gsap.fromTo(
          ".stat-box",
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          }
        );
  
        // Mission & Vision Cards Animation
        gsap.fromTo(
          ".mission-card",
          { y: 80, opacity: 0 },
          {
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 1,
            ease: "power3.out",
          }
        );
  
        // Mission card icon rotation
        gsap.to(".mission-icon", {
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
          rotation: 360,
          stagger: 0.2,
        });
  
        // Values Section - Staggered entrance
        gsap.fromTo(
          ".value-item",
          { y: 60, opacity: 0, scale: 0.9, rotation: -5 },
          {
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)",
          }
        );
  
        // Team Section - Cards slide in from different directions
        const teamCards = document.querySelectorAll(".team-card");
  
        teamCards.forEach((card, index) => {
          const direction = index % 3 === 0 ? -100 : index % 3 === 1 ? 0 : 100;
  
          gsap.fromTo(
            card,
            {
              x: direction,
              y: index % 3 === 1 ? 100 : 0,
              opacity: 0,
            },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            }
          );
        });
  
        // CTA Section Animation
        gsap.fromTo(
          ".cta-content",
          { y: 60, opacity: 0, scale: 0.95 },
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
  
        // Parallax background elements
        gsap.to(".bg-float", {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: 200,
          rotation: 90,
        });
  
        // Counter animation
        const animateCounter = (element: HTMLDivElement) => {
          const target = parseInt(element.getAttribute("data-count") || "0");
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
  
          const updateCounter = () => {
            current += step;
            if (current < target) {
              element.textContent = Math.floor(current).toString();
              requestAnimationFrame(updateCounter);
            } else {
              element.textContent = target.toString();
            }
          };
  
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(entry.target);
              }
            });
          });
  
          observer.observe(element);
        };
  
        countersRef.current.forEach((counter) => {
          if (counter) animateCounter(counter);
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
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !countersRef.current.includes(el)) {
      countersRef.current.push(el);
    }
  };
  // FAQ section animation
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };
  
  // FAQ section animation
  useEffect(() => {
    if (!faqSectionRef.current) return;
  
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          faqSectionRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            scrollTrigger: {
              trigger: faqSectionRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
  
        // Animate individual FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              x: -20,
            },
            {
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=50",
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: index * 0.1,
              ease: "power2.out",
            }
          );
        });
      });
  
      return () => ctx.revert();
    }, 200);
  
    return () => clearTimeout(timer);
  }, []);
// Testimonials animations
useEffect(() => {
  if (!testimonialsRef.current.length) return;

  const timer = setTimeout(() => {
    const ctx = gsap.context(() => {
      testimonialsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card, 
            {
              opacity: 0,
              y: 30,
            },
            {
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, 200);

  return () => clearTimeout(timer);
}, []);
  

  return (
    <main className="min-h-screen">
      <style>{`
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="bg-float absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div
            className="bg-float absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center z-20">
          <div className="hero-badge inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">Our Story</span>
          </div>

          <h1 className="hero-title text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">About Shivaay</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
              International
            </span>
          </h1>

          <p className="hero-description text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Leading the global agro export industry with trust, quality, and
            reliability since our inception. Connecting Indian agricultural
            excellence with international markets.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="about-content">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
                <History className="w-5 h-5" />
                <span className="font-semibold">Our Journey</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pioneering Agro Exports Since 2024
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Shivaay International was founded with a vision to bridge the
                  gap between India&apos;s rich agricultural heritage and global
                  market demands. What started as a small export venture has
                  grown into a trusted name in international agro trade.
                </p>

                <p>
                  We specialize in exporting premium quality rice, wheat,
                  pulses, and spices to distributors across Africa, the United
                  States, Europe, and the Middle East. Our commitment to quality
                  and reliability has earned us the trust of clients worldwide.
                </p>

                <p>
                  Today, we stand as a symbol of Indian agricultural excellence,
                  connecting farmers with global opportunities while maintaining
                  the highest standards of quality and service.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="stat-box text-center">
                  <div
                    ref={addToRefs}
                    className="text-3xl font-bold text-blue-600 mb-2"
                    data-count="50"
                  >
                    0
                  </div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </div>
                <div className="stat-box text-center">
                  <div
                    ref={addToRefs}
                    className="text-3xl font-bold text-green-600 mb-2"
                    data-count="1000"
                  >
                    0
                  </div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="stat-box text-center">
                  <div
                    ref={addToRefs}
                    className="text-3xl font-bold text-yellow-600 mb-2"
                    data-count="50000"
                  >
                    0
                  </div>
                  <div className="text-sm text-gray-600">Tons Exported</div>
                </div>
                <div className="stat-box text-center">
                  <div
                    ref={addToRefs}
                    className="text-3xl font-bold text-purple-600 mb-2"
                    data-count="24"
                  >
                    0
                  </div>
                  <div className="text-sm text-gray-600">/7 Support</div>
                </div>
              </div>
            </div>

            {/* Story Image */}
            <div className="story-image relative">
              <Image
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=2073&q=80"
                alt="Our Export Facility"
                width={2073}
                height={1382}
                className="rounded-2xl shadow-2xl w-full"
                unoptimized
              />
              <div className="story-badge absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      Certified Exporters
                    </div>
                    <div className="text-sm text-gray-600">
                      ISO & FSSAI Certified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        ref={missionRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Our Philosophy</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving agricultural excellence through innovation, quality, and
              global partnerships
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="mission-card bg-white rounded-2xl p-8 shadow-lg border border-blue-100 card-hover">
              <div className="mission-icon w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To become the most trusted global partner for agro product
                exports by delivering superior quality, ensuring reliable supply
                chains, and building lasting relationships with our clients
                worldwide.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Quality assurance at every stage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Sustainable sourcing practices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Timely global delivery</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="mission-card bg-white rounded-2xl p-8 shadow-lg border border-green-100 card-hover">
              <div className="mission-icon w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To revolutionize the global agro export industry by setting new
                standards of excellence, fostering innovation, and creating
                sustainable value for farmers, clients, and communities.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Global market leadership</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Innovation in agricultural exports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Community development initiatives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-600 rounded-full px-4 py-2 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Our Values</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Core principles that guide every decision and action at Shivaay
              International
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="value-item text-center">
              <div className="value-icon w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Medal className="w-9 h-9 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality Excellence
              </h3>
              <p className="text-gray-600">
                Uncompromising commitment to delivering products that meet the
                highest international standards and exceed customer
                expectations.
              </p>
            </div>

            {/* Value 2 */}
            <div className="value-item text-center">
              <div className="value-icon w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reliability
              </h3>
              <p className="text-gray-600">
                Consistent performance and dependable service that builds trust
                and long-term partnerships with our global clients.
              </p>
            </div>

            {/* Value 3 */}
            <div className="value-item text-center">
              <div className="value-icon w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-9 h-9 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Integrity
              </h3>
              <p className="text-gray-600">
                Transparent business practices, ethical sourcing, and honest
                communication in all our dealings.
              </p>
            </div>

            {/* Value 4 */}
            <div className="value-item text-center">
              <div className="value-icon w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-9 h-9 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                Continuous improvement in processes, technology, and services to
                stay ahead in the dynamic global agro market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={teamRef}
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-600 text-white rounded-full px-4 py-2 mb-4">
              <Users className="w-5 h-5" />
              <span className="font-semibold">Our Team</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to driving global agricultural
              excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="team-card bg-white rounded-2xl p-6 text-center shadow-lg card-hover border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden">
                <Users className="text-white w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Rajesh Kumar
              </h3>
              <p className="text-blue-600 font-semibold mb-3 flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                Founder & CEO
              </p>
              <p className="text-gray-600 text-sm">
                With over 15 years in international trade, Rajesh leads our
                vision and global expansion strategies.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="team-card bg-white rounded-2xl p-6 text-center shadow-lg card-hover border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="text-white w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Priya Sharma
              </h3>
              <p className="text-green-600 font-semibold mb-3 flex items-center justify-center gap-2">
                <Award className="w-4 h-4" />
                Head of Operations
              </p>
              <p className="text-gray-600 text-sm">
                Ensures seamless supply chain management and quality control
                across all our export operations.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="team-card bg-white rounded-2xl p-6 text-center shadow-lg card-hover border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Globe className="text-white w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Amit Patel
              </h3>
              <p className="text-purple-600 font-semibold mb-3 flex items-center justify-center gap-2">
                <Handshake className="w-4 h-4" />
                International Relations
              </p>
              <p className="text-gray-600 text-sm">
                Manages global client relationships and market development
                across Africa, US, and Europe.
              </p>
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
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our global network of satisfied clients and experience the
            Shivaay International difference in quality and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group">
              <span className="flex items-center justify-center space-x-2">
                <span>Get In Touch</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            </Link>
            <Link href="/products">
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg group">
              <span className="flex items-center justify-center space-x-2">
                <span>View Products</span>
                <Boxes className="transition-transform duration-300 group-hover:scale-110" />
              </span>
            </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
