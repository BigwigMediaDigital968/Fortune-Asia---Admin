import agents from "../data/agents.data.json";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import agentBanner from "../assets/agent-desktop.webp";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

type Agent = {
  name: string;
  position: string;
  experience: string;
  languages: string[]; // correct type
  specialization: string;
  language: string;
  img: string;
};

const AgentCard = ({ agent }: { agent: Agent & { id: string } }) => (
  <Link to={`/agents/${agent.id}`} className="block">
    <div className="relative bg-black rounded overflow-hidden shadow-md h-[500px] hover:shadow-xl transition-shadow duration-300">
      <img
        src={agent.img}
        alt={agent.name}
        className="w-full h-full object-cover"
        draggable="false"
      />
      <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white p-4 backdrop-blur-sm">
        <h2 className="font-semibold text-lg">{agent.name}</h2>
        <p className="text-sm text-gray-200">{agent.position}</p>
        <p className="text-sm text-gray-200">Experience: {agent.experience}</p>
        <p className="text-sm text-gray-200">
          Languages: {agent.languages.join(", ")}
        </p>
      </div>
    </div>
  </Link>
);

const AgentsSection = () => {
  const [specialization, setSpecialization] = useState("");
  const [language, setLanguage] = useState("");

  // ✅ Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🔍 Extract unique specialization and languages
  const { enrichedAgents, specializations, languages } = useMemo(() => {
    const specializationSet = new Set<string>();
    const languageSet = new Set<string>();
    const enriched = agents.map((agent) => {
      const spec = agent.specialization || agent.position; // fallback
      const langs = agent.languages.split(",").map((lang) => lang.trim());
      specializationSet.add(spec);
      langs.forEach((lang) => languageSet.add(lang));
      return {
        ...agent,
        specialization: spec,
        languages: langs,
      };
    });
    return {
      enrichedAgents: enriched,
      specializations: Array.from(specializationSet).sort(),
      languages: Array.from(languageSet).sort(),
    };
  }, []);

  // ✅ Filter based on dropdowns
  const filteredAgents = useMemo(() => {
    return enrichedAgents.filter((agent) => {
      const matchesSpecialization = specialization
        ? agent.specialization === specialization
        : true;
      const matchesLanguage = language
        ? agent.languages.includes(language)
        : true;
      return matchesSpecialization && matchesLanguage;
    });
  }, [enrichedAgents, specialization, language]);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white font-raleway font-light dark:font-thin">
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Banner */}
      <div
        className="w-full h-screen bg-cover bg-center flex flex-col justify-end py-10 items-center text-center px-4 relative"
        style={{
          backgroundImage: `url(${agentBanner})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <h1 className="text-3xl md:text-4xl  z-10 font-light text-white">
          REAL ESTATE PROPERTIES ADVISOR IN DUBAI
        </h1>
        <p className="text-lg text-gray-300 mt-2 z-10 font-light">
          Team of real estate experts
        </p>
      </div>

      {/* Filters */}
      <section className=" py-8 px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-light">FIND YOUR PARTNER</h2>
          <div className="flex gap-4">
            {/* Specialization dropdown */}
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-md"
            >
              <option value="">All Specializations</option>
              {specializations.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>

            {/* Language dropdown */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-md"
            >
              <option value="">All Languages</option>
              {languages.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAgents.map((agent, index) => (
            <AgentCard key={index} agent={agent} />
          ))}
        </div>
      </section>
      <Footer />

      {/* Footer */}
    </div>
  );
};

export default AgentsSection;
