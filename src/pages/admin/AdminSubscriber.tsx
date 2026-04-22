import { useEffect, useState } from "react";

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AdminSubscriber = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    // fetch("${API_BASE_URL}/subscribers")
    fetch(`${API_BASE}/subscribers`)
      .then((res) => res.json())
      .then((data) => setSubscribers(data))
      .catch((err) => console.error("Error fetching subscribers:", err));
  }, []);

  return (
    <div className="h-screen bg-black text-white font-raleway flex flex-col p-0">
      <div className="sticky top-0 z-20 bg-black p-4 sm:p-6 border-b border-gray-700">
        <h1 className=" text-2xl sm:text-3xl font-bold">Subscribers</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {subscribers.length === 0 ? (
          <p className="text-gray-400">No subscribers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-700 text-sm sm:text-base">
              <thead className="bg-[#1e1e1e] text-left">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700">Email</th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Subscribed At
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Send Mail
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr
                    key={subscriber._id}
                    className="even:bg-[#111] hover:bg-[#222] transition duration-200"
                  >
                    <td className="px-4 py-3">{subscriber.email}</td>
                    <td className="px-4 py-3">
                      {new Date(subscriber.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${subscriber.email}`}
                        className="text-blue-400 hover:underline"
                      >
                        Send Mail
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscriber;
