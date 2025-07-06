import { motion } from "framer-motion";
import { FaGooglePlay, FaApple, FaArrowRight } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full top-0 left-0 z-0 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-white/5 blur-[80px] rounded-full bottom-0 right-0 z-0 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-white/5 blur-[60px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
            🎉 Ready to Transform Your Farm?
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-black text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Start Managing Your Farm 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Today
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Join thousands of farmers who have already transformed their operations with <b className="text-white">KessabPro</b>. 
            Download now and take control of your farm with ease.
          </motion.p>

          {/* Download Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <motion.a
              href="#"
              className="group flex items-center gap-4 px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaApple className="text-3xl group-hover:text-blue-300 transition-colors duration-300" />
              <div className="text-left">
                <p className="text-xs text-gray-300">Download on the</p>
                <p className="text-lg font-semibold">App Store</p>
              </div>
            </motion.a>

            <motion.a
              href="#"
              className="group flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGooglePlay className="text-3xl group-hover:text-green-200 transition-colors duration-300" />
              <div className="text-left">
                <p className="text-xs text-green-100">Get it on</p>
                <p className="text-lg font-semibold">Google Play</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">10K+</div>
              <div className="text-blue-200">Happy Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">500K+</div>
              <div className="text-blue-200">Animals Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </motion.div>

          {/* Additional CTA */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo <FaArrowRight className="text-sm" />
            </motion.button>
            
            <div className="text-white/80 text-sm">
              ✓ Free to start • ✓ No credit card required • ✓ 24/7 support
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white text-2xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🚀
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white text-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        📱
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-10 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white text-xl"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🎯
      </motion.div>
    </section>
  );
};

export default CTA;
