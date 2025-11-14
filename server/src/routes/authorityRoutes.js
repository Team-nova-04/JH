const express = require("express");
const router = express.Router();
const {
  login,
  getComplaints,
  getComplaintById,
  updateStatus,
  addNote,
  requestContact,
} = require("../controllers/authorityController");
const { authMiddleware } = require("../middleware/auth");
const { authorityOnly } = require("../middleware/role");

/**
 * Authority Routes
 * Handles authority dashboard operations
 */

// Public route
router.post("/login", login);

// Protected routes (require authentication and authority role)
router.use(authMiddleware);
router.use(authorityOnly);

// Get all complaints assigned to authority
router.get("/complaints", getComplaints);

// Get single complaint
router.get("/complaints/:id", getComplaintById);

// Update complaint status
router.patch("/complaints/:id/status", updateStatus);

// Add note to complaint
router.post("/complaints/:id/notes", addNote);

// Request contact from citizen
router.post("/complaints/:id/request-contact", requestContact);

module.exports = router;
