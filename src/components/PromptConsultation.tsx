import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PromptConsultation = () => {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+971", // default to UAE
    phone: "",
    email: "",
  });
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^\d{7,15}$/.test(phone); // simple check for 7 to 15 digits

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    setMessage("");
    const { name, email, phone, countryCode } = formData;

    if (!name || !phone || !email) {
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

    const fullPhone = countryCode + phone;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: fullPhone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ OTP sent to your email.");
        setStep(2);
      } else {
        setMessage("❌ " + (data.error || "Failed to send OTP."));
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const fullPhone = formData.countryCode + formData.phone;

    try {
      const res = await fetch(
        "${API_BASE_URL}/api/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: fullPhone,
            otp,
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("formData", JSON.stringify(formData));
        setMessage("✅ OTP verified. Data submitted successfully.");
        setFormData({ name: "", phone: "", email: "", countryCode: "+971" });
        setOtp("");
        setStep(1);
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
    <div className="w-full px-4 py-10 flex justify-center bg-white dark:bg-black text-black dark:text-white font-raleway transition-colors duration-300">
      <div className="w-full md:max-w-7xl bg-gradient-to-r from-[var(--primary-color)] via-gray-900 to-[var(--primary-color)] p-[1px] bg-center">
        <div className="bg-white dark:bg-black px-8 py-10 sm:px-16 sm:py-14 transition-colors duration-300">
          <h2 className="text-center text-xl md:text-3xl tracking-wide font-light mb-2">
            PROMPT CONSULTATION
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-10">
            Fill form below and our agent will contact you shortly
          </p>

          <form
            onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
          >
            {step === 1 && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-b border-gray-400 dark:border-gray-500 outline-none px-2 py-2"
                />

                <div className="flex gap-2 col-span-1">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="bg-white dark:bg-black text-black dark:text-white border-b border-gray-400 dark:border-gray-500 outline-none px-2 py-2"
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
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-b border-gray-400 dark:border-gray-500 outline-none px-2 py-2"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Your E-Mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-b border-gray-400 dark:border-gray-500 outline-none px-2 py-2"
                />
              </>
            )}

            {step === 2 && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="col-span-3 bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-b border-gray-400 dark:border-gray-500 outline-none px-2 py-2"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="font-sans border border-[var(--primary-color)] bg-gradient-to-r from-[var(--primary-color)] via-[#e3c5b5] to-[var(--primary-color)] px-4 py-2 uppercase text-sm tracking-widest hover:opacity-80 text-black transition"
            >
              {loading
                ? "Please wait..."
                : step === 1
                  ? "Send OTP"
                  : "Verify OTP"}
            </button>
          </form>

          {message && (
            <p className="text-center text-sm text-green-600 dark:text-green-400 mb-4">
              {message}
            </p>
          )}

          <p className="text-center text-md text-gray-600 dark:text-gray-400">
            Or contact us right now via{" "}
            <a
              href="https://wa.me/971521110795"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary-color)] inline-flex items-center gap-1 hover:underline"
            >
              <FaWhatsapp size={20} /> WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptConsultation;
