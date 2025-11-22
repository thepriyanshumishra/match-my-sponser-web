'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { getCurrentUser } from '@/lib/auth';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.role !== 'organizer') {
      router.push('/sponsor/dashboard');
      return;
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 relative">
      <AnimatedBackground />
      <Sidebar role="organizer" />
      <main className="min-h-screen lg:ml-72">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}