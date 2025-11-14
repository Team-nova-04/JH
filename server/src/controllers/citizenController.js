const bcrypt = require('bcryptjs');
const Citizen = require('../models/Citizen');
const { generateToken } = require('../utils/jwt');

/**
 * Citizen Controller
 * Handles citizen registration, login, and profile management
 */

/**
 * Register a new citizen
 * POST /api/citizens/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Check if citizen already exists
    const existingCitizen = await Citizen.findOne({ email });
    if (existingCitizen) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create citizen
    const citizen = await Citizen.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || null
    });

    // Generate token
    const token = generateToken(citizen._id, 'citizen');

    res.status(201).json({
      success: true,
      message: 'Citizen registered successfully',
      data: {
        token,
        citizen: {
          id: citizen._id,
          name: citizen.name,
          email: citizen.email,
          phone: citizen.phone
        }
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

/**
 * Login citizen
 * POST /api/citizens/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find citizen
    const citizen = await Citizen.findOne({ email });
    if (!citizen) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, citizen.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(citizen._id, 'citizen');

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        citizen: {
          id: citizen._id,
          name: citizen.name,
          email: citizen.email,
          phone: citizen.phone
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

/**
 * Get current citizen profile
 * GET /api/citizens/me
 */
const getMe = async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.user._id).select('-password');
    
    res.json({
      success: true,
      data: {
        citizen: {
          id: citizen._id,
          name: citizen.name,
          email: citizen.email,
          phone: citizen.phone,
          createdAt: citizen.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};

