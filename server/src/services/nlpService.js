const axios = require('axios');
const { 
  HUGGINGFACE_API, 
  CLASSIFICATION_LABELS 
} = require('../config/constants');
const { detectCategoryByKeywords } = require('../utils/textProcessing');

/**
 * NLP Service
 * Handles all HuggingFace API calls for sentiment analysis and classification
 */

/**
 * Perform sentiment analysis using HuggingFace API
 */
const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(
      `${HUGGINGFACE_API.BASE_URL}/${HUGGINGFACE_API.SENTIMENT_MODEL}`,
      { inputs: text },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Handle response format
    let result = response.data;
    if (Array.isArray(result) && result[0]) {
      result = result[0];
    }

    // Extract sentiment and score
    if (Array.isArray(result)) {
      const positive = result.find(r => r.label === 'POSITIVE');
      const negative = result.find(r => r.label === 'NEGATIVE');
      
      if (positive && negative) {
        const sentiment = positive.score > negative.score ? 'positive' : 'negative';
        const sentimentScore = sentiment === 'positive' ? positive.score : negative.score;
        return { sentiment, sentimentScore };
      }
    }

    // Fallback
    return {
      sentiment: 'neutral',
      sentimentScore: 0.5
    };
  } catch (error) {
    console.error('Sentiment analysis error:', error.message);
    // Fallback on error
    return {
      sentiment: 'neutral',
      sentimentScore: 0.5
    };
  }
};

/**
 * Perform zero-shot classification using HuggingFace API
 * Uses hybrid approach: keywords first, then AI validation
 */
const classifyComplaint = async (text) => {
  try {
    // Step 1: Try keyword-based detection first (more accurate)
    const keywordResult = detectCategoryByKeywords(text);
    
    // If keyword detection found a category with good confidence, use it
    if (keywordResult.category && keywordResult.confidence >= 0.7) {
      console.log(`Category detected by keywords: ${keywordResult.category} (confidence: ${keywordResult.confidence.toFixed(2)})`);
      return {
        category: keywordResult.category,
        categoryConfidence: keywordResult.confidence
      };
    }

    // Step 2: Use AI classification as fallback or validation
    const response = await axios.post(
      `${HUGGINGFACE_API.BASE_URL}/${HUGGINGFACE_API.CLASSIFICATION_MODEL}`,
      {
        inputs: text,
        parameters: {
          candidate_labels: CLASSIFICATION_LABELS
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      }
    );

    let result = response.data;
    if (Array.isArray(result) && result[0]) {
      result = result[0];
    }

    // Extract best matching label
    if (result.labels && result.scores) {
      const maxIndex = result.scores.indexOf(Math.max(...result.scores));
      let aiCategory = result.labels[maxIndex];
      let aiConfidence = result.scores[maxIndex];

      // Map AI label back to our category format
      // AI labels are descriptive, extract the base category
      const categoryMapping = {
        "water supply issue or water leak or water pipe problem": "water issue",
        "electricity power outage or electrical fault or power issue": "electricity issue",
        "road pothole or road damage or road maintenance": "road issue",
        "garbage collection or waste management or trash disposal": "garbage issue",
        "safety hazard or security threat or emergency situation": "safety hazard",
        "environmental pollution or air quality or noise pollution": "environmental issue"
      };

      const mappedCategory = categoryMapping[aiCategory] || aiCategory;

      // Step 3: Validate AI result with keywords
      // If keyword detection found something but with lower confidence, check if AI agrees
      if (keywordResult.category && keywordResult.confidence >= 0.5) {
        // If both methods agree, use keyword result (more reliable)
        if (mappedCategory === keywordResult.category) {
          console.log(`AI and keywords agree: ${mappedCategory}`);
          return {
            category: keywordResult.category,
            categoryConfidence: Math.max(aiConfidence, keywordResult.confidence)
          };
        }
        // If they disagree and keyword confidence is decent, prefer keywords
        if (keywordResult.confidence >= 0.6) {
          console.log(`Using keyword result over AI (keywords: ${keywordResult.category}, AI: ${mappedCategory})`);
          return {
            category: keywordResult.category,
            categoryConfidence: keywordResult.confidence
          };
        }
      }

      // Use AI result if confidence is good
      if (aiConfidence >= 0.5) {
        console.log(`Category detected by AI: ${mappedCategory} (confidence: ${aiConfidence.toFixed(2)})`);
        return {
          category: mappedCategory,
          categoryConfidence: aiConfidence
        };
      }
    }

    // Step 4: Final fallback - use keyword result even if low confidence
    if (keywordResult.category) {
      console.log(`Using keyword result as fallback: ${keywordResult.category}`);
      return {
        category: keywordResult.category,
        categoryConfidence: keywordResult.confidence
      };
    }

    // Last resort fallback
    console.log('No category detected, using default: environmental issue');
    return {
      category: 'environmental issue',
      categoryConfidence: 0.5
    };
  } catch (error) {
    console.error('Classification error:', error.message);
    
    // On error, try keyword detection as fallback
    const keywordResult = detectCategoryByKeywords(text);
    if (keywordResult.category) {
      console.log(`Using keyword detection after AI error: ${keywordResult.category}`);
      return {
        category: keywordResult.category,
        categoryConfidence: keywordResult.confidence
      };
    }
    
    // Final fallback on error
    return {
      category: 'environmental issue',
      categoryConfidence: 0.5
    };
  }
};

/**
 * Process full NLP pipeline for a complaint
 */
const processNLP = async (description) => {
  try {
    // Run sentiment and classification in parallel
    const [sentimentResult, classificationResult] = await Promise.all([
      analyzeSentiment(description),
      classifyComplaint(description)
    ]);

    return {
      ...sentimentResult,
      ...classificationResult
    };
  } catch (error) {
    console.error('NLP processing error:', error.message);
    return {
      sentiment: 'neutral',
      sentimentScore: 0.5,
      category: 'environmental issue',
      categoryConfidence: 0.5
    };
  }
};

module.exports = {
  analyzeSentiment,
  classifyComplaint,
  processNLP
};

