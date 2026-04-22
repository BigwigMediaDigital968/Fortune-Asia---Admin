import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/api/blogs";

interface FAQ {
  question: string;
  answer: string;
}

const AddBlogPage = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen p-6">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto bg-white text-black p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Add New Blog</h1>

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
            <JoditEditor
              value={formData.content}
              onChange={(newContent) =>
                setFormData((prev) => ({
                  ...prev,
                  content: newContent,
                }))
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
              onClick={() => navigate("/admin/blogs")}
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
    </div>
  );
};

export default AddBlogPage;
