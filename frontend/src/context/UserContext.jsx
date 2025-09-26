// src/context/UserContextProvider.jsx
import React, { createContext } from 'react'
import axios from 'axios'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  // reusable function to fetch products
  const fetchProducts = async (limit = 20) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/adminfetchproducts?limit=${limit}`
      )
      return res.data.products || []
    } catch (err) {
      console.error('Error fetching products', err)
      return []
    }
  }

  const value = {
    fetchProducts, // expose it here
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
