"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/images/logo1.png";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // ✅ Lucide Icons

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/clients", label: "Clients" },
    { href: "/blog", label: "Blog" },
    { href: "/newsletter", label: "Newsletter" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed w-full z-50 shadow-lg bg-[#0e2c52]/30 
      bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5">
      <div className="max-w-7xl mx-auto px-6 ">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src={Logo.src}
                alt="Shivaay Internationals"
                width={150}
                className="rounded-lg"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-lg transition-all duration-300 relative group ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-white "
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-white text-[#0e2c52] px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className=" p-2 hover:bg-white/10"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 text-white " />
              ) : (
                <Menu className="w-7 h-7 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
  className={`lg:hidden w-full py-4 
  transition-all duration-300 ${isMobileMenuOpen ? "block" : "hidden"}`}
>



          <div className="flex flex-col space-y-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-2 transition-all p-2 duration-300 rounded-lg ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className=" text-[#0e2c52] px-4 py-3 rounded-lg text-center font-semibold transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
