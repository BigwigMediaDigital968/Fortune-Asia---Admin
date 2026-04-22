import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import SendResume from "../components/SendResume";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// 👇 Define the shape of a job opportunity
interface Opportunity {
  title: string;
  postedAt: string;
  description: string;
  location?: string;
  type?: string;
}

const Career = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/opportunity`)
      .then((res) => setOpportunities(res.data))
      .catch((err) => console.error("Failed to fetch opportunities", err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Real Estate Jobs in Dubai | Join Mondus Properties</title>

        <meta
          name="title"
          content="Real Estate Jobs in Dubai | Join Mondus Properties"
        />
        <meta
          name="description"
          content="Looking for real estate jobs in Dubai? Join Mondus Properties & grow your career. Apply now or call +971521110794."
        />

        <meta
          name="keywords"
          content="real estate jobs dubai, property jobs dubai, dubai real estate careers, sales jobs dubai property"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="canonical" href="https://www.mondusproperties.ae/careers" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.mondusproperties.ae/careers"
        />
        <meta
          property="og:title"
          content="Real Estate Jobs in Dubai | Join Mondus Properties"
        />
        <meta
          property="og:description"
          content="Looking for real estate jobs in Dubai? Join Mondus Properties & grow your career. Apply now or call +971521110794."
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
          content="https://www.mondusproperties.ae/careers"
        />
        <meta
          name="twitter:title"
          content="Real Estate Jobs in Dubai | Join Mondus Properties"
        />
        <meta
          name="twitter:description"
          content="Looking for real estate jobs in Dubai? Join Mondus Properties & grow your career. Apply now or call +971521110794."
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

        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[100vh] w-full">
          <img
            src="https://www.axcapital.ae/_ipx/s_1920x960/img/careers/careers-banner.webp"
            alt="Career"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70 flex flex-col items-center justify-end py-5 text-center px-4">
            <h1 className="text-4xl md:text-6xl text-white mb-4">CAREERS</h1>
          </div>
        </section>

        {/* Intro Section */}
        <section className="w-full md:w-[90%] mx-auto px-4 py-12">
          <div>
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <h2 className="text-3xl md:text-4xl">
                Join a Leading Real Estate Company in Dubai
              </h2>
              <p className="text-sm md:text-base leading-relaxed">
                If you're looking to grow with a top real estate company in
                Dubai that values innovation, design, and client satisfaction,
                Mondus Properties welcomes you. As a trusted name in Dubai real
                estate, we handle premium projects in Dubai Creek Harbour, Palm
                Jumeirah, Dubai Hills Estates, and beyond. Join the team that's
                reshaping how people explore luxury homes and premium apartments
                across Dubai and the UAE.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-full w-full">
                <img
                  src="https://www.axcapital.ae/img/careers/build-career01.webp"
                  alt="Mondus Properties Career"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://www.axcapital.ae/img/careers/build-career02.webp"
                  alt="Career at Mondus"
                  className="w-full h-full object-cover"
                />
                <img
                  src="https://www.axcapital.ae/img/careers/build-career03.webp"
                  alt="Mondus Properties Team"
                  className="w-full h-full object-cover"
                />
                <img
                  src="https://www.axcapital.ae/img/careers/build-career03.webp"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover"
                />
                <img
                  src="https://www.axcapital.ae/img/careers/build-career02.webp"
                  alt="Work at Mondus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full md:w-[90%] mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-4">
                Let’s Build Dubai’s Real Estate Future Together
              </h2>
              <p className="text-sm md:text-base leading-relaxed">
                Help clients sell smarter and match them with ideal properties.
                You’ll be shaping lives and building futures. If you're ready to
                grow with one of the UAE’s leading real estate companies, apply
                now and make your mark.
              </p>
            </div>

            <div>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-semibold">Mondus Properties</span> is
                always interested in motivated people on its team. Send your CV
                and we will contact you if we find a suitable position.
              </p>
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="w-full md:w-[90%] mx-auto px-4 py-10 font-raleway">
          <h1 className="text-3xl mb-4">OPPORTUNITIES</h1>

          {opportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunities.map((job, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {job.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(job.postedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap text-sm text-gray-600 dark:text-gray-400 gap-4">
                    {job.location && <span>📍 {job.location}</span>}
                    {job.type && <span>🕒 {job.type}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-neutral-900">
              <h2 className="text-2xl mb-2 font-semibold">
                No Job Openings Currently
              </h2>
              <p className="text-sm">
                We're not hiring at the moment, but we're always open to talent.
                <br />
                Please check back later or send your resume to keep in touch!
              </p>
            </div>
          )}
        </section>

        <SendResume />
        <Footer />
      </div>
    </>
  );
};

export default Career;
