import { useState } from "react";
type NotifyMeProps = {
  onVerified?: () => void; // ✅ optional
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NotifyMe = ({ onVerified }: NotifyMeProps) => {
  const [formData, setFormData] = useState({
    purpose: "Buy",
    category: "Apartment",
    bedrooms: "1",
    name: "",
    email: "",
    phone: "",
    countryCode: "+971",
  });

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^[0-9]{6,14}$/.test(phone);

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    setMessage("");

    const { name, email, phone, countryCode } = formData;
    const fullPhone = `${countryCode}${phone}`;

    if (!name || !email || !phone) {
      setMessage("❌ All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("❌ Invalid email format.");
      return;
    }

    if (!validatePhone(phone)) {
      setMessage("❌ Invalid phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/notify/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: fullPhone }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ OTP sent to your email.");
        setStep(2);
      } else {
        setMessage("❌ " + (data.error || "Failed to send OTP."));
      }
    } catch (error) {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fullPhone = `${formData.countryCode}${formData.phone}`;

    try {
      const res = await fetch(`${API_BASE_URL}/api/notify/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: fullPhone, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("formData", JSON.stringify(formData));
        setMessage(
          "✅ OTP verified & details submitted successfully. We will get in touch with you shortly.",
        );
        setFormData({
          purpose: "Buy",
          category: "Apartment",
          bedrooms: "1",
          name: "",
          phone: "",
          email: "",
          countryCode: "+971",
        });
        setOtp("");
        setStep(1);
        sessionStorage.removeItem("formData");
        onVerified?.();
      } else {
        setMessage("❌ " + (data.error || "OTP verification failed."));
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-10 px-4 font-raleway transition-colors duration-300">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[var(--primary-color)] via-gray-900 to-[var(--primary-color)] p-[1px]">
        <div className="bg-white dark:bg-black p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-2">
            Schedule Your Consultation
          </h2>
          <p className="text-sm md:text-base text-center text-gray-600 dark:text-gray-400 mb-8 font-light">
            Complete the form and we’ll be in touch right away.
          </p>

          <form
            onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-light"
          >
            {step === 1 && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="purpose" className="mb-1 text-sm">
                    Purpose
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="border px-2 py-2 bg-white dark:bg-black border-gray-400 dark:border-gray-500"
                  >
                    <option>Buy</option>
                    <option>Rent</option>
                    <option>Offplan</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="category" className="mb-1 text-sm">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border px-2 py-2 bg-white dark:bg-black border-gray-400 dark:border-gray-500"
                  >
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Townhouse</option>
                    <option>Penthouse</option>
                    <option>Plots</option>
                    <option>Studio</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="bedrooms" className="mb-1 text-sm">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="border px-2 py-2 bg-white dark:bg-black border-gray-400 dark:border-gray-500"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1 text-sm">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border px-2 py-2 bg-white dark:bg-black border-gray-400 dark:border-gray-500"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 text-sm">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border px-2 py-2 bg-white dark:bg-black border-gray-400 dark:border-gray-500"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm">Phone Number</label>
                  <div className="flex flex-wrap w-full">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-[30%] mix-w-[100%] md:min-w-[120px] border px-2 py-2 bg-white dark:bg-black border-gray-400 dark:border-gray-500"
                    >
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+81">+81 (JP)</option>
                      <option value="+49">+49 (DE)</option>
                      <option value="+33">+33 (FR)</option>
                      <option value="+86">+86 (CN)</option>
                      <option value="+39">+39 (IT)</option>
                      <option value="+7">+7 (RU)</option>
                      <option value="+34">+34 (ES)</option>
                      <option value="+46">+46 (SE)</option>
                      <option value="+31">+31 (NL)</option>
                      <option value="+41">+41 (CH)</option>
                      <option value="+65">+65 (SG)</option>
                      <option value="+63">+63 (PH)</option>
                      <option value="+92">+92 (PK)</option>
                      <option value="+880">+880 (BD)</option>
                      <option value="+82">+82 (KR)</option>
                      <option value="+62">+62 (ID)</option>
                      <option value="+55">+55 (BR)</option>
                      <option value="+351">+351 (PT)</option>
                      <option value="+20">+20 (EG)</option>
                      <option value="+27">+27 (ZA)</option>
                      <option value="+90">+90 (TR)</option>
                      <option value="+966">+966 (SA)</option>
                      <option value="+973">+973 (BH)</option>
                      <option value="+974">+974 (QA)</option>
                      <option value="+968">+968 (OM)</option>
                      <option value="+964">+964 (IQ)</option>
                      <option value="+962">+962 (JO)</option>
                      <option value="+961">+961 (LB)</option>
                    </select>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 min-w-[150px] border px-2 py-2 bg-white dark:bg-black border-gray-400 dark:border-gray-500"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="col-span-full flex flex-col">
                <label htmlFor="otp" className="mb-1 text-sm">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border px-2 py-2 bg-white dark:bg-black border-gray-400 dark:border-gray-500"
                  required
                />
              </div>
            )}

            <div className="col-span-full flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[var(--primary-color)] via-[#e3c5b5] to-[var(--primary-color)] text-black px-4 py-2 uppercase tracking-wider text-sm hover:opacity-80 transition"
              >
                {loading
                  ? "Please wait..."
                  : step === 1
                    ? "Send OTP"
                    : "Verify OTP"}
              </button>
            </div>
          </form>

          {message && (
            <p
              className={`text-center text-sm mb-4 ${
                message.startsWith("✅")
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotifyMe;
