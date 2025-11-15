import express from "express";
import { updateOrderStatusAdmin,placeOrder, createRazorpayOrder, verifyPayment, getUserOrders, cancelOrder, returnOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", authMiddleware, placeOrder);
orderRouter.post("/razorpay/create-order", authMiddleware, createRazorpayOrder);
orderRouter.post("/razorpay/verify-payment", authMiddleware, verifyPayment);
orderRouter.get("/myorders", authMiddleware, getUserOrders);
orderRouter.put("/cancel/:id", authMiddleware, cancelOrder);
orderRouter.put("/return/:id", authMiddleware, returnOrder);
orderRouter.put("/order-status/:id", updateOrderStatusAdmin);

export default orderRouter;
