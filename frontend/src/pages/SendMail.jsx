
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const SendMail = () => {
  const [otpSended, setOtpSended] = useState(false)
  const [otp,setOtp] = useState('')
  const [email,setEmail] = useState('')

  

  const handleVerifyOtp = async(e)=>{
  
 }

  const handleResetMail = async(e)=>{
    try {
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_URL}/resetotpmail`,
      {
        email
      },       
    )  
    toast.success(response.data.message)
    setOtpSended(true)
    } catch (error) {
      console.log(error);
      
    }
    
  }

  return (
    <>
      <div className='pt-30 flex  h-[89vh] justify-center bg-[#FAF9F6]'>

          {
            otpSended ?
              <>
        <form action=""  method='' onSubmit={otpSended?handleVerifyOtp:handleResetMail} className=' w-[80%] h-120'>
                <div className='flex justify-center items-center  mt-10 mb-5 flex-col gap-1'>
                  <label className='font-bold font-mono  text-red-600 w-100'>OTP</label>
                  <input type="number" placeholder='OTP' onChange={(e)=>{setOtp(e.target.value)}} className='pl-2 placeholder:font-bold  border rounded w-100 h-10 ' />
                  <p className='text-sm text-blue-700 w-100'>Resend OTP </p>
                  <div className='flex items-center justify-center'>
                    <NavLink to='/login'>
                     <button type='submit' className='border rounded font-bold font-[poppins] w-100 h-10  bg-red-400 text-white'>
                      Verify
                    </button></NavLink >
                  </div>
                </div>
        </form>
              </>
              :
       <form action="" onSubmit={handleResetMail}>
       <div className='flex items-center justify-center flex-col gap-3'>
                <label className='font-bold font-mono text-red-600 w-100'>Gmail</label>
                <input type="text" placeholder='Gmail' onChange={(e)=>{setEmail(e.target.value)}} className='pl-2 placeholder:font-bold  border rounded w-100 h-10 ' />
                <button type='submit' className='border rounded font-bold font-[poppins] w-100 h-10  bg-red-400 text-white'>
                  Send OTP
                </button>
              </div>
       </form>
          }
      </div>
    </>
  )
}
export default SendMail