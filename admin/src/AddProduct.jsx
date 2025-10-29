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

  // ✅ Auto-calculate total units
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
    }
  };

  return (
<div className="flex items-center justify-center p-4 mt-5 md:mt-0" >
  <div className="rounded-2xl w-full max-w-3xl bg-white shadow-md p-4 sm:p-6 ">
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border rounded-lg text-sm sm:text-base"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border rounded-lg text-sm sm:text-base"
          required
        ></textarea>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Images
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          {["img1", "img2", "img3", "img4"].map((imgKey) => (
            <div key={imgKey} className="flex flex-col items-center">
              <input
                type="file"
                name={imgKey}
                accept="image/*"
                onChange={handleFileChange}
                className="text-xs sm:text-sm border rounded-lg w-full"
                required
              />
              {previews[imgKey] && (
                <img
                  src={previews[imgKey]}
                  alt="preview"
                  className="mt-2 w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md border"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price, Percentage, Category */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-lg text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount %
          </label>
          <input
            type="text"
            name="percentage"
            placeholder="20%"
            value={formData.percentage}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-lg text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-lg bg-white text-sm sm:text-base"
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["sizeS", "sizeM", "sizeL"].map((size, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700">
              Size {size.slice(-1).toUpperCase()}
            </label>
            <input
              type="number"
              name={size}
              value={formData[size]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-lg text-sm sm:text-base"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Units
          </label>
          <input
            type="number"
            name="units"
            value={formData.units}
            readOnly
            className="mt-1 block w-full px-3 py-2 border rounded-lg bg-gray-100 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 px-6 rounded-lg text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Add Product
      </button>
    </form>
  </div>
</div>
  );
};

export default AddProduct;
