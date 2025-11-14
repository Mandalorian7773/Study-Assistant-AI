/**
 * Health check route
 */
const express = require('express');
const router = express.Router();

/**
 * GET /health
 * Returns server health status
 */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;

