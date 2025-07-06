import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[100px] rounded-full -top-40 -left-40 z-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-indigo-500/8 to-pink-500/8 blur-[80px] rounded-full -bottom-20 -right-20 z-0"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.03)_49%,rgba(59,130,246,0.03)_51%,transparent_52%)] bg-[length:50px_50px] z-0"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  K
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  KessabPro
                </h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Revolutionizing farm management with cutting-edge technology. Join thousands of farmers who trust KessabPro for comprehensive livestock management and data-driven insights.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <FaMapMarkerAlt className="text-blue-400" />
                  <span>Casablanca, Morocco</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <FaEnvelope className="text-blue-400" />
                  <span>contact@kessabpro.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <FaPhone className="text-blue-400" />
                  <span>+212 6XX XX XX XX</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  "Features", "How It Works", "Pricing", "Testimonials", 
                  "FAQ", "Support", "Documentation", "Blog"
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-lg"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-6 text-white">Resources</h4>
              <ul className="space-y-3">
                {[
                  "Download App", "API Documentation", "Privacy Policy", 
                  "Terms of Service", "Cookie Policy", "Security", "Status", "Careers"
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-lg"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div 
            className="mt-16 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-6 text-lg">
                Get the latest updates on new features, farming tips, and industry insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <motion.div 
                className="text-center lg:text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-300 text-lg">
                  © {new Date().getFullYear()} KessabPro. Made with{" "}
                  <FaHeart className="inline-block text-red-500 mx-1" />
                  {" "}in Morocco. All rights reserved.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[
                  { icon: FaGithub, href: "https://github.com/kessabpro", color: "hover:text-gray-400" },
                  { icon: FaLinkedin, href: "https://linkedin.com/company/kessabpro", color: "hover:text-blue-400" },
                  { icon: FaTwitter, href: "https://twitter.com/kessabpro", color: "hover:text-blue-400" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
