import React, { useState, useEffect, Suspense, lazy, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import rentImage from "../assets/buy-hero-img.png";

// Lazy load components
const Navbar = lazy(() => import("../components/Nav"));
const Footer = lazy(() => import("../components/Footer"));
const NotifyMe = lazy(() => import("../components/NotifyMe"));

import {
  BedDouble,
  Ruler,
  TrendingUp,
  BadgePercent,
  ShieldCheck,
  Building2,
  Globe,
  MapPin,
  User,
  CheckCircle2,
  Bath,
  ChevronDown,
  Users,
  GraduationCap,
} from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What is the price/cost of a property in Dubai?",
    answer:
      "Rental prices range from cheap flats to pricey villas, depending on the location and type of property.",
  },
  {
    question: "Can foreigners rent property in Dubai?",
    answer:
      "Yes, with proper documentation, expats and foreigners can rent properties easily.",
  },
  {
    question: "Is it compulsory to register Ejari?",
    answer:
      "In Dubai, all tenancy agreements must be registered through Ejari. This registration is legally required and ensures full protection for both tenants and landlords under Dubai's rental regulations.",
  },
  {
    question: "How long is the average lease?",
    answer:
      "The majority of contracts are yearly. Yet there are flexible options/alternatives available.",
  },
  {
    question: "Are furnished apartments available?",
    answer: "Yes, furnished and unfurnished are very common throughout Dubai.",
  },
];

const tenants = [
  {
    icon: User,
    title: "Working Professionals",
    desc: "Favour rental facilities close to business centres where there is easy access and modern facilities.",
  },
  {
    icon: Users,
    title: "Families",
    desc: "Find a large house in secure neighborhoods with access to schools, parks, and important services.",
  },
  {
    icon: Globe,
    title: "Expats",
    desc: "Take advantage of easy rental procedures and a variety of housing that will help you settle in Dubai easily.",
  },
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Frequently use low-priced studios and common rooms near universities and transport options.",
  },
];

const steps = [
  "Select property of your choice depending on price and location",
  "Book an appointment to see the house",
  "Complete the rent amount and negotiate with the landlord",
  "Send in necessary documentation to be checked",
  "Formally sign the tenancy contract",
  "Final pick-up procedures and get keys",
];

const documents = [
  "Identification-copy of passport",
  "Residents Emirates ID",
  "Legal residency: valid copy of visa",
  "Security deposit cheque as per agreement",
];

const propertyTypes = [
  {
    title: "Apartments for Rent in Dubai",
    desc: "Apartments are one of the most sought-after types of rental housing in Dubai since it is convenient, fully equipped, and it provides access to major business centers. A large number of professionals and small families are drawn to apartments for rent in Dubai due to affordability and central locations when choosing a property for rent in Dubai.",
  },
  {
    title: "Studio Apartment for Rent in Dubai",
    desc: "Studio apartments are the best choice for people living in prime locations who want affordable housing, and are mostly young professionals and singles looking for a property for rent in Dubai. These small houses are comfortable, private, and accessible by transport and workplaces.",
  },
  {
    title: "Villas for Rent in Dubai",
    desc: "Dubai's villa properties have ample space and feature their own gardens as well as fantastic amenities, providing luxury and comfort for families wishing to reside in these types of properties when selecting a property for rent in Dubai. They offer serene living in the secluded residential estates.",
  },
  {
    title: "Townhouses for Rent in Dubai",
    desc: "Townhouses are a blend of the new design and community living. They are well-liked in families, where they appreciate common facilities, parks, and safe neighborhood environments when searching for a property for rent in Dubai.",
  },
  {
    title: "Luxury Property for Rent in Dubai",
    desc: "The Dubai luxury rentals provide an alternative definition of luxurious living standards, with beautiful interiors, waterfronts, and the latest facilities. These houses are targeted at those who desire to live the high-end lifestyle.",
  },
];

const benefits = [
  {
    icon: TrendingUp,
    text: "Spacious apartments convenient for both short and long-term accommodation.",
  },
  {
    icon: BadgePercent,
    text: "No commitment of property ownership or mobility.",
  },
  {
    icon: Building2,
    text: "Premium gated communities and developments.",
  },
  {
    icon: ShieldCheck,
    text: "State-of-the-art facilities such as gyms, pools, and shopping.",
  },
  {
    icon: Globe,
    text: "Secure, hygienic, and extremely contemporary infrastructure.",
  },
  {
    icon: CheckCircle2,
    text: "Good linkages to business and recreational centers.",
  },
];

const areas = [
  {
    title: "Dubai Marina",
    desc: "The exciting waterfront neighborhood of tall apartments and the active life of young professionals.",
  },
  {
    title: "Downtown Dubai",
    desc: "The central area of the city provides luxury living close to landmark locations, shopping areas, and business areas.",
  },
  {
    title: "Jumeirah Village Circle (JVC)",
    desc: "An affordable and family-friendly neighborhood with parks, education, and large housing.",
  },
  {
    title: "Business Bay",
    desc: "A business hub with contemporary flats near workplaces and the financial centre of the city, making it ideal for a property for rent in Dubai.",
  },
  {
    title: "Palm Jumeirah",
    desc: "A renowned destination with ultra-luxury villas and apartments that have breathtaking sea views.",
  },
];

const tips = [
  "Establish a clear budget",
  "Identify the ideal place",
  "Check the facilities",
  "Inspect properties prior to renting",
  "Make sure to deal with reliable agents to have a hassle-free time",
];

const Rent: React.FC = () => {
  const [rentData, setRentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const [bedroomFilter, setBedroomFilter] = useState("");
  const [bathroomFilter, setBathroomFilter] = useState("");
  const [subareaFilter, setSubareaFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [minAreaFilter, setMinAreaFilter] = useState("");
  const [maxAreaFilter, setMaxAreaFilter] = useState("");

  /* ---------------- FETCH RENT PROPERTIES ---------------- */
  useEffect(() => {
    const fetchRentProperties = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/property?listingType=rent&status=true`,
        );
        const json = await res.json();
        setRentData(json.data || []);
      } catch (error) {
        console.error("Error fetching rent properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentProperties();
  }, []);

  /* ---------------- DROPDOWNS ---------------- */
  const uniqueSubareas = useMemo(
    () =>
      Array.from(
        new Set(rentData.map((p) => p.subArea).filter(Boolean)),
      ).sort(),
    [rentData],
  );

  const uniquePropertyTypes = useMemo(
    () =>
      Array.from(
        new Set(rentData.map((p) => p.propertyType).filter(Boolean)),
      ).sort(),
    [rentData],
  );

  /* ---------------- FILTER LOGIC ---------------- */
  const properties = useMemo(() => {
    return rentData.filter((property) => {
      const bedroomMatch =
        !bedroomFilter ||
        (bedroomFilter === "4"
          ? property.bedroom >= 4
          : property.bedroom === Number(bedroomFilter));

      const bathroomMatch =
        !bathroomFilter ||
        (bathroomFilter === "4"
          ? property.bathroom >= 4
          : property.bathroom === Number(bathroomFilter));

      const subareaMatch = !subareaFilter || property.subArea === subareaFilter;

      const propertyTypeMatch =
        !propertyTypeFilter || property.propertyType === propertyTypeFilter;

      const minAreaMatch =
        !minAreaFilter || property.sizeSqft >= Number(minAreaFilter);

      const maxAreaMatch =
        !maxAreaFilter || property.sizeSqft <= Number(maxAreaFilter);

      return (
        bedroomMatch &&
        bathroomMatch &&
        subareaMatch &&
        propertyTypeMatch &&
        minAreaMatch &&
        maxAreaMatch
      );
    });
  }, [
    rentData,
    bedroomFilter,
    bathroomFilter,
    subareaFilter,
    propertyTypeFilter,
    minAreaFilter,
    maxAreaFilter,
  ]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Rent Property in Dubai | Flats, Villas & Furnished Homes</title>

        <meta
          name="title"
          content="Rent Property in Dubai | Flats, Villas & Furnished Homes"
        />
        <meta
          name="description"
          content="Find apartments, villas & furnished homes for rent in Dubai at best prices. Call +971521110794 for quick assistance."
        />

        <meta
          name="keywords"
          content="rent property dubai, apartments for rent dubai, villas for rent dubai, furnished flats dubai, dubai rental properties"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="canonical" href="https://www.mondusproperties.ae/rent" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.mondusproperties.ae/sell"
        />
        <meta
          property="og:title"
          content="Rent Property in Dubai | Flats, Villas & Furnished Homes"
        />
        <meta
          property="og:description"
          content="Find apartments, villas & furnished homes for rent in Dubai at best prices. Call +971521110794 for quick assistance."
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
          content="https://www.mondusproperties.ae/rent"
        />
        <meta
          name="twitter:title"
          content="Rent Property in Dubai | Flats, Villas & Furnished Homes"
        />
        <meta
          name="twitter:description"
          content="Find apartments, villas & furnished homes for rent in Dubai at best prices. Call +971521110794 for quick assistance."
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
        <div className=" pt-5">
          <Suspense
            fallback={<div className="text-center py-4">Loading navbar...</div>}
          >
            <Navbar />
          </Suspense>
        </div>

        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden md:mb-10">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${rentImage})` }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
            <h1 className="md:text-5xl text-3xl font-semibold text-white leading-tight">
              Property for Rent in{" "}
              <span className="text-[var(--primary-color)]">Dubai</span>
            </h1>

            <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-3xl">
              Dubai boasts an exciting real estate market, a great lifestyle,
              modern infrastructure, and a wide variety of home options that
              make it one of the most dynamic cities in the world. High-rise
              apartments and luxury houses entice many professionals, families,
              and expatriates across the globe to settle in Dubai. Whatever your
              budget and lifestyle, you will have choices to make, and all the
              choices will be located in well-connected, vibrant communities,
              which are comfortable and convenient to live in, should you be
              seeking a property for rent in Dubai.
            </p>
          </div>
        </section>

        <h2 className="text-2xl text-center">PROPERTIES FOR RENT IN DUBAI</h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-4 px-4">
          <select
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
            value={bedroomFilter}
            onChange={(e) => setBedroomFilter(e.target.value)}
          >
            <option value="">Select Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>

          <select
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
            value={bathroomFilter}
            onChange={(e) => setBathroomFilter(e.target.value)}
          >
            <option value="">Select Bathrooms</option>
            <option value="1">1 Bathroom</option>
            <option value="2">2 Bathrooms</option>
            <option value="3">3 Bathrooms</option>
            <option value="4">4+ Bathrooms</option>
          </select>

          <select
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
            value={subareaFilter}
            onChange={(e) => setSubareaFilter(e.target.value)}
          >
            <option value="">All Subareas</option>
            {uniqueSubareas.map((area, i) => (
              <option key={i} value={area}>
                {area}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
            value={propertyTypeFilter}
            onChange={(e) => setPropertyTypeFilter(e.target.value)}
          >
            <option value="">All Property Types</option>
            {uniquePropertyTypes.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Area Sqft"
            value={minAreaFilter}
            onChange={(e) => setMinAreaFilter(e.target.value)}
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
          />

          <input
            type="number"
            placeholder="Max Area Sqft"
            value={maxAreaFilter}
            onChange={(e) => setMaxAreaFilter(e.target.value)}
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white"
          />
        </div>

        {/* Property Grid */}
        <div className="relative w-full max-w-7xl md:w-[90%] mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : properties.length === 0 ? (
            <p className="text-center min-h-[300px] flex items-center justify-center">
              No properties match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link
                  to={`/rent/${property.slug}`}
                  key={property._id}
                  className="h-full"
                >
                  <div className="bg-gray-100 dark:bg-neutral-900 shadow rounded overflow-hidden border flex flex-col h-full">
                    <img
                      loading="lazy"
                      src={
                        property.propertyImages?.[0]
                          ? `${property.propertyImages[0]}`
                          : "/placeholder.jpg"
                      }
                      className="w-full h-56 object-cover"
                    />

                    <div className="space-y-1 px-4 py-2 flex-grow">
                      <h3 className="text-lg">{property.propertyName}</h3>

                      <p className="text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {property.subArea}
                      </p>

                      <p className="text-sm">{property.propertyType}</p>

                      <div className="flex items-center text-sm gap-4 py-1">
                        <span className="flex gap-1">
                          <BedDouble className="w-4 h-4" /> {property.bedroom}
                        </span>
                        <span className="flex gap-1">
                          <Bath className="w-4 h-4" /> {property.bathroom}
                        </span>
                        <span className="flex gap-1">
                          <Ruler className="w-4 h-4" /> {property.sizeSqft} sqft
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <section className="w-full py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Heading */}
            <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
              Explore the Best{" "}
              <span className="text-[var(--primary-color)] bg-clip-text">
                Property for Rent
              </span>{" "}
              in Dubai
            </h2>

            {/* Divider */}
            <div className="w-20 h-1 mx-auto mt-6 bg-[var(--primary-color)] rounded-full" />

            {/* Content */}
            <p className="mt-8 text-gray-700 dark:text-gray-200 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
              Dubai has a wide range of rental markets and can suit all, be it
              affordable studios or luxurious waterfront apartments, offering
              every type of property for rent in Dubai. The city comprises
              planned communities, global amenities, and strategic locations. At
              Mondus Properties, you can view the apartments, villas,
              townhouses, and luxury rentals where it is easy to identify the
              right property for rent in Dubai that fits your lifestyle and
              budget.
            </p>
          </div>
        </section>

        <section className="w-full py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Grid */}
            <div className="flex flex-wrap gap-8 justify-between">
              {propertyTypes.map((item, index) => {
                let widthClass = "w-full";

                if (index < 3) {
                  widthClass = "w-full md:w-[calc(33%-1.33rem)]";
                } else {
                  widthClass = "w-full md:w-[calc(50%-1rem)]";
                }

                return (
                  <div
                    key={index}
                    className={`group ${widthClass} border border-gray-700 dark:border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
                  >
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-[var(--primary-color)] transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-200 text-md leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Accent Line */}
                    <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-[var(--bg-primary-gradient)] transition-all duration-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* WHY RENT */}
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Why Rent Property in{" "}
                <span className="text-[var(--primary-color)]">Dubai?</span>
              </h2>

              <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                Renting in Dubai is flexible, convenient, and has access to a
                world-class lifestyle for anyone looking for a property for rent
                in Dubai. The city is structured to attract those inhabitants
                wishing to live in the city with no fixed-term contracts.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {benefits.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:shadow-md transition"
                  >
                    <div className="p-3 rounded-lg text-[var(--primary-color)]">
                      <Icon size={20} />
                    </div>
                    <p className="text-md leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>

            {/* FEATURED AREAS */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Popular Areas to Rent Property in{" "}
                <span className="text-[var(--primary-color)]">Dubai</span>
              </h2>

              <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                There are a number of apartments for rent in Dubai with their
                own benefits for those looking for a property for rent in Dubai.
                You can choose to have the waterfront or city-centre living.
              </p>
            </div>

            {/* Areas Grid */}
            <div className="flex flex-wrap gap-8">
              {areas.map((area, index) => {
                let widthClass = "w-full";

                if (index < 3) {
                  widthClass = "w-full md:w-[calc(33%-1.33rem)]";
                } else {
                  widthClass = "w-full md:w-[calc(50%-1rem)]";
                }

                return (
                  <div
                    key={index}
                    className={`group ${widthClass} border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}
                  >
                    {/* Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin
                        className="text-[var(--primary-color)]"
                        size={18}
                      />
                      <h3 className="text-lg font-semibold">{area.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                      {area.desc}
                    </p>

                    {/* Hover Accent */}
                    <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-[var(--bg-primary-gradient)] transition-all duration-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Types of Tenants */}
        <section className="w-full py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* TENANT TYPES */}
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Types of Tenants We{" "}
                <span className="text-[var(--primary-color)]">Serve</span>
              </h2>
              <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                Dubai's rental market caters to a wide range of residents, each
                with unique lifestyle needs and expectations looking for a
                property for rent in Dubai. Mondus Properties guarantees
                customized solutions to each type of tenant.
              </p>
            </div>

            {/* Tenant Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {tenants.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
                  >
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-white border border-[var(--primary-color)] text-[var(--primary-color)]">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary-color)]">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* STEP GUIDE */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-10">
                How to Rent Property in Dubai (Step-by-Step Guide)
              </h3>

              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                {steps.map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full border border-[var(--primary-color)] text-[var(--primary-color)] font-semibold mb-3">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                Documents Required to Rent Property in Dubai
              </h3>

              <p className="text-gray-700 dark:text-gray-200 text-sm mb-6">
                When renting in Dubai, to make the legal process pass without
                any complications, tenants need to present necessary documents
                when applying for a property for rent in Dubai.
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {documents.map((item, i) => (
                  <div
                    key={i}
                    className="border border-gray-700 dark:border-gray-200 rounded-xl p-5 text-center items-center flex justify-center"
                  >
                    <p className="text-gray-700 dark:text-gray-200 text-sm">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* COSTS */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                Costs Involved in Renting Property in Dubai
              </h3>

              <p className="text-gray-700 dark:text-gray-200 text-sm mb-6">
                Knowing the cost of rental also assists tenants to budget well
                before relocating to a new house when selecting a property for
                rent in Dubai. Typical costs are annual rent, security deposit,
                agency fee, Ejari registration fee and maintenance fees where
                applicable.
              </p>
            </div>

            {/* WHY CHOOSE */}
            <div className="mb-20 text-center">
              <h3 className="text-3xl font-semibold mb-6">
                Why Choose Mondus Properties{" "}
                <span className="text-[var(--primary-color)]">
                  Mondus Properties
                </span>{" "}
                for Renting in Dubai?
              </h3>
              <p className="text-gray-700 dark:text-gray-100 text-sm mb-10">
                Mondus Properties makes your rental process as easy as possible
                by providing quality services and professional advice during the
                process of finding a property for rent in Dubai. The advantages
                you have are trusted listings, excellent local knowledge,
                seamless rental experience, a comprehensive selection of
                property, and customer-focused service
              </p>
            </div>
            <div className="mb-20 text-center">
              <h3 className="text-3xl font-semibold mb-6">
                Luxury Property for Rent in Dubai –{" "}
                <span className="text-[var(--primary-color)]">
                  Experience Premium Living
                </span>
              </h3>
              <p className="text-gray-700 dark:text-gray-100 text-sm mb-10">
                Dubai is a city with a luxury lifestyle in the world, and its
                rental market is no exception. Luxury real estate can include
                penthouses with excellent skyline views, apartments for rent in
                Dubai, studio apartment for rent in Dubai, exclusive beachfront
                villas, and luxury and additional amenities for a true high-end
                living experience when choosing a property for rent in Dubai.
              </p>
            </div>

            {/* TIPS */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                Tips to Find the Best Property for Rent in Dubai
              </h3>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {tips.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border border-gray-200 rounded-xl p-5"
                  >
                    <CheckCircle2
                      className="text-[var(--primary-color)] mt-1"
                      size={18}
                    />
                    <p className="text-gray-700 dark:text-gray-50 text-sm">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="w-full py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold">
                FAQs – Renting Property in{" "}
                <span className="text-[var(--primary-color)]">Dubai</span>
              </h2>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={index}
                    className="border border-gray-600 dark:border-gray-200 rounded-xl overflow-hidden"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">
                        {faq.question}
                      </h3>

                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[var(--primary-color)]" : ""
                        }`}
                        size={20}
                      />
                    </button>

                    {/* Answer */}
                    <div
                      className={`px-5 transition-all duration-300 ${
                        isOpen
                          ? "max-h-40 pb-5 opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-100 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LUXURY CTA */}
        <section className="w-full py-16 px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold leading-snug">
              Find Your Ideal Property for{" "}
              <span className="text-[var(--primary-color)]">
                Rent in Dubai Today
              </span>
            </h3>

            <p className="mt-6 text-gray-700 dark:text-gray-100 leading-relaxed">
              Start to search for rental properties in Dubai and make use of the
              many choices available. Get in touch with a professional. Also,
              reserve a tour of a rental property located in Dubai that fits
              within your price/cost range
            </p>
          </div>
        </section>
        <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
          <NotifyMe />
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Rent;
