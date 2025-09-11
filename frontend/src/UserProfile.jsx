import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Button (outside the form container) */}
      <div className="max-w-2xl mx-auto mt-10">
        <button
          type="button"
          onClick={() => navigate("/")} // change "/" to your home route
          className="mb-4 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded shadow hover:bg-gray-300 transition"
        >
        Back
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          User Profile & Shipping
        </h2>

        {/* Image Upload */}
        <div className="flex justify-center mb-6">
          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 cursor-pointer">
            <span className="text-gray-500 text-sm">Upload Image</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        {/* Form */}
        <form className="space-y-5 border-t border-b border-gray-300 pt-6 pb-6">
          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className="block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className="block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
            required
          />

          {/* Street */}
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
            required
          />

          {/* City + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className="block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
              required
            />
          </div>

          {/* Zipcode + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              className="block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
              required
            />
          </div>

          {/* Phone + Add Button */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="col-span-2 block w-full border border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 rounded-md pl-5 py-3"
              required
            />
            <button
              type="button"
              className="bg-gray-200 text-gray-800 font-semibold py-3 px-4 border border-gray-300 rounded-md shadow hover:bg-gray-300 transition"
            >
              Add
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-md shadow hover:bg-red-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
