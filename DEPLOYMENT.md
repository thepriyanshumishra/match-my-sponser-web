# 🚀 Deployment Guide

## Quick Deploy to Vercel (5 minutes)

### 1. Prerequisites
- GitHub account
- Vercel account (free)
- Supabase account (free)

### 2. Setup Supabase

1. **Create Project**
   ```
   Go to https://supabase.com
   Click "New Project"
   Choose organization and region
   Set database password
   Wait 2 minutes for setup
   ```

2. **Run Database Schema**
   ```
   Go to SQL Editor
   Copy contents of SUPABASE_SCHEMA.sql
   Paste and click "Run"
   ```

3. **Create Storage Buckets**
   ```
   Go to Storage
   Create bucket: "event-banners" (public)
   Create bucket: "deliverable-proofs" (public)
   Run storage policies from SUPABASE_STORAGE_SETUP.md
   ```

4. **Get Credentials**
   ```
   Go to Settings > API
   Copy Project URL
   Copy anon/public key
   ```

### 3. Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   ```
   Go to https://vercel.com
   Click "New Project"
   Import your GitHub repository
   ```

3. **Add Environment Variables**
   ```
   In Vercel project settings > Environment Variables:
   
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Deploy**
   ```
   Click "Deploy"
   Wait 2-3 minutes
   Your app is live! 🎉
   ```

### 4. Test Your Deployment

1. Visit your Vercel URL
2. Sign up as organizer
3. Create an event
4. Sign up as sponsor (different email)
5. Discover events
6. Test chat and deliverables

## 🔧 Local Development with Supabase

### Setup .env.local

```bash
# Copy example
cp .env.example .env.local

# Add your credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Run Development Server

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### Supabase Dashboard
- Monitor database usage
- Check storage usage
- View API requests
- Monitor auth users

## 🆓 Free Tier Limits

### Vercel (Hobby)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains

### Supabase (Free)
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 2GB bandwidth
- ✅ 50K monthly active users

## 🔄 Auto Deployment

Every push to `main` branch automatically deploys to Vercel.

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel deploys automatically
```

## 🐛 Troubleshooting

### Build Fails
```bash
# Check build locally
npm run build

# Fix TypeScript errors
npm run lint
```

### Environment Variables Not Working
```
1. Check spelling in Vercel dashboard
2. Redeploy after adding variables
3. Verify no trailing spaces
```

### Supabase Connection Issues
```
1. Check URL format (https://xxx.supabase.co)
2. Verify anon key is correct
3. Check RLS policies are set
4. Ensure tables exist
```

### Storage Upload Fails
```
1. Verify buckets exist
2. Check bucket is public
3. Run storage policies
4. Check file size < 5MB
```

## ✅ Post-Deployment Checklist

- [ ] Database schema deployed
- [ ] Storage buckets created
- [ ] Storage policies set
- [ ] Environment variables added
- [ ] Test signup/login
- [ ] Test event creation
- [ ] Test file upload
- [ ] Test chat
- [ ] Test deliverables
- [ ] Check mobile responsiveness
- [ ] Verify all pages load

## 🎉 You're Live!

Share your app:
- Production URL: `https://your-app.vercel.app`
- Custom domain: Add in Vercel settings

## 📈 Next Steps

1. **Custom Domain**
   - Buy domain or use existing
   - Add in Vercel settings
   - Update DNS records

2. **Analytics**
   - Enable Vercel Analytics (free)
   - Monitor user behavior
   - Track performance

3. **Monitoring**
   - Set up error tracking
   - Monitor Supabase usage
   - Check performance metrics

4. **Scale**
   - Upgrade Supabase if needed
   - Optimize queries
   - Add caching
