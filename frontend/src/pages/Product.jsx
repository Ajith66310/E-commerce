// src/pages/ProductDetails.jsx
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { products } from "../assets/images";

const Products = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="p-6 text-center">
        <p>Product not found</p>
        <Link to="/fashion" className="text-blue-500">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-20">
      <NavLink to="/fashion" className="inline-block mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" >
        Back
      </NavLink>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white shadow rounded p-6">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-80 object-cover rounded"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-4">₹{product.price}</p>
          <p className="text-sm mt-2">Discount: {product.percentage}%</p>

          <button className="mt-6 w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
