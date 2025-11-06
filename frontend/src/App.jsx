import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Header from './components/Header';
import Fashion from './pages/Fashion';
import Favourite from './pages/Favourite';
import Signup from './pages/Signup';
import SendMail from './pages/SendMail';
import ResetPassword from './pages/ResetPassword';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import VerifyOtp from './pages/VerifyOtp';
import ResetPasswordOtpVerify from './pages/ResetPasswordOtpVerify';
import Product from './pages/Product';
import Shipping from './pages/Shipping';
import UserProfile from './pages/UserProfile.jsx';
import Orders from './pages/Orders.jsx';

const App = () => {
  return (
    <BrowserRouter>
           <ToastContainer position="top-left" autoClose={2000}/>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='*' element={<NotFound />} />
          <Route index element={<Home /> } />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='fashion' element={<Fashion />} />
          <Route path='product/:id' element={<Product/>} />
          <Route path='sendmail' element={<SendMail />} />
          <Route path='resetpassword/:token' element={<ResetPassword />} />
          <Route path='favourite' element={<Favourite />} />
          <Route path='verifyotp' element={<VerifyOtp/>} />
          <Route path='resetotpverify' element={<ResetPasswordOtpVerify/>} />
          <Route path='shipping' element={<Shipping/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Route>
          <Route path='userprofile' element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App