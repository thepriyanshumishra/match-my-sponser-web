-- Fix for Chat System - Run this in Supabase SQL Editor
-- This aligns the messages table with the API implementation

-- Drop the old messages table and recreate with match_id
DROP TABLE IF EXISTS messages CASCADE;

-- Messages table (directly linked to matches, no separate conversations table needed)
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Messages policies
CREATE POLICY "Match participants can view messages" ON messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM matches m
    JOIN events e ON m.event_id = e.id
    JOIN sponsors s ON m.sponsor_id = s.id
    WHERE m.id = messages.match_id 
    AND (e.organizer_id = auth.uid() OR s.user_id = auth.uid())
  )
);

CREATE POLICY "Match participants can send messages" ON messages FOR INSERT WITH CHECK (
  sender_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM matches m
    JOIN events e ON m.event_id = e.id
    JOIN sponsors s ON m.sponsor_id = s.id
    WHERE m.id = match_id 
    AND (e.organizer_id = auth.uid() OR s.user_id = auth.uid())
  )
);

-- Index for performance
CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);

-- Enable real-time for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
