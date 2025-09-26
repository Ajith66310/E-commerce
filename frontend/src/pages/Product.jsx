// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useParams, Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/fetchproduct/${id}`
        );
        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="p-25 text-center ">
        <p>Product not found</p>
        <Link to="/fashion" className="text-blue-500">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      {/* <NavLink
        to="/fashion"
        className="inline-block mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        Back
      </NavLink> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow rounded p-6">
        {/* multiple images */}
        <div className="grid grid-cols-2 gap-2">
          {product.images?.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={product.title}
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-4">₹{product.price}</p>
          <p className="text-sm mt-2">Discount: {product.percentage}</p>

          <button className="mt-6 w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
