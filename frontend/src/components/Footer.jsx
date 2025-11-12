import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Bonkers Corner</h2>
          <p className="text-sm leading-6">
            Where fashion meets comfort. Discover trendy and sustainable outfits designed for everyday confidence.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white">Mens</a></li>
            <li><a className="hover:text-white">Womens</a></li>
            <li><a  className="hover:text-white">Kids</a></li>
            <li><a className="hover:text-white">Sale</a></li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="" className="hover:text-white">Contact Us</a></li>
            <li><a href="" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="" className="hover:text-white">FAQ</a></li>
            <li><a href="" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay in the Loop</h3>
          <p className="text-sm mb-3">Subscribe for exclusive offers and updates.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-lg  border border-white text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-r-lg hover:bg-gray-200 transition"
            >
              Join
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5">
            <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-white"><FaFacebookF size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Bonkers Corner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
