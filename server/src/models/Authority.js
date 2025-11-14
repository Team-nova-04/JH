const mongoose = require("mongoose");

/**
 * Authority Model
 * Represents authority users who handle complaints
 */
const authoritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
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
    department: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
// Note: email index is automatically created by unique: true
authoritySchema.index({ role: 1 });

module.exports = mongoose.model("Authority", authoritySchema);
