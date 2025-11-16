import express from "express";
import "dotenv/config.js";
import { connectDB } from "./config/mongodb.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import contactRouter from "./routes/contactRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { initializeSocket } from "./utils/socket.js";

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS for frontend
const { io, notifyUser } = initializeSocket(server, {
  cors: {
    origin: [
      "https://vestido-club-ecommerce-foog.vercel.app",
      "https://vestido-club-ecommerce.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Export notifyUser if needed in controllers
export { notifyUser };

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for API requests
const allowedOrigins = [
  "https://vestido-club-ecommerce-foog.vercel.app",
  "https://vestido-club-ecommerce.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET","PATCH", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
      "token",
      "auth-token",
    ],
    credentials: true,
  })
);

// Routes
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/api", productRouter);
app.use("/order", orderRouter);
app.use("/contact", contactRouter);

// Start server after DB connection
(async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 8080;
    server.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
})();
