import React, { useEffect, useState } from "react";
import axios from "axios";
import { User as UserIcon, Loader2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/adminfetchuser?page=${page}&limit=${limit}`
      );
      setUsers(res.data.users.reverse());
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
    setLoading(true);
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/removeusers/${id}`);

    setUsers((prev) => prev.filter((u) => u._id !== id));

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const handleBlock = async (id) => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/users/${id}/block`
      );

     
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );

      toast.success(res.data.message);

    } catch (err) {
      toast.error("Failed to update user status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="w-full max-w-6xl backdrop-blur-xl bg-white/80 border border-gray-200 rounded-3xl shadow-xl p-8 transition-all duration-300">
        <h1 className="text-4xl font-[Playfair_Display] font-semibold mb-8 text-gray-800 text-center tracking-wide">
          User Management
        </h1>

        <div className="flex flex-col items-center gap-6">
          {users.map((u) => (
            <div
              key={u._id}
              className="w-full flex flex-col sm:flex-row items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
            >
              <div className="flex items-center gap-5 w-full sm:w-auto mb-3 sm:mb-0">
                {u.image ? (
                  <img
                    src={u.image}
                    alt={u.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 border-2 border-gray-300 text-gray-600">
                    <UserIcon size={32} />
                  </div>
                )}

                <div>
                  <p className="font-semibold text-gray-900 text-lg">{u.name}
                    <span
                      className={`font-medium ${u.isBlocked ? "text-red-500" : "text-green-500"
                        }`}
                    >
                      {u.isBlocked === true ? " (Blocked)" : " (Active)"}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">{u.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Role:{" "}
                    <span className="font-medium text-gray-700">{u.role}</span> | Status:{" "}
                    <span
                      className={`font-medium ${u.status === "blocked" ? "text-red-500" : "text-green-500"
                        }`}
                    >
                      {u.status}
                    </span>
                  </p>
                  {u.address?.city && (
                    <p className="text-sm text-gray-500 mt-1">
                      City: {u.address.city} | Phone: {u.address.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-row sm:flex-col md:flex-row gap-3">
                <button
                  onClick={() => handleRemove(u._id)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-md hover:opacity-90 transition-all duration-200"
                >
                  Remove
                </button>

                <button
                  onClick={() => handleBlock(u._id)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${u.isBlocked === true
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-md text-white"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:shadow-md text-white"
                    }`}
                >
                  {u.isBlocked === true ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 gap-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl disabled:opacity-50 hover:bg-gray-300 transition-all duration-200"
          >
            Prev
          </button>
          <span className="text-gray-800 font-medium text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl disabled:opacity-50 hover:bg-gray-300 transition-all duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
