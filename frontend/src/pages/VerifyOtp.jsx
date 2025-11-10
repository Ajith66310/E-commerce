import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const VerifyOtp = () => {

  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  
  const [count, setCount] = useState(()=>{
    const timerStorage = localStorage.getItem("timer")
  
    if(timerStorage){
  
     const currentTime =  Date.now();
  
     const time = Math.floor((currentTime - timerStorage)/1000);
      
     const remainingTime = 60 - time;
     
     return remainingTime > 0 ? remainingTime : 0;
    }
      localStorage.setItem('timer',Date.now())
    return 60;
  }
  );

  

  const signupOtpHandle = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL}/signupotpverify`,
      { otp },
      { withCredentials: true } // 👈 important
    );
    toast.success(response.data.message);
    navigate("/login");
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
  }
};

const resendOtp = async () => {
  try {

    localStorage.setItem("timer",Date.now())
    setCount(60);
    
    const response = await axios.post(
      `${import.meta.env.VITE_URL}/resendotp`,
      {},
      { withCredentials: true } 
    );
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to resend OTP. Please try again.");
  }
};


  useEffect(() => {
    if (count <= 0) return;
    const timer = setInterval(() => setCount(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);




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
    </>
  )
}

export default VerifyOtp