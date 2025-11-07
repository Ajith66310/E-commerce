// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  price: { type: Number, required: true },
  percentage: { type: String, required: true },
  category: { type: String, required: true },
  sizes: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
  },
  units: { type: Number, default: 0 },
  bestseller: { type: Boolean, default: false }, 
  timestamp: { type: Date, default: Date.now },
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
