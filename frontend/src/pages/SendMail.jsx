
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react'
const SendMail = () => {
  const [otpSended, setOtpSended] = useState(true)
  return (
    <>
      <div className='pt-30 flex  h-[89vh] justify-center bg-[#FAF9F6]'>
        <form action="" method='' className=' w-[80%] h-120'>
          <div className='flex justify-center items-center  mt-10 mb-5 flex-col gap-1'>

            <label className='font-bold font-mono text-red-600 w-100'>Gmail</label>
            <input type="text" placeholder='Gmail' className='pl-2 placeholder:font-bold  border rounded w-100 h-10 ' />
            {
              otpSended ? "":
              <>
                <label className='font-bold font-mono text-red-600 w-100'>OTP</label>
                <input type="number" placeholder='OTP' className='pl-2 placeholder:font-bold  border rounded w-100 h-10 ' />
                <p className='text-sm text-blue-700 w-100'>Resend OTP </p>
              </>
            }
          </div>
          {
            otpSended ? <div className='flex items-center justify-center' onClick={() => { setOtpSended(false) }} >
              <button className='border rounded font-bold font-[poppins] w-100 h-10  bg-red-400 text-white'>
                Send OTP
              </button>
            </div> :
              <div className='flex items-center justify-center'>
                <NavLink to='/login'> <button className='border rounded font-bold font-[poppins] w-100 h-10  bg-red-400 text-white'>
                  Verify
                </button></NavLink >
              </div>

          }



        </form>
      </div>
    </>
  )
}

export default SendMail