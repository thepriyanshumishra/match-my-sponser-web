import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { LogoWall } from '@/components/landing/LogoWall';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated gradient orbs - extended throughout page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <LogoWall />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
