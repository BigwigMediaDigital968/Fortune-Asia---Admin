import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import NotifyMe from "../components/NotifyMe";
import { Helmet } from "react-helmet-async";

function Contact() {
  return (
    <>
      <Helmet>
        <title>
          Contact Real Estate Company in Dubai | Call Mondus Properties
        </title>

        <meta
          name="title"
          content="Contact Real Estate Company in Dubai | Call Mondus Properties"
        />
        <meta
          name="description"
          content="Get in touch with Mondus Properties for buying, selling or renting in Dubai. Call +971521110794 or visit us today."
        />

        <meta
          name="keywords"
          content="contact real estate dubai, dubai property agents contact, real estate office dubai, property consultation dubai"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="canonical" href="https://www.mondusproperties.ae/contact" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.mondusproperties.ae/contact"
        />
        <meta
          property="og:title"
          content="Contact Real Estate Company in Dubai | Call Mondus Properties"
        />
        <meta
          property="og:description"
          content="Get in touch with Mondus Properties for buying, selling or renting in Dubai. Call +971521110794 or visit us today."
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
          content="https://www.mondusproperties.ae/contact"
        />
        <meta
          name="twitter:title"
          content="Contact Real Estate Company in Dubai | Call Mondus Properties"
        />
        <meta
          name="twitter:description"
          content="Get in touch with Mondus Properties for buying, selling or renting in Dubai. Call +971521110794 or visit us today."
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

      <div>
        <Navbar />
        <section className="bg-white dark:bg-black text-black dark:text-white py-24 px-6 mt-10">
          <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-12 items-center font-raleway font-light dark:font-thin">
            {/* Left: Contact Info */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl mb-6 relative inline-block after:content-[''] after:block after:h-1 after:w-20 after:mt-2 after:bg-[var(--primary-color)]">
                Let's Connect
              </h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-10">
                We’d love to hear from you. Reach out and let’s start a
                conversation.
              </p>

              <div className="space-y-6 font-light">
                <ContactItem
                  icon={<Phone />}
                  label="Call us"
                  content="+971 521110794"
                  href="tel:+971521110794"
                />
                <ContactItem
                  icon={<Mail />}
                  label="Email us"
                  content="info@mondusproperties.ae"
                  href="mailto:info@mondusproperties.ae"
                />
                <ContactItem
                  icon={<MapPin />}
                  label="Office"
                  content="Stadium point tower - 305 office number - AI Hebiah Fourth - Dubai Sports City - Dubai"
                  href="https://www.google.com/maps/search/?api=1&query=Mondus+Group+Iris+Bay+2402+Business+Bay+Dubai"
                />

                <ContactItem
                  icon={<Clock />}
                  label="Working Hours"
                  content="Mon - Fri: 9:00 AM - 6:00 PM"
                />
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex-1 flex justify-center">
              <img
                src="https://images.squarespace-cdn.com/content/v1/6048e88f29a3c733e02afa4f/1616079667915-Z9ECTJF2V83YIHPHM13T/thumbnail_IMG_8335.jpeg?format=750w"
                alt="Contact Us"
                className="w-full max-w-sm h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>
        <NotifyMe />
        <Footer />
      </div>
    </>
  );
}

type ContactItemProps = {
  icon: React.ReactNode;
  label: string;
  content: string;
  href?: string;
};

const ContactItem = ({ icon, label, content, href }: ContactItemProps) => {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={`flex items-center gap-4 ${href ? "cursor-pointer" : ""}`}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="p-4 bg-[var(--primary-color)] text-white rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-lg font-medium">{content}</p>
      </div>
    </Wrapper>
  );
};

export default Contact;
