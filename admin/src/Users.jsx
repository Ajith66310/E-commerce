// src/components/Users.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchUsers = async (page) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/adminfetchuser?page=${page}&limit=${limit}`
      );
      setUsers(res.data.users.reverse());
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePrev = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/removeusers/${id}`);
      fetchUsers(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlock = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/admin/users/${id}/block`);
      fetchUsers(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">User Management</h1>

        <div className="flex flex-col items-center gap-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] flex flex-col sm:flex-row items-center justify-between p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all"
            >
              {/* Left: user info */}
              <div className="flex items-center gap-4 w-full sm:w-auto mb-3 sm:mb-0">
                <img
                  src={u.image || "/default-user.png"}
                  alt={u.name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />

                <div>
                  <p className="font-semibold text-gray-900">{u.name}</p>
                  <p className="text-gray-600 text-sm">{u.email}</p>
                  <p className="text-sm text-gray-500">
                    Role: <span className="font-medium">{u.role}</span> | Status:{" "}
                    <span
                      className={`font-medium ${
                        u.status === "blocked" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {u.status}
                    </span>
                  </p>
                  {u.address?.city && (
                    <p className="text-sm text-gray-500">
                      City: {u.address.city} | Phone: {u.address.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: action buttons */}
              <div className="flex flex-row sm:flex-col md:flex-row gap-3">
                <button
                  onClick={() => handleRemove(u._id)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                >
                  Remove
                </button>

                <button
                  onClick={() => handleBlock(u._id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    u.status === "blocked"
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }`}
                >
                  {u.status === "blocked" ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400"
          >
            Prev
          </button>
          <span className="text-gray-800 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
