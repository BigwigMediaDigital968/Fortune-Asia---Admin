import React, { useState } from "react";

const teamMembers = [
  {
    name: "Ben Thomas",
    role: "Head of Secondary",
    experience: "Experience: 19 years",
    languages: "Languages: English, Spanish",
    image: "https://fnst.axflare.com/img/team/JPEG/oEsyFzyLSm.jpg",
  },
  {
    name: "John Golotco",
    role: "Sales Director",
    experience: "Experience: 12 years",
    languages: "Languages: English, Russian, Romanian",
    image: "https://fnst.axflare.com/img/team/JPEG/XqjPzqAxew.jpeg",
  },
  {
    name: "Ivan Ruchev",
    role: "Senior Partner",
    experience: "Experience: 10 years",
    languages: "Languages: Russian",
    image: "https://fnst.axflare.com/img/team/JPEG/NQdQHfPaqp.jpg",
  },
  {
    name: "Ivan Ruchev",
    role: "Senior Partner",
    experience: "Experience: 10 years",
    languages: "Languages: Russian",
    image: "https://fnst.axflare.com/img/team/JPEG/NQdQHfPaqp.jpg",
  },
  {
    name: "Ivan Ruchev",
    role: "Senior Partner",
    experience: "Experience: 10 years",
    languages: "Languages: Russian",
    image: "https://fnst.axflare.com/img/team/JPEG/NQdQHfPaqp.jpg",
  },
];

const FindYourPartner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % teamMembers.length);
  };

  const getSlideStyle = (index: number) => {
    const total = teamMembers.length;
    const position = (index - current + total) % total;

    const baseStyle = {
      position: "absolute" as const,
      top: "0",
      transition: "all 0.5s ease-in-out",
      width: "300px",
      height: "460px",
    };

    switch (position) {
      case 0: // Center card
        return {
          ...baseStyle,
          left: "50%",
          transform: "translateX(-50%) scale(1)",
          zIndex: 30,
          opacity: 1,
        };
      case 1: // Right card
        return {
          ...baseStyle,
          left: "75%",
          transform: "translateX(-50%) scale(0.9)",
          zIndex: 20,
          opacity: 0.6,
        };
      case total - 1: // Left card
        return {
          ...baseStyle,
          left: "25%",
          transform: "translateX(-50%) scale(0.9)",
          zIndex: 20,
          opacity: 0.6,
        };
      default: // Hidden cards
        return {
          ...baseStyle,
          left: "50%",
          transform: "translateX(-50%) scale(0.8)",
          zIndex: 10,
          opacity: 0,
        };
    }
  };

  return (
    <section className="relative custom-gradient-lines">
      <div className="py-12 px-4 md:px-16 relative bg-white dark:bg-black text-black dark:text-white font-raleway">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-black dark:text-gray-100">
              FIND YOUR PARTNER
            </h2>
            <p className="text-gray-600 mb-6 max-w-md dark:text-gray-400 text-justify">
              Our team is highly experienced and knowledgeable across all
              aspects of the real estate industry. We are ready to answer your
              questions in over 7 languages. Find the perfect match for your
              needs and embark on your real estate journey with MONDUS
              professionals.
              <br />
              <br />
              Whether you're looking to buy, sell, or invest, our advisors offer
              personalized guidance tailored to your goals. We understand that
              every client’s journey is unique—our multilingual experts are
              equipped to support you through each step of the process with
              clarity, integrity, and dedication. Trust MONDUS to turn your real
              estate vision into reality.
            </p>

            <a
              href="/AgentsSection"
              className="w-36  md:w-44 inline-block font-raleway font-light bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] text-black py-3 text-center hover:opacity-90 transition"
            >
              CONNECT NOW
            </a>
          </div>

          {/* Right Slider Section */}
          <div className="relative w-full flex justify-center items-center h-[500px]">
            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-0 z-40 bg-white border border-black px-3 py-2 text-black hover:bg-black hover:text-white transition dark:bg-black dark:border-[var(--primary-color)] dark:text-[var(--primary-color)]"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-0 z-40 bg-white border border-black px-3 py-2 text-black hover:bg-black hover:text-white transition dark:bg-black dark:border-[var(--primary-color)] dark:text-[var(--primary-color)]"
            >
              →
            </button>

            {/* Slides Container */}
            <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden h-[500px]">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  style={getSlideStyle(index)}
                  className="rounded overflow-hidden shadow-lg transition-all duration-500 ease-in-out"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                  <div className="absolute bottom-0 bg-black bg-opacity-80 p-4 w-full text-left dark:bg-gray-900 dark:bg-opacity-80">
                    <h3 className="text-lg font-semibold text-white dark:text-gray-100">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-300 dark:text-gray-400">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {member.experience}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {member.languages}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourPartner;
