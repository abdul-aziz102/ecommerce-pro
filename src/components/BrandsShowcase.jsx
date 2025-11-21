// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const BrandsShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const brands = [
    { name: "Nike", logo: "NIKE", description: "Just Do It" },
    { name: "Adidas", logo: "ADIDAS", description: "Impossible is Nothing" },
    { name: "Apple", logo: "APPLE", description: "Think Different" },
    { name: "Samsung", logo: "SAMSUNG", description: "Do What You Can't" },
    { name: "Sony", logo: "SONY", description: "Make.Believe" },
    { name: "Microsoft", logo: "MICROSOFT", description: "Empowering Us All" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div ref={ref} className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6"
          >
            <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-teal-300">Featured Brands</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Leading Brands
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We partner with the world&apos;s most renowned brands to bring you exceptional quality and innovation.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 h-32 flex flex-col items-center justify-center">
                {/* Brand Logo */}
                <div className="text-2xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {brand.logo}
                </div>
                
                {/* Brand Description */}
                <p className="text-xs text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {brand.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Become Our Partner
            </h3>
            <p className="text-gray-400 mb-6">
              Join our network of premium brands and reach millions of satisfied customers worldwide.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Partner With Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandsShowcase;