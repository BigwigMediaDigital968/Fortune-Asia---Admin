import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";
import image4 from "../assets/image4.webp";
import image5 from "../assets/image5.webp";
import image6 from "../assets/image6.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const lifestyleData = [
  { title: "Downtown Living", image: image1 },
  { title: "Residential Community", image: image2 },
  { title: "Marina Living", image: image3 },
  { title: "Suburban Escape", image: image4 },
  { title: "Beachfront Bliss", image: image5 },
  { title: "Skyline Retreat", image: image6 },
];

const LifeStyleSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const slickRef = useRef<Slider | null>(null);

  // Track screen width
  useEffect(() => {
    const updateLayout = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      setVisibleCount(isNowMobile ? 1 : 3);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const maxIndex = lifestyleData.length - visibleCount;

  const handleNext = () => {
    if (startIndex < maxIndex) setStartIndex(startIndex + 1);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white py-12 relative custom-gradient-lines">
      <h2 className="uppercase text-center text-3xl md:text-4xl font-light mb-2 text-black dark:text-gray-100 font-raleway">
        Live the Dubai Lifestyle
      </h2>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
        Find homes that fit your pace, taste, and goals.
      </p>

      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Carousel */}
        {!isMobile && (
          <>
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-[var(--primary-color)] z-20 p-2 disabled:opacity-50"
            >
              <ChevronLeft size={70} />
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (100 / visibleCount) * startIndex
                  }%)`,
                }}
              >
                {lifestyleData.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full md:w-1/3 flex-shrink-0 px-3"
                    style={{ flex: `0 0 ${100 / visibleCount}%` }}
                  >
                    <div className="bg-white dark:bg-[#111] rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold text-center mb-2">
                          {item.title}
                        </h3>
                        <hr className="border-gray-300 dark:border-gray-600 mb-3" />
                        <div className="mt-auto mx-auto">
                          <button className="text-md text-[var(--primary-color)] text-center">
                            Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={startIndex >= maxIndex}
              className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 text-[var(--primary-color)] z-20 p-2 disabled:opacity-50"
            >
              <ChevronRight size={70} />
            </button>
          </>
        )}

        {/* Mobile Slick Carousel */}
        {isMobile && (
          <Slider {...slickSettings} ref={slickRef}>
            {lifestyleData.map((item, idx) => (
              <div key={idx} className="px-3">
                <div className="bg-white dark:bg-[#111] rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {item.title}
                    </h3>
                    <hr className="border-gray-300 dark:border-gray-600 mb-3" />
                    <div className="mt-auto mx-auto">
                      <button className="text-md text-[var(--primary-color)] text-center">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default LifeStyleSection;
