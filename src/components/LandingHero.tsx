'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  HeartPulse,
  PhoneCall,
  Play,
  Zap,
} from 'lucide-react';
import { UserRole } from '@/context/CareContext';
import { MotionTelemetryPreview } from './MotionTelemetryPreview';

interface LandingHeroProps {
  onOpenSignup: (role?: UserRole) => void;
}

export function LandingHero({ onOpenSignup }: LandingHeroProps) {
  const [activePersona, setActivePersona] = useState<UserRole>('caregiver');

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden antigravity-flow-animated text-white shadow-2xl">
      {/* Soft atmospheric radial bloom overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Persona Toggle & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 text-xs font-semibold text-white shadow-sm mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
              <span className="font-extrabold tracking-wide uppercase text-[11px] text-white">CareDesk 2.0</span>
              <span className="text-white/40">•</span>
              <span className="text-blue-100">Remote Elder-Care Telemetry</span>
            </div>

            {/* Editorial Title - Clean white geometric typography matching the Antigravity image */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-tight text-white leading-[1.06] antigravity-text-glow font-sans">
              Cared for like family.{' '}
              <span className="block text-sky-200 font-extrabold">
                Tracked like critical telemetry.
              </span>
            </h1>

            {/* Empathetic Subheading */}
            <p className="text-base sm:text-lg text-blue-100/95 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Living miles away shouldn&apos;t mean living in constant anxiety over your aging parents&apos; blood pressure and blood sugar. CareDesk gives you instant traffic-light clarity, deterministic vitals safety, and bilingual Hinglish report summaries.
            </p>

            {/* Dual Persona Switcher Segment */}
            <div className="p-1.5 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/30 w-fit mx-auto lg:mx-0 shadow-lg">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActivePersona('caregiver')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activePersona === 'caregiver'
                      ? 'bg-white text-blue-700 shadow-md font-extrabold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>I am a Family Caregiver</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePersona('patient')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activePersona === 'patient'
                      ? 'bg-teal-400 text-slate-950 shadow-md font-extrabold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>I am an Elder / Patient</span>
                </button>
              </div>
            </div>

            {/* Persona Dynamic Micro-Description */}
            <div className="text-xs text-blue-100/90 max-w-lg mx-auto lg:mx-0 flex items-center justify-center lg:justify-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
              <span>
                {activePersona === 'caregiver'
                  ? 'Optimized for sons, daughters, and remote doctors with automated alerts.'
                  : 'Optimized for seniors with large buttons, 1-tap SOS, and zero tech hassle.'}
              </span>
            </div>

            {/* Action Buttons - Pure White Antigravity Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onOpenSignup(activePersona)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl antigravity-btn-white text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl font-bold"
              >
                <span>Sign Up as {activePersona === 'caregiver' ? 'Family Caregiver' : 'Senior / Patient'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl antigravity-btn-glass text-sm sm:text-base flex items-center justify-center gap-2 font-bold"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Open Live Demo</span>
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-white/20 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-blue-100/90 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-300" />
                <span>Deterministic Validation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Hinglish + English AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-rose-300" />
                <span>1-Tap Emergency SOS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Motion Telemetry Liquid Card (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <MotionTelemetryPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
