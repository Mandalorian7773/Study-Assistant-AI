/**
 * Error handling utilities
 */

/**
 * Custom error class for application errors
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error response formatter
 * @param {Error} err - Error object
 * @returns {Object} - Formatted error response
 */
function formatErrorResponse(err) {
  return {
    error: err.message || 'Something went wrong.',
  };
}

module.exports = {
  AppError,
  formatErrorResponse,
};

