import { motion } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="py-20 text-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Title & Description */}
      <motion.h2 
        className="text-4xl font-extrabold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      >
        Start Managing Your Farm <span className="text-blue-600 dark:text-blue-400">Today</span>
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 mt-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }}
      >
        Download <b>KessabPro</b> and take control of your farm with ease.
      </motion.p>

      {/* Download Buttons */}
      <motion.div 
        className="mt-8 flex justify-center gap-4 flex-wrap"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }}
      >
        <a
          href="#"
          className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
        >
          <FaApple className="text-2xl" />
          <div className="text-left">
            <p className="text-xs">Download on the</p>
            <p className="text-lg font-semibold">App Store</p>
          </div>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          <FaGooglePlay className="text-2xl" />
          <div className="text-left">
            <p className="text-xs">Get it on</p>
            <p className="text-lg font-semibold">Google Play</p>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default CTA;
