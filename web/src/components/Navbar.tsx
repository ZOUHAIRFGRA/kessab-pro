import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/ModeToggle";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          K
        </div>
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          KessabPro
        </h1>
      </motion.div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button className="hidden sm:flex items-center justify-center px-6 py-3 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-full gap-2">
          <FaDownload className="w-4 h-4" />
          Get the App
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
