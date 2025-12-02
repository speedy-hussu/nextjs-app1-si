// app/layout.tsx
// ============================================
// COMPLETE ROOT LAYOUT FOR NEXT.JS
// Just copy and paste this entire file!
// ============================================

import type { Metadata } from "next";
import Script from "next/script";
import Navigation from "@/app/(frontend)/components/Navigation";
import Footer from "@/app/(frontend)/components/Footer";
import "./globals.css";
import favicon from "../../shivaay-favicon.png"

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
        <link rel="icon" href={favicon.src} />
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
