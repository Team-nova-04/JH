const { 
  URGENCY_THRESHOLDS,
  TRUST_SCORES 
} = require('../config/constants');
const { calculateHazardKeywordScore } = require('../utils/textProcessing');

/**
 * Urgency Scoring Service
 * Calculates urgency score based on multiple factors
 */

/**
 * Calculate urgency score using improved formula:
 * urgencyScore = (sentimentScore * 0.3) + (categoryConfidence * 0.2) + 
 *                (hazardKeywordScore * 0.4) + (trustScore * 0.1)
 * 
 * Increased weight for hazard keywords as they're better indicators of urgency
 */
const calculateUrgencyScore = (data) => {
  const {
    sentimentScore = 0.5,
    categoryConfidence = 0.5,
    hazardKeywordScore = 0,
    trustScore = 0.5
  } = data;

  // Base urgency score
  let urgencyScore = 
    (sentimentScore * 0.3) +
    (categoryConfidence * 0.2) +
    (hazardKeywordScore * 0.4) +
    (trustScore * 0.1);

  // Boost urgency if hazard score is high (indicates dangerous situation)
  if (hazardKeywordScore >= 0.6) {
    urgencyScore = Math.min(urgencyScore + 0.15, 1); // Boost by 15%
  } else if (hazardKeywordScore >= 0.4) {
    urgencyScore = Math.min(urgencyScore + 0.1, 1); // Boost by 10%
  }

  // Boost urgency if sentiment is very negative (indicates serious concern)
  if (sentimentScore >= 0.7) {
    urgencyScore = Math.min(urgencyScore + 0.1, 1); // Boost by 10%
  }

  // Ensure score is between 0 and 1
  return Math.min(Math.max(urgencyScore, 0), 1);
};

/**
 * Determine urgency level based on score
 */
const getUrgencyLevel = (urgencyScore) => {
  if (urgencyScore >= URGENCY_THRESHOLDS.CRITICAL) {
    return 'critical';
  } else if (urgencyScore >= URGENCY_THRESHOLDS.URGENT) {
    return 'urgent';
  } else {
    return 'normal';
  }
};

/**
 * Process full urgency calculation for a complaint
 */
const processUrgency = (description, isAnonymous = false) => {
  const hazardKeywordScore = calculateHazardKeywordScore(description);
  const trustScore = isAnonymous ? TRUST_SCORES.ANONYMOUS : TRUST_SCORES.REGISTERED;

  return {
    hazardKeywordScore,
    trustScore
  };
};

module.exports = {
  calculateUrgencyScore,
  getUrgencyLevel,
  processUrgency
};

