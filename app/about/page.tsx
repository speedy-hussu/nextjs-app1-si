'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const countersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Counter animation
    const animateCounter = (element: HTMLDivElement) => {
      const target = parseInt(element.getAttribute('data-count') || '0');
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
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(element);
    };

    countersRef.current.forEach(counter => {
      if (counter) animateCounter(counter);
    });
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !countersRef.current.includes(el)) {
      countersRef.current.push(el);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center z-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="text-sm font-medium text-white">Our Story</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">About Shivaay</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 block">International</span>
          </h1>
          
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Leading the global agro export industry with trust, quality, and reliability since our inception. 
            Connecting Indian agricultural excellence with international markets.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="about-content">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
                <i className="fas fa-history"></i>
                <span className="font-semibold">Our Journey</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Pioneering Agro Exports Since 2024</h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Shivaay International was founded with a vision to bridge the gap between India's rich agricultural heritage 
                  and global market demands. What started as a small export venture has grown into a trusted name in 
                  international agro trade.
                </p>
                
                <p>
                  We specialize in exporting premium quality rice, wheat, pulses, and spices to distributors across Africa, 
                  the United States, Europe, and the Middle East. Our commitment to quality and reliability has earned us 
                  the trust of clients worldwide.
                </p>
                
                <p>
                  Today, we stand as a symbol of Indian agricultural excellence, connecting farmers with global opportunities 
                  while maintaining the highest standards of quality and service.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div ref={addToRefs} className="text-3xl font-bold text-blue-600 mb-2" data-count="50">0</div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </div>
                <div className="text-center">
                  <div ref={addToRefs} className="text-3xl font-bold text-green-600 mb-2" data-count="1000">0</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div ref={addToRefs} className="text-3xl font-bold text-yellow-600 mb-2" data-count="50000">0</div>
                  <div className="text-sm text-gray-600">Tons Exported</div>
                </div>
                <div className="text-center">
                  <div ref={addToRefs} className="text-3xl font-bold text-purple-600 mb-2" data-count="24">0</div>
                  <div className="text-sm text-gray-600">/7 Support</div>
                </div>
              </div>
            </div>
            
            {/* Story Image */}
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80" 
                alt="Our Export Facility" 
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <i className="fas fa-award text-blue-600 text-2xl"></i>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">Certified Exporters</div>
                    <div className="text-sm text-gray-600">ISO & FSSAI Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4">
              <i className="fas fa-bullseye"></i>
              <span className="font-semibold">Our Philosophy</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving agricultural excellence through innovation, quality, and global partnerships
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-rocket text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To become the most trusted global partner for agro product exports by delivering 
                superior quality, ensuring reliable supply chains, and building lasting relationships 
                with our clients worldwide.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500 text-sm"></i>
                  <span>Quality assurance at every stage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500 text-sm"></i>
                  <span>Sustainable sourcing practices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500 text-sm"></i>
                  <span>Timely global delivery</span>
                </li>
              </ul>
            </div>
            
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-eye text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To revolutionize the global agro export industry by setting new standards of excellence, 
                fostering innovation, and creating sustainable value for farmers, clients, and communities.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500 text-sm"></i>
                  <span>Global market leadership</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500 text-sm"></i>
                  <span>Innovation in agricultural exports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check text-green-500 text-sm"></i>
                  <span>Community development initiatives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-600 rounded-full px-4 py-2 mb-4">
              <i className="fas fa-heart"></i>
              <span className="font-semibold">Our Values</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Core principles that guide every decision and action at Shivaay International
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-medal text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Excellence</h3>
              <p className="text-gray-600">
                Uncompromising commitment to delivering products that meet the highest international standards and exceed customer expectations.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-handshake text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">
                Consistent performance and dependable service that builds trust and long-term partnerships with our global clients.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-users text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                Transparent business practices, ethical sourcing, and honest communication in all our dealings.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-lightbulb text-orange-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuous improvement in processes, technology, and services to stay ahead in the dynamic global agro market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-600 text-white rounded-full px-4 py-2 mb-4">
              <i className="fas fa-users"></i>
              <span className="font-semibold">Our Team</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to driving global agricultural excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">RK</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rajesh Kumar</h3>
              <p className="text-blue-600 font-semibold mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                With over 15 years in international trade, Rajesh leads our vision and global expansion strategies.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">PS</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Priya Sharma</h3>
              <p className="text-green-600 font-semibold mb-3">Head of Operations</p>
              <p className="text-gray-600 text-sm">
                Ensures seamless supply chain management and quality control across all our export operations.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AP</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Amit Patel</h3>
              <p className="text-purple-600 font-semibold mb-3">International Relations</p>
              <p className="text-gray-600 text-sm">
                Manages global client relationships and market development across Africa, US, and Europe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Partner With Us?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our global network of satisfied clients and experience the Shivaay International difference in quality and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group">
              <span className="flex items-center justify-center space-x-2">
                <span>Get In Touch</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </span>
            </Link>
            <Link href="/products" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg group">
              <span className="flex items-center justify-center space-x-2">
                <span>View Products</span>
                <i className="fas fa-box group-hover:scale-110 transition-transform duration-300"></i>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}