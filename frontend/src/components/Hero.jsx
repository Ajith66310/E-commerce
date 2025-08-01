import React from 'react'
import { MdOutlineArrowDownward } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-[#FAF9F6] flex">


      {/* left side: 3D Model */}
      <div className="w-1/2 h-full">
       
      </div>

      {/* Right side: Text content */}
      <div className="w-1/2 flex flex-col justify-center pl-30 items-start px-10 text-black">
        <h1 className="text-5xl font-bold mb-4">CR7</h1>
        <p className="text-lg text-black mb-6">
          Trendy fashion for everyone. Shop the latest looks today.
        </p>
        <NavLink to='/shop'>
          <button className="bg-red-700 hover:bg-red-800 px-6 py-2 rounded-full text-black font-semibold">
            Shop Now</button>
        </NavLink>
      </div>

      {/* ↓ Down Arrow Icon */}
      <MdOutlineArrowDownward
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-black text-2xl animate-bounce z-10"
      />
    </div>
  )
}

export default Hero
