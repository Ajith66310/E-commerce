import axios from "axios";
import React, { useEffect, useState } from "react";

const Shipping = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const [user,setUser] = useState({
    name:"",
    email: ""
  })

  const token = localStorage.getItem('token')

  const fetchUserAddress = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/fetchuseraddress`,
        {},
        {
          headers: { token },
          withCredentials: true,
        }
      );
      setAddress(response.data.data.address);
      setUser(response.data.data);
    } catch (err) {
      console.error("Fetch user address error:", err);
    }
  };


  useEffect(() => {
    fetchUserAddress()
  }, []);

  const handleFormSubmission = async(req,res)=>{

  }
  return (
    <div className="min-h-screen bg-white py-10 px-6 pt-40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-80">
        {/* Delivery Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            DELIVERY <span className="text-black">INFORMATION</span>
          </h2>
          <form className="space-y-4" onSubmit={handleFormSubmission}>
            <div className="w-full">
              <input
                type="text"
                defaultValue={user.name}
                placeholder="First name"
                className="border w-full p-3 rounded-md"
                />

            </div>
            <input
              type="email"
              defaultValue={user.email}
              placeholder="Email address"
              className="border w-full p-3 rounded-md"
            />
            <input
              type="text"
              placeholder="Street"
              defaultValue={address.street}
              className="border w-full p-3 rounded-md"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                defaultValue={address.city}
                type="text"
                placeholder="City"
                className="border w-full p-3 rounded-md"
              />
              <input
                type="text"
                placeholder="State"
                defaultValue={address.state}
                className="border w-full p-3 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                defaultValue={address.zipcode}
                type="text"
                placeholder="Zipcode"
                className="border w-full p-3 rounded-md"
              />
              <input
                defaultValue={address.country}
                type="text"
                placeholder="Country"
                className="border w-full p-3 rounded-md"
              />
            </div>
            <input
              defaultValue={address.phone}
              type="text"
              placeholder="Phone"
              className="border w-full p-3 rounded-md"
            />
          </form>
        </div>

        {/* Cart Totals */}
        <div className="pt-5">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            CART <span className="text-black">TOTALS</span>
          </h2>
          <div className="border-b pb-3 flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>₹40.00</span>
          </div>
          <div className="border-b pb-3 flex justify-between text-gray-700 mt-3">
            <span>Shipping Fee</span>
            <span>₹60.00</span>
          </div>
          <div className="flex justify-between text-black font-bold mt-3">
            <span>Total</span>
            <span>₹100.00</span>
          </div>

          {/* Payment Method */}
          <h2 className="text-xl font-bold text-gray-700 mt-8 mb-4">
            PAYMENT <span className="text-black">METHOD</span>
          </h2>
          <div className="flex gap-4">
            <label className="flex items-center border p-3 rounded-md w-full cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/31/Razorpay_logo.png"
                alt="Razorpay"
                className="h-5"
              />
            </label>
            <label className="flex items-center border p-3 rounded-md w-full cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              CASH ON DELIVERY
            </label>
          </div>

          {/* Place Order */}
          <button className="mt-6 bg-black text-white px-6 py-3 w-full rounded-md hover:bg-gray-800 transition">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
