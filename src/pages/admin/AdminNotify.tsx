import { useEffect, useState } from "react";

interface ContactRequest {
  _id: string;
  purpose: string;
  category: string;
  bedrooms: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

const AdminNotify = () => {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);

  useEffect(() => {
    fetch("${API_BASE_URL}/api/notify")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error fetching contact requests:", err));
  }, []);

  return (
    <div className="h-screen bg-black text-white font-raleway flex flex-col p-0">
      <div className="sticky top-0 z-20 bg-black p-4 sm:p-6 border-b border-gray-700">
        <h1 className=" text-2xl sm:text-3xl font-bold">Callback Leads</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {contacts.length === 0 ? (
          <p className="text-gray-400">No requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-700 text-sm sm:text-base">
              <thead className="bg-[#1e1e1e] text-left">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Purpose
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Category
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Bedrooms
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">Name</th>
                  <th className="px-4 py-3 border-b border-gray-700">Email</th>
                  <th className="px-4 py-3 border-b border-gray-700">Phone</th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Requested At
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact) => (
                  <tr
                    key={contact._id}
                    className="even:bg-[#111] hover:bg-[#222] transition duration-200"
                  >
                    <td className="px-4 py-3">{contact.purpose}</td>
                    <td className="px-4 py-3">{contact.category}</td>
                    <td className="px-4 py-3">{contact.bedrooms}</td>
                    <td className="px-4 py-3">{contact.name}</td>
                    <td className="px-4 py-3">{contact.email}</td>
                    <td className="px-4 py-3">{contact.phone}</td>
                    <td className="px-4 py-3">
                      {new Date(contact.createdAt).toLocaleString()}
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

export default AdminNotify;
