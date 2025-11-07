import Order from "../models/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

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
    res.status(200).json({ success: true, message: "Order placed", newOrder });
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
      amount: req.body.amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Verify Payment
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
      return res.status(200).json({ success: true, message: "Payment verified & order saved." });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//  Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status === "Delivered")
      return res.status(400).json({ message: "Delivered orders cannot be cancelled" });

    // Allow cancellation within 1 hour or if still pending
    const orderTime = new Date(order.createdAt).getTime();
    const oneHour = 60 * 60 * 1000;

    if (Date.now() - orderTime > oneHour)
      return res.status(400).json({ message: "Order can only be cancelled within 1 hour" });

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Return order
export const returnOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "Delivered")
      return res.status(400).json({ message: "Only delivered orders can be returned" });

    order.status = "Returned";
    await order.save();

    res.status(200).json({ success: true, message: "Order returned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

