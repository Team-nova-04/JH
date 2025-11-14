const { PERSONAL_PREMISES_KEYWORDS, HAZARD_KEYWORDS } = require('../config/constants');

/**
 * Text Processing Utilities
 * Helper functions for text analysis
 */

/**
 * Check if text mentions personal premises
 */
const mentionsPersonalPremises = (text) => {
  const lowerText = text.toLowerCase();
  return PERSONAL_PREMISES_KEYWORDS.some(keyword => 
    lowerText.includes(keyword)
  );
};

/**
 * Calculate hazard keyword score
 */
const calculateHazardKeywordScore = (text) => {
  const lowerText = text.toLowerCase();
  let matches = 0;
  
  HAZARD_KEYWORDS.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      matches++;
    }
  });
  
  // Normalize to 0-1 scale (max 8 keywords)
  return Math.min(matches / HAZARD_KEYWORDS.length, 1);
};

/**
 * Extract key phrases from text (simple implementation)
 */
const extractKeyPhrases = (text, maxPhrases = 5) => {
  // Simple keyword extraction - can be enhanced with NLP
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 4);
  
  // Count word frequency
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top phrases
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxPhrases)
    .map(([word]) => word);
};

/**
 * Generate summary from text (simple implementation)
 */
const generateSummary = (text, maxLength = 150) => {
  if (text.length <= maxLength) {
    return text;
  }
  
  // Simple truncation with sentence boundary detection
  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastExclamation = truncated.lastIndexOf('!');
  const lastQuestion = truncated.lastIndexOf('?');
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  if (lastSentenceEnd > maxLength * 0.5) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }
  
  return truncated + '...';
};

module.exports = {
  mentionsPersonalPremises,
  calculateHazardKeywordScore,
  extractKeyPhrases,
  generateSummary
};

