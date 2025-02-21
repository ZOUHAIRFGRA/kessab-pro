import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import phoneMockup from "@/assets/home_mockup_three.png";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 py-24 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400 opacity-20 blur-3xl rounded-full -top-24 -left-24 -z-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-indigo-500 opacity-20 blur-3xl rounded-full bottom-10 right-10 -z-10"></div>

      {/* Left Section - Text & CTA */}
      <motion.div 
        className="max-w-2xl text-center lg:text-left flex-1"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
          variants={textVariants}
        >
          Manage Your Farm <br />
          <span className="text-blue-600 dark:text-blue-400">
            Easily & Efficiently
          </span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-md leading-relaxed"
          variants={textVariants}
        >
          KessabPro helps farmers track animals, manage sales, and streamline transactions with ease.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="mt-6 flex justify-center lg:justify-start gap-4"
          variants={textVariants}
        >
          <Button className="px-6 py-3 text-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-transform transform hover:scale-105">
            Get the App <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="px-6 py-3 text-lg border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-transform transform hover:scale-105">
            Learn More
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Section - App Mockup */}
      <div className="relative flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0">
        <div className="absolute w-[250px] h-[250px] bg-blue-400 opacity-20 blur-3xl rounded-full -z-10"></div>
        <motion.img
          src={phoneMockup}
          alt="KessabPro Mobile App Screens"
          className="w-[80%] max-w-[600px] rounded-lg shadow-2xl transition-transform transform hover:scale-105"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }}
        />
      </div>
    </section>
  );
};

export default Hero;
