import React, { useEffect, useRef } from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Banner = () => {
  const bannerRef = useRef(null);
  
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      const elements = bannerRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (bannerRef.current) {
        const elements = bannerRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="relative flex flex-wrap min-h-screen items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 w-full text-white py-12 px-6 md:px-16 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-ping-slow"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-bounce-slow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Left Section */}
      <div className="w-full mx-auto md:w-1/2 mb-8 text-center z-10">
        <p className="text-sm uppercase tracking-widest font-semibold text-teal-400 mb-3 animate-on-scroll opacity-0 transform translate-y-10">
          Our Bestsellers
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-on-scroll opacity-0 transform translate-y-10">
          Latest <span className="text-teal-400">Arrivals</span>
        </h1>
        <p className="text-lg mb-8 text-gray-300 animate-on-scroll opacity-0 transform translate-y-10">
          Discover our exclusive collection of premium products designed for the modern lifestyle.
        </p>
        <a
          href="/collection"
          className="inline-block px-8 py-3 text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-10"
        >
          Shop Now
          <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>

      {/* Right Section (Advanced Image with Animation) */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end z-10">
        <div className="relative w-full max-w-md">
          <div className="relative rounded-xl overflow-hidden transform transition-all duration-700 hover:scale-105">
            {/* Main product image */}
            <img
              src="https://i.pinimg.com/736x/ce/ca/15/ceca15d0706fa0b75bde38871836c786.jpg"
              alt="Premium Sneakers"
              className="w-full h-auto object-cover rounded-xl z-20 relative"
            />
            
            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
              <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium transform translate-y-8 hover:translate-y-0 transition-transform duration-500">
                Quick View
              </button>
            </div>
          </div>
          
          {/* Floating elements around the main image */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-500/20 rounded-full animate-float-slow z-0"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/20 rounded-full animate-float-slower z-0"></div>
          
          {/* Badge with animation */}
          <div className="absolute -top-4 -left-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse-slow z-30">
            <span className="text-sm font-semibold">New</span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.03); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.2; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce-slow {
          animation: bounce 4s infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;