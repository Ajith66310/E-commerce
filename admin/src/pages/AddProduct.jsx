import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    percentage: "",
    category: "",
    sizeS: "",
    sizeM: "",
    sizeL: "",
    units: "",
  });

  const [images, setImages] = useState({
    img1: null,
    img2: null,
    img3: null,
    img4: null,
  });

  const [previews, setPreviews] = useState({
    img1: null,
    img2: null,
    img3: null,
    img4: null,
  });

  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    const total =
      (Number(formData.sizeS) || 0) +
      (Number(formData.sizeM) || 0) +
      (Number(formData.sizeL) || 0);
    setFormData((prev) => ({ ...prev, units: total }));
  }, [formData.sizeS, formData.sizeM, formData.sizeL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      setImages((prev) => ({
        ...prev,
        [name]: file,
      }));

      setPreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("percentage", formData.percentage);
    data.append("bestseller", formData.bestseller);
    data.append("category", formData.category);
    data.append(
      "sizes",
      JSON.stringify({
        S: Number(formData.sizeS) || 0,
        M: Number(formData.sizeM) || 0,
        L: Number(formData.sizeL) || 0,
      })
    );
    data.append("units", formData.units);

    Object.values(images).forEach((img) => {
      if (img) data.append("img", img);
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/add-product`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success("Product added successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        percentage: "",
        category: "",
        sizeS: "",
        sizeM: "",
        sizeL: "",
        units: "",
      });
      setImages({ img1: null, img2: null, img3: null, img4: null });
      setPreviews({ img1: null, img2: null, img3: null, img4: null });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading product");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 font-[Poppins] flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl border border-gray-100 p-8 md:p-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
         Add New Product
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm md:text-base">
          Enter product details and upload high-quality images.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Images
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["img1", "img2", "img3", "img4"].map((imgKey) => (
                <div
                  key={imgKey}
                  className="relative border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all flex flex-col items-center justify-center p-3 aspect-square overflow-hidden group"
                >
                  <label
                    htmlFor={imgKey}
                    className="cursor-pointer flex flex-col items-center justify-center text-center w-full h-full"
                  >
                    {previews[imgKey] ? (
                      <img
                        src={previews[imgKey]}
                        alt="preview"
                        className="w-full h-full object-cover rounded-lg shadow-sm group-hover:opacity-90 transition"
                      />
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mb-2">
                          +
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          Upload Image
                        </p>
                      </>
                    )}
                  </label>
                  <input
                    id={imgKey}
                    type="file"
                    name={imgKey}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Price, Discount, Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Discount %
              </label>
              <input
                type="text"
                name="percentage"
                placeholder="20%"
                value={formData.percentage}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              >
                <option value="">Select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {["sizeS", "sizeM", "sizeL"].map((size, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Size {size.slice(-1).toUpperCase()}
                </label>
                <input
                  type="number"
                  name={size}
                  value={formData[size]}
                  onChange={handleChange}
                  placeholder="Qty"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Units
              </label>
              <input
                type="number"
                name="units"
                value={formData.units}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 bg-gray-100 rounded-xl text-gray-600 shadow-inner"
              />
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-3">
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
              className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="text-sm font-semibold text-gray-700">
              Mark as Bestseller
            </label>
          </div>

          {/* Submit Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-white text-lg shadow-md transition-transform hover:scale-[1.02] ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Adding...
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
