import { Card, CardContent } from "@/components/ui/card";
import { FaTractor, FaShoppingCart, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Animal Management",
    icon: <FaTractor className="text-5xl text-blue-500 drop-shadow-lg" />,
    description: "Easily track and manage your livestock with powerful tools.",
  },
  {
    title: "Sales & Transactions",
    icon: <FaShoppingCart className="text-5xl text-green-500 drop-shadow-lg" />,
    description: "Keep records of sales and payments with ease.",
  },
  {
    title: "Farm Insights",
    icon: <FaClipboardList className="text-5xl text-orange-500 drop-shadow-lg" />,
    description: "Monitor farm activities and get valuable analytics.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Features = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      
      {/* Background Blur Effects */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400 opacity-20 blur-3xl rounded-full -top-24 left-10 -z-10 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-green-500 opacity-20 blur-3xl rounded-full bottom-10 right-10 -z-10 animate-pulse"></div>

      {/* Section Title */}
      <motion.h2 
        className="text-center text-4xl font-extrabold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      >
        Why Choose <span className="text-blue-600 dark:text-blue-400">KessabPro?</span>
      </motion.h2>

      {/* Features Grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg rounded-2xl transition-all hover:shadow-2xl">
              <CardContent className="flex flex-col items-center text-center">
                <motion.div 
                  className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-md"
                  whileHover={{ rotate: 10 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
