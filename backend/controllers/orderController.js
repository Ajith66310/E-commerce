import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"; 
import Razorpay from "razorpay";
import crypto from "crypto";

// Helper: update product stock
 export const updateProductStock = async (items) => {
  for (const item of items) {
    try {
      const productId = item._id || item.id || item.productId;
      const product = await Product.findById(productId);
      if (!product) continue;

      const size = item.size || "S";
      const qty = Number(item.units) || 1;

      if (product.sizes && product.sizes[size] !== undefined) {
        product.sizes[size] = Math.max(product.sizes[size] - qty, 0);
        await product.save();
      }
    } catch (error) {
      console.error("Error updating stock:", error.message);
    }
  }
};


//  Place Order (COD)
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    const userId = req.user.id;

    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      status: paymentMethod === "COD" ? "Confirmed" : "Pending",
    });

    await newOrder.save();

  
    await updateProductStock(items);

    res.status(200).json({ success: true, message: "Order placed successfully", newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Razorpay Order Creation
export const createRazorpayOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Verify Razorpay Payment & Update Stock
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const userId = req.user.id;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const newOrder = new Order({
        userId,
        items: orderData.items,
        amount: orderData.amount,
        address: orderData.address,
        paymentMethod: "Razorpay",
        payment: true,
        status: "Confirmed",
      });

      await newOrder.save();


      await updateProductStock(orderData.items);

      return res.status(200).json({ success: true, message: "Payment verified & order saved." });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status === "Delivered")
      return res.status(400).json({ message: "Delivered orders cannot be cancelled" });

    const orderTime = new Date(order.createdAt).getTime();
    const oneHour = 60 * 60 * 1000;

    if (Date.now() - orderTime > oneHour)
      return res.status(400).json({ message: "Order can only be cancelled within 1 hour" });

    order.status = "Cancelled";
    await order.save();

    // Restore stock silently
    for (const item of order.items) {
      const productId = item._id || item.id || item.productId;
      const product = await Product.findById(productId);
      if (product) {
        const size = item.size || "S";
        const qty = Number(item.units) || 1;
        if (product.sizes && product.sizes[size] !== undefined) {
          product.sizes[size] += qty;
          await product.save();
        }
      }
    }

    res.status(200).json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Return Order
export const returnOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "Delivered")
      return res.status(400).json({ message: "Only delivered orders can be returned" });

    order.status = "Returned";
    await order.save();

    // Restore stock silently
    for (const item of order.items) {
      const productId = item._id || item.id || item.productId;
      const product = await Product.findById(productId);
      if (product) {
        const size = item.size || "S";
        const qty = Number(item.units) || 1;
        if (product.sizes && product.sizes[size] !== undefined) {
          product.sizes[size] += qty;
          await product.save();
        }
      }
    }

    res.status(200).json({ success: true, message: "Order returned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADMIN: Update order status (Shipped / Delivered / Cancelled / Returned)
export const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatus = ["Shipped", "Delivered", "Cancelled", "Returned"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();

    return res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
