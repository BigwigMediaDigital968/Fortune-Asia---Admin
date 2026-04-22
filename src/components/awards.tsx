"use client";

// CSS injected once for the marquee animation
const marqueeStyle = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 28s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
`;

// ── Market Insights ───────────────────────────────────────
const insights = [
  {
    number: "0%",
    label: "Property Tax",
    desc: "0% property tax, capital gains tax, and rental income tax — maximize your profits.",
  },
  {
    number: "8–14%",
    label: "Annual ROI",
    desc: "A combination of rental yields and property appreciation can provide 8–14% annual returns.",
  },
  {
    number: "Investor-Friendly",
    label: "Laws & Regulations",
    desc: "Clear regulations and protections make property ownership safe and transparent for locals and foreigners.",
  },
  {
    number: "World-Class",
    label: "Infrastructure",
    desc: "Advanced transport, opulent services and sophisticated residential properties.",
  },
  {
    number: "6–8.8%",
    label: "Rental Yields",
    desc: "Average rental yield between 6–8%, with hotspots like JVC reaching up to 8.8%.",
  },
];

// ── Awards ────────────────────────────────────────────────
const awards = [
  {
    id: 1,
    name: "NSHAMA",
    image:
      "https://uniqueproperties.ae/en/uploads/frontend/awards/106043/conversions/nshama-top-agent_trophy-resize_trophies.webp",
  },
  {
    id: 2,
    name: "DUBAI PROPERTIES",
    image:
      "https://uniqueproperties.ae/en/uploads/frontend/awards/95827/conversions/dubai-properties-top-broker-q1-2017_trophy-resize_trophies.webp",
  },
  {
    id: 3,
    name: "DUBAI SOUTH",
    image:
      "https://uniqueproperties.ae/en/uploads/frontend/awards/95836/conversions/dubai-south-top-performer_trophy-resize_trophies.webp",
  },
  {
    id: 4,
    name: "EMAAR",
    image:
      "https://uniqueproperties.ae/en/uploads/frontend/awards/614231/conversions/emaar-annual-broker-awards_trophy-resize_trophies.webp",
  },
  {
    id: 5,
    name: "MERAAS",
    image:
      "https://uniqueproperties.ae/en/uploads/frontend/awards/19690/conversions/meraas-black-onyx-awards_trophy-resize_trophies.webp",
  },
  {
    id: 6,
    name: "DAMAC",
    image:
      "https://uniqueproperties.ae/en/uploads/frontend/awards/95809/conversions/damac-broker-awards-2022_trophy-resize_trophies.webp",
  },
  {
    id: 7,
    name: "ALDAR",
    image:
      "https://uniqueproperties.ae/en/uploads/frontend/awards/1811/aldar-top-performer-2021_trophy.webp",
  },
];

const AwardsSection = () => {
  return (
    <div className="w-full bg-white dark:bg-black text-black dark:text-white font-raleway font-light relative">
      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-gray-200 dark:border-gray-800" />
      </div>

      {/* ═══════════════════════════════════
          2. MARKET INSIGHTS
      ═══════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <p
          className="text-xs tracking-[3px] uppercase font-semibold mb-3"
          style={{ color: "var(--primary-color)" }}
        >
          Why Invest in Dubai
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug mb-4 max-w-2xl">
          Dubai Real Estate{" "}
          <span className="font-semibold">Market Insights</span>
        </h2>
        <div
          className="h-[2px] w-16 mb-12"
          style={{
            background: "var(--bg-primary-gradient, var(--primary-color))",
          }}
        />

        {/* 5 insight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {insights.map(({ number, label, desc }, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-color)] transition-colors duration-300 group"
            >
              <span
                className="text-2xl md:text-3xl font-semibold leading-none"
                style={{ color: "var(--primary-color)" }}
              >
                {number}
              </span>
              <p className="text-sm font-semibold text-black dark:text-white">
                {label}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}

          {/* Closing statement card — spans remaining column */}
          <div
            className="sm:col-span-2 lg:col-span-1 flex items-center justify-center p-6 rounded-xl"
            style={{
              background: "rgba(156,98,62,0.06)",
              border: "1px solid rgba(156,98,62,0.25)",
            }}
          >
            <p className="text-sm md:text-base text-center leading-relaxed text-gray-600 dark:text-gray-300 italic">
              "These factors make Dubai one of the most attractive destinations
              for real estate investment globally."
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-gray-200 dark:border-gray-800" />
      </div>

      {/* ═══════════════════════════════════
          3. AWARDS & ACHIEVEMENTS
      ═══════════════════════════════════ */}
      <section className="max-w-8xl mx-auto px-6 py-16 md:py-24">
        <p
          className="text-xs tracking-[3px] uppercase font-semibold mb-3 text-center"
          style={{ color: "var(--primary-color)" }}
        >
          Recognition
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug mb-4 text-center">
          Awards & <span className="font-semibold">Achievements</span> of Mondus
          Properties
        </h2>
        <div
          className="h-[2px] w-16 mx-auto mb-12"
          style={{
            background: "var(--bg-primary-gradient, var(--primary-color))",
          }}
        />

        {/* Infinite auto-scroll marquee */}
        <style>{marqueeStyle}</style>
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white dark:from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white dark:from-black to-transparent" />

          <div className="marquee-track gap-6">
            {/* Render twice for seamless loop */}
            {[...awards, ...awards].map((award, idx) => (
              <div
                key={`${award.id}-${idx}`}
                className="flex flex-col items-center mx-4 group"
                style={{ minWidth: "160px" }}
              >
                <div className="w-36 h-36 md:w-44 md:h-44 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 group-hover:border-[var(--primary-color)] transition-colors duration-300 p-4 bg-white dark:bg-[#0a0a0a]">
                  <img
                    src={award.image}
                    alt={award.name}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
                <p className="mt-3 text-xs font-semibold tracking-[2px] uppercase text-gray-500 dark:text-gray-400 group-hover:text-[var(--primary-color)] transition-colors duration-200 text-center">
                  {award.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsSection;
