// import React from "react";
// import { Building2, Home, KeyRound } from "lucide-react"; // Lucide icons (or use any icon set)

// type Service = {
//   icon: React.ReactNode;
//   label: string;
//   title: string;
//   description: string;
//   redirected: string;
// };

// const services: Service[] = [
//   {
//     icon: <Building2 size={32} className="text-[#9C623E]" />,
//     label: "Offplan Properties",
//     title: "Offplan Properties",
//     description:
//       "Off-plan properties in Dubai are ideal for buyers and investors wanting lower entry prices and flexible payment options. These properties are purchased before completion, offering the potential for higher returns. With the right support, you can explore trusted developments and secure investment properties tailored to your goals.",
//     redirected: "/offplan",
//   },
//   {
//     icon: <Home size={32} className="text-[#9C623E]" />,
//     label: "Ready Properties",
//     title: "Ready Properties",
//     description:
//       "Ready properties allow for instant viewing, faster handover, and a hassle-free buying experience. If you're looking for a home in Dubai for sale, these options offer convenience and certainty. Our team ensures a smooth process so you can settle in quickly, without construction delays or wait times.",
//     redirected: "/buy",
//   },
//   {
//     icon: <KeyRound size={32} className="text-[#9C623E]" />,
//     label: "Rental Properties",
//     title: "Rental Properties",
//     description:
//       "Rental properties in Dubai UAE offer flexibility for short-term or long-term needs. Our listings include a wide range of rental properties in Dubai UAE, offering the flexibility to suit your lifestyle, budget, and future plans. Apartments, villas, and serviced units are all available with expert guidance to help you find the perfect fit.",
//     redirected: "/rent",
//   },
// ];

// const WhatWeDoSection: React.FC = () => {
//   return (
//     <div className="bg-white dark:bg-black text-black dark:text-white font-raleway custom-gradient-lines relative">
//       <section className="max-w-7xl px-6 py-16 mx-auto">
//         <div className="mb-6">
//           <p className="text-md mb-2 tracking-wider text-[#9C623E] font-semibold uppercase">
//             Our Services
//           </p>
//           <h2 className="text-2xl md:text-3xl font-light text-black dark:text-gray-100">
//             Buy Your Ideal Property in Dubai with Trusted Experts
//           </h2>
//         </div>

//         <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
//           {services.map((service, idx) => (
//             <a
//               href={service.redirected}
//               key={idx}
//               className="group bg-gray-100 dark:bg-zinc-900 hover:shadow-xl rounded-xl p-6 transition duration-300 flex flex-col space-y-4 md:space-y-6 hover:scale-[1.02]"
//             >
//               <div className="flex items-center space-x-4">
//                 <div className="flex-shrink-0">{service.icon}</div>
//                 <h3 className="text-lg font-semibold">{service.title}</h3>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//                 {service.description}
//               </p>
//             </a>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default WhatWeDoSection;

"use client";

import React from "react";
import {
  Building2,
  Home,
  KeyRound,
  ShieldCheck,
  Users,
  Handshake,
  Globe,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";

type Service = {
  icon: React.ReactNode;
  label: string;
  title: string;
  subtitle: string;
  bullets: string[];
  body: string[];
  redirected: string;
};

const services: Service[] = [
  {
    icon: <Building2 size={28} />,
    label: "Off-Plan",
    title: "High-Return Off-Plan Properties in Dubai",
    subtitle: "Invest early. Gain more.",
    bullets: [
      "Reduced investment cost and easy payment plans",
      "Strong appreciation potential as projects complete",
      "First access to high-quality premium developments",
    ],
    body: [
      "Investing in off-plan projects with Mondus Properties ensures early access to premium developments and higher capital appreciation.",
      "Guided by one of Dubai's leading real estate firms and qualified Dubai property agents.",
    ],
    redirected: "/offplan",
  },
  {
    icon: <Home size={28} />,
    label: "Ready to Move",
    title: "Ready-to-Move Properties in Dubai for You",
    subtitle: "Move in today. Earn from day one.",
    bullets: [],
    body: [
      "For customers who want instant occupancy or rental revenue, Mondus Properties can suggest apartments and villas that are ready to move into with the best locations.",
      "These properties are ideal for buyers looking for immediate returns or relocation, supported by our expert Property Agent in Dubai.",
      "Have a hassle-free experience transacting with the greatest real estate company in Dubai UAE.",
    ],
    redirected: "/buy",
  },
  {
    icon: <KeyRound size={28} />,
    label: "Rental",
    title: "Rental Properties in Dubai for Every Lifestyle",
    subtitle: "Affordable to luxury — your choice.",
    bullets: [],
    body: [
      "Choose from affordable apartments to luxury villas in Dubai. Mondus Properties provides rental options for every lifestyle.",
      "Our verified listings and expert property agents in Dubai make it easy to find your ideal home.",
      "As the best real estate company in Dubai, we ensure all rental properties are verified, well-located, and aligned with your lifestyle needs.",
    ],
    redirected: "/rent",
  },
];

const whyPoints = [
  {
    icon: <ShieldCheck size={20} />,
    title: "RERA Authorised",
    desc: "100% legal, trustworthy and transparent advisors.",
  },
  {
    icon: <Users size={20} />,
    title: "Experienced Personnel",
    desc: "Both local and international real estate professionals.",
  },
  {
    icon: <Handshake size={20} />,
    title: "Powerful Developer Relationships",
    desc: "Partnerships with Emaar, DAMAC, Nakheel, Meraas & Dubai Properties.",
  },
  {
    icon: <Globe size={20} />,
    title: "Global Clients",
    desc: "Serving investors and buyers worldwide.",
  },
  {
    icon: <LayoutGrid size={20} />,
    title: "Diverse Portfolio",
    desc: "Luxury homes, investment assets and rentals.",
  },
];

const WhatWeDoSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-raleway relative">
      {/* ═══════════════════════════════════════
          SECTION 1 — Our Services
      ═══════════════════════════════════════ */}
      <section className="max-w-7xl px-6 py-16 md:py-24 mx-auto">
        {/* Section label + H2 */}
        <div className="mb-12">
          <p
            className="text-xs tracking-[3px] uppercase font-semibold mb-3"
            style={{ color: "var(--primary-color)" }}
          >
            Our Services
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-black dark:text-white leading-snug max-w-2xl">
            Buy Your Ideal Property in Dubai with{" "}
            <span className="font-semibold">Trusted Experts</span>
          </h2>
          {/* Accent line */}
          <div
            className="mt-4 h-[2px] w-16"
            style={{
              background: "var(--bg-primary-gradient, var(--primary-color))",
            }}
          />
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <a
              href={service.redirected}
              key={idx}
              className="group relative flex flex-col border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Card top accent */}
              <div
                className="h-[3px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "var(--bg-primary-gradient, var(--primary-color))",
                }}
              />

              <div className="flex flex-col flex-1 p-7 space-y-5">
                {/* Icon + label */}
                <div className="flex items-center gap-3">
                  <span
                    className="p-2.5 rounded-lg"
                    style={{
                      color: "var(--primary-color)",
                      background: "rgba(156,98,62,0.08)",
                    }}
                  >
                    {service.icon}
                  </span>
                  <span
                    className="text-xs font-semibold tracking-[2px] uppercase"
                    style={{ color: "var(--primary-color)" }}
                  >
                    {service.label}
                  </span>
                </div>

                {/* H3 + subtitle */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold leading-snug mb-1 text-black dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    {service.subtitle}
                  </p>
                </div>

                {/* Bullets */}
                {service.bullets.length > 0 && (
                  <ul className="space-y-2">
                    {service.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <CheckCircle2
                          size={15}
                          className="mt-[2px] flex-shrink-0"
                          style={{ color: "var(--primary-color)" }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Body paragraphs */}
                <div className="space-y-2.5 flex-1">
                  {service.body.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* CTA */}
                <span
                  className="text-xs font-semibold tracking-widest uppercase border-b pb-0.5 self-start mt-auto transition-opacity group-hover:opacity-70"
                  style={{
                    color: "var(--primary-color)",
                    borderColor: "var(--primary-color)",
                  }}
                >
                  Learn More →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-gray-200 dark:border-gray-800" />
      </div>

      {/* ═══════════════════════════════════════
          SECTION 2 — Why Mondus Properties
      ═══════════════════════════════════════ */}
      <section className="max-w-7xl px-6 py-16 md:py-24 mx-auto">
        {/* H2 */}
        <div className="mb-12">
          <p
            className="text-xs tracking-[3px] uppercase font-semibold mb-3"
            style={{ color: "var(--primary-color)" }}
          >
            Why Choose Us
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-black dark:text-white leading-snug max-w-3xl">
            Why Mondus Properties is a{" "}
            <span className="font-semibold">
              Top Real Estate Company in Dubai?
            </span>
          </h2>
          <div
            className="mt-4 h-[2px] w-16"
            style={{
              background: "var(--bg-primary-gradient, var(--primary-color))",
            }}
          />
        </div>

        {/* Two-column: points left, text right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Why points */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyPoints.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-color)] transition-colors duration-300"
              >
                <span
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--primary-color)" }}
                >
                  {icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-black dark:text-white mb-1">
                    {title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: descriptive text */}
          <div className="lg:w-1/2 space-y-5 text-sm md:text-base text-gray-400 dark:text-gray-200 leading-relaxed">
            <p>
              Mondus Properties is known to be one of the best real estate
              companies in Dubai — delivering verified listings, data-driven
              insights, and personalized services tailored to each client's
              needs.
            </p>
            <p>
              Our strong reputation as the best real estate company in Dubai UAE
              comes from our commitment to transparency, customer satisfaction,
              and long-term investment success.
            </p>

            {/* RERA sub-section */}
            <div
              className="mt-6 p-6 rounded-xl border"
              style={{
                borderColor: "rgba(156,98,62,0.3)",
                background: "rgba(156,98,62,0.04)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck
                  size={20}
                  style={{ color: "var(--primary-color)" }}
                />
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--primary-color)" }}
                >
                  Trusted RERA-Approved Real Estate Experts in Dubai
                </h3>
              </div>
              <p className="text-sm leading-relaxed mb-3">
                Mondus Properties is approved by the Real Estate Regulatory
                Authority (RERA), providing buyers and investors with legal
                protection, transparency and credibility.
              </p>
              <p className="text-sm leading-relaxed mb-3">
                Being a RERA-approved Property Agent in Dubai ensures that all
                transactions are secure, compliant, and professionally managed.
                Clients are provided with safe purchases and professional advice
                throughout the buying or investment process.
              </p>
              <p className="text-sm leading-relaxed">
                This makes Mondus Properties a trusted and best real estate
                company in Dubai for both local and international clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDoSection;
