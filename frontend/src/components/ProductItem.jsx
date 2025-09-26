import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const ProductItem = ({ id, title, img, price, percentage, textColor, btnText }) => {
  const [liked, setLiked] = useState(false);

  const textClass = textColor === "black" ? "text-black" : "text-white";

  // Coerce to numbers, default to 0 if missing
  const numericPrice = Number(price) || 0;
  const numericDiscount = Number(String(percentage).replace('%', '')) || 0;

  const offerPrice = Math.round(
    numericPrice - (numericPrice * numericDiscount / 100)
  );

  const btn = btnText === "View" ? "View" : "Add to cart";

  return (
    <NavLink to={`/product/${id}`}>
      <div className="relative">
        {/* Product Image */}
        <img src={img} className="pt-10 duration-200" alt={title} />

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault(); // prevent NavLink navigation when clicking heart
            setLiked(!liked);
          }}
          className="flex items-center justify-center rounded-full w-8 h-8 absolute top-11 right-2 min-md:right-3 bg-white/70 hover:bg-white shadow"
        >
          {liked ? (
            <FaHeart className="text-red-600 text-base" />
          ) : (
            <FaRegHeart className="text-red-600 text-base" />
          )}
        </button>

        {/* Product Info */}
        <p className={`text-lg font-extrabold mt-2 ${textClass}`}>{title}</p>
        <div className="flex gap-3 items-center">
          <p className={`line-through ${textClass}`}>₹{Math.round(numericPrice)}</p>
          <p className={`font-bold ${textClass}`}>₹{offerPrice}</p>
          <p className="text-red-600 font-medium">-{numericDiscount}%</p>
        </div>

        {/* View Button */}
        <button className="bg-red-800 text-white w-full mt-2 py-1 rounded-md hover:bg-gray-900">
          {btn}
        </button>
      </div>
    </NavLink>
  );
};

export default ProductItem;
