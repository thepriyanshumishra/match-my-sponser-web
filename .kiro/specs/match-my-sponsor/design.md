# Design Document

## Overview

Match My Sponsor is a Next.js-based web platform featuring a glassmorphism design aesthetic that connects event organizers with sponsors. The application follows a role-based architecture with two distinct user experiences: Event Organizer and Sponsor dashboards. The design emphasizes a premium, minimal macOS-style interface with transparent glass components, soft animations, and intuitive navigation.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (Next.js App Router + React Components + Tailwind CSS)     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│         (Route Handlers, Server Actions, Middleware)        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│              (Future: Supabase/Firebase)                    │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Language**: TypeScript
- **Backend**: Supabase (Free tier - PostgreSQL database, Authentication, Storage, Real-time subscriptions)
- **Email Service**: Resend (Free tier - 100 emails/day) or SendGrid (Free tier - 100 emails/day)
- **Image Optimization**: Cloudinary (Free tier - 25GB storage, 25GB bandwidth)
- **Analytics**: Vercel Analytics (Free tier)
- **Deployment**: Vercel (Free tier with unlimited bandwidth)

### Project Structure

```
match-my-sponsor/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── organizer/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── create-event/
│   │   │   └── page.tsx
│   │   ├── matches/
│   │   │   └── page.tsx
│   │   ├── chat/
│   │   │   └── page.tsx
│   │   ├── deliverables/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── sponsor/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── discover/
│   │   │   └── page.tsx
│   │   ├── chat/
│   │   │   └── page.tsx
│   │   ├── deliverables/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── sponsors/
│   │   ├── chat/
│   │   └── deliverables/
│   ├── layout.tsx
│   ├── page.tsx (landing page)
│   └── globals.css
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── LogoWall.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── StatsCard.tsx
│   │   └── EventCard.tsx
│   ├── organizer/
│   │   ├── EventForm.tsx
│   │   ├── SponsorCard.tsx
│   │   └── DeliverableUpload.tsx
│   ├── sponsor/
│   │   ├── EventDiscoveryCard.tsx
│   │   ├── DeliverableVerification.tsx
│   │   └── FilterPanel.tsx
│   ├── shared/
│   │   ├── GlassCard.tsx
│   │   ├── GlassButton.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── ChatBubble.tsx
│   │   └── ConversationList.tsx
│   └── ui/
│       ├── Input.tsx
│       ├── Button.tsx
│       └── Select.tsx
├── lib/
│   ├── utils.ts
│   ├── auth.ts
│   └── api-client.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useChat.ts
│   └── useMatching.ts
├── types/
│   ├── user.ts
│   ├── event.ts
│   ├── sponsor.ts
│   └── chat.ts
├── middleware.ts
├── tailwind.config.ts
└── package.json
```

## Components and Interfaces

### 1. Glass UI Component System

#### GlassCard Component

A reusable card component with glassmorphism styling.

**Props:**
```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}
```

**Styling:**
- Background: `bg-white/30` with backdrop blur
- Border: `border border-white/20`
- Border radius: `rounded-3xl` (24px)
- Shadow: `shadow-xl`
- Hover effect: Scale transform and shadow increase

#### GlassButton Component

A button component with glass styling and animations.

**Props:**
```typescript
interface GlassButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}
```

**Variants:**
- Primary: Solid gradient background with white text
- Secondary: Glass background with gradient text

### 2. Landing Page Components

#### Hero Component

**Structure:**
- Centered layout with max-width container
- Large heading (text-6xl) with gradient text
- Sub-heading (text-xl) with muted color
- Two CTA buttons (primary and secondary)
- Background: Pastel gradient with floating blob shapes
- Large glass card backdrop behind content

#### Features Component

**Structure:**
- Grid layout (3 columns on desktop, 1 on mobile)
- Three GlassCard components
- Each card contains:
  - Icon (Lucide icon, size 48px)
  - Title (text-2xl, font-semibold)
  - Description (text-base, text-gray-600)
- Framer Motion stagger animation on scroll

#### HowItWorks Component

**Structure:**
- Horizontal layout with 3 steps
- Each step as a GlassCard with:
  - Step number badge
  - Icon
  - Title
  - Description
- Arrow indicators between steps
- Fade-in animation on scroll

#### LogoWall Component

**Structure:**
- Horizontal glass bar spanning full width
- Flex layout with centered logos
- Placeholder logo images with grayscale filter
- Subtle scroll animation

#### FinalCTA Component

**Structure:**
- Large centered GlassCard
- Heading with call-to-action message
- Primary button linking to signup
- Gradient background overlay

#### Footer Component

**Structure:**
- Three-column layout (logo, links, copyright)
- Minimal styling with muted text
- Links: Terms, Privacy, Contact
- Responsive: Stack on mobile

### 3. Authentication Components

#### LoginForm Component

**Fields:**
- Email input
- Password input
- Remember me checkbox
- Submit button
- Link to signup page

**Styling:**
- Centered GlassCard container
- Form inputs with glass styling
- Validation error messages

#### SignupForm Component

**Fields:**
- Name input
- Email input
- Password input
- Confirm password input
- Role selection (radio buttons: Organizer / Sponsor)
- Submit button
- Link to login page

**Validation:**
- Email format validation
- Password strength requirements
- Password confirmation match
- Role selection required

### 4. Dashboard Components

#### Sidebar Component

**Props:**
```typescript
interface SidebarProps {
  role: 'organizer' | 'sponsor';
  activeRoute: string;
}
```

**Structure:**
- Fixed left sidebar with glass background
- Logo at top
- Navigation items with icons
- Active state highlighting
- Logout button at bottom

**Navigation Items:**
- Organizer: Dashboard, Create Event, Find Sponsors, Chat, Deliverables
- Sponsor: Dashboard, Discover Events, Chat, Deliverables

#### StatsCard Component

**Props:**
```typescript
interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}
```

**Structure:**
- GlassCard wrapper
- Icon with gradient background
- Large value display
- Title label
- Optional trend indicator

#### EventCard Component

**Props:**
```typescript
interface EventCardProps {
  event: Event;
  onClick?: () => void;
  showMatchScore?: boolean;
}
```

**Structure:**
- GlassCard wrapper
- Event banner image with gradient overlay
- Event title and category badge
- Key details: Date, location, audience size
- Optional match score badge
- Action button

### 5. Organizer-Specific Components

#### EventForm Component

**Fields:**
- Event name (text input)
- Category (select dropdown)
- Location (text input)
- Audience size (number input)
- Date (date picker)
- Description (textarea)
- Sponsorship requirements (textarea)
- Event banner (file upload with preview)

**Structure:**
- Single-page form in large GlassCard
- Section dividers
- Field labels with helper text
- Validation messages
- Submit and cancel buttons

**Validation:**
- All fields required except banner
- Date must be in future
- Audience size must be positive number

#### SponsorCard Component

**Props:**
```typescript
interface SponsorCardProps {
  sponsor: Sponsor;
  matchPercentage: number;
  onConnect?: () => void;
}
```

**Structure:**
- GlassCard wrapper
- Sponsor logo/avatar
- Company name and industry
- Match percentage badge with gradient
- Key details: Budget range, location
- "Connect" button

#### DeliverableUpload Component

**Props:**
```typescript
interface DeliverableUploadProps {
  deliverables: Deliverable[];
  onUpload: (id: string, file: File) => void;
  onToggle: (id: string) => void;
}
```

**Structure:**
- List of deliverable items
- Each item contains:
  - Checkbox for completion status
  - Deliverable title and description
  - Upload button
  - File preview (image or file name)
  - Upload status indicator

### 6. Sponsor-Specific Components

#### EventDiscoveryCard Component

**Props:**
```typescript
interface EventDiscoveryCardProps {
  event: Event;
  matchScore: number;
  onViewDetails: () => void;
}
```

**Structure:**
- Similar to EventCard but with sponsor-focused information
- Match score prominently displayed
- "View Details" button
- Quick stats: Audience, budget requirement

#### FilterPanel Component

**Props:**
```typescript
interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  filterType: 'sponsor' | 'event';
}
```

**Structure:**
- GlassCard container
- Filter sections with collapsible headers
- Checkbox groups for categories
- Range sliders for budget/audience
- Location search input
- "Apply Filters" and "Clear All" buttons

**Filter Types:**
- Sponsor filters: Industry, Budget Range, Location
- Event filters: Category, Audience, Location, Budget Distribution

#### DeliverableVerification Component

**Props:**
```typescript
interface DeliverableVerificationProps {
  deliverables: Deliverable[];
  onApprove: (id: string, notes?: string) => void;
  onReject: (id: string, notes: string) => void;
}
```

**Structure:**
- Grid layout for deliverable items
- Each item contains:
  - Deliverable title
  - Proof image gallery
  - Image lightbox on click
  - Notes textarea
  - Approve and Reject buttons
  - Status indicator

### 7. Shared Components

#### ChatWindow Component

**Props:**
```typescript
interface ChatWindowProps {
  conversationId: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
}
```

**Structure:**
- Two-panel layout (conversation list + chat window)
- Message list with scroll-to-bottom
- Glass bubble styling for messages
- Input field with send button
- Typing indicator
- Timestamp display

#### ChatBubble Component

**Props:**
```typescript
interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
}
```

**Styling:**
- Own messages: Right-aligned, gradient background
- Other messages: Left-aligned, glass background
- Rounded corners with tail
- Timestamp below bubble
- Read receipt indicator

#### ConversationList Component

**Props:**
```typescript
interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
}
```

**Structure:**
- Scrollable list of conversation items
- Each item shows:
  - Avatar
  - Name
  - Last message preview
  - Timestamp
  - Unread badge
- Active conversation highlighted
- Search bar at top

## Data Models

### User Model

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'organizer' | 'sponsor';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Event Model

```typescript
interface Event {
  id: string;
  organizerId: string;
  name: string;
  category: EventCategory;
  location: string;
  audienceSize: number;
  date: Date;
  description: string;
  sponsorshipRequirements: string;
  bannerUrl?: string;
  status: 'draft' | 'published' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

type EventCategory = 
  | 'college-fest'
  | 'competition'
  | 'sports'
  | 'hackathon'
  | 'cultural'
  | 'workshop';
```

### Sponsor Model

```typescript
interface Sponsor {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  budgetRange: {
    min: number;
    max: number;
  };
  location: string;
  logoUrl?: string;
  preferences: {
    categories: EventCategory[];
    audienceSize: {
      min: number;
      max: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Match Model

```typescript
interface Match {
  id: string;
  eventId: string;
  sponsorId: string;
  score: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
```

### Message Model

```typescript
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}
```

### Conversation Model

```typescript
interface Conversation {
  id: string;
  participants: string[]; // User IDs
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}
```

### Deliverable Model

```typescript
interface Deliverable {
  id: string;
  matchId: string;
  title: string;
  description: string;
  proofUrl?: string;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Styling System

### Tailwind Configuration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.3)',
          medium: 'rgba(255, 255, 255, 0.2)',
          dark: 'rgba(255, 255, 255, 0.1)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
    },
  },
  plugins: [],
};
```

### Glass Utility Classes

```css
/* globals.css */
.glass-card {
  @apply bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl shadow-glass;
}

.glass-button-primary {
  @apply bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105;
}

.glass-button-secondary {
  @apply bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300;
}

.glass-input {
  @apply bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all;
}

.gradient-text {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}
```

### Animation Presets

```typescript
// Framer Motion variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};
```

## Routing and Navigation

### Route Structure

```
/ (public)
├── /login (public)
├── /signup (public)
├── /organizer/* (protected, organizer only)
│   ├── /dashboard
│   ├── /create-event
│   ├── /matches
│   ├── /chat
│   └── /deliverables
└── /sponsor/* (protected, sponsor only)
    ├── /dashboard
    ├── /discover
    ├── /chat
    └── /deliverables
```

### Middleware Implementation

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get user session (implementation depends on auth solution)
  const session = getSession(request);
  
  // Protect organizer routes
  if (pathname.startsWith('/organizer')) {
    if (!session || session.role !== 'organizer') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Protect sponsor routes
  if (pathname.startsWith('/sponsor')) {
    if (!session || session.role !== 'sponsor') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/organizer/:path*', '/sponsor/:path*']
};
```

### Layout Hierarchy

```typescript
// app/layout.tsx (Root Layout)
- Global styles
- Font configuration
- Metadata

// app/organizer/layout.tsx (Organizer Layout)
- Sidebar with organizer navigation
- Main content area
- Role verification

// app/sponsor/layout.tsx (Sponsor Layout)
- Sidebar with sponsor navigation
- Main content area
- Role verification
```

## Error Handling

### Error Boundaries

Implement error boundaries for:
- Page-level errors
- Component-level errors
- API call failures

### Error Display

```typescript
interface ErrorDisplayProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

Display errors in GlassCard with:
- Error icon
- Title and message
- Optional retry action
- Link to go back

### Validation Errors

- Inline field validation
- Form-level error summary
- Toast notifications for async errors

## Testing Strategy

### Unit Testing

**Focus Areas:**
- Utility functions (matching algorithm, date formatting)
- Form validation logic
- Data transformation functions

**Tools:** Jest, React Testing Library

### Component Testing

**Focus Areas:**
- Glass UI components render correctly
- Props are handled properly
- User interactions trigger correct callbacks
- Conditional rendering works

**Tools:** React Testing Library, Jest

### Integration Testing

**Focus Areas:**
- Authentication flow (signup → login → dashboard)
- Event creation flow
- Chat functionality
- Deliverables upload and verification

**Tools:** Playwright or Cypress

### E2E Testing

**Critical Paths:**
1. Organizer: Signup → Create Event → Find Sponsors → Chat → Upload Deliverables
2. Sponsor: Signup → Discover Events → Chat → Verify Deliverables

**Tools:** Playwright

## Performance Considerations

### Optimization Strategies

1. **Image Optimization**
   - Use Next.js Image component
   - Lazy load images below fold
   - Optimize banner uploads

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting (automatic with App Router)

3. **Caching**
   - Cache static assets
   - Implement SWR for data fetching
   - Cache API responses

4. **Animation Performance**
   - Use CSS transforms for animations
   - Limit backdrop-blur usage on mobile
   - Reduce motion for accessibility

## Accessibility

### WCAG Compliance

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast ratios (4.5:1 minimum)
- Alt text for images
- Form labels and error messages

### Glass UI Accessibility Considerations

- Ensure text contrast on glass backgrounds
- Provide fallback styles for reduced transparency
- Test with screen readers
- Support prefers-reduced-motion

## Deployment

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Environment Variables

```
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_API_URL=
AUTH_SECRET=
DATABASE_URL=
STORAGE_BUCKET=
```

### Build Optimization

- Enable SWC minification
- Optimize fonts
- Compress images
- Generate static pages where possible

## Backend Architecture with Supabase

### Why Supabase (Best Free Backend Solution)

Supabase is the ideal free backend for this demo project because it provides:

1. **PostgreSQL Database**: Full-featured relational database with 500MB storage (free tier)
2. **Authentication**: Built-in auth with email/password, OAuth providers, and JWT tokens
3. **Real-time Subscriptions**: WebSocket-based real-time updates for chat and notifications
4. **Storage**: File storage for event banners and deliverable uploads (1GB free)
5. **Row Level Security**: Built-in security policies for role-based access
6. **Auto-generated APIs**: REST and GraphQL APIs generated automatically
7. **Edge Functions**: Serverless functions for custom logic (free tier available)

### Supabase Setup

```bash
# Install Supabase client
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Database Schema

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('organizer', 'sponsor')) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES profiles(id) NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  audience_size INTEGER NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  sponsorship_requirements TEXT NOT NULL,
  banner_url TEXT,
  status TEXT CHECK (status IN ('draft', 'published', 'completed', 'archived')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsors table
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,
  location TEXT NOT NULL,
  logo_url TEXT,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) NOT NULL,
  sponsor_id UUID REFERENCES sponsors(id) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, sponsor_id)
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_1 UUID REFERENCES profiles(id) NOT NULL,
  participant_2 UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(participant_1, participant_2)
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) NOT NULL,
  sender_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deliverables table
CREATE TABLE deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  proof_url TEXT,
  status TEXT CHECK (status IN ('pending', 'uploaded', 'approved', 'rejected')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  item_type TEXT CHECK (item_type IN ('event', 'sponsor')) NOT NULL,
  item_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- Saved searches table
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  name TEXT NOT NULL,
  filters JSONB NOT NULL,
  search_type TEXT CHECK (search_type IN ('events', 'sponsors')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- RLS Policies (examples)
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Organizers can create events" ON events
  FOR INSERT WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (status = 'published' OR organizer_id = auth.uid());
```

### Supabase Client Configuration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Real-time Subscriptions

```typescript
// Example: Subscribe to new messages
supabase
  .channel('messages')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      // Handle new message
      console.log('New message:', payload.new);
    }
  )
  .subscribe();
```

## Advanced Features Implementation

### 1. AI-Powered Matching Algorithm

```typescript
// lib/matching-algorithm.ts
interface MatchFactors {
  categoryAlignment: number;
  budgetCompatibility: number;
  audienceSizeFit: number;
  locationProximity: number;
  historicalSuccess: number;
}

export function calculateMatchScore(
  event: Event,
  sponsor: Sponsor,
  historicalData?: any
): { score: number; breakdown: MatchFactors } {
  const weights = {
    category: 0.3,
    budget: 0.25,
    audience: 0.2,
    location: 0.15,
    historical: 0.1
  };

  // Category alignment
  const categoryScore = sponsor.preferences.categories.includes(event.category) ? 100 : 0;

  // Budget compatibility
  const eventBudget = estimateEventBudget(event);
  const budgetScore = calculateBudgetFit(eventBudget, sponsor.budgetRange);

  // Audience size fit
  const audienceScore = calculateAudienceFit(
    event.audienceSize,
    sponsor.preferences.audienceSize
  );

  // Location proximity
  const locationScore = calculateLocationScore(event.location, sponsor.location);

  // Historical success (if available)
  const historicalScore = historicalData ? calculateHistoricalScore(historicalData) : 50;

  const breakdown: MatchFactors = {
    categoryAlignment: categoryScore,
    budgetCompatibility: budgetScore,
    audienceSizeFit: audienceScore,
    locationProximity: locationScore,
    historicalSuccess: historicalScore
  };

  const totalScore = 
    categoryScore * weights.category +
    budgetScore * weights.budget +
    audienceScore * weights.audience +
    locationScore * weights.location +
    historicalScore * weights.historical;

  return { score: Math.round(totalScore), breakdown };
}
```

### 2. Real-time Notifications Component

```typescript
// components/shared/NotificationBell.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Subscribe to new notifications
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative">
      <button className="glass-button-secondary relative">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
```

### 3. Analytics Dashboard Component

```typescript
// components/dashboard/AnalyticsSection.tsx
import { Line, Bar } from 'react-chartjs-2';

export function AnalyticsSection({ data, role }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4">Match Success Rate</h3>
        <Line data={data.matchSuccessData} options={chartOptions} />
      </GlassCard>
      
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4">Engagement Metrics</h3>
        <Bar data={data.engagementData} options={chartOptions} />
      </GlassCard>
      
      {role === 'sponsor' && (
        <GlassCard className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">ROI Estimates</h3>
          <div className="grid grid-cols-3 gap-4">
            <StatCard title="Total Investment" value={`$${data.totalInvestment}`} />
            <StatCard title="Estimated Reach" value={data.estimatedReach} />
            <StatCard title="ROI" value={`${data.roi}%`} />
          </div>
        </GlassCard>
      )}
    </div>
  );
}
```

### 4. Advanced Search with Autocomplete

```typescript
// components/shared/SearchBar.tsx
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar({ onSearch, type }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      fetchSuggestions(debouncedQuery, type).then(setSuggestions);
    }
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="glass-input w-full"
        placeholder="Search..."
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full glass-card">
          {suggestions.map(item => (
            <button
              key={item.id}
              onClick={() => onSearch(item)}
              className="w-full text-left px-4 py-2 hover:bg-white/20"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Performance Optimization Strategies

### 1. Image Optimization with Cloudinary

```typescript
// lib/cloudinary.ts
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif';
  } = {}
) {
  const { width, height, quality = 'auto', format = 'auto' } = options;
  
  const transformations = [
    width && `w_${width}`,
    height && `h_${height}`,
    `q_${quality}`,
    `f_${format}`,
    'c_fill'
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}
```

### 2. Code Splitting and Lazy Loading

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const AnalyticsSection = dynamic(() => import('@/components/dashboard/AnalyticsSection'), {
  loading: () => <AnalyticsSkeleton />,
  ssr: false
});

const ChatWindow = dynamic(() => import('@/components/shared/ChatWindow'), {
  loading: () => <ChatSkeleton />
});
```

### 3. React Query for Data Caching

```typescript
// lib/react-query.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Usage in components
const { data: events } = useQuery({
  queryKey: ['events', filters],
  queryFn: () => fetchEvents(filters),
});
```

### 4. Service Worker for PWA

```javascript
// public/sw.js
const CACHE_NAME = 'match-my-sponsor-v1';
const urlsToCache = [
  '/',
  '/login',
  '/signup',
  '/offline'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => caches.match('/offline'))
  );
});
```

### 5. Next.js Configuration for Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  swcMinify: true,
};
```

## Future Enhancements

1. **Payment Integration**: Stripe for escrow and payment processing
2. **Mobile App**: React Native version with shared business logic
3. **Multi-language Support**: i18n implementation with next-intl
4. **Video Calls**: Integration with Daily.co or Whereby for sponsor meetings
5. **Contract Management**: Digital contract signing with DocuSign API
6. **Advanced Analytics**: Integration with Google Analytics 4 and custom event tracking
7. **Social Sharing**: Open Graph meta tags and social media integration
