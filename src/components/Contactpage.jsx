import { motion, useInView } from "framer-motion";
import { assets } from "../assets/frontend_assets/assets";
import { useRef, useState } from "react";

function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = {
    name: "Abdul Aziz",
    phone: "+123 456 7890",
    email: "abdulazizyousufzai@gmail.com",
    address: "123 Company St, Karachi, Pakistan",
    whatsapp: "+123 456 7890",
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

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

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-24 pb-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-2xl mb-6"
          >
            <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us through any of these channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50"
          >
            <h2 className="text-2xl font-bold mb-6 text-teal-300">Send us a Message</h2>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 text-center"
              >
                <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-200 font-medium">Thank you for your message! We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right Side - Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="text-center md:text-left"
            >
              <img
                src={assets.logo}
                alt="Company Logo"
                className="w-40 h-12 filter brightness-0 invert mx-auto md:mx-0"
              />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {[
                { icon: "👤", label: "Name", value: contactInfo.name },
                { icon: "📞", label: "Call Us", value: contactInfo.phone },
                { icon: "✉️", label: "Email", value: contactInfo.email },
                { icon: "📍", label: "Address", value: contactInfo.address },
                { icon: "💬", label: "WhatsApp", value: contactInfo.whatsapp },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700/50 transition-all duration-300 hover:border-teal-400/30"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              {[
                { name: "WhatsApp", icon: assets.whatsapp_icon, color: "bg-green-600 hover:bg-green-700" },
                { name: "Facebook", icon: assets.facebook_icon, color: "bg-blue-600 hover:bg-blue-700" },
                { name: "Instagram", icon: assets.instagram_icon, color: "bg-pink-600 hover:bg-pink-700" },
                { name: "Twitter", icon: assets.twitter_icon, color: "bg-blue-400 hover:bg-blue-500" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className={`${social.color} w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <img 
                    src={social.icon}
                    alt={social.name}
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* WhatsApp Direct Chat Link */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <img 
                src={assets.whatsapp_icon}
                alt="WhatsApp"
                className="w-6 h-6 filter brightness-0 invert"
              />
              <span>Chat on WhatsApp</span>
            </motion.a>
          </motion.div>
        </div>
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
}

export default ContactPage;