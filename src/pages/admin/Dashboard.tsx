import { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaNewspaper,
  FaEnvelope,
  FaBell,
  FaPhoneAlt,
  FaBook,
  FaBuilding,
} from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GRADIENTS = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-sky-500 via-blue-500 to-indigo-600",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-orange-500 via-amber-500 to-yellow-500",
  "from-rose-500 via-pink-500 to-red-500",
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-sky-500 via-blue-500 to-indigo-600",
];

const safeFetch = async (url: string) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`API failed: ${url} → ${res.status}`);
      return [];
    }

    const json = await res.json();

    // ✅ Normalize API response
    if (Array.isArray(json)) return json;
    if (Array.isArray(json?.data)) return json.data;

    return [];
  } catch (err) {
    console.error(`Fetch error: ${url}`, err);
    return [];
  }
};

const Dashboard = () => {
  const [counts, setCounts] = useState({
    subscribers: 0,
    newsletters: 0,
    emailers: 0,
    leads: 0,
    callbacks: 0,
    blogs: 0,
    listedProperties: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [
        properties,
        subscribers,
        newsletters,
        emailers,
        consultations,
        callbacks,
        blogs,
      ] = await Promise.all([
        safeFetch(`${API_BASE_URL}/api/property`),
        safeFetch(`${API_BASE_URL}/subscribers`),
        safeFetch(`${API_BASE_URL}/newsletter`),
        safeFetch(`${API_BASE_URL}/emailer`),
        safeFetch(`${API_BASE_URL}/api/consultation`),
        safeFetch(`${API_BASE_URL}/api/notify/leads`),
        safeFetch(`${API_BASE_URL}/api/blogs/viewblog`),
      ]);

      setCounts({
        listedProperties: properties.length,
        subscribers: subscribers.length,
        newsletters: newsletters.length,
        emailers: emailers.length,
        leads: consultations.length,
        callbacks: callbacks.length,
        blogs: blogs.length,
      });
    };

    fetchData();
  }, []);

  console.log(counts);

  const cards = [
    {
      title: "Newsletter Subscribers",
      icon: <FaUserAlt />,
      count: counts.subscribers,
    },
    {
      title: "Sent Newsletters",
      icon: <FaNewspaper />,
      count: counts.newsletters,
    },
    { title: "Sent Emailers", icon: <FaEnvelope />, count: counts.emailers },
    { title: "Leads", icon: <FaPhoneAlt />, count: counts.leads },
    { title: "Call Back Leads", icon: <FaBell />, count: counts.callbacks },
    { title: "Blogs Data", icon: <FaBook />, count: counts.blogs },
    {
      title: "Listed Properties Data",
      icon: <FaBuilding />,
      count: counts.listedProperties,
    },
  ];

  return (
    <section className="px-4 py-8 space-y-8">
      <h2 className="text-2xl font-bold text-center">Admin Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
        {cards.map((card, idx) => (
          <StatCard
            key={card.title}
            {...card}
            gradient={GRADIENTS[idx % GRADIENTS.length]}
          />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({
  title,
  icon,
  count,
  gradient,
}: {
  title: string;
  icon: JSX.Element;
  count: number;
  gradient: string;
}) => (
  <div
    className={`w-full max-w-sm rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white bg-gradient-to-br ${gradient}`}
  >
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-1 text-center">{title}</h3>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

export default Dashboard;

// import { useEffect, useState } from "react";
// import {
//   FaUserAlt,
//   FaNewspaper,
//   FaEnvelope,
//   FaBell,
//   FaPhoneAlt,
//   FaBook,
//   FaBuilding,
// } from "react-icons/fa";

// const GRADIENTS = [
//   "from-indigo-500 via-purple-500 to-pink-500",
//   "from-sky-500 via-blue-500 to-indigo-600",
//   "from-green-500 via-emerald-500 to-teal-500",
//   "from-orange-500 via-amber-500 to-yellow-500",
//   "from-rose-500 via-pink-500 to-red-500",
//   "from-indigo-500 via-purple-500 to-pink-500",
//   "from-sky-500 via-blue-500 to-indigo-600",
// ];

// const Dashboard = () => {
//   const [counts, setCounts] = useState({
//     subscribers: 0,
//     newsletters: 0,
//     emailers: 0,
//     leads: 0,
//     callbacks: 0,
//     blogs: 0,
//     listedProperties: 0,
//   });

//   useEffect(() => {
//     Promise.all([
//       fetch("${API_BASE_URL}/subscribers").then((r) =>
//         r.json(),
//       ),
//       fetch("${API_BASE_URL}/newsletter").then((r) =>
//         r.json(),
//       ),
//       fetch("${API_BASE_URL}/emailer").then((r) =>
//         r.json(),
//       ),
//       fetch("${API_BASE_URL}/api/consultation").then((r) =>
//         r.json(),
//       ),
//       fetch("${API_BASE_URL}/api/notify/leads").then((r) =>
//         r.json(),
//       ),
//       fetch("${API_BASE_URL}/api/blogs/viewblog").then(
//         (r) => r.json(),
//       ),
//       fetch("${API_BASE_URL}/api/property").then((r) =>
//         r.json(),
//       ),
//     ]).then(
//       ([
//         subscribers,
//         newsletters,
//         emailers,
//         leads,
//         callbacks,
//         blogs,
//         listedProperties,
//       ]: unknown[]) => {
//         setCounts({
//           subscribers: (subscribers as any[]).length,
//           newsletters: (newsletters as any[]).length,
//           emailers: (emailers as any[]).length,
//           leads: (leads as any[]).length,
//           callbacks: (callbacks as any[]).length,
//           blogs: (blogs as any[]).length,
//           listedProperties: (listedProperties as any[]).length,
//         });
//       },
//     );
//   }, []);

//   console.log(counts);

//   const cards = [
//     {
//       title: "Newsletter Subscribers",
//       icon: <FaUserAlt />,
//       count: counts.subscribers,
//     },
//     {
//       title: "Sent Newsletters",
//       icon: <FaNewspaper />,
//       count: counts.newsletters,
//     },
//     { title: "Sent Emailers", icon: <FaEnvelope />, count: counts.emailers },
//     { title: "Leads", icon: <FaPhoneAlt />, count: counts.leads },
//     {
//       title: "Call Back Leads",
//       icon: <FaBell />,
//       count: counts.callbacks,
//     },
//     {
//       title: "Blogs Data",
//       icon: <FaBook />,
//       count: counts.blogs,
//     },
//     {
//       title: "Listed Properties Data",
//       icon: <FaBuilding />,
//       count: counts.listedProperties,
//     },
//   ];

//   return (
//     <section className="px-4 py-8 space-y-8">
//       <h2 className="text-2xl font-bold text-center">Admin Dashboard</h2>

//       {/* 3-column flex wrap layout */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
//         {cards.map((card, idx) => (
//           <StatCard
//             key={card.title}
//             {...card}
//             gradient={GRADIENTS[idx % GRADIENTS.length]}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// const StatCard = ({
//   title,
//   icon,
//   count,
//   gradient,
// }: {
//   title: string;
//   icon: JSX.Element;
//   count: number;
//   gradient: string;
// }) => (
//   <div
//     className={`w-full max-w-sm rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white bg-gradient-to-br ${gradient}`}
//   >
//     <div className="text-4xl mb-3">{icon}</div>
//     <h3 className="text-lg font-semibold mb-1 text-center">{title}</h3>
//     <p className="text-3xl font-bold">{count}</p>
//   </div>
// );

// export default Dashboard;
