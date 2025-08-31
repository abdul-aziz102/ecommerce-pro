import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../Context/ShopContextProvider';

const Cart = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useContext(ShopContext);
  const [removingItem, setRemovingItem] = useState(null);

  // Calculate totals
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const shippingFee = totalPrice > 0 ? 5.99 : 0;
  const finalTotal = totalPrice + shippingFee;

  // Handle remove with animation
  const handleRemove = (itemId) => {
    setRemovingItem(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItem(null);
    }, 300);
  };

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    },
    exit: {
      x: 50,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-24 pb-20 px-4'>
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent'>
            Your Shopping Cart
          </h2>
          <p className='text-gray-400'>
            {cart.length === 0 ? 'Your cart is empty' : `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </p>
        </motion.div>

        {cart.length === 0 ? (
          // Empty Cart State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-center py-16 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50'
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-500/20 rounded-2xl mb-6">
              <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-4">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/collection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          // Cart with Items
          <div className='space-y-6'>
            <AnimatePresence>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='space-y-4'
              >
                {cart.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={itemVariants}
                    exit="exit"
                    layout
                    className={`bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 transition-all duration-300 ${
                      removingItem === item._id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className='flex flex-col md:flex-row items-start gap-6'>
                      {/* Product Image */}
                      <Link to={`/products/${item._id}`} className="flex-shrink-0">
                        <motion.div whileHover={{ scale: 1.05 }} className="w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-xl overflow-hidden">
                          <img
                            src={item.image?.[0]}
                            alt={item.name}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center bg-gray-700 hidden">
                            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </motion.div>
                      </Link>

                      {/* Product Info */}
                      <div className='flex-1 min-w-0'>
                        <Link to={`/products/${item._id}`}>
                          <h3 className='text-xl font-semibold text-white hover:text-teal-400 transition-colors truncate'>
                            {item.name}
                          </h3>
                        </Link>
                        <p className='text-teal-400 text-lg font-bold mb-2'>
                          ${(item.price || 0).toFixed(2)}
                        </p>
                        
                        {item.size && (
                          <p className="text-gray-400 text-sm mb-3">
                            Size: <span className="text-white">{item.size}</span>
                          </p>
                        )}

                        {/* Quantity Controls */}
                        <div className='flex items-center space-x-4 mb-4'>
                          <span className="text-gray-400 text-sm">Quantity:</span>
                          <div className='flex items-center bg-gray-700/50 rounded-xl'>
                            <button
                              onClick={() => item.quantity > 1 ? addToCart(item, -1) : handleRemove(item._id)}
                              className='w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-600/50 transition-colors rounded-l-xl'
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                              </svg>
                            </button>
                            <span className='px-4 font-semibold min-w-[2rem] text-center'>{item.quantity || 1}</span>
                            <button
                              onClick={() => addToCart(item, 1)}
                              className='w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-600/50 transition-colors rounded-r-xl'
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <p className="text-white font-semibold">
                          Item Total: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(item._id)}
                        className='p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors duration-300'
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6'
            >
              <h3 className='text-xl font-bold mb-4 text-teal-300'>Order Summary</h3>
              
              <div className='space-y-3 mb-6'>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Subtotal ({totalItems} items)</span>
                  <span className='font-semibold'>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Shipping</span>
                  <span className='font-semibold'>${shippingFee.toFixed(2)}</span>
                </div>
                
                <div className='flex justify-between pt-3 border-t border-gray-700/50'>
                  <span className='text-lg font-bold'>Total</span>
                  <span className='text-lg font-bold text-teal-400'>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link to="/checkout" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCart}
                  className="py-4 px-6 bg-gray-700/50 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-600"
                >
                  Clear Cart
                </motion.button>
                
                <Link to="/collection" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gray-700/50 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-600"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;