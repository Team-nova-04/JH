const express = require("express");
const router = express.Router();
const {
  login,
  createAuthorityUser,
  getAllComplaints,
  uploadCSV,
} = require("../controllers/adminController");
const { authMiddleware } = require("../middleware/auth");
const { adminOnly } = require("../middleware/role");
const { uploadCSV: uploadCSVMiddleware } = require("../middleware/upload");

/**
 * Admin Routes
 * Handles admin operations
 */

// Public route
router.post("/login", login);

// Protected routes (require admin authentication)
router.use(authMiddleware);
router.use(adminOnly);

// Create authority user
router.post("/authority-users", createAuthorityUser);

// Get all complaints
router.get("/complaints", getAllComplaints);

// Upload CSV
router.post("/upload-csv", uploadCSVMiddleware, uploadCSV);

module.exports = router;
