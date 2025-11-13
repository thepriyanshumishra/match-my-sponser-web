import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Users, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { GlassButton } from '@/components/shared/GlassButton';
import { Event } from '@/types/event';
import { clsx } from 'clsx';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
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

export function EventCard({ event, onClick, showMatchScore = false, matchScore }: EventCardProps) {
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
    <GlassCard padding="sm" hover className="overflow-hidden">
      {/* Event Banner */}
      <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4">
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
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800">
            {categoryLabels[event.category] || event.category}
          </span>
        </div>

        {/* Match Score Badge */}
        {showMatchScore && matchScore !== undefined && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm">
              <Sparkles size={14} className={clsx('text-white', getMatchScoreColor(matchScore))} />
              <span className="text-xs font-bold text-gray-800">{matchScore}% Match</span>
            </div>
          </div>
        )}

        {/* Event Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-bold text-white line-clamp-2">{event.name}</h3>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar size={16} className="text-gray-500" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MapPin size={16} className="text-gray-500" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Users size={16} className="text-gray-500" />
          <span>{event.audienceSize.toLocaleString()} attendees</span>
        </div>
      </div>

      {/* Action Button */}
      {onClick && (
        <GlassButton
          variant="primary"
          size="sm"
          onClick={onClick}
          className="w-full"
        >
          View Details
        </GlassButton>
      )}
    </GlassCard>
  );
}
