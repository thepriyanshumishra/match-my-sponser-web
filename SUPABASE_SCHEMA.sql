-- Match My Sponsor - Supabase Database Schema
-- Run this in Supabase SQL Editor to set up all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('organizer', 'sponsor')) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('college-fest', 'competition', 'sports', 'hackathon', 'cultural', 'workshop')) NOT NULL,
  location TEXT NOT NULL,
  audience_size INTEGER NOT NULL CHECK (audience_size > 0),
  date DATE NOT NULL,
  description TEXT NOT NULL,
  sponsorship_requirements TEXT NOT NULL,
  banner_url TEXT,
  status TEXT CHECK (status IN ('draft', 'published', 'completed', 'cancelled')) DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  location TEXT,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE NOT NULL,
  match_score INTEGER NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, sponsor_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deliverables table
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  proof_url TEXT,
  status TEXT CHECK (status IN ('pending', 'submitted', 'approved', 'rejected')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (status = 'published' OR organizer_id = auth.uid());

CREATE POLICY "Organizers can create events" ON events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'organizer'
    )
  );

CREATE POLICY "Organizers can update own events" ON events
  FOR UPDATE USING (organizer_id = auth.uid());

CREATE POLICY "Organizers can delete own events" ON events
  FOR DELETE USING (organizer_id = auth.uid());

-- Sponsors policies
CREATE POLICY "Anyone can view sponsors" ON sponsors
  FOR SELECT USING (true);

CREATE POLICY "Sponsors can create profile" ON sponsors
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'sponsor'
    )
  );

CREATE POLICY "Sponsors can update own profile" ON sponsors
  FOR UPDATE USING (user_id = auth.uid());

-- Matches policies
CREATE POLICY "Match participants can view matches" ON matches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_id AND e.organizer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM sponsors s
      WHERE s.id = sponsor_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "System can create matches" ON matches
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Match participants can update status" ON matches
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_id AND e.organizer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM sponsors s
      WHERE s.id = sponsor_id AND s.user_id = auth.uid()
    )
  );

-- Messages policies
CREATE POLICY "Match participants can view messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM matches m
      JOIN events e ON m.event_id = e.id
      WHERE m.id = match_id AND e.organizer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM matches m
      JOIN sponsors s ON m.sponsor_id = s.id
      WHERE m.id = match_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Match participants can send messages" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM matches m
      JOIN events e ON m.event_id = e.id
      WHERE m.id = match_id AND e.organizer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM matches m
      JOIN sponsors s ON m.sponsor_id = s.id
      WHERE m.id = match_id AND s.user_id = auth.uid()
    )
  );

-- Deliverables policies
CREATE POLICY "Match participants can view deliverables" ON deliverables
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM matches m
      JOIN events e ON m.event_id = e.id
      WHERE m.id = match_id AND e.organizer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM matches m
      JOIN sponsors s ON m.sponsor_id = s.id
      WHERE m.id = match_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Organizers can create deliverables" ON deliverables
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM matches m
      JOIN events e ON m.event_id = e.id
      WHERE m.id = match_id AND e.organizer_id = auth.uid()
    )
  );

CREATE POLICY "Match participants can update deliverables" ON deliverables
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM matches m
      JOIN events e ON m.event_id = e.id
      WHERE m.id = match_id AND e.organizer_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM matches m
      JOIN sponsors s ON m.sponsor_id = s.id
      WHERE m.id = match_id AND s.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_sponsors_user ON sponsors(user_id);
CREATE INDEX IF NOT EXISTS idx_matches_event ON matches(event_id);
CREATE INDEX IF NOT EXISTS idx_matches_sponsor ON matches(sponsor_id);
CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_deliverables_match ON deliverables(match_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON sponsors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliverables_updated_at BEFORE UPDATE ON deliverables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
