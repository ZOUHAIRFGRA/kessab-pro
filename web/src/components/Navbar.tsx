import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/ModeToggle";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-background shadow-md relative">
      {/* Logo with subtle animation */}
      <motion.h1
        className="text-2xl font-bold text-primary"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        KessabPro
      </motion.h1>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">
        <ModeToggle />
        <Button className="px-5 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white transition-transform transform hover:scale-105">
          Get the App
        </Button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="sm:hidden text-gray-700 dark:text-gray-300" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div 
          className="absolute top-16 right-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg w-48 p-4 flex flex-col gap-4 sm:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <ModeToggle />
          <Button className="w-full">Get the App</Button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
