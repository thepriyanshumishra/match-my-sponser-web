import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { LogoWall } from '@/components/landing/LogoWall';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-200 rotate-45 mix-blend-multiply filter blur-2xl opacity-50 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-green-200 transform rotate-12 mix-blend-multiply filter blur-xl opacity-60 animate-wiggle"></div>
        <div className="absolute top-2/3 right-1/6 w-16 h-4 bg-orange-200 rounded-full mix-blend-multiply filter blur-lg opacity-40 animate-stretch"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-particle-1"></div>
        <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-particle-2"></div>
        <div className="absolute bottom-1/3 left-2/3 w-4 h-4 bg-pink-400 rounded-full opacity-40 animate-particle-3"></div>
        
        {/* Gradient Lines */}
        <div className="absolute top-1/2 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent filter blur-sm opacity-30 animate-drift"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent filter blur-sm opacity-35 animate-drift-reverse"></div>
      </div>
      <Hero />
      <Features />
      <HowItWorks />
      <LogoWall />
      <FinalCTA />
      <Footer />
    </div>
  );
}
