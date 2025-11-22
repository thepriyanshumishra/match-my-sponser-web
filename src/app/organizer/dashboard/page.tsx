"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Target, MessageSquare, CheckSquare } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { EventCard } from "@/components/dashboard/EventCard";
import { Event } from "@/types/event";
import { useRouter } from "next/navigation";

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

export default function OrganizerDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    matches: 0,
    messages: 0,
    pendingDeliverables: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch events from API
        const sampleEvents: Event[] = [
          {
            id: "1",
            organizerId: "user-1",
            name: "Tech Innovation Summit 2024",
            category: "hackathon",
            location: "San Francisco, CA",
            audienceSize: 500,
            date: new Date("2024-06-15"),
            description:
              "A premier technology event bringing together innovators and industry leaders.",
            sponsorshipRequirements:
              "Looking for tech companies interested in innovation and startups.",
            bannerUrl:
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
            status: "published",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2",
            organizerId: "user-1",
            name: "Spring Music Festival",
            category: "cultural",
            location: "Austin, TX",
            audienceSize: 2000,
            date: new Date("2024-05-20"),
            description:
              "Annual spring music festival featuring local and international artists.",
            sponsorshipRequirements:
              "Seeking beverage and lifestyle brand sponsors.",
            bannerUrl:
              "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop",
            status: "published",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "3",
            organizerId: "user-1",
            name: "College Sports Championship",
            category: "sports",
            location: "Los Angeles, CA",
            audienceSize: 1500,
            date: new Date("2024-07-10"),
            description:
              "Inter-college sports championship with multiple sporting events.",
            sponsorshipRequirements:
              "Looking for sports brands and energy drink sponsors.",
            bannerUrl:
              "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
            status: "draft",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        setEvents(sampleEvents);
        setStats({
          totalEvents: sampleEvents.length,
          matches: 12,
          messages: 8,
          pendingDeliverables: 3,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEventClick = (eventId: string) => {
    router.push(`/organizer/events/${eventId}`);
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
    <div className="space-y-6 lg:space-y-8 p-4 lg:p-0">
      {/* Header */}
      <motion.div {...fadeInUp}>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Welcome back! Here's an overview of your events and activities.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div {...fadeInUp}>
          <StatsCard
            title="Total Events"
            value={stats.totalEvents}
            icon={Calendar}
            trend={{ value: 12, direction: "up" }}
          />
        </motion.div>

        <motion.div {...fadeInUp}>
          <StatsCard
            title="Matches"
            value={stats.matches}
            icon={Target}
            trend={{ value: 8, direction: "up" }}
          />
        </motion.div>

        <motion.div {...fadeInUp}>
          <StatsCard
            title="Messages"
            value={stats.messages}
            icon={MessageSquare}
          />
        </motion.div>

        <motion.div {...fadeInUp}>
          <StatsCard
            title="Pending Deliverables"
            value={stats.pendingDeliverables}
            icon={CheckSquare}
          />
        </motion.div>
      </motion.div>

      {/* Events Section */}
      <motion.div {...fadeInUp}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Events</h2>
          <button
            onClick={() => router.push("/organizer/create-event")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
          >
            Create New Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20">
            <Calendar size={40} className="sm:w-12 sm:h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              No events yet
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
              Create your first event to start finding sponsors
            </p>
            <button
              onClick={() => router.push("/organizer/create-event")}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-medium hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
            >
              Create Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event) => (
              <motion.div key={event.id} {...fadeInUp}>
                <EventCard
                  event={event}
                  onClick={() => handleEventClick(event.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
