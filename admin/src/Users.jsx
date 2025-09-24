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
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePrev = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  // action handlers
  const handleRemove = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/users/${id}`);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="flex flex-col gap-4">
        {users.map((u) => (
          <div key={u._id} className="flex items-center gap-4 p-4 border rounded-lg shadow">
            {/* user image */}
            <img
              src={u.image || "/default-user.png"}
              alt={u.name}
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* user details */}
            <div className="flex-1">
              <p className="font-semibold">{u.name}</p>
              <p className="text-gray-700">{u.email}</p>
              <p className="text-sm text-gray-500">
                Role: {u.role} | Status: {u.status}
              </p>
              {u.address?.city && (
                <p className="text-sm text-gray-500">
                  City: {u.address.city} | Phone: {u.address.phone}
                </p>
              )}
            </div>

            {/* action buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleRemove(u._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
              <button
                onClick={() => handleBlock(u._id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                {u.status === "blocked" ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
