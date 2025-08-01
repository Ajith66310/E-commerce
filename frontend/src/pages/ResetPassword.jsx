

const ResetPassword = () => {



  return (
    <>
      <div className='pt-30 flex h-[89vh] justify-center bg-[#FAF9F6]'>
        <form action="" method='' className=' w-[80%] h-120'>
          <div className='flex justify-center  items-center mt-10 mb-5 flex-col gap-1'>
            <p className='font-[poppins] w-100 mb-5'>Welcome to <span className='font-bold text-red-600 '>CR7</span></p>
            <label className='font-bold text-red-600 font-mono w-100'>Username</label>
            <input type="text" placeholder='Name' className=' placeholder:pl-2 placeholder:font-bold  border mb-3 rounded w-100 h-10 ' />
            <label className='font-bold text-red-600 font-mono w-100 '>Gmail</label>
            <input type="text" placeholder='Gmail' className='placeholder:pl-2 placeholder:font-bold  border mb-3 rounded w-100 h-10 ' />
            <label className='font-bold font-mono text-red-600 w-100'>Password</label>
            <input type="password" placeholder='Password' className='placeholder:pl-2 placeholder:font-bold  border rounded w-100 h-10 ' />
          </div>
          <div className='flex items-center justify-center'>
            <button className='border rounded font-bold font-[poppins] w-100 h-10  bg-red-400 text-white'>Sign up</button>
          </div>
          <div className='flex justify-center mb-5'>
            <NavLink to='/login' className='text-sm text-blue-700'>
              Already have an account? Log in
            </NavLink>
          </div>

        </form>
      </div>
    </>
  )
}

export default ResetPassword