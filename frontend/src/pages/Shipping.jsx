import axios from "axios";
import React, { useEffect, useState } from "react";
import images from "../assets/images";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Shipping = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [user, setUser] = useState({ name: "", email: "" });

  //  Load cart instantly from localStorage before anything renders
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //  Fetch user info + saved address if any
  const fetchUserAddress = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/fetchuseraddress`,
        {},
        { headers: { token }, withCredentials: true }
      );

      const userData = response.data.data;
      setUser({
        name: userData.name || "",
        email: userData.email || "",
      });
      setAddress({
        street: userData?.address?.street || "",
        city: userData?.address?.city || "",
        state: userData?.address?.state || "",
        zipcode: userData?.address?.zipcode || "",
        country: userData?.address?.country || "",
        phone: userData?.address?.phone || "",
      });
    } catch (err) {
      console.error("Fetch user address error:", err);
    }
  };

  //  Sync cart with localStorage changes across tabs/components
  useEffect(() => {
    fetchUserAddress();

    const handleStorageChange = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(stored);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  //  Recalculate total safely
  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => {
      const qty = item.quantity || item.units || 1;
      const price = item.offerPrice || item.price || 0;
      return acc + price * qty;
    }, 0);

  const shippingFee = 60;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;

  //  Place Order Function
  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      items: cartItems,
      amount: total,
      address,
      paymentMethod,
    };

    try {
      if (paymentMethod === "COD") {
        const res = await axios.post(
          `${import.meta.env.VITE_URL}/order/placeorder`,
          orderData,
          { headers: { token } }
        );

        if (res.status === 200) {
          localStorage.removeItem("cart");
          toast.success("Order placed successfully (COD)");
          navigate("/orders");
        }
      } else if (paymentMethod === "Razorpay") {
        const {
          data: { order },
        } = await axios.post(
          `${import.meta.env.VITE_URL}/order/razorpay/create-order`,
          { amount: total },
          { headers: { token } }
        );

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: order.amount,
          currency: "INR",
          name: "Grocery Store",
          description: "Order Payment",
          order_id: order.id,
          handler: async function (response) {
            try {
              await axios.post(
                `${import.meta.env.VITE_URL}/order/razorpay/verify-payment`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderData,
                },
                { headers: { token } }
              );

              localStorage.removeItem("cart");
              toast.success("Payment successful! Order placed.");
              navigate("/orders");
            } catch (err) {
              console.error("Payment verification failed:", err);
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: address.phone,
          },
          theme: { color: "#000000" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Something went wrong while placing order.");
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6 pt-40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-80">
        {/* Delivery Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            DELIVERY <span className="text-black">INFORMATION</span>
          </h2>
          <form className="space-y-4" onSubmit={handleFormSubmission}>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="First name"
              className="border w-full p-3 rounded-md"
            />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email address"
              className="border w-full p-3 rounded-md"
            />
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              placeholder="Street"
              className="border w-full p-3 rounded-md"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                type="text"
                placeholder="City"
                className="border w-full p-3 rounded-md"
              />
              <input
                type="text"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                placeholder="State"
                className="border w-full p-3 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                value={address.zipcode}
                onChange={(e) =>
                  setAddress({ ...address, zipcode: e.target.value })
                }
                type="text"
                placeholder="Zipcode"
                className="border w-full p-3 rounded-md"
              />
              <input
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                type="text"
                placeholder="Country"
                className="border w-full p-3 rounded-md"
              />
            </div>
            <input
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
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

          {/* Cart Items */}
          <div className="max-h-60 overflow-y-auto border-b pb-3">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                const itemName = item.name || item.title;
                const qty = item.quantity || item.units || 1;
                const price = item.offerPrice || item.price || 0;
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-3 text-gray-700"
                  >
                    <div>
                      <p className="font-semibold">{itemName}</p>
                      <p className="text-sm text-gray-500">
                        {qty} × ₹{price}
                      </p>
                    </div>
                    <span className="font-bold">₹{price * qty}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">
                Your cart is empty.
              </p>
            )}
          </div>

          {/* Totals */}
          <div className="border-b pb-3 flex justify-between text-gray-700 mt-3">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="border-b pb-3 flex justify-between text-gray-700 mt-3">
            <span>Shipping Fee</span>
            <span>₹{shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-black font-bold mt-3">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {/* Payment Method */}
          <h2 className="text-xl font-bold text-gray-700 mt-8 mb-4">
            PAYMENT <span className="text-black">METHOD</span>
          </h2>
          <div className="flex gap-4">
            <label className="flex items-center font-bold border p-3 rounded-md w-full cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <img src={images.Razorpay} alt="Razorpay" className="h-5" />
              Razorpay
            </label>
            <label className="flex items-center border p-3 font-bold rounded-md w-full cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Cash on delivery
            </label>
          </div>

          <button
            onClick={handleFormSubmission}
            className="mt-6 bg-black text-white px-6 py-3 w-full rounded-md hover:bg-gray-800 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
