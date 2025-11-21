/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

const Banner = () => {
  const bannerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const node = bannerRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  const products = [
    {
      name: "Nike Air Max",
      price: "$129.99",
      image: "https://i.pinimg.com/736x/78/55/dc/7855dc1d49168837fa9d4911b509a6ef.jpg",
      category: "Sneakers"
    },
    {
      name: "Adidas Ultraboost",
      price: "$149.99",
      image: "https://i.pinimg.com/736x/e9/04/7a/e9047a00c4321fcd5719cef71bd51a2c.jpg",
      category: "Running"
    }
  ];

  return (
    <div 
      ref={bannerRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-400">New Collection Available</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Elevate
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Your Style
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Discover premium footwear that combines cutting-edge design with unparalleled comfort. 
              Step into the future of fashion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Shop Collection
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </button>
              
              <button className="px-8 py-4 border-2 border-gray-600 hover:border-cyan-400 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/5 backdrop-blur-sm">
                View Lookbook
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
              {[
                { number: '2K+', label: 'Happy Customers' },
                { number: '500+', label: '5-Star Reviews' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Main Product Card */}
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
                
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={products[0].image}
                    alt={products[0].name}
                    className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay */}
                
                </div>

                {/* Product Info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{products[0].name}</h3>
                    <span className="text-2xl font-bold text-cyan-400">{products[0].price}</span>
                  </div>
                  <p className="text-gray-400">{products[0].category}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="text-sm text-gray-400 ml-2">(2.1k reviews)</span>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/10 rounded-full animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/10 rounded-full animate-float-delayed"></div>
              </div>

              {/* Discount Badge */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl shadow-2xl font-semibold">
                25% OFF
              </div>
            </div>

            {/* Secondary Product (Smaller) */}
            <div className="absolute -bottom-6 -right-6 w-48 transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-800 rounded-2xl p-4 shadow-2xl border border-slate-700">
                <img
                  src={products[1].image}
                  alt={products[1].name}
                  className="w-full h-auto rounded-xl"
                />
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-white font-semibold text-sm">{products[1].name}</span>
                  <span className="text-cyan-400 font-bold">{products[1].price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slower"></div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.03); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;