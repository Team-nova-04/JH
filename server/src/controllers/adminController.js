const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Authority = require('../models/Authority');
const Complaint = require('../models/Complaint');
const { generateToken } = require('../utils/jwt');
const { processCSVFile } = require('../services/csvService');

/**
 * Admin Controller
 * Handles admin operations
 */

/**
 * Admin login
 * POST /api/admin/login
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

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(admin._id, 'admin');

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email
        }
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

/**
 * Create authority user
 * POST /api/admin/authority-users
 */
const createAuthorityUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password || !role || !department) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate role
    const validRoles = [
      'municipal_council',
      'water_board',
      'ceb',
      'rda',
      'police_safety',
      'disaster_management'
    ];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Role must be one of: ${validRoles.join(', ')}`
      });
    }

    // Check if email exists
    const existing = await Authority.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create authority user
    const authority = await Authority.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Authority user created successfully',
      data: {
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
    console.error('Create authority error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get all complaints (admin view)
 * GET /api/admin/complaints
 */
const getAllComplaints = async (req, res) => {
  try {
    const { 
      status, 
      assignedAuthority, 
      urgency,
      page = 1, 
      limit = 50 
    } = req.query;

    // Build query
    const query = {};

    if (status) {
      query.status = status;
    }

    if (assignedAuthority) {
      query.assignedAuthority = assignedAuthority;
    }

    if (urgency === 'urgent') {
      query.urgencyScore = { $gte: 0.7 };
    } else if (urgency === 'critical') {
      query.urgencyScore = { $gte: 0.9 };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const complaints = await Complaint.find(query)
      .sort({ urgencyScore: -1, submittedAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

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
    console.error('Get all complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Upload and process CSV file
 * POST /api/admin/upload-csv
 */
const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'CSV file is required'
      });
    }

    const filePath = req.file.path;
    const results = await processCSVFile(filePath);

    res.json({
      success: true,
      message: 'CSV processed successfully',
      data: results
    });
  } catch (error) {
    console.error('CSV upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during CSV processing',
      error: error.message
    });
  }
};

module.exports = {
  login,
  createAuthorityUser,
  getAllComplaints,
  uploadCSV
};

