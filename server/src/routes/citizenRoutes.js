const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/citizenController');
const { authMiddleware } = require('../middleware/auth');
const { citizenOnly } = require('../middleware/role');

/**
 * Citizen Routes
 * Handles citizen authentication and profile
 */

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authMiddleware, citizenOnly, getMe);

module.exports = router;

