const fs = require('fs');
const csv = require('csv-parser');
const Complaint = require('../models/Complaint');
const { processNLP } = require('./nlpService');
const { processUrgency, calculateUrgencyScore } = require('./urgencyService');
const { assignAuthority } = require('./authorityService');
const { extractKeyPhrases, generateSummary } = require('../utils/textProcessing');
const { TRUST_SCORES } = require('../config/constants');

/**
 * CSV Ingestion Service
 * Processes CSV files and creates complaints
 */

/**
 * Process CSV file and create complaints
 */
const processCSVFile = async (filePath) => {
  const results = {
    processedCount: 0,
    urgentCount: 0,
    categorySummary: {},
    errors: []
  };

  return new Promise((resolve, reject) => {
    const complaints = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          // Extract data from CSV row
          const text = row.text || row.description || row.complaint || '';
          const location = row.location || 'Unknown Location';
          const timestamp = row.timestamp ? new Date(row.timestamp) : new Date();

          if (!text) {
            results.errors.push({
              row: results.processedCount + 1,
              error: 'Missing required field: text/description/complaint'
            });
            return;
          }

          // Process NLP
          const nlpResults = await processNLP(text);

          // Process urgency
          const urgencyData = processUrgency(text, true); // CSV entries are anonymous
          const urgencyScore = calculateUrgencyScore({
            sentimentScore: nlpResults.sentimentScore,
            categoryConfidence: nlpResults.categoryConfidence,
            hazardKeywordScore: urgencyData.hazardKeywordScore,
            trustScore: urgencyData.trustScore
          });

          // Assign authority
          const assignedAuthority = assignAuthority(nlpResults.category);

          // Generate summary and key phrases
          const summary = generateSummary(text);
          const keyPhrases = extractKeyPhrases(text);

          // Track category
          const category = nlpResults.category || 'environmental issue';
          results.categorySummary[category] = (results.categorySummary[category] || 0) + 1;

          // Track urgency
          if (urgencyScore >= 0.7) {
            results.urgentCount++;
          }

          // Prepare complaint data
          complaints.push({
            anonymous: true,
            description: text,
            location: location,
            category: category,
            sentiment: nlpResults.sentiment,
            sentimentScore: nlpResults.sentimentScore,
            categoryConfidence: nlpResults.categoryConfidence,
            summary: summary,
            keyPhrases: keyPhrases,
            hazardKeywordScore: urgencyData.hazardKeywordScore,
            urgencyScore: urgencyScore,
            trustScore: TRUST_SCORES.ANONYMOUS,
            assignedAuthority: assignedAuthority,
            status: 'pending',
            notes: [],
            submittedAt: timestamp,
            updatedAt: timestamp
          });

          results.processedCount++;
        } catch (error) {
          results.errors.push({
            row: results.processedCount + 1,
            error: error.message
          });
        }
      })
      .on('end', async () => {
        try {
          // Bulk insert complaints
          if (complaints.length > 0) {
            await Complaint.insertMany(complaints);
          }
          
          // Clean up file
          fs.unlinkSync(filePath);
          
          resolve(results);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = {
  processCSVFile
};

