import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import areaGuideData from "../data/areaGuideData.json";

const AreaGuideDetails = () => {
  const { title } = useParams();

  const area = areaGuideData.find(
    (a) =>
      a.title.replace(/\s+/g, "-").toLowerCase() ===
      (title || "").toLowerCase(),
  );

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-xl font-medium">
        Area not found.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin">
      <Navbar />

      {/* Hero Image */}
      <section className="relative w-full h-[90vh]">
        <img
          src={area.image}
          alt={area.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-6xl ">{area.title}</h1>
        </div>
      </section>

      {/* Area Details */}
      <section className="w-full md:w-[90%] mx-auto px-4 py-16 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Left: Description, Features, Amenities */}
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl mb-4">About {area.title}</h2>
              <p className="text-base leading-relaxed">{area.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {area.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 dark:bg-neutral-900 px-4 py-2 rounded"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                {area.amenities.map((amenity, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 dark:bg-neutral-900 px-4 py-2 rounded"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="w-full h-64 rounded overflow-hidden">
                <iframe
                  title="Google Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    area.title,
                  )}&output=embed`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right: Agent Info */}
          <div className="w-full h-fit border border-gray-200 dark:border-white/20 p-6 rounded-md bg-white dark:bg-neutral-900 shadow-md">
            <div className="flex flex-col items-center text-center space-y-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Consultant"
                className="w-24 h-24 rounded-full object-cover shadow"
              />
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  John Doe
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Senior Property Consultant
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <button className="bg-[var(--primary-color)] text-white py-2 rounded hover:opacity-90 transition font-medium">
                  Call Now
                </button>
                <button className="border border-[var(--primary-color)] text-[var(--primary-color)] py-2 rounded hover:bg-[var(--primary-color)] hover:text-white transition font-medium">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AreaGuideDetails;
