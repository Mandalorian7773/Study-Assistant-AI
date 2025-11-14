/**
 * Gemini AI API service
 */
const axios = require('axios');

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent';

/**
 * Generates study content using Gemini AI
 * @param {string} wikiContent - Wikipedia content about the topic
 * @param {string} mode - 'normal' or 'math'
 * @returns {Promise<Object>} - Parsed AI response
 * @throws {Error} - If AI request fails
 */
async function generateStudyContent(wikiContent, mode) {
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyCTQUIv1-ibtZTQoSf6ZjLNBm-o6lxQUeM';
  const deployedUrl = process.env.DEPLOYED_URL || 'http://localhost:3000';

  // Build prompt based on mode
  let prompt = `You are an educational AI assistant. Using this topic content:

"${wikiContent}"

Generate exactly the following in JSON format:

{
  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "quiz": [
    {
      "question": "Question text here",
      "options": {
        "A": "Option A text",
        "B": "Option B text",
        "C": "Option C text",
        "D": "Option D text"
      },
      "answer": "A"
    }
  ],
  "studyTip": "A helpful study tip about this topic"`;

  if (mode === 'math') {
    prompt += `,
  "math": {
    "question": "Problem statement here",
    "answer": "Correct answer",
    "explanation": "Step-by-step explanation"
  }`;
  }

  prompt += `
}

Requirements:
- EXACTLY 3 summary bullet points
- EXACTLY 3 quiz questions
- Each quiz question must have options A, B, C, D
- Answer should be the letter (A, B, C, or D)
- Return ONLY valid JSON, no markdown, no code blocks, no explanations outside JSON`;

  try {
    const response = await axios.post(
      `${GEMINI_API_BASE}?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 60000, // 60 second timeout
      }
    );

    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      throw new Error('Invalid response from Gemini API.');
    }

    const aiResponse = response.data.candidates[0].content.parts[0].text;

    // Parse JSON response (handle markdown code blocks if present)
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON.');
      }
    }

    return parsedResponse;
  } catch (error) {
    // Enhanced error logging
    console.error('Gemini API Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    if (error.response) {
      const statusCode = error.response.status;
      const errorData = error.response.data;
      
      if (statusCode === 401 || statusCode === 403) {
        throw new Error('Invalid Gemini API key. Please check your API key configuration.');
      }
      if (statusCode === 429) {
        throw new Error('Gemini API rate limit exceeded. Please try again later.');
      }
      if (statusCode === 400) {
        const errorMsg = errorData?.error?.message || error.response.statusText;
        throw new Error(`Gemini API error: ${errorMsg}. The model might not be available or the request format is invalid.`);
      }
      if (statusCode >= 500) {
        throw new Error('Gemini API service is currently unavailable. Please try again later.');
      }
      throw new Error(`Gemini API error: ${error.response.statusText} (${statusCode})`);
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Gemini API request timeout. The request took too long to complete.');
    }
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      throw new Error('Failed to connect to Gemini API. Please check your internet connection.');
    }
    if (error.message.includes('parse') || error.message.includes('JSON')) {
      throw error;
    }
    throw new Error(`Failed to generate study content: ${error.message}`);
  }
}

/**
 * Formats AI response to match required output format
 * @param {Object} aiResponse - Raw AI response
 * @param {string} topic - Topic name
 * @param {string} mode - 'normal' or 'math'
 * @returns {Object} - Formatted response
 */
function formatStudyResponse(aiResponse, topic, mode) {
  const formatted = {
    topic,
    summary: Array.isArray(aiResponse.summary) ? aiResponse.summary : [],
    quiz: Array.isArray(aiResponse.quiz) ? aiResponse.quiz : [],
    studyTip: aiResponse.studyTip || '',
    math: null,
  };

  // Add math content if mode is math
  if (mode === 'math' && aiResponse.math) {
    formatted.math = {
      question: aiResponse.math.question || '',
      answer: aiResponse.math.answer || '',
      explanation: aiResponse.math.explanation || '',
    };
  }

  // Transform quiz format to match frontend expectations
  // Backend format: { question, options: { A, B, C, D }, answer }
  // Frontend expects: { question, options: [{ label, text }], correct }
  if (formatted.quiz && formatted.quiz.length > 0) {
    formatted.quiz = formatted.quiz.map((item) => {
      const options = item.options || { A: '', B: '', C: '', D: '' };
      const answer = item.answer || item.correct || '';
      
      // Transform options object to array
      const optionsArray = Object.entries(options).map(([label, text]) => ({
        label: label.trim(),
        text: text || '',
      }));

      return {
        question: item.question || '',
        options: optionsArray,
        correct: answer,
      };
    });
  }

  // Ensure summary has exactly 3 items
  while (formatted.summary.length < 3) {
    formatted.summary.push('');
  }
  formatted.summary = formatted.summary.slice(0, 3);

  // Ensure quiz has exactly 3 items
  while (formatted.quiz.length < 3) {
    formatted.quiz.push({
      question: '',
      options: [
        { label: 'A', text: '' },
        { label: 'B', text: '' },
        { label: 'C', text: '' },
        { label: 'D', text: '' },
      ],
      correct: '',
    });
  }
  formatted.quiz = formatted.quiz.slice(0, 3);

  // Transform math format to match frontend expectations
  // Backend format: { question, answer, explanation }
  // Frontend expects: { problem, answer, explanation }
  if (formatted.math) {
    formatted.mathProblem = {
      problem: formatted.math.question || formatted.math.problem || '',
      answer: formatted.math.answer || '',
      explanation: formatted.math.explanation || '',
    };
    delete formatted.math;
  }

  return formatted;
}

module.exports = {
  generateStudyContent,
  formatStudyResponse,
};