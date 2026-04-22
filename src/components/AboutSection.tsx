// "use client";

// import { useState } from "react";

// export default function AboutSection() {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <section className="bg-white dark:bg-black text-black dark:text-white px-4 py-12 md:py-20 flex justify-center relative overflow-hidden  font-raleway font-light dark:font-thin custom-gradient-lines">
//       <div className="p-[1px] bg-gradient-to-r from-[var(--primary-color)] via-black to-[var(--primary-color)] max-w-7xl w-full">
//         <div className="bg-white dark:bg-black p-6 md:p-12 ">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-[var(--primary-color)] mb-6">
//             MONDUS PROPERTIES – A REAL ESTATE AGENCY IN DUBAI
//           </h2>

//           <p className="text-sm md:text-base mb-6 text-justify">
//             MONDUS PROPERTIES is a professional real estate agency involved in
//             sale and rent of properties in Dubai, UAE. We process our clients’
//             requests promptly in a CRM system, so all your questions will be
//             answered timeously. Our competent team members are always available
//             and are happy to consult with you on property selection at any time.
//           </p>

//           <p className="text-sm md:text-base  mb-6 text-justify">
//             Our team is comprised of experts of over 40 nationalities,
//             collectively speaking 10+ languages, allowing us to communicate with
//             clients, understand their needs, and respond to any requests. With
//             over 150+ real estate professionals on our team, we are passionate
//             about improving our professional skills.
//           </p>

//           {/* Read More / See Less Button */}
//           {!expanded ? (
//             <button
//               onClick={() => setExpanded(true)}
//               className="text-[var(--primary-color)] text-sm tracking-wide inline-block border-b border-[var(--primary-color)] pt-2"
//             >
//               READ MORE
//             </button>
//           ) : (
//             <>
//               {/* Expanded Content */}
//               <div className="mt-6 space-y-4 text-sm md:text-base ">
//                 <p>
//                   Our database is constantly being updated and includes over
//                   8,000 properties, allowing our customers to choose a home to
//                   their taste in any of the emirates. Permanent partners of the
//                   real estate agency MONDUS PROPERTIES include over 100 trusted
//                   developers.
//                 </p>
//                 <p>
//                   We offer our clients off-plan properties in Dubai, as well as
//                   homes in popular development projects that already have an
//                   excellent reputation. In the year 2022 alone, our team members
//                   closed 1000 successful deals with over 700 clients.
//                 </p>
//                 <p>
//                   Information technology is only just emerging in the Dubai real
//                   estate market but we are actively investing in developing
//                   in-house IT solutions, such as:
//                 </p>
//                 <ul className="list-disc list-inside ml-4">
//                   <li>Innovative property sales platforms</li>
//                   <li>CRM systems for brokers and developers</li>
//                   <li>New VR and AR solutions for property marketing</li>
//                 </ul>
//                 <p>
//                   These new tools equip us to find the best bargains and allow
//                   us to offer them to our customers.
//                 </p>

//                 <h3 className="text-[var(--primary-color)] font-semibold mt-4">
//                   Investment
//                 </h3>
//                 <p>
//                   Buy-to-live and buy-to-rent properties, as well as vacation
//                   homes in the UAE generate a high stable income. The return on
//                   investment in some of Dubai’s most in-demand communities can
//                   exceed 10% per annum, which is higher than the average ROI in
//                   European and other global property markets. Additionally, the
//                   UAE Government guarantees that the closed deals are legal and
//                   transparent.
//                 </p>

//                 <h3 className="text-[var(--primary-color)] font-semibold mt-4">
//                   Real estate agency services in Dubai, UAE
//                 </h3>
//                 <p>
//                   Are you thinking of buying a property through a real estate
//                   agency in Dubai? We have extensive experience of working in
//                   the Emirates and insider knowledge of the UAE’s real estate
//                   market. Our luxury real estate agency offers a comprehensive
//                   range of services, which include:
//                 </p>
//                 <ul className="list-disc list-inside ml-4">
//                   <li>
//                     A selection of investment properties that meet customers’
//                     personal requirements and preferences
//                   </li>
//                   <li>
//                     Purchase, rent, and sale transactions of residential,
//                     retail, and office properties, remotely or in person, with
//                     the customer present
//                   </li>
//                   <li>
//                     The after-sales maintenance and management of residential
//                     and commercial properties
//                   </li>
//                   <li>
//                     Legal advice from highly competent professional lawyers
//                   </li>
//                   <li>
//                     Assistance with opening a bank account in the UAE and
//                     consultations on procuring other financial documents
//                   </li>
//                 </ul>

//                 <h3 className="text-[var(--primary-color)] font-semibold mt-4">
//                   Buying property through an agency in Dubai
//                 </h3>
//                 <p>
//                   The high demand in the housing market boosts the prices of
//                   villas and apartments in Dubai. Our agency has access to the
//                   current information provided by the UAE public authorities and
//                   developers.
//                 </p>
//                 <p>
//                   You can purchase a premium villa, apartment, or townhouse
//                   today. We will guide you to discover the best options of
//                   buy-to-rent, buy-to-live, and vacation homes amidst a
//                   multitude of listings. All you need to do is simply fill out
//                   an online request and professionals from the upscale real
//                   estate agency, MONDUS PROPERTIES, will contact you at any time
//                   convenient for you.
//                 </p>
//               </div>

//               {/* See Less Button */}
//               <div className="mt-6">
//                 <button
//                   onClick={() => setExpanded(false)}
//                   className="text-[var(--primary-color)] text-sm tracking-wide inline-block border-b border-[var(--primary-color)] pt-2"
//                 >
//                   SEE LESS
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import {
  FaBuilding,
  FaGlobe,
  FaUsers,
  FaHandshake,
  FaChartLine,
  FaHome,
} from "react-icons/fa";

export default function AboutSection() {
  return (
    <section className="bg-white dark:bg-black text-black dark:text-white px-6 py-12 md:py-20 flex justify-center relative overflow-hidden font-raleway font-light dark:font-thin">
      <div className="max-w-7xl w-full">
        {/* ── Heading ── */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black dark:text-white mb-6 leading-[1.2]">
          About{" "}
          <span
            className="underline decoration-2"
            style={{ textDecorationColor: "var(--primary-color)" }}
          >
            Mondus Properties
          </span>{" "}
          – A Trusted Real Estate Company in Dubai
        </h2>

        {/* ── Intro paragraphs ── */}
        <p className="text-sm md:text-base mb-5 text-justify leading-relaxed">
          Mondus Properties is committed to assisting customers in purchasing,
          renting and investing in Dubai property. Being the best real estate
          company in Dubai, we integrate global experience, local market
          intelligence and a group of qualified professional property agents in
          Dubai to provide credible, hassle free property services.
        </p>

        <p className="text-sm md:text-base font-semibold mb-5 text-justify leading-relaxed">
          As a trusted Real Estate Company in Dubai UAE, our mission is to
          deliver exceptional value, transparency, and long-term relationships
          with our clients worldwide.
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 text-center justify-between gap-6 py-10">
          <div>
            <FaBuilding className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
            <h3 className="text-2xl font-sans"> 8,000+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-2 whitespace-pre-wrap">
              {"Verified Listings \n Across Dubai"}
            </p>
          </div>
          <div>
            <FaGlobe className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
            <h3 className="text-2xl font-sans">10+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-2 whitespace-pre-wrap">
              {"Languages Spoken for \n Global Clients"}
            </p>
          </div>
          <div>
            <FaUsers className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
            <h3 className="text-2xl font-sans">150+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-2 whitespace-pre-wrap">
              {"Dedicated Property \n Advisors"}
            </p>
          </div>
          <div>
            <FaHandshake className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
            <h3 className="text-2xl font-sans">1200+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-2 whitespace-pre-wrap">
              {"Properties Successfully \n Sold"}
            </p>
          </div>
          <div>
            <FaHome className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
            <h3 className="text-2xl font-sans">3500+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-2 whitespace-pre-wrap">
              {"Active Rental \n Listings"}
            </p>
          </div>
          <div>
            <FaChartLine className="text-2xl mb-2 mx-auto text-[var(--primary-color)]" />
            <h3 className="text-2xl font-sans">7B+ AED</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200 mt-2 whitespace-pre-wrap">
              {"Real Estate \n Portfolio Value"}
            </p>
          </div>
        </div>

        {/* ── Read More / Expanded content ── */}
        {/* <div className="mt-8">
          {!expanded ? (
            <button
              onClick={() => setExpanded(true)}
              className="text-[var(--primary-color)] text-sm tracking-widest uppercase inline-block border-b border-[var(--primary-color)] pb-0.5"
            >
              Read More
            </button>
          ) : (
            <>
              <div className="space-y-4 text-sm md:text-base text-justify leading-relaxed">
                <p>
                  MONDUS PROPERTIES is a professional real estate agency
                  involved in sale and rent of properties in Dubai, UAE. We
                  process our clients' requests promptly in a CRM system, so all
                  your questions will be answered timeously. Our competent team
                  members are always available and are happy to consult with you
                  on property selection at any time.
                </p>
                <p>
                  Our team is comprised of experts of over 40 nationalities,
                  collectively speaking 10+ languages, allowing us to
                  communicate with clients, understand their needs, and respond
                  to any requests. With over 150+ real estate professionals on
                  our team, we are passionate about improving our professional
                  skills.
                </p>
                <p>
                  Our database is constantly being updated and includes over
                  8,000 properties, allowing our customers to choose a home to
                  their taste in any of the emirates. Permanent partners of the
                  real estate agency MONDUS PROPERTIES include over 100 trusted
                  developers.
                </p>
                <p>
                  We offer our clients off-plan properties in Dubai, as well as
                  homes in popular development projects that already have an
                  excellent reputation. In the year 2022 alone, our team members
                  closed 1000 successful deals with over 700 clients.
                </p>
                <p>
                  Information technology is only just emerging in the Dubai real
                  estate market but we are actively investing in developing
                  in-house IT solutions, such as:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Innovative property sales platforms</li>
                  <li>CRM systems for brokers and developers</li>
                  <li>New VR and AR solutions for property marketing</li>
                </ul>

                <h3
                  className="font-semibold mt-4"
                  style={{ color: "var(--primary-color)" }}
                >
                  Investment
                </h3>
                <p>
                  Buy-to-live and buy-to-rent properties, as well as vacation
                  homes in the UAE generate a high stable income. The return on
                  investment in some of Dubai's most in-demand communities can
                  exceed 10% per annum, which is higher than the average ROI in
                  European and other global property markets. Additionally, the
                  UAE Government guarantees that the closed deals are legal and
                  transparent.
                </p>

                <h3
                  className="font-semibold mt-4"
                  style={{ color: "var(--primary-color)" }}
                >
                  Real estate agency services in Dubai, UAE
                </h3>
                <p>
                  Are you thinking of buying a property through a real estate
                  agency in Dubai? We have extensive experience of working in
                  the Emirates and insider knowledge of the UAE's real estate
                  market. Our luxury real estate agency offers a comprehensive
                  range of services, which include:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    A selection of investment properties that meet customers'
                    personal requirements and preferences
                  </li>
                  <li>
                    Purchase, rent, and sale transactions of residential,
                    retail, and office properties, remotely or in person
                  </li>
                  <li>
                    The after-sales maintenance and management of residential
                    and commercial properties
                  </li>
                  <li>
                    Legal advice from highly competent professional lawyers
                  </li>
                  <li>
                    Assistance with opening a bank account in the UAE and
                    consultations on procuring other financial documents
                  </li>
                </ul>

                <h3
                  className="font-semibold mt-4"
                  style={{ color: "var(--primary-color)" }}
                >
                  Buying property through an agency in Dubai
                </h3>
                <p>
                  The high demand in the housing market boosts the prices of
                  villas and apartments in Dubai. Our agency has access to the
                  current information provided by the UAE public authorities and
                  developers.
                </p>
                <p>
                  You can purchase a premium villa, apartment, or townhouse
                  today. We will guide you to discover the best options of
                  buy-to-rent, buy-to-live, and vacation homes amidst a
                  multitude of listings. All you need to do is simply fill out
                  an online request and professionals from MONDUS PROPERTIES
                  will contact you at any time convenient for you.
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setExpanded(false)}
                  className="text-[var(--primary-color)] text-sm tracking-widest uppercase inline-block border-b border-[var(--primary-color)] pb-0.5"
                >
                  See Less
                </button>
              </div>
            </>
          )}
        </div> */}
      </div>
    </section>
  );
}
