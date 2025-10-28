import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ProductItem = ({ id, title, img, price, percentage, textColor, btnText }) => {
  const { toggleLike, isLiked } = useContext(UserContext);
  const liked = isLiked(id);
  const textClass = textColor === "black" ? "text-black" : "text-white";

  // Coerce to numbers safely
  const numericPrice = Number(price) || 0;
  const numericDiscount = Number(String(percentage).replace("%", "")) || 0;
  const offerPrice = Math.round(numericPrice - (numericPrice * numericDiscount) / 100);
  const btn = btnText === "View" ? "View" : "Add to cart";

  // Stop NavLink navigation when clicking heart
  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleLike({ _id: id, title, img, price, percentage });
  };

  return (
    <div className="relative rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition duration-300">
      {/* Heart Button (above image, top-right corner) */}
      <button
        onClick={handleLike}
        className="absolute top-3 right-3 z-20 bg-white/80 rounded-full p-2 text-xl shadow hover:scale-110 transition"
      >
        {liked ? (
          <FaHeart className="text-red-600" />
        ) : (
          <FaRegHeart className="text-gray-500 hover:text-red-600" />
        )}
      </button>

      {/* Product Image wrapped in NavLink */}
      <NavLink to={`/product/${id}`}>
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-3">
          <p className={`text-lg font-extrabold mt-2 ${textClass}`}>{title}</p>
          <div className="flex gap-3 items-center">
            <p className={`line-through ${textClass}`}>₹{Math.round(numericPrice)}</p>
            <p className={`font-bold ${textClass}`}>₹{offerPrice}</p>
            <p className="text-red-600 font-medium">-{numericDiscount}%</p>
          </div>

          {/* View Button */}
          <button className="bg-red-800 text-white w-full mt-3 py-2 rounded-md hover:bg-gray-900 transition">
            {btn}
          </button>
        </div>
      </NavLink>
    </div>
  );
};

export default ProductItem;
