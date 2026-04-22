import "../index.css";
import hero_video from "../assets/mondus-home-video.mp4";

export default function Hero() {
  return (
    <>
      <div className="min-h-[60vh] md:min-h-screen bg-black text-white flex flex-col justify-end md:justify-center pt-28 pb-12 md:pt-0 md:pb-0 px-6 sm:px-10 relative overflow-hidden">
        {/* ── Background Video ── */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={hero_video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        {/* ── Overlay gradients ── */}
        {/* Bottom-to-top dark fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        {/* Left-side readability fade */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

        {/* ── Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto py-16 md:py-24 md:pt-64 font-raleway font-light">
          {/* Eyebrow tagline */}
          <p
            className="text-xs md:text-sm tracking-[4px] uppercase font-semibold mb-4"
            style={{ color: "var(--primary-color)" }}
          >
            Exclusive Homes, Endless Possibilities
          </p>

          {/* H1 */}
          <h1
            className="font-merriweather font-semibold text-white leading-[1.15] mb-5 max-w-3xl"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)" }}
          >
            Real Estate Company in Dubai for{" "}
            <span style={{ color: "var(--primary-color)" }}>Luxury Homes,</span>{" "}
            Investments &amp; Rentals
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-8 py-3.5 text-xs font-semibold tracking-[2.5px] uppercase rounded-sm border transition-all duration-300 hover:text-gold-500 hover:shadow-xl"
              style={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "white",
              }}
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
            {/* ── LEFT: Tagline + H2 ── */}
            <div className="lg:w-[42%] flex-shrink-0 lg:sticky lg:top-24">
              {/* Eyebrow tagline */}
              <p
                className="text-xs tracking-[3.5px] uppercase font-semibold mb-4"
                style={{ color: "var(--primary-color)" }}
              >
                Dream It. Live It.
              </p>

              {/* H2 */}
              <h2
                className="font-light leading-[1.2] mb-5 text-black dark:text-white"
                style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.8rem)" }}
              >
                Own Your Home in Dubai with{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--primary-color)" }}
                >
                  Mondus Properties
                </span>
              </h2>

              {/* Accent line */}
              <div
                className="h-[2px] w-16 mb-6"
                style={{
                  background:
                    "var(--bg-primary-gradient, var(--primary-color))",
                }}
              />

              {/* CTA */}
              <a
                href="/buy"
                className="inline-block px-8 py-3.5 text-xs font-semibold tracking-[2.5px] uppercase rounded-sm transition-all duration-300 hover:opacity-90 hover:shadow-lg mt-2"
                style={{
                  background:
                    "var(--bg-primary-gradient, var(--primary-color))",
                  color: "#2a1f18",
                }}
              >
                Explore Properties
              </a>
            </div>

            {/* ── RIGHT: Body copy ── */}
            <div className="lg:w-[58%] flex flex-col gap-6 text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400">
              <p>
                Mondus Properties makes it easy and secure to own or invest in
                the real estate of Dubai. As a leading{" "}
                <span className="text-black dark:text-white font-medium">
                  Real Estate Company in Dubai
                </span>
                , we specialise in offering premium property solutions for
                buyers, investors, and tenants worldwide.
              </p>

              <p>
                Having a set of qualified consultants and a collection of
                high-end apartments, villas and off-plan developments, we offer
                expert guidance to our customers — transforming their property
                aspirations into reality.
              </p>

              <p>
                Be it purchasing, leasing or investing, Mondus Properties makes
                it a smooth process. Our expert{" "}
                <span className="text-black dark:text-white font-medium">
                  Property Agent in Dubai
                </span>{" "}
                ensures a seamless, transparent, and hassle-free experience for
                every client.
              </p>

              {/* Highlight strip */}
              <div className="flex flex-wrap gap-px mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                {[
                  { value: "Premium", label: "Property Portfolio" },
                  { value: "Trusted", label: "RERA-Approved Agents" },
                  { value: "Worldwide", label: "Global Clients Served" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex-1 min-w-[120px] flex flex-col items-center justify-center text-center px-5 py-5 bg-gray-50 dark:bg-[#0a0a0a] gap-1"
                  >
                    <span
                      className="text-base font-semibold"
                      style={{ color: "var(--primary-color)" }}
                    >
                      {value}
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-500 tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
