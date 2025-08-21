import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SendMail = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleResetMail = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      axios.defaults.withCredentials = true;

      const response = await axios.post(`${import.meta.env.VITE_URL}/resetotpmail`, { email }, { withCredentials: true })

      toast.success(response.data.message)

      if (localStorage.getItem("timer")) {
        localStorage.removeItem("timer")
      }
      navigate("/resetotpverify")
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000);
    }
  }

  return (
    <div className='flex min-h-screen justify-center items-center bg-[#F7F5F2]'>

      <form
        onSubmit={handleResetMail}
        className='w-[90%] sm:w-[400px] bg-white shadow-lg rounded-2xl p-8 space-y-6'
      >
        <div className='text-center space-y-2'>
          <h2 className='font-[Poppins] text-xl font-semibold text-red-600'>Reset Your Password</h2>
          <p className='font-[Inter] text-gray-600 text-sm'>
            Enter your registered email address and we’ll send you an OTP to verify your identity.
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <label className='font-[Inter] font-semibold text-red-600'>Email Address</label>
          <input
            type="email"
            placeholder='yourname@example.com'
            onChange={(e) => setEmail(e.target.value)}
            className='pl-3 placeholder:text-gray-500 border rounded-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full h-11 rounded-lg font-[Poppins] font-semibold text-white shadow-md transition 
    ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-400 hover:shadow-lg"}`}
        >
          {loading ? "Please Wait.." : "Send OTP"}
        </button>
      </form>

    </div>
  )
}

export default SendMail;
