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

// Allowed origins
const allowedOrigins = [
  "https://vestido-club-ecommerce-foog.vercel.app",
  "https://vestido-club-ecommerce.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174"
];

/* CORS */
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
      "token",
      "auth-token",
    ],
  })
);

/*  JSON + COOKIE -*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* SOCKET.IO INIT -*/
const { io, notifyUser } = initializeSocket(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
export { notifyUser };

/* ROUTES -*/
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/api", productRouter);
app.use("/order", orderRouter);
app.use("/contact", contactRouter);

/*  SERVER START -*/
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
