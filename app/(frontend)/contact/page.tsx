"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  HelpCircle,
  Info,
  MapPinned,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Types
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface Alert {
  message: string;
  type: "success" | "error";
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Hero Section Component
const HeroSection = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

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

      gsap.from(descRef.current, {
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

      <div className="relative max-w-7xl mx-auto px-6 text-center z-20">
        <div
          ref={badgeRef}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
        >
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="text-sm font-medium text-white">Get In Touch</span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Contact Shivaay</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">
            International
          </span>
        </h1>

        <p
          ref={descRef}
          className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
        >
          Ready to partner with us? Get in touch with our export specialists for
          premium agro products, competitive pricing, and reliable global
          delivery.
        </p>
      </div>
    </section>
  );
};

// Contact Info Component
const ContactInfo = () => {
  const infoRef = useRef(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power2.out",
      });

      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
            opacity: 0,
            x: -20,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={infoRef} className="contact-info">
      <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
        <MapPin size={18} />
        <span className="font-semibold">Our Office</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        Let's Start a Conversation
      </h2>

      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        Whether you're looking for specific agro products, need export
        consultation, or want to discuss partnership opportunities, our team is
        here to help you succeed in the global market.
      </p>

      <div className="space-y-6 mb-8">
        <div
          ref={(el) => {
            itemsRef.current[0] = el;
          }}
          className="flex items-start space-x-4"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Phone className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        <div
          ref={(el) => {
            itemsRef.current[1] = el;
          }}
          className="flex items-start space-x-4"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600">info@shivaayinternational.com</p>
            <p className="text-gray-600">export@shivaayinternational.com</p>
          </div>
        </div>

        <div
          ref={(el) => {
            itemsRef.current[2] = el;
          }}
          className="flex items-start space-x-4"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Address
            </h3>
            <p className="text-gray-600">123 Agro Export Street</p>
            <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
            <p className="text-gray-600">India</p>
          </div>
        </div>

        <div
          ref={(el) => {
            itemsRef.current[3] = el;
          }}
          className="flex items-start space-x-4"
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="text-yellow-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Business Hours
            </h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
            <div className="text-sm text-gray-600">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">1000+</div>
            <div className="text-sm text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">15+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Form Component
const ContactForm = ({ productQuery }: { productQuery: string | null }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [alert, setAlert] = useState<Alert | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setAlert({
        message: "Please fill in all required fields.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlert({
        message: "Please enter a valid email address.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAlert({
        message: "Thank you for your message! We will get back to you soon.",
        type: "success",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch {
      setAlert({
        message: "Something went wrong. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="bg-gray-50 rounded-2xl p-8 contact-form">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Send Us a Message
      </h3>

      {alert && (
        <div
          className={`mb-6 p-4 rounded-xl ${
            alert.type === "success"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            {alert.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Your company name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select a subject</option>
            <option value="Product Enquiry">Product Enquiry</option>
            <option value="Price Quotation">Price Quotation</option>
            <option value="Partnership Opportunity">
              Partnership Opportunity
            </option>
            <option value="Shipping & Logistics">Shipping & Logistics</option>
            <option value="Quality Standards">Quality Standards</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {productQuery && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product of Interest
            </label>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-blue-700 flex items-center space-x-2">
              <Info size={18} />
              <span>
                You're enquiring about: <strong>{productQuery}</strong>
              </span>
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Please provide details about your enquiry, including product specifications, quantities, and any specific requirements..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          <Send
            size={18}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>

        <p className="text-sm text-gray-500 text-center">
          We typically respond within 24 hours during business days.
        </p>
      </div>
    </div>
  );
};

// FAQ Component with smooth accordion
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRef = useRef(null);
  const answersRef = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = [
    {
      question: "What is your minimum order quantity?",
      answer:
        "Our minimum order quantity varies by product. For most agro products, we can accommodate orders starting from 1 container (20-25 tons). We also offer smaller trial orders for new clients to test product quality.",
    },
    {
      question: "Do you provide product samples?",
      answer:
        "Yes, we provide product samples for quality verification. Sample costs and shipping arrangements depend on the product and destination. Contact us with your specific requirements for sample availability.",
    },
    {
      question: "What shipping methods do you use?",
      answer:
        "We primarily use sea freight for bulk orders and air freight for urgent or smaller shipments. We work with reliable shipping partners to ensure safe and timely delivery worldwide.",
    },
    {
      question: "What quality certifications do you have?",
      answer:
        "Our products meet international quality standards including ISO, FSSAI, and other relevant certifications. We provide all necessary documentation for customs clearance and quality assurance.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery time depends on the destination and shipping method. Sea freight typically takes 15-45 days, while air freight takes 3-10 days. We provide exact timelines based on your specific requirements.",
    },
    {
      question: "Do you offer customized packaging?",
      answer:
        "Yes, we offer customized packaging solutions including private labeling, different bag sizes, and special packaging requirements. Discuss your needs with our team for customized options.",
    },
  ];

  // Split into 2 columns (3 + 3)
  const firstColumn = faqs.slice(0, 3);
  const secondColumn = faqs.slice(3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-card", {
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    const newOpenIndex = openIndex === index ? null : index;
    const answerEl = answersRef.current[index];

    if (answerEl) {
      if (newOpenIndex === index) {
        gsap.fromTo(
          answerEl,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(answerEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }

    setOpenIndex(newOpenIndex);
  };

  return (
    <section
      ref={faqRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-4">
            <HelpCircle size={18} />
            <span className="font-semibold">FAQ</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quick answers to common questions about our export process and
            services
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div className="space-y-6">
            {firstColumn.map((faq, index) => {
              const actualIndex = index; // match answersRef index
              return (
                <div
                  key={actualIndex}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 faq-card"
                >
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-between cursor-pointer"
                    onClick={() => handleToggle(actualIndex)}
                  >
                    <span>{faq.question}</span>
                    <i
                      className={`transition-transform duration-300 ${
                        openIndex === actualIndex ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="text-gray-400" size={20} />
                    </i>
                  </h3>

                  <div
                    ref={(el) => {
                      answersRef.current[actualIndex] = el;
                    }}
                    className="text-gray-600 leading-relaxed"
                    style={{ height: 0, overflow: "hidden", opacity: 0 }}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {secondColumn.map((faq, index) => {
              const actualIndex = index + 3; // shift for second column
              return (
                <div
                  key={actualIndex}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 faq-card"
                >
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-between cursor-pointer"
                    onClick={() => handleToggle(actualIndex)}
                  >
                    <span>{faq.question}</span>
                    <i
                      className={`transition-transform duration-300 ${
                        openIndex === actualIndex ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="text-gray-400" size={20} />
                    </i>
                  </h3>

                  <div
                    ref={(el) => {
                      answersRef.current[actualIndex] = el;
                    }}
                    className="text-gray-600 leading-relaxed"
                    style={{ height: 0, overflow: "hidden", opacity: 0 }}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Map Section Component
const MapSection = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mapRef.current, {
        scrollTrigger: {
          trigger: mapRef.current,
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

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 rounded-full px-4 py-2 mb-4">
            <MapPinned size={18} />
            <span className="font-semibold">Visit Us</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Location
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our office to discuss your agro export requirements in person
          </p>
        </div>

        <div
          ref={mapRef}
          className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-96"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.75583729284!2d72.83412831538567!3d19.075557987111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8a0f8f8f8f8%3A0x8f8f8f8f8f8f8f8f!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

// Main Contact Page Component
export default function ContactPage() {
  const [productQuery] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ContactInfo />
            <ContactForm productQuery={productQuery} />
          </div>
        </div>
      </section>

      <FAQSection />
      <MapSection />
    </div>
  );
}
