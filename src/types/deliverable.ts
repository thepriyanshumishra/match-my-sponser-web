export type DeliverableStatus = 'pending' | 'uploaded' | 'approved' | 'rejected';

export interface Deliverable {
  id: string;
  matchId: string;
  title: string;
  description: string;
  proofUrl?: string;
  status: DeliverableStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
