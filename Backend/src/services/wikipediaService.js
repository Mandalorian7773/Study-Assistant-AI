/**
 * Wikipedia API service
 */
const axios = require('axios');

const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/api/rest_v1/page/summary';

/**
 * Fetches topic content from Wikipedia
 * @param {string} topic - Topic to search for
 * @returns {Promise<Object>} - { title: string, extract: string }
 * @throws {Error} - If topic not found
 */
async function fetchTopicContent(topic) {
  try {
    const encodedTopic = encodeURIComponent(topic.trim());
    const url = `${WIKIPEDIA_API_BASE}/${encodedTopic}`;

    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'Smart Study Assistant (https://github.com)',
      },
    });

    if (!response.data || !response.data.title || !response.data.extract) {
      throw new Error('Topic not found.');
    }

    return {
      title: response.data.title,
      extract: response.data.extract,
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Topic not found.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Wikipedia API request timeout.');
    }
    throw new Error('Failed to fetch topic from Wikipedia.');
  }
}

module.exports = {
  fetchTopicContent,
};

