import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          
          {trend && (
            <div
              className={clsx(
                'flex items-center gap-1 mt-2 text-sm font-medium',
                {
                  'text-green-600': trend.direction === 'up',
                  'text-red-600': trend.direction === 'down',
                }
              )}
            >
              {trend.direction === 'up' ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span>
                {trend.direction === 'up' ? '+' : '-'}
                {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Icon size={26} className="text-white" />
        </div>
      </div>
    </div>
  );
}
