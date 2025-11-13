'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  MessageSquare,
  CheckSquare,
  Compass,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  role: 'organizer' | 'sponsor';
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const organizerNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/organizer/dashboard', icon: LayoutDashboard },
  { label: 'Create Event', href: '/organizer/create-event', icon: PlusCircle },
  { label: 'Find Sponsors', href: '/organizer/matches', icon: Search },
  { label: 'Chat', href: '/organizer/chat', icon: MessageSquare },
  { label: 'Deliverables', href: '/organizer/deliverables', icon: CheckSquare },
];

const sponsorNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/sponsor/dashboard', icon: LayoutDashboard },
  { label: 'Discover Events', href: '/sponsor/discover', icon: Compass },
  { label: 'Chat', href: '/sponsor/chat', icon: MessageSquare },
  { label: 'Deliverables', href: '/sponsor/deliverables', icon: CheckSquare },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = role === 'organizer' ? organizerNavItems : sponsorNavItems;

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-2xl flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href={`/${role}/dashboard`} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles size={26} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Match My Sponsor
            </h1>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  {
                    'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg':
                      isActive,
                    'text-gray-700 hover:bg-gray-100': !isActive,
                  }
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </aside>
  );
}
