import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../Context/ShopContextProvider';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart, addToWishlist, wishlistItems } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // Safe product finding with error handling
  const product = products ? products.find((item) => item && String(item._id) === String(id)) : null;
  
  // Safe wishlist check
  const isInWishlist = product && wishlistItems 
    ? wishlistItems.some(item => item && item.id === product._id)
    : false;

  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setMainImage(product.image[0]);
      setIsImageLoading(true);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product && addToCart) {
      addToCart(product, quantity);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };

  const handleWishlistToggle = () => {
    if (product && addToWishlist) {
      addToWishlist(product);
    }
  };

  // Show loading state while product is being fetched
  if (!products) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className='text-2xl mb-4'>Product Not Found</h2>
          <p className="text-gray-400">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-24 pb-20 px-4'>
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4'
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt='Full View'
              className='max-h-full max-w-full rounded-lg shadow-xl cursor-zoom-out'
            />
            <button
              className='absolute top-4 right-4 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors'
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
        {/* Image Section */}
        <div className='space-y-6'>
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full aspect-square bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 flex items-center justify-center p-8 relative overflow-hidden'
          >
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-2xl"></div>
            )}
            <motion.img
              src={mainImage}
              alt='Selected'
              className='max-h-full max-w-full object-contain cursor-zoom-in rounded-lg'
              onClick={() => setSelectedImage(mainImage)}
              onLoad={() => setIsImageLoading(false)}
              onError={(e) => {
                console.error('Image failed to load:', mainImage);
                e.target.style.display = 'none';
                setIsImageLoading(false);
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className='absolute top-4 right-4 p-3 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-500/90 transition-colors duration-300'
            >
              <svg 
                className={`w-6 h-6 ${isInWishlist ? 'text-red-500 fill-current' : 'text-white'}`} 
                viewBox="0 0 24 24"
                fill={isInWishlist ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>

            {/* Discount Badge */}
            {product.discount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className='absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg'
              >
                -{product.discount}%
              </motion.span>
            )}
          </motion.div>

          {/* Thumbnails */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex space-x-4 overflow-x-auto p-2'
          >
            {product.image?.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className='h-20 w-20 flex-shrink-0 cursor-pointer'
              >
                <img
                  src={img}
                  alt={`Thumb ${index}`}
                  className={`h-full w-full object-cover rounded-xl transition-all duration-300 border-2 ${
                    img === mainImage 
                      ? 'border-teal-400 shadow-lg shadow-teal-400/20' 
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  onClick={() => setMainImage(img)}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='space-y-6'
        >
          <div>
            <h1 className='text-4xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent'>
              {product.name}
            </h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400 ml-2">({(product.rating || 0).toFixed(1)})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-4 mb-4">
              {product.discount > 0 ? (
                <>
                  <span className="text-3xl font-bold text-teal-400">
                    ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded">
                    Save {product.discount}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-teal-400">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Category and Sizes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="font-semibold">{product.category || 'N/A'}</p>
              </div>
              {product.size?.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm">Available Sizes</p>
                  <p className="font-semibold">{product.size.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className='bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50'>
            <label className='block text-lg font-semibold mb-3 text-teal-300'>Quantity:</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </button>
              
              <span className="text-xl font-bold w-12 text-center">{quantity}</span>
              
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
          >
            {isAddedToCart ? (
              <span>Added to Cart! ✓</span>
            ) : (
              <span>Add To Cart - ${((product.price || 0) * quantity).toFixed(2)}</span>
            )}
          </motion.button>

          {/* Product Tabs */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="flex border-b border-gray-700">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-teal-400 border-b-2 border-teal-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <p className="text-gray-300 leading-relaxed">{product.description || 'No description available.'}</p>
              )}
              {activeTab === 'specifications' && (
                <div className="space-y-3">
                  {product.specifications?.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-700/50 py-2">
                      <span className="text-gray-400">{spec.key}:</span>
                      <span className="text-white">{spec.value}</span>
                    </div>
                  )) || <p className="text-gray-400">No specifications available.</p>}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {product.reviews?.map((review, index) => (
                    <div key={index} className="border-b border-gray-700/50 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {review.user?.charAt(0) || 'U'}
                        </div>
                        <span className="ml-3 font-semibold">{review.user || 'Unknown User'}</span>
                      </div>
                      <p className="text-gray-300">{review.comment || 'No comment'}</p>
                    </div>
                  )) || <p className="text-gray-400">No reviews yet.</p>}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;