import { Card, CardContent } from "@/components/ui/card";
import { FaTractor, FaShoppingCart, FaClipboardList, FaPlus, FaChartLine, FaStethoscope } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Animal Management",
    icon: <FaTractor className="text-4xl text-white drop-shadow-lg" />,
    description: "Comprehensive livestock tracking with real-time monitoring and advanced filtering capabilities.",
    image: "/src/assets/images/animals-list.png",
    color: "from-blue-500 to-cyan-500",
    stats: "500K+ Animals Tracked",
    highlight: "Real-time Monitoring"
  },
  {
    title: "Sales & Transactions", 
    icon: <FaShoppingCart className="text-4xl text-white drop-shadow-lg" />,
    description: "Complete sales pipeline management with payment tracking and financial analytics.",
    image: "/src/assets/images/sales-list.png",
    color: "from-green-500 to-emerald-500",
    stats: "$2M+ Sales Tracked",
    highlight: "Payment Integration"
  },
  {
    title: "Farm Analytics",
    icon: <FaChartLine className="text-4xl text-white drop-shadow-lg" />,
    description: "Data-driven insights with customizable dashboards and predictive analytics.",
    image: "/src/assets/images/dashboard.PNG",
    color: "from-purple-500 to-pink-500",
    stats: "Real-time Reports",
    highlight: "AI-Powered Insights"
  },
  {
    title: "Quick Add Animals",
    icon: <FaPlus className="text-4xl text-white drop-shadow-lg" />,
    description: "Streamlined animal registration with bulk import and QR code generation.",
    image: "/src/assets/images/add-animal-modal.png",
    color: "from-orange-500 to-red-500",
    stats: "30% Faster Registration",
    highlight: "Bulk Import Support"
  },
  {
    title: "Detailed Profiles",
    icon: <FaClipboardList className="text-4xl text-white drop-shadow-lg" />,
    description: "Complete animal profiles with breeding history and performance metrics.",
    image: "/src/assets/images/animal-details.png",
    color: "from-indigo-500 to-purple-500",
    stats: "Complete History",
    highlight: "Breeding Tracker"
  },
  {
    title: "Health Records",
    icon: <FaStethoscope className="text-4xl text-white drop-shadow-lg" />,
    description: "Comprehensive medical tracking with vaccination schedules and health alerts.",
    image: "/src/assets/images/animal-medical-logs.png",
    color: "from-teal-500 to-cyan-500",
    stats: "Health Monitoring",
    highlight: "Smart Alerts"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Features = () => {
  return (
    <section className="relative py-32 bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 overflow-hidden">
      
      {/* Enhanced Background Elements */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-400/8 to-purple-400/8 blur-[140px] rounded-full -top-40 -right-40 z-0"></div>
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/6 to-pink-400/6 blur-[120px] rounded-full -bottom-40 -left-40 z-0"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.03)_49%,rgba(59,130,246,0.03)_51%,transparent_52%)] bg-[length:30px_30px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 border border-blue-200/50 dark:border-blue-800/50 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            ✨ Powerful Features
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revolutionize Your Farm
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover how KessabPro's comprehensive suite of tools transforms traditional farming into a data-driven, efficient operation
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group"
            >
              <Card className="relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 border-0 rounded-3xl h-full">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                
                {/* Highlight Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 bg-gradient-to-r ${feature.color} text-white text-xs font-bold rounded-full shadow-lg`}>
                    {feature.highlight}
                  </span>
                </div>
                
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Image Section with Enhanced Overlay - Fixed for Mobile Screenshots */}
                  <div className="relative overflow-hidden rounded-t-3xl bg-gray-100 dark:bg-gray-800">
                    <div className="flex justify-center items-center py-4">
                      <motion.img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-32 h-auto max-h-56 object-contain rounded-lg shadow-lg border-2 border-white dark:border-gray-700 transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1">
                      <span className="text-gray-800 dark:text-white text-sm font-semibold">{feature.stats}</span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 flex-1 flex flex-col">
                    <motion.div 
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-xl w-fit`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg flex-1">
                      {feature.description}
                    </p>

                    {/* Learn More Link */}
                    <motion.div 
                      className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Farm Management?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of successful farmers who have revolutionized their operations with KessabPro
            </p>
            <motion.button
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Trial
              <svg className="w-6 h-6 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
