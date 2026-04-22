import React from "react";

import golden_visa from "../assets/golden-visa-image.jpeg";

const RealEstateExperts: React.FC = () => {
  return (
    <div className="bg-white py-12 text-black dark:bg-black dark:text-white transition-colors font-raleway">
      <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-4 md:gap-8 items-center p-4 md:p-16">
        {/* Image section */}
        <div className="relative w-full h-[400px] flex justify-center">
          <img
            src={golden_visa}
            alt="Real Estate Experts"
            className="w-full object-cover"
            draggable="false"
          />

          {/* Mobile stats overlay
          <div className="absolute bottom-0 w-full md:hidden bg-white/90 dark:bg-black/80 flex justify-around py-4 text-center">
            <div>
              <h3 className="text-lg font-semibold">5000+</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Listed Properties
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">7+</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Languages Spoken
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">120+</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Consultants
              </p>
            </div>
          </div> */}
        </div>

        {/* Text and stats */}
        <div className="mt-8 md:mt-0">
          <h2 className="text-3xl md:text-3xl font-light mb-6">
            Secure UAE Golden Visa Through{" "}
            <span className="text-[var(--primary-color)]">
              Dubai Property Investment
            </span>{" "}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6 text-justify">
            Looking to obtain a UAE Golden Visa through real estate investment?
            Mondus Properties offers complete Golden Visa services in Dubai,
            guiding you through every step of the process. From identifying
            Golden Visa–eligible properties to handling documentation and
            approvals, our experts ensure a smooth and stress-free experience.
            Whether you’re investing in luxury apartments, premium villas, or
            high-value developments by top UAE developers, we help you qualify
            for long-term residency with confidence. As a leading Real Estate
            Company in Dubai UAE, Mondus Properties connects your property
            investment with residency benefits, ensuring a seamless and legally
            compliant process. Our experienced Property Agent in Dubai provides
            personalized guidance, helping you choose the right investment that
            meets Golden Visa eligibility criteria while maximizing returns. As
            a trusted real estate advisory in Dubai, Mondus Properties connects
            your property investment with residency benefits, so you can live,
            invest, and grow in the UAE with peace of mind. With our expertise
            as a Top real estate company in Dubai, we simplify complex
            procedures and make your Golden Visa journey efficient, transparent,
            and hassle-free.
          </p>

          <a href="/contact">
            <button className="border px-6 py-3 transition mb-8 border-[var(--primary-color)] text-black hover:opacity-70 bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579]">
              Talk to an Expert
            </button>
          </a>
        </div>
      </div>
      {/* Desktop stats */}
      {/* <div className="grid grid-cols-3 md:grid-cols-6 text-center gap-6 w-11/12 mx-auto">
        <div>
          <FaBuilding className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
          <h3 className="text-2xl font-sans"> 8,000+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
            {"Verified Listings \n Across Dubai"}
          </p>
        </div>
        <div>
          <FaGlobe className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
          <h3 className="text-2xl font-sans">10+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
            {"Languages Spoken for \n Global Clients"}
          </p>
        </div>
        <div>
          <FaUsers className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
          <h3 className="text-2xl font-sans">150+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
            {"Dedicated Property \n Advisors"}
          </p>
        </div>
        <div>
          <FaHandshake className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
          <h3 className="text-2xl font-sans">1200+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
            {"Properties Successfully \n Sold"}
          </p>
        </div>
        <div>
          <FaHome className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
          <h3 className="text-2xl font-sans">3500+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
            {"Active Rental \n Listings"}
          </p>
        </div>
        <div>
          <FaChartLine className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
          <h3 className="text-2xl font-sans">7B+ AED</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
            {"Real Estate \n Portfolio Value"}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default RealEstateExperts;
