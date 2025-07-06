import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { 
    question: "How can I download KessabPro?", 
    answer: "You can download KessabPro from both the App Store for iOS devices and Google Play Store for Android devices. Simply search for 'KessabPro' and install the app. It's completely free to download and get started.",
    category: "Getting Started"
  },
  { 
    question: "Is KessabPro free to use?", 
    answer: "Yes! KessabPro offers a comprehensive free tier that includes basic animal management, sales tracking, and reporting features. We also offer premium plans with advanced analytics, unlimited animals, and priority support for growing farms.",
    category: "Pricing"
  },
  { 
    question: "Can I manage multiple farms with KessabPro?", 
    answer: "Absolutely! KessabPro supports multi-farm management, allowing you to track multiple farms and thousands of animals from a single account. You can easily switch between farms and get consolidated reports across all your operations.",
    category: "Features"
  },
  {
    question: "What types of animals does KessabPro support?",
    answer: "KessabPro supports all types of livestock including cattle, sheep, goats, chickens, horses, and more. Our flexible system allows you to customize animal categories and track breed-specific information for any type of farm animal.",
    category: "Features"
  },
  {
    question: "Can I import my existing animal data?",
    answer: "Yes! KessabPro offers bulk import functionality that allows you to import your existing animal data from Excel files or CSV formats. Our support team can also help you migrate data from other farm management systems.",
    category: "Data Management"
  },
  {
    question: "Does KessabPro work offline?",
    answer: "KessabPro works seamlessly both online and offline. You can record animal data, track activities, and manage your farm even without internet connection. All data syncs automatically when you're back online.",
    category: "Technical"
  },
  {
    question: "How secure is my farm data?",
    answer: "Data security is our top priority. All your farm data is encrypted and stored securely in the cloud with regular backups. We comply with international data protection standards and never share your information with third parties.",
    category: "Security"
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! We provide comprehensive customer support including in-app help, email support, and video tutorials. Premium users get priority support with faster response times and dedicated account management.",
    category: "Support"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-blue-400/8 to-purple-400/8 blur-[120px] rounded-full -top-40 -left-40 z-0"></div>
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-indigo-400/6 to-pink-400/6 blur-[140px] rounded-full -bottom-60 -right-60 z-0"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.02)_49%,rgba(59,130,246,0.02)_51%,transparent_52%)] bg-[length:60px_60px] z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 border border-blue-200/50 dark:border-blue-800/50 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <FaQuestionCircle className="w-4 h-4" />
            Frequently Asked Questions
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Got Questions?
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to the most common questions about KessabPro and how it can transform your farm management
          </p>
        </motion.div>

        {/* Enhanced FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    {faq.category}
                  </span>
                </div>
                
                <motion.button
                  className="relative w-full p-6 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/20 rounded-2xl transition-all duration-300"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 pr-8">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0 mt-1"
                    >
                      <FaChevronDown className="text-blue-500 dark:text-blue-400 text-lg" />
                    </motion.div>
                  </div>
                </motion.button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <motion.p
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed border-t border-gray-200/50 dark:border-gray-700/50 pt-6"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our support team is here to help you get the most out of KessabPro. Contact us anytime!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
                <svg className="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 font-semibold text-lg rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Documentation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
