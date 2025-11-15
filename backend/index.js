import express from "express";
import "dotenv/config.js";
import { connectDB } from "./config/mongodb.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { initializeSocket } from "./utils/socket.js";
import contactRouter from "./routes/contactRoute.js";

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const { io, notifyUser } = initializeSocket(server);

// Export notifyUser if needed in controllers
export { notifyUser };

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://vestido-club-ecommerce-foog.vercel.app",
      "https://vestido-club-ecommerce.vercel.app",
      "https://vestidoclub-ecommerce.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight (VERY IMPORTANT for Render + Vercel)
app.options("*", cors());

// Routes
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/api", productRouter);
app.use("/order", orderRouter);
app.use("/contact",contactRouter);

// Start server after DB connection
(async () => {
  try {
    await connectDB();
    server.listen(8080, () => console.log("Server running on port 8080"));
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
})();
