import { FaGithub, FaLinkedin, FaCode, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const developers = [
  {
    name: "Zouhair Fouiguira",
    role: "Full-Stack Developer & Co-Founder",
    bio: "Passionate about creating innovative solutions for agricultural technology. Expert in React, Node.js, and mobile development.",
    github: "https://github.com/ZOUHAIRFGRA",
    linkedin: "https://linkedin.com/in/zouhair-fouiguira",
    avatar: "https://github.com/ZOUHAIRFGRA.png",
    skills: ["React", "Node.js", "JavaScript", "Mobile Dev"],
    experience: "3+ Years",
    specialty: "Frontend Architecture"
  },
  {
    name: "Abdelhamid Lahbouch",
    role: "Full-Stack Developer & Co-Founder",
    bio: "Dedicated to building scalable and efficient farm management systems. Specializes in backend architecture and database optimization.",
    github: "https://github.com/lahbouch",
    linkedin: "https://linkedin.com/in/lahbouchdev",
    avatar: "https://github.com/lahbouch.png",
    skills: ["Laravel", "PHP", "MySQL", "AWS"],
    experience: "4+ Years", 
    specialty: "Backend Systems"
  },
];

const MeetTheDevelopers = () => {
  return (
    <section className="relative py-32 bg-gradient-to-br from-white via-slate-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-400/8 to-pink-400/8 blur-[120px] rounded-full -top-40 -right-40 z-0"></div>
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-blue-400/6 to-cyan-400/6 blur-[140px] rounded-full -bottom-60 -left-60 z-0"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(139,92,246,0.03)_49%,rgba(139,92,246,0.03)_51%,transparent_52%)] bg-[length:40px_40px] z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-semibold mb-6 border border-purple-200/50 dark:border-purple-800/50 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <FaCode className="w-4 h-4" />
            Meet Our Team
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Built with 
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mx-4">
              <FaHeart className="inline-block text-red-500 mx-2" />
              Passion
            </span>
            <br />
            by Expert Developers
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Meet the talented minds behind KessabPro - dedicated developers committed to revolutionizing farm management technology
          </p>
        </motion.div>

        {/* Enhanced Developer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="relative h-full p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 border-0 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Specialty Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                    {dev.specialty}
                  </span>
                </div>

                {/* Developer Avatar & Info */}
                <div className="flex flex-col items-center text-center mb-8 relative z-10">
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
                    <img
                      src={dev.avatar}
                      alt={`${dev.name}'s avatar`}
                      className="relative w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                    />
                    {/* Online indicator */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-gray-800 shadow-lg"></div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {dev.name}
                  </h3>
                  
                  <p className="text-purple-600 dark:text-purple-400 font-semibold text-lg mb-4">
                    {dev.role}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-6">
                    {dev.bio}
                  </p>

                  {/* Experience Badge */}
                  <div className="mb-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      {dev.experience} Experience
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8 relative z-10">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Core Skills
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {dev.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full shadow-sm"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 relative z-10">
                  <motion.a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="text-2xl text-gray-800 dark:text-gray-200 group-hover/link:text-purple-600 dark:group-hover/link:text-purple-400 transition-colors duration-300" />
                  </motion.a>
                  
                  <motion.a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin className="text-2xl text-blue-600 dark:text-blue-400 group-hover/link:text-blue-700 dark:group-hover/link:text-blue-300 transition-colors duration-300" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Want to Work With Us?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're always looking for talented developers to join our mission of transforming agriculture through technology
            </p>
            <motion.button
              className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Team
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

export default MeetTheDevelopers;
