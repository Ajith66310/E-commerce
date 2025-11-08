// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Users, Package, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/dashboard`
        );
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // 🌟 Premium Animated Loader
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <p className="mt-4 text-lg font-medium text-gray-500">
          Loading Dashboard...
        </p>
      </div>
    );

  if (!stats)
    return (
      <div className="text-center p-10 text-red-500">
        Failed to load dashboard data.
      </div>
    );

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts ?? 0,
      icon: <Package className="w-10 h-10 text-amber-600" />,
      color: "from-amber-100 to-amber-50",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders ?? 0,
      icon: <ShoppingBag className="w-10 h-10 text-blue-600" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: <Users className="w-10 h-10 text-green-600" />,
      color: "from-green-100 to-green-50",
    },
    {
      title: "Total Revenue",
      value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: <DollarSign className="w-10 h-10 text-purple-600" />,
      color: "from-purple-100 to-purple-50",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="text-gray-700 font-semibold">{label}</p>
          <p className="text-purple-600 font-bold">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10 font-[Poppins]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-lg">
          Monitor your platform’s performance with real-time analytics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300`}
          >
            <div className="flex items-center justify-between">
              {card.icon}
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                {card.title}
              </h3>
            </div>
            <p className="text-3xl font-extrabold text-gray-900 mt-4">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Graph */}
      <div className="mt-12 bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
         Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={stats.monthlyRevenue || []}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#ec4899" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="url(#revenueGradient)"
              barSize={40}
              radius={[10, 10, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
