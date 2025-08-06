import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'

const RegisterOtpVerify = () => {
  const location = useLocation()
  const {name,email,password} = location.state;
  const [otp,setOtp] = useState(null)
const handleOtp = async()=>{
  const response = await axios.post('http://localhost:8080/verify',{
    name,
    email,
    password,
    otp,
  })
}
  return (
    <>
     <div className='pt-10 flex  h-[89vh] justify-center bg-[#FAF9F6]'>
        <form action="" method=''  onSubmit={handleOtp} className=' w-[80%] h-120'>
          <div className='flex justify-center  items-center mt-10 mb-5 flex-col gap-1'>
            <label className='font-bold text-red-600 font-mono w-100' onChange={(e)=>{setOtp(e.target.value)}}>OTP</label>
            <input required type="otp" placeholder='Name' className='pl-2 placeholder:font-bold   border  focus:outline-red-600  mb-3 rounded w-100 h-10 b '/>
            <button className='border bg-red-700  text-amber-50 font-bold w-100 h-10  '>Submit</button>
          </div>      
        </form>
      </div>
    
    </>
  )
}

export default RegisterOtpVerify