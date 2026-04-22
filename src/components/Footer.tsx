import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/logo mondus new (4).gif";
import qrImage from "../assets/URL QR Code (2).png";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white font-raleway text-sm">
      {/* Top horizontal line */}
      <div className="border-t border-gray-300 dark:border-gray-700 w-full" />

      {/* Logo and CONTACTS Title */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 lg:px-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4">
            <div className="w-16 border-t border-[var(--primary-color)]" />
            <img src={logo} alt="Logo" className="w-44 h-auto object-contain" />
            <div className="w-20 border-t border-[var(--primary-color)]" />
          </div>
        </div>
        <h2 className="hidden md:block text-2xl font-thin mt-10 md:mt-0">
          CONTACTS
        </h2>
      </div>

      {/* Mid horizontal line */}
      <div className="md:max-w-7xl mx-auto border-t border-gray-300 dark:border-gray-700 w-full mb-8" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between px-6 sm:px-12 lg:px-6 gap-8 pb-10 font-light dark:font-thin ">
        {/* Left: Navigation Columns */}
        <div className="grid grid-cols-3 gap-6">
          {[
            [
              { label: "Buy", path: "/buy" },
              { label: "Rent", path: "/rent" },
              { label: "Sell", path: "/sell" },
              { label: "Off-Plan", path: "/offplan" },
            ],
            [
              { label: "Careers", path: "/careers" },
              { label: "Contact Us", path: "/contact" },
              { label: "Catalogs", path: "/catalogs" },
              // { label: "Area Guides", path: "/area-guides" },
              { label: "Developers", path: "/developers" },
            ],
          ].map((group, idx) => (
            <ul key={idx} className="space-y-4">
              {group.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.path}
                    className="cursor-pointer hover:text-[var(--primary-color)] transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Middle: QR Code Image */}
        <div className="flex justify-center lg:justify-center items-center order-second md:-mt-20 lg:order-none">
          <img
            src={qrImage}
            alt="QR Code"
            className="w-32 h-32 object-contain rounded-md shadow-md"
          />
        </div>

        {/* Right: Contact Info */}
        <div className="space-y-4 lg:text-right">
          <h3 className="text-lg">Dubai, UAE</h3>
          <p className="text-gray-700 dark:text-gray-200 md:max-w-xs">
            Stadium point tower - 305 office number - AI Hebiah Fourth - Dubai
            Sports City - Dubai
          </p>
          <div className="flex justify-start lg:justify-end gap-4 pt-2 text-[var(--primary-color)] text-xl">
            <a
              href="mailto:info@mondusproperties.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaEnvelope />
            </a>

            <a
              href="https://www.facebook.com/p/Mondus-Group-61554982800603"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.linkedin.com/company/mondusproperties"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://wa.me/971521110795"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.instagram.com/monduspropertiesllc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@MondusPropertiesOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-gray-700 p-2 rounded"
            >
              <FaYoutube />
            </a>
          </div>

          <button className="mt-4  px-6 py-3 font-raleway font-light bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] text-black  hover:opacity-90 transition">
            <a href="tel:+971521110794">Call Us</a>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-6 py-6 text-xs text-gray-600 dark:text-gray-400 flex flex-col gap-2">
        {/* Mobile View (visible on small screens only) */}
        <div className="flex flex-col sm:hidden gap-2 pb-16">
          <div className="flex flex-row justify-between items-center flex-wrap gap-2">
            <span>Mondus ©2025 All Rights Reserved</span>
            <div className="flex gap-4">
              {["Terms of Use", "Privacy Policy"].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="cursor-pointer hover:text-[var(--primary-color)] transition"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          {/* <div className="w-full flex justify-center mt-2">
            <a
              href="https://www.bigwigdigital.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-3 uppercase text-xs tracking-widest  text-center"
            >
              Made & Marketed with ❤️ by Bigwig Digital
            </a>
          </div> */}
        </div>

        {/* Desktop View (hidden on small screens) */}
        <div className="hidden sm:flex flex-row justify-between items-center w-full">
          <span>Mondus ©2025 All Rights Reserved</span>
          {/* <a
            href="https://www.bigwigmediadigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-3 uppercase text-sm tracking-widest  text-center"
          >
            Made & Marketed with ❤️ by Bigwig Media Digital
          </a> */}
          <div className="flex gap-4">
            {["Terms of Use", "Privacy Policy"].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="cursor-pointer hover:text-[var(--primary-color)] transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
