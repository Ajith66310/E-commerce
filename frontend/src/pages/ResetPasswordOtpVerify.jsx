
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const ResetPasswordOtpVerify = () => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()



  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${import.meta.env.VITE_URL}/resetotpverify`, { otp }, { withCredentials: true })
      toast.success(response.data.message)
      navigate('/login')
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 3000);
    }
  }

  const resendOtp = async () => {
    try {

      const response = await axios.post(`${import.meta.env.VITE_URL}/resendresetotp`, { withCredentials: true });

      toast.success(response.data.message);
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    }
  };


 
  return (
    <div className='flex min-h-screen justify-center items-center bg-[#F7F5F2]'>
      <form
        onSubmit={handleVerifyOtp}
        className='w-[90%] sm:w-[400px] bg-white shadow-lg rounded-2xl p-8 space-y-6'
      >
        <div className='text-center space-y-2'>
          <h2 className='font-[Poppins] text-xl font-semibold text-red-600'>Verify OTP</h2>
          <p className='font-[Inter] text-gray-600 text-sm'>
            Enter the 6-digit OTP we sent to <span className='font-medium text-gray-800'>email</span>.
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <label className='font-[Inter] font-semibold text-red-600'>OTP</label>
          <input
            type="number"
            required
            placeholder='Enter OTP'
            onChange={(e) => setOtp(e.target.value)}
            className='pl-3 placeholder:text-gray-500 border rounded-lg w-full h-11 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm'
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
          type="submit"
          disabled={loading}
          className={`w-full h-11 rounded-lg font-[Poppins] font-semibold text-white shadow-md transition 
    ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-400 hover:shadow-lg"}`}
        >
          {loading ? "Please Wait.." : "Verify"}
        </button>
      </form>
    </div>
  )
}

export default ResetPasswordOtpVerify