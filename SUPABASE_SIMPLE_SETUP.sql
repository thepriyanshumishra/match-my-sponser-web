-- Simple setup - Only add what's missing
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  audience_size INTEGER NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  sponsorship_requirements TEXT,
  banner_url TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  location TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  match_score INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Deliverables table
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  proof_url TEXT,
  feedback TEXT,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

-- Simple policies (anyone authenticated can do anything for now)
DROP POLICY IF EXISTS "events_policy" ON events;
CREATE POLICY "events_policy" ON events FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "sponsors_policy" ON sponsors;
CREATE POLICY "sponsors_policy" ON sponsors FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "matches_policy" ON matches;
CREATE POLICY "matches_policy" ON matches FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "deliverables_policy" ON deliverables;
CREATE POLICY "deliverables_policy" ON deliverables FOR ALL USING (true) WITH CHECK (true);

-- Done! Your database is ready.
