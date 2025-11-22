'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, getSession, verifySession, clearSession } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = getSession();
        if (session) {
          // Verify session is still valid
          const isValid = await verifySession();
          if (isValid) {
            setUser(session.user);
            
            // Redirect to appropriate dashboard if on auth pages
            if (pathname === '/' || pathname.startsWith('/auth/')) {
              const dashboardPath = session.user.role === 'organizer' 
                ? '/organizer/dashboard' 
                : '/sponsor/dashboard';
              router.replace(dashboardPath);
            }
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [pathname, router]);

  const logout = () => {
    clearSession();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}