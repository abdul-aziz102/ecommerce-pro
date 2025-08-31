import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../Context/ShopContextProvider';
import Productitems from '../components/Productitems';

const Collection = () => {
  const { products, search, setSearch } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === 'all' || product.category === selectedCategory) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('default');
    setSearch('');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 pb-10 px-4">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-white mb-2"
          >
            Our Collection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-400 max-w-2xl mx-auto"
          >
            Discover our premium selection of products crafted with excellence and attention to detail.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10 relative"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 pl-12 pr-6 bg-gray-800/70 backdrop-blur-sm rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-700 transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="max-w-7xl mx-auto mb-6 md:hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800/70 backdrop-blur-sm rounded-lg text-white border border-gray-700"
          >
            <span>Filters</span>
            <svg 
              className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`md:w-1/4 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 h-fit ${isFilterOpen ? 'block' : 'hidden md:block'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Category</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="accent-teal-500"
                  />
                  <span>All Categories</span>
                </label>
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="accent-teal-500"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Price Range</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </div>

            {/* Sort By Filter */}
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="md:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                {search && `Search results for "${search}"`}
                {!search && selectedCategory !== 'all' && `Category: ${selectedCategory}`}
                {!search && selectedCategory === 'all' && 'All products'}
              </p>
              <p className="text-gray-400 text-sm hidden md:block">
                {filteredProducts.length} products
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-64 bg-gray-700"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* No Results State */}
                {filteredProducts.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700"
                  >
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-medium text-white mb-2">No products found</h3>
                    <p className="text-gray-400 mb-6">Try adjusting your filters or search term</p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                ) : (
                  /* Product Grid */
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <AnimatePresence>
                      {filteredProducts.map((product) => (
                        <motion.div
                          key={product._id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                         <Productitems
                            id={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            discount={product.discount}
                            rating={product.rating}
                            isNew={product.isNew}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;