import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import generateSlug from "../../utils/generateSlug";
import { api } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Developer } from "../../types/developer";

/* ================= TYPES ================= */

type ListingType = "buy" | "sell" | "rent" | "offPlan";
type ConfirmAction = "delete" | "status" | null;

export interface Property {
  _id: string;

  propertyName: string;
  slug: string;

  listingType: ListingType; // "buy" | "rent"
  propertyType: string;

  price: number;

  bedroom: number;
  bathroom: number;
  sizeSqft: number;

  address: string;
  subArea: string;

  developer: Developer;

  propertyDetails: string;

  /* NEW FIELDS */
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  extraHighlights: string[];

  videoLink?: string | null;
  googleMapUrl?: string | null;

  propertyImages: string[];
  propertyBrochure?: string | null;

  status: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface PropertyForm {
  propertyName: string;
  slug: string;
  listingType: ListingType;
  propertyType: string;

  price: string;

  bedroom: string;
  bathroom: string;
  sizeSqft: string;

  address: string;
  subArea: string;

  developer: Developer | string;
  propertyDetails: string;

  /* NEW UI FIELDS */
  highlights: string;
  featuresAmenities: string;
  nearby: string;
  extraHighlights: string;

  videoLink: string;
  googleMapUrl: string;

  /* FILES */
  propertyImages: File[];
  propertyBrochure?: File | null | string;
}

type ImageItem = {
  id: string | number;
  type: "existing" | "new";
  url?: string;
  file?: File | string;
  preview?: string;
};

/* ================= CONFIG ================= */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PAGE_LIMIT = 5;

/* ================= COMPONENT ================= */

const PropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [brochure, setBrochure] = useState<File | null | string>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  /* Pagination */
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(properties?.length || 0 / PAGE_LIMIT);

  /* Modal */
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);

  /* Form */
  const [form, setForm] = useState<PropertyForm>({
    propertyName: "",
    slug: "",
    listingType: "buy",
    propertyType: "",

    price: "",

    bedroom: "",
    bathroom: "",
    sizeSqft: "",

    address: "",
    subArea: "",

    developer: "",
    propertyDetails: "",

    highlights: "",
    featuresAmenities: "",
    nearby: "",
    extraHighlights: "",

    videoLink: "",
    googleMapUrl: "",

    propertyImages: [],
    propertyBrochure: null,
  });

  /* ================= FETCH ================= */

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/property`);
      setProperties(res.data.data);
    } catch {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchDevelopers = () =>
    api
      .get("/api/developers?limit=100")
      .then((r) => r.data.data as Developer[]);

  const { data: developers = [], isLoading } = useQuery({
    queryKey: ["developers"],
    queryFn: fetchDevelopers,
  });

  console.log(properties);

  /* ================= IMAGE HANDLING ================= */

  const handleImages = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      type: "new",
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string | number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const list = [...images];
    const dragged = list.splice(dragItem.current, 1)[0];
    list.splice(dragOverItem.current, 0, dragged);

    dragItem.current = null;
    dragOverItem.current = null;
    setImages(list);
    console.log("New Image Order:", list);
  };

  // View modal
  const [viewOpen, setViewOpen] = useState(false);
  const [viewProperty, setViewProperty] = useState<Property | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  // Optional: normalize URLs (supports absolute + relative)
  const toAssetUrl = (path?: string | null) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}${path}`; // API_BASE_URL like https://domain.com
  };

  const openView = async (p: Property) => {
    // ✅ Optimistic UI: show immediately
    setViewProperty(p);
    setViewOpen(true);

    // Optional: background refresh (if you have GET by id endpoint)
    // If you don't have this endpoint, remove this block.
    try {
      setViewLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/property/${p._id}`);
      const fresh = res.data?.data;
      if (fresh) setViewProperty(fresh);
    } catch {
      // keep optimistic data
    } finally {
      setViewLoading(false);
    }
  };

  const closeView = () => {
    setViewOpen(false);
    setViewProperty(null);
    setViewLoading(false);
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async () => {
    try {
      if (images.length === 0) {
        toast.error("At least one image is required");
        return;
      }

      if (
        !form.propertyName ||
        !form.slug ||
        !form.propertyType ||
        !form.address ||
        !form.propertyDetails ||
        !form.price ||
        !form.developer
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = new FormData();

      /* BASIC INFO */
      formData.append("propertyName", form.propertyName);
      formData.append("slug", form.slug);
      formData.append("listingType", form.listingType);
      formData.append("propertyType", form.propertyType);
      formData.append("address", form.address);
      formData.append("subArea", form.subArea);
      const devId =
        typeof form.developer === "string"
          ? form.developer
          : form.developer?._id;
      formData.append("developer", devId);
      formData.append("propertyDetails", form.propertyDetails);

      /* NUMBERS */
      formData.append("price", form.price);
      formData.append("bedroom", String(Number(form.bedroom)));
      formData.append("bathroom", String(Number(form.bathroom)));
      formData.append("sizeSqft", String(Number(form.sizeSqft)));

      /* OPTIONAL TEXT FIELDS */
      if (form.highlights) formData.append("highlights", form.highlights);

      if (form.featuresAmenities)
        formData.append("featuresAmenities", form.featuresAmenities);

      if (form.nearby) formData.append("nearby", form.nearby);

      if (form.extraHighlights)
        formData.append("extraHighlights", form.extraHighlights);

      if (form.videoLink) formData.append("videoLink", form.videoLink);

      if (form.googleMapUrl) formData.append("googleMapUrl", form.googleMapUrl);

      /* IMAGES */
      const imageOrder: ImageItem[] = [];
      let newFileCount = 0;

      images.forEach((img) => {
        if (img.type === "existing") {
          imageOrder.push(img);
        } else if (img.type === "new" && img.file) {
          imageOrder.push(img);
          formData.append("propertyImages", img.file);
          newFileCount++;
        }
      });

      // Send the exact interleaved order of both old and new images
      formData.append("imageOrder", JSON.stringify(imageOrder));

      /* BROCHURE */
      if (brochure) {
        formData.append("propertyBrochure", brochure);
      }

      /* API CALL */
      if (editing) {
        await axios.put(
          `${API_BASE_URL}/api/property/${editing._id}`,
          formData,
        );
        toast.success("Property updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/api/property`, formData);
        toast.success("Property created successfully");
      }

      closeForm();
      fetchProperties();
    } catch (error: any) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  /* ================= DELETE (OPTIMISTIC) ================= */

  const deleteProperty = async (id: string) => {
    const prev = properties;
    setProperties((p) => p.filter((x) => x._id !== id));

    try {
      await axios.delete(`${API_BASE_URL}/api/property/${id}`);
      toast.success("Property deleted");
    } catch {
      toast.error("Delete failed");
      setProperties(prev); // rollback
    }
  };

  /* ================= STATUS TOGGLE ================= */

  const toggleStatus = async (p: Property) => {
    setProperties((prev) =>
      prev.map((x) => (x._id === p._id ? { ...x, status: !x.status } : x)),
    );

    try {
      await axios.patch(`${API_BASE_URL}/api/property/${p._id}/status`, {
        status: !p.status,
      });
    } catch {
      toast.error("Status update failed");
      fetchProperties();
    }
  };

  /* ================= FORM HELPERS ================= */

  const openEdit = (p: Property) => {
    setEditing(p);
    setSlugTouched(false);

    console.log("Editing Property:", p);

    setForm({
      propertyName: p.propertyName,
      slug: p.slug,
      listingType: p.listingType,
      propertyType: p.propertyType,

      price: String(p.price),

      bedroom: String(p.bedroom),
      bathroom: String(p.bathroom),
      sizeSqft: String(p.sizeSqft),

      address: p.address,
      subArea: p.subArea || "",

      developer: p.developer,
      propertyDetails: p.propertyDetails,

      highlights: p.highlights?.join(", ") || "",
      featuresAmenities: p.featuresAmenities?.join(", ") || "",
      nearby: p.nearby?.join(", ") || "",
      extraHighlights: p.extraHighlights?.join(", ") || "",

      videoLink: p.videoLink || "",
      googleMapUrl: p.googleMapUrl || "",

      propertyImages: [],
      propertyBrochure: p.propertyBrochure,
    });

    setImages(
      p.propertyImages.map((url) => ({
        id: crypto.randomUUID(),
        type: "existing",
        url,
      })),
    );

    setBrochure(p.propertyBrochure || null);

    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setSlugTouched(false);

    setForm({
      propertyName: "",
      slug: "",
      listingType: "buy",
      propertyType: "",

      price: "",

      bedroom: "",
      bathroom: "",
      sizeSqft: "",

      address: "",
      subArea: "",

      developer: "",
      propertyDetails: "",

      highlights: "",
      featuresAmenities: "",
      nearby: "",
      extraHighlights: "",

      videoLink: "",
      googleMapUrl: "",

      propertyImages: [],
      propertyBrochure: null,
    });

    setImages([]);
    setBrochure(null);
  };

  const openDeleteConfirm = (property: Property) => {
    setSelectedProperty(property);
    setConfirmAction("delete");
    setConfirmOpen(true);
  };

  const openStatusConfirm = (property: Property) => {
    setSelectedProperty(property);
    setConfirmAction("status");
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedProperty(null);
    setConfirmAction(null);
  };

  const handleConfirm = async () => {
    if (!selectedProperty || !confirmAction) return;

    if (confirmAction === "delete") {
      await deleteProperty(selectedProperty._id);
    }

    if (confirmAction === "status") {
      await toggleStatus(selectedProperty);
    }

    closeConfirm();
  };

  /* ================= PAGINATED DATA ================= */

  const paginated = properties?.slice(
    (page - 1) * PAGE_LIMIT,
    page * PAGE_LIMIT,
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Property Management</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          + Add new property
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Property Name</th>
              <th className="p-3 text-left">Listing Type</th>
              <th className="p-3">Property Type</th>
              <th className="p-3">No. of beds</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              paginated?.map((p) => (
                <tr key={p._id} className="border-t border-gray-700">
                  <td className="p-3">{p.propertyName}</td>
                  <td className="p-3 capitalize">{p.listingType}</td>
                  <td className="p-3 capitalize">{p.propertyType}</td>
                  <td className="p-3 text-center">{p.bedroom}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        p.status ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {p.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2 justify-end">
                    <button
                      onClick={() => openView(p)}
                      className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openEdit(p)}
                      className="bg-blue-600 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openStatusConfirm(p)}
                      className="bg-yellow-600 px-2 py-1 rounded"
                    >
                      Status
                    </button>

                    <button
                      onClick={() => openDeleteConfirm(p)}
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
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(totalPages)]?.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-indigo-600" : "bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ================= Add Form MODAL ================= */}
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
                {/* PROPERTY NAME */}
                <input
                  placeholder="Property Name"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.propertyName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      propertyName: value,
                      slug: slugTouched ? prev.slug : generateSlug(value),
                    }));
                  }}
                />

                {/* PROPERTY TYPE */}
                <select
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.propertyType}
                  onChange={(e) =>
                    setForm({ ...form, propertyType: e.target.value })
                  }
                >
                  <option value="">Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Builder Floor">Builder Floor</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="FarmHouse">FarmHouse</option>
                </select>

                {/* SLUG */}
                <input
                  placeholder="Slug (auto-generated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.slug}
                  // onChange={(e) =>
                  //   setForm({ ...form, slug: generateSlug(e.target.value) })
                  // }
                  onChange={(e) => {
                    setSlugTouched(true);
                    setForm({ ...form, slug: generateSlug(e.target.value) });
                  }}
                />

                <select
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.listingType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      listingType: e.target.value as ListingType,
                    })
                  }
                >
                  <option value="buy">Buy</option>
                  {/* <option value="sell">Sell</option> */}
                  <option value="rent">Rent</option>
                  {/* <option value="offPlan">Off Plan</option> */}
                </select>

                <input
                  type="number"
                  placeholder="Bedrooms"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.bedroom}
                  onChange={(e) =>
                    setForm({ ...form, bedroom: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Bathrooms"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.bathroom}
                  onChange={(e) =>
                    setForm({ ...form, bathroom: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                  type="string"
                  placeholder="Size (sqft)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.sizeSqft}
                  onChange={(e) =>
                    setForm({ ...form, sizeSqft: e.target.value })
                  }
                />

                <input
                  type="string"
                  placeholder="Area"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.subArea}
                  onChange={(e) =>
                    setForm({ ...form, subArea: e.target.value })
                  }
                />

                <input
                  type="string"
                  placeholder="Address"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />

                <textarea
                  placeholder="Property Description"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2 md:col-span-2 min-h-[100px]"
                  value={form.propertyDetails}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      propertyDetails: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  placeholder="Highlights (comma separated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.highlights}
                  onChange={(e) =>
                    setForm({ ...form, highlights: e.target.value })
                  }
                />

                <textarea
                  placeholder="Features & Amenities (comma separated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.featuresAmenities}
                  onChange={(e) =>
                    setForm({ ...form, featuresAmenities: e.target.value })
                  }
                />

                <textarea
                  placeholder="Nearby (comma separated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.nearby}
                  onChange={(e) => setForm({ ...form, nearby: e.target.value })}
                />

                <textarea
                  placeholder="Extra Highlights (comma separated)"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.extraHighlights}
                  onChange={(e) =>
                    setForm({ ...form, extraHighlights: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Video / Reel Link"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.videoLink}
                  onChange={(e) =>
                    setForm({ ...form, videoLink: e.target.value })
                  }
                />

                <input
                  placeholder="Google Map URL"
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
                  value={form.googleMapUrl}
                  onChange={(e) =>
                    setForm({ ...form, googleMapUrl: e.target.value })
                  }
                />
              </div>

              <select
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                value={
                  typeof form.developer === "string"
                    ? form.developer
                    : form.developer?._id || ""
                }
                onChange={(e) =>
                  setForm({ ...form, developer: e.target.value })
                }
              >
                <option value="">Select Developer</option>
                {developers.map((dev) => (
                  <option key={dev._id} value={dev._id}>
                    {dev.name}
                  </option>
                ))}
              </select>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Property Images
                </label>

                <input
                  type="file"
                  className="cursor-pointer"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImages(e.target.files)}
                />

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={() => (dragItem.current = index)}
                      onDragEnter={() => (dragOverItem.current = index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      className="relative group border border-gray-700 rounded-lg overflow-hidden cursor-move"
                    >
                      <img
                        src={img.type === "existing" ? img.url : img.preview}
                        className="w-full h-24 object-cover"
                      />

                      {/* Badge for Type */}
                      <span
                        className={`absolute top-1 left-1 text-[10px] px-1 rounded font-bold uppercase ${
                          img.type === "existing"
                            ? "bg-blue-600/80"
                            : "bg-green-600/80"
                        }`}
                      >
                        {img.type === "existing" ? "Old" : "New"}
                      </span>

                      {/* Index Number */}
                      <span className="absolute bottom-1 right-1 bg-black/60 text-[10px] px-1.5 py-0.5 rounded text-white font-mono">
                        #{index + 1}
                      </span>

                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-1 right-1 bg-black/70 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Drag to reorder • Click ✕ to remove
                </p>
              </div>

              {/* BROCHURE UPLOAD */}
              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Property Brochure (PDF • Max 10MB)
                </label>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size > 10 * 1024 * 1024) {
                      alert("PDF must be less than 10MB");
                      return;
                    }

                    setBrochure(file);
                  }}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                />

                {brochure && (
                  <div className="mt-2 flex items-center justify-between bg-gray-800 border border-gray-700 rounded px-3 py-2">
                    <span className="text-sm text-gray-300 truncate">
                      📄{" "}
                      {typeof brochure === "string"
                        ? brochure.split("/").pop()
                        : brochure.name}
                    </span>
                    <div className="flex gap-2">
                      {typeof brochure === "string" && (
                        <a
                          href={toAssetUrl(brochure)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-indigo-400 hover:text-indigo-300"
                        >
                          View
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setBrochure(null)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
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

      {/* Confirmation Models */}
      {confirmOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md">
            <div className="p-5 border-b border-gray-800">
              <h3 className="text-lg font-semibold">
                {confirmAction === "delete"
                  ? "Delete Property"
                  : selectedProperty.status
                    ? "Deactivate Property"
                    : "Activate Property"}
              </h3>
            </div>

            <div className="p-5 text-sm text-gray-300 space-y-3">
              {confirmAction === "delete" ? (
                <p>
                  Are you sure you want to permanently delete
                  <span className="font-semibold text-white">
                    {" "}
                    {selectedProperty.propertyName}
                  </span>
                  ? This action cannot be undone.
                </p>
              ) : (
                <p>
                  Are you sure you want to{" "}
                  <span className="font-semibold text-white">
                    {selectedProperty.status ? "deactivate" : "activate"}
                  </span>{" "}
                  this property?
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-800">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 border border-gray-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded ${
                  confirmAction === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewOpen && viewProperty && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-5xl border border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-800 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  {viewProperty.propertyName || "Property Details"}
                </h2>
                <p className="text-xs text-gray-400 mt-1 break-all">
                  ID: {viewProperty._id} • Slug: {viewProperty.slug}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {viewLoading && (
                  <span className="text-xs text-gray-400">Refreshing…</span>
                )}
                <button
                  onClick={closeView}
                  className="px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-sm"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
              {/* Status & Quick stats */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    viewProperty.status ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {viewProperty.status ? "Active" : "Inactive"}
                </span>

                <span className="text-xs bg-gray-800 border border-gray-700 rounded px-2 py-1">
                  {viewProperty.listingType?.toUpperCase()}
                </span>

                <span className="text-xs bg-gray-800 border border-gray-700 rounded px-2 py-1">
                  {viewProperty.propertyType}
                </span>

                <span className="text-xs text-gray-300">
                  ₹ {Number(viewProperty.price || 0).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Images */}
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-semibold text-gray-200">
                  Property Images ({viewProperty.propertyImages?.length || 0})
                </h3>

                {viewProperty.propertyImages?.length ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {viewProperty.propertyImages.map((imgUrl, idx) => (
                      <a
                        key={imgUrl + idx}
                        href={toAssetUrl(imgUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="relative block rounded-lg overflow-hidden border border-gray-800 bg-gray-800"
                      >
                        <img
                          src={toAssetUrl(imgUrl)}
                          alt={`Property image ${idx + 1}`}
                          className="w-full h-28 sm:h-32 md:h-36 object-cover"
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 bg-gray-800 border border-gray-700 rounded p-3">
                    No images attached.
                  </div>
                )}
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow label="Address" value={viewProperty.address} />
                <InfoRow label="Sub Area" value={viewProperty.subArea} />
                <InfoRow
                  label="Developer"
                  value={viewProperty.developer?.name || "N/A"}
                />
                <InfoRow
                  label="Bedrooms"
                  value={String(viewProperty.bedroom)}
                />
                <InfoRow
                  label="Bathrooms"
                  value={String(viewProperty.bathroom)}
                />
                <InfoRow
                  label="Size (sqft)"
                  value={String(viewProperty.sizeSqft)}
                />
                <InfoRow
                  label="Created"
                  value={new Date(viewProperty.createdAt).toLocaleString()}
                />
                <InfoRow
                  label="Updated"
                  value={new Date(viewProperty.updatedAt).toLocaleString()}
                />
              </div>

              {/* Property Details */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-200 mb-2">
                  Property Details
                </h3>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {viewProperty.propertyDetails || "—"}
                  </p>
                </div>
              </div>

              {/* Arrays (highlights, amenities, nearby, extraHighlights) */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <TagList title="Highlights" items={viewProperty.highlights} />
                <TagList
                  title="Features & Amenities"
                  items={viewProperty.featuresAmenities}
                />
                <TagList title="Nearby" items={viewProperty.nearby} />
                <TagList
                  title="Extra Highlights"
                  items={viewProperty.extraHighlights}
                />
              </div>

              {/* Links */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <LinkRow
                  title="Video Link"
                  url={viewProperty.videoLink || ""}
                />
                <LinkRow
                  title="Google Map URL"
                  url={viewProperty.googleMapUrl || ""}
                />
              </div>

              {/* Brochure */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-200 mb-2">
                  Brochure (PDF)
                </h3>
                {viewProperty.propertyBrochure ? (
                  <a
                    href={toAssetUrl(viewProperty.propertyBrochure)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm hover:bg-gray-700"
                  >
                    📄 Open brochure
                    <span className="text-xs text-gray-400 break-all">
                      {viewProperty.propertyBrochure}
                    </span>
                  </a>
                ) : (
                  <div className="text-xs text-gray-400 bg-gray-800 border border-gray-700 rounded p-3">
                    No brochure uploaded.
                  </div>
                )}
              </div>
            </div>

            {/* Footer actions (optional quick actions) */}
            <div className="p-5 border-t border-gray-800 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => {
                  closeView();
                  openEdit(viewProperty);
                }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => openStatusConfirm(viewProperty)}
                className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm"
              >
                Toggle Status
              </button>

              <button
                onClick={() => openDeleteConfirm(viewProperty)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
              >
                Delete
              </button>

              <button
                onClick={closeView}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm text-gray-100 mt-1 break-words">
      {value?.trim() ? value : "—"}
    </p>
  </div>
);

const TagList = ({ title, items }: { title: string; items?: string[] }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <p className="text-xs text-gray-400 mb-2">{title}</p>
    {items?.length ? (
      <div className="flex flex-wrap gap-2">
        {items.map((t, i) => (
          <span
            key={t + i}
            className="text-xs bg-gray-900/60 border border-gray-700 px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-200">—</p>
    )}
  </div>
);

const LinkRow = ({ title, url }: { title: string; url: string }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <p className="text-xs text-gray-400 mb-2">{title}</p>
    {url?.trim() ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-indigo-300 hover:text-indigo-200 break-all underline"
      >
        {url}
      </a>
    ) : (
      <p className="text-sm text-gray-200">—</p>
    )}
  </div>
);
