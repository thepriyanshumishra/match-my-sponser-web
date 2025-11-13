import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#667eea',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://qmbaavofgutyktmeivaf.supabase.co" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
