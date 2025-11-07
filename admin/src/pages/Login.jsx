import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Login({setToken}) {

  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, {
        email: form.email,
        password: form.password
      },{ withCredentials: true })
      
      const { message, token } = response.data;
      
      setToken(token)
      // store token in localStorage
      localStorage.setItem("token", token)
      toast.success(message)

      navigate('/dashboard')

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

        <label className="block mb-4">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            className="mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 border-slate-200"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 border-slate-200"
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login 