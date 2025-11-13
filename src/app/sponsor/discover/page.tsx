'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { FilterPanel, EventFilters } from '@/components/sponsor/FilterPanel';
import { EventDiscoveryCard } from '@/components/sponsor/EventDiscoveryCard';
import { Event } from '@/types/event';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Mock events data
const mockEvents: Event[] = [
  {
    id: 'event-1',
    organizerId: 'org-1',
    name: 'Tech Innovation Summit 2024',
    category: 'hackathon',
    location: 'San Francisco, CA',
    audienceSize: 500,
    date: new Date('2024-06-15'),
    description: 'A premier technology event bringing together innovators and industry leaders to showcase cutting-edge solutions.',
    sponsorshipRequirements: 'Looking for tech companies interested in innovation and startups. Seeking $50K-$100K sponsorship.',
    bannerUrl: undefined,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'event-2',
    organizerId: 'org-2',
    name: 'Spring Music Festival',
    category: 'cultural',
    location: 'Austin, TX',
    audienceSize: 2000,
    date: new Date('2024-05-20'),
    description: 'Annual spring music festival featuring local and international artists across multiple genres.',
    sponsorshipRequirements: 'Seeking beverage and lifestyle brand sponsors. Budget range: $30K-$80K.',
    bannerUrl: undefined,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'event-3',
    organizerId: 'org-3',
    name: 'College Sports Championship',
    category: 'sports',
    location: 'Los Angeles, CA',
    audienceSize: 1500,
    date: new Date('2024-07-10'),
    description: 'Inter-college sports championship with multiple sporting events and competitions.',
    sponsorshipRequirements: 'Looking for sports brands and energy drink sponsors. Target budget: $40K-$100K.',
    bannerUrl: undefined,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'event-4',
    organizerId: 'org-4',
    name: 'Startup Pitch Competition',
    category: 'competition',
    location: 'New York, NY',
    audienceSize: 300,
    date: new Date('2024-08-05'),
    description: 'Competitive pitch event where startups present their ideas to investors and industry experts.',
    sponsorshipRequirements: 'Seeking financial services and tech sponsors. Budget: $25K-$60K.',
    bannerUrl: undefined,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'event-5',
    organizerId: 'org-5',
    name: 'Annual College Fest',
    category: 'college-fest',
    location: 'Boston, MA',
    audienceSize: 3000,
    date: new Date('2024-09-15'),
    description: 'Three-day college festival with cultural performances, competitions, and entertainment.',
    sponsorshipRequirements: 'Looking for diverse sponsors across categories. Budget range: $20K-$150K.',
    bannerUrl: undefined,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'event-6',
    organizerId: 'org-6',
    name: 'AI & Machine Learning Workshop',
    category: 'workshop',
    location: 'Seattle, WA',
    audienceSize: 200,
    date: new Date('2024-06-25'),
    description: 'Intensive workshop on AI and machine learning with hands-on projects and expert speakers.',
    sponsorshipRequirements: 'Seeking tech companies and educational platforms. Budget: $15K-$40K.',
    bannerUrl: undefined,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function DiscoverEventsPage() {
  const [filters, setFilters] = useState<EventFilters>({
    categories: [],
    audienceRange: { min: 0, max: 10000 },
    location: '',
    budgetDistribution: 'Any',
  });

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [matchScores, setMatchScores] = useState<Record<string, number>>({});

  useEffect(() => {
    // Apply filters
    let filtered = mockEvents;

    // Filter by category
    if (filters.categories.length > 0) {
      filtered = filtered.filter((event) =>
        filters.categories.includes(event.category)
      );
    }

    // Filter by audience range
    filtered = filtered.filter(
      (event) =>
        event.audienceSize >= filters.audienceRange.min &&
        event.audienceSize <= filters.audienceRange.max
    );

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by budget distribution (simplified logic)
    if (filters.budgetDistribution !== 'Any') {
      // This would be more sophisticated with actual budget data
      // For now, we'll keep all events
    }

    setFilteredEvents(filtered);

    // Calculate match scores using the matching algorithm
    // TODO: Get actual sponsor data from context or props
    // For now, using a mock sponsor
    const mockSponsor = {
      id: 'sponsor-1',
      userId: 'user-1',
      companyName: 'TechCorp Solutions',
      industry: 'Technology',
      budgetRange: { min: 50000, max: 150000 },
      location: 'San Francisco, CA',
      preferences: {
        categories: ['hackathon', 'workshop', 'competition'] as const,
        audienceSize: { min: 200, max: 1000 },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const scores: Record<string, number> = {};
    filtered.forEach((event) => {
      // Use actual matching algorithm
      const { calculateMatchScore } = require('@/lib/matching');
      const result = calculateMatchScore(event, mockSponsor);
      scores[event.id] = result.score;
    });
    setMatchScores(scores);
  }, [filters]);

  const handleViewDetails = (eventId: string) => {
    // TODO: Navigate to event details page or open modal
    console.log('View event details:', eventId);
    alert('Event details view will be implemented in future tasks');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeInUp}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
          Discover Events
        </h1>
        <p className="text-gray-600">
          Find events that align with your sponsorship goals
        </p>
      </motion.div>

      {/* Split View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side - Filters */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FilterPanel filters={filters} onFilterChange={setFilters} />
        </motion.div>

        {/* Right Side - Event Cards */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Results Header */}
          <div className="mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">{filteredEvents.length}</span> events found
            </p>
          </div>

          {/* Event Cards Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white/20 backdrop-blur-md rounded-3xl border border-white/20">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No events found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventDiscoveryCard
                    event={event}
                    matchScore={matchScores[event.id] || 0}
                    onViewDetails={() => handleViewDetails(event.id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
