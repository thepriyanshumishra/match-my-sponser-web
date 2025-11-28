# 🔧 Troubleshooting Guide for Vercel Deployment

## Common Issues and Solutions

### Issue 1: Login/Signup Pages Show Errors

**Symptoms:**
- Login page shows "Application error: a client-side exception has occurred"
- Signup page doesn't work
- Console shows hydration errors

**Root Causes:**
1. **Missing Supabase Environment Variables**
2. **Hydration Mismatches**
3. **Z-index layering issues**

**Solutions:**

#### Step 1: Check Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify these variables exist:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

4. If missing, add them:
   - **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Your Supabase anon/public key

5. After adding variables, **redeploy** your project

#### Step 2: Verify Supabase Setup

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run the schema from `SUPABASE_SCHEMA.sql`
4. Check that these tables exist:
   - `profiles`
   - `events`
   - `matches`
   - `chats`
   - `deliverables`

#### Step 3: Test Demo Login

The app has built-in demo accounts that should work locally and in production:

**Organizer Demo:**
- Email: `test.organizer@test.com`
- Password: `iamorganizer`

**Sponsor Demo:**
- Email: `test.sponser@test.com`
- Password: `iamsponser`

---

### Issue 2: Hydration Mismatch Errors

**Symptoms:**
```
A tree hydrated but some attributes of the server rendered HTML 
didn't match the client properties
```

**Causes:**
- Browser extensions (React DevTools, etc.)
- Date/time differences between server and client
- Random values generated differently on server vs client

**Solutions:**

✅ **Already Fixed:**
- Updated z-index layering in `AnimatedBackground` component
- Fixed z-index in login/signup pages

**Additional Steps (if errors persist):**
1. Test in incognito mode (disables extensions)
2. Clear browser cache
3. Check console for specific attribute mismatches

---

### Issue 3: API Routes Not Working

**Symptoms:**
- Login fails with "An unexpected error occurred"
- Signup returns errors
- Console shows 500 or 503 errors

**Root Cause:**
- Supabase is not configured (returns 503)
- Database tables don't exist (returns 500)

**Solutions:**

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard
   - Click on your deployment
   - Go to **Functions** tab
   - Check logs for `/api/auth/login` and `/api/auth/signup`

2. **Verify Supabase Connection:**
   ```bash
   # Test locally with your .env.local
   npm run dev
   # Try logging in with demo accounts
   ```

3. **Common Error Messages:**
   
   | Error | Cause | Solution |
   |-------|-------|----------|
   | `Supabase not configured` | Missing env vars | Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel |
   | `User profile not found` | Database schema missing | Run `SUPABASE_SCHEMA.sql` in Supabase SQL Editor |
   | `Invalid email or password` | Wrong credentials or user doesn't exist | Use demo accounts or create new user |
   | `Email already registered` | User exists | Use different email or login instead |

---

### Issue 4: Images Not Loading

**Symptoms:**
- Logo doesn't appear on login/signup pages
- Event banners show broken images

**Solutions:**

1. **Check Public Folder:**
   - Verify `/public/logo.png` exists
   - Check file is not corrupted

2. **Verify Image Optimization:**
   - Next.js automatically optimizes images
   - May take a few seconds on first load
   - Check browser network tab for image requests

3. **Remote Images:**
   - For Supabase storage images, verify storage buckets are public
   - Check CORS settings in Supabase

---

## Quick Fixes Checklist

Use this checklist to quickly resolve common issues:

- [ ] **Environment Variables Set on Vercel**
  - `NEXT_PUBLIC_SUPABASE_URL` ✓
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✓

- [ ] **Supabase Database Setup**
  - Schema deployed ✓
  - Tables created ✓
  - Triggers active ✓

- [ ] **Storage Buckets Created**
  - `event-banners` (public) ✓
  - `deliverable-proofs` (public) ✓

- [ ] **Test Demo Login**
  - Organizer account works ✓
  - Sponsor account works ✓
  - Redirects to correct dashboard ✓

- [ ] **Build Succeeds**
  - No TypeScript errors ✓
  - No lint errors ✓
  - Deployment successful ✓

---

## Debugging Steps

### Step 1: Check Vercel Build Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Deployments**
4. Click on the latest deployment
5. Check the **Build Logs** tab
6. Look for errors in red

**Common Build Errors:**
- TypeScript errors → Fix type issues and redeploy
- Missing dependencies → Run `npm install` locally and commit `package-lock.json`
- Environment variable errors → Add missing vars in Vercel settings

### Step 2: Check Browser Console

1. Open your deployed site
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Try logging in
5. Look for error messages

**Common Console Errors:**
- `Failed to fetch` → API route issue, check Vercel function logs
- `Supabase not configured` → Missing environment variables
- Hydration errors → Usually safe to ignore if from browser extensions

### Step 3: Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Try logging in
4. Check the request to `/api/auth/login`

**What to look for:**
- Status Code: Should be `200 OK` for successful login
- Response: Check for error messages
- Headers: Verify `Content-Type: application/json`

**Error Status Codes:**
- `400` → Invalid request data
- `401` → Wrong credentials
- `404` → User not found
- `500` → Server error (check function logs)
- `503` → Service unavailable (Supabase not configured)

---

## Production Environment Testing

### Test in Production (After Deploy)

1. **Test Login Page:**
   ```
   https://your-app.vercel.app/login
   ```
   - Page loads without errors ✓
   - Logo appears ✓
   - Form fields work ✓
   - Demo buttons work ✓

2. **Test Demo Login:**
   - Click "Organizer Demo" button
   - Click "Sign In"
   - Should redirect to `/organizer/dashboard`

3. **Test Signup Page:**
   ```
   https://your-app.vercel.app/signup
   ```
   - Multi-step form works ✓
   - Progress bar updates ✓
   - Can create new account ✓

---

## Emergency Fix: Disable Supabase Requirement

If you need to deploy quickly without Supabase, you can make the demo accounts work without the API:

**Option 1: Use localStorage Only (already implemented for demo accounts)**

The current implementation already handles demo accounts in the client-side code (`login/page.tsx` lines 71-92), so they should work even without Supabase.

**Option 2: Add Fallback to API Routes**

If API routes are still required, you can add a fallback to use localStorage:

```typescript
// In .env.local or Vercel env vars
NEXT_PUBLIC_USE_LOCALSTORAGE=true
```

This will make the app work without Supabase for testing purposes.

---

## Contact Support

If none of these solutions work:

1. **Check Vercel Status**: https://www.vercel-status.com/
2. **Check Supabase Status**: https://status.supabase.com/
3. **Review GitHub Issues**: Check if others have similar issues
4. **Vercel Support**: Contact via Vercel Dashboard

---

## Success Indicators

Your deployment is working correctly if:

✅ Login page loads without errors  
✅ Can log in with demo accounts  
✅ Redirects to correct dashboard after login  
✅ No console errors (except browser extension warnings)  
✅ Images load correctly  
✅ Build succeeds on Vercel  
✅ All pages are accessible  

If all indicators are green, your deployment is successful! 🎉
