import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { LogoWall } from '@/components/landing/LogoWall';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e]">
      <Hero />
      <Features />
      <HowItWorks />
      <LogoWall />
      <FinalCTA />
      <Footer />
    </div>
  );
}
