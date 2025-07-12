import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Ourpolicy = () => {
  return (
    <div className="py-10 bg-gray-900 text-white">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Exchange Policy */}
        <div className="p-5 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <img src={assets.exchange_icon} className="w-16 mx-auto mb-4" alt="Exchange Icon" />
          <p className="font-semibold text-teal-300 text-lg">Easy Exchange Policy</p>
          <p className="text-gray-400 text-sm">Hassle-free exchanges available.</p>
        </div>

        {/* Return Policy */}
        <div className="p-5 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <img src={assets.quality_icon} className="w-16 mx-auto mb-4" alt="Quality Icon" />
          <p className="font-semibold text-teal-300 text-lg">7 Days Return Policy</p>
          <p className="text-gray-400 text-sm">Easy 7-day return window.</p>
        </div>

        {/* Customer Support */}
        <div className="p-5 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <img src={assets.support_img} className="w-16 mx-auto mb-4" alt="Support Icon" />
          <p className="font-semibold text-teal-300 text-lg">24/7 Customer Support</p>
          <p className="text-gray-400 text-sm">We are here to assist you anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default Ourpolicy;
