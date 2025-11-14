const jwt = require("jsonwebtoken");
const Citizen = require("../models/Citizen");
const Authority = require("../models/Authority");
const Admin = require("../models/Admin");

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Authorization denied.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user based on type
    let user = null;
    if (decoded.type === "citizen") {
      user = await Citizen.findById(decoded.id).select("-password");
    } else if (decoded.type === "authority") {
      user = await Authority.findById(decoded.id).select("-password");
    } else if (decoded.type === "admin") {
      user = await Admin.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid.",
      });
    }

    // Attach user to request
    req.user = user;
    req.userType = decoded.type;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Token is not valid.",
    });
  }
};

/**
 * Optional Auth Middleware
 * Allows requests with or without token (for anonymous complaints)
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = null;
      if (decoded.type === "citizen") {
        user = await Citizen.findById(decoded.id).select("-password");
      }

      if (user) {
        req.user = user;
        req.userType = decoded.type;
      }
    }

    next();
  } catch (error) {
    // Continue without auth if token is invalid
    next();
  }
};

module.exports = { authMiddleware, optionalAuth };
