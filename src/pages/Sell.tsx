import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import PromptConsultation from "../components/PromptConsultation";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TrendingUp,
  BadgePercent,
  Building2,
  Globe,
  CheckCircle2,
  ChevronDown,
  FileText,
} from "lucide-react";

import sellImage from "../assets/buy-hero-img.png";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How much time does it take to sell a property in Dubai?",
    answer:
      "It really depends on various factors such as demand, price, and the type of property. However, with the help of a professional, you can possibly sell your property quicker than the average selling time.",
  },
  {
    question: "What are the costs of selling property in Dubai?",
    answer:
      "The costs are DLD fees, real estate agent's commission, NOC charges, and if there is a mortgage, then mortgage clearance fees.",
  },
  {
    question: "Is it possible to sell a property that has a mortgage on it?",
    answer:
      "It sure is, but you will need to completely pay off the mortgage before the property can be officially transferred to the new owner.",
  },
  {
    question: "How can I find real buyers?",
    answer:
      "Real estate agencies like Mondus Properties have a network of serious, genuinely interested buyers.",
  },
];

const steps = [
  "Assess the listing with a solid market check",
  "Set a price that competes fairly",
  "List it through reliable agents or sites",
  "Show the unit online and in person",
  "Talk over offers until you agree",
  "Sign Form F (MOU) before finalising",
  "Transfer happens at DLD",
];

const documents = [
  "Original title deed or ownership certificate",
  "Passport copy and Emirates ID",
  "No Objection Certificate (NOC) from the developer",
  "Mortgage clearance certificate (if applicable)",
  "Sales agreement / Form F",
  "Utility bills or proof of payment for service charges",
];

const propertyTypes = [
  {
    title: "Sell Apartments in Dubai",
    desc: "Apartments in Dubai are very popular. Young professionals and investors are the main buyers. So, apartments are indeed a good proposition if you are looking for fast returns and want to sell property in Dubai quickly, as the demand is steady.",
  },
  {
    title: "Sell Villas in Dubai",
    desc: "Villas appeal especially to families and affluent buyers who desire large and luxurious homes. Premium properties at the top end of the market tend to create a lot of attention and are prominently seen.",
  },
  {
    title: "Sell Townhouses in Dubai",
    desc: "Privacy and comfort suit middle-income buyers, avoiding high prices. Townhouses offer steady returns without financial strain. Affordability keeps interest constant. Residents favour calm, low-maintenance living. These properties hold value over time.",
  },
  {
    title: "Sell Luxury Property in Dubai",
    desc: "If luxury properties in Dubai are priced strategically, they can sell quickly. Affluent clients desire exclusive homes that boast the best facilities and elevate their status. Typically, such real estate listings bring serious buyers on board fast.",
  },
  {
    title: "Sell Off-Plan Property in Dubai",
    desc: "Investors who are looking forward to value and capital growth are attracted by off-plan properties. These types of developments may have visible price jumps after a certain period. Therefore, buying off-plan in Dubai can be a lucrative choice due to the ever-changing real estate market when you plan to sell property in Dubai.",
  },
];

const whySell = [
  {
    icon: TrendingUp,
    text: "Strong buyer interest makes properties get serious offers quickly.",
  },
  {
    icon: Globe,
    text: "Globally, investors are rushing to Dubai for highest ROI.",
  },
  {
    icon: BadgePercent,
    text: "Tax-free property market with high profits and simple deals.",
  },
  {
    icon: Building2,
    text: "Make profits from present high market prices.",
  },
];

const tips = [
  "Set prices matching current trends at least in theory when you sell property in Dubai.",
  "Keep the property clean and well-maintained",
  "Use professional images for listings",
  "Work with known agents to reach more eyes",
  "This combination brings quicker results and stronger bids without fuss when you sell property in Dubai.",
];

const Sell = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <Helmet>
        <title>Sell Property in Dubai Fast | Get Best Price Today</title>

        <meta
          name="title"
          content="Sell Property in Dubai Fast | Get Best Price Today"
        />
        <meta
          name="description"
          content="Want to sell your property in Dubai? Get expert valuation & quick deals. Call +971521110794 to list your property now."
        />

        <meta
          name="keywords"
          content="sell property dubai, property valuation dubai, list property dubai, real estate agents dubai, sell home dubai"
        />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="canonical" href="https://www.mondusproperties.ae/sell" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.mondusproperties.ae/sell"
        />
        <meta
          property="og:title"
          content="Sell Property in Dubai Fast | Get Best Price Today"
        />
        <meta
          property="og:description"
          content="Want to sell your property in Dubai? Get expert valuation & quick deals. Call +971521110794 to list your property now."
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
          content="Sell Property in Dubai Fast | Get Best Price Today"
        />
        <meta
          name="twitter:description"
          content="Want to sell your property in Dubai? Get expert valuation & quick deals. Call +971521110794 to list your property now."
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

      <div className="bg-white dark:bg-black text-black dark:text-white font-raleway">
        <Navbar />

        {/* Hero Image with Overlay Text */}
        <>
          <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden md:mb-10">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${sellImage})` }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
              <h1 className="md:text-5xl text-3xl font-semibold text-white leading-tight">
                Sell Property in{" "}
                <span className="text-[var(--primary-color)]">Dubai</span>
              </h1>

              <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-3xl">
                Selling properties in Dubai is really simple nowadays. If you
                are one of the investors or the owners who want to sell their
                property, it is the right time because the demand is very high.
                There are still lots of great chances for the sellers who want
                to sell property in Dubai. When you have a team of professionals
                at your side, you can go ahead to sell your property in Dubai
                without any delay and with complete assurance, and most
                importantly, you will get the maximum return on your property
                when you sell property in Dubai.
              </p>
            </div>
          </section>

          <section className="w-full py-16 px-6 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto text-center">
              {/* Heading */}
              <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
                Sell Your Property in Dubai with{" "}
                <span className="text-[var(--primary-color)] bg-clip-text">
                  Mondus Properties
                </span>
              </h2>

              {/* Divider */}
              <div className="w-20 h-1 mx-auto mt-6 bg-[var(--primary-color)] rounded-full" />

              {/* Content */}
              <p className="mt-8 text-gray-700 dark:text-gray-200 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                Selling your property in Dubai can be quite a challenge for a
                variety of reasons when you plan to sell property in Dubai.
                Mondus Properties is here to simplify things for you! Firstly,
                our team of experts is dedicated to helping you sell your
                property quickly by connecting you to only genuine buyers
                looking to sell property in Dubai or invest. Secondly, we also
                offer you very exquisite marketing services. Thirdly, and most
                importantly, we are with you right from start to finish of the
                selling process so as to render it stress-free and really
                enjoyable for you.
              </p>
            </div>
          </section>

          <section className="w-full py-16 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              {/* WHY SELL NOW */}
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Why Sell Property in{" "}
                  <span className="text-[var(--primary-color)]">
                    Dubai Now?
                  </span>
                </h2>

                <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                  The real estate market in Dubai is experiencing a significant
                  surge, which is one of the main reasons why selling your
                  property now would be a smart decision if you want to sell
                  property in Dubai.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {whySell.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-5 border border-gray-200 rounded-xl hover:shadow-md transition"
                    >
                      <div className="p-3 rounded-lg text-[var(--primary-color)]">
                        <Icon size={20} />
                      </div>
                      <p className="text-sm leading-relaxed">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="w-full py-16 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Types of Properties You Can{" "}
                  <span className="text-[var(--primary-color)]">Sell</span>
                </h2>

                <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                  Dubai's real estate market presents a diverse selection of
                  property types that you can put up for sale when you decide to
                  sell property in Dubai. Mondus Properties is capable of
                  assisting you in locating the appropriate buyer regardless of
                  whether you have apartments, villas, townhouses, luxury homes,
                  or even off-plan projects.
                </p>
              </div>

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
              {/* STEP GUIDE */}
              <div className="mb-20">
                <h3 className="text-3xl font-semibold mb-10 text-center">
                  How to Sell Property in Dubai{" "}
                  <span className="text-[var(--primary-color)]">
                    (Step-by-Step Guide)
                  </span>
                </h3>

                <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-6 hidden">
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
                <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
                  <ol className="list-none pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-center space-y-2">
                    <li>
                      Assess the listing with a solid market check when you sell
                      property in Dubai, don't go soft on pricing.
                    </li>{" "}
                    <li>
                      Set a price that competes fairly, not too high, not too
                      low.
                    </li>{" "}
                    <li>
                      Then list it through reliable agents or sites more or less
                      trusted locally to sell property in Dubai.
                    </li>{" "}
                    <li>
                      Show the unit online and in person; reach people across
                      the globe.
                    </li>{" "}
                    <li>
                      Buyers come in fast when you sell property in Dubai.
                    </li>{" "}
                    <li>
                      Talk over offers until you agree on something reasonable.
                    </li>{" "}
                    <li>Sign Form F (MOU) before finalising.</li>{" "}
                    <li>
                      The transfer happens at DLD when both sides confirm
                      ownership while you sell property in Dubai.
                    </li>
                  </ol>
                </section>
              </div>

              {/**HOW IT WORKS */}

              <section className=" mx-auto my-16 text-center font-raleway font-light dark:font-thin">
                <h2 className="text-3xl font-semibold mb-10 text-center capitalize">
                  How It Works
                </h2>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-left">
                  {/* Step 01 - Preparation */}
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md">
                    <div className="text-4xl font-semibold text-[var(--primary-color)] mb-4">
                      01
                    </div>
                    <h3 className="text-xl mb-2">PREPARATION</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We meet either online or in our Dubai office, evaluate the
                      property, and conclude an agreement.
                    </p>
                  </div>

                  {/* Step 02 - Promotion */}
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md">
                    <div className="text-4xl font-semibold text-[var(--primary-color)] mb-4">
                      02
                    </div>
                    <h3 className="text-xl mb-2">PROMOTION</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We capture photos and videos, launch contextual
                      advertising and personalized email newsletters, and
                      publish advertisements on public platforms.
                    </p>
                  </div>

                  {/* Step 03 - Agreement */}
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md">
                    <div className="text-4xl font-semibold text-[var(--primary-color)] mb-4">
                      03
                    </div>
                    <h3 className="text-xl mb-2">AGREEMENT</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We find a buyer and prepare documents, including the
                      purchase and sale agreement, while resolving tax and
                      registration issues.
                    </p>
                  </div>

                  {/* Step 04 - Payment */}
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md">
                    <div className="text-4xl font-semibold text-[var(--primary-color)] mb-4">
                      04
                    </div>
                    <h3 className="text-xl mb-2">PAYMENT</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Upon the successful completion of the transaction, you
                      will receive the payment with the agency commission
                      deducted.
                    </p>
                  </div>
                </div>
              </section>

              {/* PROCESS */}
              <div className="mb-20">
                <h3 className="text-2xl font-semibold mb-6">
                  Selling Property in Dubai Process Explained
                </h3>

                <p className="text-gray-700 dark:text-gray-200 mb-6">
                  The selling process in Dubai is well-defined, although
                  procedural from a legal and documentary perspective when you
                  sell property in Dubai. First of all, the sellers need to
                  prepare the relevant documents such as the title deeds, NOCs,
                  and ID proofs. To attract serious buyers, the property is
                  advertised on various channels. After a buyer's offer has been
                  accepted, a Memorandum of Understanding (Form F) will be
                  signed, and a transfer will take place at the Dubai Land
                  Department.
                </p>
              </div>

              {/* FEES */}
              <div className="mb-20">
                <h3 className="text-2xl font-semibold mb-6">
                  Selling Property in Dubai Fees & Charges
                </h3>

                <p className="text-gray-700 dark:text-gray-200 text-sm mb-6">
                  Selling property in Dubai involves several costs you must
                  account for when you sell property in Dubai. The Dubai Land
                  Department takes a percentage of the sale price. Agency
                  commissions go to the broker managing the transaction. You pay
                  NOC charges to the developer for approval. Mortgage clearance
                  fees appear if there's an active loan on the unit. These
                  expenses stay consistent across listings when you sell
                  property in Dubai.
                </p>
              </div>
              <div className="mb-20">
                <h3 className="text-2xl font-semibold mb-6">
                  How Much is Your Property Worth?
                </h3>

                <p className="text-gray-700 dark:text-gray-200 text-sm mb-6">
                  Are you curious about your property's market value? Get an
                  expert assessment today and see how much you may earn when you
                  sell property in Dubai. <br />
                  <span className="mt-2 inline-block">
                    Get Free Property Valuation @MondusProperties
                  </span>
                </p>
              </div>

              <section className=" mx-auto my-16 text-center font-raleway px-5 font-light dark:font-thin">
                <h2 className="text-3xl font-semibold mb-10 text-center capitalize">
                  Our Work Principles
                </h2>

                <div className="grid gap-8 md:grid-cols-3 text-left">
                  {/* Transparency */}
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
                    <h3 className="text-xl  mb-2">TRANSPARENCY</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Our team will keep you informed at every stage of the
                      deal. We adhere to agreements and discuss all proposals
                      and changes openly.
                    </p>
                  </div>

                  {/* Benefit */}
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
                    <h3 className="text-xl mb-2">BENEFIT</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Having successfully completed thousands of real estate
                      deals in Dubai, we possess a keen understanding of the
                      market, ensuring the best possible outcome for your
                      business.
                    </p>
                  </div>

                  {/* Rapidity */}
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
                    <h3 className="text-xl mb-2">RAPIDITY</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Leveraging the expertise and reputation of our real estate
                      agents in Dubai, we can quickly find buyers for your
                      property.
                    </p>
                  </div>
                </div>
              </section>

              {/* WHY CHOOSE */}
              <div className="mb-20 text-center">
                <h3 className="text-3xl font-semibold mb-6">
                  Why Choose{" "}
                  <span className="text-[var(--primary-color)]">
                    Mondus Properties
                  </span>{" "}
                  to Sell Your Property?
                </h3>

                <div className=" mt-10">
                  <p className="mt-6 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                    Mondus Properties helps sell your property fast with real
                    buyer access when you want to sell property in Dubai. We
                    offer expert pricing so you earn more than others. Marketing
                    hits every portal and social feed. From the first list to
                    the final handover, we guide you through every step when you
                    sell property in Dubai. The whole process moves more quickly
                    and closes smoothly.
                  </p>
                </div>
              </div>

              {/* MARKETING STRATEGY */}
              <div className="mb-20">
                <h3 className="text-3xl font-semibold mb-10 text-center">
                  Sell Your Property in Dubai Faster with Our{" "}
                  <span className="text-[var(--primary-color)]">
                    Marketing Strategy
                  </span>
                </h3>

                <p className="text-gray-700 dark:text-gray-200 mb-10 text-center max-w-4xl mx-auto">
                  Our focused marketing strategy will make selling your property
                  in Dubai a lot easier than you think when you sell property in
                  Dubai. We outline your property's unique features in order to
                  attract qualifying buyers in a short time. We use professional
                  photography to make your home the centre of attention, at the
                  same time, featured listings increase the visibility of your
                  property on the major platforms. Targeted advertisements
                  connect the property with the appropriate audience, both
                  locally and internationally, thereby enhancing the chances of
                  a rapid sale when you sell property in Dubai. In addition to
                  this, your property is not only seen by locals but also by
                  investors from all over the world, thanks to international
                  exposure, which gives you maximum opportunities. Besides that,
                  your Dubai property stands a fair chance of getting its
                  competitive edge, which it so rightly deserves when you sell
                  property in Dubai.
                </p>
              </div>

              {/* DOCUMENTS */}
              <div className="mb-20">
                <h3 className="text-2xl font-semibold mb-6">
                  Documents Required for Selling Property in Dubai
                </h3>

                <p className="text-gray-700 dark:text-gray-200 text-sm mb-6">
                  Ensure you have the following documents ready when you sell
                  property in Dubai:
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {documents.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border border-gray-200 rounded-xl p-5"
                    >
                      <FileText
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

              {/* TIPS */}
              <div className="mb-20">
                <h3 className="text-2xl font-semibold mb-6">
                  Tips to Sell Property in Dubai Quickly
                </h3>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
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
          {/* LIST CTA */}
          <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-neutral-900">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-semibold leading-snug">
                List Your Property{" "}
                <span className="text-[var(--primary-color)]">Today</span>
              </h3>

              <p className="mt-6 text-gray-700 dark:text-gray-100 leading-relaxed">
                Mondus Properties makes selling in Dubai simple. Submit details,
                ask for a call, or schedule a consultation to begin when you
                want to sell property in Dubai. We help with pricing, marketing,
                talks, and legal steps so you hit the market fast and earn
                profit. Don't delay, Dubai's real estate grows every day. With
                our support, you'll close quickly and land top value when you
                sell property in Dubai.
              </p>

              <button
                onClick={() => navigate("/contact")}
                className="mt-8 px-8 py-3 rounded-full border border-[var(--primary-color)] text-sm font-medium transition btn-gradient-hover"
              >
                List Your Property Now
              </button>
            </div>
          </section>
          <PromptConsultation />

          {/* FAQs */}
          <section className="w-full py-16 px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto">
              {/* Heading */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  FAQs – Selling Property in{" "}
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
                            isOpen
                              ? "rotate-180 text-[var(--primary-color)]"
                              : ""
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

          {/* VALUATION CTA */}
          <section className="w-full py-16 px-6 md:px-12 lg:px-20">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-semibold leading-snug">
                How Much is Your{" "}
                <span className="text-[var(--primary-color)]">
                  Property Worth?
                </span>
              </h3>

              <p className="mt-6 text-gray-700 dark:text-gray-100 leading-relaxed">
                Are you curious about your property's market value? Get an
                expert assessment today and see how much you may earn when you
                sell property in Dubai.
              </p>

              <button
                onClick={() => navigate("/contact")}
                className="mt-8 px-8 py-3 rounded-full border border-[var(--primary-color)] text-sm font-medium transition btn-gradient-hover"
              >
                Get Free Property Valuation
              </button>
            </div>
          </section>
        </>
        <Footer />
      </div>
    </>
  );
};

export default Sell;

export function FAQAccordion({ faqs }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq: any, i: number) => (
        <div
          key={i}
          className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
        >
          {/* HEADER */}
          <button
            onClick={() => toggle(i)}
            className="w-full text-left p-4 flex justify-between items-center"
          >
            <h3 className="font-medium">{faq.question}</h3>
            <span className="text-xl">{openIndex === i ? "−" : "+"}</span>
          </button>

          {/* CONTENT */}
          <div
            className={`transition-all duration-300 ease-in-out px-4 ${
              openIndex === i ? "max-h-40 py-2" : "max-h-0"
            } overflow-hidden`}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
