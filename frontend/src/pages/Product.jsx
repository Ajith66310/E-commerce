// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/fetchproduct/${id}`
        );
        if (res.data.success) {
          setProduct(res.data.product);
          if (res.data.product.images?.length) {
            setSelectedImage(res.data.product.images[0]);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!product) {
    return (
      <div className="p-6 text-center">
        <p>Product not found</p>
        <Link to="/fashion" className="text-blue-500">
          Back to products
        </Link>
      </div>
    );
  }

  return (
 <div className="max-w-7xl mx-auto pt-20 px-4">

    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-white shadow rounded p-6">
      
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3">
        {product.images?.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={product.title}
            onClick={() => setSelectedImage(imgUrl)}
            className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded cursor-pointer border 
              ${
                selectedImage === imgUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
          />
        ))}
      </div>

      {/* Main image – now spans 2 columns */}
      <div className="md:col-span-2 flex justify-center items-center ">
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-[80vh] object-contain rounded"
        />
      </div>

      {/* Product details – also spans 2 columns */}
      <div className="flex flex-col md:col-span-2">
        <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          {product.description}
        </p>

        <p className="text-xl md:text-2xl font-semibold mt-3">
          ₹{product.price}
        </p>

        <p className="text-sm mt-2">
          Discount: {product.percentage ?? "—"}
        </p>

        {/* Weight/size */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Weight/Size
          </label>
          <input
            type="text"
            readOnly
            value={product.weight ?? "—"}
            className="border rounded px-3 py-2 w-32"
          />
        </div>

        {/* Units */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Units</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            defaultValue="1"
            className="border rounded px-3 py-2 w-20"
          />
        </div>

        {/* Stock status */}
        <p className="text-green-600 mt-3">
          In Stock ({product.stock})
        </p>

        {/* Add to cart */}
        <button className="mt-6 w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition">
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
  );
};

export default Product;
