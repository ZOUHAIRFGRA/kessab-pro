import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import phoneMockup from "@/assets/home_mockup_three.png";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      
      <div className="absolute w-[450px] h-[450px] bg-blue-500/30 blur-[100px] rounded-full top-10 left-24 z-0 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 blur-[80px] rounded-full bottom-16 right-10 z-0 animate-pulse"></div>

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
            <Typewriter
              words={["Easily.", "Efficiently.", "Smartly."]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-md leading-relaxed"
          variants={textVariants}
        >
          KessabPro helps farmers track animals, manage sales, and streamline transactions with ease.
        </motion.p>

        <motion.div 
          className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          variants={textVariants}
        >
          <Button className="px-6 py-3 text-lg flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-blue-500/50">
            Get the App <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="px-6 py-3 text-lg border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-transform transform hover:scale-105">
            Learn More
          </Button>
        </motion.div>
      </motion.div>

      <div className="relative flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0">
        <motion.img
          src={phoneMockup}
          alt="KessabPro Mobile App Screens"
          loading="lazy"
          decoding="async"
          className="w-[80%] max-w-[600px] rounded-lg shadow-2xl transition-transform transform hover:scale-105 hover:shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }}
          whileHover={{ rotate: 2, scale: 1.05 }}
        />
      </div>
    </section>
  );
};

export default Hero;
