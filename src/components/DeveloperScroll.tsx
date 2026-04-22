import { useEffect, useRef, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const developerLogos = [
  "https://fnst.axflare.com/developer/logo/JPEG/DtEqnsLmOt.jpeg",
  "https://fnst.axflare.com/developer/logo/JPEG/sWynXhEREA.jpg",
  "https://fnst.axflare.com/developer/logo/JPEG/HboeEjxEzN.jpg",
  "https://fnst.axflare.com/developer/logo/JPEG/YfYzgxbwaz.jpeg",
  "https://fnst.axflare.com/developer/logo/JPEG/TySkvdlqZd.jpg",
  "https://fnst.axflare.com/developer/logo/JPEG/wqgqirrcwX.jpg",
  "https://fnst.axflare.com/developer/logo/JPEG/XcbsXzxxkH.jpg",
  "https://fnst.axflare.com/developer/logo/JPEG/ApYJreYHLi.jpg",
  "https://fnst.axflare.com/developer/logo/JPEG/gwEdRNLdmu.jpeg",
  "https://fnst.axflare.com/developer/logo/JPEG/WBpJivDVdD.jpeg",
  "https://fnst.axflare.com/developer/logo/JPEG/kJFDEiEEAo.jpg",
  "https://fnst.axflare.com/developer/logo/JPEG/uXfCnRmXrA.jpeg",
];

const DeveloperScroll = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollSpeed = 0.5; // adjust speed here
    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused) {
        carousel.scrollLeft += scrollSpeed;

        // Seamless loop
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="px-4 py-12 bg-white dark:bg-black text-black text-center custom-gradient-lines">
      <p
        className="text-xs tracking-[3px] uppercase font-semibold mb-3"
        style={{ color: "var(--primary-color)" }}
      >
        Our Partners
      </p>
      <h2 className="text-3xl md:text-4xl font-light mb-6 text-black dark:text-gray-100 text-center">
        Trusted Real Estate{" "}
        <span className="text-[var(--primary-color)]">Developers</span>
      </h2>

      <p className="text-center text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-6">
        Mondus Properties collaborates with the most trusted developers in Dubai
        to bring you premium, high-quality projects with strong investment
        potential.
      </p>

      {/* Continuous Carousel */}
      <div
        ref={carouselRef}
        className="max-w-7xl mx-auto mt-10 flex gap-6 overflow-hidden whitespace-nowrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...developerLogos, ...developerLogos].map((logo, i) => (
          <div
            key={i}
            className="min-w-[60%] sm:min-w-[33%] lg:min-w-[20%] flex items-center justify-center p-8 border border-[#ce9c81] dark:border-[#ce9c81] bg-white dark:bg-black"
          >
            <img
              src={logo}
              alt={`Developer ${i + 1}`}
              className="max-h-32 object-contain grayscale hover:grayscale-0 transition duration-300"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <div className="col-span-full flex justify-center mt-10">
        <button
          onClick={() => navigate("/developers")}
          className="bg-gradient-to-r from-[var(--primary-color)] via-[#e3c5b5] to-[var(--primary-color)] text-black px-4 py-2 uppercase tracking-wider text-sm hover:opacity-80 transition"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default DeveloperScroll;
