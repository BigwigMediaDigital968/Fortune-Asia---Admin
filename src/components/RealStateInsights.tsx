import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../index.css";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string; // short description for carousel
  coverImage: string;
  slug: string;
  // add other fields if needed
}

const RealStateInsights = () => {
  const [index, setIndex] = useState(0);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "${API_BASE_URL}/api/blogs/viewblog",
        );
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Scroll to specific slide when clicking dots
  const scrollToSlide = (i: number) => {
    setIndex(i);
    const element = document.getElementById(`slide-${i}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  // Drag-to-scroll logic
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    isDown = true;
    carouselRef.current.classList.add("grabbing");
    startX = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    carouselRef.current?.classList.remove("grabbing");
  };

  const handleMouseUp = () => {
    isDown = false;
    carouselRef.current?.classList.remove("grabbing");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Auto update navigation dots on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;

    let closestIndex = 0;
    let closestOffset = Infinity;

    blogs.forEach((_, i) => {
      const slide = document.getElementById(`slide-${i}`);
      if (!slide) return;

      const offset = Math.abs(slide.offsetLeft - scrollLeft);
      if (offset < closestOffset) {
        closestOffset = offset;
        closestIndex = i;
      }
    });

    if (index !== closestIndex) {
      setIndex(closestIndex);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener("scroll", handleScroll);
    return () => {
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, [index, blogs]);

  return (
    <div className="px-4 py-10 bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin relative custom-gradient-lines">
      <h2 className="text-3xl md:text-4xl font-light mb-6 text-black dark:text-gray-100 text-center">
        EXPERT REAL ESTATE INSIGHTS
      </h2>
      <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-2">
        Discover the insider knowledge of Dubai real estate from our agents:
        expert analysis and in-depth information on the city and its property
        market.
      </p>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="max-w-7xl mx-auto mt-8 flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {blogs.length === 0 ? (
          <p className="text-center w-full py-20">Loading blogs...</p>
        ) : (
          blogs.map((item, i) => (
            <div
              id={`slide-${i}`}
              key={item._id}
              className="min-w-full lg:min-w-[100%] border border-gray-300 dark:border-gray-600 flex flex-col lg:flex-row snap-center"
            >
              <img
                src={item.coverImage}
                className="w-full lg:w-1/2 object-cover"
                alt={item.title}
                draggable={false}
              />
              <div className="p-8 bg-white dark:bg-black flex flex-col justify-center">
                <h3 className="text-2xl font-thin">{item.title}</h3>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {item.excerpt || "No description available."}
                </p>
                <a href={`/blogs/${item.slug}`}>
                  <button className="mt-6 px-6 py-2 font-raleway font-light bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] text-black hover:opacity-90 transition">
                    Read More
                  </button>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {blogs.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              scrollToSlide(i);
            }}
            className={`w-10 h-1 rounded-full transition-all duration-300 cursor-pointer ${index === i
                ? "bg-[var(--primary-color)]"
                : "bg-gray-400 dark:bg-gray-600"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RealStateInsights;
