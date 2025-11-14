const express = require('express');
const router = express.Router();
const {
  getOverview,
  getCategoryStats,
  getUrgentStats,
  getLocationStats,
  getTrends
} = require('../controllers/statsController');
const { authMiddleware } = require('../middleware/auth');
const { authorityOrAdmin } = require('../middleware/role');

/**
 * Statistics Routes
 * Provides analytics and insights
 * Accessible by authority and admin users
 */

router.use(authMiddleware);
router.use(authorityOrAdmin);

router.get('/overview', getOverview);
router.get('/category', getCategoryStats);
router.get('/urgent', getUrgentStats);
router.get('/location', getLocationStats);
router.get('/trends', getTrends);

module.exports = router;

