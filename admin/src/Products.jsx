// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
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
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Products</h1>
      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex flex-col sm:flex-row sm:items-center border-b py-4 px-2 gap-4"
          >
            {/* Product Image */}
            {p.images?.length > 0 && (
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-full sm:w-24 sm:h-24 h-48 object-cover rounded"
              />
            )}

            {/* Product Details */}
            <div className="flex-1 flex flex-col sm:flex-wrap sm:flex-row gap-x-6 text-gray-500 pt-3">
              <p className="sm:w-[150px] font-extrabold font-serif text-black">{p.title}</p>
              <p className="sm:w-[80px]">
                <span className="text-black">Price:</span> ₹{p.price}
              </p>
              <p className="sm:w-[120px]">
                <span className="text-black">Category:</span> {p.category}
              </p>
              <p className="sm:w-[130px]">
                <span className="text-black">Discount:</span> {p.percentage}
              </p>
              <p className="sm:w-[100px]">
                <span className="text-black">Units:</span> {p.units}
              </p>
              <p className="sm:w-[200px]">
                <span className="text-black"> Sizes:</span> S({p.sizes?.S || 0}) M({p.sizes?.M || 0}) L({p.sizes?.L || 0})
              </p>
              <p className="sm:w-[200px] text-sm text-gray-500 pt-2 sm:pt-5">
                <span className="text-black">Added:</span>{" "}
                {new Date(p.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Edit/Delete Buttons */}
            <div className="flex sm:flex-col gap-2 pt-2 sm:pt-0">
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
