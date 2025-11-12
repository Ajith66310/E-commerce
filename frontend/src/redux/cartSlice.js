import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.isOpen =
        typeof action.payload === "boolean" ? action.payload : !state.isOpen;
    },

    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      );

      if (existing) {
        // Prevent exceeding stock
        if (existing.units + item.units > existing.stock) {
          toast.warning(`Only ${existing.stock} units available in stock`);
          existing.units = existing.stock;
        } else {
          existing.units += item.units;
          toast.success("Item added to cart!");
        }
      } else {
        // Add new item with stock property
        state.items.push(item);
        toast.success("Item added to cart!");
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const index = action.payload;
      const removed = state.items[index];
      if (removed) {
        state.items.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.items));
        toast.success("Item removed from cart!");
      }
    },

    updateUnits: (state, action) => {
      const { index, units } = action.payload;
      const item = state.items[index];
      if (!item) return;

      // Prevent negative or exceeding stock
      if (units < 1) return;
      if (units > item.stock) {
        toast.warning(`Only ${item.stock} units available in stock`);
        item.units = item.stock;
      } else {
        item.units = units;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { toggleCart, addItem, removeItem, updateUnits, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
