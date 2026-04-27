import { useState, useRef } from "react";

// ─── Image Item Type ──────────────────────────────────────────────────────────
type ImageItem =
  | { id: string; type: "existing"; url: string }
  | { id: string; type: "new"; file: File; preview: string };
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// ─── API Setup ────────────────────────────────────────────────────────────────
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ─── Types ────────────────────────────────────────────────────────────────────
interface Developer {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  coverImage?: string;
  shortDescription: string;
  fullDescription?: string;
  website?: string;
  stats?: { establishedYear?: number; totalProjects?: number };
  highlights?: string[];
  amenities?: string[];
  certifications?: string[];
  images?: string[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
  isFeatured: boolean;
  isActive: boolean;
  priority?: number;
  projects?: {
    _id: string;
    title: string;
    slug: string;
    coverImage?: string;
    location?: string;
  }[];
  faqs?: { question: string; answer: string }[];
  brochure?: string;
  createdAt: string;
}

interface Property {
  _id: string;
  propertyName: string;
  slug: string;
  listingType: "buy" | "rent";
  propertyType: string;
  price: number;
  bedroom: number;
  bathroom: number;
  sizeSqft: string;
  address: string;
  developerName: string;
  status: boolean;
}

interface DeveloperFormState {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  website: string;
  highlights: string;
  amenities: string;
  certifications: string;
  logo: string;
  coverImage: string;
  brochure: string;
  establishedYear: string;
  totalProjects: string;
  priority: string;
  isFeatured: boolean;
  isActive: boolean;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  // file uploads
  logoFile?: File | null;
  coverImageFile?: File | null;
  brochureFile?: File | null;
  imageFiles?: File[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const generateSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toAssetUrl = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

const fmt = (n?: number) => (n !== undefined ? n.toLocaleString() : "—");

// ─── API Calls ────────────────────────────────────────────────────────────────
const fetchDevelopers = () =>
  api.get("/api/developers?limit=100").then((r) => r.data.data as Developer[]);
const fetchProperties = () =>
  api.get("/api/properties?limit=100").then((r) => r.data.data as Property[]);
const fetchDeveloperStats = () =>
  api.get("/api/developers/stats/overview").then((r) => r.data.data);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DeveloperManagement() {
  const qc = useQueryClient();

  const { data: developers = [], isLoading } = useQuery({
    queryKey: ["developers"],
    queryFn: fetchDevelopers,
  });
  const { data: stats } = useQuery({
    queryKey: ["developer-stats"],
    queryFn: fetchDeveloperStats,
  });
  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  console.log("developers", developers);

  const [tab, setTab] = useState<"developers" | "properties">("developers");
  const [search, setSearch] = useState("");
  const [filterFeatured, setFilterFeatured] = useState<"" | "true" | "false">(
    "",
  );
  const [filterActive, setFilterActive] = useState<"" | "true" | "false">("");

  // Modals
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState<Developer | null>(null);
  const [viewDev, setViewDev] = useState<Developer | null>(null);
  const [toDelete, setToDelete] = useState<Developer | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);

  // ─── Image manager state ─────────────────────────────────────────────────
  const [images, setImages] = useState<ImageItem[]>([]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    const newImgs: ImageItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      type: "new",
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImgs]);
  };

  const removeImage = (id: string) =>
    setImages((prev) => prev.filter((img) => img.id !== id));

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const list = [...images];
    const dragged = list.splice(dragItem.current, 1)[0];
    list.splice(dragOverItem.current, 0, dragged);
    dragItem.current = null;
    dragOverItem.current = null;
    setImages(list);
  };

  const emptyForm = (): DeveloperFormState => ({
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    website: "",
    highlights: "",
    amenities: "",
    certifications: "",
    logo: "",
    coverImage: "",
    brochure: "",
    establishedYear: "",
    totalProjects: "",
    priority: "0",
    isFeatured: false,
    isActive: true,
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    logoFile: null,
    coverImageFile: null,
    brochureFile: null,
  });

  const [form, setForm] = useState<DeveloperFormState>(emptyForm());

  // ─── Mutations ──────────────────────────────────────────────────────────────
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["developers"] });
    qc.invalidateQueries({ queryKey: ["developer-stats"] });
  };

  const buildFormData = (f: DeveloperFormState): FormData => {
    const fd = new FormData();
    fd.append("name", f.name);
    fd.append("slug", f.slug);
    fd.append("shortDescription", f.shortDescription);
    if (f.fullDescription) fd.append("fullDescription", f.fullDescription);
    if (f.website) fd.append("website", f.website);
    if (f.highlights) fd.append("highlights", f.highlights);
    if (f.amenities) fd.append("amenities", f.amenities);
    if (f.certifications) fd.append("certifications", f.certifications);
    if (f.coverImage) fd.append("coverImage", f.coverImage);
    if (f.establishedYear)
      fd.append("stats[establishedYear]", f.establishedYear);
    if (f.totalProjects) fd.append("stats[totalProjects]", f.totalProjects);
    fd.append("priority", f.priority || "0");
    fd.append("isFeatured", String(f.isFeatured));
    fd.append("isActive", String(f.isActive));
    if (f.facebook) fd.append("socialLinks[facebook]", f.facebook);
    if (f.instagram) fd.append("socialLinks[instagram]", f.instagram);
    if (f.linkedin) fd.append("socialLinks[linkedin]", f.linkedin);
    if (f.twitter) fd.append("socialLinks[twitter]", f.twitter);
    if (f.metaTitle) fd.append("seo[metaTitle]", f.metaTitle);
    if (f.metaDescription) fd.append("seo[metaDescription]", f.metaDescription);
    if (f.keywords) fd.append("seo[keywords]", f.keywords);
    if (f.logoFile) fd.append("logo", f.logoFile);
    if (f.coverImageFile) fd.append("coverImage", f.coverImageFile);
    if (f.brochureFile) fd.append("brochure", f.brochureFile);

    // ── Image order: append new files in order, send imageOrder manifest ──
    const imageOrder: { type: "existing" | "new"; url?: string }[] = [];
    images.forEach((img) => {
      if (img.type === "existing") {
        imageOrder.push({ type: "existing", url: img.url });
      } else {
        imageOrder.push({ type: "new" });
        fd.append("images", img.file);
      }
    });
    if (images.length > 0) fd.append("imageOrder", JSON.stringify(imageOrder));

    return fd;
  };

  const createMutation = useMutation({
    mutationFn: (fd: FormData) =>
      axios.post(`${BASE_URL}/api/developers`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      toast.success("Developer created");
      invalidate();
      closeForm();
    },
    onError: (e: any) => {
      console.log(e);
      toast.error(e.response?.data?.message || "Create failed");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, fd }: { id: string; fd: FormData }) =>
      axios.put(`${BASE_URL}/api/developers/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      toast.success("Developer updated");
      invalidate();
      closeForm();
    },
    onError: (e: any) =>
      toast.error(e.response?.data?.message || "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/developers/${id}`),
    onSuccess: () => {
      toast.success("Developer deleted");
      invalidate();
      setConfirmOpen(false);
      setToDelete(null);
    },
    onError: () => toast.error("Delete failed"),
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: (id: string) =>
      api.patch(`/api/developers/${id}/toggle-featured`),
    onSuccess: () => invalidate(),
    onError: () => toast.error("Failed"),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: (id: string) =>
      api.patch(`/api/developers/${id}/toggle-active`),
    onSuccess: () => invalidate(),
    onError: () => toast.error("Failed"),
  });

  // ─── Form Helpers ───────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditing(null);
    setSlugTouched(false);
    setForm(emptyForm());
    setFormOpen(true);
  };

  const openEdit = (d: Developer) => {
    setEditing(d);
    setSlugTouched(true);
    // seed image manager with existing images
    setImages(
      (d.images ?? []).map((url) => ({
        id: crypto.randomUUID(),
        type: "existing" as const,
        url,
      })),
    );
    setForm({
      name: d.name,
      slug: d.slug,
      shortDescription: d.shortDescription,
      fullDescription: d.fullDescription || "",
      website: d.website || "",
      highlights: d.highlights?.join(", ") || "",
      amenities: d.amenities?.join(", ") || "",
      certifications: d.certifications?.join(", ") || "",
      logo: d.logo || "",
      coverImage: d.coverImage || "",
      brochure: d.brochure || "",
      establishedYear: d.stats?.establishedYear?.toString() || "",
      totalProjects: d.stats?.totalProjects?.toString() || "",
      priority: d.priority?.toString() || "0",
      isFeatured: d.isFeatured,
      isActive: d.isActive,
      facebook: d.socialLinks?.facebook || "",
      instagram: d.socialLinks?.instagram || "",
      linkedin: d.socialLinks?.linkedin || "",
      twitter: d.socialLinks?.twitter || "",
      metaTitle: d.seo?.metaTitle || "",
      metaDescription: d.seo?.metaDescription || "",
      keywords: d.seo?.keywords?.join(", ") || "",
      logoFile: null,
      coverImageFile: null,
      brochureFile: null,
      imageFiles: [],
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setSlugTouched(false);
    setForm(emptyForm());
    setImages([]);
  };

  const handleSubmit = () => {
    if (!form.name || !form.slug || !form.shortDescription) {
      toast.error("Name, slug, and short description are required");
      return;
    }
    const fd = buildFormData(form);
    if (editing) updateMutation.mutate({ id: editing._id, fd });
    else createMutation.mutate(fd);
  };

  // ─── Filtered Data ──────────────────────────────────────────────────────────
  const filteredDevelopers = developers.filter((d) => {
    const matchSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.slug.includes(search.toLowerCase());
    const matchFeatured =
      filterFeatured === "" || String(d.isFeatured) === filterFeatured;
    const matchActive =
      filterActive === "" || String(d.isActive) === filterActive;
    return matchSearch && matchFeatured && matchActive;
  });

  const filteredProperties = properties.filter(
    (p) =>
      !search ||
      p.propertyName.toLowerCase().includes(search.toLowerCase()) ||
      p.developerName.toLowerCase().includes(search.toLowerCase()),
  );

  const isBusy = createMutation.isPending || updateMutation.isPending;

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      className="min-h-screen bg-[#0d0f14] text-white"
    >
      {/* ── Header ── */}
      <div className="border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Developer & Property Hub
          </h1>
          <p className="text-xs text-white/40 mt-0.5">
            Manage real estate developers and listings
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add Developer
        </button>
      </div>

      {/* ── Stats ── */}
      {stats && (
        <div className="px-8 py-5 grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            {
              label: "Total",
              value: stats.totalDevelopers,
              color: "text-white",
            },
            {
              label: "Active",
              value: stats.activeDevelopers,
              color: "text-emerald-400",
            },
            {
              label: "Featured",
              value: stats.featuredDevelopers,
              color: "text-amber-400",
            },
            {
              label: "Inactive",
              value: stats.inactiveDevelopers,
              color: "text-red-400",
            },
            {
              label: "Projects",
              value: stats.totalProjects,
              color: "text-sky-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/4 border border-white/8 rounded-xl p-4"
            >
              <p className="text-xs text-white/40 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{fmt(s.value)}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="px-8 flex gap-1 border-b border-white/5 hidden">
        {(["developers"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${tab === t ? "border-indigo-500 text-white" : "border-transparent text-white/40 hover:text-white/70"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="px-8 py-4 flex gap-3 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 w-56 focus:outline-none focus:border-indigo-500"
        />
        {tab === "developers" && (
          <>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Featured</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </>
        )}
      </div>

      {/* ── Table ── */}
      <div className="px-8 pb-10">
        {tab === "developers" ? (
          <div className="rounded-xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/4 text-white/50 text-xs uppercase tracking-wide">
                <tr>
                  <th className="p-4 text-left">Developer</th>
                  <th className="p-4 text-left hidden md:table-cell">
                    Description
                  </th>
                  <th className="p-4 text-center hidden lg:table-cell">
                    Projects
                  </th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4 text-center">Active</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-white/30">
                      Loading…
                    </td>
                  </tr>
                ) : filteredDevelopers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-white/30">
                      No developers found
                    </td>
                  </tr>
                ) : (
                  filteredDevelopers.map((d, i) => (
                    <tr
                      key={d._id}
                      className={`border-t border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "" : "bg-white/1"}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {d.logo ? (
                            <img
                              src={toAssetUrl(d.logo)}
                              className="w-10 h-10 rounded-lg object-contain bg-white/10 p-1 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-indigo-900/50 flex items-center justify-center text-indigo-400 font-bold text-sm flex-shrink-0">
                              {d.name[0]}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white">{d.name}</p>
                            <p className="text-xs text-white/40">{d.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <p className="text-white/60 text-xs max-w-xs truncate">
                          {d.shortDescription}
                        </p>
                      </td>
                      <td className="p-4 text-center hidden lg:table-cell">
                        <span className="text-white/60">
                          {d.projects?.length ?? 0}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Toggle
                          checked={d.isFeatured}
                          onChange={() => toggleFeaturedMutation.mutate(d._id)}
                          color="amber"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <Toggle
                          checked={d.isActive}
                          onChange={() => toggleActiveMutation.mutate(d._id)}
                          color="emerald"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-end">
                          <Btn
                            onClick={() => {
                              setViewDev(d);
                              setViewOpen(true);
                            }}
                            variant="ghost"
                          >
                            View
                          </Btn>
                          <Btn onClick={() => openEdit(d)} variant="blue">
                            Edit
                          </Btn>
                          <Btn
                            onClick={() => {
                              setToDelete(d);
                              setConfirmOpen(true);
                            }}
                            variant="red"
                          >
                            Delete
                          </Btn>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/4 text-white/50 text-xs uppercase tracking-wide">
                <tr>
                  <th className="p-4 text-left">Property</th>
                  <th className="p-4 text-left hidden md:table-cell">Type</th>
                  <th className="p-4 text-left hidden md:table-cell">
                    Developer
                  </th>
                  <th className="p-4 text-right hidden lg:table-cell">Price</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-white/30">
                      No properties found
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((p, i) => (
                    <tr
                      key={p._id}
                      className={`border-t border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "" : "bg-white/1"}`}
                    >
                      <td className="p-4">
                        <p className="font-medium text-white">
                          {p.propertyName}
                        </p>
                        <p className="text-xs text-white/40">{p.address}</p>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${p.listingType === "buy" ? "bg-sky-900/50 text-sky-400" : "bg-purple-900/50 text-purple-400"}`}
                        >
                          {p.listingType} · {p.propertyType}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell text-white/60">
                        {p.developerName}
                      </td>
                      <td className="p-4 text-right hidden lg:table-cell text-white/80">
                        AED {fmt(p.price)}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${p.status ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400"}`}
                        >
                          {p.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════
          VIEW MODAL
      ══════════════════════════════════════════════════════════ */}
      {viewOpen && viewDev && (
        <Modal
          title={viewDev.name || "Developer Details"}
          onClose={() => setViewOpen(false)}
          wide
        >
          <div className="flex flex-col gap-8 py-2">
            {/* SECTION 1: IDENTITY & HEADER */}
            <section className="flex flex-col md:flex-row gap-6 pb-6 border-b border-white/10">
              <div className="relative group">
                {viewDev.logo ? (
                  <img
                    src={viewDev.logo}
                    className="h-24 w-24 object-contain bg-white/5 rounded-2xl p-4 border border-white/10"
                    alt="Logo"
                  />
                ) : (
                  <div className="h-24 w-24 bg-white/5 rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-xs text-white/40 text-center p-2">
                    No Logo
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {viewDev.name || (
                      <span className="text-red-400/50 italic">
                        Unnamed Developer
                      </span>
                    )}
                  </h2>
                  <p className="text-indigo-400 text-sm">ID: {viewDev._id}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${viewDev.isFeatured ? "bg-amber-500/10 border-amber-500/50 text-amber-500" : "bg-white/5 border-white/10 text-white/30"}`}
                  >
                    {viewDev.isFeatured ? "★ Featured" : "Standard Listing"}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${viewDev.isActive ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-rose-500/10 border-rose-500/50 text-rose-400"}`}
                  >
                    {viewDev.isActive ? "● Active" : "○ Inactive"}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full border bg-blue-500/10 border-blue-500/50 text-blue-400">
                    Priority: {viewDev.priority ?? "0"}
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 2: GRID INFO (Stats, Links, SEO) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Info & Stats */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">
                  General Information
                </h3>
                <div className="bg-white/5 rounded-xl p-4 space-y-3 border border-white/5">
                  <InfoRow
                    label="Slug"
                    value={viewDev.slug}
                    isMissing={!viewDev.slug}
                  />
                  <InfoRow
                    label="Website"
                    value={viewDev.website}
                    isMissing={!viewDev.website}
                    isLink
                  />
                  <InfoRow
                    label="Established"
                    value={viewDev.stats?.establishedYear}
                    isMissing={!viewDev.stats?.establishedYear}
                  />
                  <InfoRow
                    label="Total Projects"
                    value={viewDev.stats?.totalProjects}
                  />
                  <InfoRow
                    label="Brochure"
                    value={viewDev.brochure}
                    isMissing={!viewDev.brochure}
                    isLink
                  />
                </div>
              </div>

              {/* SEO & Metadata */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/40">
                  SEO & Discoverability
                </h3>
                <div className="bg-white/5 rounded-xl p-4 space-y-3 border border-white/5">
                  <InfoRow
                    label="Meta Title"
                    value={viewDev.seo?.metaTitle}
                    isMissing={!viewDev.seo?.metaTitle}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-white/40">Keywords</p>
                    <div className="flex flex-wrap gap-1">
                      {viewDev.seo?.metaDescription ? (
                        <p className="text-sm text-white/80">
                          {viewDev.seo.metaDescription}
                        </p>
                      ) : (
                        <span className="text-xs text-rose-400/50 italic">
                          None defined
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-white/40">Keywords</p>
                    <div className="flex flex-wrap gap-1">
                      {viewDev.seo?.keywords &&
                      viewDev.seo?.keywords?.length > 0 ? (
                        viewDev.seo.keywords.map((k, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70"
                          >
                            {k}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-rose-400/50 italic">
                          None defined
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: DESCRIPTIONS */}
            <section className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
                  Short Description
                </p>
                <p
                  className={`${viewDev.shortDescription ? "text-white/80" : "text-rose-400/50 italic"} text-sm leading-relaxed`}
                >
                  {viewDev.shortDescription ||
                    "No short description provided. This is used for preview cards."}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
                  Full Description
                </p>
                <p
                  className={`${viewDev.fullDescription ? "text-white/70" : "text-rose-400/50 italic"} text-sm leading-relaxed`}
                >
                  {viewDev.fullDescription ||
                    "Detailed description is missing. Consider adding one for the main developer page."}
                </p>
              </div>
            </section>

            {/* SECTION 4: TAGS (Amenities & Highlights) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                <TagList title="Highlights" items={viewDev.highlights || []} />
              </div>
              <div className="bg-sky-500/5 border border-sky-500/10 p-4 rounded-xl">
                <TagList title="Amenities" items={viewDev.amenities || []} />
              </div>
            </section>

            {/* SECTION 5: MEDIA GALLERY */}
            <section>
              <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
                Gallery Images
              </p>
              {viewDev.images && viewDev.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {viewDev.images.map((img, i) => (
                    <div
                      key={i}
                      className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5"
                    >
                      <img
                        src={toAssetUrl(img)}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-white/30">
                  <p>No gallery images uploaded</p>
                </div>
              )}
            </section>

            {/* SECTION 6: LINKED PROJECTS */}
            <section className="pb-6">
              <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
                Linked Projects ({viewDev.projects?.length || 0})
              </p>
              <div className="flex flex-wrap gap-2">
                {viewDev.projects && viewDev.projects?.length > 0 ? (
                  viewDev.projects.map((p) => (
                    <span
                      key={p._id}
                      className="flex items-center gap-2 text-xs bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-2 rounded-xl"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      {p.title}
                    </span>
                  ))
                ) : (
                  <div className="text-sm text-rose-400/50 italic bg-rose-400/5 border border-rose-400/10 px-4 py-2 rounded-lg w-full">
                    No projects linked to this developer.
                  </div>
                )}
              </div>
            </section>
          </div>
        </Modal>
      )}

      {/* ══════════════════════════════════════════════════════════
          DELETE CONFIRM
      ══════════════════════════════════════════════════════════ */}
      {confirmOpen && toDelete && (
        <Modal
          title="Confirm Delete"
          onClose={() => {
            setConfirmOpen(false);
            setToDelete(null);
          }}
          actions={
            <>
              <Btn
                onClick={() => {
                  setConfirmOpen(false);
                  setToDelete(null);
                }}
                variant="ghost"
              >
                Cancel
              </Btn>
              <Btn
                onClick={() => deleteMutation.mutate(toDelete._id)}
                variant="red"
              >
                Delete
              </Btn>
            </>
          }
        >
          <p className="text-white/70 text-sm">
            Are you sure you want to delete{" "}
            <span className="text-white font-semibold">{toDelete.name}</span>?
            This action cannot be undone.
          </p>
        </Modal>
      )}

      {/* ══════════════════════════════════════════════════════════
          FORM MODAL
      ══════════════════════════════════════════════════════════ */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#13151c] rounded-2xl w-full max-w-5xl border border-white/10 flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-6 border-b border-white/8 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-lg font-semibold">
                  {editing ? "Edit Developer" : "Add New Developer"}
                </h2>
                <p className="text-xs text-white/40 mt-0.5">
                  Fields marked * are required
                </p>
              </div>
              <button
                onClick={closeForm}
                className="text-white/40 hover:text-white text-xl transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-8">
              {/* ── Basic Info ── */}
              <Section title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Developer Name *">
                    <input
                      value={form.name}
                      onChange={(e) => {
                        const v = e.target.value;
                        setForm((p) => ({
                          ...p,
                          name: v,
                          slug: slugTouched ? p.slug : generateSlug(v),
                        }));
                      }}
                      placeholder="e.g. Emaar Properties"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Slug *" hint="Auto-generated from name">
                    <input
                      value={form.slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setForm((p) => ({
                          ...p,
                          slug: generateSlug(e.target.value),
                        }));
                      }}
                      placeholder="emaar-properties"
                      className={`${inputCls} font-mono text-indigo-300`}
                    />
                  </Field>
                  <Field label="Short Description *" className="md:col-span-2">
                    <textarea
                      value={form.shortDescription}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          shortDescription: e.target.value,
                        }))
                      }
                      placeholder="Brief description (max 300 chars)"
                      rows={2}
                      maxLength={300}
                      className={`${inputCls} resize-none`}
                    />
                    <p className="text-right text-xs text-white/30 mt-1">
                      {form.shortDescription.length}/300
                    </p>
                  </Field>
                  <Field label="Full Description" className="md:col-span-2">
                    <textarea
                      value={form.fullDescription}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          fullDescription: e.target.value,
                        }))
                      }
                      placeholder="Detailed description (supports HTML/Markdown)"
                      rows={4}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                  <Field label="Website URL">
                    <input
                      value={form.website}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, website: e.target.value }))
                      }
                      placeholder="https://emaar.com"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Priority">
                    <input
                      type="number"
                      value={form.priority}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, priority: e.target.value }))
                      }
                      placeholder="0"
                      className={inputCls}
                    />
                  </Field>
                  <div className="flex items-center gap-6 md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.isFeatured}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            isFeatured: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 accent-amber-500"
                      />
                      <span className="text-sm text-white/70">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, isActive: e.target.checked }))
                        }
                        className="w-4 h-4 accent-emerald-500"
                      />
                      <span className="text-sm text-white/70">Active</span>
                    </label>
                  </div>
                </div>
              </Section>

              {/* ── Stats ── */}
              <Section title="Stats">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Established Year">
                    <input
                      type="number"
                      value={form.establishedYear}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          establishedYear: e.target.value,
                        }))
                      }
                      placeholder="e.g. 1997"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Total Projects">
                    <input
                      type="number"
                      value={form.totalProjects}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          totalProjects: e.target.value,
                        }))
                      }
                      placeholder="e.g. 150"
                      className={inputCls}
                    />
                  </Field>
                </div>
              </Section>

              {/* ── Media ── */}
              <Section title="Media & Assets">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Logo (URL or upload)">
                    <div className="space-y-2">
                      <input
                        value={form.logo}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            logo: e.target.value,
                            logoFile: null,
                          }))
                        }
                        placeholder="https://... or upload below"
                        className={inputCls}
                      />
                      <FileInput
                        label="Upload Logo"
                        accept="image/*"
                        onChange={(f) =>
                          setForm((p) => ({
                            ...p,
                            logoFile: f,
                            logo: f ? f.name : p.logo,
                          }))
                        }
                      />
                      {form.logo && !form.logoFile && (
                        <img
                          src={toAssetUrl(form.logo)}
                          className="h-14 object-contain bg-white/5 rounded-lg p-2"
                        />
                      )}
                      {form.logoFile && (
                        <p className="text-xs text-indigo-400">
                          {form.logoFile.name}
                        </p>
                      )}
                    </div>
                  </Field>
                  <div className="hidden">
                    <Field label="Cover Image (URL or upload)">
                      <div className="space-y-2">
                        <input
                          value={form.coverImage}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              coverImage: e.target.value,
                              coverImageFile: null,
                            }))
                          }
                          placeholder="https://..."
                          className={inputCls}
                        />
                        <FileInput
                          label="Upload Cover"
                          accept="image/*"
                          onChange={(f) =>
                            setForm((p) => ({
                              ...p,
                              coverImageFile: f,
                              coverImage: f ? f.name : p.coverImage,
                            }))
                          }
                        />
                        {form.coverImageFile && (
                          <p className="text-xs text-indigo-400">
                            {form.coverImageFile.name}
                          </p>
                        )}
                      </div>
                    </Field>
                  </div>
                  <Field
                    label="Brochure (PDF upload)"
                    className="md:col-span-2"
                  >
                    <FileInput
                      label="Upload Brochure (PDF)"
                      accept=".pdf"
                      onChange={(f) =>
                        setForm((p) => ({ ...p, brochureFile: f }))
                      }
                    />
                    {form.brochureFile && (
                      <p className="text-xs text-indigo-400 mt-1">
                        {form.brochureFile.name}
                      </p>
                    )}
                    {editing?.brochure && !form.brochureFile && (
                      <p className="text-xs text-white/40 mt-1">
                        Current: {editing.brochure.split("/").pop()}
                      </p>
                    )}
                  </Field>
                </div>

                {/* ── Gallery Image Manager ── */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-white/50 font-medium">
                      Gallery Images
                    </label>
                    <span className="text-xs text-white/30">
                      {images.length} image{images.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {/* Upload trigger */}
                  <label className="flex items-center gap-2 text-xs border border-dashed border-white/20 rounded-lg px-3 py-2.5 text-white/40 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer w-full">
                    🖼 Add images (multi-select)
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleImages(e.target.files)}
                    />
                  </label>
                  {/* Drag grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-3">
                      {images.map((img, index) => (
                        <div
                          key={img.id}
                          draggable
                          onDragStart={() => (dragItem.current = index)}
                          onDragEnter={() => (dragOverItem.current = index)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => e.preventDefault()}
                          className="relative group border border-white/10 rounded-lg overflow-hidden cursor-move select-none"
                        >
                          <img
                            src={
                              img.type === "existing"
                                ? toAssetUrl(img.url)
                                : img.preview
                            }
                            className="w-full h-20 object-cover"
                          />
                          {/* Type badge */}
                          <div className="absolute top-1 left-1 flex gap-1">
                            <span
                              className={` text-[9px] px-1 py-0.5 rounded font-bold uppercase leading-none ${img.type === "existing" ? "bg-blue-600/90 text-white" : "bg-emerald-600/90 text-white"}`}
                            >
                              {img.type === "existing" ? "old" : "new"}
                            </span>
                            {index === 0 && (
                              <span
                                className={` text-[9px] px-1 py-0.5 rounded font-bold uppercase leading-none bg-yellow-500/90 text-white`}
                              >
                                {"cover"}
                              </span>
                            )}
                          </div>

                          {/* Index */}
                          <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] px-1.5 py-0.5 rounded text-white font-mono leading-none">
                            #{index + 1}
                          </span>
                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeImage(img.id)}
                            className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white text-[10px] w-5 h-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-white/25 mt-2">
                    Drag to reorder · Click ✕ to remove · Blue = existing, Green
                    = newly added
                  </p>
                </div>
              </Section>

              {/* ── Arrays ── */}
              <Section
                title="Lists & Tags"
                subtitle="Enter comma-separated values"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Highlights">
                    <textarea
                      value={form.highlights}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, highlights: e.target.value }))
                      }
                      placeholder="Award-winning, 25+ years experience, ISO certified"
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                  <Field label="Amenities">
                    <textarea
                      value={form.amenities}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, amenities: e.target.value }))
                      }
                      placeholder="Swimming pool, Gym, Parking"
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                  <Field label="Certifications">
                    <textarea
                      value={form.certifications}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          certifications: e.target.value,
                        }))
                      }
                      placeholder="ISO 9001, Green Building, LEED"
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                </div>
                {/* Preview tags */}
                {form.highlights && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {form.highlights
                      .split(",")
                      .map((h) => h.trim())
                      .filter(Boolean)
                      .map((h, i) => (
                        <span
                          key={i}
                          className="text-xs bg-indigo-900/40 border border-indigo-700/30 text-indigo-300 px-2 py-0.5 rounded"
                        >
                          {h}
                        </span>
                      ))}
                  </div>
                )}
              </Section>

              {/* ── Social Links ── */}
              <Section title="Social Links">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(
                    ["facebook", "instagram", "linkedin", "twitter"] as const
                  ).map((k) => (
                    <Field
                      key={k}
                      label={k.charAt(0).toUpperCase() + k.slice(1)}
                    >
                      <input
                        value={form[k]}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, [k]: e.target.value }))
                        }
                        placeholder={`https://${k}.com/...`}
                        className={inputCls}
                      />
                    </Field>
                  ))}
                </div>
              </Section>

              {/* ── SEO ── */}
              <Section title="SEO">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Meta Title">
                    <input
                      value={form.metaTitle}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, metaTitle: e.target.value }))
                      }
                      placeholder="Emaar Properties | Dubai Real Estate"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Keywords (comma-separated)">
                    <input
                      value={form.keywords}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, keywords: e.target.value }))
                      }
                      placeholder="real estate, dubai, luxury, villas"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Meta Description" className="md:col-span-2">
                    <textarea
                      value={form.metaDescription}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          metaDescription: e.target.value,
                        }))
                      }
                      placeholder="Brief SEO-friendly description"
                      rows={2}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                </div>
                {form.keywords && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {form.keywords
                      .split(",")
                      .map((k) => k.trim())
                      .filter(Boolean)
                      .map((k, i) => (
                        <span
                          key={i}
                          className="text-xs bg-sky-900/40 border border-sky-700/30 text-sky-300 px-2 py-0.5 rounded"
                        >
                          {k}
                        </span>
                      ))}
                  </div>
                )}
              </Section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/8 flex justify-end gap-3 flex-shrink-0">
              <Btn onClick={closeForm} variant="ghost">
                Cancel
              </Btn>
              <Btn onClick={handleSubmit} variant="primary" disabled={isBusy}>
                {isBusy
                  ? "Saving…"
                  : editing
                    ? "Update Developer"
                    : "Create Developer"}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-indigo-500 transition-colors";

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
          {title}
        </h3>
        {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline gap-2 mb-1.5">
        <label className="text-xs text-white/50 font-medium">{label}</label>
        {hint && <span className="text-xs text-indigo-400/60">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function FileInput({
  label,
  accept,
  onChange,
}: {
  label: string;
  accept: string;
  onChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="text-xs border border-dashed border-white/20 rounded-lg px-3 py-2 text-white/40 hover:border-indigo-500 hover:text-indigo-400 transition-colors w-full text-left"
      >
        📎 {label}
      </button>
    </>
  );
}

function Toggle({
  checked,
  onChange,
  color,
}: {
  checked: boolean;
  onChange: () => void;
  color: "amber" | "emerald";
}) {
  const on = color === "amber" ? "bg-amber-500" : "bg-emerald-500";
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex w-9 h-5 rounded-full transition-colors ${checked ? on : "bg-white/15"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${checked ? "translate-x-4" : ""}`}
      />
    </button>
  );
}

function Btn({
  onClick,
  children,
  variant,
  disabled,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  variant: "ghost" | "blue" | "red" | "primary";
  disabled?: boolean;
}) {
  const cls = {
    ghost:
      "border border-white/15 text-white/60 hover:text-white hover:border-white/30",
    blue: "bg-blue-600 hover:bg-blue-500 text-white",
    red: "bg-red-600 hover:bg-red-500 text-white",
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50",
  }[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${cls}`}
    >
      {children}
    </button>
  );
}

function Modal({
  title,
  onClose,
  children,
  actions,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-[#13151c] rounded-2xl border border-white/10 w-full ${wide ? "max-w-5xl" : "max-w-lg"}`}
      >
        <div className="p-5 border-b border-white/8 flex justify-between items-center">
          <h3 className="font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>
        {actions && (
          <div className="p-5 border-t border-white/8 flex justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

const InfoRow = ({
  label,
  value,
  isMissing,
  isLink,
  mono,
}: {
  label: string;
  value?: string | number;
  isMissing?: boolean;
  isLink?: boolean;
  mono?: boolean;
}) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-white/40">{label}</span>
    {isMissing ? (
      <span className="text-rose-400/60 italic text-xs underline decoration-dotted">
        Not Provided
      </span>
    ) : isLink ? (
      <Link
        to={`${value}`}
        target="_blank"
        rel="noreferrer"
        className="text-indigo-400 hover:underline truncate max-w-[200px]"
      >
        {value}
      </Link>
    ) : (
      <span className="text-white/90 font-medium">{value}</span>
    )}
  </div>
);

function Badge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${active ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700/30" : "bg-white/5 text-white/30 border border-white/10"}`}
    >
      {active ? "✓ " : ""}
      {label}
    </span>
  );
}

const TagList = ({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color?: string;
}) => (
  <div>
    <p className={`text-xs font-bold uppercase mb-3 text-${color}-400/70`}>
      {title}
    </p>
    <div className="flex flex-wrap gap-2">
      {items.length > 0 ? (
        items.map((item, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 text-[11px] rounded bg-${color}-500/10 border border-${color}-500/20 text-white/80`}
          >
            {item}
          </span>
        ))
      ) : (
        <span className="text-xs text-white/20 italic">
          No {title.toLowerCase()} added
        </span>
      )}
    </div>
  </div>
);
