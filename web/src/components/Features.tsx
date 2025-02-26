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
    <section className="relative pt-12 pb-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      
      <div className="absolute w-[450px] h-[450px] bg-blue-500/30 blur-[100px] rounded-full top-[-100px] left-24 z-0 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 blur-[80px] rounded-full bottom-16 right-10 z-0 animate-pulse"></div>

      <motion.h2 
        className="text-center text-4xl font-extrabold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        viewport={{ once: true }}
      >
        Why Choose <span className="text-blue-600 dark:text-blue-400">KessabPro?</span>
      </motion.h2>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
