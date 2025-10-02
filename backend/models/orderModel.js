import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: true,
    },
    items: {
      type: Array,
      required: true,
      default: [],
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
      default: {},
    },
    status: {
      type: String,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Number, // storing timestamp as Number (ms)
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
