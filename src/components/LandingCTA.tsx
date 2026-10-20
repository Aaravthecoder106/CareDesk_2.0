'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Users, HeartPulse, ArrowRight, Play, Shield } from 'lucide-react';
import { UserRole } from '@/context/CareContext';

interface LandingCTAProps {
  onOpenSignup: (role: UserRole) => void;
}

export function LandingCTA({ onOpenSignup }: LandingCTAProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl antigravity-gradient text-white p-8 sm:p-14 shadow-2xl border border-white/30 text-center space-y-8 overflow-hidden">
          {/* Subtle luminous highlights */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md border border-white/30 text-white">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero-Risk Setup • Free for Families</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight antigravity-text-glow font-sans">
              Start Monitoring Your Parents With Total Confidence Today
            </h2>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              Join thousands of families turning anxious phone calls into effortless daily health telemetry. Choose your path below:
            </p>
          </div>

          {/* Dual Action Sign Up Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 relative z-10">
            <button
              onClick={() => onOpenSignup('caregiver')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl antigravity-btn-white text-sm sm:text-base flex items-center justify-center gap-2.5 font-extrabold shadow-xl"
            >
              <Users className="w-5 h-5 text-blue-700" />
              <span>Sign Up as Family Caregiver</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </button>

            <button
              onClick={() => onOpenSignup('patient')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl transition flex items-center justify-center gap-2 hover:scale-102"
            >
              <HeartPulse className="w-5 h-5" />
              <span>Sign Up as Senior / Patient</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 relative z-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-100 hover:text-white transition underline underline-offset-4"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Or jump directly into the interactive clinical demo (no registration needed)</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
