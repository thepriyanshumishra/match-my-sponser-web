'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/shared/GlassCard';
import { GlassButton } from '@/components/shared/GlassButton';

export function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Pastel gradient background with floating blob shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] opacity-60" />
      
      {/* Floating blob shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-40 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Large glass card backdrop */}
      <div className="relative z-10 w-full max-w-6xl">
        <GlassCard blur="lg" padding="lg" className="backdrop-blur-2xl">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Large heading with gradient text */}
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent leading-tight"
              variants={fadeInUp}
            >
              Match My Sponsor
            </motion.h1>

            {/* Sub-heading with muted color */}
            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Connect event organizers with perfect sponsors. Streamline sponsorship discovery, 
              communication, and deliverables management—all in one beautiful platform.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <GlassButton
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = '/signup')}
              >
                Get Started
              </GlassButton>
              <GlassButton
                variant="secondary"
                size="lg"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </GlassButton>
            </motion.div>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
