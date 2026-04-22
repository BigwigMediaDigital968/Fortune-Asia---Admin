import React, { useState, useEffect } from "react";

const NewsSubscribeSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [_loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      setPopup({ type: "error", message: "Please enter your email address." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setPopup({ type: "success", message: data.message });
        setEmail("");
      } else {
        setPopup({
          type: "error",
          message: data.error || "Subscription failed.",
        });
      }
    } catch (err) {
      setPopup({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-dismiss popup after 3 seconds
  useEffect(() => {
    if (popup) {
      const timeout = setTimeout(() => {
        setPopup(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [popup]);

  return (
    <div className="border-t border-gray-300 dark:border-gray-700 w-full">
      <div className="bg-white dark:bg-black text-black dark:text-white  py-12 px-4 sm:px-6  font-raleway">
        <div className="w-11/12  mx-auto flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Section */}
          <div>
            <h2 className="text-2xl md:text-4xl font-thin text-black dark:text-white mt-2">
              Sign up for exclusive <br />
              Property Offers
            </h2>
          </div>

          {/* Right Section */}
          <div className=" flex flex-col  gap-4">
            <p className="text-center lg:text-left text-base">
              Get early access to promotions and listings.
            </p>

            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-[300px] px-4 py-3  text-black dark:text-white bg-transparent border border-gray-300 focus:outline-none"
              />
              <button
                onClick={handleSubscribe}
                className="border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-3 uppercase text-sm tracking-widest hover:opacity-70 bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] text-black transition"
              >
                Subscribe
              </button>
            </div>

            {/* Popup Message */}
            {popup && (
              <div
                className={`w-full px-4 py-2 rounded-md text-sm mt-2 ${popup.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                  }`}
              >
                {popup.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSubscribeSection;
