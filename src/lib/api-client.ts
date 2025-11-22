import { getCurrentUser } from './auth';
import { createLocalMatch, getUserMatches } from './localStorage-chat';

const API_BASE = '/api';
const USE_LOCALSTORAGE = process.env.NEXT_PUBLIC_USE_LOCALSTORAGE === 'true';

async function getAuthHeaders() {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }
  return {
    'Authorization': `Bearer demo-token`,
    'Content-Type': 'application/json',
  };
}

export async function createMatch(eventId: string, sponsorId: string) {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  if (USE_LOCALSTORAGE) {
    // Use localStorage for demo
    const organizerId = user.role === 'organizer' ? user.id : 'demo-organizer';
    return createLocalMatch(eventId, sponsorId, organizerId);
  }

  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE}/matches`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ eventId, sponsorId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create match');
  }

  return response.json();
}

export async function getMatches() {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  if (USE_LOCALSTORAGE) {
    // Use localStorage for demo
    return getUserMatches(user.id, user.role as 'organizer' | 'sponsor');
  }

  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE}/matches`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch matches');
  }

  return response.json();
}