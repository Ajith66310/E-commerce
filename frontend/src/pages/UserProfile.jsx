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
        { email: token }
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
        formData.append("image", image);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_URL}/user-address`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error saving address");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-[#161a25] rounded-3xl shadow-2xl overflow-hidden md:flex">
        {/* Left Section */}
        <div className="md:w-1/3 bg-[#1d2233] text-white p-8 flex flex-col items-center justify-center border-r border-gray-700 relative">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition"
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

          <label className="relative cursor-pointer group mb-4 mt-8">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-600 group-hover:border-green-500 transition duration-300">
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
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-xs">Change Image</span>
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

          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="mt-3 flex items-center gap-2 text-gray-400">
            <FaEnvelope /> {user?.email}
          </p>

          <button
            type="button"
            onClick={() => navigate("/sendmail")}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition transform hover:scale-105"
          >
            Reset Password
          </button>

          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition transform hover:scale-105"
          >
            My Orders
          </button>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 p-8 md:p-12">
          <h3 className="text-3xl font-bold mb-8 text-white text-center">
            Shipping Address
          </h3>

          <form className="space-y-6" onSubmit={handleUserAddress}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  disabled
                  defaultValue={user?.name}
                  className="w-full border-b border-gray-600 focus:border-green-500 bg-transparent text-gray-300 pl-10 py-3 outline-none transition"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  disabled
                  defaultValue={user?.email}
                  className="w-full border-b border-gray-600 focus:border-green-500 bg-transparent text-gray-300 pl-10 py-3 outline-none transition"
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            {/* Address Fields */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="street"
                defaultValue={value?.street}
                placeholder="Street"
                onChange={(e) => setValue({ ...value, street: e.target.value })}
                className="w-full border-b border-gray-600 focus:border-green-500 bg-transparent text-gray-300 pl-10 py-3 outline-none transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="city"
                defaultValue={value?.city}
                placeholder="City"
                onChange={(e) => setValue({ ...value, city: e.target.value })}
                className="w-full border-b border-gray-600 focus:border-green-500 bg-transparent text-gray-300 pl-4 py-3 outline-none transition"
                required
              />

              <input
                type="text"
                name="state"
                defaultValue={value?.state}
                placeholder="State"
                onChange={(e) => setValue({ ...value, state: e.target.value })}
                className="w-full border-b border-gray-600 focus:border-green-500 bg-transparent text-gray-300 pl-4 py-3 outline-none transition"
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
                className="w-full border-b border-gray-600 focus:border-green-500 bg-transparent text-gray-300 pl-4 py-3 outline-none transition"
                required
              />

              <input
                type="text"
                name="country"
                defaultValue={value?.country}
                placeholder="Country"
                onChange={(e) => setValue({ ...value, country: e.target.value })}
                className="w-full border-b border-gray-600 focus:border-green-500 bg-transparent text-gray-300 pl-4 py-3 outline-none transition"
                required
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="tel"
                name="phone"
                defaultValue={value?.phone}
                placeholder="Phone"
                onChange={(e) => setValue({ ...value, phone: e.target.value })}
                className="w-full border-b border-gray-600 focus:border-green-500 bg-transparent text-gray-300 pl-10 py-3 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-4 rounded-full shadow-lg transition transform hover:scale-105"
            >
              Save Shipping Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
