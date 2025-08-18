import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/resetpassword`, {
        token,
        password,
        confirmPassword,
      })
      toast.success(response.data.message)
      navigate('/login')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center bg-[#FAF9F6] px-4">
        <form onSubmit={handleResetSubmit} className="w-[90%] max-w-md p-6 bg-white shadow-md rounded-xl border border-gray-200">

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-red-500 font-[poppins]">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Please enter your new password below
            </p>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="New Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className="pl-3 py-2 placeholder:font-semibold placeholder:text-gray-500 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
                className="pl-3 py-2 placeholder:font-semibold placeholder:text-gray-500 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              {/* 👁 icon */}
              <span
                className='absolute right-3 top-3 cursor-pointer text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full border rounded-md font-bold font-[poppins] py-2 bg-red-400 text-white hover:bg-red-500 transition"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ResetPassword
