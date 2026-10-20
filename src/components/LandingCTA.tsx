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
        <div className="relative rounded-3xl liquid-glass bg-gradient-to-r from-blue-600/90 via-indigo-700/90 to-purple-800/90 text-white p-8 sm:p-14 shadow-2xl border border-white/20 text-center space-y-8 overflow-hidden">
          {/* Animated decorative glowing circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-blue-100">
              <Shield className="w-3.5 h-3.5" />
              <span>Zero-Risk Setup • Free for Families</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Start Monitoring Your Parents With Total Confidence Today
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 max-w-xl mx-auto leading-relaxed">
              Join thousands of families turning anxious phone calls into effortless daily health telemetry. Choose your path below:
            </p>
          </div>

          {/* Dual Action Sign Up Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenSignup('caregiver')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-blue-50 text-blue-900 font-extrabold text-sm sm:text-base shadow-xl transition flex items-center justify-center gap-2 hover:scale-102"
            >
              <Users className="w-5 h-5 text-blue-700" />
              <span>Sign Up as Family Caregiver</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </button>

            <button
              onClick={() => onOpenSignup('patient')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-extrabold text-sm sm:text-base shadow-xl transition flex items-center justify-center gap-2 hover:scale-102"
            >
              <HeartPulse className="w-5 h-5" />
              <span>Sign Up as Senior / Patient</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 hover:text-white transition underline underline-offset-4"
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
