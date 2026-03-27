require("dotenv").config();
const http = require("http");
const { createApp } = require("./app");
const { initializeSocket } = require("./config/socket");
const { handleSocketConnection } = require("./services/socketService");

const PORT = process.env.PORT || 5000;

const startServer = () => {
  // 1. Initialize Express App
  const app = createApp();

  // 2. Create HTTP Server required for Socket.io
  const server = http.createServer(app);

  // 3. Initialize Socket.io
  const io = initializeSocket(server);

  // 4. Attach Socket connection handlers
  handleSocketConnection(io);

  // 5. Start listening
  server.listen(PORT, () => {
    console.log(`[Server] Running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });

  // Handle graceful shutdown properly
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      console.log("Process terminated.");
    });
  });
};

startServer();
