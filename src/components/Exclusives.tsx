import { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const properties = [
  {
    image: "https://fnst.axflare.com/community/WEBP/uYHqVeSOBZ.webp", // Replace with actual image path
    title: "Marina Living",
    location: "Dubai Marina",
    roi: "Estimated Return On Investment 12% & Above",
    paymentPlan: "Post-handover payment plan – 30% over 2 years",
    locationDetails:
      "Parallel to Sheikh Zayed Road, 5 minutes to Jumeirah Beach",
    design: "Designed in the style of American resorts of Miami",
    description:
      "One of the last new developments in the area with growing capital value – Dubai Marina. Just a few minutes’ away from Marina Beach, Ain Dubai, and the world-famous promenade, The Walk.",
    handover: "June 30, 2025",
    Community: "Jumeirah Beach",
  },
  {
    image: "https://fnst.axflare.com/community/WEBP/uYHqVeSOBZ.webp", // Replace with actual image path
    title: "Marina Living",
    location: "Dubai Marina",
    roi: "Estimated Return On Investment 12% & Above",
    paymentPlan: "Post-handover payment plan – 30% over 2 years",
    locationDetails:
      "Parallel to Sheikh Zayed Road, 5 minutes to Jumeirah Beach",
    design: "Designed in the style of American resorts of Miami",
    description:
      "One of the last new developments in the area with growing capital value – Dubai Marina. Just a few minutes’ away from Marina Beach, Ain Dubai, and the world-famous promenade, The Walk.",
    handover: "June 30, 2025",
    Community: "Jumeirah Beach",
  },
  {
    image: "https://fnst.axflare.com/community/WEBP/uYHqVeSOBZ.webp", // Replace with actual image path
    title: "Marina Living",
    location: "Dubai Marina",
    roi: "Estimated Return On Investment 12% & Above",
    paymentPlan: "Post-handover payment plan – 30% over 2 years",
    locationDetails:
      "Parallel to Sheikh Zayed Road, 5 minutes to Jumeirah Beach",
    design: "Designed in the style of American resorts of Miami",
    description:
      "One of the last new developments in the area with growing capital value – Dubai Marina. Just a few minutes’ away from Marina Beach, Ain Dubai, and the world-famous promenade, The Walk.",
    handover: "June 30, 2025",
    Community: "Jumeirah Beach",
  },
  {
    image: "https://fnst.axflare.com/community/WEBP/uYHqVeSOBZ.webp", // Replace with actual image path
    title: "Marina Living",
    location: "Dubai Marina",
    roi: "Estimated Return On Investment 12% & Above",
    paymentPlan: "Post-handover payment plan – 30% over 2 years",
    locationDetails:
      "Parallel to Sheikh Zayed Road, 5 minutes to Jumeirah Beach",
    design: "Designed in the style of American resorts of Miami",
    description:
      "One of the last new developments in the area with growing capital value – Dubai Marina. Just a few minutes’ away from Marina Beach, Ain Dubai, and the world-famous promenade, The Walk.",
    handover: "June 30, 2025",
    Community: "Jumeirah Beach",
  },
  // Add more property objects as needed
];

const Exclusives = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, // We’ll use custom arrows
    pauseOnHover: false,
  };

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-10 px-2 md:px-28 font-raleway font-thin custom-gradient-lines relative">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-light mb-2 text-black dark:text-gray-100 md:text-center pl-6">
          Featured Properties in Dubai
        </h2>
        <p className="text-sm md:text-base pl-6 font-light dark:font-thin md:text-center">
          Step into a handpicked collection of properties, available only
          through{" "}
          <span className="text-[var(--primary-color)] font-light">
            MONDUS PROPERTIES
          </span>
        </p>
      </div>

      {/* Custom arrows for desktop */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="hidden md:flex items-center justify-center absolute left-0 md:left-10 top-1/2 -translate-y-1/2 z-10 text-[var(--primary-color)] p-2 "
      >
        <ChevronLeft size={60} />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="hidden md:flex items-center justify-center absolute right-0 md:right-10 top-1/2 -translate-y-1/2 z-10 text-[var(--primary-color)] p-2"
      >
        <ChevronRight size={60} />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {properties.map((property, idx) => (
          <div key={idx} className="px-4">
            <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-[#1A1A1A] rounded-lg overflow-hidden">
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover md:h-[80vh]"
                  draggable="false"
                />
                <div className="p-4">
                  <h3 className="text-xl md:text-2xl font-light mb-2">
                    {property.title}
                  </h3>
                  <p className="flex items-center text-sm font-light dark:font-thin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    {property.location}
                  </p>
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/2 p-6 flex flex-col gap-4">
                <div>
                  <h4 className="text-lg font-light mb-1">Community</h4>
                  <p className="text-sm font-light dark:font-thin">
                    {property.Community}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">ROI</h4>
                  <p className="text-sm font-light dark:font-thin">
                    {property.roi}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">PRIME LOCATION</h4>
                  <p className="text-sm font-light dark:font-thin">
                    {property.locationDetails}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">PAYMENT PLAN</h4>
                  <p className="text-sm font-light dark:font-thin">
                    {property.paymentPlan}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">DESIGN</h4>
                  <p className="text-sm font-light dark:font-thin">
                    {property.design}
                  </p>
                </div>
                <p className="text-sm font-light dark:font-thin">
                  {property.description}
                </p>
                <p className="text-sm font-light dark:font-thin">
                  Handover date: {property.handover}
                </p>
                <div className="mt-4">
                  <a href="/contact">
                    <button className="border border-[var(--primary-color)] hover:opacity-70 bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] font-light text-black px-6 py-2">
                      Enquire now
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Exclusives;
