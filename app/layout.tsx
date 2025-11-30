// app/layout.tsx
// ============================================
// COMPLETE ROOT LAYOUT FOR NEXT.JS
// Just copy and paste this entire file!
// ============================================

import type { Metadata } from "next";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivaay International - Global Agro Products Export",
  description: "Premium agro products export including rice, wheat, and more",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ============================================ */}
        {/* EXTERNAL SCRIPTS - CDN LINKS */}
        {/* ============================================ */}

        {/* Tailwind CSS */}
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />

        {/* GSAP Animation Library */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="afterInteractive"
        />

        {/* GSAP ScrollTrigger Plugin */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />

        {/* jQuery (Optional - remove if not needed) */}
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="afterInteractive"
        />

        {/* Font Awesome Icons */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/all.min.js"
          strategy="afterInteractive"
        />

        {/* ============================================ */}
        {/* STYLESHEETS - LINKS */}
        {/* ============================================ */}

        {/* Font Awesome CSS */}

        {/* Google Fonts - Inter */}

        {/* ============================================ */}
        {/* GSAP SETUP SCRIPT */}
        {/* ============================================ */}

        <Script id="gsap-setup" strategy="afterInteractive">
          {`
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
              gsap.registerPlugin(ScrollTrigger);
              console.log('GSAP and ScrollTrigger initialized');
            }
          `}
        </Script>
      </head>

      <body className="bg-gray-50">
        {/* Navigation Component */}
        <Navigation />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer Component */}
        <Footer />
      </body>
      
    </html>
  );
}
