import { FaGithub, FaLinkedin } from "react-icons/fa";

const developers = [
  {
    name: "Zouhair Fouiguira",
    role: "Full-Stack Developer",
    github: "https://github.com/ZOUHAIRFGRA",
    linkedin: "https://linkedin.com/in/zouhair-fouiguira",
    avatar: "https://github.com/ZOUHAIRFGRA.png", 
  },
  {
    name: "Abdelhamid Lahbouch",
    role: "Full-Stack Developer",
    github: "https://github.com/lahbouch",
    linkedin: "https://linkedin.com/in/lahbouchdev",
    avatar: "https://github.com/lahbouch.png", 
  },
];

const MeetTheDevelopers = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center">Meet the Developers</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md text-center transition-transform transform hover:scale-105"
          >
            <img
              src={dev.avatar}
              alt={`${dev.name}'s avatar`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{dev.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{dev.role}</p>
            <div className="mt-4 flex justify-center gap-4">
              <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-500 transition" />
              </a>
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-500 transition" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheDevelopers;
