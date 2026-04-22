import React, { useState, useEffect, Suspense, lazy, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
  Crown,
  CheckCircle2,
  Shield,
  Bath,
  ChevronDown,
} from "lucide-react";
import buyImage from "../assets/buy-hero-img.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Is it allowed to buy property in Dubai by foreigners?",
    answer:
      "Yes, there is the possibility of foreign investors purchasing property in specified freehold zones. It is a straightforward and open process.",
  },
  {
    question: "How is the average ROI in Dubai real estate?",
    answer:
      "The rental yields are usually 5 percent to 8 percent, depending on the place and type of property.",
  },
  {
    question: "Is there property tax in Dubai?",
    answer:
      "No, Dubai has a tax free environment where there is no property tax annually, thus very attractive to investors.",
  },
  {
    question: "How much does it cost to invest in a Golden Visa?",
    answer:
      "A UAE Golden Visa can be obtained on investments in property of at least AED 2 million.",
  },
  {
    question: "Are off-plan properties an investment to make?",
    answer:
      "Yes, they come with cheaper entry fees, attractive payment schemes and good capital growth prospects.",
  },
  {
    question: "How much time does it take to purchase property in Dubai?",
    answer:
      "The process can be fulfilled in a few weeks provided that all documents are in place.",
  },
];

const buyers = [
  {
    icon: User,
    title: "First-Time Home Buyers",
    desc: "We offer directions and services to enable first-time buyers to get the right home and explore suitable properties for sale in Dubai.",
  },
  {
    icon: TrendingUp,
    title: "Property Investors",
    desc: "Our investment-oriented strategy would assist buyers in maximising ROI and high growth opportunities in properties for sale in Dubai.",
  },
  {
    icon: Crown,
    title: "Luxury Property Buyers",
    desc: "Luxury properties for sale in Dubai are unique and luxurious high-end homes that bring unparalleled prestige and luxury.",
  },
  {
    icon: Globe,
    title: "International Buyers",
    desc: "The ease with which one can buy in Dubai and the policies that are friendly to investors make it the perfect destination for global buyers.",
  },
];

const steps = [
  "Choose your preferred property",
  "Finalise your budget and financing",
  "Sign the Memorandum of Understanding (MOU)",
  "Pay the deposit (usually 10%)",
  "Complete ownership transfer to the authorities",
];

const costs = [
  "Dubai Land Department (DLD) fee (approx. 4%)",
  "Agency fee (typically 2%)",
  "Mortgage fees (if applicable)",
  "Maintenance costs (depend on property)",
];

const whyChoose = [
  "Local market knowledge with profound expertise",
  "Safe and verified transaction listings",
  "End-to-end support from search to ownership",
  "Maximum returns investment advisory",
  "Exclusive deals on high-end properties",
];

const propertTypes = [
  {
    title: "Apartments for Sale in Dubai",
    desc: "Dubai apartments offer a perfect mix of modern lifestyle and top-class amenities, which can attract both professionals and investors looking for properties for sale in Dubai. They are in the best locations, and they have good rental returns and convenient access to business centers, shopping, and entertainment.",
  },
  {
    title: "Villas for Sale in Dubai",
    desc: "Dubai villas are setting the benchmark of luxurious living standards with one of the most spacious architectures, personal gardens, and high-quality fittings. The houses have the ability to provide privacy, comfort, and a luxurious lifestyle, making them perfect for the entire family and ideal properties for sale in Dubai.",
  },
  {
    title: "Townhouses for Sale in Dubai",
    desc: "Townhouses would suit families that want a compromise between space and affordability. They are situated in community-oriented developments and provide contemporary design, recreational facilities, and serene living conditions, making them popular properties for sale in Dubai.",
  },
  {
    title: "Penthouses & Luxury Property in Dubai",
    desc: "Luxury apartments and penthouses are the best examples with their amazing panoramic views, exclusive designs, and the best location. These properties are exclusive to suit high-end consumers who desire uncompromised luxury and class, representing premium luxury properties for sale in Dubai.",
  },
  {
    title: "Off-Plan Properties in Dubai",
    desc: (
      <>
        <a
          className="text-[var(--primary-color)] font-medium"
          href="https://www.mondusproperties.ae/offplan"
        >
          Off-plan
        </a>{" "}
        homes offer great investment resources with convenient development
        payments and reduced entry costs. The buyers will gain capital
        appreciation and invest in future-proof developments, making them
        attractive properties for sale in Dubai.
      </>
    ),
  },
];

const benefits = [
  {
    icon: TrendingUp,
    text: "Capital gains and tax-free rental returns.",
  },
  {
    icon: BadgePercent,
    text: "Excellent ROI in relation to the global property markets.",
  },
  {
    icon: Globe,
    text: "Eligibility for property investors under the Golden Visa Program.",
  },
  {
    icon: Building2,
    text: "Global quality infrastructure and living standards.",
  },
  {
    icon: ShieldCheck,
    text: "A regulated market that is safe and transparent.",
  },
];

const areas = [
  {
    title: "Downtown Dubai",
    desc: "Downtown Dubai is a high-class urban way of life with high investments and points of interest due to the presence of iconic buildings and high-end houses, making it a prime location for properties for sale in Dubai.",
  },
  {
    title: "Dubai Marina",
    desc: "Dubai Marina is known to have a waterfront lifestyle with beautiful views, colourful nightlife, and high demand in terms of rental, along with strong demand for properties for sale in Dubai.",
  },
  {
    title: "Palm Jumeirah",
    desc: "Palm Jumeirah is a symbol of luxury that has villas on the beach and offers ample luxury properties for sale in Dubai.",
  },
  {
    title: "Business Bay",
    desc: "Business Bay is a dynamic entertainment hub that has a combination of business and residential space, making it the right place to be as a professional and an investor looking for properties for sale in Dubai.",
  },
  {
    title: "Jumeirah Village Circle (JVC)",
    desc: "JVC provides cheap housing solutions, which have great growth prospects, hence it has been drawing first-time buyers and investors searching for properties for sale in Dubai.",
  },
];

// Lazy load components
const Navbar = lazy(() => import("../components/Nav"));
const Footer = lazy(() => import("../components/Footer"));
const NotifyMe = lazy(() => import("../components/NotifyMe"));

const Buy: React.FC = () => {
  const navigate = useNavigate();
  const [saleData, setSaleData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Filters
  const [bedroomFilter, setBedroomFilter] = useState("");
  const [bathroomFilter, setBathroomFilter] = useState("");
  const [subareaFilter, setSubareaFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [minAreaFilter, setMinAreaFilter] = useState("");
  const [maxAreaFilter, setMaxAreaFilter] = useState("");

  /* ---------------- Fetch Properties ---------------- */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/property?listingType=buy&status=true`,
        );
        const json = await res.json();

        // Safety filter (in case backend changes)
        const buyProperties = (json.data || []).filter(
          (p: any) => p.listingType === "buy",
        );

        setSaleData(buyProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // console.log(saleData);

  /* ---------------- Filter Options ---------------- */
  const uniquePropertyTypes = useMemo(
    () =>
      Array.from(new Set(saleData.map((p) => p.propertyType).filter(Boolean))),
    [saleData],
  );

  const uniqueSubareas = useMemo(
    () => Array.from(new Set(saleData.map((p) => p.subArea).filter(Boolean))),
    [saleData],
  );

  /* ---------------- Filter Logic ---------------- */
  const properties = useMemo(() => {
    return saleData.filter((property) => {
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
    saleData,
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
        <title>
          Buy Property in Dubai | Apartments, Villas & Investment Deals
        </title>

        <meta
          name="title"
          content="Buy Property in Dubai | Apartments, Villas & Investment Deals"
        />
        <meta
          name="description"
          content="Explore top properties for sale in Dubai including luxury apartments, villas & high ROI investment deals. Get expert guidance from Mondus Properties. Call +971521110794 today."
        />

        <meta
          name="keywords"
          content="buy property dubai, dubai apartments for sale, villas for sale dubai, dubai real estate investment, property for sale dubai, off plan properties dubai, luxury homes dubai"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="canonical" href="https://www.mondusproperties.ae/buy" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mondusproperties.ae/buy" />
        <meta
          property="og:title"
          content="Buy Property in Dubai | Apartments, Villas & Investment Deals"
        />
        <meta
          property="og:description"
          content="Find the best apartments, villas & investment properties for sale in Dubai. Expert assistance from Mondus Properties."
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
          content="https://www.mondusproperties.ae/buy"
        />
        <meta
          name="twitter:title"
          content="Buy Property in Dubai | Apartments & Villas"
        />
        <meta
          name="twitter:description"
          content="Browse Dubai properties for sale including apartments, villas & investment deals with Mondus Properties."
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
        <div className="pt-5">
          <Suspense
            fallback={<div className="text-center py-4">Loading navbar...</div>}
          >
            <Navbar />
          </Suspense>
        </div>
        {/* Hero */}
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden md:mb-10">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${buyImage})` }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
            <h1 className="md:text-5xl text-3xl font-semibold text-white leading-tight">
              Properties for Sale in{" "}
              <span className="text-[var(--primary-color)]">Dubai</span>
            </h1>

            <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-3xl">
              Dubai has emerged as one of the most desirable markets in the real
              estate sector in the world, with excellent opportunities for
              buyers and investors. Combining good financial returns with a
              luxurious lifestyle, Properties for Sale in Dubai are proven to be
              profitable due to their high rental yields and tax-free lifestyle.
              Featuring diversity, variety, and long-term value, Dubai really
              stands out by giving apartments in one of the modern high-rise
              buildings, a beachfront villa, or a luxury penthouse, making it a
              top destination for properties for sale in Dubai.
            </p>
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
          <select
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white cursor-pointer"
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
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white cursor-pointer"
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
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white cursor-pointer"
            value={subareaFilter}
            onChange={(e) => setSubareaFilter(e.target.value)}
          >
            <option value="">Select Subarea</option>
            {uniqueSubareas.map((subarea, i) => (
              <option key={i} value={subarea}>
                {subarea}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded dark:bg-neutral-800 dark:text-white cursor-pointer"
            value={propertyTypeFilter}
            onChange={(e) => setPropertyTypeFilter(e.target.value)}
          >
            <option value="">Select Property Type</option>
            {uniquePropertyTypes.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border p-2 rounded w-28 dark:bg-neutral-800 dark:text-white"
            placeholder="Min sqft"
            value={minAreaFilter}
            onChange={(e) => setMinAreaFilter(e.target.value)}
          />

          <input
            type="number"
            className="border p-2 rounded w-28 dark:bg-neutral-800 dark:text-white"
            placeholder="Max sqft"
            value={maxAreaFilter}
            onChange={(e) => setMaxAreaFilter(e.target.value)}
          />
        </div>

        {/* Property Grid */}
        <div className="relative w-full md:w-[90%] mx-auto px-4 py-8">
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
                  to={`/buy/${property.slug}`}
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

                      <div className="flex gap-4 text-sm py-1">
                        <span className="flex gap-1">
                          <BedDouble className="w-4 h-4" />
                          {property.bedroom}
                        </span>
                        <span className="flex gap-1">
                          <Bath className="w-4 h-4" />
                          {property.bathroom}
                        </span>
                        <span className="flex gap-1">
                          <Ruler className="w-4 h-4" />
                          {property.sizeSqft} sqft
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
              Explore{" "}
              <span className="text-[var(--primary-color)] bg-clip-text">
                Premium Properties
              </span>{" "}
              for Sale in Dubai, UAE
            </h2>

            {/* Divider */}
            <div className="w-20 h-1 mx-auto mt-6 bg-[var(--primary-color)] rounded-full" />

            {/* Content */}
            <p className="mt-8 text-gray-700 dark:text-gray-200 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
              Find numerous properties in Dubai, UAE that would fit any
              lifestyle and budget, especially those looking for properties for
              sale in Dubai, UAE. The market targets both the end-users and
              investors, with low-cost homes on one side and extremely expensive
              homes on the other. Search through apartments, luxury properties
              for sale in Dubai, villas, townhouses and off plan projects in
              some of the elite communities and get your dream apartment, house,
              and villa with ease when exploring properties for sale in Dubai.
            </p>
          </div>
        </section>

        <section className="w-full py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Grid */}
            <div className="flex flex-wrap gap-8 justify-between">
              {propertTypes.map((item, index) => {
                let widthClass = "w-full"; // mobile default

                // Desktop layout logic
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
            {/* WHY BUY */}
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Why Buy Property in{" "}
                <span className="text-[var(--primary-color)]">Dubai?</span>
              </h2>

              <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                Dubai has been able to mitigate its winning appeal to global
                investors because of its good economic fundamentals and
                investor-friendly policies, especially for those considering{" "}
                <a
                  className="text-[var(--primary-color)] font-medium"
                  href="https://www.mondusproperties.ae/blogs/buy-property-in-dubai-complete-guide-for-investors"
                >
                  properties for sale in Dubai
                </a>
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
                Featured Areas to Buy Property in{" "}
                <span className="text-[var(--primary-color)]">Dubai</span>
              </h2>

              <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                Dubai is a city with numerous superior destinations, each with
                its own buying preference and offering top properties for sale
                in Dubai.
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

        {/* Types of buyers */}
        <section className="w-full py-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* BUYER TYPES */}
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Types of Buyers We{" "}
                <span className="text-[var(--primary-color)]">Serve</span>
              </h2>
              <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                The real estate market in Dubai has a very broad range of buyers
                with varying needs and objectives interested in properties for
                sale in Dubai.
              </p>
            </div>

            {/* Buyer Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {buyers.map((item, i) => {
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

            {/* OFF-PLAN BENEFITS */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                New & Off-Plan Projects in Dubai
              </h3>

              <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-3xl">
                Investment in new projects and off-plan projects in Dubai has
                great benefits for buyers investing in properties for sale in
                Dubai.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Flexible payment plans make investment easier",
                  "Developer-backed projects ensure quality and reliability",
                  "Lower entry prices compared to ready properties",
                ].map((item, i) => (
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

            {/* STEP GUIDE */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-10">
                How to Buy Property in Dubai
              </h3>

              <div className="grid md:grid-cols-5 gap-6">
                {steps.map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full border border-[var(--primary-color)] text-[var(--primary-color)] font-semibold mb-3">
                      {i + 1}
                    </div>
                    <p className="text-md text-gray-700 dark:text-gray-200">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* COSTS */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                Costs Involved When Buying Property in Dubai
              </h3>

              <p className="text-gray-700 dark:text-gray-200 text-sm mb-6">
                In buying property, one must also take into consideration extra
                expenses when purchasing properties for sale in Dubai:{" "}
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {costs.map((item, i) => (
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

              <p className="text-gray-700 dark:text-gray-200 text-sm my-6">
                These costs are useful in improved financial planning.
              </p>
            </div>

            {/* WHY CHOOSE */}
            <div className="mb-20 text-center">
              <h2 className="text-3xl font-semibold mb-6">
                Why Choose{" "}
                <span className="text-[var(--primary-color)]">
                  Mondus Properties
                </span>
              </h2>
              <p className="text-gray-700 dark:text-gray-100 text-sm">
                <a
                  className="text-[var(--primary-color)] font-medium"
                  href="https://www.mondusproperties.ae/"
                >
                  Mondus Properties
                </a>{" "}
                is the right company to rely on when seeking the best Properties
                to purchase in Dubai and top properties for sale in Dubai. We
                provide:
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {whyChoose.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border border-gray-500 dark:border-gray-100 rounded-xl p-5"
                  >
                    <Shield
                      className="text-[var(--primary-color)] mt-1"
                      size={18}
                    />
                    <p className="text-gray-700 dark:text-gray-100 text-sm">
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
                FAQs – Buying Property in{" "}
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
              Luxury Property in Dubai –{" "}
              <span className="text-[var(--primary-color)]">
                Elevate Your Lifestyle
              </span>
            </h3>

            <p className="mt-6 text-gray-700 dark:text-gray-100 leading-relaxed">
              Dubai is also internationally reputed in terms of luxury real
              estate. Beachfront villas and sky-high penthouses make luxury
              properties for sale in Dubai the modern way to live. Live in a
              comfortable and prestigious way, enjoy top-level facilities,
              amazing architecture, and magnificent views.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="mt-8 px-8 py-3 rounded-full border border-[var(--primary-color)] text-sm font-medium transition btn-gradient-hover"
            >
              Start Your Property Search
            </button>
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

export default Buy;
