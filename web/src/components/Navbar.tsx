import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/ModeToggle";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-background shadow-md relative">
      <motion.h1
        className="text-2xl font-bold text-primary"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        KessabPro
      </motion.h1>

      <div className="flex items-center gap-6">
        <ModeToggle />
        <Button className="hidden sm:flex items-center justify-center px-5 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white transition-transform transform hover:scale-105">
          Get the App
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
