const { PERSONAL_PREMISES_KEYWORDS, HAZARD_KEYWORDS, CATEGORY_KEYWORDS } = require('../config/constants');

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
 * Calculate hazard keyword score (weighted by severity)
 */
const calculateHazardKeywordScore = (text) => {
  const lowerText = text.toLowerCase();
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Check critical keywords (weight: 3)
  if (HAZARD_KEYWORDS.critical) {
    HAZARD_KEYWORDS.critical.forEach(keyword => {
      maxPossibleScore += 3;
      if (lowerText.includes(keyword.toLowerCase())) {
        totalScore += 3;
      }
    });
  }
  
  // Check high urgency keywords (weight: 2)
  if (HAZARD_KEYWORDS.high) {
    HAZARD_KEYWORDS.high.forEach(keyword => {
      maxPossibleScore += 2;
      if (lowerText.includes(keyword.toLowerCase())) {
        totalScore += 2;
      }
    });
  }
  
  // Check medium urgency keywords (weight: 1)
  if (HAZARD_KEYWORDS.medium) {
    HAZARD_KEYWORDS.medium.forEach(keyword => {
      maxPossibleScore += 1;
      if (lowerText.includes(keyword.toLowerCase())) {
        totalScore += 1;
      }
    });
  }
  
  // Normalize to 0-1 scale, but boost score for critical keywords
  const normalizedScore = maxPossibleScore > 0 
    ? Math.min(totalScore / maxPossibleScore, 1)
    : 0;
  
  // Boost score if critical keywords are present
  const hasCritical = HAZARD_KEYWORDS.critical?.some(keyword => 
    lowerText.includes(keyword.toLowerCase())
  );
  
  if (hasCritical) {
    return Math.min(normalizedScore * 1.3, 1); // Boost by 30%, cap at 1
  }
  
  return normalizedScore;
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

/**
 * Detect category based on keywords (primary method for accuracy)
 * Uses weighted keyword matching with priority system
 * Returns category and confidence score
 */
const detectCategoryByKeywords = (text) => {
  const lowerText = text.toLowerCase();
  const categoryScores = {};
  
  // Count weighted keyword matches for each category
  Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywordGroups]) => {
    let totalScore = 0;
    let matchCount = 0;
    
    // Check high priority keywords (weight: 3)
    if (keywordGroups.high) {
      keywordGroups.high.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
          totalScore += 3;
          matchCount++;
        }
      });
    }
    
    // Check medium priority keywords (weight: 2)
    if (keywordGroups.medium) {
      keywordGroups.medium.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
          totalScore += 2;
          matchCount++;
        }
      });
    }
    
    // Check low priority keywords (weight: 1) - only if no high/medium matches
    if (matchCount === 0 && keywordGroups.low) {
      keywordGroups.low.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
          totalScore += 1;
          matchCount++;
        }
      });
    }
    
    if (totalScore > 0) {
      categoryScores[category] = { score: totalScore, matches: matchCount };
    }
  });
  
  // If no matches found, return null
  if (Object.keys(categoryScores).length === 0) {
    return { category: null, confidence: 0 };
  }
  
  // Find category with highest weighted score
  const bestCategory = Object.entries(categoryScores)
    .sort((a, b) => b[1].score - a[1].score)[0][0];
  
  const bestScore = categoryScores[bestCategory];
  
  // Special rule: If specific domain keywords (water, electricity, road, garbage) are present,
  // they should take precedence over generic safety/environmental keywords
  const specificDomains = ["water issue", "electricity issue", "road issue", "garbage issue"];
  const genericDomains = ["safety hazard", "environmental issue"];
  
  if (specificDomains.includes(bestCategory)) {
    // Check if a generic domain has a high score too
    genericDomains.forEach(genericCategory => {
      if (categoryScores[genericCategory] && categoryScores[genericCategory].score > 0) {
        // If specific domain has at least 2 points, it wins
        if (bestScore.score >= 2) {
          // Specific domain wins
        } else {
          // If specific domain score is too low, check if generic has higher score
          if (categoryScores[genericCategory].score > bestScore.score) {
            // Generic wins, but with lower confidence
            const finalCategory = genericCategory;
            const finalScore = categoryScores[finalCategory];
            const maxPossibleScore = 3 * (CATEGORY_KEYWORDS[finalCategory].high?.length || 0) +
                                    2 * (CATEGORY_KEYWORDS[finalCategory].medium?.length || 0);
            const confidence = Math.min(finalScore.score / Math.max(maxPossibleScore, 10), 1);
            
            return {
              category: finalCategory,
              confidence: Math.max(confidence, 0.6)
            };
          }
        }
      }
    });
  }
  
  // Calculate confidence based on weighted score
  const maxPossibleScore = 3 * (CATEGORY_KEYWORDS[bestCategory].high?.length || 0) +
                          2 * (CATEGORY_KEYWORDS[bestCategory].medium?.length || 0) +
                          1 * (CATEGORY_KEYWORDS[bestCategory].low?.length || 0);
  const confidence = Math.min(bestScore.score / Math.max(maxPossibleScore, 10), 1);
  
  return {
    category: bestCategory,
    confidence: Math.max(confidence, 0.7) // Minimum 70% confidence for keyword matches
  };
};

module.exports = {
  mentionsPersonalPremises,
  calculateHazardKeywordScore,
  extractKeyPhrases,
  generateSummary,
  detectCategoryByKeywords
};

