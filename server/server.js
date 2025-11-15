/*
CivicSense – AI-Powered Public Complaint Management System

CivicSense is a full-stack MERN application designed to help citizens report public issues and automatically route those complaints to the correct government authorities using AI/NLP.

The system includes:

- A citizen-facing portal for submitting complaints (anonymous or logged-in)
- An AI engine that analyzes complaint text using HuggingFace NLP models
- Automated urgency scoring
- Automatic authority assignment (Water Board, CEB, Municipal Council, RDA, Police Safety, Disaster Management)
- Role-based dashboards for authorities
- An admin panel for oversight and CSV data ingestion

Key Capabilities

- Citizens can create accounts, log in, and submit complaints with description, location, and optional photos.
- Anonymous complaints are allowed but have lower trust scores.
- NLP classification determines sentiment, category, summary, keywords, and urgency level.
- Complaints are ranked by urgency and routed to responsible authorities.
- Authorities can log in to view only the issues assigned to their department.
- Authorities can update statuses (pending, seen, in-progress, resolved) and add notes.
- Admins can manage authority accounts and upload CSV data for bulk complaint ingestion.
- A dashboard provides analytics on category distribution, urgent complaints, location trends, and complaint history.

AI / NLP Pipeline

The backend integrates HuggingFace Inference API for:

- Sentiment analysis
- Zero-shot category classification
- Key phrase extraction
- Urgency scoring
- Automatic authority routing

NLP models used:

- `distilbert-base-uncased-finetuned-sst-2-english` (sentiment)
- `facebook/bart-large-mnli` (category classification)

Tech Stack

- **Frontend**: React, Tailwind, React Router, Recharts, React-Leaflet
- **Backend**: Node.js, Express.js, JWT, Multer, Mongoose
- **Database**: MongoDB
- **AI**: HuggingFace Inference API
- **Storage**: Local uploads or cloud storage
- **Auth**: JWT-based with role-based access control

User Roles

- **Citizen** – submit complaints, track their submissions
- **Authority** – view and manage relevant complaints
- **Admin** – manage users, data, and system settings

Project Goal

To build an intelligent, scalable, AI-powered complaint management system that improves public service responsiveness, community engagement, and emergency handling in Sri Lanka.
*/

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

// Parse CLIENT_URL to support multiple origins
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim());

app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
