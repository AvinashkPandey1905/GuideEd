const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
  app.use(express.json());
  
  // Logging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // Healthcheck route
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "success", message: "Server is running." });
  });

  // Basic error handling middleware
  app.use((err, req, res, next) => {
    console.error("[Error Middleware]", err.stack);
    res.status(500).json({ status: "error", message: "Internal server error." });
  });

  // Handle unhandled routes
  app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
  });

  return app;
};

module.exports = { createApp };
