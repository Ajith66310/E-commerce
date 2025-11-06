import { useState, useContext, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import Cart from "./Cart";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [userIcon, setUserIcon] = useState(false);
  const navigate = useNavigate();
  const { setCartIcon } = useContext(UserContext);
  const drawerRef = useRef(null); 

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      "#brand-name,#nav-items",
      { opacity: 0, y: 20, ease: "power3.inOut" },
      { opacity: 1, y: 0, stagger: 0.5, delay: 0.2 }
    );
    tl.fromTo(
      "#nav-links",
      { opacity: 0, y: -20, ease: "power1.inOut" },
      { opacity: 1, y: 0 }
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userIcon && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setUserIcon(false);
      }
    };

    if (userIcon) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [userIcon]);

  return (
    <>
      {/* Top Navbar */}
      <div
        className={`${
          userIcon
            ? "hidden"
            : " bg-[transparent] absolute z-50 md:h-20 w-full grid md:grid-cols-3"
        }`}
      >
        {/* Brand */}
        <div id="brand-name" className="flex items-center lg:pl-10 md:pl-0">
          <p className="lg:text-3xl font-serif text-red-800 max-md:hidden font-extrabold md:text-[20px]">
            BONKERS CORNER
          </p>
        </div>

        {/* Desktop Nav Links */}
        <div
          id="nav-links"
          className="max-md:hidden flex justify-center gap-3 items-center"
        >
          <NavLink to="/" className="flex flex-col items-center">
            <p className="font-serif hover:text-red-900 text-red-800">HOME</p>
          </NavLink>
          <NavLink to="/fashion" className="flex flex-col items-center">
            <p className="font-serif hover:text-red-900 text-red-800">FASHION</p>
          </NavLink>
          <NavLink to="/favourite" className="flex flex-col items-center">
            <p className="font-serif hover:text-red-900 text-red-800">
              FAVOURITE
            </p>
          </NavLink>
        </div>

        {/* Desktop Right Items */}
        <div
          id="nav-items"
          className="flex items-center max-md:hidden gap-3 justify-end text-2xl pr-10"
        >
          {token ? (
            <IoIosLogOut
              className="cursor-pointer text-red-800 hover:text-red-900"
              onClick={handleLogout}
            />
          ) : (
            <NavLink to="/login">
              <div className="bg-red-800 w-20 rounded-sm hover:rounded-lg flex items-center justify-center">
                <button className="text-white font-[poppins] cursor-pointer text-lg">
                  Login
                </button>
              </div>
            </NavLink>
          )}

          {/* Cart button */}
          <CiShoppingCart
            onClick={() => setCartIcon(true)}
            className="hover:text-red-900 text-3xl cursor-pointer text-red-800"
          />

          {token && (
            <NavLink to="/userprofile">
              <GoPerson className="cursor-pointer text-red-800 hover:text-red-900" />
            </NavLink>
          )}
        </div>
      </div>

      {/* Small Screen Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white shadow-sm flex items-center justify-between px-4 py-3">
        <p className="text-xl font-bold text-red-800">BONKERS CORNER</p>

        <div className="flex items-center gap-4 text-2xl">
          {/* Cart */}
          <CiShoppingCart
            onClick={() => setCartIcon(true)}
            className="cursor-pointer text-red-800"
          />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setUserIcon(true)}
            className="text-red-800 font-bold text-lg"
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile User Drawer with outside click ref */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full bg-black/90 z-50 overflow-hidden transition-all duration-300 ease-in-out
          ${userIcon ? "w-[50%]" : "w-0"}
        `}
      >
        <div className="md:hidden flex flex-col text-white h-full">
          <div onClick={() => setUserIcon(false)} className="cursor-pointer">
            <p className="text-white text-start p-3">Back</p>
            {token ? (
              <IoIosLogOut
                className="absolute top-3 right-5 cursor-pointer text-2xl hover:text-red-900"
                onClick={handleLogout}
              />
            ) : (
              <NavLink to="/login">
                <CiLogin className="absolute top-3 right-5 cursor-pointer text-2xl hover:text-green-900" />
              </NavLink>
            )}
          </div>
          <NavLink
            onClick={() => setUserIcon(false)}
            className="py-2 pl-6"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setUserIcon(false)}
            className="py-2 pl-6"
            to="/fashion"
          >
            FASHION
          </NavLink>
          <NavLink
            onClick={() => setUserIcon(false)}
            className="py-2 pl-6"
            to="/favourite"
          >
            FAVOURITE
          </NavLink>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart />
    </>
  );
};

export default Navbar;
