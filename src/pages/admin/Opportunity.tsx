import { useEffect, useState } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";

interface OpportunityType {
  _id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  postedAt: string;
}

// const baseURL = "http://localhost:8000/api/opportunity";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Opportunity = () => {
  const [opportunities, setOpportunities] = useState<OpportunityType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<OpportunityType>>({});

  useEffect(() => {
    // fetch(baseURL)
    fetch(`${API_BASE}/api/opportunity`)
      .then((res) => res.json())
      .then((data) => setOpportunities(data))
      .catch((err) => console.error("Error fetching opportunities:", err));
  }, []);

  const openModal = (opportunity?: OpportunityType) => {
    setIsEditing(!!opportunity);
    setFormData(opportunity || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setFormData({});
    setShowModal(false);
    setIsEditing(false);
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${API_BASE}/api/opportunity/${formData._id}`
      : `${API_BASE}/api/opportunity`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isEditing) {
          setOpportunities((prev) =>
            prev.map((op) => (op._id === data._id ? data : op)),
          );
        } else {
          setOpportunities((prev) => [data, ...prev]);
        }
        closeModal();
      });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this opportunity?")) return;
    fetch(`${API_BASE}/api/opportunity/${id}`, { method: "DELETE" }).then(
      () => {
        setOpportunities((prev) => prev.filter((op) => op._id !== id));
      },
    );
  };

  const truncate = (str: string, n = 60) =>
    str.length > n ? str.substring(0, n) + "..." : str;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="h-screen bg-black text-white font-raleway flex flex-col p-0">
      {/* Sticky Header */}
      <div className="sticky top-5 z-20 bg-black p-4 sm:p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Manage Opportunities
          </h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Opportunity
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {opportunities.length === 0 ? (
          <p className="text-gray-400">No opportunities available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-700 text-sm sm:text-base">
              <thead className="bg-[#1e1e1e] text-left">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700">Title</th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Location
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">Type</th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 border-b border-gray-700">Posted</th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((op) => (
                  <tr
                    key={op._id}
                    className="even:bg-[#111] hover:bg-[#222] transition duration-200"
                  >
                    <td className="px-4 py-3">{op.title}</td>
                    <td className="px-4 py-3">{op.location}</td>
                    <td className="px-4 py-3">{op.type}</td>
                    <td className="px-4 py-3">{truncate(op.description)}</td>
                    <td className="px-4 py-3">{formatDate(op.postedAt)}</td>
                    <td className="px-4 py-3 flex gap-3 items-center">
                      <button
                        onClick={() => openModal(op)}
                        className="text-blue-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(op._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white text-black rounded-xl shadow-xl w-full max-w-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit" : "Add"} Opportunity
            </h2>

            <input
              name="title"
              placeholder="Title"
              className="w-full p-2 mb-3 border border-gray-300 rounded"
              value={formData.title || ""}
              onChange={handleChange}
            />
            <input
              name="location"
              placeholder="Location"
              className="w-full p-2 mb-3 border border-gray-300 rounded"
              value={formData.location || ""}
              onChange={handleChange}
            />
            <input
              name="type"
              placeholder="Type (e.g. Full-Time)"
              className="w-full p-2 mb-3 border border-gray-300 rounded"
              value={formData.type || ""}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              rows={4}
              value={formData.description || ""}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </>
                ) : (
                  <>{isEditing ? "Update" : "Create"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opportunity;
