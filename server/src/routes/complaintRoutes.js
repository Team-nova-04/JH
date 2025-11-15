const express = require('express');
const router = express.Router();
const { 
  submitComplaint, 
  getMyComplaints, 
  getComplaintById,
  requestIdentity,
  approveIdentity,
  declineIdentity,
} = require('../controllers/complaintController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const { citizenOnly, authorityOnly } = require('../middleware/role');
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

// FR2: Identity request endpoints
// Request identity (Authority only)
router.post('/:id/request-identity', authMiddleware, authorityOnly, requestIdentity);

// Approve identity (Citizen only)
router.post('/:id/approve-identity', authMiddleware, citizenOnly, approveIdentity);

// Decline identity (Citizen only)
router.post('/:id/decline-identity', authMiddleware, citizenOnly, declineIdentity);

module.exports = router;

