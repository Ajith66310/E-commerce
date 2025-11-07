import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";

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

      {/* Use ProductItem cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {relatedProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            img={product.images?.[0]}
            price={product.price}
            percentage={product.percentage}
            textColor="black"
            btnText="View"
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
