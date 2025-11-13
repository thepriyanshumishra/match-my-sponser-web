# 🆓 FREE Backend Setup Guide

This guide shows you how to set up Match My Sponsor with **100% free backend services**. Perfect for hackathons, demos, and MVP development.

## 🎯 Free Services Overview

| Service | Free Tier | Usage |
|---------|-----------|-------|
| **Supabase** | 500MB DB, 1GB Storage, 50K MAU | Database, Auth, Storage, Realtime |
| **Vercel** | Unlimited deployments | Hosting, Analytics |
| **EmailJS** | 200 emails/month | Email notifications (optional) |
| **Browser APIs** | Unlimited | Push notifications, localStorage |

## 🚀 Quick Start (5 minutes)

### Option A: Full Supabase Setup (Recommended)

1. **Create Supabase Account**
   ```bash
   # Go to https://supabase.com
   # Sign up with GitHub (free)
   # Create new project
   ```

2. **Get Credentials**
   ```bash
   # Copy from Supabase Dashboard > Settings > API
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Install Dependencies**
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

4. **Run Database Setup**
   ```sql
   -- Copy SQL from SUPABASE_SCHEMA.sql (will be created)
   -- Paste in Supabase SQL Editor
   -- Run to create all tables
   ```

### Option B: localStorage Only (No signup required)

1. **Set Environment Variable**
   ```bash
   # In .env.local
   NEXT_PUBLIC_USE_LOCALSTORAGE=true
   ```

2. **Start Development**
   ```bash
   npm run dev
   # All data stored in browser localStorage
   # Perfect for quick demos
   ```

## 📊 Database Schema (Supabase)

The following tables will be created automatically:

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('organizer', 'sponsor')),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  audience_size INTEGER NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  sponsorship_requirements TEXT,
  banner_url TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sponsors
CREATE TABLE sponsors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  location TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Matches
CREATE TABLE matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  sponsor_id UUID REFERENCES sponsors(id),
  match_score INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id UUID REFERENCES matches(id),
  sender_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Deliverables
CREATE TABLE deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id UUID REFERENCES matches(id),
  title TEXT NOT NULL,
  description TEXT,
  proof_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Row Level Security (RLS)

Supabase RLS policies ensure data security:

```sql
-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Organizers can create events
CREATE POLICY "Organizers can create events" ON events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'organizer'
    )
  );

-- Public can view published events
CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (status = 'published');

-- Match participants can view messages
CREATE POLICY "Match participants can view messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM matches m
      JOIN events e ON m.event_id = e.id
      JOIN sponsors s ON m.sponsor_id = s.id
      WHERE m.id = match_id 
      AND (e.organizer_id = auth.uid() OR s.user_id = auth.uid())
    )
  );
```

## 📁 File Storage Setup

### Supabase Storage (1GB Free)

1. **Create Buckets**
   ```sql
   -- In Supabase Dashboard > Storage
   -- Create bucket: "event-banners"
   -- Create bucket: "deliverable-proofs"
   -- Set both to public read access
   ```

2. **Storage Policies**
   ```sql
   -- Users can upload their own files
   CREATE POLICY "Users can upload files" ON storage.objects
     FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
   ```

### Alternative: Client-side Compression

```typescript
// lib/image-compression.ts
export async function compressImage(file: File): Promise<File> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = () => {
      // Resize to max 800px width
      const maxWidth = 800;
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        resolve(new File([blob!], file.name, { type: 'image/jpeg' }));
      }, 'image/jpeg', 0.8);
    };
    
    img.src = URL.createObjectURL(file);
  });
}
```

## 🔔 Free Notification Options

### Option 1: In-app Only (Recommended)
- Real-time notifications via Supabase
- Browser push notifications
- No email costs

### Option 2: EmailJS (200 emails/month)
```typescript
// lib/emailjs.ts
import emailjs from '@emailjs/browser';

export async function sendNotificationEmail(data: any) {
  return emailjs.send(
    'service_id',
    'template_id',
    data,
    'public_key'
  );
}
```

### Option 3: Supabase Edge Functions
```typescript
// supabase/functions/send-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  // Use free SMTP service like Gmail
  // Send emails via Deno's built-in fetch
})
```

## 📈 Free Analytics Options

### Option 1: Vercel Analytics (Free on Hobby)
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Option 2: Custom Supabase Analytics
```typescript
// lib/analytics.ts
export async function trackEvent(event: string, data: any) {
  await supabase
    .from('analytics_events')
    .insert({
      event_name: event,
      event_data: data,
      user_id: user?.id,
      timestamp: new Date().toISOString()
    });
}
```

## 🚀 Deployment (Free)

### Vercel Deployment
```bash
# Connect GitHub repo to Vercel
# Add environment variables in Vercel dashboard
# Auto-deploy on every push to main

# Environment variables needed:
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Alternative: Netlify (Also Free)
```bash
# Build command: npm run build
# Publish directory: .next
# Add environment variables in Netlify dashboard
```

## 💡 Development Tips

### 1. Use Feature Flags
```typescript
// lib/config.ts
export const config = {
  useSupabase: process.env.NEXT_PUBLIC_SUPABASE_URL ? true : false,
  useLocalStorage: process.env.NEXT_PUBLIC_USE_LOCALSTORAGE === 'true',
  enableAnalytics: process.env.NODE_ENV === 'production'
};
```

### 2. Graceful Fallbacks
```typescript
// lib/database.ts
export async function saveEvent(event: Event) {
  if (config.useSupabase) {
    return await supabase.from('events').insert(event);
  } else {
    return saveToLocalStorage('events', event);
  }
}
```

### 3. Mock Data for Demos
```typescript
// lib/demo-data.ts
export const demoEvents = [
  {
    id: '1',
    name: 'Tech Innovation Summit 2024',
    category: 'hackathon',
    location: 'San Francisco, CA',
    audienceSize: 500,
    // ... more demo data
  }
];
```

## 🎯 Free Tier Limits

| Service | Limit | Workaround |
|---------|-------|------------|
| Supabase DB | 500MB | Optimize queries, compress data |
| Supabase Storage | 1GB | Compress images, use external CDN |
| Supabase Auth | 50K MAU | More than enough for MVP |
| Vercel Bandwidth | 100GB | Use image optimization |
| EmailJS | 200 emails | Use in-app notifications |

## 🆘 Troubleshooting

### Common Issues

1. **Supabase Connection Failed**
   ```bash
   # Check environment variables
   echo $NEXT_PUBLIC_SUPABASE_URL
   
   # Verify in browser console
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```

2. **RLS Policies Blocking Access**
   ```sql
   -- Temporarily disable RLS for testing
   ALTER TABLE events DISABLE ROW LEVEL SECURITY;
   
   -- Re-enable after fixing policies
   ALTER TABLE events ENABLE ROW LEVEL SECURITY;
   ```

3. **Storage Upload Fails**
   ```typescript
   // Check file size (max 50MB on free tier)
   if (file.size > 50 * 1024 * 1024) {
     throw new Error('File too large');
   }
   ```

## 🎉 Success Checklist

- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] RLS policies configured
- [ ] Storage buckets created
- [ ] Authentication working
- [ ] Vercel deployment successful
- [ ] All features tested
- [ ] Demo data populated

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Total Cost: $0/month** 🎉

Perfect for hackathons, MVPs, and learning projects!