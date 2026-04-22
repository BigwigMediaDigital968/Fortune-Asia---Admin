import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo mondus new (4).gif";
import { ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

// [Keep the imports and useState/useEffect code the same]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navItems = [
    { label: "Blogs", path: "/blogs" },
    { label: "Catalogs", path: "/catalogs" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  const dropdownItems = [
    { label: "Buy", path: "/buy" },
    { label: "Rent", path: "/rent" },
    { label: "Sell", path: "/sell" },
    // { label: "Off-Plan", path: "/offplan" },
  ];

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const loadGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    loadGoogleTranslateScript();
  }, []);

  return (
    <>
      <nav className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin w-full fixed top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Mobile View */}
            <div className="flex items-center w-full justify-between md:hidden">
              <a href="/">
                <img
                  src={logo}
                  alt="Mondus Logo"
                  className="w-1/3"
                  draggable="false"
                />
              </a>

              <div className="flex gap-4">
                <div className="notranslate">
                  <LanguageSelector />
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-xl text-inherit"
                  title="Toggle Theme"
                >
                  {darkMode ? <FiSun /> : <FiMoon />}
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-inherit text-2xl"
                >
                  <FiMenu />
                </button>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex w-full justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="h-20 pr-6 mr-6 border-r border-gray-600 dark:border-gray-400 flex items-center">
                  <a href="/">
                    <img src={logo} alt="Mondus Logo" className="h-20" />
                  </a>
                </div>
                <div className="flex  items-center gap-8">
                  {/* Dropdown */}
                  <div
                    className="relative h-20 inline-flex items-center"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <span className="relative flex items-center gap-1 text-sm text-inherit transition-colors hover:text-[var(--primary-color)] cursor-pointer">
                      I am looking to <ChevronDown size={16} />
                    </span>

                    {isOpen && (
                      <div className="absolute mt-2 top-16 -left-10 w-40 bg-white dark:bg-black text-black dark:text-white shadow-lg rounded z-50">
                        {dropdownItems.map((item, index) => (
                          <a
                            key={index}
                            href={item.path}
                            onClick={() => {
                              setActiveItem(item.label);
                              setIsOpen(false); // Optional: close dropdown on click
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[var(--primary-color)] border-b-[0.5px] border-[var(--primary-color)]"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Other nav items */}
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.path}
                      onClick={() => setActiveItem(item.label)}
                      className={`relative  text-sm text-inherit transition-colors hover:text-[var(--primary-color)] ${
                        activeItem === item.label ? "font-light text-md" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-6">
                <div className="notranslate">
                  <LanguageSelector />
                </div>
                <a
                  href="https://wa.me/+971521110795"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-[var(--primary-color)] text-2xl cursor-pointer font-light" />
                </a>
                <div className="relative group">
                  <span className="text-sm text-[var(--primary-color)] font-medium cursor-pointer py-8">
                    Follow Us
                  </span>
                  <div
                    className={`absolute top-12 -right-16 min-w-[150px] rounded shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto border-b border-[var(--primary-color)]
    ${darkMode ? "bg-black text-white" : "bg-white text-black"}
   `}
                  >
                    <a
                      href="https://www.facebook.com/p/Mondus-Group-61554982800603"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--primary-color)] hover:text-white border-b border-[var(--primary-color)]"
                    >
                      <Facebook size={16} />
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/mondusproperties/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--primary-color)] hover:text-white border-b border-[var(--primary-color)]"
                    >
                      <Instagram size={16} />
                      Instagram
                    </a>
                    <a
                      href="https://www.tiktok.com/@mondus.properties"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--primary-color)] hover:text-white border-b border-[var(--primary-color)]"
                    >
                      <FaTiktok />
                      TikTok
                    </a>
                    <a
                      href="https://www.youtube.com/@MondusPropertiesOfficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--primary-color)] hover:text-white border-b border-[var(--primary-color)]"
                    >
                      <Youtube size={16} />
                      YouTube
                    </a>
                  </div>
                </div>
                <span className="text-sm text-[var(--primary-color)] font-medium cursor-pointer">
                  <a href="tel:+971521110794">Call Us</a>
                </span>
                <div className="w-px h-6 bg-gray-400 dark:bg-gray-600"></div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-xl text-inherit transition-colors"
                  title="Toggle Theme"
                >
                  {darkMode ? <FiSun /> : <FiMoon />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu (unchanged) */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-[999] bg-white dark:bg-black flex flex-col pl-2 pr-5 pb-6 pt-3">
            <div className="flex justify-between items-center mb-6">
              <img src={logo} alt="Mondus Logo" className="w-48" />
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-inherit"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col space-y-4 px-5">
              {[...dropdownItems, ...navItems].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => {
                    setActiveItem(item.label);
                    setIsOpen(false);
                  }}
                  className="text-lg text-inherit hover:text-[var(--primary-color)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div id="google_translate_element" className="hidden" />
    </>
  );
};

export default Navbar;
