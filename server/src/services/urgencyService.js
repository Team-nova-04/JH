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
 * Calculate urgency score using the formula:
 * urgencyScore = (sentimentScore * 0.4) + (categoryConfidence * 0.3) + 
 *                (hazardKeywordScore * 0.2) + (trustScore * 0.1)
 */
const calculateUrgencyScore = (data) => {
  const {
    sentimentScore = 0.5,
    categoryConfidence = 0.5,
    hazardKeywordScore = 0,
    trustScore = 0.5
  } = data;

  const urgencyScore = 
    (sentimentScore * 0.4) +
    (categoryConfidence * 0.3) +
    (hazardKeywordScore * 0.2) +
    (trustScore * 0.1);

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

