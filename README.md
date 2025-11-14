# Smart Study Assistant

A full-stack application that generates personalized study materials using AI and Wikipedia.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **OpenRouter API key** ([Get one here](https://openrouter.ai/))

### Setup Instructions

#### 1. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# The .env file is already configured with your API key
# If you need to update it, edit Backend/.env

# Start the backend server
npm start
```

The backend will run on `http://localhost:3000`

#### 2. Frontend Setup

Open a **new terminal window**:

```bash
cd Frontend

# Install dependencies
npm install

# The .env file is already configured to point to localhost:3000
# If your backend runs on a different port, update Frontend/.env

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:8080`

### 🎯 Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

## 📁 Project Structure

```
study_assistant/
├── Backend/              # Node.js + Express API
│   ├── src/
│   │   ├── index.js     # Main server file
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic (Wikipedia, OpenRouter)
│   │   ├── utils/       # Validation and utilities
│   │   └── middleware/  # Error handling and logging
│   ├── .env             # Environment variables (with API key)
│   └── package.json
│
└── Frontend/            # React + TypeScript + Vite
    ├── src/
    │   ├── pages/       # Page components
    │   ├── components/  # Reusable components
    │   └── App.tsx      # Main app component
    ├── .env             # Frontend environment (API URL)
    └── package.json
```

## 🔧 Configuration

### Backend (.env)

```env
PORT=3000
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-5.1-chat
DEPLOYED_URL=http://localhost:3000
```

**Supported Models:**
- `openai/gpt-5.1` - Main model
- `openai/gpt-5.1-chat` - Faster chat version (default)
- `openai/gpt-5.1-codex` - Coding-specialized version
- `google/gemini-flash-1.5` - Free alternative

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## 📡 API Endpoints

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45
}
```

### GET /study?topic={topic}&mode={mode}

Generate study materials for a topic.

**Query Parameters:**
- `topic` (required) - The topic to study
- `mode` (optional) - `"normal"` or `"math"` (default: `"normal"`)

**Example:**
```
GET /study?topic=Quantum%20Physics&mode=normal
```

**Response:**
```json
{
  "topic": "Quantum Physics",
  "summary": ["point 1", "point 2", "point 3"],
  "quiz": [
    {
      "question": "What is...?",
      "options": [
        { "label": "A", "text": "Option A" },
        { "label": "B", "text": "Option B" },
        { "label": "C", "text": "Option C" },
        { "label": "D", "text": "Option D" }
      ],
      "correct": "A"
    }
  ],
  "studyTip": "Helpful tip...",
  "mathProblem": {
    "problem": "Problem statement",
    "answer": "Answer",
    "explanation": "Explanation"
  }
}
```

## 🧪 Testing

### Test Backend

```bash
# Health check
curl http://localhost:3000/health

# Study endpoint
curl "http://localhost:3000/study?topic=JavaScript&mode=normal"
```

### Test Frontend

1. Start both servers (backend on :3000, frontend on :8080)
2. Open `http://localhost:8080` in your browser
3. Enter a topic (e.g., "Quantum Physics")
4. Select mode (Normal or Math)
5. Click "Generate Study Material"

## 🔒 Security Notes

- **Never commit** `.env` files to git
- Your `.env` files are already in `.gitignore`
- Keep your OpenRouter API key secure
- For production, use environment variables provided by your hosting platform

## 🚢 Deployment

### Backend Deployment (Render/Railway)

1. Push your code to GitHub
2. Connect to Render/Railway
3. Set environment variables:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL` (optional)
   - `DEPLOYED_URL` (your deployed backend URL)
   - `PORT` (usually auto-set by platform)
4. Build command: `npm install`
5. Start command: `node src/index.js`

### Frontend Deployment (Vercel/Netlify)

1. Push your code to GitHub
2. Connect to Vercel/Netlify
3. Set environment variable:
   - `VITE_API_URL` (your deployed backend URL)
4. Build command: `npm run build`
5. Output directory: `dist`

**Important:** Update `VITE_API_URL` to point to your deployed backend URL.

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3000 is available
- Verify `.env` file exists and has `OPENROUTER_API_KEY`
- Run `npm install` to ensure dependencies are installed

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check `Frontend/.env` has correct `VITE_API_URL`
- Check browser console for CORS errors
- Ensure backend CORS is enabled (it is by default)

### API errors
- Verify OpenRouter API key is valid
- Check API key has sufficient credits
- Check backend logs for detailed error messages

## 📝 Features

✅ AI-powered study material generation  
✅ Wikipedia integration for topic content  
✅ Multiple choice quiz generation  
✅ Study tips  
✅ Math mode with problem-solving  
✅ Recent topics history  
✅ Dark/Light theme support  
✅ Responsive design  
✅ Error handling  
✅ Request logging  

## 📄 License

MIT

