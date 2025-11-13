import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Breadcrumb from "../components/Breadcrums";

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
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_URL}/order/cancel/${id}`, {}, { headers: { token } });
      toast.success("Order cancelled successfully");
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: "Cancelled" } : o)));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  const handleReturn = async (id) => {
    if (!window.confirm("Return this order?")) return;
    try {
      await axios.put(`${import.meta.env.VITE_URL}/order/return/${id}`, {}, { headers: { token } });
      toast.success("Order returned successfully");
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: "Returned" } : o)));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to return order");
    }
  };

  const SkeletonOrder = () => (
    <div className="bg-[#161a25]/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-3 mb-5">
        <div className="h-4 bg-gray-700 rounded w-40"></div>
        <div className="h-5 bg-gray-700 rounded w-20"></div>
      </div>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-center justify-between py-3 border-b border-gray-700"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-20 h-20 bg-gray-700 rounded-xl"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-40"></div>
                <div className="h-3 bg-gray-700 rounded w-24"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-16 mt-3 sm:mt-0"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between items-center mt-6 gap-3">
        <div className="h-5 bg-gray-700 rounded w-24"></div>
        <div className="flex gap-3">
          <div className="h-9 bg-gray-700 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f111a] to-[#1a1d29] pt-28 px-4 sm:px-6 pb-20 font-[Poppins]">
        <div className="max-w-6xl mx-auto space-y-10">
          {[1, 2, 3].map((_, idx) => (
            <SkeletonOrder key={idx} />
          ))}
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="pt-40 h-[60vh] text-center text-gray-400">
           <div className="pl-4 sm:pl-20 pt-5 pb-5 w-full">
        <Breadcrumb Home="Home" Orders="Orders" />
      </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide">No orders yet</h2>
        <p className="mt-2 text-sm sm:text-base">Start shopping and track your purchases here!</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f111a] to-[#1a1d29] pt-28 sm:pt-32 px-3 sm:px-6 pb-24 font-[Poppins]">
      <div className="pl-4 sm:pl-10 pt-5 pb-5 w-full">
        <Breadcrumb Home="Home" Orders="Orders" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-[#161a25]/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-5 sm:p-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-700 pb-3 mb-5 gap-2">
              <p className="text-xs sm:text-sm text-gray-400 break-all">
                <span className="font-medium text-gray-300">Order ID:</span> {order._id}
              </p>
              <span
                className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold ${
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

            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-700 last:border-none gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-gray-700"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-100 text-sm sm:text-base leading-tight truncate">
                        {item.name || item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Size: <span className="text-gray-300">{item.size || "-"}</span> | Qty:{" "}
                        <span className="text-gray-300">{item.units}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-green-400 sm:mt-0">
                    ₹{item.price || item.offerPrice}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <p className="text-lg sm:text-xl font-bold text-white text-center sm:text-left">
                Total: <span className="text-green-400">₹{order.amount}</span>
              </p>

              <div className="flex flex-wrap justify-center sm:justify-end gap-3">
                {order.status === "Pending" || order.status === "Confirmed" ? (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    Cancel Order
                  </button>
                ) : order.status === "Delivered" ? (
                  <button
                    onClick={() => handleReturn(order._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
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
