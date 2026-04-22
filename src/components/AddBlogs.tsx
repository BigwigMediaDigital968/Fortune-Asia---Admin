import { useEffect, useState } from "react";
import JoditEditor from "jodit-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/api/blogs";

interface FAQ {
  question: string;
  answer: string;
}

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags?: string;
  coverImage?: string;
  faqs?: FAQ[];
}

const AddBlog = ({
  onClose,
  onSuccess,
  existingBlog = null,
}: {
  onClose: () => void;
  onSuccess: () => void;
  existingBlog?: BlogPost | null;
}) => {
  const [formData, setFormData] = useState({
    title: existingBlog?.title || "",
    slug: existingBlog?.slug || "",
    excerpt: existingBlog?.excerpt || "",
    content: existingBlog?.content || "",
    author: existingBlog?.author || "",
    tags: existingBlog?.tags || "",
    coverImage: null as File | null,
  });

  const [faqs, setFaqs] = useState<FAQ[]>(
    existingBlog?.faqs || [{ question: "", answer: "" }],
  );

  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingBlog?.coverImage || null,
  );
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        slug: existingBlog.slug,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        author: existingBlog.author,
        tags: existingBlog?.tags || "",
        coverImage: null,
      });

      setFaqs(
        existingBlog.faqs?.length
          ? existingBlog.faqs
          : [{ question: "", answer: "" }],
      );
      setImagePreview(existingBlog.coverImage || null); // ✅ NEW
    }
  }, [existingBlog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
        slug: existingBlog ? prev.slug : autoSlug,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (file: File) => {
    setFormData((prev) => ({ ...prev, coverImage: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleImageChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // FAQ Handlers
  const handleFaqChange = (index: number, field: string, value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field as keyof FAQ] = value;
    setFaqs(updatedFaqs);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("slug", formData.slug);
    blogData.append("excerpt", formData.excerpt);
    blogData.append("content", formData.content);
    blogData.append("author", formData.author);
    blogData.append("tags", formData.tags);

    // ✅ Send FAQs
    blogData.append("faqs", JSON.stringify(faqs));

    if (formData.coverImage) {
      blogData.append("coverImage", formData.coverImage);
    }

    try {
      const method = existingBlog ? "PUT" : "POST";
      const endpoint = existingBlog
        ? `${API_BASE}/${existingBlog.slug}`
        : `${API_BASE}/add`;

      const res = await fetch(endpoint, {
        method,
        body: blogData,
      });

      const data = await res.json();

      if (res.ok) {
        alert(existingBlog ? "Blog updated" : "Blog added");
        onSuccess();
        onClose();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Error submitting blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 w-full max-w-3xl rounded-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">
          {existingBlog ? "Edit Blog" : "Add Blog"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border"
          />
          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Slug"
            className="w-full p-2 border"
          />
          <input
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Excerpt"
            className="w-full p-2 border"
          />

          {/* ✅ JODIT EDITOR */}
          <div>
            <label className="font-semibold">Content</label>
            <JoditEditor
              value={formData.content}
              onChange={(newContent) =>
                setFormData((prev) => ({ ...prev, content: newContent }))
              }
            />
          </div>

          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-2 border"
          />
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags"
            className="w-full p-2 border"
          />

          {/* ✅ FAQs Section */}
          <div>
            <h3 className="font-bold text-lg">FAQs</h3>

            {faqs.map((faq, index) => (
              <div key={index} className="border p-3 mb-2 rounded">
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  className="w-full p-2 border mb-2"
                />
                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  className="w-full p-2 border"
                />
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addFaq}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              + Add FAQ
            </button>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded"
                />

                <div className="flex justify-center gap-3 mt-3">
                  <label className="cursor-pointer text-blue-600">
                    Change
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageChange(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-500">
                  Drag & drop image here or click to upload
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageChange(e.target.files[0]);
                    }
                  }}
                />
              </>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="border px-2 py-1 border-green-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border px-2 py-1 border-orange-500"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
