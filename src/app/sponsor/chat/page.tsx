'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { ConversationList } from '@/components/chat/ConversationList';
import { MessageList } from '@/components/chat/MessageList';
import { getCurrentUser } from '@/lib/auth';
import { useChat } from '@/hooks/useChat';
import { useConversations } from '@/hooks/useConversations';

function ChatArea({ conversationId, conversations }: { conversationId: string | null; conversations: any[] }) {
  const [newMessage, setNewMessage] = useState('');
  const currentUser = getCurrentUser();
  const { messages, loading, sendMessage } = useChat(conversationId);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage.trim());
    setNewMessage('');
  };

  if (!conversationId) {
    return (
      <div className="flex-1 glass-card flex items-center justify-center text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  const conversation = conversations.find(c => c.id === conversationId);

  return (
    <div className="flex-1 glass-card flex flex-col">
      <div className="p-4 border-b border-white/20">
        <h3 className="font-semibold text-lg">{conversation?.participantName}</h3>
      </div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">Loading...</div>
      ) : (
        <MessageList messages={messages.map(m => ({ id: m.id, senderId: m.sender_id, content: m.content, timestamp: new Date(m.created_at) }))} currentUserId={currentUser?.id || ''} />
      )}
      <div className="p-4 border-t border-white/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 glass-input"
          />
          <button onClick={handleSend} disabled={!newMessage.trim()} className="glass-button-primary px-6 disabled:opacity-50">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SponsorChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { conversations, loading } = useConversations();

  if (conversations.length > 0 && !selectedConversation) {
    setSelectedConversation(conversations[0].id);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#667eea] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)]">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-6">
        Messages
      </h1>
      
      {conversations.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-gray-600 text-lg">No conversations yet</p>
          <p className="text-gray-500 mt-2">Connect with event organizers to start chatting</p>
        </div>
      ) : (
        <div className="flex h-full gap-4">
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
          />
          <ChatArea
            conversationId={selectedConversation}
            conversations={conversations}
          />
        </div>
      )}
    </div>
  );
}
