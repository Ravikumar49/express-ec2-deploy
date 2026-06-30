const express = require("express");
const app = express();
const PORT = 3000;

// Health-check endpoint for monitoring
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint with deployment info
app.get("/", (req, res) => {
  res.json({
    message: "Express API deployed via GitHub Actions to EC2",
    version: "1.0.0"
  });
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});