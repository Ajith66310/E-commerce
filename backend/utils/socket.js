// socket.js
import { Server } from "socket.io";

const activeUsers = new Map();

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(" New client connected:", socket.id);

    socket.on("registerUser", (userId) => {
      if (userId) {
        activeUsers.set(userId, socket.id);
        console.log(`Registered user ${userId} -> socket ${socket.id}`);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, id] of activeUsers.entries()) {
        if (id === socket.id) {
          activeUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  // Helper to notify a specific user
  const notifyUser = (userId, action) => {
    const socketId = activeUsers.get(userId);
    if (socketId) {
      io.to(socketId).emit("userAction", { action });
      console.log(`Sent "${action}" to user ${userId}`);
    }
  };

  return { io, notifyUser };
};
