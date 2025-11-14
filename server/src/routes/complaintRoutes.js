const express = require('express');
const router = express.Router();
const { 
  submitComplaint, 
  getMyComplaints, 
  getComplaintById 
} = require('../controllers/complaintController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const { citizenOnly } = require('../middleware/role');
const { uploadImage } = require('../middleware/upload');

/**
 * Complaint Routes
 * Handles complaint submission and retrieval
 */

// Submit complaint (supports both anonymous and logged-in)
router.post('/', optionalAuth, uploadImage, submitComplaint);

// Get citizen's own complaints (requires login)
router.get('/my-complaints', authMiddleware, citizenOnly, getMyComplaints);

// Get single complaint by ID
router.get('/:id', authMiddleware, citizenOnly, getComplaintById);

module.exports = router;

