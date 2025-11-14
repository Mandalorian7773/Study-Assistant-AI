/**
 * Smart Study Assistant Backend
 * Main entry point
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const studyRoutes = require('./routes/study');
const healthRoutes = require('./routes/health');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use(requestLogger);

// Routes
app.use('/health', healthRoutes);
app.use('/study', studyRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Smart Study Assistant API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      study: '/study?topic=<topic>&mode=<normal|math>',
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 Study endpoint: http://localhost:${PORT}/study?topic=<topic>&mode=<mode>`);
  
  // Warn if API key is not set
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn('⚠️  WARNING: OPENROUTER_API_KEY is not set in environment variables.');
  }
});

module.exports = app;

