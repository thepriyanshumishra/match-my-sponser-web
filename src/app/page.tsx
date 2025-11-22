import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { LogoWall } from '@/components/landing/LogoWall';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

// Optimize for FCP
export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100">
      {/* Critical above-fold content first */}
      <div className="above-fold">
        <Hero />
      </div>
      
      {/* Deferred background animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{willChange: 'transform'}}>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{transform: 'translateZ(0)'}}></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" style={{transform: 'translateZ(0)'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" style={{transform: 'translateZ(0)'}}></div>
      </div>
      
      {/* Below-fold content */}
      <div className="critical-resource">
        <Features />
        <HowItWorks />
        <LogoWall />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
