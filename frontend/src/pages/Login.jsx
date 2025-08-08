import React, { useState } from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const navigate = useNavigate();
  const loginHandle = async(e)=>{
    e.preventDefault()
    try {
   const response = await axios.post(`${import.meta.env.VITE_URL}/login`,{
    email,
    password,
   })   
   toast.success(response.data.message)
   localStorage.setItem("token",  response.data.token); 
   navigate('/')
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message ){
        toast.error(error.response.data.message)
      }
    }
   
  
  }

  return (
    <>
      <div className='pt-20 flex h-[89vh] justify-center bg-[#FAF9F6]'>
        <form action="" method='' onSubmit={loginHandle} className=' w-[80%] h-120'>
          <div className='flex justify-center items-center  mt-10 mb-5 flex-col gap-1'>
            <p className='font-[poppins] w-100 mb-5'>Welcome,<span className='font-bold'>Ajith k v</span></p>
            <label className='font-bold text-red-600 w-100  font-[Lato] '>Email</label>
            <input type="text" required placeholder='Username/email'  className='pl-2 placeholder:font-bold  border mb-3 rounded w-100 h-10  focus:outline-red-600 ' onChange={(e)=>{
              setEmail(e.target.value)
            }} />
            <label className='font-bold font-[Lato] text-red-600 w-100'>Password</label>
            <input type="text" required placeholder='Password'  className='pl-2 placeholder:font-bold  border rounded w-100 h-10  focus:outline-red-600' onChange={(e)=>{
              setPassword(e.target.value)
            }}
            />
            <NavLink to="/sendmail" className='text-sm text-blue-700 w-100'>Forgot password?</NavLink>
          </div>
          <div className='flex items-center justify-center'>
            <button type='submit' className='border rounded font-bold font-[poppins] w-100 h-10  bg-red-400 text-white'>Login</button>
          </div>
          <div className='text-center mb-5'>
            <NavLink to='/signup' className=' text-sm text-blue-700'>
              Don't have an account? Sign up
            </NavLink>
          </div>
          <div className='flex text-3xl items-center justify-center gap-5'>
           <div><FaFacebookSquare className='text-blue-700' /></div>
            <div><FaInstagram  className='text-pink-600'/></div>
            <div><FaSquareThreads /></div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login