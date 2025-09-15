import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

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
    } catch (error) {
      toast.error(error?.message || "Error fetching user");
    }
  };

  const handleUserAddress = async (e) => {
    e.preventDefault(); // stop page reload
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/user-address`,
        {
          email: user.email, // send logged in user email
          address: value,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error saving address");
    }resizeBy
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-6 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded shadow hover:bg-gray-300 transition"
      >
        Back
      </button>

      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
        {/* Round image upload */}
        <label className="relative cursor-pointer">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">Upload Image</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </label>

        {/* Name & Email */}
        <h2 className="text-3xl font-bold mt-4">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>

        {/* Reset Password Button */}
        <button
          type="button"
          onClick={() => navigate("/reset-password")}
          className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 transition"
        >
          Reset Password
        </button>
      </div>

      {/* Shipping Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mt-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Shipping Address</h3>

        <form className="space-y-5" onSubmit={handleUserAddress} method="post">
          {/* Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            disabled
            defaultValue={user?.name}
            className="block w-full border border-gray-300 rounded-md pl-5 py-3"
            required
          />

          {/* email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            disabled
            defaultValue={user?.email}
            className="block w-full border border-gray-300 rounded-md pl-5 py-3"
            required
          />

          {/* Street */}
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="block w-full border border-gray-300 rounded-md pl-5 py-3"
            required
            onChange={(e) => setValue({ ...value, street: e.target.value })}
          />

          {/* City + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="block w-full border border-gray-300 rounded-md pl-5 py-3"
              required
              onChange={(e) => setValue({ ...value, city: e.target.value })}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={(e) => setValue({ ...value, state: e.target.value })}
              className="block w-full border border-gray-300 rounded-md pl-5 py-3"
              required
            />
          </div>

          {/* Zip + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              onChange={(e) => setValue({ ...value, zipcode: e.target.value })}
              className="block w-full border border-gray-300 rounded-md pl-5 py-3"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={(e) => setValue({ ...value, country: e.target.value })}
              className="block w-full border border-gray-300 rounded-md pl-5 py-3"
              required
            />
          </div>

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="block w-full border border-gray-300 rounded-md pl-5 py-3"
            required
            onChange={(e) => setValue({ ...value, phone: e.target.value })}
          />

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-md shadow hover:bg-red-700 transition"
          >
            Save Shipping Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
