"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

interface Notification {
  text: string;
  type: "success" | "error" | "";
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState<Notification>({
    text: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const showNotification = (msg: string, type: "success" | "error") => {
    setNotification({ text: msg, type });
    setTimeout(() => setNotification({ text: "", type: "" }), 5000);
  };

  const handleNewsletterSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      showNotification("Thank you for subscribing!", "success");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <footer className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Shivaay International</h3>
              <p className="text-blue-200">
                Global exporters of premium agro products including rice, wheat,
                and more.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Rice
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Wheat
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Grains
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center space-x-2">
                <Mail size={18} />
                <span>Newsletter</span>
              </h4>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  onClick={handleNewsletterSubmit}
                  disabled={isLoading}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-full font-semibold transition-colors disabled:opacity-70"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>
              &copy; {currentYear} Shivaay International. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Notification Toast */}
      {notification.text && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 flex items-center space-x-3 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{notification.text}</span>
        </div>
      )}
    </>
  );
};

export default Footer;
