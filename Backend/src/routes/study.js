/**
 * Study route handler
 */
const express = require('express');
const router = express.Router();
const { validateTopic, validateMode } = require('../utils/validation');
const { AppError } = require('../utils/errorHandler');
const { fetchTopicContent } = require('../services/wikipediaService');
const {
  generateStudyContent,
  formatStudyResponse,
} = require('../services/openRouterService');

/**
 * GET /study
 * Query params: topic (required), mode (optional: 'normal' or 'math')
 */
router.get('/', async (req, res, next) => {
  try {
    const { topic, mode } = req.query;

    // Validate topic
    const topicValidation = validateTopic(topic);
    if (!topicValidation.valid) {
      throw new AppError(topicValidation.error, 400);
    }

    // Validate mode
    const modeValidation = validateMode(mode);
    if (!modeValidation.valid) {
      throw new AppError(modeValidation.error, 400);
    }

    const validatedMode = modeValidation.mode;
    const validatedTopic = topic.trim();

    // Fetch topic content from Wikipedia
    let wikiContent;
    try {
      const wikiData = await fetchTopicContent(validatedTopic);
      wikiContent = `${wikiData.title}\n\n${wikiData.extract}`;
    } catch (wikiError) {
      if (wikiError.message === 'Topic not found.') {
        throw new AppError('Topic not found.', 404);
      }
      throw new AppError('Failed to fetch topic information.', 500);
    }

    // Generate study content using OpenRouter AI
    let aiResponse;
    try {
      aiResponse = await generateStudyContent(wikiContent, validatedMode);
    } catch (aiError) {
      // Handle AI service errors
      if (
        aiError.message.includes('API key') ||
        aiError.message.includes('rate limit')
      ) {
        throw new AppError(aiError.message, 502);
      }
      throw new AppError('Failed to generate study content.', 502);
    }

    // Format and return response
    const formattedResponse = formatStudyResponse(
      aiResponse,
      validatedTopic,
      validatedMode
    );

    res.json(formattedResponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

