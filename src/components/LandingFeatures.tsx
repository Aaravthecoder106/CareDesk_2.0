'use client';

import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Shield,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertTriangle,
  Zap,
  Globe2,
  Share2,
} from 'lucide-react';

export function LandingFeatures() {
  const [testInput, setTestInput] = useState('130/85');
  const [activeTab, setActiveTab] = useState<'bilingual' | 'vitals' | 'sos'>('bilingual');

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-100/70 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Engineering for Critical Care</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Crafted with Clinical Rigor & Heart
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            We reject fragile AI gimmicks. CareDesk combines deterministic mathematical boundaries with Gemini AI empathy to protect the people who raised you.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Bilingual Report Analyzer (Spans 2 columns) */}
          <div className="md:col-span-2 rounded-3xl liquid-glass-card p-7 sm:p-9 space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200/50">
                  Powered by Google Gemini 2.5
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Bilingual Lab Report Translation
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Elderly parents often receive dense laboratory printouts packed with intimidating medical terminology like &quot;Hypercholesterolemia&quot; or &quot;Microcytic Hypochromic Anemia&quot;. CareDesk digests the PDF and produces clear English plus respectful, comforting Hinglish summaries.
            </p>

            {/* Interactive Preview Mockup */}
            <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    HbA1c & Fasting Glucose Panel
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Analyzed in 1.8s</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 space-y-1">
                  <span className="font-bold text-orange-800 dark:text-orange-300 block">
                    🇮🇳 Hinglish (For Elder & Family):
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                    &quot;Ramesh ji, aapka 3 mahine ka sugar 6.8% hai jo control mein hai. Lekin LDL cholesterol 138 aaya hai, isliye subah ki dhoop mein walk aur ghee thoda kam karna zaroori hai.&quot;
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-1">
                  <span className="font-bold text-blue-800 dark:text-blue-300 block">
                    🇬🇧 English (Clinical Overview):
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                    &quot;Glycemic control is moderate (HbA1c 6.8%). Elevated LDL (138 mg/dL) indicates dyslipidemia. Formulated 4 target questions for your upcoming cardiologist appointment.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Deterministic Vitals Parser */}
          <div className="rounded-3xl liquid-glass-card p-7 sm:p-9 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200/50">
                  Zero Hallucination
                </span>
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Strict Deterministic Vitals
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We never feed vital signs into generative models to guess numbers. A deterministic regex and bounds parser validates every systolic, diastolic, and blood sugar reading against medical corridors.
              </p>
            </div>

            {/* Interactive mini validator */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
              <label className="text-[11px] font-bold text-slate-500 block uppercase">
                Live Input Validator:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  placeholder="e.g. 120/80"
                />
                <span className="text-[11px] font-bold px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 rounded-lg shrink-0">
                  Valid BP
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Guaranteed: Rejects corrupted, non-standard, or dangerous readings.
              </p>
            </div>
          </div>

          {/* Card 3: Traffic Light Health Status */}
          <div className="rounded-3xl liquid-glass-card p-7 sm:p-9 space-y-5">
            <div className="p-3 w-fit rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Traffic-Light Health Barometer
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Green means completely stable. Amber prompts a gentle hydration check or evening follow-up. Red triggers emergency protocols immediately.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Optimal (80-120)</span>
              <span className="mx-1 text-slate-300">•</span>
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Caution</span>
              <span className="mx-1 text-slate-300">•</span>
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Alert</span>
            </div>
          </div>

          {/* Card 4: 1-Tap WhatsApp Daily Check-in */}
          <div className="rounded-3xl liquid-glass-card p-7 sm:p-9 space-y-5">
            <div className="p-3 w-fit rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/20">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              WhatsApp 1-Tap Check-in
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No need to convince elderly parents to download an app and remember passwords. They can reply to a morning WhatsApp text with their blood pressure machine reading.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Zero training needed for seniors</span>
            </div>
          </div>

          {/* Card 5: Cryptographic Audit Trail */}
          <div className="rounded-3xl liquid-glass-card p-7 sm:p-9 space-y-5">
            <div className="p-3 w-fit rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              HIPAA-Grade Audit Trail
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every single vital recorded, report analyzed, or emergency button pressed creates an immutable audit event with actor identity, timestamp, and metadata.
            </p>
            <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2">
              <Shield className="w-4 h-4 shrink-0 text-blue-600" />
              <span>Patient consent & privacy first</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
