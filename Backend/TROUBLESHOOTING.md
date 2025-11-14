# Backend Troubleshooting Guide

## 502 Bad Gateway Error

If you're seeing `502 Bad Gateway` errors when calling the `/study` endpoint, follow these steps:

### Step 1: Check Render Logs

1. Go to your Render dashboard: https://dashboard.render.com/
2. Click on your service: `study-assistant-ai`
3. Go to the **Logs** tab
4. Look for recent errors - you should see detailed error messages about what's failing

### Step 2: Common Issues

#### Issue 1: OpenRouter API Key Problem

**Symptoms:**
- 502 error with message about "Invalid OpenRouter API key"
- Error in logs: `401` or `403` status

**Solution:**
1. Go to Render dashboard → Your service → Environment
2. Verify `OPENROUTER_API_KEY` is set correctly
3. Check that the key starts with `sk-or-v1-`
4. Make sure there are no extra spaces or quotes

#### Issue 2: Model Not Available

**Symptoms:**
- 502 error with message about model not being available
- Error in logs: `400 Bad Request` from OpenRouter

**Solution:**
1. The model `openai/gpt-5.1-chat` might not be available
2. Try changing `OPENROUTER_MODEL` to one of these:
   - `google/gemini-flash-1.5` (free, reliable)
   - `openai/gpt-4o-mini` (paid, fast)
   - `deepseek/deepseek-chat` (free)
   - `mistralai/mistral-7b-instruct` (free)

3. Update in Render:
   - Go to Environment variables
   - Set `OPENROUTER_MODEL=google/gemini-flash-1.5`
   - Save and wait for redeploy

#### Issue 3: Request Timeout

**Symptoms:**
- 504 Gateway Timeout (or 502 after long wait)
- Error in logs about timeout

**Solution:**
- The timeout has been increased to 60 seconds
- Some models are slower than others
- Try a faster model like `google/gemini-flash-1.5`

#### Issue 4: Rate Limiting

**Symptoms:**
- 429 status code
- Error message about rate limit

**Solution:**
- Wait a few minutes and try again
- If on free tier, consider upgrading
- Reduce request frequency

### Step 3: Verify Environment Variables

In Render dashboard, make sure these are set:

```
PORT=3000 (auto-set by Render, but verify)
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-5.1-chat (or alternative)
DEPLOYED_URL=https://study-assistant-ai-6cxn.onrender.com
NODE_ENV=production
```

### Step 4: Test the Backend Directly

Test the health endpoint:
```bash
curl https://study-assistant-ai-6cxn.onrender.com/health
```

Test the study endpoint:
```bash
curl "https://study-assistant-ai-6cxn.onrender.com/study?topic=JavaScript&mode=normal"
```

Check the response - if it's a 502, check Render logs for the actual error.

### Step 5: Check OpenRouter API Status

1. Visit https://openrouter.ai/models
2. Verify your API key has access to the model you're using
3. Check if there are any service outages

### Step 6: Test with a Simple Model

If you're having issues, temporarily switch to a simpler, free model:

1. In Render, set: `OPENROUTER_MODEL=google/gemini-flash-1.5`
2. Save and redeploy
3. Test again

### Getting More Debug Info

The backend now includes enhanced error logging. Check Render logs for:
- `OpenRouter API Error:` - Shows detailed error from OpenRouter
- `Study generation error:` - Shows errors during study generation

These logs will help identify the exact issue.

