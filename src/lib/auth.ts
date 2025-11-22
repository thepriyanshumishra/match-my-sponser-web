// Simple auth utilities with basic localStorage
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'organizer' | 'sponsor';
}

export const setCurrentUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('current_user', JSON.stringify(user));
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('current_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

export const clearCurrentUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('current_user');
    // Clear any other auth-related items
    localStorage.removeItem('demo_accounts');
    localStorage.removeItem('auth_session');
  }
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const getUserRole = (): 'organizer' | 'sponsor' | null => {
  const user = getCurrentUser();
  return user ? user.role : null;
};
