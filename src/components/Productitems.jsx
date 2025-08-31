import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextProvider';

const Productitems = ({ id, image, price, name, discount, rating, isBestseller }) => {
  const { currency, addToCart, addToWishlist, wishlistItems } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Safe check for wishlistItems - prevent "Cannot read properties of undefined" error
  const isInWishlist = wishlistItems && Array.isArray(wishlistItems) 
    ? wishlistItems.some(item => item && item.id === id)
    : false;
  
  // Handle wishlist toggle with error prevention
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToWishlist) {
      addToWishlist({ id, image, price, name });
    }
  };
  
  // Handle add to cart with error prevention
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart) {
      addToCart({ id, image, price, name });
    }
  };

  // Calculate discounted price safely
  const discountedPrice = discount && price ? price - (price * discount / 100) : null;

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative bg-gray-800/40 backdrop-blur-md rounded-2xl overflow-hidden group border border-gray-700/50 transition-all duration-500 hover:border-teal-400/30 hover:shadow-2xl hover:shadow-teal-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${id}`} className="block">
        {/* Product image container */}
        <div className="relative overflow-hidden aspect-w-1 aspect-h-1">
          {/* Badges - only show if they have values */}
          <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
            {isBestseller && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 text-xs font-bold rounded-full shadow-lg"
              >
                🔥 Best Seller
              </motion.span>
            )}
            {discount && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg"
              >
                -{discount}% OFF
              </motion.span>
            )}
          </div>
          
          {/* Wishlist button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:bg-red-500/90"
            aria-label="Add to wishlist"
          >
            <svg 
              className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-white'}`} 
              viewBox="0 0 24 24"
              fill={isInWishlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>
          
          {/* Product image with safe access */}
          <div className="relative h-72 w-full">
            {image && image[0] ? (
              <motion.img
                src={image[0]}
                alt={name || "Product image"}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } ${isHovered ? 'scale-110' : 'scale-100'}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {/* Loading skeleton */}
            {!imageLoaded && image && image[0] && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse rounded-lg"></div>
            )}
            
            {/* Quick actions overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center pb-4 transition-all duration-500"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-medium rounded-full flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Add to Cart</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Product info */}
        <div className="p-5">
          {/* Rating - only show if rating exists */}
          {rating && (
            <div className="flex items-center mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400 ml-2">({rating.toFixed(1)})</span>
            </div>
          )}
          
          {/* Product name */}
          <h3 className="text-white font-semibold mb-3 line-clamp-2 hover:text-teal-400 transition-colors duration-300 text-base leading-tight">
            {name || "Unnamed Product"}
          </h3>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {discountedPrice ? (
                <>
                  <span className="text-teal-400 font-bold text-lg">
                    {currency} {discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-gray-400 text-sm line-through">
                    {currency} {price?.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-teal-400 font-bold text-lg">
                  {currency} {price?.toFixed(2) || "N/A"}
                </span>
              )}
            </div>
            
            {/* Quick add button for mobile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="md:hidden p-2 bg-gray-700/50 rounded-full hover:bg-teal-500 transition-colors duration-300"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Hover effect border glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-blue-500/10"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Productitems;