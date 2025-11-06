import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/order/myorders`, {
          headers: { token },
        });
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Fetch Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await axios.put(`${import.meta.env.VITE_URL}/order/cancel/${id}`, {}, { headers: { token } });
      alert("Order cancelled successfully");
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: "Cancelled" } : o)));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel order");
    }
  };

  const handleReturn = async (id) => {
    if (!window.confirm("Return this order?")) return;
    try {
      await axios.put(`${import.meta.env.VITE_URL}/order/return/${id}`, {}, { headers: { token } });
      alert("Order returned successfully");
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: "Returned" } : o)));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to return order");
    }
  };

  // Skeleton Loader
  const SkeletonOrder = () => (
    <div className="bg-[#161a25]/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-5">
        <div className="h-4 bg-gray-700 rounded w-40"></div>
        <div className="h-5 bg-gray-700 rounded w-20"></div>
      </div>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-700 rounded-xl"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-40"></div>
                <div className="h-3 bg-gray-700 rounded w-24"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="h-5 bg-gray-700 rounded w-24"></div>
        <div className="flex gap-4">
          <div className="h-9 bg-gray-700 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f111a] to-[#1a1d29] pt-32 px-6 pb-20 font-[Poppins]">
        {/* <h1 className="text-4xl font-extrabold text-left text-white mb-14 tracking-wide">
          My <span className="text-red-400">Orders</span>
        </h1> */}
        <div className="max-w-6xl mx-auto space-y-10">
          {[1, 2, 3].map((_, idx) => (
            <SkeletonOrder key={idx} />
          ))}
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="pt-40 text-center text-gray-400">
        <h2 className="text-3xl font-semibold tracking-wide">No orders yet</h2>
        <p className="mt-2 text-sm">Start shopping and track your purchases here!</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f111a] to-[#1a1d29] pt-32 px-6 pb-20 font-[Poppins]">
      {/* <h1 className="text-4xl font-extrabold text-left font-sans text-white mb-14 tracking-wide">
        My <span className="text-red-400">Orders</span>
      </h1> */}

      <div className="max-w-6xl mx-auto space-y-10">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-[#161a25]/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
          >
            <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-3 mb-5">
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Order ID:</span> {order._id}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                  order.status === "Delivered"
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : order.status === "Cancelled"
                    ? "bg-red-500/10 text-red-400 border border-red-500/30"
                    : order.status === "Returned"
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center justify-between py-3 border-b border-gray-700 last:border-none"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-700"
                    />
                    <div>
                      <p className="font-semibold text-gray-100 text-base">
                        {item.name || item.title}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Size: <span className="text-gray-300">{item.size || "-"}</span> | Qty:{" "}
                        <span className="text-gray-300">{item.quantity || 1}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-green-400 mt-3 sm:mt-0">
                    ₹{item.price || item.offerPrice}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
              <p className="text-xl font-bold text-white">
                Total: <span className="text-green-400">₹{order.amount}</span>
              </p>

              <div className="flex gap-4 mt-4 sm:mt-0">
                {order.status === "Pending" || order.status === "Confirmed" ? (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    Cancel Order
                  </button>
                ) : order.status === "Delivered" ? (
                  <button
                    onClick={() => handleReturn(order._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    Return Order
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
