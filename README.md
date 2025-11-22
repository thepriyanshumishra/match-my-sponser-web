# 🎯 Match My Sponsor

A modern web platform connecting event organizers with sponsors, featuring a premium glassmorphism UI inspired by macOS design.

## ✨ Features

- 🎨 **Premium Glass UI** - macOS-inspired glassmorphism design
- 🔐 **Role-Based Access** - Separate dashboards for Organizers and Sponsors
- 🤝 **Smart Matching** - AI-powered sponsor-event matching algorithm
- 💬 **Real-Time Chat** - WhatsApp-like messaging system
- 📊 **Analytics Dashboard** - Track performance and ROI
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **PWA Support** - Installable as a mobile app
- ♿ **Accessible** - WCAG 2.1 Level AA compliant
- 🆓 **100% FREE Backend** - No monthly costs, perfect for MVPs

## 🆓 Why 100% Free?

This project is designed to be **completely free to run** using only free tier services:

- **Supabase Free**: 500MB database + 1GB storage + 50K users
- **Vercel Free**: Unlimited deployments + analytics
- **No Email Costs**: In-app notifications + browser push
- **No CDN Costs**: Next.js image optimization + compression

Perfect for:
- 🏆 **Hackathons** - Deploy without spending money
- 🚀 **MVPs** - Validate ideas before investing
- 🎓 **Learning** - Build real projects without costs
- 💼 **Portfolios** - Showcase full-stack skills

## 🛠️ Tech Stack (100% FREE)

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Backend**: Supabase Free Tier (500MB DB, 1GB Storage, 50K MAU)
- **Deployment**: Vercel Hobby Plan (Free)
- **Notifications**: In-app + Browser Push (Free)
- **Analytics**: Vercel Analytics Free or Custom Supabase
- **Images**: Next.js Optimization + Client-side Compression (Free)

**Total Monthly Cost: $0** 🎉

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd match-my-sponsor
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your FREE credentials:
- Supabase URL and Anon Key (from [supabase.com](https://supabase.com) - FREE tier)
- Or set `NEXT_PUBLIC_USE_LOCALSTORAGE=true` for localStorage-only mode

**For complete free setup guide, see [FREE_BACKEND_SETUP.md](./FREE_BACKEND_SETUP.md)**

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 🎯 Quick Demo Access

Use these credentials to test the platform immediately:

**Organizer Account:**
- Email: `test.organizer@test.com`
- Password: `iamorganizer`

**Sponsor Account:**
- Email: `test.sponser@test.com`
- Password: `iamsponser`

Or click the demo buttons on the login page for instant access!

## 🎯 What Currently Works

- ✅ **Landing Page** - Glassmorphism design with all sections
- ✅ **Authentication** - Signup/login with role selection
- ✅ **Organizer Dashboard** - Stats, events, create event form
- ✅ **Sponsor Dashboard** - Recommended events, discovery page
- ✅ **Match Scores** - AI-powered matching algorithm
- ✅ **Real-time Chat** - Full messaging system with Supabase
- ✅ **Match Creation** - Connect buttons create actual matches
- ✅ **Supabase Integration** - Full backend integration
- ✅ **Responsive Design** - Works on all devices

## 🚧 In Development

- Deliverables management
- Analytics dashboard
- Profile settings
- Email notifications

## 📁 Project Structure

```
match-my-sponsor/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── organizer/         # Organizer dashboard pages
│   │   ├── sponsor/           # Sponsor dashboard pages
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── landing/           # Landing page sections
│   │   ├── dashboard/         # Shared dashboard components
│   │   ├── organizer/         # Organizer-specific components
│   │   ├── sponsor/           # Sponsor-specific components
│   │   ├── shared/            # Shared components
│   │   └── ui/                # UI primitives
│   ├── lib/                   # Utility functions
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript type definitions
└── public/                    # Static assets
```

## 🎨 Design System

The project features a custom glassmorphism design system inspired by modern macOS interfaces:

### UI Components
- Frosted glass cards with backdrop blur
- Gradient buttons and interactive elements
- Glass-styled form inputs
- Smooth animations and transitions

### Color Palette
- Primary Gradient: `#667eea` → `#764ba2`
- Glass Backgrounds: Semi-transparent white with blur
- Typography: High-contrast dark text on light backgrounds

## 📝 Development Workflow

### Git Workflow

```bash
git add .
git commit -m "feat: description of changes"
git push origin main
```

### Development Phases

- ✅ Project Setup & Configuration
- ✅ Glass UI Component Library
- ✅ Landing Page
- ✅ Authentication System
- ✅ Dashboard Implementation
- ✅ Matching Algorithm
- 🚧 Real-time Chat (In Progress)
- 📋 Analytics & Reporting (Planned)

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically deploy on every push to main branch.

## 📚 Documentation

- [FREE Backend Setup](./FREE_BACKEND_SETUP.md) - **Complete free setup guide**
- [Project Plan](./plan.md) - Original project planning document
- [Implementation Tasks](./task.md) - Detailed task breakdown (free-focused)

## 👨‍💻 Author

Developed by Priyanshu

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Design inspired by macOS Sonoma/Big Sur
- Built with Next.js and Supabase
- Icons by Lucide

---

**Project Status**: Production Ready 🎉 (MVP Complete)

**Current Features**:
- ✅ Glassmorphism UI with macOS-inspired design
- ✅ Role-based authentication (Organizer/Sponsor)
- ✅ Event creation and management
- ✅ Smart matching algorithm with scoring
- ✅ Sponsor discovery with advanced filters
- ✅ Real-time chat system with Supabase
- ✅ Match creation and management
- ✅ Full backend integration
- ✅ Responsive design for all devices

**Upcoming Features**:
- 📊 Analytics dashboard
- 📁 Deliverables management
- 🔔 Email notifications
- 👤 Profile settings

Built with ❤️ for connecting event organizers with sponsors
