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

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Real-time)
- **Deployment**: Vercel
- **Email**: Resend (100 emails/day free)
- **Images**: Cloudinary (25GB free)

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

Edit `.env.local` and add your credentials:
- Supabase URL and Anon Key (from [supabase.com](https://supabase.com))
- Cloudinary Cloud Name (optional)
- Resend API Key (optional)

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

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
├── public/                    # Static assets
└── .kiro/specs/              # Project specifications
```

## 🎨 Design System

### Glass UI Components

The project uses a custom glassmorphism design system with:
- `.glass-card` - Frosted glass cards
- `.glass-button-primary` - Gradient buttons
- `.glass-button-secondary` - Glass buttons
- `.glass-input` - Glass-styled inputs
- `.gradient-text` - Gradient text effect

### Color Palette

- Primary Gradient: `#667eea` → `#764ba2`
- Glass Backgrounds: `rgba(255, 255, 255, 0.2-0.3)`
- Text: Dark on light glass backgrounds

## 📝 Development Workflow

### Git Commit Guidelines

After completing each phase:

```bash
git add .
git commit -m "Phase X: Brief description"
git push origin main
```

### Recommended Commit Points

- ✅ After Phase 1 (Setup) - **COMPLETED**
- After Phase 2 (Glass UI components)
- After Phase 3 (Landing page)
- After Phase 4 (Authentication)
- And so on...

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

- [Project Plan](./plan.md) - Original project planning document
- [Requirements](./.kiro/specs/match-my-sponsor/requirements.md) - Detailed requirements
- [Design Document](./.kiro/specs/match-my-sponsor/design.md) - Technical design
- [Implementation Tasks](./.kiro/specs/match-my-sponsor/tasks.md) - Task breakdown

## 🤝 Contributing

This is a hackathon/demo project. Feel free to fork and customize!

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by macOS Sonoma/Big Sur
- Built with Next.js and Supabase
- Icons by Lucide

---

**Current Status**: Phase 1 Complete ✅ - Project initialized with Next.js, Tailwind CSS, and all dependencies configured.

**Next Steps**: Start Phase 2 - Build Glass UI component library
