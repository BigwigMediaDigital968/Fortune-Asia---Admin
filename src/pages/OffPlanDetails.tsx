import { useParams } from "react-router-dom";
import propertiesData from "../data/OffPlanData.json";
const properties = propertiesData as Property[];
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import { FaBath, FaBed, FaMapMarkerAlt, FaHome } from "react-icons/fa";
import { useEffect } from "react";
import NotifyMe from "../components/NotifyMe";

type Property = {
  id: number;
  title: string;
  location: string;
  type: string;
  developer: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  featuresAndAmenities: string[];
  description: string;
};

const OffPlanDetails = () => {
  const { slug } = useParams();
  const decodedTitle = slug?.replace(/-/g, " ").toLowerCase();

  const property = properties.find(
    (item) => item.title.toLowerCase().replace(/\s+/g, " ") === decodedTitle,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property)
    return <p className="text-center mt-20">Property not found.</p>;

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin">
      <div className="mb-16 md:mb-24 pt-5">
        <Navbar />
      </div>

      <div className="w-full md:w-[90%] mx-auto px-4 space-y-10 pb-20">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center">{property.title}</h1>

        {/* Image */}
        <div className="rounded overflow-hidden shadow-lg">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-72 md:h-[500px] object-cover"
          />
        </div>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p>
              <strong>Developer:</strong> {property.developer}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaMapMarkerAlt /> {property.location}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaHome /> Type: {property.type}
            </p>
            <div className="flex items-center gap-6 text-sm md:text-base mt-2">
              <span className="flex items-center gap-2">
                <FaBed /> {property.beds} Beds
              </span>
              <span className="flex items-center gap-2">
                <FaBath /> {property.baths} Baths
              </span>
            </div>
            <p className="text-lg font-semibold text-[var(--primary-color)] mt-2">
              {property.price}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Features & Description */}
          <div className="md:w-2/3 space-y-6">
            {/* Features & Amenities */}
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Features & Amenities
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {property.featuresAndAmenities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {property.description}
              </p>
            </div>
          </div>

          {/* Right Column: Consultant Box */}
          <div className="md:w-1/3 w-full border border-gray-200 dark:border-white/20 p-4 rounded-md bg-white dark:bg-neutral-900 shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Consultant"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  John Doe
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Senior Property Consultant
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <button className="bg-[var(--primary-color)] text-white py-2 rounded hover:opacity-90 transition">
                  Call Now
                </button>
                <button className="border border-[var(--primary-color)] text-[var(--primary-color)] py-2 rounded hover:bg-[var(--primary-color)] hover:text-white transition">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotifyMe />
      <Footer />
    </div>
  );
};

export default OffPlanDetails;
