# 🔧 Netlify Environment Variable Setup

## Quick Fix for "API URL not configured" Error

Your app is showing an error because the `VITE_API_URL` environment variable is not set in Netlify. Follow these steps:

### Step 1: Go to Netlify Dashboard
1. Visit https://app.netlify.com/
2. Log in to your account
3. Click on your site: **studyassis**

### Step 2: Add Environment Variable
1. Click on **Site settings** (in the top navigation)
2. Scroll down and click **Environment variables** (under Build & deploy)
3. Click **Add a variable**
4. Enter:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://study-assistant-ai-6cxn.onrender.com`
5. Click **Save**

### Step 3: Trigger New Deploy
1. Go to the **Deploys** tab (in the top navigation)
2. Click **Trigger deploy** dropdown
3. Select **Clear cache and deploy site**
4. Wait for the build to complete (usually 2-3 minutes)

### Step 4: Verify
1. Once the deploy is complete, visit: https://studyassis.netlify.app/
2. The error should be gone
3. Try entering a topic (e.g., "JavaScript") and click "Generate Study Material"

## Why This Is Needed

Vite environment variables (starting with `VITE_`) are **baked into the build** at build time. They are NOT available at runtime. This means:

- ✅ You must set the variable **before** the build runs
- ✅ After setting it, you **must trigger a new deploy** for it to take effect
- ❌ You cannot set it after the build is complete

## Alternative: Set via Netlify CLI

If you have Netlify CLI installed:

```bash
cd Frontend
netlify env:set VITE_API_URL "https://study-assistant-ai-6cxn.onrender.com"
netlify deploy --prod
```

## Troubleshooting

**Still seeing the error after deploy?**
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check the Deploys tab to ensure the build completed successfully
- Check the build logs to verify the environment variable was used

**Check Build Logs:**
1. Go to Deploys tab
2. Click on the latest deploy
3. Click "View build logs"
4. Search for `VITE_API_URL` - it should show the value being used

**Verify Environment Variable:**
1. Site settings → Environment variables
2. Make sure `VITE_API_URL` is listed with the correct value
3. Make sure it's set for "All scopes" or "Production"

