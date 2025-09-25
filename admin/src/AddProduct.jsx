import React, { useState } from "react";
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

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("percentage", formData.percentage);
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
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="rounded-2xl w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              required
            />
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
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
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
                    className="px-4 py-2 border rounded-lg w-full"
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
                className="mt-1 block w-full px-4 py-2 border rounded-lg"
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
                className="mt-1 block w-full px-4 py-2 border rounded-lg"
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
                className="mt-1 block w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          {/* sizes & units */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size S Units
              </label>
              <input
                type="number"
                name="sizeS"
                value={formData.sizeS}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size M Units
              </label>
              <input
                type="number"
                name="sizeM"
                value={formData.sizeM}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size L Units
              </label>
              <input
                type="number"
                name="sizeL"
                value={formData.sizeL}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Units (non-sized)
              </label>
              <input
                type="number"
                name="units"
                value={formData.units}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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
