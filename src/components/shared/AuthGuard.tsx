'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, validateSession, clearCurrentUser } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'organizer' | 'sponsor';
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = () => {
      try {
        // Check if user is authenticated
        if (!isAuthenticated()) {
          clearCurrentUser();
          router.push('/login');
          return;
        }

        // Validate session
        if (!validateSession()) {
          clearCurrentUser();
          router.push('/login');
          return;
        }

        // Check role if required
        if (requiredRole) {
          const user = JSON.parse(localStorage.getItem('current_user') || '{}');
          if (user.role !== requiredRole) {
            router.push('/login');
            return;
          }
        }

        setIsValidating(false);
      } catch (error) {
        clearCurrentUser();
        router.push('/login');
      }
    };

    validateAuth();
  }, [router, requiredRole]);

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#667eea] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Validating session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}