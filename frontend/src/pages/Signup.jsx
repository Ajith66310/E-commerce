import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, setSignup] = useState(false);
  
  const handleRegister = async (e) => {
    
   
  }

  const registerOtpMail = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/registerotpmail', {
        email,
      })
      toast.success(response.data.message)
      setSignup(true)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        signup === false ?
          <div className='pt-10 flex  h-[89vh] justify-center bg-[#FAF9F6]'>
            <form action="" method='' onSubmit={registerOtpMail} className=' w-[80%] h-120'>
              <div className='flex justify-center  items-center mt-10 mb-5 flex-col gap-1'>
                <p className='font-[poppins] w-100 mb-5'>Welcome to <span className='font-bold text-red-600 '>CR7</span></p>
                <label className='font-bold text-red-600 font-mono w-100'>Username</label>
                <input required type="text" placeholder='Name' className='pl-2 placeholder:font-bold   border  focus:outline-red-600  mb-3 rounded w-100 h-10 b ' onChange={(e) => {
                  setName(e.target.value)
                }} />
                <label className='font-bold text-red-600 font-mono w-100 '>Gmail</label>
                <input type="text" required placeholder='Gmail' className='pl-2 placeholder:font-bold  border mb-3 rounded w-100 h-10  focus:outline-red-600' onChange={(e) => {
                  setEmail(e.target.value)
                }} />
                <label className='font-bold font-mono text-red-600 w-100'>Password</label>
                <input type="password" required placeholder='Password' className='pl-2 placeholder:font-bold  border rounded w-100 h-10  focus:outline-red-600' onChange={(e) => {
                  setPassword(e.target.value)
                }} />
              </div>
              <div className='flex  flex-col items-center justify-center'>

                <div>
                  <button type='submit' className='border rounded font-bold font-[poppins] w-100 h-10  bg-red-400 text-white' >Register</button>
                </div>


              </div>
              <div className='flex justify-center mb-5'>
                <NavLink to='/login' className='text-sm text-blue-700'>
                  Already have an account? Log in
                </NavLink>
              </div>
              <div className='flex text-3xl items-center justify-center gap-5'>
                <div><FaFacebookSquare className='text-blue-700' /></div>
                <div><FaInstagram className='text-pink-600' /></div>
                <div><FaSquareThreads /></div>
              </div>
            </form>
          </div>
          :
          <div className='pt-10 flex  h-[89vh] justify-center items-center bg-[#FAF9F6]'>
            <form action="" method='' className=' w-[80%] h-120'>
              <div className='flex justify-center  items-center mt-10 mb-5 flex-col gap-1'>
                <label className='font-bold font-mono text-red-600 w-100'>Enter your 6-digits OTP(One-Time-Password)</label>
                <input type="number" required placeholder='OTP' className='pl-2 placeholder:font-bold  border rounded w-100 h-10  focus:outline-red-600' onChange={(e) => {
                  setPassword(e.target.value)
                }} />
              </div>
              <div className='flex justify-center items-center'>
                <button type='submit' className='border rounded font-bold font-[poppins] w-100 h-10  bg-red-400 text-white'>Submit</button>
              </div>
            </form>
          </div>

      }
    </>
  )
}

export default Signup