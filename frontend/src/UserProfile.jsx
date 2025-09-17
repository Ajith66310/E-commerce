import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const UserProfile = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [value, setValue] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    handleUser();
  }, [token]);

  const handleUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/fetch-user`,
        {
          email: token,
        }
      );
      setUser(response.data.userData);
      setValue(response.data.userData.address);
      setPreview(response.data.userData.image);
    } catch (error) {
      toast.error(error?.message || "Error fetching user");
    }
  };

  const handleUserAddress = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("address", JSON.stringify(value));
      if (image) {
        formData.append("image", image); // real File now
      }

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/user-address`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error saving address");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back 
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden md:flex">
          {/* Left Panel - User Info */}
          <div className="md:w-1/3 bg-gray-800 text-white p-8 flex flex-col items-center justify-center">
            {/* Round image upload */}
            <label className="relative cursor-pointer group mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-600 group-hover:border-red-500 transition-colors duration-300">
                {preview ? (
                  <img
                    src={preview}
                    alt="User"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700">
                    <FaUserCircle className="text-gray-400 text-6xl" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                <span className="text-white text-sm">Change Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

            {/* Name & Email */}
            <h2 className="text-3xl font-bold tracking-tight text-center">
              {user?.name}
            </h2>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <FaEnvelope />
              {user?.email}
            </p>

            {/* Reset Password Button */}
            <button
              type="button"
              onClick={() => navigate("/sendmail")}
              className="mt-6 w-full bg-red-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-105"
            >
              Reset Password
            </button>
          </div>

          {/* Right Panel - Shipping Form */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Shipping Address
            </h3>

            <form className="space-y-6" onSubmit={handleUserAddress}>
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Full Name"
                    disabled
                    defaultValue={user?.name}
                    className="w-full border-b-2 border-gray-300 focus:border-red-500 transition-colors pl-10 py-3 bg-transparent outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    disabled
                    defaultValue={user?.email}
                    className="w-full border-b-2 border-gray-300 focus:border-red-500 transition-colors pl-10 py-3 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="street"
                  defaultValue={value?.street}
                  placeholder="Street"
                  className="w-full border-b-2 border-gray-300 focus:border-red-500 transition-colors pl-10 py-3 bg-transparent outline-none"
                  required
                  onChange={(e) => setValue({ ...value, street: e.target.value })}
                  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  defaultValue={value?.city}
                  className="w-full border-b-2 border-gray-300 focus:border-red-500 transition-colors pl-4 py-3 bg-transparent outline-none"
                  required
                  onChange={(e) => setValue({ ...value, city: e.target.value })}
                  />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  defaultValue={value?.state}
                  onChange={(e) => setValue({ ...value, state: e.target.value })}
                  className="w-full border-b-2 border-gray-300 focus:border-red-500 transition-colors pl-4 py-3 bg-transparent outline-none"
                  required
                  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="zipcode"
                  defaultValue={value?.zipcode}
                  placeholder="Zipcode"
                  onChange={(e) => setValue({ ...value, zipcode: e.target.value })}
                  className="w-full border-b-2 border-gray-300 focus:border-red-500 transition-colors pl-4 py-3 bg-transparent outline-none"
                  required
                  />
                <input
                  type="text"
                  name="country"
                  defaultValue={value?.country}
                  placeholder="Country"
                  onChange={(e) => setValue({ ...value, country: e.target.value })}
                  className="w-full border-b-2 border-gray-300 focus:border-red-500 transition-colors pl-4 py-3 bg-transparent outline-none"
                  required
                  />
              </div>

              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  defaultValue={value?.phone}
                  className="w-full border-b-2 border-gray-300 focus:border-red-500 transition-colors pl-10 py-3 bg-transparent outline-none"
                  required
                  onChange={(e) => setValue({ ...value, phone: e.target.value })}
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full mt-8 bg-red-800 text-white font-semibold py-4 px-4 rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-105"
              >
                Save Shipping Info
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;