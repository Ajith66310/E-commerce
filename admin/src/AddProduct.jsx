import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  // previews
  const [previews, setPreviews] = useState({
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

  // Handle file inputs with preview
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

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // append each image file
    Object.values(images).forEach((img) => {
      if (img) data.append("img", img);
    });

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
      toast.success("Product added successfully!");
      // reset
      setFormData({
        id: "",
        title: "",
        description: "",
        price: "",
        percentage: "",
        category: "",
        subcategory: "",
      });
      setImages({ img1: null, img2: null, img3: null, img4: null });
      setPreviews({ img1: null, img2: null, img3: null, img4: null });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading product");
    }
  };

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="  rounded-2xl w-full max-w-3xl">
        {/* <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Add New Product
        </h1> */}

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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>

          {/* images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Images (4 files)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {["img1", "img2", "img3", "img4"].map((imgKey) => (
                <div key={imgKey} className="flex flex-col items-center">
                  <input
                    type="file"
                    name={imgKey}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                    required
                  />
                  {previews[imgKey] && (
                    <img
                      src={previews[imgKey]}
                      alt="preview"
                      className="mt-2 w-32 h-32 object-cover rounded-md border"
                    />
                  )}
                </div>
              ))}
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
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
