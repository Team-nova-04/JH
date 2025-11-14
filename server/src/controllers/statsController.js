const Complaint = require('../models/Complaint');

/**
 * Statistics Controller
 * Provides analytics and insights
 */

/**
 * Get overview statistics
 * GET /api/stats/overview
 */
const getOverview = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: 'pending' });
    const inProgress = await Complaint.countDocuments({ status: 'in_progress' });
    const resolved = await Complaint.countDocuments({ status: 'resolved' });
    const urgent = await Complaint.countDocuments({ urgencyScore: { $gte: 0.7 } });
    const critical = await Complaint.countDocuments({ urgencyScore: { $gte: 0.9 } });
    const anonymous = await Complaint.countDocuments({ anonymous: true });

    res.json({
      success: true,
      data: {
        total,
        byStatus: {
          pending,
          inProgress,
          resolved
        },
        byUrgency: {
          urgent,
          critical
        },
        anonymous,
        registered: total - anonymous
      }
    });
  } catch (error) {
    console.error('Get overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get statistics by category
 * GET /api/stats/category
 */
const getCategoryStats = async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgUrgency: { $avg: '$urgencyScore' },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get category stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get urgent complaints statistics
 * GET /api/stats/urgent
 */
const getUrgentStats = async (req, res) => {
  try {
    const urgent = await Complaint.find({ urgencyScore: { $gte: 0.7 } })
      .sort({ urgencyScore: -1, submittedAt: -1 })
      .limit(50)
      .select('description location urgencyScore assignedAuthority status submittedAt');

    const critical = await Complaint.find({ urgencyScore: { $gte: 0.9 } })
      .sort({ urgencyScore: -1, submittedAt: -1 })
      .select('description location urgencyScore assignedAuthority status submittedAt');

    res.json({
      success: true,
      data: {
        urgent: {
          count: urgent.length,
          complaints: urgent
        },
        critical: {
          count: critical.length,
          complaints: critical
        }
      }
    });
  } catch (error) {
    console.error('Get urgent stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get statistics by location
 * GET /api/stats/location
 */
const getLocationStats = async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 },
          avgUrgency: { $avg: '$urgencyScore' },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 20
      }
    ]);

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get location stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get trends over time
 * GET /api/stats/trends
 */
const getTrends = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const trends = await Complaint.aggregate([
      {
        $match: {
          submittedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' }
          },
          count: { $sum: 1 },
          avgUrgency: { $avg: '$urgencyScore' },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      success: true,
      data: { trends }
    });
  } catch (error) {
    console.error('Get trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getOverview,
  getCategoryStats,
  getUrgentStats,
  getLocationStats,
  getTrends
};

