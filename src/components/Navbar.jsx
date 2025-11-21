import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContextProvider";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { getTotalItems } = useContext(ShopContext);
  const location = useLocation();

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Enhanced scroll effect with threshold
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setVisible(false);
  }, [location]);

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (signupData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Create user object
    const newUser = {
      id: Date.now(),
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      joinDate: new Date().toISOString(),
    };

    // Save to localStorage (simulate backend)
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    setIsLoggedIn(true);
    setShowSignupForm(false);
    
    // Reset form
    setSignupData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    alert("Account created successfully! Welcome to our store!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    setIsHoveringProfile(false);
    alert("Logged out successfully!");
  };

  const handleInputChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <motion.nav 
        className={`navbar-main fixed top-0 left-0 right-0 py-4 px-5 font-sans text-white transition-all duration-500 z-50 ${
          scrolled 
            ? "nav-scrolled bg-gray-900/98 backdrop-blur-xl shadow-2xl py-3 border-b border-gray-700/30" 
            : "nav-top bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6 }
        }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Enhanced Logo */}
          <Link to="/" className="logo-container">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={assets.logo}
                className="w-36 cursor-pointer filter brightness-0 invert transition-all duration-300 group-hover:brightness-100 group-hover:invert-0"
                alt="Logo"
              />
              <motion.div 
                className="absolute -inset-3 bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500 rounded-lg blur-xl opacity-0 group-hover:opacity-20 -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </Link>

          {/* Enhanced Navigation Links */}
          <ul className="hidden md:flex gap-1 text-sm font-medium nav-links-container">
            {["HOME", "COLLECTION", "ABOUT", "CONTACT", "BEST PRODUCTS"].map((item, index) => (
              <motion.li 
                key={index} 
                className="nav-item"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }} 
                whileTap={{ y: 0 }}
              >
                <NavLink
                  to={item === "HOME" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className={({ isActive }) =>
                    `nav-link relative py-3 px-4 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "nav-link-active text-white bg-gradient-to-r from-teal-500/20 to-purple-500/20 shadow-lg" 
                        : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10 font-medium tracking-wide">
                        {item}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-xl border border-teal-400/30 -z-10"
                          layoutId="navbar-underline"
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 30,
                            duration: 0.6 
                          }}
                        />
                      )}
                      {!isActive && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-purple-500/0 to-teal-500/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"
                          whileHover={{ opacity: 1 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </ul>

          {/* Enhanced Right Side Icons */}
          <div className="flex items-center gap-3 nav-icons-container">
            {/* Signup/Login Button - Only show when not logged in */}
            {!isLoggedIn && (
              <motion.button
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-teal-600 hover:to-purple-600"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSignupForm(true)}
              >
                <span>Sign Up</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </motion.svg>
              </motion.button>
            )}

            {/* Enhanced Profile Dropdown - Only show when logged in */}
            {isLoggedIn && (
              <motion.div 
                className="group relative"
                onHoverStart={() => setIsHoveringProfile(true)}
                onHoverEnd={() => setIsHoveringProfile(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm cursor-pointer border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:from-teal-500/20 hover:to-purple-500/20">
                  <img
                    src={assets.profile_icon}
                    className="w-5 filter brightness-0 invert transition-all duration-300 group-hover:brightness-100 group-hover:invert-0"
                    alt="Profile"
                  />
                </div>
                
                {/* Enhanced Dropdown Menu */}
                <AnimatePresence>
                  {isHoveringProfile && (
                    <motion.div 
                      className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl text-white rounded-2xl p-4 shadow-2xl z-50 border border-gray-700/50"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }}
                    >
                      {/* User Info */}
                      <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-700/50">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-3 py-3 px-4 hover:bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-xl cursor-pointer transition-all duration-200 group/item">
                          <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                          <span className="text-sm font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                            My Profile
                          </span>
                        </div>
                        <div className="flex items-center gap-3 py-3 px-4 hover:bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-xl cursor-pointer transition-all duration-200 group/item">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                            Orders
                          </span>
                        </div>
                        <div className="flex items-center gap-3 py-3 px-4 hover:bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-xl cursor-pointer transition-all duration-200 group/item">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                            Wishlist
                          </span>
                        </div>
                        <div className="border-t border-gray-700/50 my-2"></div>
                        <div 
                          className="flex items-center gap-3 py-3 px-4 hover:bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl cursor-pointer transition-all duration-200 group/item text-red-400"
                          onClick={handleLogout}
                        >
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-sm font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                            Logout
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Enhanced Cart Icon */}
            <Link to="/cart" className="relative cart-icon">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:from-teal-500/20 hover:to-purple-500/20"
              >
                <img
                  src={assets.cart_icon}
                  className="w-5 filter brightness-0 invert transition-all duration-300 hover:brightness-100 hover:invert-0"
                  alt="Cart"
                />
                {getTotalItems() > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 600, 
                      damping: 15 
                    }}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Enhanced Mobile Menu Button */}
            <motion.div 
              className="p-3 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm cursor-pointer md:hidden border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:from-teal-500/20 hover:to-purple-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVisible(true)}
            >
              <img
                src={assets.menu_icon}
                className="w-5 filter brightness-0 invert transition-all duration-300 hover:brightness-100 hover:invert-0"
                alt="Menu"
              />
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Fixed Signup Form Modal */}
      <AnimatePresence>
        {showSignupForm && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignupForm(false)}
            >
              <motion.div
                className="w-full max-w-md bg-gray-900/95 backdrop-blur-2xl text-white rounded-3xl shadow-2xl z-50 border border-gray-700/30 mx-auto"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                        Create Account
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Join us and start shopping today!
                      </p>
                    </div>
                    <motion.button
                      className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowSignupForm(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSignupSubmit} className="space-y-5">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={signupData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={signupData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Password Fields */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={signupData.password}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="••••••"
                      />
                      <p className="text-xs text-gray-400">Must be at least 6 characters</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="••••••"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create Account
                    </motion.button>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-400 pt-4">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200"
                        onClick={() => {/* Add login functionality */}}
                      >
                        Sign In
                      </button>
                    </p>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Navigation Menu */}
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/50 to-teal-900/50 backdrop-blur-xl z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVisible(false)}
            />
            
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-gray-900/98 backdrop-blur-2xl text-white z-50 shadow-2xl border-l border-gray-700/30"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.5 
              }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Enhanced Mobile Header */}
                <div className="flex justify-between items-center mb-8 pt-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <img
                      src={assets.logo}
                      className="w-32 filter brightness-0 invert"
                      alt="Logo"
                    />
                  </motion.div>
                  <motion.div 
                    className="p-3 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 cursor-pointer border border-gray-700/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setVisible(false)}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img
                      src={assets.dropdown_icon}
                      className="w-5 filter brightness-0 invert"
                      alt="Close"
                    />
                  </motion.div>
                </div>

                {/* Enhanced Mobile Navigation Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {["HOME", "COLLECTION", "ABOUT", "CONTACT", "BEST PRODUCTS"].map(
                    (item, index) => (
                      <NavLink
                        key={index}
                        to={item === "HOME" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                        onClick={() => setVisible(false)}
                        className={({ isActive }) => 
                          `block py-4 px-4 rounded-2xl transition-all duration-300 mb-3 group ${
                            isActive 
                              ? "bg-gradient-to-r from-teal-500/30 to-purple-500/30 text-white font-semibold border border-teal-400/30 shadow-lg" 
                              : "hover:bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:border-gray-600/30 border border-transparent"
                          }`
                        }
                      >
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          whileHover={{ x: 8 }}
                          className="flex items-center gap-3 text-sm font-medium"
                        >
                          <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            // eslint-disable-next-line no-undef
                            isActive 
                              ? "bg-gradient-to-r from-teal-400 to-purple-400" 
                              : "bg-gray-500 group-hover:bg-teal-400"
                          }`}></span>
                          {item}
                        </motion.p>
                      </NavLink>
                    )
                  )}
                </div>

                {/* Enhanced Mobile Footer */}
                <div className="pt-6 border-t border-gray-700/50 space-y-4">
                  {/* Signup Button for Mobile */}
                  {!isLoggedIn && (
                    <motion.button
                      className="w-full py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setVisible(false);
                        setShowSignupForm(true);
                      }}
                    >
                      Sign Up
                    </motion.button>
                  )}

                  {/* User Info for Mobile when logged in */}
                  {isLoggedIn && (
                    <div className="text-center">
                      <p className="text-sm text-gray-300">Welcome back,</p>
                      <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                      <button
                        onClick={handleLogout}
                        className="mt-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}

                  <motion.div 
                    className="flex gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link to="/profile" onClick={() => setVisible(false)}>
                      <div className="p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:from-teal-500/20 hover:to-purple-500/20">
                        <img
                          src={assets.profile_icon}
                          className="w-5 filter brightness-0 invert"
                          alt="Profile"
                        />
                      </div>
                    </Link>
                    <Link to="/cart" onClick={() => setVisible(false)} className="relative">
                      <div className="p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:from-teal-500/20 hover:to-purple-500/20">
                        <img
                          src={assets.cart_icon}
                          className="w-5 filter brightness-0 invert"
                          alt="Cart"
                        />
                        {getTotalItems() > 0 && (
                          <span className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg">
                            {getTotalItems()}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
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