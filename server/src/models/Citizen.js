const mongoose = require("mongoose");

/**
 * Citizen Model
 * Represents registered citizens who can submit complaints
 */
const citizenSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Note: email index is automatically created by unique: true
// No need for manual index declaration

module.exports = mongoose.model("Citizen", citizenSchema);
