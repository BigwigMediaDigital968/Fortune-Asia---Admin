import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Nav";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-center px-6 pt-24">
        {/* 404 Heading */}
        <h1 className="text-[120px] md:text-[160px] font-bold text-[var(--primary-color)] leading-none">
          404
        </h1>

        {/* Subheading */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 max-w-md mb-8">
          The page you are looking for doesn’t exist or has been moved. Let’s
          get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-[var(--primary-color)] text-white font-medium shadow-md transition hover:scale-105"
          >
            Go Home
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-full border border-[var(--primary-color)] text-[var(--primary-color)] font-medium transition btn-gradient-hover"
          >
            Contact Us
          </Link>
        </div>

        {/* Decorative Gradient Line */}
        <div className="mt-12 w-40 h-1 rounded-full bg-[var(--bg-primary-gradient)]"></div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
