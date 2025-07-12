import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Banner = () => {
  return (
    <div className="flex flex-wrap h-screen items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 w-full text-white py-12 px-6 md:px-16">
      {/* Left Section */}
      <div className="w-full mx-auto md:w-1/2 mb-8  text-center">
        <p className="text-sm uppercase tracking-widest font-semibold text-teal-400 mb-3">
          Our Bestsellers
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Latest Arrivals
        </h1>
        <a
          href="/collection"
          className="inline-block px-6 py-2 text-white bg-teal-500 hover:bg-teal-400 rounded-full transition duration-300"
        >
          Shop Now
        </a>
      </div>

      {/* Right Section (Image) */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          src="banner_pic.png"
          alt="Hero"
          className="w-full   h-auto object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Banner;
