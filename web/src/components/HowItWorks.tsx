import { motion } from "framer-motion";
import { FaUserPlus, FaTractor, FaShoppingCart, FaChartLine } from "react-icons/fa";

const steps = [
  {
    title: "Sign Up & Set Up",
    icon: <FaUserPlus className="text-5xl text-blue-600" />,
    description: "Create an account and set up your farm details in minutes.",
  },
  {
    title: "Add & Manage Animals",
    icon: <FaTractor className="text-5xl text-green-600" />,
    description: "Keep track of all your animals, their health, and activities.",
  },
  {
    title: "Track Sales & Payments",
    icon: <FaShoppingCart className="text-5xl text-yellow-600" />,
    description: "Manage sales transactions and monitor payments effortlessly.",
  },
  {
    title: "Get Insights & Reports",
    icon: <FaChartLine className="text-5xl text-purple-600" />,
    description: "Analyze farm performance with data-driven insights.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          How <span className="text-blue-600">KessabPro</span> Works
        </h2>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
          Follow these simple steps to manage your farm efficiently.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex justify-center">{step.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
