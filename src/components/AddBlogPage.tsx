import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import toast, { Toaster } from "react-hot-toast";
import RichTextEditor from "./TextEditor/RichTextEditor";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/api/blogs";

interface FAQ {
  question: string;
  answer: string;
}

const AddBlogPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => navigate("/admin/blogs");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    coverImageAlt: "",
    tags: "",
    coverImage: null as File | null,
  });

  const [faqs, setFaqs] = useState<FAQ[]>([{ question: "", answer: "" }]);

  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "title") {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: autoSlug,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      setFormData({ ...formData, coverImage: e.target.files[0] });
    }
  };

  // ✅ FAQ Logic
  const handleFaqChange = (index: number, field: string, value: string) => {
    const updated = [...faqs];
    updated[index][field as keyof FAQ] = value;
    setFaqs(updated);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // ✅ Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.coverImage) {
      return toast.error("Cover image is required");
    }

    setLoading(true);

    const blogData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) blogData.append(key, value as any);
    });

    blogData.append("faqs", JSON.stringify(faqs));

    const toastId = toast.loading("Publishing blog...");

    try {
      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        body: blogData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Blog published successfully 🚀", { id: toastId });
        navigate("/admin/blogs");
      } else {
        toast.error(data.error || "Failed to publish", { id: toastId });
      }
    } catch (err) {
      toast.error("Server error", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
  <Toaster position="top-right" />

  {/* Modal Container */}
  <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
        Add New Blog
      </h1>

      {/* Close Button */}
      <button onClick={handleCancel} className="text-gray-500 hover:text-black text-xl">
        ✕
      </button>
    </div>

    {/* Scrollable Content */}
    <div className="overflow-y-auto px-6 py-5 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Slug */}
          <input
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Excerpt */}
          <input
            name="excerpt"
            placeholder="Short Description"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Editor */}
          <div>
            <label className="font-semibold mb-2 block">Content</label>
            <RichTextEditor
        value={formData.content}
        onChange={(newContent) =>
          setFormData((prev) => ({ ...prev, content: newContent }))
        }
      />
          </div>

          {/* Author */}
          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Tags */}
          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* Image */}
          <label className="font-semibold mb-2 block">Cover Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="cursor-pointer"
          />

          {/* cover alt text */}
          <input
            name="coverImageAlt"
            placeholder="Cover Image Alt Text"
            value={formData.coverImageAlt}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* FAQs */}
          <div>
            <h2 className="text-xl font-semibold mb-3">FAQs</h2>

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg mb-3 bg-gray-50"
              >
                <input
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  className="w-full p-2 border mb-2 rounded"
                />

                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />

                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="mt-2 text-red-500 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addFaq}
              className="px-4 py-2 rounded cursor-pointer"
              style={{ background: "var(--primary-color)" }}
            >
              + Add FAQ
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 bg-gray-300 rounded cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded cursor-pointer btn-gradient-hover"
              style={{ background: "var(--primary-color)" }}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
    </div>

    {/* Footer */}
    <div className="px-6 py-4 border-t flex justify-end gap-3 hidden">
      <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
        Cancel
      </button>
      <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800">
        Publish
      </button>
    </div>

  </div>
</div>
    </>
  );
};

export default AddBlogPage;
