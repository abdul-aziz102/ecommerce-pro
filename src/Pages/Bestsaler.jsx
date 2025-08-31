import React, { useContext, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Productitems from '../components/Productitems';
import { ShopContext } from '../Context/ShopContextProvider';

const Bestsaler = () => {
  const { products } = useContext(ShopContext);
  const [bestsellers, setBestsellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(5);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Filter options
  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'discounted', label: 'On Sale' },
  ];

  useEffect(() => {
    if (products && products.length > 0) {
      // Simulate loading with a delay for better UX
      const timer = setTimeout(() => {
        let filteredProducts = products;
        
        // Apply filters
        switch(activeFilter) {
          case 'bestsellers':
            filteredProducts = products.filter(item => item.isBestseller);
            break;
          case 'new':
            filteredProducts = products.filter(item => item.isNew);
            break;
          case 'discounted':
            filteredProducts = products.filter(item => item.discount && item.discount > 0);
            break;
          default:
            filteredProducts = products;
        }
        
        setBestsellers(filteredProducts.slice(0, 10));
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [products, activeFilter]);

  // Load more products
  const loadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
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

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header Section */}
      <motion.div 
        className="text-center mb-12 relative"
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
            Premium Collection
          </h2>
        </motion.div>
        
        <motion.h1 
          variants={titleVariants}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Best Sellers
          </span>
        </motion.h1>
        
        <motion.p 
          variants={titleVariants}
          className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
        >
          Discover our most loved products that customers can't stop talking about
        </motion.p>

        {/* Animated underline */}
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mx-auto mt-6"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        />
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mb-12"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1.5 inline-flex border border-gray-700">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          // Loading Skeleton with Animation
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 rounded-2xl overflow-hidden"
              >
                <div className="h-60 bg-gray-700 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <>
            {/* Results Count */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 mb-8"
            >
              Showing {Math.min(visibleCount, bestsellers.length)} of {bestsellers.length} products
            </motion.p>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              <AnimatePresence>
                {bestsellers.slice(0, visibleCount).map((item, index) => (
                  <motion.div
                    key={item._id}
                    variants={itemVariants}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="relative"
                  >
                    {/* Best seller badge */}
                    {item.isBestseller && (
                      <motion.div 
                        className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        Best Seller
                      </motion.div>
                    )}
                    <Productitems
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      discount={item.discount}
                      rating={item.rating}
                      isBestseller={item.isBestseller}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {bestsellers.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-2xl mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try selecting a different category</p>
              </motion.div>
            )}

            {/* Load More Button */}
            {visibleCount < bestsellers.length && bestsellers.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadMore}
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Load More Products
                  <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>

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

export default Bestsaler;