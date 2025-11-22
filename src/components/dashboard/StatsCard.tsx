import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
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
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1 sm:mb-2 truncate">{title}</p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
          
          {trend && (
            <div
              className={clsx(
                'flex items-center gap-1 mt-1 sm:mt-2 text-xs sm:text-sm font-medium',
                {
                  'text-green-600': trend.direction === 'up',
                  'text-red-600': trend.direction === 'down',
                }
              )}
            >
              {trend.direction === 'up' ? (
                <TrendingUp size={12} className="sm:w-4 sm:h-4" />
              ) : (
                <TrendingDown size={12} className="sm:w-4 sm:h-4" />
              )}
              <span>
                {trend.direction === 'up' ? '+' : '-'}
                {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>

        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <Icon size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
