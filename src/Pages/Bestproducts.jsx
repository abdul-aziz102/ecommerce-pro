import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../Context/ShopContextProvider';
import Productitems from '../components/Productitems';

const BestProducts = () => {
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Filter options
  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'trending', label: 'Trending' },
    { id: 'bestsellers', label: 'Bestsellers' },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Apply filters based on selection
      let filtered = products;
      
      switch(activeFilter) {
        case 'new':
          // Assuming products have a 'isNew' property
          filtered = products.filter(item => item.isNew).slice(0, 10);
          break;
        case 'trending':
          // Assuming products have a 'isTrending' property
          filtered = products.filter(item => item.isTrending).slice(0, 10);
          break;
        case 'bestsellers':
          // Assuming products have a 'isBestseller' property
          filtered = products.filter(item => item.isBestseller).slice(0, 10);
          break;
        default:
          filtered = products.slice(0, 10);
      }
      
      setFilteredProducts(filtered);
    }, 800);

    return () => clearTimeout(timer);
  }, [products, activeFilter]);

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-16 px-4">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Premium Collection
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Discover our handpicked selection of exceptional products that combine quality, style, and innovation.
        </p>
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
      {isLoading ? (
        // Loading Skeleton
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-gray-800/50 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-60 bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Results Count */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mb-8"
          >
            Showing {filteredProducts.length} of {products.length} products
          </motion.p>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto"
          >
            <AnimatePresence>
              {filteredProducts.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  layout
                >
                  <Productitems
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    discount={item.discount}
                    rating={item.rating}
                    isNew={item.isNew}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
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
        </>
      )}

      {/* View More Button */}
      {filteredProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View All Products
            <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-96 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default BestProducts;