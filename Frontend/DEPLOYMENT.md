# Frontend Deployment Guide

## Environment Variables

Before building for production, ensure you have the correct environment variables set:

```bash
# For production deployment
VITE_API_URL=https://study-assistant-ai-6cxn.onrender.com
```

## Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the environment variables in Vercel dashboard:
   - `VITE_API_URL` = `https://study-assistant-ai-6cxn.onrender.com`
4. Deploy!

## Netlify Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set the environment variables in Netlify dashboard:
   - `VITE_API_URL` = `https://study-assistant-ai-6cxn.onrender.com`
4. Deploy!

## Manual Build

```bash
# Install dependencies
npm install

# Set environment variables
export VITE_API_URL=https://study-assistant-ai-6cxn.onrender.com

# Build for production
npm run build
```

The built files will be in the `dist` folder, ready for deployment.