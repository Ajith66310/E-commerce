// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const fetchProducts = async (page) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/adminfetchproducts?page=${page}&limit=${limit}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePrev = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/deleteproduct/${id}`
        );
        fetchProducts(currentPage);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex items-center border-b py-4 px-2 gap-4"
          >
            {/* Product Image */}
            {p.images?.length > 0 && (
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            {/* Product Details */}
            <div className="flex-1 flex flex-wrap gap-x-6 text-gray-900">
              <p className="w-[150px] font-semibold">{p.title}</p>
              <p className="w-[80px]">₹{p.price}</p>
              <p className="w-[120px]">Category: {p.category}</p>
              <p className="w-[100px]">Discount: {p.percentage}</p>
              <p className="w-[100px]">Units: {p.units}</p>
              <p className="w-[200px]">
                Sizes: S({p.sizes?.S || 0}) M({p.sizes?.M || 0}) L({p.sizes?.L || 0})
              </p>
              <p className="w-[180px] text-sm text-gray-500">
                Added: {new Date(p.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Edit/Delete Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(p._id)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
