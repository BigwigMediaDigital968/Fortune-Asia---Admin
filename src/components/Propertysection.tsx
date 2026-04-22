import { useState } from "react";

type TabKey = "Buy" | "Rent" | "Invest";

interface TabContent {
  heading: string;
  sub: string;
  features: string[];
  cta: string;
}

interface PropertyTab {
  type: TabKey;
  icon: string;
  label: string;
  desc: string;
}

const properties: PropertyTab[] = [
  {
    type: "Buy",
    icon: "🏛️",
    label: "Own",
    desc: "Penthouse, Villas & Apartments",
  },
  {
    type: "Rent",
    icon: "🔑",
    label: "Rent",
    desc: "Short & Long-Term Leasing",
  },
  {
    type: "Invest",
    icon: "📈",
    label: "Invest",
    desc: "Off-Plan & High ROI Assets",
  },
];

const tabContent: Record<TabKey, TabContent> = {
  Buy: {
    heading: "Secure Your Dubai Property with Trusted Real Estate Advisors",
    sub: "Purchasing with Mondus Properties guarantees access to Dubai's finest real estate with full transparency and qualified agents.",
    features: [
      "Prime spots in Dubai's most prestigious locations",
      "Penthouse, apartment & luxury villas",
      "Expert advice on high ROI & long-term investments",
      "Transparent deals with qualified property agents",
    ],
    cta: "Find Your Dream Home",
  },
  Rent: {
    heading: "Rent Premium Apartments and Villas in Dubai",
    sub: "Stay in curated residences tailored for expats, residents and corporate clients with verified listings and hassle-free lease.",
    features: [
      "Verified listings for residents, expats & corporates",
      "Hassle-free lease & personalized services",
      "Short-term rentals & long-term leasing options",
      "Premium lifestyle in apartments, villas & serviced units",
    ],
    cta: "Explore Rentals",
  },
  Invest: {
    heading: "Grow Your Wealth with Dubai Real Estate Investments",
    sub: "Invest in Dubai real estate with confidence - backed by data-driven insights, expert guidance & golden visa access.",
    features: [
      "High rental income & capital appreciation potential",
      "Access to off-plan & emerging neighbourhood projects",
      "Data-backed insights from expert property agents",
      "UAE Golden Visa investment opportunities",
    ],
    cta: "View Investment Picks",
  },
};

export default function MondusProperties() {
  const [activeTab, setActiveTab] = useState<TabKey>("Buy");
  const content = tabContent[activeTab];

  return (
    <>
      {/* ── Global styles: font import + tiny helpers not expressible in Tailwind ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --primary-color: #ce9c81;
          --bg-primary-gradient: linear-gradient(to right, #ce9c81, #e3c5b5, #ce9c81);
        }

        /* Gradient clip text */
        .gradient-text {
          font-style: italic;
          background: var(--bg-primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Active tab underline */
        .tab-underline::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--bg-primary-gradient);
        }

        /* CTA button gradient on hover */
        .btn-gradient-hover {
          border: 1px solid rgba(206,156,129,0.5);
          color: var(--primary-color);
          background: transparent;
          transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease;
        }
        .btn-gradient-hover:hover {
          background: var(--bg-primary-gradient);
          color: #2a1f18;
          border-color: transparent;
        }

        /* Fade-up entrance */
        .fade-up {
          animation: fadeUp 0.4s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        className="bg-[#0e0c0a] min-h-screen text-[#f5ede6]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        <div className="max-w-[1320px] mx-auto px-6 py-16">
          {/* ── H2 ── */}
          <h2
            className="font-light text-[#f5ede6] leading-[1.15] mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            Invest, Rent or Own the
            {/* <br /> */}
            <span className="gradient-text font-normal">
              {" "}
              Best Properties in Dubai
            </span>
          </h2>

          {/* ── Intro copy ── */}
          <p
            className="font-light text-gray-200 leading-[1.8] max-w-[700px] mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Find all types of property to meet your requirements: purchase a
            home of your dreams, rent a high-quality apartment or invest in
            assets with excellent returns.
          </p>
          <p
            className="font-light text-gray-200 leading-[1.8] max-w-[700px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            As a leading Real Estate Company in Dubai UAE, Mondus Properties
            offers verified properties across prime locations with credible
            listings and expert market research.
          </p>

          {/* ── Divider ── */}
          <div
            className="w-16 my-8"
            style={{ height: "1px", background: "var(--bg-primary-gradient)" }}
          />

          {/* ── Tab Bar ── */}
          <div
            className="flex mb-12"
            style={{ borderBottom: "1px solid rgba(245,237,230,0.1)" }}
          >
            {properties.map(({ type }) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={[
                  "text-[12px] font-medium tracking-[2.5px] uppercase px-8 py-3.5 relative",
                  "cursor-pointer bg-transparent border-none transition-colors duration-300",
                  activeTab === type
                    ? "text-[#ce9c81] tab-underline"
                    : "text-[#7a6a60] hover:text-[#e3c5b5]",
                ].join(" ")}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* ── Two-column content ── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start fade-up"
            key={activeTab}
          >
            {/* Left — text */}
            <div>
              {/* H3 */}
              <h3
                className="font-light text-[#f5ede6] leading-[1.2] mb-4"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.3rem)" }}
              >
                {content.heading}
              </h3>

              <p
                className="text-[13.5px] font-light text-gray-200 leading-[1.8] mb-9"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {content.sub}
              </p>

              {/* Feature list */}
              <ul className="flex flex-col gap-4 mb-11">
                {content.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span
                      className="mt-[3px] min-w-[20px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(206,156,129,0.12)",
                        border: "1px solid rgba(206,156,129,0.35)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--primary-color)" }}
                      />
                    </span>
                    <span
                      className="text-[13px] font-light text-[#c4b0a5] leading-[1.6]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — property type cards (hidden on mobile) */}
            <div className="hidden lg:flex flex-col gap-4">
              {properties.map(({ type, icon, label, desc }) => (
                <div
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className="flex items-center gap-5 px-7 py-6 rounded-[4px] cursor-pointer transition-all duration-300"
                  style={{
                    border:
                      activeTab === type
                        ? "1px solid rgba(206,156,129,0.42)"
                        : "1px solid rgba(245,237,230,0.07)",
                    background:
                      activeTab === type
                        ? "rgba(206,156,129,0.06)"
                        : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    className="text-[26px] min-w-[44px] h-11 flex items-center justify-center rounded-[3px]"
                    style={{ background: "rgba(206,156,129,0.1)" }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="text-[1.15rem] font-normal text-[#f0e4dc] mb-1">
                      {label}
                    </div>
                    <div
                      className="text-[11.5px] font-light text-[#8a7a72] tracking-[0.3px]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
