// src/components/RelatedProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/fetchbycategory/${category}`
        );

        if (res.data.success) {
          // Exclude current product from related list
          const filtered = res.data.products.filter(
            (p) => p._id !== currentProductId
          );
          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    fetchRelated();
  }, [category, currentProductId]);

  if (!relatedProducts.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-red-500 inline-block pb-2">
        Related Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-3">
              <h3 className="text-base font-semibold truncate">{product.title}</h3>
              <p className="text-sm text-gray-600 mt-1">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
