import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ContactRequest {
  _id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  isVerified?: boolean;
  purpose?: string;
  category?: string;
  bedrooms?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PAGE_LIMIT = 10;

const AdminContactRequest = () => {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [search, setSearch] = useState("");
  const [verified, setVerified] = useState("all");
  const [purpose, setPurpose] = useState("all");
  const [category, setCategory] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState<{
    type: "delete" | "verify" | null;
    lead?: ContactRequest;
  }>({ type: null });

  // Fetch leads with filters
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_LIMIT),
      });

      if (search) params.append("search", search);
      if (verified !== "all") params.append("verified", verified);
      if (purpose !== "all") params.append("purpose", purpose);
      if (category !== "all") params.append("category", category);
      if (bedrooms !== "all") params.append("bedrooms", bedrooms);

      const res = await fetch(
        `${API_BASE_URL}/api/notify/leads?${params.toString()}`,
      );
      const data = await res.json();

      setContacts(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
      toast.success("✅ Leads refreshed successfully");
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("❌ Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  console.log(contacts);

  useEffect(() => {
    fetchLeads();
  }, [page, search, verified, purpose, category, bedrooms]);

  const confirmDelete = async () => {
    if (!modal.lead) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/notify/leads/${modal.lead._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Delete failed");

      setContacts((prev) => prev.filter((c) => c._id !== modal.lead?._id));
      toast.success("✅ Lead deleted successfully");
    } catch (err) {
      toast.error("❌ Failed to delete lead");
    } finally {
      setModal({ type: null });
    }
  };

  const confirmVerify = async () => {
    if (!modal.lead) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/notify/leads/${modal.lead._id}/verify`,
        {
          method: "PATCH",
        },
      );

      if (!res.ok) throw new Error("Verify failed");

      setContacts((prev) =>
        prev.map((c) =>
          c._id === modal.lead?._id ? { ...c, isVerified: true } : c,
        ),
      );
      toast.success("✅ Lead verified successfully");
    } catch (err) {
      toast.error("❌ Failed to verify lead");
    } finally {
      setModal({ type: null });
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white font-raleway flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gray-900 p-4 sm:p-6 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Leads</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto flex-wrap">
          <input
            placeholder="Search name, email or phone"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={verified}
            onChange={(e) => {
              setPage(1);
              setVerified(e.target.value);
            }}
            className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>

          <select
            value={purpose}
            onChange={(e) => {
              setPage(1);
              setPurpose(e.target.value);
            }}
            className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Purposes</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
            <option value="Offplan">Offplan</option>
          </select>

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Plots">Plots</option>
            <option value="Studio">Studio</option>
          </select>

          <select
            value={bedrooms}
            onChange={(e) => {
              setPage(1);
              setBedrooms(e.target.value);
            }}
            className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Bedrooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5+">5+</option>
          </select>

          <button
            onClick={fetchLeads}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-400 text-center">No leads found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-700 text-sm">
              <thead className="bg-gray-800 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Purpose</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Bedrooms</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c._id}
                    className="even:bg-gray-900 hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3 break-words">{c.email}</td>
                    <td className="px-4 py-3">{c.phone}</td>
                    <td className="px-4 py-3">{c.purpose || "-"}</td>
                    <td className="px-4 py-3">{c.category || "-"}</td>
                    <td className="px-4 py-3">{c.bedrooms || "-"}</td>
                    <td className="px-4 py-3">
                      {c.isVerified ? (
                        <span className="text-green-400 font-medium text-xs">
                          ✔ Verified
                        </span>
                      ) : (
                        <span className="text-yellow-400 font-medium text-xs">
                          ⏳ Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      {!c.isVerified && (
                        <button
                          onClick={() => setModal({ type: "verify", lead: c })}
                          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => setModal({ type: "delete", lead: c })}
                        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 sm:gap-0 text-sm">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border border-gray-700 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-gray-400">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border border-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-700 p-6 w-full max-w-sm rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-3">
              {modal.type === "delete" ? "Delete Lead?" : "Verify Lead?"}
            </h2>

            <p className="text-sm text-gray-400 mb-6">
              {modal.type === "delete"
                ? "This action cannot be undone."
                : "This will mark the user as verified."}
            </p>

            <div className="flex justify-end gap-3 flex-wrap">
              <button
                onClick={() => setModal({ type: null })}
                className="px-4 py-2 border border-gray-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={
                  modal.type === "delete" ? confirmDelete : confirmVerify
                }
                className={`px-4 py-2 rounded text-white ${
                  modal.type === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactRequest;
