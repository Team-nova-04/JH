const Complaint = require("../models/Complaint");
const { processNLP, validateUrgencyWithAI } = require("../services/nlpService");
const {
  processUrgency,
  calculateUrgencyScore,
  getUrgencyLevel,
} = require("../services/urgencyService");
const { assignAuthority } = require("../services/authorityService");
const {
  extractKeyPhrases,
  generateSummary,
  mentionsPersonalPremises,
} = require("../utils/textProcessing");
const {
  TRUST_SCORES,
  REQUIRES_IDENTIFICATION_CATEGORIES,
} = require("../config/constants");

/**
 * Complaint Controller
 * Handles complaint submission and retrieval
 */

/**
 * Submit a complaint (anonymous or logged-in)
 * POST /api/complaints
 */
const submitComplaint = async (req, res) => {
  try {
    console.log("=== Complaint Submission Debug (FR2) ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file ? req.file.filename : "No file");
    console.log("User (citizen):", req.user ? req.user._id : "Anonymous");
    
    let { description, location, category, anonymous } = req.body;
    const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;
    const citizen = req.user || null;
    
    // Parse anonymous flag (can be string "true"/"false" from FormData or boolean)
    const isAnonymousRequested = anonymous === true || anonymous === "true" || anonymous === "1";

    // Ensure description is a string (not an object)
    if (typeof description !== "string") {
      if (description && typeof description === "object") {
        description = description.toString();
      } else {
        description = String(description || "");
      }
    }

    // Trim and validate
    description = description.trim();
    location = location ? String(location).trim() : null;

    // Validation
    if (!description || !location) {
      return res.status(400).json({
        success: false,
        message: "Description and location are required",
      });
    }

    // ========== FR2 RULE A: Anonymous only allowed when logged in ==========
    if (!citizen && isAnonymousRequested) {
      return res.status(401).json({
        success: false,
        message: "Please log in to submit anonymously.",
      });
    }

    // Process NLP to get the category if not provided
    const nlpResults = await processNLP(description);

    // Check if AI failed to detect category
    if (nlpResults.error || !nlpResults.category) {
      if (category) {
        console.log("Using manually selected category:", category);
      } else {
        return res.status(400).json({
          success: false,
          message:
            nlpResults.message ||
            "Could not determine category. Please re-enter your problem with more details or select a category manually.",
          requiresCategorySelection: true,
        });
      }
    }

    const finalCategory = category || nlpResults.category;

    // ========== FR2 RULE B: Category requires identity (reject if not logged in) ==========
    if (!citizen && REQUIRES_IDENTIFICATION_CATEGORIES.includes(finalCategory)) {
      return res.status(401).json({
        success: false,
        message: "Please log in to submit this category of complaint.",
      });
    }

    // ========== FR2 RULE C: Personal premises complaint from non-logged user ==========
    if (!citizen && mentionsPersonalPremises(description)) {
      return res.status(401).json({
        success: false,
        message: "Please log in to submit this category of complaint.",
      });
    }

    // ========== FR2 RULE D: If user selects anonymous but category requires identity ==========
    let finalIsAnonymous = isAnonymousRequested;
    if (citizen && isAnonymousRequested && REQUIRES_IDENTIFICATION_CATEGORIES.includes(finalCategory)) {
      // Force anonymous = false
      finalIsAnonymous = false;
      console.log("Rule D: Category requires identity, forcing anonymous = false");
      // Note: We'll return a message to frontend, but still allow submission
    }

    // Determine final anonymous status
    // If user is logged in: use their choice (or forced false if Rule D applies)
    // If user is not logged in: automatically anonymous (but Rule A already prevents anonymous=true)
    const isAnonymous = citizen ? finalIsAnonymous : false; // Non-logged users can't be anonymous per Rule A

    // Check if safety hazard requires location
    if (finalCategory === "safety hazard" && !location) {
      return res.status(400).json({
        success: false,
        message: "Location is required for safety hazard complaints",
      });
    }

    // Get urgency data for storing (hazardKeywordScore, trustScore)
    const urgencyData = processUrgency(description, isAnonymous);

    // HYBRID APPROACH: Calculate urgency using our logic first (fast, reliable)
    let urgencyScore = calculateUrgencyScore({
      sentimentScore: nlpResults.sentimentScore,
      categoryConfidence: nlpResults.categoryConfidence,
      hazardKeywordScore: urgencyData.hazardKeywordScore,
      trustScore: urgencyData.trustScore,
    });
    let urgencyLevel = getUrgencyLevel(urgencyScore);

    // Optional: Validate with AI if calculated urgency is borderline or AI suggests higher urgency
    // This helps catch edge cases where keywords might miss nuanced urgency
    try {
      const aiUrgencyValidation = await validateUrgencyWithAI(description);

      if (aiUrgencyValidation && aiUrgencyValidation.confidence >= 0.7) {
        const aiLevel = aiUrgencyValidation.urgencyLevel;
        const calculatedLevel = urgencyLevel;

        // If AI detects critical/urgent and our logic says normal, boost it
        if (
          (aiLevel === "critical" || aiLevel === "urgent") &&
          calculatedLevel === "normal"
        ) {
          console.log(
            `AI validation: Boosting urgency from ${calculatedLevel} to ${aiLevel}`
          );
          urgencyLevel = aiLevel;
          // Boost score based on AI confidence
          if (aiLevel === "critical") {
            urgencyScore = Math.min(urgencyScore + 0.3, 1.0);
          } else if (aiLevel === "urgent") {
            urgencyScore = Math.min(urgencyScore + 0.2, 0.89);
          }
        }
        // If both agree on high urgency, slightly boost confidence
        else if (
          (aiLevel === "critical" || aiLevel === "urgent") &&
          (calculatedLevel === "critical" || calculatedLevel === "urgent")
        ) {
          urgencyScore = Math.min(urgencyScore + 0.05, 1.0);
          console.log(
            `AI validation: Confirmed ${urgencyLevel} urgency, boosted score`
          );
        }
      }
    } catch (error) {
      // AI validation failed - use calculated urgency (not critical)
      console.log("AI urgency validation skipped, using calculated urgency");
    }

    console.log(
      `Final urgency: ${urgencyLevel} (score: ${urgencyScore.toFixed(2)})`
    );

    // Assign authority (use provided category or NLP result)
    const assignedAuthority = assignAuthority(finalCategory);

    // Generate summary and key phrases (ensure they are strings)
    const summary = String(generateSummary(description) || "").trim();
    const keyPhrases = extractKeyPhrases(description);

    // Ensure keyPhrases is an array of strings
    const validKeyPhrases = Array.isArray(keyPhrases)
      ? keyPhrases
          .map((phrase) => String(phrase || "").trim())
          .filter((phrase) => phrase.length > 0)
      : [];

    // Create complaint - ensure all string fields are properly formatted
    // FR2: If anonymous, hide citizen info from authorities but store citizenId internally for identity requests
    const complaint = await Complaint.create({
      citizenId: citizen ? citizen._id : null, // Store citizenId even if anonymous (for identity requests)
      anonymous: isAnonymous,
      name: isAnonymous ? null : (citizen ? String(citizen.name || "").trim() : null),
      phone: isAnonymous ? null : (citizen ? String(citizen.phone || "").trim() : null),
      email: isAnonymous ? null : (citizen ? String(citizen.email || "").trim() : null),
      description: String(description).trim(), // Ensure it's a string
      location: String(location).trim(), // Ensure it's a string
      imageUrl: imageUrl ? String(imageUrl).trim() : null,
      category: finalCategory ? String(finalCategory).trim() : null,
      sentiment: nlpResults.sentiment
        ? String(nlpResults.sentiment)
        : "neutral",
      sentimentScore: Number(nlpResults.sentimentScore) || 0.5,
      categoryConfidence: Number(nlpResults.categoryConfidence) || 0,
      summary: summary || "", // Ensure it's a string, not null
      keyPhrases: validKeyPhrases, // Use validated array
      hazardKeywordScore: Number(urgencyData.hazardKeywordScore) || 0,
      urgencyScore: Number(urgencyScore) || 0.5,
      trustScore: Number(urgencyData.trustScore) || 0.5,
      assignedAuthority: String(assignedAuthority).trim(),
      status: "pending",
      notes: [],
    });

    console.log("✅ Complaint created successfully:", {
      id: complaint._id,
      anonymous: isAnonymous,
      category: complaint.category,
      urgencyLevel: urgencyLevel,
    });

    // FR2 Rule D: If anonymous was disabled due to category requirement, inform frontend
    const responseMessage = 
      (citizen && isAnonymousRequested && !finalIsAnonymous && REQUIRES_IDENTIFICATION_CATEGORIES.includes(finalCategory))
        ? "Category requires identification. Anonymous mode disabled."
        : "Complaint submitted successfully";

    res.status(201).json({
      success: true,
      message: responseMessage,
      data: {
        complaint: {
          id: complaint._id,
          description: complaint.description,
          location: complaint.location,
          category: complaint.category,
          urgencyScore: complaint.urgencyScore,
          assignedAuthority: complaint.assignedAuthority,
          status: complaint.status,
          submittedAt: complaint.submittedAt,
          anonymous: complaint.anonymous,
        },
      },
    });
  } catch (error) {
    console.error("❌ Submit complaint error:", error);
    console.error("Error stack:", error.stack);
    
    // Return more specific error messages
    const statusCode = error.status || error.statusCode || 500;
    const message = error.message || "Server error during complaint submission";
    
    res.status(statusCode).json({
      success: false,
      message: message,
      ...(process.env.NODE_ENV === "development" && { 
        error: error.message,
        stack: error.stack 
      }),
    });
  }
};

/**
 * Get citizen's own complaints (including anonymous ones)
 * GET /api/complaints/my-complaints
 */
const getMyComplaints = async (req, res) => {
  try {
    // FR2: Include both anonymous and non-anonymous complaints for the logged-in user
    const complaints = await Complaint.find({
      citizenId: req.user._id,
    })
      .sort({ submittedAt: -1 })
      .select("-notes");

    res.json({
      success: true,
      count: complaints.length,
      data: { complaints },
    });
  } catch (error) {
    console.error("Get my complaints error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Get single complaint by ID (for citizen)
 * GET /api/complaints/:id
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

    // Check if citizen owns this complaint
    if (req.user && complaint.citizenId) {
      if (complaint.citizenId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    } else if (complaint.anonymous) {
      return res.status(403).json({
        success: false,
        message: "Cannot access anonymous complaint",
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
 * Request identity for anonymous complaint (Authority only)
 * POST /api/complaints/:id/request-identity
 */
const requestIdentity = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Check if complaint is anonymous
    if (!complaint.anonymous) {
      return res.status(400).json({
        success: false,
        message: "This complaint is not anonymous",
      });
    }

    // Check if identity already requested
    if (complaint.identityRequested) {
      return res.status(400).json({
        success: false,
        message: "Identity already requested for this complaint",
      });
    }

    // Check if identity already approved
    if (complaint.identityApproved) {
      return res.status(400).json({
        success: false,
        message: "Identity already approved for this complaint",
      });
    }

    // Update complaint with identity request
    complaint.identityRequested = true;
    complaint.identityRequestedBy = req.user._id; // Authority user
    complaint.identityRequestedAt = new Date();
    await complaint.save();

    res.json({
      success: true,
      message: "Identity request sent to citizen",
      data: { complaint },
    });
  } catch (error) {
    console.error("Request identity error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Approve identity request (Citizen only)
 * POST /api/complaints/:id/approve-identity
 */
const approveIdentity = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("citizenId");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Check if citizen owns this complaint
    const citizenIdStr = complaint.citizenId ? complaint.citizenId.toString() : null;
    if (!citizenIdStr || citizenIdStr !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Check if identity was requested
    if (!complaint.identityRequested) {
      return res.status(400).json({
        success: false,
        message: "No identity request found for this complaint",
      });
    }

    // Check if already approved
    if (complaint.identityApproved) {
      return res.status(400).json({
        success: false,
        message: "Identity already approved",
      });
    }

    // Get citizen details
    const Citizen = require("../models/Citizen");
    const citizen = await Citizen.findById(complaint.citizenId);

    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen not found",
      });
    }

    // Approve and reveal identity
    complaint.identityApproved = true;
    complaint.revealedUser = {
      name: citizen.name,
      phone: citizen.phone,
      email: citizen.email,
    };
    await complaint.save();

    res.json({
      success: true,
      message: "Identity approved and revealed to authority",
      data: { complaint },
    });
  } catch (error) {
    console.error("Approve identity error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Decline identity request (Citizen only)
 * POST /api/complaints/:id/decline-identity
 */
const declineIdentity = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Check if citizen owns this complaint
    const citizenIdStr = complaint.citizenId ? complaint.citizenId.toString() : null;
    if (!citizenIdStr || citizenIdStr !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Check if identity was requested
    if (!complaint.identityRequested) {
      return res.status(400).json({
        success: false,
        message: "No identity request found for this complaint",
      });
    }

    // Reset identity request
    complaint.identityRequested = false;
    complaint.identityRequestedBy = null;
    complaint.identityRequestedAt = null;
    await complaint.save();

    res.json({
      success: true,
      message: "Identity request declined",
      data: { complaint },
    });
  } catch (error) {
    console.error("Decline identity error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  submitComplaint,
  getMyComplaints,
  getComplaintById,
  requestIdentity,
  approveIdentity,
  declineIdentity,
};
