import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Fashion from "./pages/Fashion";
import Favourite from "./pages/Favourite";
import Signup from "./pages/Signup";
import SendMail from "./pages/SendMail";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPasswordOtpVerify from "./pages/ResetPasswordOtpVerify";
import Product from "./pages/Product";
import Shipping from "./pages/Shipping";
import UserProfile from "./pages/UserProfile.jsx";
import Orders from "./pages/Orders.jsx";
import Layout from "./components/Layout.jsx";

const socket = io(import.meta.env.VITE_URL, { transports: ["websocket"] });

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode token to extract user id and email
        const decoded = jwtDecode(token);
        const userId = decoded.id || decoded._id || decoded.userId;

        if (userId) {
          socket.emit("registerUser", userId);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    // Listen for actions from the server
    socket.on("userAction", ({ action }) => {
      if (action === "blocked") {
        toast.error("Your account has been blocked by admin");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
      } else if (action === "removed") {
        toast.error("Your account has been removed by admin");
        localStorage.clear();
        setTimeout(() => navigate("/signup"), 2000);
      }
    });

    // Cleanup socket listener on unmount
    return () => {
      socket.off("userAction");
    };
  }, [navigate]);


  return (
    <>
      <ToastContainer position="top-left" autoClose={2000} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="fashion" element={<Fashion />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="sendmail" element={<SendMail />} />
          <Route path="resetpassword/:token" element={<ResetPassword />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="verifyotp" element={<VerifyOtp />} />
          <Route path="resetotpverify" element={<ResetPasswordOtpVerify />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
