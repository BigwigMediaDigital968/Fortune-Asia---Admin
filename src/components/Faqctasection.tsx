"use client";

import { useState } from "react";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";

// ── FAQ Data ──────────────────────────────────────────────
const faqs = [
  {
    q: "Why would you select a real estate company in the city of Dubai that is RERA approved?",
    a: "RERA certification makes the job of dealing with professional property agents in Dubai transparent, legally sound, and credible. It ensures all transactions are conducted within the framework of Dubai's real estate regulations, giving buyers, sellers, and investors full legal protection and peace of mind.",
  },
  {
    q: "What are the requirements of the UAE Golden Visa?",
    a: "Real estate buyers entering into an agreement with one of the leading real estate firms of Dubai can obtain long-term residency provided that the value of the property bought by the investor matches minimum criteria. Our expert property agents can guide you through the complete eligibility and application process.",
  },
  {
    q: "What are off-plan property benefits?",
    a: "Off-plan properties offer lower prices, flexible payment plans, and high appreciation potential — all with expert guidance from certified property agents in Dubai. Buying early in a development often means securing the best units at the lowest prices before completion drives up value.",
  },
  {
    q: "What are some of the properties that I can invest in Dubai?",
    a: "Dubai offers ready-to-move, off-plan, residential, commercial, and luxury villas and apartments suitable for all investment goals. Whether you seek immediate rental income or long-term capital appreciation, Mondus Properties can match you with the right opportunity.",
  },
  {
    q: "What is the expected rate of returns on investing in Dubai real estate?",
    a: "8–14% per year in combined rental revenues and capital gains can be achieved based on the location and property type. Prime areas like Downtown Dubai, Dubai Marina, and JVC consistently deliver strong yields for both short-term and long-term investors.",
  },
];

// ── Single FAQ Item ───────────────────────────────────────
const FAQItem = ({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-gray-200 dark:border-gray-800 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-start gap-4 py-6 text-left group"
    >
      {/* Number */}
      <span
        className="flex-shrink-0 text-xs font-semibold tracking-widest mt-0.5 w-6"
        style={{ color: "var(--primary-color)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Question */}
      <span className="flex-1 text-sm md:text-base font-medium text-black dark:text-white leading-snug group-hover:opacity-80 transition-opacity">
        {question}
      </span>

      {/* Chevron */}
      <ChevronDown
        size={18}
        className="flex-shrink-0 mt-0.5 transition-transform duration-300"
        style={{
          color: "var(--primary-color)",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </button>

    {/* Answer */}
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <p className="pb-6 pl-10 text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
        {answer}
      </p>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────
const FaqCtaSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="w-full bg-white dark:bg-black text-black dark:text-white font-raleway font-light relative">
      {/* ═══════════════════════════════════
          1. FAQ
      ═══════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: Heading sticky */}
          <div className="lg:w-[36%] flex-shrink-0">
            <p
              className="text-xs tracking-[3px] uppercase font-semibold mb-3"
              style={{ color: "var(--primary-color)" }}
            >
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug mb-4">
              Frequently Asked Questions About{" "}
              <span className="font-semibold">Dubai Real Estate</span>
            </h2>
            <div
              className="h-[2px] w-16 mb-6"
              style={{
                background: "var(--bg-primary-gradient, var(--primary-color))",
              }}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Everything you need to know about buying, renting, and investing
              in Dubai real estate — answered by our expert property agents.
            </p>

            {/* Decorative box */}
            <div
              className="hidden lg:flex mt-10 flex-col gap-3 p-6 rounded-xl"
              style={{
                background: "rgba(156,98,62,0.05)",
                border: "1px solid rgba(156,98,62,0.2)",
              }}
            >
              <p
                className="text-xs font-semibold tracking-[2px] uppercase"
                style={{ color: "var(--primary-color)" }}
              >
                Still have questions?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Our team is available 7 days a week to answer any queries about
                Dubai's real estate market.
              </p>
              <a
                href="/contact"
                className="text-xs font-semibold tracking-widest uppercase border-b pb-0.5 self-start mt-1 transition-opacity hover:opacity-70"
                style={{
                  color: "var(--primary-color)",
                  borderColor: "var(--primary-color)",
                }}
              >
                Talk to an Expert →
              </a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:w-[64%]">
            <div className="border-t border-gray-200 dark:border-gray-800">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  index={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-gray-200 dark:border-gray-800" />
      </div>

      {/* ═══════════════════════════════════
          2. CTA — Talk to Experts
      ═══════════════════════════════════ */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left: CTA copy */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <p
              className="text-xs tracking-[3px] uppercase font-semibold mb-3"
              style={{ color: "var(--primary-color)" }}
            >
              Get in Touch
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug mb-4">
              Talk to Experts at Dubai's{" "}
              <span className="font-semibold">Top Real Estate Company</span>
            </h2>
            <div
              className="h-[2px] w-16 mb-6 mx-auto lg:mx-0"
              style={{
                background: "var(--bg-primary-gradient, var(--primary-color))",
              }}
            />
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              Find your dream home, invest in high-return properties, or rent
              luxury apartments and villas with Mondus Properties.
            </p>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              Connect with a trusted Property Agent in Dubai today and take the
              first step towards owning your dream property.
            </p>
          </div>

          {/* Right: Contact actions */}
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
            {/* Call */}
            <a
              href="tel:+971521110794"
              className="group flex items-center gap-5 p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300 hover:shadow-md"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{ background: "rgba(156,98,62,0.08)" }}
              >
                <Phone size={20} style={{ color: "var(--primary-color)" }} />
              </div>
              <div>
                <p className="text-xs tracking-[2px] uppercase font-semibold text-gray-400 dark:text-gray-500 mb-0.5">
                  Call Us
                </p>
                <p className="text-sm font-semibold text-black dark:text-white group-hover:opacity-80 transition-opacity">
                  +971 52 111 0794
                </p>
              </div>
              <span
                className="ml-auto text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--primary-color)" }}
              >
                Call →
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/971521110795"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300 hover:shadow-md"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(156,98,62,0.08)" }}
              >
                <MessageCircle
                  size={20}
                  style={{ color: "var(--primary-color)" }}
                />
              </div>
              <div>
                <p className="text-xs tracking-[2px] uppercase font-semibold text-gray-400 dark:text-gray-500 mb-0.5">
                  WhatsApp
                </p>
                <p className="text-sm font-semibold text-black dark:text-white group-hover:opacity-80 transition-opacity">
                  Chat with an Agent
                </p>
              </div>
              <span
                className="ml-auto text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--primary-color)" }}
              >
                Chat →
              </span>
            </a>

            {/* Inquiry Form */}
            {/* <div
              className="p-5 rounded-xl"
              style={{
                border: "1px solid rgba(156,98,62,0.25)",
                background: "rgba(156,98,62,0.04)",
              }}
            >
              <p
                className="text-xs tracking-[2px] uppercase font-semibold mb-4"
                style={{ color: "var(--primary-color)" }}
              >
                <Mail size={14} className="inline mr-2 mb-0.5" />
                Inquiry Form
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="flex-1 px-4 py-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone / Email"
                  className="flex-1 px-4 py-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Your message or property requirement..."
                className="w-full mt-3 px-4 py-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] transition-colors resize-none"
              />
              <button
                className="mt-3 w-full py-3 text-xs font-semibold tracking-[2.5px] uppercase rounded-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                style={{
                  background:
                    "var(--bg-primary-gradient, var(--primary-color))",
                  color: "#2a1f18",
                }}
              >
                Send Inquiry
              </button>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqCtaSection;
