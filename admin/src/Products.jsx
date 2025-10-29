// src/components/Products.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const limit = 5;
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

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

  const handleEdit = (product) => {
    if (editingProduct === product._id) {
      // Close dropdown
      gsap.to(dropdownRefs.current[product._id], {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      setTimeout(() => setEditingProduct(null), 400);
    } else {
      // Open dropdown
      setEditingProduct(product._id);
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        percentage: product.percentage,
        sizes: {
          S: product.sizes?.S || 0,
          M: product.sizes?.M || 0,
          L: product.sizes?.L || 0,
        },
      });

      setTimeout(() => {
        gsap.fromTo(
          dropdownRefs.current[product._id],
          { height: 0 },
          { height: "auto", duration: 0.5, ease: "power2.out" }
        );
      }, 50);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/deleteproduct/${id}`,
          { withCredentials: true }
        );
        fetchProducts(currentPage);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["S", "M", "L"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        sizes: { ...prev.sizes, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateproduct/${id}`,
        formData,
        { withCredentials: true }
      );
      toast("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts(currentPage);
    } catch (error) {
      console.error(error);
      toast("Failed to update product");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Products</h1>
      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex flex-col border-b pb-4 bg-white rounded shadow-sm overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center py-4 px-2 gap-4">
              {p.images?.length > 0 && (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full sm:w-24 sm:h-24 h-48 object-cover rounded"
                />
              )}

              <div className="flex-1 flex flex-col sm:flex-wrap sm:flex-row gap-x-6 text-gray-500 pt-3">
                <p className="sm:w-[150px] font-extrabold font-serif text-black">
                  {p.title}
                </p>
                <p className="sm:w-[80px]">
                  <span className="text-black">Price:</span> ₹{p.price}
                </p>
                <p className="sm:w-[120px]">
                  <span className="text-black">Category:</span> {p.category}
                </p>
                <p className="sm:w-[130px]">
                  <span className="text-black">Discount:</span> {p.percentage}
                </p>
                <p className="sm:w-[200px]">
                  <span className="text-black">Sizes:</span> S({p.sizes?.S || 0}) M({p.sizes?.M || 0}) L({p.sizes?.L || 0})
                </p>
              </div>

              <div className="flex sm:flex-col gap-2 pt-2 sm:pt-0">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  {editingProduct === p._id ? "Close" : "Edit"}
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Dropdown edit section */}
            <div
              ref={(el) => (dropdownRefs.current[p._id] = el)}
              className="overflow-hidden bg-gray-100 px-4"
              style={{ height: 0 }}
            >
              {editingProduct === p._id && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border p-2 rounded"
                  />
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border p-2 rounded"
                  />
                  <input
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    placeholder="Discount (%)"
                    className="border p-2 rounded"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>

                  <input
                    name="S"
                    value={formData.sizes.S}
                    onChange={handleChange}
                    placeholder="Size S Units"
                    className="border p-2 rounded"
                  />
                  <input
                    name="M"
                    value={formData.sizes.M}
                    onChange={handleChange}
                    placeholder="Size M Units"
                    className="border p-2 rounded"
                  />
                  <input
                    name="L"
                    value={formData.sizes.L}
                    onChange={handleChange}
                    placeholder="Size L Units"
                    className="border p-2 rounded"
                  />

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded col-span-1 sm:col-span-2"
                  ></textarea>

                  <button
                    onClick={() => handleSave(p._id)}
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 col-span-1 sm:col-span-2"
                  >
                    Save Changes
                  </button>
                </div>
              )}
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
