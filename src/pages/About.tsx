import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import image1 from "../assets/1.png";
import image2 from "../assets/diksha-mondus.png";
import image3 from "../assets/muskaan-mondus.png";
import NotifyMe from "../components/NotifyMe";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Trusted Real Estate Company in Dubai | Mondus Properties</title>

        <meta
          name="title"
          content="Trusted Real Estate Company in Dubai | Mondus Properties"
        />
        <meta
          name="description"
          content="Learn about Mondus Properties, a trusted real estate company in Dubai helping clients buy, sell & rent properties. Call +971521110794 today."
        />

        <meta
          name="keywords"
          content="real estate company dubai, dubai real estate agency, property consultants dubai, real estate experts dubai"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="canonical" href="https://www.mondusproperties.ae/about" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.mondusproperties.ae/about"
        />
        <meta
          property="og:title"
          content="Trusted Real Estate Company in Dubai | Mondus Properties"
        />
        <meta
          property="og:description"
          content="Learn about Mondus Properties, a trusted real estate company in Dubai helping clients buy, sell & rent properties. Call +971521110794 today."
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
          content="https://www.mondusproperties.ae/about"
        />
        <meta
          name="twitter:title"
          content="Trusted Real Estate Company in Dubai | Mondus Properties"
        />
        <meta
          name="twitter:description"
          content="Learn about Mondus Properties, a trusted real estate company in Dubai helping clients buy, sell & rent properties. Call +971521110794 today."
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
        <section className="relative h-[50vh] md:h-[100vh] w-full">
          <img
            src="https://www.axcapital.ae/_ipx/s_1920x960/img/intro/offplan.webp"
            alt="About"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70 flex flex-col items-center justify-end py-5 text-center px-4">
            <h1 className="text-4xl md:text-5xl text-white mb-4">
              ABOUT MONDUS
            </h1>
            <p className="text-lg md:text-2xl text-white">
              Smart property solutions. Real relationships.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin py-16">
          <div className="w-11/12 md:w-5/6 px-5 mx-auto space-y-16">
            {/* Chairman Section */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={image1} // Replace with actual image URL
                  alt="Chairman Sandeep Chachra"
                  className="w-full h-[400px]  object-contain"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-2">
                  Chairman & Founder
                </h3>
                <h4 className="text-xl font-medium mb-4 text-[var(--primary-color)]">
                  Sandeep Chachra
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Sandeep Chachra brings over two decades of experience across
                  hospitality and real estate. Starting his career in
                  client-focused hospitality roles, he developed a strong
                  foundation in service and operations. He later established a
                  successful real estate brokerage in India, building a diverse
                  portfolio through hands-on market engagement. His move to
                  Dubai was driven by a vision to offer transparent and
                  growth-oriented property solutions. As the founder of Mondus
                  Properties, Sandeep leads with integrity and a deep
                  understanding of real estate in Dubai, helping clients find
                  the right investment property in Dubai at the right time.
                </p>
              </div>
            </div>

            {/* Managing Director Section */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              {/* Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={image2} // Replace with actual image URL
                  alt="Managing Director Diksha Khatri"
                  className="w-full h-[400px]  object-contain"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-2">
                  Managing Director
                </h3>
                <h4 className="text-xl font-medium mb-4 text-[var(--primary-color)]">
                  Diksha Khatri
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As the Co-Founder and Managing Director of Mondus Properties,
                  Diksha Khatri brings a sharp business sense shaped by her
                  background in both hospitality and real estate. Her focus on
                  data-driven decision-making and client-first service has
                  helped position Mondus Properties as a trusted player in
                  Dubai's property market. With an eye for identifying the right
                  investment opportunities in Dubai, Diksha continues to lead
                  the firm with clarity, commitment, and a vision for
                  sustainable growth.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={image3} // Replace with actual image URL
                  alt="Chairman Sandeep Chachra"
                  className="w-full h-[400px] object-contain"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-2">CEO</h3>
                <h4 className="text-xl font-medium mb-4 text-[var(--primary-color)]">
                  Muskaan
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As the CEO of Mondus Properties, Muskaan brings an
                  unconventional yet highly effective leadership style shaped by
                  his journey as a popular YouTuber and influencer. His bold
                  presence and authenticity translate into a dynamic and
                  forward-thinking approach to real estate. With a strong and
                  growing focus on the Dubai property market, he seamlessly
                  blends influence with strategic vision to drive the company’s
                  expansion. Muskaan’s resilience and ability to perform under
                  pressure position him as a powerful leader in navigating
                  Dubai’s highly competitive real estate landscape.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin py-16">
          <div className="w-11/12 md:w-5/6 px-5 mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE: About Content */}
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Mondus Properties is your trusted guide in the UAE real estate
                market. As an upcoming agency and investment advisor in Dubai,
                we’re committed to helping clients discover ideal options for
                buying, renting, or investing.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our extensive real estate collection features some of Dubai’s
                most desirable properties, giving clients access to abodes
                placed in the most sought-out locations across Dubai.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Whether you’re a first-time buyer, an experienced investor, or
                searching for your dream home, we are here to walk you through
                every step of the way — making the experience effortless.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                With a dedicated team of experts, we prioritize transparency,
                trust, and personalized service. Our knowledge of the Dubai
                market ensures that you’ll make informed, strategic decisions.
              </p>
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Let us help you turn your{" "}
                <span className="text-[var(--primary-color)]">DREAM HOME</span>{" "}
                INTO A REALITY.
              </h3>
            </div>

            {/* RIGHT SIDE: Visual/Highlights */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80"
                alt="Luxury Property"
                className="h-full w-full object-cover"
              />
              {/* <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-6 text-white text-center">
              <h4 className="text-2xl font-bold mb-6">Why Choose Us?</h4>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-2">
                  <span>✔</span>
                  <span>Trusted UAE Real Estate Experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✔</span>
                  <span>Transparent, Personalized Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✔</span>
                  <span>Access to Prime Dubai Properties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✔</span>
                  <span>Guidance from Start to Finish</span>
                </li>
              </ul>
            </div> */}
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin py-16">
          <div className="w-11/12 md:w-5/6 px-5 mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-black dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Comprehensive support for buyers, investors, and property owners
              in Dubai
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-11/12 md:w-5/6 mx-auto">
            {/* Service Card 1 */}
            <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl text-black dark:text-white mb-3">
                Consulting
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Expert advice for buying, selling, or investing in Dubai real
                estate.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl text-black dark:text-white mb-3">
                Property Selection & Viewing
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Tailored searches and virtual tours from top developers.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl text-black dark:text-white mb-3">
                Deal Support
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Help with documentation, negotiation, and mortgage coordination.
              </p>
            </div>

            {/* Service Card 4 */}
            <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl text-black dark:text-white mb-3">
                After-Sales Service
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Support with insurance, utilities, and move-in essentials.
              </p>
            </div>

            {/* Service Card 5 */}
            <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl text-black dark:text-white mb-3">
                Property Management
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Short and long-term rental management with complete care.
              </p>
            </div>

            {/* Service Card 6 */}
            <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow-md">
              <h3 className="text-xl text-black dark:text-white mb-3">
                Relocation Assistance
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Support for local setup, residency, and visas for hassle-free
                relocation.
              </p>
            </div>
          </div>
        </section>

        <NotifyMe />
        <Footer />
      </div>
    </>
  );
};

export default About;
