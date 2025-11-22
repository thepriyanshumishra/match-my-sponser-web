'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckSquare, MessageSquare } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EventCard } from '@/components/dashboard/EventCard';
import { EventDetailsModal } from '@/components/sponsor/EventDetailsModal';
import { Event } from '@/types/event';
import { useRouter } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SponsorDashboard() {
  const router = useRouter();
  const [recommendedEvents, setRecommendedEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({
    eventsMatched: 0,
    pendingApprovals: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchScores] = useState<Record<string, number>>({
    '1': 85,
    '2': 72,
    '3': 68,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recommended events from API
        const recommendedData: Event[] = [
          {
            id: '1',
            organizerId: 'org-1',
            name: 'Tech Innovation Summit 2024',
            category: 'hackathon',
            location: 'San Francisco, CA',
            audienceSize: 500,
            date: new Date('2024-06-15'),
            description: 'A premier technology event bringing together innovators and industry leaders.',
            sponsorshipRequirements: 'Looking for tech companies interested in innovation and startups.',
            bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2',
            organizerId: 'org-2',
            name: 'Spring Music Festival',
            category: 'cultural',
            location: 'Austin, TX',
            audienceSize: 2000,
            date: new Date('2024-05-20'),
            description: 'Annual spring music festival featuring local and international artists.',
            sponsorshipRequirements: 'Seeking beverage and lifestyle brand sponsors.',
            bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '3',
            organizerId: 'org-3',
            name: 'College Sports Championship',
            category: 'sports',
            location: 'Los Angeles, CA',
            audienceSize: 1500,
            date: new Date('2024-07-10'),
            description: 'Inter-college sports championship with multiple sporting events.',
            sponsorshipRequirements: 'Looking for sports brands and energy drink sponsors.',
            bannerUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop',
            status: 'published',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        setRecommendedEvents(recommendedData);
        setStats({
          eventsMatched: 8,
          pendingApprovals: 3,
          messages: 5,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEventClick = (eventId: string) => {
    const event = recommendedEvents.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#667eea] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...fadeInUp}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your sponsorship opportunities.</p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div {...fadeInUp}>
          <StatsCard
            title="Events Matched"
            value={stats.eventsMatched}
            icon={Target}
            trend={{ value: 15, direction: 'up' }}
          />
        </motion.div>

        <motion.div {...fadeInUp}>
          <StatsCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon={CheckSquare}
          />
        </motion.div>

        <motion.div {...fadeInUp}>
          <StatsCard
            title="Messages"
            value={stats.messages}
            icon={MessageSquare}
          />
        </motion.div>
      </motion.div>

      {/* Recommended Events Section */}
      <motion.div {...fadeInUp}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommended Events</h2>
          <button
            onClick={() => router.push('/sponsor/discover')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-lg transition-all duration-200"
          >
            Discover More
          </button>
        </div>

        {recommendedEvents.length === 0 ? (
          <div className="text-center py-12 bg-white/20 backdrop-blur-md rounded-3xl border border-white/20">
            <Target size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No recommendations yet</h3>
            <p className="text-gray-600 mb-6">Complete your profile to get personalized event recommendations</p>
            <button
              onClick={() => router.push('/sponsor/discover')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-lg transition-all duration-200"
            >
              Discover Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedEvents.map((event) => (
              <motion.div
                key={event.id}
                {...fadeInUp}
              >
                <EventCard
                  event={event}
                  onClick={() => handleEventClick(event.id)}
                  showMatchScore={true}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        matchScore={selectedEvent ? matchScores[selectedEvent.id] || 0 : 0}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
