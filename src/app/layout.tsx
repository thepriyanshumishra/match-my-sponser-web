import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global animated background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
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
