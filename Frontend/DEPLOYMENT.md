# Frontend Deployment Guide

## Netlify Configuration

Your frontend is deployed at: **https://studyassis.netlify.app/**

### Environment Variables Setup

You **MUST** set the environment variable in Netlify dashboard:

1. Go to your Netlify dashboard
2. Select your site: `studyassis`
3. Go to **Site settings** → **Environment variables**
4. Add the following variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://study-assistant-ai-6cxn.onrender.com`

5. **Important**: After adding the variable, you need to **trigger a new deploy**:
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Clear cache and deploy site**

### Why?

Vite environment variables (starting with `VITE_`) are baked into the build at build time. They are NOT available at runtime. So the environment variable must be set in Netlify before the build runs.

## Backend API

Backend is deployed at: **https://study-assistant-ai-6cxn.onrender.com**

### API Endpoints:
- Health: https://study-assistant-ai-6cxn.onrender.com/health
- Study: https://study-assistant-ai-6cxn.onrender.com/study?topic=JavaScript&mode=normal

## Testing the Integration

1. Open https://studyassis.netlify.app/
2. Enter a topic (e.g., "JavaScript")
3. Select mode (Normal or Math)
4. Click "Generate Study Material"
5. Check browser console (F12) if there are any errors

## Troubleshooting

### CORS Errors
If you see CORS errors, check that:
- Backend CORS is enabled (it should be)
- Backend is running (check https://study-assistant-ai-6cxn.onrender.com/health)

### API Connection Errors
- Verify `VITE_API_URL` is set correctly in Netlify
- Make sure you triggered a new deploy after setting the variable
- Check browser Network tab to see what URL is being called

### Environment Variable Not Working
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Trigger a new Netlify deploy with cache cleared

## Local Development

For local development, create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

Then run:
```bash
npm install
npm run dev
```

## Build Command

```bash
npm install && npm run build
```

## Publish Directory

```
dist
```

