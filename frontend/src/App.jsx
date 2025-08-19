import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Header from './components/Header';
import Fashion from './pages/Fashion';
import Wishlist from './pages/Wishlist';
import Signup from './pages/Signup';
import SendMail from './pages/SendMail';
import ResetPassword from './pages/ResetPassword';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import VerifyOtp from './pages/VerifyOtp';

const App = () => {
  return (
    <BrowserRouter>
           <ToastContainer position="top-left" autoClose={2000}/>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='fashion' element={<Fashion />} />
          <Route path='contact' element={<Contact />} />
          <Route path='sendmail' element={<SendMail />} />
          <Route path='resetpassword/:token' element={<ResetPassword />} />
          <Route path='contact' element={<Contact />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='verifyotp' element={<VerifyOtp/>} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App