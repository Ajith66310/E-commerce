import React from 'react'

const LoginOtpVerify = () => {
  return (
    <>
     <div className='pt-10 flex  h-[89vh] justify-center bg-[#FAF9F6]'>
        <form action="" method='' onSubmit={handleRegister} className=' w-[80%] h-120'>
          <div className='flex justify-center  items-center mt-10 mb-5 flex-col gap-1'>
            <label className='font-bold text-red-600 font-mono w-100'>Username</label>
            <input required type="text" placeholder='Name' className='pl-2 placeholder:font-bold   border  focus:outline-red-600  mb-3 rounded w-100 h-10 b '/>
          </div>      
        </form>
      </div>
    
    </>
  )
}

export default LoginOtpVerify