'use client';

import { useState, useEffect } from 'react';
import { Upload, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Deliverable {
  id: string;
  matchId: string;
  sponsorName: string;
  title: string;
  description: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  proofUrl?: string;
  feedback?: string;
  dueDate: Date;
}

export default function OrganizerDeliverablesPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDeliverables();
  }, []);

  const fetchDeliverables = async () => {
    // Mock data
    const mockDeliverables: Deliverable[] = [
      {
        id: '1',
        matchId: 'match-1',
        sponsorName: 'TechCorp Inc.',
        title: 'Social Media Posts',
        description: 'Post 3 times on Instagram with sponsor logo',
        status: 'pending',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        matchId: 'match-1',
        sponsorName: 'TechCorp Inc.',
        title: 'Banner Display',
        description: 'Display sponsor banner at event entrance',
        status: 'submitted',
        proofUrl: 'https://example.com/proof.jpg',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        matchId: 'match-2',
        sponsorName: 'Innovation Labs',
        title: 'Logo on Website',
        description: 'Add sponsor logo to event website',
        status: 'approved',
        proofUrl: 'https://example.com/proof2.jpg',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];
    setDeliverables(mockDeliverables);
    setLoading(false);
  };

  const handleFileUpload = async (deliverableId: string, file: File) => {
    setUploadingId(deliverableId);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDeliverables(deliverables.map(d => 
      d.id === deliverableId 
        ? { ...d, status: 'submitted', proofUrl: URL.createObjectURL(file) }
        : d
    ));
    setUploadingId(null);
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
        <p className="text-gray-600">Upload proof of completed sponsorship deliverables</p>
      </div>

      {deliverables.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Upload size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No deliverables yet</h3>
          <p className="text-gray-600">Deliverables will appear here once you match with sponsors</p>
        </div>
      ) : (
        <div className="space-y-4">
          {deliverables.map((deliverable) => (
            <div key={deliverable.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{deliverable.title}</h3>
                    {getStatusIcon(deliverable.status)}
                  </div>
                  <p className="text-gray-600 mb-2">{deliverable.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Sponsor: {deliverable.sponsorName}</span>
                    <span>•</span>
                    <span>Due: {new Date(deliverable.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deliverable.status)}`}>
                  {deliverable.status.charAt(0).toUpperCase() + deliverable.status.slice(1)}
                </span>
              </div>

              {deliverable.status === 'pending' && (
                <div className="mt-4">
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(deliverable.id, file);
                      }}
                      disabled={uploadingId === deliverable.id}
                      className="hidden"
                      id={`file-${deliverable.id}`}
                    />
                    <label
                      htmlFor={`file-${deliverable.id}`}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl cursor-pointer transition-all ${
                        uploadingId === deliverable.id
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-lg'
                      }`}
                    >
                      <Upload size={20} />
                      {uploadingId === deliverable.id ? 'Uploading...' : 'Upload Proof'}
                    </label>
                  </label>
                </div>
              )}

              {deliverable.proofUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Uploaded Proof:</p>
                  <img
                    src={deliverable.proofUrl}
                    alt="Proof"
                    className="w-full max-w-md rounded-xl border border-white/20"
                  />
                </div>
              )}

              {deliverable.feedback && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800 mb-1">Sponsor Feedback:</p>
                  <p className="text-sm text-yellow-700">{deliverable.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
