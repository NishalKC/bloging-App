import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/Api";

const Login = ({ setIslogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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

    // Validation
    if (!formData.email.trim()) {
      return setError("Email is required");
    }

    if (!formData.email.includes("@")) {
      return setError("Please enter a valid email");
    }

    if (!formData.password) {
      return setError("Password is required");
    }

    try {
      setLoading(true);

      await api.post("/user/login", formData);

      setIslogin(true);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed. Please check your email and password."
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
          Welcome Back
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Login to your Blogify account
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}

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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}
        <p className="text-center text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;