const { Server } = require("socket.io");

const setupSocketOptions = () => ({
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const initializeSocket = (server) => {
  return new Server(server, setupSocketOptions());
};

module.exports = { initializeSocket };
