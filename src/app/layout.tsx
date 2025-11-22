import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: "Match My Sponsor - Connect Events with Sponsors",
  description: "A modern platform connecting event organizers with sponsors. Find the perfect match for your event or discover sponsorship opportunities.",
  keywords: ['event sponsorship', 'sponsor matching', 'event organizer', 'sponsor platform'],
  authors: [{ name: 'Match My Sponsor' }],
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global animated background - lazy loaded */}
        <div className="fixed inset-0 pointer-events-none z-0" style={{willChange: 'transform'}}>
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full filter blur-3xl opacity-30 animate-blob" style={{transform: 'translateZ(0)'}} />
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" style={{transform: 'translateZ(0)'}} />
          <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000" style={{transform: 'translateZ(0)'}} />
        </div>
        
        <div className="relative z-10">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}