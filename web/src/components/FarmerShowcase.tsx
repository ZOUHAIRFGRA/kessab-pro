import { motion } from "framer-motion";
import { FaHeart, FaLeaf, FaUsers, FaGlobe } from "react-icons/fa";

const FarmerShowcase = () => {
  return (
    <section className="relative py-32 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-950 dark:via-green-950 dark:to-gray-950 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-green-400/8 to-blue-400/8 blur-[140px] rounded-full -top-60 -left-60 z-0"></div>
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/6 to-cyan-400/6 blur-[120px] rounded-full -bottom-40 -right-40 z-0"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(34,197,94,0.03)_49%,rgba(34,197,94,0.03)_51%,transparent_52%)] bg-[length:40px_40px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-semibold mb-6 border border-green-200/50 dark:border-green-800/50 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <FaHeart className="w-4 h-4 text-red-500" />
            Empowering Farmers Worldwide
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Real Farmers,
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            See how KessabPro is transforming farming communities across Morocco and beyond
          </p>
        </motion.div>

        {/* Farmer Images Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/images/farmer_feeding_cattle.png"
                alt="Farmer feeding cattle"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold mb-2">Livestock Care</h3>
                <p className="text-gray-200 text-sm">Modern tools for traditional farming</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/images/farmer_standing_sheep.png"
                alt="Farmer with sheep"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold mb-2">Sheep Management</h3>
                <p className="text-gray-200 text-sm">Optimizing flock productivity</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/images/farmer_holding_pucket.png"
                alt="Farmer holding bucket"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold mb-2">Daily Operations</h3>
                <p className="text-gray-200 text-sm">Streamlined farm workflows</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Impact Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-4 shadow-lg">
              <FaUsers className="text-white text-2xl" />
            </div>
            <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-2">10K+</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Active Farmers</div>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
              <FaLeaf className="text-white text-2xl" />
            </div>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">500K+</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Animals Tracked</div>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <FaGlobe className="text-white text-2xl" />
            </div>
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Countries</div>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
              <FaHeart className="text-white text-2xl" />
            </div>
            <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-2">99%</div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Satisfaction</div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join the Farming Revolution
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Become part of a global community of farmers who are transforming agriculture with technology
            </p>
            <motion.button
              className="group px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
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

export default FarmerShowcase;
