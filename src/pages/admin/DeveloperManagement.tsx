import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import generateSlug from "../../utils/generateSlug";
import { Developer, DeveloperForm } from "../../types/developer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DeveloperManagement = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(false);

  /* Modals */
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [editing, setEditing] = useState<Developer | null>(null);
  const [viewDeveloper, setViewDeveloper] = useState<Developer | null>(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(
    null,
  );

  /* Form state */
  const [slugTouched, setSlugTouched] = useState(false);

  const [form, setForm] = useState<DeveloperForm>({
    developerName: "",
    slug: "",
    shortDescription: "",
    highlights: "",
    location: "",
    developerLogo: "",
    establishedYear: undefined,
    totalProjects: undefined,
    website: "",
  });

  /* ================= FETCH ================= */

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/developers`);
      setDevelopers(res.data.data);
    } catch {
      toast.error("Failed to load developers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const toAssetUrl = (path?: string | null) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}${path}`;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      if (
        !form.developerName ||
        !form.slug ||
        !form.shortDescription ||
        !form.location ||
        !form.developerLogo
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const payload = {
        developerName: form.developerName,
        slug: form.slug,
        shortDescription: form.shortDescription,
        location: form.location,
        developerLogo: form.developerLogo, // URL
        highlights: form.highlights,
        establishedYear: form.establishedYear,
        totalProjects: form.totalProjects,
        website: form.website,
      };

      if (editing) {
        await axios.put(
          `${API_BASE_URL}/api/developers/${editing._id}`,
          payload,
        );
        toast.success("Developer updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/developers`, payload);
        toast.success("Developer created successfully");
      }

      closeForm();
      fetchDevelopers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  /* ================= HELPERS ================= */

  const openEdit = (d: Developer) => {
    setEditing(d);
    setSlugTouched(true);

    setForm({
      developerName: d.developerName,
      slug: d.slug,
      shortDescription: d.shortDescription,
      highlights: d.highlights.join(", "),
      location: d.location,
      developerLogo: d.developerLogo,
      establishedYear: d.establishedYear,
      totalProjects: d.totalProjects,
      website: d.website,
    });
    setFormOpen(true);
  };

  const openView = (d: Developer) => {
    setViewDeveloper(d);
    setViewOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setSlugTouched(false);
    setForm({
      developerName: "",
      slug: "",
      shortDescription: "",
      highlights: "",
      location: "",
      developerLogo: "",
      website: "",
    });
  };

  const openDeleteConfirm = (d: Developer) => {
    setSelectedDeveloper(d);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedDeveloper(null);
  };

  const handleConfirm = async () => {
    if (!selectedDeveloper) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/developers/${selectedDeveloper._id}`,
      );
      toast.success("Developer deleted");

      fetchDevelopers();
    } catch {
      toast.error("Operation failed");
    } finally {
      closeConfirm();
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Developer Management</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          + Add Developer
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-700 text-sm">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left">Developer</th>
            <th className="p-3">Location</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="p-6 text-center">
                Loading...
              </td>
            </tr>
          ) : (
            developers.map((d) => (
              <tr key={d._id} className="border-t border-gray-700">
                <td className="p-3 flex items-center gap-3">
                  {d.developerLogo && (
                    <img
                      src={toAssetUrl(d.developerLogo)}
                      className="w-10 h-10 rounded object-contain bg-white"
                    />
                  )}
                  {d.developerName}
                </td>
                <td className="p-3 text-center">{d.location}</td>
                <td className="p-3 flex gap-2 justify-end">
                  <button
                    onClick={() => openView(d)}
                    className="bg-gray-700 px-2 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openEdit(d)}
                    className="bg-blue-600 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(d)}
                    className="bg-red-600 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ================= VIEW MODAL ================= */}
      {viewOpen && viewDeveloper && (
        <Modal title="Developer Details" onClose={() => setViewOpen(false)}>
          <div className="space-y-4">
            {viewDeveloper.developerLogo && (
              <img
                src={toAssetUrl(viewDeveloper.developerLogo)}
                className="h-28 object-contain bg-white rounded p-2"
              />
            )}

            <InfoRow label="Name" value={viewDeveloper.developerName} />
            <InfoRow label="Slug" value={viewDeveloper.slug} />
            <InfoRow label="Location" value={viewDeveloper.location} />

            <TagList title="Highlights" items={viewDeveloper.highlights} />

            <div>
              <p className="text-xs text-gray-400 mb-1">Description</p>
              <p className="text-sm text-gray-200">
                {viewDeveloper.shortDescription}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* ================= CONFIRM MODAL ================= */}
      {confirmOpen && selectedDeveloper && (
        <Modal
          title="Delete Listing"
          onClose={closeConfirm}
          actions={
            <>
              <button onClick={closeConfirm} className="btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Confirm
              </button>
            </>
          }
        >
          Are you sure you want to delete?
          <b>{selectedDeveloper.developerName}</b>?
        </Modal>
      )}

      {/* ================= FORM MODAL ================= */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-4xl border border-gray-800 overflow-y-auto max-h-[90vh]">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold">
                {editing ? "Edit Property" : "Add New Property"}
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* FORM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Developer Name"
                  value={form.developerName}
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((p) => ({
                      ...p,
                      developerName: v,
                      slug: slugTouched ? p.slug : generateSlug(v),
                    }));
                  }}
                />

                <input
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setForm({ ...form, slug: generateSlug(e.target.value) });
                  }}
                />

                <input
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />

                <textarea
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Short Description"
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                />

                <textarea
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Highlights (comma separated)"
                  value={form.highlights}
                  onChange={(e) =>
                    setForm({ ...form, highlights: e.target.value })
                  }
                />

                <input
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Developer Logo URL"
                  value={form.developerLogo}
                  onChange={(e) =>
                    setForm({ ...form, developerLogo: e.target.value })
                  }
                />

                {form.developerLogo && (
                  <img
                    src={form.developerLogo}
                    className="h-24 object-contain bg-white rounded p-2"
                  />
                )}

                <input
                  type="number"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Established Year"
                  value={form.establishedYear}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      establishedYear: Number(e.target.value),
                    })
                  }
                />

                <input
                  type="number"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Total Projects"
                  value={form.totalProjects}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      totalProjects: Number(e.target.value),
                    })
                  }
                />

                {/* <input
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  placeholder="Website URL"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                /> */}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
              <button
                onClick={closeForm}
                className="px-4 py-2 border border-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded"
              >
                {editing ? "Update Property" : "Create Property"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperManagement;

/* ================= SHARED UI ================= */

const Modal = ({
  title,
  onClose,
  children,
  actions,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 rounded-xl w-full max-w-2xl border border-gray-800">
      <div className="p-5 border-b border-gray-800 flex justify-between">
        <h3 className="font-semibold">{title}</h3>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="p-5 space-y-4">{children}</div>
      {actions && (
        <div className="p-5 border-t border-gray-800 flex justify-end gap-2">
          {actions}
        </div>
      )}
    </div>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm">{value || "—"}</p>
  </div>
);

const TagList = ({ title, items }: { title: string; items?: string[] }) => (
  <div>
    <p className="text-xs text-gray-400 mb-1">{title}</p>
    <div className="flex flex-wrap gap-2">
      {items?.length
        ? items.map((x, i) => (
            <span
              key={x + i}
              className="text-xs bg-gray-800 border border-gray-700 px-2 py-1 rounded"
            >
              {x}
            </span>
          ))
        : "—"}
    </div>
  </div>
);
