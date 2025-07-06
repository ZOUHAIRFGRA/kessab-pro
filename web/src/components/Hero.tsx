import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Star, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-[140px] rounded-full -top-20 -left-20 z-0 animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-[120px] rounded-full -bottom-20 -right-20 z-0 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 blur-[100px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse"></div>
      
      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_49%,rgba(59,130,246,0.05)_51%,transparent_52%)] bg-[length:20px_20px] z-0"></div>

      <motion.div
        className="max-w-2xl text-center lg:text-left flex-1 relative z-10"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 border border-blue-200/50 dark:border-blue-800/50 shadow-lg backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Sparkles className="w-3 h-3" />
          🚀 Revolutionary Farm Management Platform
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 dark:text-white leading-[0.9] mb-4"
          variants={textVariants}
        >
          Transform Your 
          <br />
          <span className="relative">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              <Typewriter
                words={["Farm Operations", "Livestock Management", "Agricultural Success"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2500}
              />
            </span>
            {/* Animated underline */}
            <motion.div 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1 }}
            />
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-xl leading-relaxed"
          variants={textVariants}
        >
          Join over <span className="font-bold text-blue-600 dark:text-blue-400">10,000+ farmers</span> who trust KessabPro for comprehensive livestock management, sales tracking, and data-driven farm insights.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
          variants={textVariants}
        >
          <Button className="group px-6 py-3 text-base font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25 rounded-xl border-0">
            Get Started Free 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-base font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 rounded-xl flex items-center gap-2 backdrop-blur-sm"
          >
            <Play className="w-4 h-4" /> 
            Watch Demo
          </Button>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          variants={textVariants}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-blue-500 mr-1" />
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Active Farmers</div>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">500K+</div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Animals Tracked</div>
          </motion.div>
          
          <motion.div 
            className="text-center group"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-indigo-500 mr-1" />
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">99.9%</div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Uptime</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Phone Mockup Section with Multiple Screenshots */}
      <motion.div 
        className="flex-shrink-0 relative z-10 mt-12 lg:mt-0 w-full lg:w-auto lg:max-w-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }}
      >
        <div className="relative max-w-sm mx-auto">
          {/* Main Phone Mockup - Homepage */}
          <motion.div
            className="relative mx-auto"
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-[2.5rem] scale-105"></div>
            <img
              src="/src/assets/images/homepage.png"
              alt="KessabPro Mobile App Homepage"
              loading="eager"
              className="relative w-[200px] lg:w-[240px] mx-auto rounded-[2.5rem] shadow-2xl border-6 border-gray-900 dark:border-gray-100 transition-all duration-500"
            />
          </motion.div>
          
          {/* Floating Dashboard Preview - Top Left */}
          <motion.div
            className="absolute -top-4 -left-6 lg:-left-8"
            initial={{ opacity: 0, y: 30, rotate: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotate: -15,
              transition: { duration: 1.5, delay: 0.7, ease: "easeOut" }
            }}
            whileHover={{ rotate: -10, scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl rounded-xl scale-110"></div>
            <img
              src="/src/assets/images/dashboard.PNG"
              alt="KessabPro Dashboard"
              className="relative w-[100px] lg:w-[120px] rounded-xl shadow-xl border-3 border-white dark:border-gray-800"
            />
          </motion.div>
          
          {/* Animal Management - Top Right */}
          <motion.div
            className="absolute -top-2 -right-6 lg:-right-8"
            initial={{ opacity: 0, y: 30, rotate: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotate: 15,
              transition: { duration: 1.5, delay: 1, ease: "easeOut" }
            }}
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-xl scale-110"></div>
            <img
              src="/src/assets/images/animals-list.png"
              alt="Animals Management"
              className="relative w-[90px] lg:w-[110px] rounded-xl shadow-xl border-3 border-white dark:border-gray-800"
            />
          </motion.div>
          
          {/* Login Screen - Bottom Left */}
          <motion.div
            className="absolute -bottom-6 -left-2 lg:-left-6"
            initial={{ opacity: 0, y: -30, rotate: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotate: -12,
              transition: { duration: 1.5, delay: 1.3, ease: "easeOut" }
            }}
            whileHover={{ rotate: -8, scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl rounded-xl scale-110"></div>
            <img
              src="/src/assets/images/Login.PNG"
              alt="KessabPro Login"
              className="relative w-[95px] lg:w-[115px] rounded-xl shadow-xl border-3 border-white dark:border-gray-800"
            />
          </motion.div>
          
          {/* Enhanced Floating Elements - Smaller */}
          <motion.div
            className="absolute -top-8 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            📊
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-6 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-2xl"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            🐄
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 -right-6 w-11 h-11 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-2xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            💰
          </motion.div>

          {/* Additional floating particles - Smaller */}
          <motion.div
            className="absolute top-16 right-16 w-2 h-2 bg-blue-400 rounded-full"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-24 right-2 w-1.5 h-1.5 bg-purple-400 rounded-full"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
