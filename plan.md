🎯 MATCH MY SPONSOR – PROJECT PLAN

A complete planning document for the design, architecture, features, UI, UX, and development of the Match My Sponsor platform.

🧩 1. Project Overview

Match My Sponsor is a web platform that connects event organizers (college fests, competitions, sports events, hackathons, cultural events, workshops) with potential sponsors (brands, businesses, startups, local shops).

The platform consists of:

A transparent glass, macOS-style minimal landing page

Two dashboards

Event Organizer Dashboard

Sponsor Dashboard

Matching, chat, deliverables system

Minimal, premium UI using Next.js + Tailwind + Glassmorphism

🎨 2. Visual Design Philosophy

The entire website will follow a transparent glass macOS aesthetic, inspired by:

macOS Sonoma/Big Sur UI

Soft blurs, translucency

Pastel gradients

Deep, soft shadows

Smooth micro-interactions

Rounded corners (20–24px)

Design Rules

High readability with clean sans-serif fonts

Subtle gradients, never loud colors

No clutter

Every card = frosted glass

Calm, premium, Apple-like feel

Consistent spacing & visual rhythm

Light mode primary (Dark can be added later)

🧱 3. Tech Stack
Frontend

Next.js (App Router)

Tailwind CSS

Framer Motion (animations)

React Icons / Lucide Icons

TypeScript (optional)

Backend

Next.js API routes (for now)

Future: Supabase/Firebase integrations

Deployment

Vercel (auto deployments via GitHub)

🌐 4. Site Structure
Pages
/ (Landing Page)
/login
/signup
/organizer/dashboard
/organizer/create-event
/organizer/matches
/organizer/chat
/organizer/deliverables
/sponsor/dashboard
/sponsor/discover
/sponsor/chat
/sponsor/deliverables

Organizers and sponsors see different dashboards based on their role.

🖥️ 5. Landing Page Final Design

The landing page is minimal, premium, and clean with 5 main sections.

5.1 Hero Section (Centered Minimal Apple-Style)

Large headline in center

Sub-headline below

Primary CTA button ("Get Started")

Secondary CTA button ("Learn More")

Light pastel gradient background

Big frosted-glass card behind text

Subtle floating shapes / blobs

5.2 Features Section (3 Glass Cards)

Three floating transparent tiles:

Create Your Event

Get Sponsor Matches

Manage Communication & Deliverables

Each card includes:

Icon

Title

Short description

5.3 How It Works (3-Step Horizontal Process)

Three steps shown side-by-side on glass cards:

Create Event

Get Matched

Connect & Collaborate

Minimal icons + micro animations.

5.4 Logo Wall (Glass Bar)

Frosted glass horizontal bar

Placeholder logos (Sponsors / Colleges)

Creates instant trust & credibility

5.5 Final CTA Section (Centered Glass Box)

A large frosted-glass card with:

One-line message

Primary CTA to sign-up

5.6 Minimal Footer

Only:

Logo

Copyright

Links (Terms, Privacy, Contact)

🧭 6. Dashboard Structure (Shared for Both Roles)

Both dashboards share:

A left glass sidebar

A clean content area on the right

Floating tiles

Subtle animations

Sidebar Items Example

For Organizers:

Dashboard

Create Event

Find Sponsors

Chat

Deliverables

For Sponsors:

Dashboard

Discover Events

Chat

Deliverables

🟦 7. Organizer Dashboard (Detailed)
7.1 Organizer Home

Stats Section (glass cards):

Total Events

Matches

Messages

Pending Deliverables

Event Cards Grid (transparent cards)

7.2 Create Event Page

A single-page frosted-glass form with fields:

Event Name

Category

Location

Audience Size

Date

Description

Sponsorship Requirements

Event Banner Upload

Minimal UI, clean spacing.

7.3 Find Sponsors (Split View)

Left side:

Filters (Industry, Budget Range, Location)

Right side:

Sponsor Cards (glass tiles)

Match percentage

7.4 Chat Page

WhatsApp-like layout:

Left: Conversation List

Right: Chat Window

Glass chat bubbles

Smooth micro-interactions

7.5 Deliverables Upload

Checklist-based:

Each deliverable item with:

Checkbox

Upload button

Uploaded preview

Clean & functional.

🟩 8. Sponsor Dashboard (Detailed)
8.1 Sponsor Home

Stats Section:

Events Matched

Pending Approvals

Messages

Recommended Events (glass cards grid)

8.2 Discover Events (Split View)

Left Filters:

Category

Audience

Location

Budget Distribution

Right Results:

Transparent event cards

"View Details" button

Match Score

8.3 Chat Page

Same UI as organizer chat (shared component):

Sidebar conversations

Glass bubbles

8.4 Deliverables Verification

Checklist + proof gallery:

View proof images

Approve / Reject

Notes for organizer

Simple, professional.

🔐 9. Security + Role-Based Access

Organizer sees only organizer pages

Sponsor sees only sponsor pages

Role stored in DB / Auth state

Protected routes using middleware

🚀 10. Phase-Wise Development Roadmap
Phase 1 — Setup

Initialize Next.js + Tailwind

File & folder structure

Layout + glass utilities

Basic routing

Phase 2 — Landing Page

Hero

Features

How It Works

Logo Wall

CTA

Footer

Phase 3 — Auth

Login / Signup

Role selection

Phase 4 — Organizer Dashboard

Dashboard

Event creation

Match page

Chat

Deliverables upload

Phase 5 — Sponsor Dashboard

Dashboard

Discover events

Chat

Deliverables verification

Phase 6 — Polishing + Deployment

Animations

Responsive layouts

Vercel connection

Auto deploy

🎉 11. Final Deliverables for Hackathon

Fully deployed website

Two dashboards

Clean glass UI

Presentation / pitch deck

GitHub repo with README & PLAN

Demo-ready flows

🏁 12. Future Features (Post-hackathon)

AI matching engine

Organizer and sponsor verification

Payment / escrow

Analytics dashboard

Multi-event management

Sponsor ROI reports

Mobile app version
