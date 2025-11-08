import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ProductItem = ({ id, title, img, price, percentage, textColor, btnText }) => {
  const { toggleLike, isLiked } = useContext(UserContext);
  const liked = isLiked(id);

  const textClass = textColor === "black" ? "text-gray-900" : "text-white";
  const numericPrice = Number(price) || 0;
  const numericDiscount = Number(String(percentage).replace("%", "")) || 0;
  const offerPrice = Math.round(numericPrice - (numericPrice * numericDiscount) / 100);
  const btn = btnText === "View" ? "View" : "Add to Cart";

  const handleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleLike({ _id: id, title, img, price, percentage });
  };

  return (
    <div
      className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl
                 transition-all duration-500 bg-white/80 backdrop-blur-sm border border-gray-100"
    >
      {/* Like Button */}
      <button
        onClick={handleLike}
        className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 
                   text-xl shadow-md hover:scale-110 hover:bg-white transition-all duration-300"
      >
        {liked ? (
          <FaHeart className="text-red-600 transition-colors duration-300" />
        ) : (
          <FaRegHeart className="text-gray-500 hover:text-red-600 transition-colors duration-300" />
        )}
      </button>

      {/* Product Image */}
      <NavLink to={`/product/${id}`}>
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-5">
          <p
            className={`text-lg md:text-xl font-semibold font-[Playfair_Display] tracking-wide ${textClass} line-clamp-1`}
          >
            {title}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <p className="text-gray-500 line-through text-sm md:text-base">₹{Math.round(numericPrice)}</p>
            <p className="text-lg md:text-xl font-bold text-gray-900">₹{offerPrice}</p>
            <span className="text-red-600 text-sm font-medium">-{numericDiscount}%</span>
          </div>

          <button
            className="mt-4 w-full py-2 md:py-3 rounded-lg bg-gradient-to-r from-red-800 to-red-600 
                       text-white font-[Poppins] font-semibold tracking-wide shadow-md
                       hover:from-gray-900 hover:to-gray-800 transition-all duration-300"
          >
            {btn}
          </button>
        </div>
      </NavLink>
    </div>
  );
};

export default ProductItem;
