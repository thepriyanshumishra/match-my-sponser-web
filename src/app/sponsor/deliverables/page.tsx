'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

interface Deliverable {
  id: string;
  matchId: string;
  organizerName: string;
  eventName: string;
  title: string;
  description: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  proofUrl?: string;
  feedback?: string;
  submittedAt?: Date;
}

export default function SponsorDeliverablesPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchDeliverables();
  }, []);

  const fetchDeliverables = async () => {
    // Mock data
    const mockDeliverables: Deliverable[] = [
      {
        id: '1',
        matchId: 'match-1',
        organizerName: 'Tech Summit Team',
        eventName: 'Tech Innovation Summit 2024',
        title: 'Social Media Posts',
        description: 'Post 3 times on Instagram with sponsor logo',
        status: 'submitted',
        proofUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
        submittedAt: new Date(),
      },
      {
        id: '2',
        matchId: 'match-1',
        organizerName: 'Tech Summit Team',
        eventName: 'Tech Innovation Summit 2024',
        title: 'Banner Display',
        description: 'Display sponsor banner at event entrance',
        status: 'approved',
        proofUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        matchId: 'match-2',
        organizerName: 'Music Fest Organizers',
        eventName: 'Spring Music Festival',
        title: 'Logo on Website',
        description: 'Add sponsor logo to event website',
        status: 'pending',
      },
    ];
    setDeliverables(mockDeliverables);
    setLoading(false);
  };

  const handleApprove = async (deliverableId: string) => {
    setDeliverables(deliverables.map(d =>
      d.id === deliverableId ? { ...d, status: 'approved', feedback } : d
    ));
    setSelectedDeliverable(null);
    setFeedback('');
  };

  const handleReject = async (deliverableId: string) => {
    if (!feedback.trim()) {
      alert('Please provide feedback for rejection');
      return;
    }
    setDeliverables(deliverables.map(d =>
      d.id === deliverableId ? { ...d, status: 'rejected', feedback } : d
    ));
    setSelectedDeliverable(null);
    setFeedback('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected': return <XCircle className="text-red-500" size={20} />;
      case 'submitted': return <Clock className="text-blue-500" size={20} />;
      default: return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#667eea] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading deliverables...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
          Deliverables
        </h1>
        <p className="text-gray-600">Review and approve sponsorship deliverables</p>
      </div>

      {deliverables.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No deliverables yet</h3>
          <p className="text-gray-600">Deliverables will appear here once you sponsor events</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {deliverables.map((deliverable) => (
            <div key={deliverable.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{deliverable.title}</h3>
                    {getStatusIcon(deliverable.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{deliverable.description}</p>
                  <div className="text-sm text-gray-500">
                    <p>Event: {deliverable.eventName}</p>
                    <p>Organizer: {deliverable.organizerName}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deliverable.status)}`}>
                  {deliverable.status.charAt(0).toUpperCase() + deliverable.status.slice(1)}
                </span>
              </div>

              {deliverable.proofUrl && (
                <div className="mb-4">
                  <img
                    src={deliverable.proofUrl}
                    alt="Proof"
                    className="w-full rounded-xl border border-white/20 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedDeliverable(deliverable)}
                  />
                </div>
              )}

              {deliverable.status === 'submitted' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDeliverable(deliverable)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    <Eye size={16} className="inline mr-2" />
                    Review
                  </button>
                </div>
              )}

              {deliverable.feedback && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-medium text-gray-700 mb-1">Your Feedback:</p>
                  <p className="text-sm text-gray-600">{deliverable.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedDeliverable && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedDeliverable.title}</h2>
            <p className="text-gray-600 mb-4">{selectedDeliverable.description}</p>
            
            {selectedDeliverable.proofUrl && (
              <img
                src={selectedDeliverable.proofUrl}
                alt="Proof"
                className="w-full rounded-xl mb-4"
              />
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback (optional for approval, required for rejection)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Add your feedback..."
                className="w-full glass-input min-h-[100px]"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleApprove(selectedDeliverable.id)}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                <CheckCircle size={20} className="inline mr-2" />
                Approve
              </button>
              <button
                onClick={() => handleReject(selectedDeliverable.id)}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                <XCircle size={20} className="inline mr-2" />
                Reject
              </button>
              <button
                onClick={() => {
                  setSelectedDeliverable(null);
                  setFeedback('');
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
