'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

export default function SponsorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="sponsor">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 relative">
        <Sidebar role="sponsor" />
        <main className="min-h-screen lg:ml-72">
          <div className="p-4 lg:p-8 pt-16 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}