import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import gsap from "gsap";
import { Loader2 } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const limit = 5;
  const dropdownRefs = useRef({});

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/adminfetchproducts?page=${page}&limit=${limit}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
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
      gsap.to(dropdownRefs.current[product._id], {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      setTimeout(() => setEditingProduct(null), 400);
    } else {
      setEditingProduct(product._id);
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        percentage: product.percentage,
        bestseller: product.bestseller || false,
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
    try {
      setLoadingDelete(id);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/deleteproduct/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      toast.success("Product Removed");
      fetchProducts(currentPage);
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setLoadingDelete(null);
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
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      toast.success("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts(currentPage);
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  //  Page loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-[Playfair_Display] font-bold text-center mb-8 text-gray-800 tracking-wide">
        Product Management
      </h1>

      <div className="space-y-6 max-w-6xl mx-auto">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex flex-col border border-gray-200 rounded-2xl bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 px-4 sm:px-6 gap-4">
              {p.images?.length > 0 && (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full sm:w-28 sm:h-28 h-48 object-cover rounded-xl shadow-sm border border-gray-200"
                />
              )}

              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-6 text-gray-600">
                <p className="font-semibold text-gray-900 text-lg">{p.title}</p>
                <p>
                  <span className="text-gray-800 font-medium">Price:</span> ₹
                  {p.price}
                </p>
                <p>
                  <span className="text-gray-800 font-medium">Category:</span>{" "}
                  {p.category}
                </p>
                <p>
                  <span className="text-gray-800 font-medium">Discount:</span>{" "}
                  {p.percentage}
                </p>
                <p className="col-span-2 sm:col-span-1">
                  <span className="text-gray-800 font-medium">Sizes:</span>{" "}
                  S({p.sizes?.S || 0}) M({p.sizes?.M || 0}) L({p.sizes?.L || 0})
                </p>
              </div>

              <div className="flex sm:flex-col gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-md hover:scale-[1.02] transition"
                >
                  {editingProduct === p._id ? "Close" : "Edit"}
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  disabled={loadingDelete === p._id}
                  className={`px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-md hover:scale-[1.02] transition flex items-center justify-center gap-2 ${loadingDelete === p._id
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                    }`}
                >
                  {loadingDelete === p._id ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5 text-white" />
                      Removing...
                    </>
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            </div>

            {/* Dropdown Edit Section */}
            <div
              ref={(el) => (dropdownRefs.current[p._id] = el)}
              className="overflow-hidden bg-gray-50 px-4 sm:px-6 rounded-b-2xl border-t border-gray-200"
              style={{ height: 0 }}
            >
              {editingProduct === p._id && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                  <input
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    placeholder="Discount (%)"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
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
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                  <input
                    name="M"
                    value={formData.sizes.M}
                    onChange={handleChange}
                    placeholder="Size M Units"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                  <input
                    name="L"
                    value={formData.sizes.L}
                    onChange={handleChange}
                    placeholder="Size L Units"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  />

                  <div className="flex items-center gap-3 col-span-1 sm:col-span-2 mt-2">
                    <input
                      type="checkbox"
                      name="bestseller"
                      checked={formData.bestseller || false}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bestseller: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 accent-blue-600 rounded"
                    />
                    <label className="text-gray-700 font-medium">
                      Mark as Bestseller
                    </label>
                  </div>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none col-span-1 sm:col-span-2"
                  ></textarea>

                  <button
                    onClick={() => handleSave(p._id)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium hover:shadow-md hover:scale-[1.02] transition col-span-1 sm:col-span-2"
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
      <div className="flex justify-center items-center mt-8 gap-5">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-all duration-200"
        >
          Prev
        </button>
        <span className="text-gray-800 font-medium text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
