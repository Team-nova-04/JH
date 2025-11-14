const mongoose = require("mongoose");

/**
 * Complaint Model
 * Core model for storing all complaint data including NLP analysis
 */
const complaintSchema = new mongoose.Schema(
  {
    // Citizen Information (optional for anonymous)
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      default: null,
    },
    anonymous: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      trim: true,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      trim: true,
      default: null,
    },

    // Complaint Details
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      trim: true,
      default: null,
    },

    // NLP Analysis Results
    sentiment: {
      type: String,
      enum: ["positive", "negative", "neutral"],
      default: null,
    },
    sentimentScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
    categoryConfidence: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
    summary: {
      type: String,
      trim: true,
      default: null,
    },
    keyPhrases: {
      type: [String],
      default: [],
    },
    hazardKeywordScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
    urgencyScore: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 1,
    },
    trustScore: {
      type: Number,
      default: 0.5,
      min: 0,
      max: 1,
    },

    // Assignment & Status
    assignedAuthority: {
      type: String,
      required: true,
      enum: [
        "municipal_council",
        "water_board",
        "ceb",
        "rda",
        "police_safety",
        "disaster_management",
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "seen", "in_progress", "resolved"],
      default: "pending",
    },
    notes: [
      {
        content: {
          type: String,
          required: true,
        },
        addedBy: {
          type: String,
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Metadata
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
complaintSchema.index({ citizenId: 1 });
complaintSchema.index({ assignedAuthority: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ urgencyScore: -1 });
complaintSchema.index({ submittedAt: -1 });
complaintSchema.index({ location: "text", description: "text" });

// Update updatedAt before saving
complaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  if (this.status === "resolved" && !this.resolvedAt) {
    this.resolvedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("Complaint", complaintSchema);
