const {
  PERSONAL_PREMISES_KEYWORDS,
  HAZARD_KEYWORDS,
} = require("../config/constants");

/**
 * Text Processing Utilities
 * Helper functions for text analysis
 */

/**
 * Check if text mentions personal premises
 */
const mentionsPersonalPremises = (text) => {
  const lowerText = text.toLowerCase();
  return PERSONAL_PREMISES_KEYWORDS.some((keyword) =>
    lowerText.includes(keyword)
  );
};

/**
 * Calculate hazard keyword score (weighted by severity)
 */
const calculateHazardKeywordScore = (text) => {
  const lowerText = text.toLowerCase();
  let totalScore = 0;
  let maxPossibleScore = 0;

  // Check critical keywords (weight: 3)
  if (HAZARD_KEYWORDS.critical) {
    HAZARD_KEYWORDS.critical.forEach((keyword) => {
      maxPossibleScore += 3;
      if (lowerText.includes(keyword.toLowerCase())) {
        totalScore += 3;
      }
    });
  }

  // Check high urgency keywords (weight: 2)
  if (HAZARD_KEYWORDS.high) {
    HAZARD_KEYWORDS.high.forEach((keyword) => {
      maxPossibleScore += 2;
      if (lowerText.includes(keyword.toLowerCase())) {
        totalScore += 2;
      }
    });
  }

  // Check medium urgency keywords (weight: 1)
  if (HAZARD_KEYWORDS.medium) {
    HAZARD_KEYWORDS.medium.forEach((keyword) => {
      maxPossibleScore += 1;
      if (lowerText.includes(keyword.toLowerCase())) {
        totalScore += 1;
      }
    });
  }

  // Normalize to 0-1 scale, but boost score for critical keywords
  const normalizedScore =
    maxPossibleScore > 0 ? Math.min(totalScore / maxPossibleScore, 1) : 0;

  // Boost score if critical keywords are present
  const hasCritical = HAZARD_KEYWORDS.critical?.some((keyword) =>
    lowerText.includes(keyword.toLowerCase())
  );

  if (hasCritical) {
    return Math.min(normalizedScore * 1.3, 1); // Boost by 30%, cap at 1
  }

  return normalizedScore;
};

/**
 * Extract key phrases from text (improved implementation)
 * Filters stop words and focuses on meaningful terms
 */
const extractKeyPhrases = (text, maxPhrases = 5) => {
  // Common stop words to filter out
  const stopWords = new Set([
    "there",
    "theres",
    "their",
    "they",
    "them",
    "these",
    "those",
    "this",
    "that",
    "what",
    "which",
    "who",
    "where",
    "when",
    "why",
    "how",
    "have",
    "has",
    "had",
    "been",
    "being",
    "are",
    "was",
    "were",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "must",
    "can",
    "cant",
    "cannot",
    "dont",
    "doesnt",
    "didnt",
    "wont",
    "is",
    "am",
    "be",
    "do",
    "does",
    "did",
    "get",
    "got",
    "go",
    "went",
    "come",
    "came",
    "see",
    "saw",
    "know",
    "knew",
    "think",
    "thought",
    "take",
    "took",
    "give",
    "gave",
    "make",
    "made",
    "say",
    "said",
    "very",
    "much",
    "many",
    "more",
    "most",
    "some",
    "any",
    "all",
    "just",
    "only",
    "also",
    "still",
    "even",
    "well",
    "now",
    "then",
    "here",
    "there",
    "where",
    "every",
    "each",
    "other",
    "another",
    "such",
    "same",
    "different",
    "new",
    "old",
    "good",
    "bad",
    "big",
    "small",
    "large",
    "long",
    "short",
    "high",
    "low",
    "right",
    "left",
    "major",
    "minor",
    "main",
    "street",
    "road",
    "avenue",
    "way",
    "near",
    "around",
    "about",
    "over",
    "under",
    "through",
    "across",
  ]);

  // Extract meaningful words (3+ characters, not stop words)
  const words = text
    .toLowerCase()
    .replace(/['"]/g, " ") // Replace quotes with space to handle contractions
    .replace(/[^\w\s]/g, " ") // Replace punctuation with space
    .split(/\s+/)
    .filter(
      (word) =>
        word.length >= 3 && // At least 3 characters
        !stopWords.has(word) && // Not a stop word
        !/^\d+$/.test(word) // Not just numbers
    );

  // Count word frequency with importance weighting
  const frequency = {};
  words.forEach((word) => {
    // Give more weight to longer, more specific words
    const weight = word.length >= 6 ? 2 : 1;
    frequency[word] = (frequency[word] || 0) + weight;
  });

  // Sort by frequency and return top phrases
  return Object.entries(frequency)
    .sort((a, b) => {
      // Sort by frequency first
      if (b[1] !== a[1]) return b[1] - a[1];
      // Then by length (prefer longer, more specific words)
      return b[0].length - a[0].length;
    })
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
  const lastPeriod = truncated.lastIndexOf(".");
  const lastExclamation = truncated.lastIndexOf("!");
  const lastQuestion = truncated.lastIndexOf("?");

  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);

  if (lastSentenceEnd > maxLength * 0.5) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }

  return truncated + "...";
};

module.exports = {
  mentionsPersonalPremises,
  calculateHazardKeywordScore,
  extractKeyPhrases,
  generateSummary,
};
