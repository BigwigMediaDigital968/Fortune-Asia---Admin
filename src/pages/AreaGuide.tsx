import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import PromptConsultation from "../components/PromptConsultation";
import areaGuideData from "../data/areaGuideData.json";

const AreaGuide = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin">
      <Navbar />

      <section className="relative h-screen w-full">
        <img
          src="https://www.axcapital.ae/_ipx/s_1920x960/img/intro/areaguides.webp"
          alt="Area Guide"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/70 flex flex-col items-center justify-end py-5 text-center px-4">
          <h1 className="text-4xl md:text-6xl text-white mb-4">
            Areas in Dubai
          </h1>
          <p className="text-lg md:text-2xl text-white">Explore Dubai</p>
        </div>
      </section>

      <section className="w-full md:w-[90%] mx-auto px-4 py-16 md:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {areaGuideData.map((area, index) => (
          <a
            href={`/area-guides/${area.title
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            <div
              key={index}
              className="relative h-80 overflow-hidden shadow-lg group"
            >
              <img
                src={area.image}
                alt={area.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-4 text-center">
                <h2 className="text-lg md:text-xl font-medium">{area.title}</h2>
                <hr className="my-2 border-white/50" />
                <p className="text-sm text-white hover:text-[var(--primary-color)] px-4 py-1 rounded transition">
                  Explore
                </p>
              </div>
            </div>
          </a>
        ))}
      </section>

      <PromptConsultation />
      <Footer />
    </div>
  );
};

export default AreaGuide;
