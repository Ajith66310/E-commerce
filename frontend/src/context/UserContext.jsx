// src/context/UserContextProvider.jsx
import React, { createContext, useState ,useEffect} from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [cartIcon, setCartIcon] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);



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

    // Add or remove a product from wishlist
  const toggleLike = (product) => {
    setWishlist((prev) => {
      const isLiked = prev.find((item) => item._id === product._id);
      if (isLiked) {
        // remove
        return prev.filter((item) => item._id !== product._id);
      } else {
        // add
        return [...prev, product];
      }
    });
  };

  // Check if a product is liked
  const isLiked = (id) => wishlist.some((item) => item._id === id);

  const value = {
    fetchProducts,
    cartIcon,
    setCartIcon,
    cartUpdated, 
    setCartUpdated,
     wishlist,
    toggleLike,
    isLiked,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
