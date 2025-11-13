'use client';

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface ChatWindowProps {
  matchId: string;
  currentUserId: string;
}

export function ChatWindow({ matchId, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [matchId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const session = localStorage.getItem('auth_session');
      const token = session ? JSON.parse(session).accessToken : null;

      const response = await fetch(`/api/chat/messages?matchId=${matchId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const session = localStorage.getItem('auth_session');
      const token = session ? JSON.parse(session).accessToken : null;

      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ matchId, content: newMessage }),
      });

      if (response.ok) {
        const message = await response.json();
        setMessages([...messages, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <GlassCard className="h-[600px] flex items-center justify-center">
        <p className="text-gray-600">Loading messages...</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.sender_id === currentUserId
                  ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                  : 'glass-card'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.sender_id === currentUserId ? 'text-white/70' : 'text-gray-500'}`}>
                {new Date(message.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-white/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 glass-input px-4 py-3 rounded-xl"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="glass-button-primary px-6 py-3 rounded-xl disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </GlassCard>
  );
}
