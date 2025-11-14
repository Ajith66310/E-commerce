import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {

  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        {
          email: form.email,
          password: form.password
        },
        { withCredentials: true }
      );

      const { message, token } = response.data;

      setToken(token);
      localStorage.setItem("token", token);
      toast.success(message);
      navigate("/dashboard");

    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4">
      
      {/* Glass card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/60 shadow-2xl rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.015]"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 tracking-wide">
          Admin Login
        </h2>

        {/* Email */}
        <label className="block mb-6">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
          />
        </label>

        {/* Password */}
        <label className="block mb-8">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
          />
        </label>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
