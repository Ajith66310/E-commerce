import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const registerOtpMail = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);

      axios.defaults.withCredentials = true;

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/registerotpmail`,
        { name, email, password },
        { withCredentials: true } // important for cookies
      );

      toast.success(response.data.message)
      
      if (localStorage.getItem("timer")) {
        localStorage.removeItem("timer")
      }
      navigate('/verifyotp')
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }
  
  const  handleSuccess = async(credentialResponse)=>{
    
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/google-signup`,{
        name:decoded.name,
        email:decoded.email,
        googleId:decoded.sub
      })
      toast.success(response.data.message)  
      localStorage.setItem("token",response.data.token)    
      navigate('/')      
    } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      }  
    }
  }


  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <>

      <div className='pt-10 flex min-h-screen justify-center bg-[#F7F5F2] items-center'>
        <form
          onSubmit={registerOtpMail}
          className='w-[90%] sm:w-[400px] bg-white shadow-lg rounded-2xl p-8 space-y-6'
        >
          <div className='text-center space-y-2'>
            <p className='font-[Poppins] text-lg tracking-wide'>
              Welcome to <span className='font-bold text-red-600'>CR7</span>
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <div>
              <label className='font-[Inter] font-semibold text-red-600'>Username</label>
              <input
                required
                type="text"
                placeholder='Enter your name'
                className='pl-3 placeholder:font-medium border rounded-bl-lg rounded-tr-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className='font-[Inter] font-semibold text-red-600'>Gmail</label>
              <input
                type="email"
                required
                placeholder='Enter your email'
                className='pl-3 rounded-tr-lg placeholder:font-medium border rounded-bl-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='relative'>
              <label className='font-[Inter] font-semibold text-red-600'>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder='Enter your password'
                className='pl-3 placeholder:font-medium rounded-tr-lg border rounded-bl-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
                onChange={(e) => setPassword(e.target.value)} />

              {/* 👁 icon */}
              <span
                className='absolute right-3 top-9.5 cursor-pointer text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded-lg font-[Poppins] font-semibold text-white shadow-md transition 
    ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-400 hover:shadow-lg"}`}
          >
            {loading ? "Please Wait.." : "Register"}
          </button>


          <div className='text-center'>
            <NavLink to='/login' className='text-sm text-blue-700 font-medium hover:underline'>
              Already have an account? Log in
            </NavLink>
          </div>

          <div className='flex justify-center flex-col text-2xl gap-5 mt-4'>
            <div>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>
          </div>
        </form>
      </div>

    </>
  )
}

export default Signup;
