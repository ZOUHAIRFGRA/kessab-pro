import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ahmed El Yassir",
    role: "Livestock Farm Owner",
    location: "Casablanca, Morocco",
    feedback: "KessabPro has completely transformed the way I manage my farm! The animal tracking features are incredible and the sales management has increased my profits by 35%. Easy to use and incredibly helpful.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    farmSize: "500+ Animals",
    highlight: "35% Profit Increase"
  },
  {
    name: "Fatima Bekkali",
    role: "Dairy Farm Manager",
    location: "Rabat, Morocco",
    feedback: "I love how I can track my sales and payments effortlessly. The health monitoring features have helped me prevent diseases and the mobile app makes everything accessible anywhere. A must-have for every farmer!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
    farmSize: "200+ Cows",
    highlight: "Zero Disease Outbreaks"
  },
  {
    name: "Omar Tazi",
    role: "Agricultural Consultant", 
    location: "Marrakech, Morocco",
    feedback: "Great app! The insights and analytics help me make better decisions for my farm. The dashboard provides real-time data that has revolutionized how I operate. I recommend it to all my clients.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    farmSize: "Multiple Farms",
    highlight: "Data-Driven Decisions"
  },
  {
    name: "Youssef Bennani",
    role: "Sheep Farm Owner",
    location: "Fez, Morocco", 
    feedback: "The breeding management feature is outstanding! I can track bloodlines and optimize my breeding program. Customer support is excellent and the app updates keep getting better.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format",
    farmSize: "800+ Sheep",
    highlight: "Optimized Breeding"
  },
  {
    name: "Aicha Moussaoui",
    role: "Poultry Farm Owner",
    location: "Tangier, Morocco",
    feedback: "KessabPro helped me digitize my entire operation. The inventory management and automated alerts have saved me countless hours. My productivity has increased significantly!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    farmSize: "10,000+ Chickens",
    highlight: "3x Productivity"
  },
  {
    name: "Hassan Alami",
    role: "Mixed Farm Owner",
    location: "Meknes, Morocco",
    feedback: "The financial tracking and reporting features are phenomenal. I can see my ROI clearly and make informed business decisions. The app pays for itself!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
    farmSize: "Mixed Operations",
    highlight: "Clear ROI Tracking"
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-32 bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-[140px] rounded-full -top-60 -right-60 z-0"></div>
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/8 to-pink-400/8 blur-[120px] rounded-full -bottom-40 -left-40 z-0"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.03)_49%,rgba(59,130,246,0.03)_51%,transparent_52%)] bg-[length:50px_50px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 border border-blue-200/50 dark:border-blue-800/50 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            ⭐ Customer Stories
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Trusted by 
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              10,000+ Farmers
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            See how farmers across Morocco are transforming their operations with KessabPro
          </p>
        </motion.div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="relative h-full p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 border-0 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-blue-500/20 group-hover:text-blue-500/40 transition-colors duration-300">
                  <FaQuoteLeft className="text-3xl" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 text-yellow-500 mb-6 relative z-10">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                    >
                      <FaStar className="text-lg" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 relative z-10">
                  "{testimonial.feedback}"
                </p>

                {/* Highlight Badge */}
                <div className="mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 relative z-10">
                  <motion.img
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover shadow-lg border-3 border-white dark:border-gray-800"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonial.location}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs font-medium mt-1">
                      {testimonial.farmSize}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom Stats */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Average Rating</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Happy Farmers</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">500K+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Animals Managed</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Uptime</div>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join the KessabPro Community
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Start your journey to better farm management today and see why thousands of farmers trust KessabPro
            </p>
            <motion.button
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Trial
              <svg className="w-6 h-6 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
