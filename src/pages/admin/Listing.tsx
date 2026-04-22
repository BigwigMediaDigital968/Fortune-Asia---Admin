import { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Listing {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bedrooms: string;
  size: string;
  message: string;
  createdAt: string;
}

const AdminListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch(`${baseURL}/api/listing`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  console.log(listings);

  return (
    <div className="h-screen bg-black text-white font-raleway flex flex-col p-0">
      {/* Header */}
      <div className="sticky top-5 z-20 bg-black p-4 sm:p-6 border-b border-gray-700">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Property Listing Requests
        </h1>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {listings.length === 0 ? (
          <p className="text-gray-400">No listings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-700 text-sm sm:text-base">
              <thead className="bg-[#1e1e1e] text-left">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700">Name</th>
                  <th className="px-4 py-3 border-b border-gray-700">Email</th>
                  <th className="px-4 py-3 border-b border-gray-700">Phone</th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Address
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Bedrooms
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">Size</th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Message
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Submitted At
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Send Mail
                  </th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr
                    key={listing._id}
                    className="even:bg-[#111] hover:bg-[#222] transition duration-200"
                  >
                    <td className="px-4 py-3">{listing.name}</td>
                    <td className="px-4 py-3">{listing.email}</td>
                    <td className="px-4 py-3">{listing.phone}</td>
                    <td className="px-4 py-3">{listing.address}</td>
                    <td className="px-4 py-3">{listing.bedrooms}</td>
                    <td className="px-4 py-3">{listing.size}</td>
                    <td className="px-4 py-3">{listing.message}</td>
                    <td className="px-4 py-3">
                      {new Date(listing.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${listing.email}`}
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

export default AdminListings;
