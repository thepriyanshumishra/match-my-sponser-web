import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Users, Sparkles, Trash2 } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { GlassButton } from '@/components/shared/GlassButton';
import { Event } from '@/types/event';
import { clsx } from 'clsx';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
  onDelete?: () => void;
  showMatchScore?: boolean;
  matchScore?: number;
}

const categoryLabels: Record<string, string> = {
  'college-fest': 'College Fest',
  'competition': 'Competition',
  'sports': 'Sports',
  'hackathon': 'Hackathon',
  'cultural': 'Cultural',
  'workshop': 'Workshop',
};

export function EventCard({ event, onClick, onDelete, showMatchScore = false, matchScore }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getMatchScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Event Banner */}
      <div className="relative w-full h-40 sm:h-48 overflow-hidden">
        {event.bannerUrl ? (
          <Image
            src={event.bannerUrl}
            alt={event.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#667eea] to-[#764ba2]" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className="px-2 sm:px-3 py-1 rounded-full bg-white text-xs font-semibold text-gray-900 shadow-md">
            {categoryLabels[event.category] || event.category}
          </span>
        </div>

        {/* Match Score Badge */}
        {showMatchScore && matchScore !== undefined && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <div className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md">
              <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 text-white" />
              <span className="text-xs font-bold text-white">{matchScore}% Match</span>
            </div>
          </div>
        )}

        {/* Event Title */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
          <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2">{event.name}</h3>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
          <Calendar size={14} className="sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
          <MapPin size={14} className="sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
          <Users size={14} className="sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
          <span>{event.audienceSize.toLocaleString()} attendees</span>
        </div>
      </div>

      {/* Action Buttons */}
      {(onClick || onDelete) && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex gap-2">
          {onClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="flex-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 text-sm sm:text-base touch-manipulation"
            >
              View Details
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all duration-200 flex items-center justify-center"
              title="Delete Event"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
