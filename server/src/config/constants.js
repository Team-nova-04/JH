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

// Hazard keywords for urgency detection (weighted by severity)
const HAZARD_KEYWORDS = {
  // Critical keywords (weight: 3)
  critical: [
    "collapse",
    "burst",
    "sparking",
    "fire",
    "explosion",
    "life threatening",
    "emergency",
    "critical",
    "immediate danger",
    "urgent",
    "gushing",
  ],
  // High urgency keywords (weight: 2)
  high: [
    "flood",
    "flooding",
    "danger",
    "dangerous",
    "hazard",
    "risk",
    "accident",
    "injury",
    "damage",
    "damaging",
    "severe",
    "serious",
    "major",
  ],
  // Medium urgency keywords (weight: 1)
  medium: [
    "leak",
    "leaking",
    "problem",
    "issue",
    "concern",
    "worry",
    "affecting",
  ],
};

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

// HuggingFace API endpoints (using new router endpoint)
const HUGGINGFACE_API = {
  BASE_URL: "https://router.huggingface.co/hf-inference/models",
  SENTIMENT_MODEL: "nlptown/bert-base-multilingual-uncased-sentiment", // Reliable sentiment model
  CLASSIFICATION_MODEL: "MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli", // Reliable zero-shot model
};

// Classification candidate labels (simplified for AI-first approach)
// AI models understand these simple labels well without verbose descriptions
const CLASSIFICATION_LABELS = [
  "water issue",
  "electricity issue",
  "road issue",
  "garbage issue",
  "safety hazard",
  "environmental issue",
];

// Personal premises keywords (require login) - FR2
const PERSONAL_PREMISES_KEYWORDS = [
  "my house",
  "inside home",
  "personal bathroom",
  "inside my property",
  "bathroom",
  "inside house",
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
