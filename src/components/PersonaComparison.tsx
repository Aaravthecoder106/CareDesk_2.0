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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Users className="w-3.5 h-3.5" />
            <span>Tailored Dual-Perspective Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Designed for Both Sides of Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Elder-care fails when interfaces are designed solely for tech-savvy children or solely for elderly patients. CareDesk bridges both worlds effortlessly.
          </p>
        </div>

        {/* Dual Liquid Glass Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: For Senior / Patient */}
          <div className="relative rounded-3xl liquid-glass-card p-8 sm:p-10 border border-teal-200/80 space-y-8 overflow-hidden group bg-white">
            {/* Ambient teal glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/20 transition duration-700" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  Role: Senior / Patient
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Dignity, Simplicity &amp; Zero Jargon
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  For aging parents who want to stay healthy without battling complicated apps, tiny fonts, or cold clinical terminology.
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 shrink-0">
                <HeartPulse className="w-7 h-7" />
              </div>
            </div>

            {/* Feature List for Patient */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Large Readable Typography &amp; High-Contrast Touch Targets
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Engineered to meet senior accessibility standards — no squinting or confusing swipe gestures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Respectful Hinglish Translations
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Lab reports are converted into warm, natural language that elders understand and trust (e.g. &quot;Namaste Ramesh ji...&quot;).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    1-Tap Emergency SOS Trigger
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Instantly dials family members and sends immediate SMS alerts with medical profile summary in under 3 seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Flexible Check-in (WhatsApp, SMS, or Web)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Parents can log BP and blood sugar by simply replying to a daily friendly WhatsApp message.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onSelectRole('patient')}
                className="w-full py-4 px-6 rounded-2xl liquid-button-patient text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 group-hover:scale-101 transition shadow-lg"
              >
                <span>Sign Up as a Senior / Patient</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: For Family Caregiver / Son / Daughter */}
          <div className="relative rounded-3xl liquid-glass-card p-8 sm:p-10 border border-blue-200/80 space-y-8 overflow-hidden group bg-white">
            {/* Ambient blue glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition duration-700" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Role: Family Caregiver
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Peace of Mind Across 2,000 Kilometers
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
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
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Traffic-Light Barometer (Green, Amber, Red)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Know your parents&apos; health status at a glance without having to decipher raw medical figures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Deterministic Vitals Engine
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    100% strict mathematical validation. Ambiguous entries are caught before false alarms are sounded.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Doctor Consultation Questions Formulator
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Gemini AI extracts 3-5 specific questions to ask the physician at the next appointment based on blood biomarkers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Granular Audit Trail &amp; Multiple Elders
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    Switch between Father, Mother, or in-laws. Cryptographically verify every reading and report upload.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onSelectRole('caregiver')}
                className="w-full py-4 px-6 rounded-2xl liquid-button-primary text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 group-hover:scale-101 transition shadow-lg"
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
