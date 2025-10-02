// src/context/UserContextProvider.jsx
import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [cartIcon, setCartIcon] = useState(false);

  // reusable function to fetch products
  const fetchProducts = async (limit = 20) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/adminfetchproducts?limit=${limit}`
      );
      return res.data.products || [];
    } catch (err) {
      console.error("Error fetching products", err);
      return [];
    }
  };

  const value = {
    fetchProducts,
    cartIcon,
    setCartIcon,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
