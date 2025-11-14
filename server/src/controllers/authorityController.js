const bcrypt = require('bcryptjs');
const Authority = require('../models/Authority');
const Complaint = require('../models/Complaint');
const { generateToken } = require('../utils/jwt');

/**
 * Authority Controller
 * Handles authority dashboard operations
 */

/**
 * Authority login
 * POST /api/authority/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const authority = await Authority.findOne({ email, isActive: true });
    if (!authority) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, authority.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(authority._id, 'authority');

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        authority: {
          id: authority._id,
          name: authority.name,
          email: authority.email,
          role: authority.role,
          department: authority.department
        }
      }
    });
  } catch (error) {
    console.error('Authority login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

/**
 * Get all complaints assigned to authority
 * GET /api/authority/complaints
 */
const getComplaints = async (req, res) => {
  try {
    const { status, urgency, page = 1, limit = 20 } = req.query;
    const authority = req.user;

    // Build query
    const query = { assignedAuthority: authority.role };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by urgency
    if (urgency === 'urgent') {
      query.urgencyScore = { $gte: 0.7 };
    } else if (urgency === 'critical') {
      query.urgencyScore = { $gte: 0.9 };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get complaints
    const complaints = await Complaint.find(query)
      .sort({ urgencyScore: -1, submittedAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-notes');

    // Get total count
    const total = await Complaint.countDocuments(query);

    res.json({
      success: true,
      count: complaints.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: { complaints }
    });
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get single complaint details
 * GET /api/authority/complaints/:id
 */
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Check if complaint is assigned to this authority
    if (complaint.assignedAuthority !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Complaint not assigned to your authority.'
      });
    }

    res.json({
      success: true,
      data: { complaint }
    });
  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Update complaint status
 * PATCH /api/authority/complaints/:id/status
 */
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'seen', 'in_progress', 'resolved'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Check if complaint is assigned to this authority
    if (complaint.assignedAuthority !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Complaint not assigned to your authority.'
      });
    }

    // Update status
    complaint.status = status;
    if (status === 'resolved') {
      complaint.resolvedAt = new Date();
    }
    await complaint.save();

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: { complaint }
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Add note to complaint
 * POST /api/authority/complaints/:id/notes
 */
const addNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required'
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Check if complaint is assigned to this authority
    if (complaint.assignedAuthority !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Complaint not assigned to your authority.'
      });
    }

    // Add note
    complaint.notes.push({
      content,
      addedBy: req.user.name || req.user.email
    });
    await complaint.save();

    res.json({
      success: true,
      message: 'Note added successfully',
      data: { complaint }
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Request contact from citizen
 * POST /api/authority/complaints/:id/request-contact
 */
const requestContact = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Check if complaint is assigned to this authority
    if (complaint.assignedAuthority !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Complaint not assigned to your authority.'
      });
    }

    // Check if complaint is anonymous
    if (complaint.anonymous) {
      return res.status(400).json({
        success: false,
        message: 'Cannot request contact for anonymous complaints'
      });
    }

    // Add note about contact request
    complaint.notes.push({
      content: `Contact requested by ${req.user.name || req.user.email}`,
      addedBy: req.user.name || req.user.email
    });
    await complaint.save();

    res.json({
      success: true,
      message: 'Contact request logged',
      data: {
        citizenContact: {
          email: complaint.email,
          phone: complaint.phone,
          name: complaint.name
        }
      }
    });
  } catch (error) {
    console.error('Request contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  login,
  getComplaints,
  getComplaintById,
  updateStatus,
  addNote,
  requestContact
};

