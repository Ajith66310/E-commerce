import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    percentage: "",
    category: "",
    subcategory: "",
  });

  // store files separately
  const [images, setImages] = useState({
    img1: null,
    img2: null,
    img3: null,
    img4: null,
  });

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImages((prev) => ({
      ...prev,
      [name]: files[0], // take the first file
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build form data for axios
    const data = new FormData();
    data.append("id", formData.id);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("percentage", formData.percentage);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);

    // append each image file
    if (images.img1) data.append("img", images.img1);
    if (images.img2) data.append("img", images.img2);
    if (images.img3) data.append("img", images.img3);
    if (images.img4) data.append("img", images.img4);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/add-product`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", res.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading product");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* id + title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product ID
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            ></textarea>
          </div>

          {/* images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Images (4 files)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
              <input
                type="file"
                name="img1"
                onChange={handleFileChange}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              <input
                type="file"
                name="img2"
                onChange={handleFileChange}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              <input
                type="file"
                name="img3"
                onChange={handleFileChange}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              <input
                type="file"
                name="img4"
                onChange={handleFileChange}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>

          {/* price, percentage, category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Percentage
              </label>
              <input
                type="text"
                name="percentage"
                placeholder="e.g., 20%"
                value={formData.percentage}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>

          {/* subcategory */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
