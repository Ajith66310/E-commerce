// src/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers,FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Sidebar = ({setToken}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
  localStorage.removeItem("token");
  setToken("");
  navigate("/login", { replace: true });
};


  return (
    <div className="h-screen w-64 fixed top-0 left-0 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-xl font-serif font-extrabold">BONKERS CORNER</h1>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-gray-800 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
        >
          <FaHome className="mr-3" />
          Dashboard
        </NavLink>

        <NavLink
          to="add-product"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-gray-800 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
        >
          <FaPlus className="mr-3" />
          Add Product
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-gray-800 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
        >
         <FaCartShopping className=" mr-3"/>
           Products
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-gray-800 ${
              isActive ? "bg-gray-800" : ""
            }`
          }
        >
         <FaUsers className="mr-3" />
           Users
        </NavLink>
      </nav>



      {/* Logout at bottom */}
      {token && (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
