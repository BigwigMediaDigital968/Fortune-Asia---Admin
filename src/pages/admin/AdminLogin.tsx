import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ADMIN_USER = "admin@fortuneasia.ae";
const ADMIN_PASS = "admin@123";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("adminAuth", "true"); // simple auth
      toast.success("Logged in successfully");
      navigate("/admin");
    } else {
      setError("Invalid credentials");
      toast.error("invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#111] p-8 rounded-md w-full max-w-sm border border-gray-700"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-[#222] border border-gray-600 rounded"
          required
        />

        <div className="relative w-full mb-4">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 bg-[#222] border border-gray-600 rounded pr-10 text-white"
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
      >
        {showPassword ? (
          <EyeOff size={20} />
        ) : (
          <Eye size={20} />
        )}
      </button>
    </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-[var(--primary-color)] rounded hover:scale-105 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
