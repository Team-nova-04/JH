/**
 * Role-Based Access Control Middleware
 * Restricts routes based on user roles
 */

// Allow only citizens
const citizenOnly = (req, res, next) => {
  if (req.userType !== "citizen") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Citizen access required.",
    });
  }
  next();
};

// Allow only authority users
const authorityOnly = (req, res, next) => {
  if (req.userType !== "authority") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Authority access required.",
    });
  }
  next();
};

// Allow only admins
const adminOnly = (req, res, next) => {
  if (req.userType !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin access required.",
    });
  }
  next();
};

// Allow authority or admin
const authorityOrAdmin = (req, res, next) => {
  if (req.userType !== "authority" && req.userType !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Authority or Admin access required.",
    });
  }
  next();
};

module.exports = {
  citizenOnly,
  authorityOnly,
  adminOnly,
  authorityOrAdmin,
};
