const axios = require('axios');
const { 
  HUGGINGFACE_API, 
  CLASSIFICATION_LABELS 
} = require('../config/constants');

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
 */
const classifyComplaint = async (text) => {
  try {
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
        }
      }
    );

    let result = response.data;
    if (Array.isArray(result) && result[0]) {
      result = result[0];
    }

    // Extract best matching label
    if (result.labels && result.scores) {
      const maxIndex = result.scores.indexOf(Math.max(...result.scores));
      const category = result.labels[maxIndex];
      const categoryConfidence = result.scores[maxIndex];

      return {
        category,
        categoryConfidence
      };
    }

    // Fallback
    return {
      category: 'environmental issue',
      categoryConfidence: 0.5
    };
  } catch (error) {
    console.error('Classification error:', error.message);
    // Fallback on error
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

