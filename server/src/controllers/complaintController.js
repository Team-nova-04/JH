const Complaint = require('../models/Complaint');
const { processNLP } = require('../services/nlpService');
const { processUrgency, calculateUrgencyScore } = require('../services/urgencyService');
const { assignAuthority } = require('../services/authorityService');
const { 
  extractKeyPhrases, 
  generateSummary,
  mentionsPersonalPremises 
} = require('../utils/textProcessing');
const { TRUST_SCORES } = require('../config/constants');

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
    const { description, location, category } = req.body;
    const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;
    const citizen = req.user || null;

    // Validation
    if (!description || !location) {
      return res.status(400).json({
        success: false,
        message: 'Description and location are required'
      });
    }

    // Check if personal premises mentioned (require login)
    if (mentionsPersonalPremises(description) && !citizen) {
      return res.status(401).json({
        success: false,
        message: 'Login required for personal premises complaints'
      });
    }

    // Check if safety hazard requires location
    if (category === 'safety hazard' && !location) {
      return res.status(400).json({
        success: false,
        message: 'Location is required for safety hazard complaints'
      });
    }

    // Determine if anonymous
    const isAnonymous = !citizen;

    // Process NLP
    const nlpResults = await processNLP(description);

    // Process urgency
    const urgencyData = processUrgency(description, isAnonymous);
    const urgencyScore = calculateUrgencyScore({
      sentimentScore: nlpResults.sentimentScore,
      categoryConfidence: nlpResults.categoryConfidence,
      hazardKeywordScore: urgencyData.hazardKeywordScore,
      trustScore: urgencyData.trustScore
    });

    // Assign authority (use provided category or NLP result)
    const finalCategory = category || nlpResults.category;
    const assignedAuthority = assignAuthority(finalCategory);

    // Generate summary and key phrases
    const summary = generateSummary(description);
    const keyPhrases = extractKeyPhrases(description);

    // Create complaint
    const complaint = await Complaint.create({
      citizenId: citizen ? citizen._id : null,
      anonymous: isAnonymous,
      name: citizen ? citizen.name : null,
      phone: citizen ? citizen.phone : null,
      email: citizen ? citizen.email : null,
      description,
      location,
      imageUrl,
      category: finalCategory,
      sentiment: nlpResults.sentiment,
      sentimentScore: nlpResults.sentimentScore,
      categoryConfidence: nlpResults.categoryConfidence,
      summary,
      keyPhrases,
      hazardKeywordScore: urgencyData.hazardKeywordScore,
      urgencyScore,
      trustScore: urgencyData.trustScore,
      assignedAuthority,
      status: 'pending',
      notes: []
    });

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      data: {
        complaint: {
          id: complaint._id,
          description: complaint.description,
          location: complaint.location,
          category: complaint.category,
          urgencyScore: complaint.urgencyScore,
          assignedAuthority: complaint.assignedAuthority,
          status: complaint.status,
          submittedAt: complaint.submittedAt
        }
      }
    });
  } catch (error) {
    console.error('Submit complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during complaint submission',
      error: error.message
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
      anonymous: false
    })
    .sort({ submittedAt: -1 })
    .select('-notes');

    res.json({
      success: true,
      count: complaints.length,
      data: { complaints }
    });
  } catch (error) {
    console.error('Get my complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
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
        message: 'Complaint not found'
      });
    }

    // Check if citizen owns this complaint
    if (req.user && complaint.citizenId) {
      if (complaint.citizenId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    } else if (complaint.anonymous) {
      return res.status(403).json({
        success: false,
        message: 'Cannot access anonymous complaint'
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

module.exports = {
  submitComplaint,
  getMyComplaints,
  getComplaintById
};

