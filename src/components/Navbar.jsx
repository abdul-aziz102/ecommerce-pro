import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContextProvider";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useContext(ShopContext);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div 
        className={`fixed top-0 left-0 right-0 py-4 px-5 font-sans text-white transition-all duration-300 z-50 ${
          scrolled 
            ? "bg-gray-900/95 backdrop-blur-md shadow-xl py-3" 
            : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={assets.logo}
                className="w-36 cursor-pointer filter brightness-0 invert"
                alt="Logo"
              />
              <motion.div 
                className="absolute -inset-2 bg-teal-500 rounded-lg blur opacity-20 -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            {["HOME", "COLLECTION", "ABOUT", "CONTACT", "BEST PRODUCTS"].map((item, index) => (
              <motion.li key={index} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <NavLink
                  to={item === "HOME" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className={({ isActive }) =>
                    `relative py-2 transition-colors ${
                      isActive 
                        ? "text-teal-400 font-semibold" 
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500"
                          layoutId="navbar-underline"
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            {/* Profile Dropdown */}
            <motion.div 
              className="group relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm cursor-pointer">
                <img
                  src={assets.profile_icon}
                  className="w-5 filter brightness-0 invert"
                  alt="Profile"
                />
              </div>
              <div className="absolute right-0 hidden group-hover:block mt-2 w-48 bg-gray-800/95 backdrop-blur-md text-white rounded-xl p-2 shadow-xl z-50">
                <div className="py-2 px-4 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors">
                  My Profile
                </div>
                <div className="py-2 px-4 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors">
                  Orders
                </div>
                <div className="py-2 px-4 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors">
                  Wishlist
                </div>
                <div className="border-t border-gray-700 my-1"></div>
                <div className="py-2 px-4 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors text-red-400">
                  Logout
                </div>
              </div>
            </motion.div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm"
              >
                <img
                  src={assets.cart_icon}
                  className="w-5 filter brightness-0 invert"
                  alt="Cart"
                />
                {getTotalItems() > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.div 
              className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm cursor-pointer md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVisible(true)}
            >
              <img
                src={assets.menu_icon}
                className="w-5 filter brightness-0 invert"
                alt="Menu"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVisible(false)}
            />
            
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-gray-900/95 backdrop-blur-md text-white z-50 shadow-2xl"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-8">
                  <img
                    src={assets.logo}
                    className="w-32 filter brightness-0 invert"
                    alt="Logo"
                  />
                  <motion.div 
                    className="p-2 rounded-full bg-gray-800 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setVisible(false)}
                  >
                    <img
                      src={assets.dropdown_icon}
                      className="w-5 rotate-180 filter brightness-0 invert"
                      alt="Close"
                    />
                  </motion.div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {["HOME", "COLLECTION", "ABOUT", "CONTACT", "BEST PRODUCTS"].map(
                    (item, index) => (
                      <NavLink
                        key={index}
                        to={item === "HOME" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                        onClick={() => setVisible(false)}
                        className={({ isActive }) => 
                          `block py-4 px-4 rounded-xl transition-colors mb-2 ${
                            isActive 
                              ? "bg-teal-500/20 text-teal-400 font-semibold" 
                              : "hover:bg-gray-800/50"
                          }`
                        }
                      >
                        <motion.p
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {item}
                        </motion.p>
                      </NavLink>
                    )
                  )}
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <div className="flex gap-4">
                    <Link to="/profile" onClick={() => setVisible(false)}>
                      <div className="p-3 bg-gray-800/50 rounded-full">
                        <img
                          src={assets.profile_icon}
                          className="w-5 filter brightness-0 invert"
                          alt="Profile"
                        />
                      </div>
                    </Link>
                    <Link to="/cart" onClick={() => setVisible(false)} className="relative">
                      <div className="p-3 bg-gray-800/50 rounded-full">
                        <img
                          src={assets.cart_icon}
                          className="w-5 filter brightness-0 invert"
                          alt="Cart"
                        />
                        {getTotalItems() > 0 && (
                          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {getTotalItems()}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;