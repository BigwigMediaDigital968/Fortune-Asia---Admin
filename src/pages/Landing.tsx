import { Helmet } from "react-helmet-async";
import AboutSection from "../components/AboutSection";
import AwardsSection from "../components/awards";
import BuyRentSection from "../components/BuyRentSection";
import DeveloperScroll from "../components/DeveloperScroll";
import Exclusives from "../components/Exclusives";
import RealEstateExperts from "../components/expert";
import FaqCtaSection from "../components/Faqctasection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ListProperty from "../components/listproperty";
import Navbar from "../components/Nav";
import NewsSubscribeSection from "../components/NewsLetterSection";
import NotifyMe from "../components/NotifyMe";
import PropertySection from "../components/Propertysection";
import ReviewSection from "../components/review";
import ScrollToTopButton from "../components/ScrollToTopButton";
import WhatWeDoSection from "../components/WhatWeDoSection";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why would you select a real estate company in Dubai that is RERA approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RERA certification ensures transparency, legal compliance, and credibility when dealing with property agents in Dubai. It protects buyers, sellers, and investors by ensuring all transactions follow official real estate regulations.",
      },
    },
    {
      "@type": "Question",
      name: "What are the requirements of the UAE Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Real estate investors can obtain long-term residency if the property value meets the required criteria. Expert property agents at Mondus Properties guide clients through eligibility and the application process.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of off-plan properties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Off-plan properties offer lower prices, flexible payment plans, and strong appreciation potential. Buyers can secure the best units early at competitive rates before project completion.",
      },
    },
    {
      "@type": "Question",
      name: "What types of properties can I invest in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai offers ready-to-move properties, off-plan developments, residential apartments, luxury villas, and commercial spaces suitable for different investment goals.",
      },
    },
    {
      "@type": "Question",
      name: "What is the expected return on investment in Dubai real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Investors can expect around 8–14% annual returns through rental income and capital appreciation, depending on property type and location such as Downtown Dubai, Dubai Marina, and JVC.",
      },
    },
  ],
};

export const Landing = () => {
  return (
    <>
      <Helmet>
        <title>
          Real Estate Company in Dubai | Buy, Sell & Rent Properties | Mondus
          Properties
        </title>

        <meta
          name="title"
          content="Real Estate Company in Dubai | Buy, Sell & Rent Properties | Mondus Properties"
        />
        <meta
          name="description"
          content="Looking for a trusted real estate company in Dubai? Buy, sell or rent premium apartments, villas & off-plan properties with Mondus Properties. Call +971521110794 today."
        />

        <meta
          name="keywords"
          content="real estate company in dubai, dubai properties, buy property dubai, rent property dubai, sell property dubai, dubai real estate agency, off plan properties dubai, luxury villas dubai"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="Mondus Properties" />

        <link rel="canonical" href="https://www.mondusproperties.ae/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mondusproperties.ae/" />
        <meta
          property="og:title"
          content="Real Estate Company in Dubai | Buy, Sell & Rent Properties | Mondus Properties"
        />
        <meta
          property="og:description"
          content="Buy, sell or rent premium apartments, villas & off-plan properties in Dubai with expert guidance from Mondus Properties."
        />
        <meta
          property="og:image"
          content="https://cdn.dxbproperties.ae/media/blog/off_plan_property_image.webp"
        />
        <meta property="og:site_name" content="Mondus Properties" />
        <meta property="og:locale" content="en_AE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.mondusproperties.ae/" />
        <meta
          name="twitter:title"
          content="Real Estate Company in Dubai | Mondus Properties"
        />
        <meta
          name="twitter:description"
          content="Explore Dubai properties. Buy, sell or rent apartments, villas & off-plan investments with Mondus Properties."
        />
        <meta
          name="twitter:image"
          content="https://cdn.dxbproperties.ae/media/blog/off_plan_property_image.webp"
        />

        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />

        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div>
        <Navbar />
        <Hero />
        <RealEstateExperts />
        <PropertySection />
        <BuyRentSection />
        <Exclusives />
        <AboutSection />
        <WhatWeDoSection />
        <ListProperty />
        <DeveloperScroll />
        <AwardsSection />
        <ReviewSection />
        <FaqCtaSection />
        <NotifyMe />
        <NewsSubscribeSection />
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};
