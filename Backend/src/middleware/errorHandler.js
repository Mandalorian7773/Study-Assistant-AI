/**
 * Global error handling middleware
 */
const { AppError, formatErrorResponse } = require('../utils/errorHandler');

/**
 * Error handling middleware
 */
function errorHandler(err, req, res, next) {
  // Log error
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
  });

  // Handle known operational errors
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json(formatErrorResponse(err));
  }

  // Handle axios errors
  if (err.response) {
    const statusCode = err.response.status;
    if (statusCode === 404) {
      return res.status(404).json({ error: 'Topic not found.' });
    }
    if (statusCode >= 500) {
      return res.status(502).json({ error: 'External service error.' });
    }
  }

  // Handle validation errors (from express-validator or custom)
  if (err.name === 'ValidationError') {
    return res.status(400).json(formatErrorResponse(err));
  }

  // Default to 500 for unknown errors
  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong.',
  });
}

/**
 * 404 Not Found handler
 */
function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Endpoint not found.' });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};

