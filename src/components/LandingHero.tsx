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
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      {/* Dynamic Ambient Fluid Meshes in Background */}
      <div className="ambient-glow-teal -top-20 -left-20" />
      <div className="ambient-glow-rose top-1/3 -right-20" />
      <div className="ambient-glow-indigo bottom-0 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Persona Toggle & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/80 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <span className="text-blue-700 dark:text-blue-400 font-bold">CareDesk 2.0</span>
              <span className="text-slate-400">•</span>
              <span>Next-Gen Remote Elder-Care Architecture</span>
            </div>

            {/* Editorial Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Cared for like family.{' '}
              <span className="iridescent-text block sm:inline">
                Tracked like critical telemetry.
              </span>
            </h1>

            {/* Empathetic, Non-AI Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Living miles away shouldn&apos;t mean living in constant anxiety over your aging parents&apos; blood pressure and sugar. CareDesk gives you instant traffic-light clarity, deterministic vitals safety, and bilingual Hinglish report summaries.
            </p>

            {/* Dual Persona Switcher Segment */}
            <div className="p-2 rounded-2xl liquid-glass border border-white/80 dark:border-slate-800 w-fit mx-auto lg:mx-0 shadow-md">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePersona('caregiver')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activePersona === 'caregiver'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>I am a Family Caregiver</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePersona('patient')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activePersona === 'patient'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>I am an Elder / Patient</span>
                </button>
              </div>
            </div>

            {/* Persona Dynamic Micro-Description */}
            <div className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 flex items-center justify-center lg:justify-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                {activePersona === 'caregiver'
                  ? 'Optimized for sons, daughters, and remote doctors with automated alerts.'
                  : 'Optimized for seniors with large buttons, 1-tap SOS, and zero tech hassle.'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onOpenSignup(activePersona)}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2.5 transition ${
                  activePersona === 'caregiver'
                    ? 'liquid-button-primary'
                    : 'liquid-button-patient'
                }`}
              >
                <span>Sign Up as {activePersona === 'caregiver' ? 'Caregiver' : 'Patient'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl liquid-button-secondary text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:text-blue-600 transition"
              >
                <Play className="w-4 h-4 fill-slate-700 dark:fill-slate-300" />
                <span>Open Interactive Demo</span>
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Deterministic Validation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Hinglish + English AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-rose-500" />
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
