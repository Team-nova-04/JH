const { HfInference } = require("@huggingface/inference");
const {
  HUGGINGFACE_API,
  CLASSIFICATION_LABELS,
} = require("../config/constants");

/**
 * NLP Service
 * Handles all HuggingFace API calls for sentiment analysis and classification
 * Using official HuggingFace inference client
 */

// Initialize HuggingFace client
const hf = process.env.HUGGINGFACE_API_KEY
  ? new HfInference(process.env.HUGGINGFACE_API_KEY)
  : null;

/**
 * Perform sentiment analysis using HuggingFace API
 * Uses official HuggingFace inference client
 */
const analyzeSentiment = async (text) => {
  try {
    // Check if API key exists
    if (!hf) {
      console.log("HUGGINGFACE_API_KEY not set, using fallback sentiment");
      return {
        sentiment: "neutral",
        sentimentScore: 0.5,
      };
    }

    const result = await hf.textClassification({
      model: HUGGINGFACE_API.SENTIMENT_MODEL,
      inputs: text,
    });

    // Handle model loading
    if (Array.isArray(result) && result[0] && result[0].error) {
      if (result[0].error.includes("loading")) {
        console.log("Model is loading, waiting 10 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        // Retry once
        const retryResult = await hf.textClassification({
          model: HUGGINGFACE_API.SENTIMENT_MODEL,
          inputs: text,
        });
        return processSentimentResult(retryResult);
      }
    }

    return processSentimentResult(result);
  } catch (error) {
    console.error("Sentiment analysis error:", error.message);
    // Fallback on error
    return {
      sentiment: "neutral",
      sentimentScore: 0.5,
    };
  }
};

/**
 * Process sentiment classification result
 */
const processSentimentResult = (result) => {
  if (!Array.isArray(result) || result.length === 0) {
    return {
      sentiment: "neutral",
      sentimentScore: 0.5,
    };
  }

  // nlptown/bert-base-multilingual-uncased-sentiment returns: [{"label": "1 star", "score": 0.1}, ...]
  // Labels: "1 star" (negative), "2 star", "3 star" (neutral), "4 star", "5 star" (positive)
  const oneStar = result.find((r) => r.label === "1 star");
  const twoStar = result.find((r) => r.label === "2 star");
  const threeStar = result.find((r) => r.label === "3 star");
  const fourStar = result.find((r) => r.label === "4 star");
  const fiveStar = result.find((r) => r.label === "5 star");

  // Calculate weighted sentiment
  const negativeScore = (oneStar?.score || 0) + (twoStar?.score || 0) * 0.5;
  const positiveScore = (fiveStar?.score || 0) + (fourStar?.score || 0) * 0.5;
  const neutralScore = threeStar?.score || 0;

  if (negativeScore > positiveScore && negativeScore > neutralScore) {
    return {
      sentiment: "negative",
      sentimentScore: negativeScore,
    };
  } else if (positiveScore > neutralScore) {
    return {
      sentiment: "positive",
      sentimentScore: positiveScore,
    };
  } else {
    return {
      sentiment: "neutral",
      sentimentScore: neutralScore || 0.5,
    };
  }
};

/**
 * Perform zero-shot classification using HuggingFace API
 * AI-only approach: No keyword fallback - returns error if AI can't detect category
 */
const classifyComplaint = async (text) => {
  try {
    // Check if API key exists
    if (!hf) {
      console.log("HUGGINGFACE_API_KEY not set");
      return {
        category: null,
        categoryConfidence: 0,
        error: true,
        message:
          "AI service not configured. Please select a category manually.",
      };
    }

    const result = await hf.zeroShotClassification({
      model: HUGGINGFACE_API.CLASSIFICATION_MODEL,
      inputs: text,
      parameters: {
        candidate_labels: CLASSIFICATION_LABELS,
      },
    });

    // Debug: Log the result structure
    console.log(
      "Classification result type:",
      typeof result,
      "Is array:",
      Array.isArray(result)
    );
    if (result) {
      console.log("Result keys:", Object.keys(result));
      if (Array.isArray(result) && result[0]) {
        console.log("First element keys:", Object.keys(result[0]));
      }
    }

    // Handle model loading
    if (Array.isArray(result) && result[0] && result[0].error) {
      if (result[0].error.includes("loading")) {
        console.log("Model is loading, waiting 10 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        // Retry once
        const retryResult = await hf.zeroShotClassification({
          model: HUGGINGFACE_API.CLASSIFICATION_MODEL,
          inputs: text,
          parameters: {
            candidate_labels: CLASSIFICATION_LABELS,
          },
        });
        return processClassificationResult(retryResult);
      }
    }

    return processClassificationResult(result);
  } catch (error) {
    console.error("AI classification error:", error.message);
    return {
      category: null,
      categoryConfidence: 0,
      error: true,
      message:
        "AI service temporarily unavailable. Please try again or select a category manually.",
    };
  }
};

/**
 * Process classification result
 * Handles different response formats from HuggingFace client
 */
const processClassificationResult = (result) => {
  // Debug logging
  console.log(
    "Processing classification result:",
    JSON.stringify(result).substring(0, 300)
  );

  // Handle empty result
  if (!result) {
    console.log("AI returned null/undefined");
    return {
      category: null,
      categoryConfidence: 0,
      error: true,
      message:
        "Could not determine category. Please re-enter your problem with more details or select a category manually.",
    };
  }

  // Format 1: Array of { label: "...", score: ... } (most common from HuggingFace client)
  if (Array.isArray(result)) {
    if (result.length === 0) {
      console.log("AI returned empty array");
      return {
        category: null,
        categoryConfidence: 0,
        error: true,
        message:
          "Could not determine category. Please re-enter your problem with more details or select a category manually.",
      };
    }

    // Check if first element has error
    if (result[0] && result[0].error) {
      console.log("AI returned error:", result[0].error);
      return {
        category: null,
        categoryConfidence: 0,
        error: true,
        message:
          "AI service temporarily unavailable. Please select a category manually.",
      };
    }

    // Check if it's array of {label, score} objects
    const firstItem = result[0];
    if (firstItem && firstItem.label && typeof firstItem.score === "number") {
      // Sort by score descending to get best match
      const sorted = [...result].sort((a, b) => b.score - a.score);
      const best = sorted[0];

      const secondBest = sorted[1] || { score: 0, label: "none" };

      console.log(
        `Best category match: ${best.label} (confidence: ${best.score.toFixed(
          2
        )})`
      );
      console.log(
        `Second best: ${secondBest.label} (confidence: ${
          secondBest.score?.toFixed(2) || 0
        })`
      );

      // Use the best match if:
      // 1. It has >= 0.5 confidence (high confidence), OR
      // 2. It's the highest score and >= 0.3 (reasonable confidence)
      const scoreDifference = best.score - (secondBest.score || 0);

      if (best.score >= 0.5 || (best.score >= 0.3 && scoreDifference > 0)) {
        console.log(
          `Category detected by AI: ${
            best.label
          } (confidence: ${best.score.toFixed(2)})`
        );
        return {
          category: best.label,
          categoryConfidence: best.score,
        };
      } else {
        // AI confidence too low and not a clear winner - return error
        console.log(
          `AI confidence too low: ${best.score.toFixed(2)}. Best match was: ${
            best.label
          }, but difference from second best is only ${scoreDifference.toFixed(
            2
          )}`
        );
        return {
          category: null,
          categoryConfidence: best.score,
          error: true,
          message:
            "Could not determine category. Please re-enter your problem with more details or select a category manually.",
        };
      }
    }
  }

  // Format 2: { labels: [...], scores: [...] } (alternative format)
  if (result.labels && result.scores) {
    const maxIndex = result.scores.indexOf(Math.max(...result.scores));
    const aiCategory = result.labels[maxIndex];
    const aiConfidence = result.scores[maxIndex];

    // Require minimum confidence threshold (0.5 = 50%)
    if (aiConfidence >= 0.5) {
      console.log(
        `Category detected by AI: ${aiCategory} (confidence: ${aiConfidence.toFixed(
          2
        )})`
      );
      return {
        category: aiCategory,
        categoryConfidence: aiConfidence,
      };
    } else {
      // AI confidence too low - return error
      console.log(`AI confidence too low: ${aiConfidence.toFixed(2)}`);
      return {
        category: null,
        categoryConfidence: aiConfidence,
        error: true,
        message:
          "Could not determine category. Please re-enter your problem with more details or select a category manually.",
      };
    }
  }

  // AI didn't return valid results
  console.log(
    "AI returned invalid results. Result type:",
    typeof result,
    "Is array:",
    Array.isArray(result),
    "Keys:",
    Object.keys(result || {})
  );
  return {
    category: null,
    categoryConfidence: 0,
    error: true,
    message:
      "Could not determine category. Please re-enter your problem with more details or select a category manually.",
  };
};

/**
 * Validate urgency using HuggingFace API (optional enhancement)
 * Hybrid approach: Used to validate/boost calculated urgency, not as primary method
 * Returns AI urgency suggestion for validation purposes
 */
const validateUrgencyWithAI = async (text) => {
  try {
    // Skip if no API key
    if (!hf) {
      return null;
    }

    const result = await hf.zeroShotClassification({
      model: HUGGINGFACE_API.CLASSIFICATION_MODEL,
      inputs: text,
      parameters: {
        candidate_labels: [
          "critical urgency - life threatening emergency requiring immediate response",
          "urgent - serious problem requiring prompt attention",
          "normal - standard issue that can be addressed in regular timeframe",
        ],
      },
    });

    // If model is loading, skip AI validation (not critical)
    if (Array.isArray(result) && result[0] && result[0].error) {
      if (result[0].error.includes("loading")) {
        console.log("AI urgency validation skipped (model loading)");
        return null;
      }
    }

    // Handle array result
    let processedResult = result;
    if (Array.isArray(result) && result[0] && !result[0].error) {
      processedResult = result[0];
    }

    if (processedResult.labels && processedResult.scores) {
      const maxIndex = processedResult.scores.indexOf(
        Math.max(...processedResult.scores)
      );
      const urgencyLabel = processedResult.labels[maxIndex];
      const urgencyConfidence = processedResult.scores[maxIndex];

      // Map AI label to urgency level
      let aiUrgencyLevel = "normal";
      if (urgencyLabel.includes("critical")) {
        aiUrgencyLevel = "critical";
      } else if (urgencyLabel.includes("urgent")) {
        aiUrgencyLevel = "urgent";
      }

      return {
        urgencyLevel: aiUrgencyLevel,
        confidence: urgencyConfidence,
      };
    }

    return null;
  } catch (error) {
    // Silently fail - AI validation is optional
    console.log("AI urgency validation failed (optional):", error.message);
    return null;
  }
};

/**
 * Process full NLP pipeline for a complaint
 * Note: Urgency is calculated separately using hybrid approach (logic + optional AI validation)
 */
const processNLP = async (description) => {
  try {
    // Run sentiment and classification in parallel (urgency handled separately in controller)
    const [sentimentResult, classificationResult] = await Promise.all([
      analyzeSentiment(description),
      classifyComplaint(description),
    ]);

    return {
      ...sentimentResult,
      ...classificationResult,
    };
  } catch (error) {
    console.error("NLP processing error:", error.message);
    return {
      sentiment: "neutral",
      sentimentScore: 0.5,
      category: null,
      categoryConfidence: 0,
      error: true,
      message: "AI processing failed. Please try again.",
    };
  }
};

module.exports = {
  analyzeSentiment,
  classifyComplaint,
  validateUrgencyWithAI,
  processNLP,
};
