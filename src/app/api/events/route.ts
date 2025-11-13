import { NextRequest, NextResponse } from 'next/server';
import { Event, EventCategory, EventStatus } from '@/types/event';

// Mock database - in production, this would be replaced with actual database calls
let mockEvents: Event[] = [];

export async function GET(request: NextRequest) {
  try {
    // TODO: Get user ID from session
    const userId = 'user-1'; // Mock user ID

    // Filter events by organizer
    const userEvents = mockEvents.filter(event => event.organizerId === userId);

    return NextResponse.json(userEvents, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'name',
      'category',
      'location',
      'audienceSize',
      'date',
      'description',
      'sponsorshipRequirements',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate category
    const validCategories: EventCategory[] = [
      'college-fest',
      'competition',
      'sports',
      'hackathon',
      'cultural',
      'workshop',
    ];

    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: 'Invalid event category' },
        { status: 400 }
      );
    }

    // Validate audience size
    if (typeof body.audienceSize !== 'number' || body.audienceSize <= 0) {
      return NextResponse.json(
        { error: 'Audience size must be a positive number' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const eventDate = new Date(body.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDate < today) {
      return NextResponse.json(
        { error: 'Event date must be in the future' },
        { status: 400 }
      );
    }

    // TODO: Get user ID from session
    const userId = 'user-1'; // Mock user ID

    // Create new event
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      organizerId: userId,
      name: body.name,
      category: body.category,
      location: body.location,
      audienceSize: body.audienceSize,
      date: eventDate,
      description: body.description,
      sponsorshipRequirements: body.sponsorshipRequirements,
      bannerUrl: body.bannerUrl,
      status: 'published' as EventStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to mock database
    mockEvents.push(newEvent);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
