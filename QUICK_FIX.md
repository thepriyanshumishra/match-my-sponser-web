# 🚨 QUICK FIX: Vercel Deployment Errors

## Most Common Issue: Missing Environment Variables

If your login/signup pages show errors on Vercel, follow these steps:

### 1️⃣ Get Supabase Credentials (2 minutes)

1. Go to https://supabase.com
2. Open your project
3. Click **Settings** (⚙️) → **API**
4. Copy these two values:
   - **Project URL**
   - **anon public key**

### 2️⃣ Add to Vercel (3 minutes)

1. Go to https://vercel.com
2. Open your project
3. Click **Settings** → **Environment Variables**
4. Add:
   
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: [paste your Project URL]
   Environments: ✅ Production ✅ Preview ✅ Development
   ```
   
   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [paste your anon public key]
   Environments: ✅ Production ✅ Preview ✅ Development
   ```

5. Click **Save**

### 3️⃣ Redeploy (1 minute)

1. Go to **Deployments** tab
2. Click **...** on latest deployment
3. Click **Redeploy**
4. Wait ~2 minutes

### ✅ Test (1 minute)

Visit: `https://your-app.vercel.app/login`

Try demo login:
- Email: `test.organizer@test.com`
- Password: `iamorganizer`

Should redirect to dashboard! 🎉

---

## Still Not Working?

Check `TROUBLESHOOTING.md` for detailed debugging steps.

Common issues:
- Typos in environment variable names (must be exact)
- Forgot to redeploy after adding variables
- Wrong Supabase credentials
- Database schema not deployed

---

## Demo Accounts

Your app has built-in demo accounts:

**Organizer:**
- Email: `test.organizer@test.com`
- Password: `iamorganizer`

**Sponsor:**
- Email: `test.sponser@test.com`
- Password: `iamsponser`

These should work even without Supabase (they use localStorage for demo purposes).
