import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-semibold">KessabPro</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} KessabPro. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://github.com/kessabpro" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-500 transition" />
          </a>
          <a href="https://linkedin.com/company/kessabpro" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com/kessabpro" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-500 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
