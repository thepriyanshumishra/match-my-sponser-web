import { Sidebar } from '@/components/dashboard/Sidebar';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export default function SponsorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ThemeToggle />
      <Sidebar role="sponsor" />
      <main className="ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
