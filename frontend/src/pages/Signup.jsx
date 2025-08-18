import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('');
  const [signup, setSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false)

  const registerOtpMail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_URL}/registerotpmail`, {
        name,
        email,
        password,
      })
      toast.success(response.data.message)
      setSignup(true)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    finally {
    setTimeout(() => {
      setLoading(false); 
    },3000);
    }
  }

  const signupOtpHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/signupotpverify`, {
        name,
        email,
        password,
        otp
      })
      toast.success(response.data.message);
      navigate("/login")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  }

  const resendOtp = async()=>{
   try {
     const response = axios.post(`${import.meta.env.VITE_URL}/resendotp`,{
       email
      })
    
  toast.success(response.data.message)
   } catch (error) {
    
   }
  }

  useEffect(() => {
    if (signup) {
      setCount(5)
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [signup]);

  return (
    <>
      {signup === false ? (
        <div className='pt-10 flex min-h-screen justify-center bg-[#F7F5F2] items-center'>
          <form
            onSubmit={registerOtpMail}
            className='w-[90%] sm:w-[400px] bg-white shadow-lg rounded-2xl p-8 space-y-6'
          >
            <div className='text-center space-y-2'>
              <p className='font-[Poppins] text-lg tracking-wide'>
                Welcome to <span className='font-bold text-red-600'>CR7</span>
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              <div>
                <label className='font-[Inter] font-semibold text-red-600'>Username</label>
                <input
                  required
                  type="text"
                  placeholder='Enter your name'
                  className='pl-3 placeholder:font-medium border rounded-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className='font-[Inter] font-semibold text-red-600'>Gmail</label>
                <input
                  type="email"
                  required
                  placeholder='Enter your email'
                  className='pl-3 placeholder:font-medium border rounded-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='relative'>
                <label className='font-[Inter] font-semibold text-red-600'>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder='Enter your password'
                  className='pl-3 placeholder:font-medium border rounded-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                  onChange={(e) => setPassword(e.target.value)} />

                {/* 👁 icon */}
                <span
                  className='absolute right-3 top-9.5 cursor-pointer text-gray-500'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 rounded-lg font-[Poppins] font-semibold text-white shadow-md transition 
    ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-400 hover:shadow-lg"}`}
            >
              {loading ? "Please Wait.." : "Register"}
            </button>


            <div className='text-center'>
              <NavLink to='/login' className='text-sm text-blue-700 font-medium hover:underline'>
                Already have an account? Log in
              </NavLink>
            </div>

            <div className='flex justify-center text-2xl gap-5 mt-4'>
              <FaFacebookSquare className='text-blue-700 hover:scale-110 transition-transform' />
              <FaInstagram className='text-pink-600 hover:scale-110 transition-transform' />
              <FaSquareThreads className='hover:scale-110 transition-transform' />
            </div>
          </form>
        </div>
      ) : (
        <div className='flex min-h-screen justify-center items-center bg-[#FAF9F6]'>
          <form
            onSubmit={signupOtpHandle}
            className='w-[90%] sm:w-[400px] bg-white shadow-lg rounded-2xl p-8 space-y-6'
          >
            <div className='flex flex-col '>
              <label className='font-[Inter] pb-3 font-semibold text-red-600 text-center'>
                Enter your 6-digit OTP (One-Time Password)
              </label>
              <input
                type="number"
                required
                placeholder='Enter OTP'
                className='pl-3 placeholder:font-medium border rounded-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                onChange={(e) => setOtp(e.target.value)}
              />

              {/* Countdown timer + Resend OTP */}
              {count > 0 ? (
                <p className='text-sm text-gray-500 text-center mt-2'>
                  Resend OTP in {count}s
                </p>
              ) : (
                <p
                  className='text-sm text-blue-700 cursor-pointer hover:underline text-center mt-2'
                  onClick={resendOtp}
                >
                  Resend OTP
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full h-11 rounded-lg font-[Poppins] font-semibold bg-red-400 text-white shadow-md hover:shadow-lg transition'
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Signup;
