import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaClipboardListSolid } from "react-icons/lia";

const Sidebar = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login", { replace: true });
  };

  //Close sidebar when clicking outside (mobile only)
  //Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        !e.target.closest(".hamburger-btn") //  ignore hamburger itself
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  //Toggle sidebar on hamburger click
  const handleHamburgerClick = (e) => {
    e.stopPropagation(); //  prevent bubbling
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/*Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 fixed top-0 left-0 bg-gray-900 text-white flex-col">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className="text-xl font-serif font-extrabold">Vestido Club</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaHome className="mr-3" />
            Dashboard
          </NavLink>

          <NavLink
            to="add-product"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaPlus className="mr-3" />
            Add Product
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <IoCartSharp className="mr-3" />
            Products
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaUsers className="mr-3" />
            Users
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <LiaClipboardListSolid className="mr-3"/>
              Orders
          </NavLink>
        </nav>

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

      {/*Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-gray-900 text-white flex items-center justify-between px-4 py-3 shadow-lg">
        <h1 className="text-lg font-serif font-extrabold">Vestido Club</h1>

        <div className="flex items-center gap-4">
          {token && (
            <button onClick={handleLogout}>
              <FaSignOutAlt className="text-lg hover:text-red-400" />
            </button>
          )}
          <RxHamburgerMenu
            onClick={handleHamburgerClick}
            className="text-2xl cursor-pointer hamburger-btn"
          />
        </div>
      </div>

      {/*Mobile Sidebar (always mounted for smooth toggle) */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 transition-all duration-300 md:hidden ${isOpen ? "w-3/4 sm:w-1/2 p-4" : "w-0 p-0"
          }`}
      >
        <div className={`${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-serif font-extrabold">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 text-lg"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            <NavLink
              onClick={() => setIsOpen(false)}
              to="dashboard"
              className={({ isActive }) =>
                `block p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <FaHome className="inline mr-3" />
              Dashboard
            </NavLink>

            <NavLink
              onClick={() => setIsOpen(false)}
              to="add-product"
              className={({ isActive }) =>
                `block p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <FaPlus className="inline mr-3" />
              Add Product
            </NavLink>

            <NavLink
              onClick={() => setIsOpen(false)}
              to="/products"
              className={({ isActive }) =>
                `block p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <IoCartSharp className="inline mr-3" />
              Products
            </NavLink>

            <NavLink
              onClick={() => setIsOpen(false)}
              to="/users"
              className={({ isActive }) =>
                `block p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <FaUsers className="inline mr-3" />
              Users
            </NavLink>
            
            <NavLink
              onClick={() => setIsOpen(false)}
              to="/orders"
              className={({ isActive }) =>
                `block p-3 rounded-lg hover:bg-gray-800 ${isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <LiaClipboardListSolid className="inline mr-3" />
              Orders
            </NavLink>
            
          </nav>
        </div>
      </div>

      {/*Overlay (click outside to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
