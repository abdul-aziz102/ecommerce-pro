import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { assets } from '../assets/frontend_assets/assets';
import { useRef } from 'react';

const Ourpolicy = () => {
  const [activePolicy, setActivePolicy] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Auto-rotate policies
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePolicy((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "Hassle-free exchanges within 30 days of purchase. No questions asked.",
      features: ["30-day exchange window", "No restocking fees", "Free return shipping"],
      color: "from-teal-500 to-emerald-500"
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      description: "Not satisfied? Return any item within 7 days for a full refund.",
      features: ["7-day return window", "Full refund guarantee", "Quick processing"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: assets.support_img,
      title: "24/7 Customer Support",
      description: "Our dedicated team is available around the clock to assist you.",
      features: ["24/7 live chat support", "Phone & email support", "Expert assistance"],
      color: "from-purple-500 to-pink-500"
    }
  ];

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

  return (
    <div ref={ref} className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-2xl mb-6"
        >
          <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Policies
          </span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          We're committed to providing you with the best shopping experience with our customer-friendly policies.
        </p>
      </motion.div>

      {/* Policies Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
      >
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={`relative bg-gray-800/40 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 transition-all duration-500 hover:shadow-2xl ${
              activePolicy === index ? 'scale-105 shadow-xl' : 'scale-100'
            }`}
            onMouseEnter={() => setActivePolicy(index)}
          >
            {/* Gradient border effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${policy.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
            
            <div className="p-8 relative z-10">
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center p-4 shadow-lg"
              >
                <img 
                  src={policy.icon} 
                  className="w-12 h-12 object-contain filter brightness-0 invert" 
                  alt={policy.title} 
                />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-center mb-4 text-white">
                {policy.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-center mb-6">
                {policy.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {policy.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + featureIndex * 0.1 }}
                    className="flex items-center text-sm text-gray-400"
                  >
                    <svg className="w-4 h-4 text-teal-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* Learn More Button */}
       
            </div>

            {/* Active indicator */}
            {activePolicy === index && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r ${policy.color} rounded-full`}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center mt-12 px-4"
      >
        <p className="text-gray-400 text-sm">
          Need more information? <span className="text-teal-400 hover:text-teal-300 cursor-pointer underline">Contact our support team</span>
        </p>
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

export default Ourpolicy;