// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductVideoShowcase = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRefs = useRef([]);

  const products = [
    {
      id: 1,
      title: "Premium Headphones",
      description: "Experience crystal-clear audio with our noise-canceling technology",
      video: "/public/adver.mp4", // Make sure this path is correct
      poster: "/images/headphones-poster.jpg", // Add a poster image
      features: ["Active Noise Cancellation", "30hr Battery Life", "Premium Materials"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Smart Watch Series",
      description: "Stay connected and monitor your health with advanced sensors",
      video: "https://pin.it/65fAJsoqs",
      poster: "/images/watch-poster.jpg",
      features: ["Health Monitoring", "Water Resistant", "Long Battery"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Wireless Earbuds",
      description: "True wireless freedom with exceptional sound quality",
      video: "/videos/earbuds-showcase.mp4",
      poster: "/images/earbuds-poster.jpg",
      features: ["True Wireless", "Fast Charging", "Comfort Fit"],
      color: "from-teal-500 to-emerald-500"
    }
  ];

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (isPlaying && activeVideo === index) {
        video.pause();
        setIsPlaying(false);
      } else {
        // Pause all other videos
        videoRefs.current.forEach((vid, i) => {
          if (i !== index && vid) {
            vid.pause();
            vid.currentTime = 0;
          }
        });
        
        video.play().then(() => {
          setIsPlaying(true);
          setActiveVideo(index);
          setVideoError(false);
        }).catch(error => {
          console.error("Video play failed:", error);
          setVideoError(true);
          // Fallback to showing poster image
        });
      }
    }
  };

  const handleVideoError = (index) => {
    console.error(`Video ${index} failed to load`);
    setVideoError(true);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6"
          >
            <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-teal-300">Video Showcase</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See Our Products{" "}
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch our premium products come to life through immersive video demonstrations.
          </p>
        </motion.div>

        {/* Video Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gray-800/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl">
              {/* Video Element with Error Handling */}
              {videoError ? (
                // Fallback when video fails to load
                <div className="w-full h-96 bg-gradient-to-br from-gray-700 to-gray-800 flex flex-col items-center justify-center text-white">
                  <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Video Not Available</p>
                  <p className="text-gray-400 text-sm">Please check the video file path</p>
                </div>
              ) : (
                <video
                  ref={el => videoRefs.current[activeVideo] = el}
                  className="w-full h-96 object-cover"
                  muted
                  loop
                  playsInline
                  poster={products[activeVideo].poster}
                  onError={() => handleVideoError(activeVideo)}
                  preload="metadata"
                >
                  <source src={products[activeVideo].video} type="video/mp4" />
                  <source src={products[activeVideo].video.replace('.mp4', '.webm')} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              )}
              
              {/* Play Button Overlay - Only show if video is not playing */}
              <AnimatePresence>
                {!isPlaying && !videoError && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => togglePlay(activeVideo)}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="text-white font-medium text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  {products[activeVideo].title}
                </span>
                {!videoError && (
                  <button
                    onClick={() => togglePlay(activeVideo)}
                    className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Video Loading/Error Status */}
            <AnimatePresence>
              {videoError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 text-red-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Video unavailable</p>
                      <p className="text-sm opacity-80">Check if the video file exists at: {products[activeVideo].video}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex gap-4 mb-8">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setActiveVideo(index);
                    setIsPlaying(false);
                    setVideoError(false);
                    // Reset all videos
                    videoRefs.current.forEach(vid => {
                      if (vid) {
                        vid.pause();
                        vid.currentTime = 0;
                      }
                    });
                  }}
                  className={`flex-1 text-center py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    activeVideo === index
                      ? `bg-gradient-to-r ${product.color} text-white shadow-lg`
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {product.title.split(' ')[0]}
                </button>
              ))}
            </div>

            <h3 className="text-3xl font-bold text-white">
              {products[activeVideo].title}
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              {products[activeVideo].description}
            </p>

            <div className="space-y-3">
              {products[activeVideo].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-gray-300"
                >
                  <svg className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Buy Now
              </button>
              <button className="px-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductVideoShowcase;