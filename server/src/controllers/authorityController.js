const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Authority = require("../models/Authority");
const Complaint = require("../models/Complaint");
const { generateToken } = require("../utils/jwt");

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
        message: "Please provide email and password",
      });
    }

    const authority = await Authority.findOne({ email, isActive: true });
    if (!authority) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, authority.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(authority._id, "authority");

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        authority: {
          id: authority._id,
          name: authority.name,
          email: authority.email,
          role: authority.role,
          department: authority.department,
        },
      },
    });
  } catch (error) {
    console.error("Authority login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

/**
 * Get all complaints assigned to authority
 * GET /api/authority/complaints
 */
const getComplaints = async (req, res) => {
  try {
    const {
      status,
      urgency,
      category,
      location,
      page = 1,
      limit = 20,
    } = req.query;
    const authority = req.user;

    // Build query
    const query = { assignedAuthority: authority.role };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by urgency
    if (urgency === "urgent") {
      query.urgencyScore = { $gte: 0.7 };
    } else if (urgency === "critical") {
      query.urgencyScore = { $gte: 0.9 };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by location (case-insensitive partial match)
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get complaints
    const complaints = await Complaint.find(query)
      .sort({ urgencyScore: -1, submittedAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select("-notes");

    // Get total count
    const total = await Complaint.countDocuments(query);

    res.json({
      success: true,
      count: complaints.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: { complaints },
    });
  } catch (error) {
    console.error("Get complaints error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
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
        message: "Complaint not found",
      });
    }

    // Check if complaint is assigned to this authority
    if (complaint.assignedAuthority !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Complaint not assigned to your authority.",
      });
    }

    res.json({
      success: true,
      data: { complaint },
    });
  } catch (error) {
    console.error("Get complaint error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
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
    const validStatuses = ["pending", "seen", "in_progress", "resolved"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Check if complaint is assigned to this authority
    if (complaint.assignedAuthority !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Complaint not assigned to your authority.",
      });
    }

    // Validate status transition - enforce proper flow
    const currentStatus = complaint.status;
    const statusFlow = {
      pending: ["seen"],
      seen: ["in_progress"],
      in_progress: ["resolved"],
      resolved: [], // Cannot change from resolved
    };

    // Check if transition is valid
    if (!statusFlow[currentStatus]?.includes(status)) {
      // Allow staying in the same status (no-op)
      if (currentStatus === status) {
        return res.json({
          success: true,
          message: "Status is already set to this value",
          data: { complaint },
        });
      }

      // Check if trying to go backwards (allow some flexibility)
      const allowedBackwards = {
        in_progress: ["seen"], // Can go back from in_progress to seen
        resolved: [], // Cannot go back from resolved
      };

      if (!allowedBackwards[currentStatus]?.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status transition. Current status: ${currentStatus}. Allowed next statuses: ${statusFlow[currentStatus]?.join(", ") || "none"}`,
        });
      }
    }

    // Update status
    complaint.status = status;
    if (status === "resolved") {
      complaint.resolvedAt = new Date();
    }
    await complaint.save();

    res.json({
      success: true,
      message: "Status updated successfully",
      data: { complaint },
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
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
        message: "Note content is required",
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Check if complaint is assigned to this authority
    if (complaint.assignedAuthority !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Complaint not assigned to your authority.",
      });
    }

    // Add note
    complaint.notes.push({
      content,
      addedBy: req.user.name || req.user.email,
    });
    await complaint.save();

    res.json({
      success: true,
      message: "Note added successfully",
      data: { complaint },
    });
  } catch (error) {
    console.error("Add note error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Request contact from citizen for anonymous complaints
 * POST /api/authority/complaints/:id/request-contact
 */
const requestContact = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Check if complaint is assigned to this authority
    if (complaint.assignedAuthority !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Complaint not assigned to your authority.",
      });
    }

    // Handle non-anonymous complaints
    if (!complaint.anonymous) {
      complaint.notes.push({
        content: `Contact details viewed by ${req.user.name || req.user.email}`,
        addedBy: "System",
      });
      await complaint.save();

      return res.json({
        success: true,
        message: "Contact details retrieved for registered user.",
        data: {
          citizenContact: {
            email: complaint.email,
            phone: complaint.phone,
            name: complaint.name,
          },
        },
      });
    }

    // Handle anonymous complaints
    // Generate a secure, single-use token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    complaint.contactRequest = {
      status: "requested",
      token: token,
      tokenExpires: tokenExpiry,
      requestedBy: req.user._id,
      requestedAt: new Date(),
    };

    await complaint.save();

    // This URL would be given to the anonymous user when they submit the complaint
    const responseUrl = `${process.env.CLIENT_URL}/complaint/${complaint._id}/provide-contact?token=${token}`;

    res.json({
      success: true,
      message:
        "Contact request initiated for anonymous user. Share the response URL with the user.",
      data: {
        responseUrl: responseUrl, // In a real app, this would be handled differently
      },
    });
  } catch (error) {
    console.error("Request contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  getComplaints,
  getComplaintById,
  updateStatus,
  addNote,
  requestContact,
};
