import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Loader2,
  Package,
  CreditCard,
  MapPin,
  XCircle,
  RotateCcw,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch all orders (Admin)
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/fetchorders`);
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 md:px-16 lg:px-24">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
        All Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-8">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-all"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" /> Order #
                    {order._id.slice(-6)}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    <b>User ID:</b> {order.userId?._id || order.userId}
                    <br />
                    <b>User:</b> {order.userId?.name || "Unknown User"}
                    <br />
                    <b>Email:</b> {order.userId?.email || "No Email"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    order.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : order.status === "Delivered"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Returned"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-3 border-t border-gray-100 pt-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
                  >
                    {/* Product Image */}
                    <div className="flex items-center gap-4 w-full">
                      <img
                        src={
                          Array.isArray(item.images)
                            ? item.images[0]
                            : item.image || "/placeholder.png"
                        }
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="flex flex-col flex-1">
                        <p className="text-gray-800 font-medium">{item.title}</p>
                        <p className="text-gray-500 text-xs">
                          Size: {item.size} | Units: {item.units}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm font-medium whitespace-nowrap">
                      ₹{item.offerPrice || item.price} × {item.units}
                    </p>
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              <div className="mt-4 flex flex-col sm:flex-row justify-between text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-500" />
                  <span>
                    Payment: <b>{order.paymentMethod}</b>{" "}
                    {order.payment ? (
                      <span className="text-green-600 font-semibold">(Paid)</span>
                    ) : (
                      <span className="text-red-600 font-semibold">(Unpaid)</span>
                    )}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Total: ₹{order.amount}</span>
                </div>
              </div>

              {/* Address */}
              <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-1 text-rose-500" />
                <div>
                  <p>
                    <b>Address:</b> {order.address.street}
                  </p>
                  <p>
                    {order.address.city}, {order.address.state} -{" "}
                    {order.address.zipcode || order.address.zip}
                  </p>
                  <p>
                    {order.address.country} |{" "}
                    <b>Phone:</b> {order.address.phone}
                  </p>
                </div>
              </div>

              {/* Extra Info */}
              <div className="mt-3 text-xs text-gray-500">
                <p>
                  <b>Created:</b>{" "}
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>
                <p>
                  <b>Updated:</b>{" "}
                  {new Date(order.updatedAt).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                {order.status === "Confirmed" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                  >
                    <XCircle className="w-4 h-4" /> Cancel
                  </button>
                )}

                {order.status === "Delivered" && (
                  <button
                    onClick={() => handleReturn(order._id)}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                  >
                    <RotateCcw className="w-4 h-4" /> Return
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
