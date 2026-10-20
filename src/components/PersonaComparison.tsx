'use client';

import React from 'react';
import {
  Heart,
  Users,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight,
  HeartPulse,
  Smartphone,
  Eye,
  FileCheck,
  Stethoscope,
} from 'lucide-react';
import { UserRole } from '@/context/CareContext';

interface PersonaComparisonProps {
  onSelectRole: (role: UserRole) => void;
}

export function PersonaComparison({ onSelectRole }: PersonaComparisonProps) {
  return (
    <section id="roles" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100/70 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Users className="w-3.5 h-3.5" />
            <span>Tailored Dual-Perspective Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Designed for Both Sides of Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Elder-care fails when interfaces are designed solely for tech-savvy children or solely for elderly patients. CareDesk bridges both worlds effortlessly.
          </p>
        </div>

        {/* Dual Liquid Glass Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: For Senior / Patient */}
          <div className="relative rounded-3xl liquid-glass-card p-8 sm:p-10 border border-teal-200/60 dark:border-teal-900/40 space-y-8 overflow-hidden group">
            {/* Ambient teal glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/20 transition duration-700" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200/50">
                  Role: Senior / Patient
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Dignity, Simplicity & Zero Jargon
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  For aging parents who want to stay healthy without battling complicated apps, tiny fonts, or cold clinical terminology.
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 shrink-0">
                <HeartPulse className="w-7 h-7" />
              </div>
            </div>

            {/* Feature List for Patient */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Large Readable Typography & High-Contrast Touch Targets
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Engineered to meet senior accessibility standards — no squinting or confusing swipe gestures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Respectful Hinglish Translations
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Lab reports are converted into warm, natural language that elders understand and trust (e.g. &quot;Namaste Ramesh ji...&quot;).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    1-Tap Emergency SOS Trigger
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Instantly dials family members and sends immediate SMS alerts with medical profile summary in under 3 seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Flexible Check-in (WhatsApp, SMS, or Web)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Parents can log BP and blood sugar by simply replying to a daily friendly WhatsApp message.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onSelectRole('patient')}
                className="w-full py-4 px-6 rounded-2xl liquid-button-patient text-white font-bold text-sm flex items-center justify-center gap-2 group-hover:scale-101 transition"
              >
                <span>Sign Up as a Senior / Patient</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: For Family Caregiver / Son / Daughter */}
          <div className="relative rounded-3xl liquid-glass-card p-8 sm:p-10 border border-blue-200/60 dark:border-blue-900/40 space-y-8 overflow-hidden group">
            {/* Ambient blue glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition duration-700" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/50">
                  Role: Family Caregiver
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Peace of Mind Across 2,000 Kilometers
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  For sons, daughters, and doctors managing parents&apos; wellness remotely. Continuous telemetry without anxiety-inducing daily interrogations.
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                <Users className="w-7 h-7" />
              </div>
            </div>

            {/* Feature List for Caregiver */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Traffic-Light Barometer (Green, Amber, Red)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Know your parents&apos; health status at a glance without having to decipher raw medical figures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Deterministic Vitals Engine
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    100% strict mathematical validation. Ambiguous entries are caught before false alarms are sounded.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Doctor Consultation Questions Formulator
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Gemini AI extracts 3-5 specific questions to ask the physician at the next appointment based on blood biomarkers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Granular Audit Trail & Multiple Elders
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Switch between Father, Mother, or in-laws. Cryptographically verify every reading and report upload.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onSelectRole('caregiver')}
                className="w-full py-4 px-6 rounded-2xl liquid-button-primary text-white font-bold text-sm flex items-center justify-center gap-2 group-hover:scale-101 transition"
              >
                <span>Sign Up as a Family Caregiver</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
