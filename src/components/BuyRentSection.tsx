import { useState } from "react";

export default function BuyRentSection() {
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "offplan">("buy");

  const images = {
    buy: "https://www.axcapital.ae/_ipx/s_630x400/img/sell/buy-sell_buy.webp",
    rent: "https://www.axcapital.ae/_ipx/s_630x400/img/sell/buy-sell_rent.webp",
    offplan:
      "https://cdn.dxbproperties.ae/media/blog/off_plan_property_image.webp",
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white py-16 px-6 md:px-12 custom-gradient-lines relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch">
        {/* Left Text Block */}
        <div className=" border border-gray-700 h-[300px] my-auto p-6 md:p-12 flex items-center">
          <div className="space-y-4 w-full">
            {/* BUY Row */}
            <div
              className="relative flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveTab("buy")}
            >
              <h2
                className={`text-5xl font-raleway font-thin tracking-wider transition-colors ${
                  activeTab === "buy" ? "text-black dark:text-white " : ""
                }`}
              >
                <a href="/buy">BUY</a>
              </h2>
              <div
                className={`relative ml-6 h-[1px] bg-black dark:bg-white transition-all duration-300 ${
                  activeTab === "buy" ? "w-32" : "w-6"
                }`}
              >
                <span
                  className={`absolute -right-2 md:-top-4 -top-[13px] text-black dark:text-white  text-xl transition-opacity duration-300 ${
                    activeTab === "buy" ? "opacity-100" : "opacity-100"
                  }`}
                >
                  &gt;
                </span>
              </div>
            </div>

            {/* RENT Row */}
            <div
              className="relative flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveTab("rent")}
            >
              <h2
                className={`text-5xl font-raleway font-thin tracking-wider transition-colors ${
                  activeTab === "rent" ? "text-black dark:text-white " : ""
                }`}
              >
                <a href="/rent">RENT</a>
              </h2>
              <div
                className={`relative ml-6 h-[1px] bg-black dark:bg-white transition-all duration-300 ${
                  activeTab === "rent" ? "w-32" : "w-6"
                }`}
              >
                <span
                  className={`absolute -right-2 md:-top-4 -top-[13px] text-black dark:text-white text-xl transition-opacity duration-300 ${
                    activeTab === "rent" ? "opacity-100" : "opacity-100"
                  }`}
                >
                  &gt;
                </span>
              </div>
            </div>

            {/* OFFPLAN Row */}
            <div
              className="relative flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveTab("offplan")}
            >
              <h2
                className={`text-5xl font-raleway font-thin tracking-wider transition-colors ${
                  activeTab === "offplan" ? "text-black dark:text-white " : ""
                }`}
              >
                <a href="/offplan">INVEST</a>
              </h2>
              <div
                className={`relative ml-6 h-[1px] bg-black dark:bg-white transition-all duration-300 ${
                  activeTab === "offplan" ? "w-32" : "w-6"
                }`}
              >
                <span
                  className={`absolute -right-2 md:-top-4 -top-[13px] text-black dark:text-white text-xl transition-opacity duration-300 ${
                    activeTab === "offplan" ? "opacity-100" : "opacity-100"
                  }`}
                >
                  &gt;
                </span>
              </div>
            </div>

            <p className="text-gray-500 mt-8 text-sm md:text-base leading-relaxed max-w-md">
              Find your next home, secure a rental, or make your first smart
              investment. Our curated portfolio covers all your real estate
              goals in Dubai.
            </p>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="min-h-[300px] md:min-h-[450px]">
          <img
            src={images[activeTab]}
            alt={activeTab}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
