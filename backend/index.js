import express from 'express';
import 'dotenv/config.js';
import { connectDB } from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("registerUser", (userId) => {
    if (userId) {
      activeUsers.set(userId, socket.id);
      console.log(`Registered user ${userId} -> socket ${socket.id}`);
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, id] of activeUsers.entries()) {
      if (id === socket.id) {
        activeUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Helper to notify user
export const notifyUser = (userId, action) => {
  const socketId = activeUsers.get(userId);
  if (socketId) {
    io.to(socketId).emit("userAction", { action });
    console.log(`Sent "${action}" to user ${userId}`);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Routes
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/api", productRouter);
app.use("/order", orderRouter);

// Connect to database
await connectDB();

// Start the server
server.listen(8080, () => console.log("Server running on port 8080"));
