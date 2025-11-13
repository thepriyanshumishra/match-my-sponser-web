'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Sparkles, LogIn } from 'lucide-react';

export function BottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (pathname.startsWith('/organizer') || pathname.startsWith('/sponsor')) {
    return null;
  }

  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl px-6 py-3">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={`p-3 rounded-xl transition-all ${
              pathname === '/' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home size={20} />
          </Link>
          <div className="w-px h-6 bg-gray-300" />
          <Link
            href="/login"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              pathname === '/login' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LogIn size={18} />
            <span className="text-sm font-medium">Login</span>
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all"
          >
            <Sparkles size={18} />
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
