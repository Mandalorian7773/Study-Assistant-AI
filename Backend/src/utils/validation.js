/**
 * Validation utilities for request parameters
 */

/**
 * Validates topic parameter
 * @param {string} topic - Topic to validate
 * @returns {Object} - { valid: boolean, error?: string }
 */
function validateTopic(topic) {
  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    return { valid: false, error: 'Topic is required.' };
  }
  return { valid: true };
}

/**
 * Validates mode parameter
 * @param {string} mode - Mode to validate
 * @returns {Object} - { valid: boolean, error?: string, mode?: string }
 */
function validateMode(mode) {
  if (!mode) {
    return { valid: true, mode: 'normal' }; // Default mode
  }

  const normalizedMode = mode.toLowerCase().trim();
  if (normalizedMode !== 'normal' && normalizedMode !== 'math') {
    return { valid: false, error: "Mode must be 'normal' or 'math'." };
  }

  return { valid: true, mode: normalizedMode };
}

module.exports = {
  validateTopic,
  validateMode,
};

