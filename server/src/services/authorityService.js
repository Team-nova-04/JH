const { AUTHORITY_MAPPING } = require('../config/constants');

/**
 * Authority Assignment Service
 * Maps complaint categories to appropriate authorities
 */

/**
 * Assign authority based on complaint category
 */
const assignAuthority = (category) => {
  // Normalize category to lowercase for matching
  const normalizedCategory = category?.toLowerCase() || '';
  
  // Direct mapping
  if (AUTHORITY_MAPPING[normalizedCategory]) {
    return AUTHORITY_MAPPING[normalizedCategory];
  }

  // Fallback: check if category contains keywords
  for (const [key, authority] of Object.entries(AUTHORITY_MAPPING)) {
    if (normalizedCategory.includes(key)) {
      return authority;
    }
  }

  // Default fallback
  return 'municipal_council';
};

module.exports = {
  assignAuthority
};

