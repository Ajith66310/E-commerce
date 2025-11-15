import axios from "axios";
import React, { useEffect, useState } from "react";
import images from "../assets/images";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const Shipping = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [editToggle, setEditToggle] = useState(true);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [user, setUser] = useState({ name: "", email: "" });
  const [hasAddress, setHasAddress] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

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
      setHasAddress(!!userData?.address?.street);
    } catch (err) {
      console.error("Fetch user address error:", err);
    }
  };

  useEffect(() => {
    fetchUserAddress();
  }, []);

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => {
      const qty = item.units || item.quantity || 1;
      const price = item.offerPrice || item.price || 0;
      return acc + price * qty;
    }, 0);

  const shippingFee = 60;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!hasAddress) {
      toast.error("Please add your address before placing an order.");
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
          dispatch(clearCart());
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
          name: "Fashion Store",
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
              dispatch(clearCart());
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

  const handleDone = () => {
    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !address.street.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.zipcode.trim() ||
      !address.country.trim() ||
      !address.phone.trim()
    ) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    setHasAddress(true);
    setEditToggle(true);
    toast.success("Address updated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-12 px-6 pt-36 font-[Poppins] text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Delivery Information */}
        {editToggle && (
          <div className="p-8 backdrop-blur-md bg-white/80 border max-md:h-[50vh] h-[40vh] border-gray-200 rounded-2xl shadow-lg space-y-5 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Delivery <span className="text-black">Information</span>
            </h2>

            <div className="flex flex-col sm:flex-row sm:justify-between  gap-6">
              <div className="flex-1 text-base leading-relaxed">
                {hasAddress ? (
                  <>
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p className="text-gray-600">{address.street}</p>
                    <p className="text-gray-600">
                      {address.city}, {address.state}, {address.country} – {address.zipcode}
                    </p>
                    <p className="text-gray-600">{address.phone}</p>
                    <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                  </>
                ) : (
                  <p className="text-gray-500 italic">No address found.</p>
                )}
              </div>

              <button
                onClick={() => setEditToggle(false)}
                className="self-start  px-6 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:scale-105 transition-transform"
              >
                {hasAddress ? "Change Address" : "Add Address"}
              </button>
            </div>
          </div>
        )}

        {!editToggle && (
          <div className="p-8 backdrop-blur-md bg-white/80 border border-gray-200 rounded-2xl shadow-lg space-y-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Delivery <span className="text-black">Information</span>
            </h2>
            <form className="space-y-5">
              {[
                { value: user.name, label: "Full name", setter: (val) => setUser({ ...user, name: val }) },
                { value: user.email, label: "Email address", setter: (val) => setUser({ ...user, email: val }) },
                { value: address.street, label: "Street", setter: (val) => setAddress({ ...address, street: val }) },
              ].map((input, i) => (
                <input
                  key={i}
                  type="text"
                  value={input.value}
                  onChange={(e) => input.setter(e.target.value)}
                  placeholder={input.label}
                  className="w-full p-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all"
                />
              ))}

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: address.city, label: "City", setter: (val) => setAddress({ ...address, city: val }) },
                  { value: address.state, label: "State", setter: (val) => setAddress({ ...address, state: val }) },
                ].map((input, i) => (
                  <input
                    key={i}
                    type="text"
                    value={input.value}
                    onChange={(e) => input.setter(e.target.value)}
                    placeholder={input.label}
                    className="p-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all"
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: address.zipcode, label: "Zipcode", setter: (val) => setAddress({ ...address, zipcode: val }) },
                  { value: address.country, label: "Country", setter: (val) => setAddress({ ...address, country: val }) },
                ].map((input, i) => (
                  <input
                    key={i}
                    type="text"
                    value={input.value}
                    onChange={(e) => input.setter(e.target.value)}
                    placeholder={input.label}
                    className="p-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all"
                  />
                ))}
              </div>

              <input
                type="text"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                placeholder="Phone number"
                className="w-full p-3 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all"
              />

              <button
                type="button"
                onClick={handleDone}
                className="mt-4 w-full bg-black text-white py-3 rounded-full font-medium tracking-wide hover:scale-[1.02] transition-transform"
              >
                Done
              </button>
            </form>
          </div>
        )}

        {/* Cart Totals */}
        <div className="p-8 backdrop-blur-md bg-white/80 border border-gray-200 rounded-2xl shadow-lg space-y-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900">
            Cart <span className="text-black">Summary</span>
          </h2>

          <div className="max-h-56 overflow-y-auto divide-y divide-gray-200">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                const itemName = item.name || item.title;
                const qty = item.units || item.quantity || 1;
                const price = item.offerPrice || item.price || 0;
                return (
                  <div
                    key={index}
                    className="flex justify-between py-3 text-gray-700"
                  >
                    <div>
                      <p className="font-medium">{itemName}</p>
                      <p className="text-sm text-gray-500">
                        {qty} × ₹{price}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{price * qty}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">
                Your cart is empty.
              </p>
            )}
          </div>

          <div className="text-gray-800 space-y-2 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>₹{shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-black font-bold text-xl pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 pt-4">
            Payment <span className="text-black">Method</span>
          </h2>
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between px-5 py-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <img src={images.Razorpay} alt="Razorpay" className="h-6" />
                <span className="font-semibold">Razorpay</span>
              </div>
            </label>

            <label className="flex items-center justify-between px-5 py-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="font-semibold">Cash on Delivery</span>
              </div>
            </label>
          </div>

          <button
            onClick={handleFormSubmission}
            disabled={!hasAddress}
            className={`mt-8 w-full text-white py-3 text-lg rounded-full font-semibold tracking-wide transition-all ${
              hasAddress
                ? "bg-black hover:scale-[1.02]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
