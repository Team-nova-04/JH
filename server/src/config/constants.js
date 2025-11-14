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
    "collapse", "burst", "sparking", "fire", "explosion", "life threatening",
    "emergency", "critical", "immediate danger", "urgent", "gushing"
  ],
  // High urgency keywords (weight: 2)
  high: [
    "flood", "flooding", "danger", "dangerous", "hazard", "risk", "accident",
    "injury", "damage", "damaging", "severe", "serious", "major"
  ],
  // Medium urgency keywords (weight: 1)
  medium: [
    "leak", "leaking", "problem", "issue", "concern", "worry", "affecting"
  ]
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

// HuggingFace API endpoints
const HUGGINGFACE_API = {
  BASE_URL: "https://api-inference.huggingface.co/models",
  SENTIMENT_MODEL: "distilbert-base-uncased-finetuned-sst-2-english",
  CLASSIFICATION_MODEL: "facebook/bart-large-mnli",
};

// Classification candidate labels (improved for better accuracy)
const CLASSIFICATION_LABELS = [
  "water supply issue or water leak or water pipe problem",
  "electricity power outage or electrical fault or power issue",
  "road pothole or road damage or road maintenance",
  "garbage collection or waste management or trash disposal",
  "safety hazard or security threat or emergency situation",
  "environmental pollution or air quality or noise pollution",
];

// Keyword-based category detection (primary method for accuracy)
// Keywords are weighted: specific domain keywords have higher priority
const CATEGORY_KEYWORDS = {
  "water issue": {
    // High priority keywords (weight: 3)
    high: [
      "water leak", "water pipe", "burst pipe", "broken pipe", "water main",
      "water line", "leaking water", "water flooding", "water gushing"
    ],
    // Medium priority keywords (weight: 2)
    medium: [
      "water supply", "water shortage", "water pressure", "water connection",
      "no water", "water cut", "water outage", "water problem", "water issue",
      "water damage", "water service", "pipe burst", "pipe leak"
    ],
    // Low priority keywords (weight: 1)
    low: [
      "water", "leak", "flooding", "pipe"
    ]
  },
  "electricity issue": {
    high: [
      "power outage", "power cut", "no power", "sparking", "electrical fault",
      "blackout", "power failure", "electrical hazard", "electric wire"
    ],
    medium: [
      "electricity", "power line", "power supply", "electricity problem",
      "voltage", "electrical", "power issue"
    ],
    low: ["power", "electric"]
  },
  "road issue": {
    high: [
      "pothole", "road damage", "broken road", "road hazard", "road closure"
    ],
    medium: [
      "road repair", "road condition", "road maintenance", "road safety",
      "road surface", "road work", "street repair", "street damage", "road construction"
    ],
    low: ["road", "street", "pavement"]
  },
  "garbage issue": {
    high: [
      "garbage collection", "waste disposal", "garbage dump", "garbage pile"
    ],
    medium: [
      "garbage", "trash", "waste", "rubbish", "refuse", "garbage bin",
      "trash can", "waste management", "garbage truck", "waste collection", "garbage problem"
    ],
    low: ["garbage", "trash", "waste"]
  },
  "safety hazard": {
    // Safety hazard should only match if NO specific domain keywords are present
    high: [
      "collapse", "falling", "accident", "injury", "life threatening",
      "emergency situation", "structural collapse"
    ],
    medium: [
      "danger", "hazard", "unsafe", "security", "threat", "emergency",
      "risk", "dangerous", "critical", "urgent safety", "immediate danger"
    ],
    low: ["safety", "danger", "hazard"]
  },
  "environmental issue": {
    high: [
      "air pollution", "water pollution", "noise pollution", "environmental damage",
      "toxic", "contamination", "chemical spill"
    ],
    medium: [
      "pollution", "air quality", "noise", "smoke", "emission", "environmental",
      "smell", "odor", "fumes", "environment"
    ],
    low: ["pollution", "environment"]
  },
};

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
  CATEGORY_KEYWORDS,
  PERSONAL_PREMISES_KEYWORDS,
  REQUIRES_IDENTIFICATION_CATEGORIES,
};
