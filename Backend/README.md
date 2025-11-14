# Smart Study Assistant Backend

A Node.js + Express backend API that generates study materials using OpenRouter AI and Wikipedia.

## Features

- ✅ GET `/study` endpoint with topic and mode parameters
- ✅ Wikipedia integration for topic content
- ✅ OpenRouter AI integration for study material generation
- ✅ Health check endpoint
- ✅ Request logging
- ✅ Error handling middleware
- ✅ Input validation
- ✅ CORS support

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **axios** - HTTP client
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation

1. Clone the repository and navigate to the Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Edit `.env` and add your OpenRouter API key:
```
OPENROUTER_API_KEY=your_api_key_here
```

5. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in `.env`).

## API Endpoints

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

### GET /study

Generate study materials for a given topic.

**Query Parameters:**
- `topic` (required) - The topic to study
- `mode` (optional) - Study mode: `"normal"` (default) or `"math"`

**Example Request:**
```
GET /study?topic=Quantum%20Physics&mode=normal
```

**Example Response (normal mode):**
```json
{
  "topic": "Quantum Physics",
  "summary": [
    "Bullet point 1",
    "Bullet point 2",
    "Bullet point 3"
  ],
  "quiz": [
    {
      "question": "What is quantum physics?",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "answer": "A"
    }
  ],
  "studyTip": "Study tip here",
  "math": null
}
```

**Example Response (math mode):**
```json
{
  "topic": "Calculus",
  "summary": [...],
  "quiz": [...],
  "studyTip": "...",
  "math": {
    "question": "What is the derivative of x²?",
    "answer": "2x",
    "explanation": "Explanation here"
  }
}
```

**Error Responses:**

- `400` - Invalid parameters:
```json
{
  "error": "Topic is required."
}
```

- `404` - Topic not found:
```json
{
  "error": "Topic not found."
}
```

- `502` - AI service error:
```json
{
  "error": "Failed to generate study content."
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `OPENROUTER_API_KEY` | Your OpenRouter API key | (required) |
| `OPENROUTER_MODEL` | AI model to use | `google/gemini-flash-1.5` |
| `DEPLOYED_URL` | Your deployed URL | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` |

### Supported OpenRouter Models

- `google/gemini-flash-1.5` (default, free & reliable)
- `openai/gpt-4o-mini`
- `deepseek/deepseek-chat`
- `mistralai/mistral-7b-instruct`

## Deployment

### Render

1. Connect your repository to Render
2. Create a new **Web Service**
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
   - **Environment:** Node
4. Add environment variables:
   - `PORT` (Render will provide this automatically, but you can override)
   - `OPENROUTER_API_KEY` (your API key)
   - `OPENROUTER_MODEL` (optional, defaults to `google/gemini-flash-1.5`)
   - `DEPLOYED_URL` (your Render URL, e.g., `https://your-app.onrender.com`)
   - `NODE_ENV` (set to `production`)
5. Deploy!

### Railway

1. Connect your repository to Railway
2. Create a new project
3. Add a service from your repository
4. Configure environment variables in the Railway dashboard:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL` (optional)
   - `DEPLOYED_URL` (your Railway URL)
   - `NODE_ENV=production`
5. Railway will auto-detect Node.js and run `npm install` and `node src/index.js`

### Manual Deployment (VPS/Server)

1. Clone the repository on your server
2. Install Node.js and npm
3. Run `npm install`
4. Set up environment variables (use a `.env` file or export them)
5. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start src/index.js --name study-assistant
pm2 save
pm2 startup
```

## Project Structure

```
Backend/
├── src/
│   ├── index.js                 # Main entry point
│   ├── routes/
│   │   ├── study.js             # Study endpoint
│   │   └── health.js            # Health check endpoint
│   ├── services/
│   │   ├── wikipediaService.js  # Wikipedia API integration
│   │   └── openRouterService.js # OpenRouter AI integration
│   ├── utils/
│   │   ├── validation.js        # Input validation utilities
│   │   └── errorHandler.js      # Error handling utilities
│   └── middleware/
│       ├── logger.js            # Request logging middleware
│       └── errorHandler.js      # Global error handler middleware
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Error Handling

The backend includes comprehensive error handling:

- **400** - Bad Request (invalid parameters)
- **404** - Not Found (topic not found, endpoint not found)
- **500** - Internal Server Error
- **502** - Bad Gateway (AI service failure)

All errors return JSON in the format:
```json
{
  "error": "Error message here"
}
```

## Logging

All incoming requests are logged to the console with:
- Timestamp
- HTTP method
- URL
- Client IP
- Response status code

## License

MIT

