// src/socket.js
import { io } from "socket.io-client";

// Singleton instance
const socket = io(`${process.env.REACT_APP_API_BASE_URL}`, {
  autoConnect: true,  // optional, connects immediately
  transports: ['websocket'],  // enforce WebSocket only (optional, improves stability)
});

export default socket;