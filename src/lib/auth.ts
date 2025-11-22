// Simple auth utilities without persistent sessions
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'organizer' | 'sponsor';
}

// Simple session storage (no persistence)
let currentUser: User | null = null;

export const setCurrentUser = (user: User) => {
  currentUser = user;
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const clearCurrentUser = () => {
  currentUser = null;
};

export const isAuthenticated = (): boolean => {
  return currentUser !== null;
};

export const getUserRole = (): 'organizer' | 'sponsor' | null => {
  return currentUser ? currentUser.role : null;
};
