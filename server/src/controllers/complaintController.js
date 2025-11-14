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
    let { description, location, category } = req.body;
    const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;
    const citizen = req.user || null;

    // Ensure description is a string (not an object)
    if (typeof description !== "string") {
      if (description && typeof description === "object") {
        // If it's an object, try to extract a string value or convert to string
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

    // Process NLP to get the category if not provided
    const nlpResults = await processNLP(description);

    // Check if AI failed to detect category
    if (nlpResults.error || !nlpResults.category) {
      // If user provided category manually, use it
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

    // Check if the category requires identification and if the user is anonymous
    if (
      REQUIRES_IDENTIFICATION_CATEGORIES.includes(finalCategory) &&
      !citizen
    ) {
      return res.status(401).json({
        success: false,
        message: `Contact information is required for complaints in the '${finalCategory}' category. Please log in to submit.`,
      });
    }

    // Check if personal premises mentioned (require login)
    if (mentionsPersonalPremises(description) && !citizen) {
      return res.status(401).json({
        success: false,
        message: "Login required for personal premises complaints",
      });
    }

    // Check if safety hazard requires location
    if (finalCategory === "safety hazard" && !location) {
      return res.status(400).json({
        success: false,
        message: "Location is required for safety hazard complaints",
      });
    }

    // Determine if anonymous
    const isAnonymous = !citizen;

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
    const complaint = await Complaint.create({
      citizenId: citizen ? citizen._id : null,
      anonymous: isAnonymous,
      name: citizen ? String(citizen.name || "").trim() : null,
      phone: citizen ? String(citizen.phone || "").trim() : null,
      email: citizen ? String(citizen.email || "").trim() : null,
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

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
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
        },
      },
    });
  } catch (error) {
    console.error("Submit complaint error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during complaint submission",
      error: error.message,
    });
  }
};

/**
 * Get citizen's own complaints
 * GET /api/complaints/my-complaints
 */
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      citizenId: req.user._id,
      anonymous: false,
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

module.exports = {
  submitComplaint,
  getMyComplaints,
  getComplaintById,
};
