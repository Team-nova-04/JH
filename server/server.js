require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const connectDB = require("./src/config/database");

// Import routes
const citizenRoutes = require("./src/routes/citizenRoutes");
const complaintRoutes = require("./src/routes/complaintRoutes");
const authorityRoutes = require("./src/routes/authorityRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const statsRoutes = require("./src/routes/statsRoutes");

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "CivicSense API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/citizens", citizenRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/authority", authorityRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stats", statsRoutes);

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "CivicSense API - AI-Powered Public Complaint Management Platform",
    version: "1.0.0",
    endpoints: {
      citizens: {
        "POST /api/citizens/register": "Register a new citizen",
        "POST /api/citizens/login": "Login citizen",
        "GET /api/citizens/me": "Get current citizen profile (auth required)",
      },
      complaints: {
        "POST /api/complaints": "Submit complaint (anonymous or logged-in)",
        "GET /api/complaints/my-complaints":
          "Get citizen's complaints (auth required)",
        "GET /api/complaints/:id": "Get complaint by ID (auth required)",
      },
      authority: {
        "POST /api/authority/login": "Authority login",
        "GET /api/authority/complaints":
          "Get assigned complaints (auth required)",
        "GET /api/authority/complaints/:id":
          "Get complaint details (auth required)",
        "PATCH /api/authority/complaints/:id/status":
          "Update complaint status (auth required)",
        "POST /api/authority/complaints/:id/notes":
          "Add note to complaint (auth required)",
        "POST /api/authority/complaints/:id/request-contact":
          "Request citizen contact (auth required)",
      },
      admin: {
        "POST /api/admin/login": "Admin login",
        "POST /api/admin/authority-users":
          "Create authority user (auth required)",
        "GET /api/admin/complaints": "Get all complaints (auth required)",
        "POST /api/admin/upload-csv": "Upload and process CSV (auth required)",
      },
      stats: {
        "GET /api/stats/overview": "Get overview statistics (auth required)",
        "GET /api/stats/category": "Get category statistics (auth required)",
        "GET /api/stats/urgent": "Get urgent complaints (auth required)",
        "GET /api/stats/location": "Get location statistics (auth required)",
        "GET /api/stats/trends": "Get trends over time (auth required)",
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 CivicSense API server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
