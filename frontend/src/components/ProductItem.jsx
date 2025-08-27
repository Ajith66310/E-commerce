import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductItem = ({ title, img, price, percentage,textColor }) => {
  const [liked, setLiked] = useState(false);

  const textClass = textColor === "black"? "text-black" : "text-white"

  const offerPrice = Math.round(price - (price * percentage / 100)); 


  return (
    <div className="relative">
      {/* Product Image */}
      <img
        src={img}
        className="pt-10 duration-200"
        alt={title}
      />

      {/* Wishlist Heart */}
      <button
        onClick={() => setLiked(!liked)}
        className="flex items-center justify-center rounded-full w-8 h-8  absolute top-11 right-2 min-md:right-3 bg-white/70 hover:bg-white shadow"
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
        <p className={`line-through ${textClass}`}>₹{Math.round(price)}</p>
        <p className={`font-bold ${textClass}`}>₹{offerPrice}</p>
        <p className="text-red-600 font-medium">-{percentage}%</p>
      </div>

      {/* View Button */}
      <button className="bg-red-800 text-white w-full mt-2 py-1 rounded-md hover:bg-gray-900">
        View
      </button>
    </div>
  );
};

export default ProductItem;
