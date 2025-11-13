import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_URL || "http://localhost:8080", {
  transports: ["websocket"],
});

export default socket;
