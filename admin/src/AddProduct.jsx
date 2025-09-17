import React, { useState } from 'react';

const AddProduct = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    price: '',
    percentage: '',
    category: '',
    subcategory: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a product object from the form data
    const productData = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      // Combine the four image URLs into an array
      img: [formData.img1, formData.img2, formData.img3, formData.img4],
      price: parseFloat(formData.price),
      percentage: formData.percentage,
      category: formData.category,
      subcategory: formData.subcategory,
    };

    // Log the data to the console for demonstration
    console.log('Product Data to be sent:', productData);

    // TODO: Add your fetch or Axios call here to send the data to your backend API
    /*
    fetch('/your-backend-api-endpoint/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
    */
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">Product ID</label>
              <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Images (4 URLs)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
              <input type="file" name="img1" placeholder="Image file 1" value={formData.img1} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
              <input type="file" name="img2" placeholder="Image file 2" value={formData.img2} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
              <input type="file" name="img3" placeholder="Image file 3" value={formData.img3} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
              <input type="file" name="img4" placeholder="Image file 4" value={formData.img4} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <div>
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">Percentage</label>
              <input type="text" id="percentage" name="percentage" placeholder="e.g., 20%" value={formData.percentage} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
          </div>

          <div>
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
            <input type="text" id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;