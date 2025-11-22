import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import { getUserMatches, getMatchMessages } from '@/lib/localStorage-chat';

interface Conversation {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    const user = getCurrentUser();
    if (!user) {
      setLoading(false);
      return;
    }

    // Use localStorage fallback if Supabase not configured
    if (!supabase || process.env.NEXT_PUBLIC_USE_LOCALSTORAGE === 'true') {
      const matches = getUserMatches(user.id, user.role as 'organizer' | 'sponsor');
      const convos: Conversation[] = matches.map(match => {
        const messages = getMatchMessages(match.id);
        const lastMessage = messages[messages.length - 1];
        return {
          id: match.id,
          participantName: user.role === 'organizer' ? 'Demo Sponsor' : 'Demo Event',
          lastMessage: lastMessage?.content || 'No messages yet',
          lastMessageTime: lastMessage ? new Date(lastMessage.createdAt) : new Date(match.createdAt),
          unreadCount: 0
        };
      });
      setConversations(convos.sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()));
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!profile) {
      setLoading(false);
      return;
    }

    const query = supabase.from('matches').select(`
      id, status, created_at,
      events!inner(id, name, organizer_id),
      sponsors!inner(id, company_name, user_id)
    `).eq('status', 'accepted');

    if (profile.role === 'organizer') {
      query.eq('events.organizer_id', user.id);
    } else {
      query.eq('sponsors.user_id', user.id);
    }

    const { data: matches } = await query;
    if (!matches) return;

    const convos: Conversation[] = await Promise.all(matches.map(async (m: any) => {
      const { data: msgs } = await supabase!.from('messages').select('content, created_at').eq('match_id', m.id).order('created_at', { ascending: false }).limit(1);
      return {
        id: m.id,
        participantName: profile.role === 'organizer' ? m.sponsors.company_name : m.events.name,
        lastMessage: msgs?.[0]?.content || 'No messages yet',
        lastMessageTime: msgs?.[0] ? new Date(msgs[0].created_at) : new Date(m.created_at),
        unreadCount: 0
      };
    }));

    setConversations(convos.sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()));
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return { conversations, loading, refresh: fetchConversations };
}
