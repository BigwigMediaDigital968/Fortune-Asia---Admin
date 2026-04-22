import "leaflet/dist/leaflet.css";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import propertiesData from "../data/OffPlanData.json";
const properties = propertiesData as Property[];

import { useNavigate } from "react-router-dom";
import NotifyMe from "../components/NotifyMe";
import { Helmet } from "react-helmet-async";

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

const PropertyCard = ({ property }: { property: Property }) => {
  const navigate = useNavigate();

  const slug = `${property.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")}`;

  return (
    <div className="bg-white dark:bg-neutral-900 text-black dark:text-white shadow border dark:border-white/10 hover:shadow-md transition duration-200 overflow-hidden">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-52 object-cover"
        />

        <div className="absolute bottom-2 left-2 bg-white dark:bg-neutral-800 text-xs px-2 py-0.5 rounded shadow">
          {property.type}
        </div>
      </div>

      <div className="p-3">
        <h3 className=" mb-1">{property.title}</h3>
        <p className="text-sm  mb-1">Developer: {property.developer}</p>
        <div className="text-sm mb-2">Type: {property.type}</div>

        <button
          onClick={() => navigate(`/offplan/${slug}`)}
          className="text-[var(--primary-color)] text-sm mt-2 hover:underline"
        >
          Explore →
        </button>
      </div>
    </div>
  );
};

const OffPlan = () => {
  return (
    <>
      <Helmet>
        <title>Off Plan Properties in Dubai | Best Investment Deals</title>

        <meta
          name="title"
          content="Off Plan Properties in Dubai | Best Investment Deals"
        />
        <meta
          name="description"
          content="Explore off-plan properties in Dubai with flexible payment plans. Book your unit today. Call +971521110794 now."
        />

        <meta
          name="keywords"
          content="off plan properties dubai, dubai new projects, dubai investment properties, buy off plan dubai, dubai real estate investment"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="canonical" href="https://www.mondusproperties.ae/offplan" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.mondusproperties.ae/offplan"
        />
        <meta
          property="og:title"
          content="Off Plan Properties in Dubai | Best Investment Deals"
        />
        <meta
          property="og:description"
          content="Explore off-plan properties in Dubai with flexible payment plans. Book your unit today. Call +971521110794 now."
        />
        <meta
          property="og:image"
          content="https://www.mondusproperties.ae/og-buy.jpg"
        />
        <meta property="og:site_name" content="Mondus Properties" />
        <meta property="og:locale" content="en_AE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://www.mondusproperties.ae/offplan"
        />
        <meta
          name="twitter:title"
          content="Off Plan Properties in Dubai | Best Investment Deals"
        />
        <meta
          name="twitter:description"
          content="Explore off-plan properties in Dubai with flexible payment plans. Book your unit today. Call +971521110794 now."
        />
        <meta
          name="twitter:image"
          content="https://www.mondusproperties.ae/og-buy.jpg"
        />

        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
      </Helmet>

      <div className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin">
        <Navbar />

        {/* Hero Image with Overlay Text */}
        <section className="relative h-[50vh] md:h-[100vh] w-full">
          <img
            src="https://www.axcapital.ae/_ipx/s_1920x960/img/intro/offplan.webp" // Replace with your actual image path
            alt="Off Plan Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70 flex flex-col items-center justify-end py-5 text-center px-4 font-raleway font-thin">
            <h1 className="text-4xl md:text-6xl  text-white mb-4">
              Off Plan in Dubai
            </h1>
            <p className="text-lg md:text-2xl text-white">
              Recently Launched Projects
            </p>
          </div>
        </section>

        {/* Property Cards Section */}
        <section className="px-4 sm:px-6 py-24 md:w-[90%] mx-auto">
          {properties.length === 0 ? (
            <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
              No off-plan properties available at the moment. Please check back
              soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
        <NotifyMe />
        <Footer />
      </div>
    </>
  );
};

export default OffPlan;
