import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { assets } from '../assets/frontend_assets/assets';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const features = [
    {
      title: "Quality Assurance",
      description: "We prioritize quality in all our products, ensuring they meet the highest standards before reaching our customers.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Convenience",
      description: "Our seamless shopping experience allows you to browse, select, and purchase your favorite items with just a few clicks.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Exceptional Customer Service",
      description: "Our team is always ready to assist you with any inquiries, ensuring a smooth and satisfying shopping journey.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* About us section */}
      <motion.div 
        className="text-center mb-16"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          variants={titleVariants}
          className="inline-block mb-4"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mx-auto mb-4" />
          <h2 className="text-sm uppercase tracking-widest text-teal-400 font-semibold mb-2">
            Our Story
          </h2>
        </motion.div>
        
        <motion.h2 
          variants={titleVariants}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            ABOUT <span className="font-bold">US</span>
          </span>
        </motion.h2>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto mb-20">
        {/* Left Side Image */}
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <img
              src={assets.about_img}
              alt='About Us'
              className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl -z-10 blur-xl"></div>
          </div>
        </motion.div>

        {/* Right side - text content */}
        <motion.div 
          className="w-full md:w-1/2 text-gray-300"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.p 
            className="mb-6 leading-relaxed text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <strong className="text-teal-400">Forever</strong> was born out of a passion for innovation
            and a desire to revolutionize the way people shop online. Our
            journey began with a simple idea: to provide a platform where
            customers can easily discover, explore, and purchase a wide range of
            products from the comfort of their homes.
          </motion.p>

          <motion.p 
            className="mb-6 leading-relaxed text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </motion.p>

          <motion.h3 
            className="text-2xl font-semibold mt-8 mb-4 text-teal-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            Our Mission
          </motion.h3>
          <motion.p 
            className="leading-relaxed text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            Our mission at <strong className="text-teal-400">Forever</strong> is to empower customers with
            choice, convenience, and confidence. We're dedicated to providing a
            seamless shopping experience that exceeds expectations, from
            browsing and ordering to delivery and beyond.
          </motion.p>
        </motion.div>
      </div>

      {/* Why choose us section */}
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          variants={titleVariants}
          className="text-center mb-16"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              WHY <span className="font-bold">CHOOSE US</span>
            </span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:border-teal-400/30"
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center p-4 text-white"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              
              <h3 className="text-xl font-semibold mb-4 text-center text-teal-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats section */}
      <motion.div 
        className="max-w-6xl mx-auto mt-20 grid md:grid-cols-4 gap-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        {[
          { number: "10K+", label: "Happy Customers" },
          { number: "500+", label: "Products" },
          { number: "24/7", label: "Support" },
          { number: "99%", label: "Satisfaction Rate" }
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50">
            <div className="text-3xl font-bold text-teal-400 mb-2">{stat.number}</div>
            <div className="text-gray-300">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default About;