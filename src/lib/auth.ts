import { supabase } from './supabase';

export { supabase };

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'organizer' | 'sponsor';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Store session in localStorage
export const setSession = (session: AuthSession) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_session', JSON.stringify(session));
  }
};

// Get session from localStorage
export const getSession = (): AuthSession | null => {
  if (typeof window !== 'undefined') {
    const sessionStr = localStorage.getItem('auth_session');
    if (sessionStr) {
      try {
        return JSON.parse(sessionStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

// Clear session from localStorage
export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_session');
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const session = getSession();
  return session ? session.user : null;
};

// Get user role
export const getUserRole = (): 'organizer' | 'sponsor' | null => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

// Verify session is valid (check expiration, etc.)
export const verifySession = async (): Promise<boolean> => {
  const session = getSession();
  if (!session) return false;

  // If Supabase is not configured, just check if session exists
  if (!supabase) {
    return true;
  }

  try {
    // Verify with Supabase
    const { data, error } = await supabase.auth.getUser(session.accessToken);
    if (error || !data.user) {
      clearSession();
      return false;
    }
    return true;
  } catch {
    clearSession();
    return false;
  }
};
