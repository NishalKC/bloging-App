import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Frontend validation
    if (!formData.username.trim()) {
      return setError("Username is required");
    }

    if (!formData.email.trim()) {
      return setError("Email is required");
    }

    if (!formData.email.includes("@")) {
      return setError("Please enter a valid email");
    }

    if (!formData.password) {
      return setError("Password is required");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      await api.post("/user/register", formData);

      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-10">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-800 border border-zinc-700 rounded-2xl p-8 shadow-xl"
      >

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Join Blogify today
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-5">
            {success}
          </div>
        )}

        {/* Username */}
        <div className="mb-5">
          <label className="block text-sm text-zinc-300 mb-2">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-zinc-300 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-300 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

      </form>
    </div>
  );
};

export default Register;