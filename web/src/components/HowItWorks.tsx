import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaTractor, FaShoppingCart, FaChartLine, FaStethoscope, FaCog, FaTimes, FaExpand } from "react-icons/fa";
import { useState } from "react";

const steps = [
  {
    title: "Sign Up & Configure",
    icon: <FaUserPlus className="text-4xl text-white" />,
    description: "Create your account and set up your farm profile with our intuitive onboarding process.",
    image: "/src/assets/images/Login.PNG",
    color: "from-blue-500 to-cyan-500",
    delay: 0,
    features: ["Quick Setup", "Secure Login", "User Management"]
  },
  {
    title: "Add & Manage Animals",
    icon: <FaTractor className="text-4xl text-white" />,
    description: "Easily register your livestock with comprehensive tracking and category management.",
    image: "/src/assets/images/add-animal-modal.png",
    color: "from-green-500 to-emerald-500",
    delay: 0.2,
    features: ["Bulk Import", "QR Codes", "Categories"]
  },
  {
    title: "Track Health & Records",
    icon: <FaStethoscope className="text-4xl text-white" />,
    description: "Monitor animal health with detailed medical logs and vaccination schedules.",
    image: "/src/assets/images/animal-medical-logs.png",
    color: "from-teal-500 to-cyan-500",
    delay: 0.4,
    features: ["Medical History", "Vaccinations", "Health Alerts"]
  },
  {
    title: "Manage Sales & Payments",
    icon: <FaShoppingCart className="text-4xl text-white" />,
    description: "Process sales transactions and track payments with detailed financial records.",
    image: "/src/assets/images/sale-details.png",
    color: "from-orange-500 to-red-500",
    delay: 0.6,
    features: ["Transaction History", "Payment Tracking", "Financial Reports"]
  },
  {
    title: "View Animal Details",
    icon: <FaCog className="text-4xl text-white" />,
    description: "Access comprehensive animal profiles with breeding history and performance data.",
    image: "/src/assets/images/animal-details.png",
    color: "from-indigo-500 to-purple-500",
    delay: 0.8,
    features: ["Complete Profiles", "Breeding History", "Performance Metrics"]
  },
  {
    title: "Analyze & Optimize",
    icon: <FaChartLine className="text-4xl text-white" />,
    description: "Get powerful insights and analytics to optimize your farm operations.",
    image: "/src/assets/images/dashboard.PNG",
    color: "from-purple-500 to-pink-500",
    delay: 1.0,
    features: ["Real-time Analytics", "Performance Reports", "Predictive Insights"]
  },
];

const HowItWorks = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string, title: string} | null>(null);

  const openModal = (src: string, alt: string, title: string) => {
    setSelectedImage({ src, alt, title });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute w-[1000px] h-[1000px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-[150px] rounded-full -top-80 -left-80 z-0"></div>
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-400/8 to-cyan-400/8 blur-[120px] rounded-full -bottom-60 -right-60 z-0"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(139,92,246,0.03)_49%,rgba(139,92,246,0.03)_51%,transparent_52%)] bg-[length:40px_40px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-semibold mb-6 border border-purple-200/50 dark:border-purple-800/50 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            🚀 Simple Process
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Transform Your Farm in 
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              6 Simple Steps
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            From setup to success - discover how easy it is to revolutionize your farm management with KessabPro
          </p>
        </motion.div>

        {/* Steps Grid - Enhanced Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: step.delay, ease: "easeOut" }}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              {/* Step Number Badge - Enhanced */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 rounded-2xl flex items-center justify-center text-white dark:text-gray-900 font-bold text-lg z-20 shadow-2xl border-4 border-white dark:border-gray-900">
                {index + 1}
              </div>

              {/* Card Container */}
              <div className="relative overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 border-0 h-full">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-8 transition-opacity duration-700`}></div>
                
                {/* Image Section with Enhanced Overlay - Clickable for Modal */}
                <div 
                  className="relative overflow-hidden rounded-t-3xl bg-gray-100 dark:bg-gray-800 cursor-pointer group/image"
                  onClick={() => openModal(step.image, step.title, step.title)}
                >
                  <div className="flex justify-center items-center py-4">
                    <motion.img 
                      src={step.image}
                      alt={step.title}
                      className="w-28 h-auto max-h-48 object-contain rounded-lg shadow-lg border-2 border-white dark:border-gray-700 transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Expand Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full">
                      <FaExpand className="text-lg text-gray-700 dark:text-gray-300" />
                    </div>
                  </div>
                  
                  {/* Step Indicator Overlay */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1">
                    <span className="text-gray-800 dark:text-white text-sm font-semibold">Step {index + 1}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <motion.div 
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-xl`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex} 
                        className={`px-3 py-1 bg-gradient-to-r ${step.color} text-white text-xs font-medium rounded-full shadow-sm`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connection Line (for larger screens) */}
                {index < steps.length - 1 && (index + 1) % 3 !== 0 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600 transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full transform -translate-y-1/2"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Farm Transformation Journey?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join over 10,000 farmers who have already revolutionized their operations. Get started in less than 5 minutes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Free Trial
                <svg className="w-6 h-6 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
              
              <motion.button
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 font-semibold text-lg rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedImage.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 flex justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              </div>
              
              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click outside or press the X to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HowItWorks;
