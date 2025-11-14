/**
 * Application Constants
 * Centralized configuration values
 */

// Authority role mappings for complaint assignment
const AUTHORITY_MAPPING = {
  "water issue": "water_board",
  "electricity issue": "ceb",
  "road issue": "rda",
  "garbage issue": "municipal_council",
  "safety hazard": "police_safety",
  "environmental issue": "municipal_council",
  disaster: "disaster_management",
  flood: "disaster_management",
  storm: "disaster_management",
};

// Hazard keywords for urgency detection
const HAZARD_KEYWORDS = [
  "collapse",
  "burst",
  "flood",
  "leak",
  "sparking",
  "fire",
  "danger",
  "injury",
  "accident",
];

// Urgency thresholds
const URGENCY_THRESHOLDS = {
  CRITICAL: 0.9,
  URGENT: 0.7,
};

// Trust scores
const TRUST_SCORES = {
  ANONYMOUS: 0.3,
  REGISTERED: 0.8,
};

// HuggingFace API endpoints
const HUGGINGFACE_API = {
  BASE_URL: "https://api-inference.huggingface.co/models",
  SENTIMENT_MODEL: "distilbert-base-uncased-finetuned-sst-2-english",
  CLASSIFICATION_MODEL: "facebook/bart-large-mnli",
};

// Classification candidate labels
const CLASSIFICATION_LABELS = [
  "water issue",
  "electricity issue",
  "road issue",
  "garbage issue",
  "safety hazard",
  "environmental issue",
];

// Personal premises keywords (require login)
const PERSONAL_PREMISES_KEYWORDS = [
  "bathroom",
  "inside house",
  "my house",
  "my home",
  "inside my",
  "personal",
];

// Categories that require user identification
const REQUIRES_IDENTIFICATION_CATEGORIES = ["water issue", "electricity issue"];

module.exports = {
  AUTHORITY_MAPPING,
  HAZARD_KEYWORDS,
  URGENCY_THRESHOLDS,
  TRUST_SCORES,
  HUGGINGFACE_API,
  CLASSIFICATION_LABELS,
  PERSONAL_PREMISES_KEYWORDS,
  REQUIRES_IDENTIFICATION_CATEGORIES,
};
