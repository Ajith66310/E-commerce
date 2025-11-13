import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const loginHandle = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/login`, {
        email,
        password,
      })
      toast.success(response.data.message)
      localStorage.setItem("token", response.data.token);
      navigate('/')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      }
    }
  }

  const handleSuccess = async(credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
   const response = await axios.post(`${import.meta.env.VITE_URL}/google-login`, {
      email:decoded.email,
      googleId:decoded.sub
    })  
    toast.success(response.data.message)
    localStorage.setItem("token",response.data.token)
    navigate('/')
    } 

    catch (error) {
  if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Something went wrong, please try again");
    console.error(error);
  }
  }
  
};

  const handleError = () => {
    console.log("Login Failed");
  };


  return (
    <>
      <div className='flex min-h-screen justify-center items-center bg-[#F7F5F2]'>
        <form
          onSubmit={loginHandle}
          className='w-[90%] sm:w-[400px] bg-white shadow-lg rounded-2xl p-8 space-y-6'
        >
          <div className='text-center space-y-2'>
            <p className='font-[Poppins] text-lg tracking-wide'>
              Welcome, <span className='font-bold'>to club</span>
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <div>
              <label className='font-[Inter] font-semibold text-red-600'>Email</label>
              <input
                type="text"
                required
                placeholder='Username or email'
                className='pl-3 rounded-tr-lg placeholder:font-medium border rounded-bl-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='relative'>
              <label className='font-[Inter] font-semibold text-red-600'>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder='Enter your password'
                className='rounded-tr-lg pl-3 pr-10 placeholder:font-medium border rounded-bl-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* 👁 icon */}
              <span
                className='absolute right-3 top-9.5 cursor-pointer text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <NavLink
              to="/sendmail"
              className='text-sm text-blue-700 font-medium hover:underline'
            >
              Forgot password?
            </NavLink>
          </div>

          <button
            type='submit'
            className='w-full h-11 rounded-lg font-[Poppins] font-semibold bg-red-400 text-white shadow-md hover:shadow-lg transition'
          >
            Login
          </button>

          <div className='text-center'>
            <NavLink
              to='/signup'
              className='text-sm text-blue-700 font-medium hover:underline'
            >
              Don't have an account? Sign up
            </NavLink>
          </div>

          <div className='flex justify-center flex-col text-2xl gap-5 mt-4'>
            <div>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>
            <div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;
