import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  // const [count, setCount] = useState(0);
  const navigate = useNavigate();



  const signupOtpHandle = async (e) => {
    e.preventDefault();
    try {
      const tempToken = sessionStorage.getItem("tempToken");
      const response = await axios.post(`${import.meta.env.VITE_URL}/signupotpverify`, {
        otp,
        tempToken,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };



  const resendOtp = async () => {
    try {
      // setCount(60);
      const tempToken = sessionStorage.getItem("tempToken");
      const response = await axios.post(`${import.meta.env.VITE_URL}/resendotp`, {
        tempToken,
      });

      toast.success(response.data.message);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    }
  };

  // useEffect(() => {
  //   setCount(60);
  //   const interval = setInterval(() => {
  //     setCount((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(interval);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>

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
            {/* {count > 0 ? ( */}
              <p className='text-sm text-gray-500 text-center mt-2'>
                Resend OTP in {}s
              </p>
            {/* ) : ( */}
              <p
                className='text-sm text-blue-700 cursor-pointer hover:underline text-center mt-2'
                onClick={resendOtp}
              >
                Resend OTP
              </p>
            {/* )} */}
          </div>
          <button
            type='submit'
            className='w-full h-11 rounded-lg font-[Poppins] font-semibold bg-red-400 text-white shadow-md hover:shadow-lg transition'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default VerifyOtp