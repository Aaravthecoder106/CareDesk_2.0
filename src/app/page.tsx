'use client';

import React, { useState } from 'react';
import { UserRole } from '@/context/CareContext';
import { LandingNav } from '@/components/LandingNav';
import { LandingHero } from '@/components/LandingHero';
import { PersonaComparison } from '@/components/PersonaComparison';
import { LandingFeatures } from '@/components/LandingFeatures';
import { LandingSecurity } from '@/components/LandingSecurity';
import { LandingTestimonials } from '@/components/LandingTestimonials';
import { LandingCTA } from '@/components/LandingCTA';
import { LandingFooter } from '@/components/LandingFooter';
import { SignupModal } from '@/components/SignupModal';

export default function HomePage() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupRole, setSignupRole] = useState<UserRole>('caregiver');

  const handleOpenSignup = (role: UserRole = 'caregiver') => {
    setSignupRole(role);
    setIsSignupOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white relative">
      {/* Liquid Glass Navigation */}
      <LandingNav onOpenSignup={handleOpenSignup} />

      {/* Main Content Area */}
      <main className="flex-1 space-y-6">
        {/* Hero Section with Motion Graphics & Dual Persona Switcher */}
        <LandingHero onOpenSignup={handleOpenSignup} />

        {/* Dual Roles Breakdown (Patient vs Caregiver) */}
        <PersonaComparison onSelectRole={handleOpenSignup} />

        {/* Bento Grid: Clinical Features, Deterministic Parser, Bilingual AI */}
        <LandingFeatures />

        {/* Security, Row Level Protection, & HIPAA-Grade Audit Trail */}
        <LandingSecurity />

        {/* Authentic Family Stories */}
        <LandingTestimonials />

        {/* Final High-Impact Dual-Action CTA */}
        <LandingCTA onOpenSignup={handleOpenSignup} />
      </main>

      {/* Footer */}
      <LandingFooter />

      {/* Dual Persona Liquid Glass Signup Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        initialRole={signupRole}
      />
    </div>
  );
}
