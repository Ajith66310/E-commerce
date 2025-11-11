import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { User, ShoppingBag, Menu, LogOut, Package } from "lucide-react";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/cartSlice";

const Navbar = () => {
  const [userIcon, setUserIcon] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const isCartOpen = useSelector((state) => state.cart.isOpen);

  useGSAP(() => {
    gsap.fromTo(
      "#brand-name,#nav-items",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.4, delay: 0.2 }
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userIcon && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setUserIcon(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [userIcon]);

  return (
    <>
      <div className="hidden md:grid grid-cols-3 w-full absolute z-50 h-20 bg-transparent">
        <div id="brand-name" className="flex items-center pl-10">
          <p className="text-3xl font-serif font-extrabold bg-gradient-to-r from-red-800 to-black bg-clip-text text-transparent">
            BONKERS CORNER
          </p>
        </div>

        <div id="nav-links" className="flex justify-center items-center gap-8 font-serif text-red-800">
          <NavLink to="/" className="hover:text-red-900">HOME</NavLink>
          <NavLink to="/fashion" className="hover:text-red-900">FASHION</NavLink>
          <NavLink to="/favourite" className="hover:text-red-900">FAVOURITE</NavLink>
        </div>

        <div id="nav-items" className="flex justify-end items-center gap-5 pr-10 text-red-800 text-2xl relative">
          <ShoppingBag
            onClick={() => dispatch(toggleCart())}
            className="cursor-pointer hover:text-red-900"
          />

          {token && (
            <div
              className="relative"
              onMouseEnter={() => setProfileDropdown(true)}
              onMouseLeave={() => setProfileDropdown(false)}
            >
              <User className="cursor-pointer hover:text-red-900" />
              {profileDropdown && (
                <div className="absolute right-0  bg-white text-black shadow-xl rounded-lg py-2  ml-5 w-44 border border-gray-200">
                  <NavLink
                    to="/userprofile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    <User className="w-4 h-4" /> Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    <Package className="w-4 h-4" /> My Orders
                  </NavLink>
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer text-red-600"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </div>
                </div>
              )}
            </div>
          )}

          {!token && (
            <NavLink to="/login">
              <div className="bg-red-800 px-4 py-1 rounded-md hover:bg-red-900">
                <button className="text-white text-lg font-[poppins]">Login</button>
              </div>
            </NavLink>
          )}
        </div>
      </div>

      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-black tracking-wide">
          BONKERS<span className="text-gray-900">CORNER</span>
        </p>

        <div className="flex items-center gap-6 text-red-800">
          {token && (
            <NavLink to="/userprofile">
              <User className="w-6 h-6 cursor-pointer hover:text-amber-600 transition-all" />
            </NavLink>
          )}
          <ShoppingBag
            onClick={() => dispatch(toggleCart())}
            className="w-6 h-6 cursor-pointer hover:text-amber-600 transition-all"
          />
          <button onClick={() => setUserIcon(true)} className="hover:text-amber-600 transition-all">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full bg-black/90 z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          userIcon ? "w-[55%]" : "w-0"
        }`}
      >
        <div className="flex flex-col justify-between text-white h-full">
          <div>
            <div onClick={() => setUserIcon(false)} className="cursor-pointer border-b border-gray-700">
              <p className="text-white p-4 font-semibold">Back</p>
            </div>

            <div className="flex flex-col mt-4 space-y-4 pl-6 text-lg">
              <NavLink onClick={() => setUserIcon(false)} to="/" className="hover:text-red-400">
                HOME
              </NavLink>
              <NavLink onClick={() => setUserIcon(false)} to="/fashion" className="hover:text-red-400">
                FASHION
              </NavLink>
              <NavLink onClick={() => setUserIcon(false)} to="/favourite" className="hover:text-red-400">
                FAVOURITE
              </NavLink>
            </div>
          </div>

          <div className="p-6 border-t border-gray-700">
            {token ? (
              <p
                className="cursor-pointer text-xl text-right text-red-500 hover:text-red-700"
                onClick={handleLogout}
              >
                Logout
              </p>
            ) : (
              <NavLink to="/login" onClick={() => setUserIcon(false)}>
                <p className="cursor-pointer text-xl text-right text-green-500 hover:text-green-700">
                  Login
                </p>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {isCartOpen && <Cart />}
    </>
  );
};

export default Navbar;
