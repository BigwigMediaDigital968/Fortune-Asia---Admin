import { useParams } from "react-router-dom";
import agents from "../data/agents.data.json";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect } from "react";

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return <div className="text-center mt-20 text-white">Agent not found</div>;
  }

  const languagesList = agent.languages.split(",").map((lang) => lang.trim());

  // ✅ Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen font-raleway font-light dark:font-thin">
      <div className="mb-16 md:mb-20 pt-3 md:pt-5">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto p-6 pt-20 flex flex-col lg:flex-row gap-10">
        {/* Left Side: Image & Contact Buttons */}
        <div className="lg:w-1/3">
          <img
            src={agent.img}
            alt={agent.name}
            className="w-full rounded-lg shadow-xl mb-6"
          />
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${agent.call}`}
              className="border border-black dark:border-white py-2 px-4 rounded  transition text-center"
            >
              📞 Call
            </a>
            <a
              href={`mailto:${agent.email}`}
              className="border border-black dark:border-white py-2 px-4 rounded  transition text-center"
            >
              ✉️ Email
            </a>
            <a
              href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black dark:border-white py-2 px-4 rounded  transition text-center"
            >
              📱 WhatsApp
            </a>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-semibold mb-2">{agent.name}</h1>
          <p className="text-xl text-gray-800 dark:text-gray-300 mb-4">
            {agent.position}
          </p>

          <div className="text-gray-800 dark:text-gray-300 space-y-2 mb-8">
            <p>
              <strong>Experience:</strong> {agent.experience}
            </p>
            <p>
              <strong>Specialization:</strong> {agent.specialization}
            </p>
            <p>
              <strong>Languages:</strong> {languagesList.join(", ")}
            </p>
          </div>

          <div className="space-y-6 text-gray-800 dark:text-gray-300 leading-relaxed">
            <p>
              Olga was born in the Republic of Moldova. Before settling down in
              Dubai she had lived in London for a year and spent another year in
              Barcelona.
            </p>
            <p>
              She holds a Bachelor’s degree in International Relations and a
              Master’s degree in Tourism and Hotel Management.
            </p>
            <p>
              Olga started her real estate career in 2005. From 2007 until 2017,
              she ran her agency in Moldova, focusing only on Embassy and
              Diplomatic clientele.
            </p>
            <p>
              After joining AX CAPITAL, Olga became an ambassador of the
              company, closing great deals – the 3rd place in sales volume in
              2021.
            </p>
            <p>
              Moreover, she gained vast experience in teamwork. Olga believes
              that it is very important to have a great team and the support of
              the company’s top management.
            </p>

            <h2 className="text-black dark:text-white text-xl mt-6">
              A little about personal life
            </h2>
            <p>
              Olga loves traveling, spiritual meditation, and yoga. She also
              enjoys playing golf.
            </p>
            <p>
              Olga is 100% dedicated to her job and loves what she does. She
              believes that the most important thing is to give people kindness
              and help.
            </p>
            <p className="italic text-[var(--primary-color)] mt-2">
              "Believe in yourself, be positive and smile."
            </p>
          </div>
        </div>
      </div>

      {/* Optional: More Agents Section */}
      {/* You can include a "More Agents" component here like the bottom part of the screenshot */}

      <Footer />
    </div>
  );
};

export default AgentDetail;
