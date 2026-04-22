import React, { useState } from "react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type Props = {
  onClose: () => void;
};

const PropertyForm: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bedrooms: "",
    size: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await fetch(`${baseURL}/api/listing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Property submitted:", data);
        setSuccessMsg(
          "Your property details has been submitted successfully! We’ll be reaching out to you soon.",
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          bedrooms: "",
          size: "",
          message: "",
        });

        setTimeout(() => {
          setSuccessMsg("");
          onClose();
        }, 3000);
      } else {
        console.error("❌ Submission failed:", data.message || data.error);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5">
      <div className="bg-white w-full max-w-xl p-8 rounded-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-800 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[#0a1f44]">
          Property Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name *"
            className="w-full border p-3 rounded"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email Address *"
            className="w-full border p-3 rounded"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="phone"
            placeholder="Your Phone Number *"
            className="w-full border p-3 rounded"
            required
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="address"
            placeholder="Your Property Address *"
            className="w-full border p-3 rounded"
            required
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
          />

          <div className="flex gap-4">
            <select
              name="bedrooms"
              className="w-1/2 border p-3 rounded"
              required
              value={formData.bedrooms}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Bedrooms *</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4+">4+ Bedrooms</option>
            </select>
            <input
              name="size"
              placeholder="Size *"
              className="w-1/2 border p-3 rounded"
              required
              value={formData.size}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <textarea
            name="message"
            placeholder="Leave your message"
            className="w-full border p-3 rounded"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-6 py-3 rounded shadow-md transition-all duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Send Message"}
          </button>

          {successMsg && (
            <p className="text-green-600 text-sm text-center mt-2">
              {successMsg}
            </p>
          )}

          <p className="text-xs text-gray-600 mt-2">
            By clicking Submit, you agree to our{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
