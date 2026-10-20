'use client';

import React, { useState } from 'react';
import {
  Activity,
  Heart,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  TrendingUp,
  Clock,
  Eye,
} from 'lucide-react';
import { TrafficLightBadge } from './TrafficLightBadge';

export function MotionTelemetryPreview() {
  const [selectedStatus, setSelectedStatus] = useState<'green' | 'yellow' | 'red'>('yellow');
  const [language, setLanguage] = useState<'hinglish' | 'english'>('hinglish');
  const [simulatedPulse, setSimulatedPulse] = useState(74);

  const statusDescriptions = {
    green: {
      title: 'Stable & Safe Corridor',
      bp: '118/78 mmHg',
      sugar: '96 mg/dL',
      pulse: '72 bpm',
      summaryHinglish: 'Shukr hai! Ramesh ji ke sabhi readings safe target mein hain. Subah ki dawaiyan samay par li gayi hain. Daily walk jaari rakhein.',
      summaryEnglish: 'All physiological biomarkers within clinical baseline targets. No medication adjustments indicated. Next routine check-in tonight.',
      actionText: 'Routine evening check-in scheduled at 8:00 PM',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
    },
    yellow: {
      title: 'Caution: Mild Elevation Noticed',
      bp: '128/82 mmHg',
      sugar: '114 mg/dL',
      pulse: '76 bpm',
      summaryHinglish: 'Dhyan dein: BP thoda sa elevated hai (128/82). Ramesh ji ko 2 glass paani pilayein aur shaam ko khane se pehle dobara BP check karein.',
      summaryEnglish: 'Mild systolic elevation detected. Recommend checking hydration levels and confirming morning anti-hypertensive adherence.',
      actionText: 'Re-check prompted in 3 hours before dinner',
      colorClass: 'text-amber-600 dark:text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400',
    },
    red: {
      title: 'Immediate Alert: Clinical Threshold Exceeded',
      bp: '162/98 mmHg',
      sugar: '240 mg/dL',
      pulse: '98 bpm',
      summaryHinglish: 'Khatra! BP 162/98 bohot zyada hai. Ramesh ji ko aaram karwayein, emergency SOS trigger ho gaya hai aur Dr. Verma ko turant call lagayein.',
      summaryEnglish: 'Stage 2 hypertensive emergency threshold reached. Auto-routed SMS alert sent to primary caregiver son Aarav (+91 98111 22334).',
      actionText: 'Emergency call initiated to Dr. Ananya Verma',
      colorClass: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400',
    },
  };

  const current = statusDescriptions[selectedStatus];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Liquid Ambient Backglows */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />

      {/* Main Glass Telemetry Card */}
      <div className="relative rounded-3xl liquid-glass-card p-6 sm:p-7 space-y-6 overflow-hidden">
        {/* Iridescent Top Rim */}
        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Ramesh Sharma
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  68 yrs
                </span>
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Live Telemetry Corridor</span>
              </p>
            </div>
          </div>

          {/* Interactive Traffic Light Pill Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <button
              onClick={() => setSelectedStatus('green')}
              className={`px-2.5 py-1 rounded-xl font-bold transition flex items-center gap-1 text-[11px] ${
                selectedStatus === 'green'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              <span>Normal</span>
            </button>
            <button
              onClick={() => setSelectedStatus('yellow')}
              className={`px-2.5 py-1 rounded-xl font-bold transition flex items-center gap-1 text-[11px] ${
                selectedStatus === 'yellow'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span>Caution</span>
            </button>
            <button
              onClick={() => setSelectedStatus('red')}
              className={`px-2.5 py-1 rounded-xl font-bold transition flex items-center gap-1 text-[11px] ${
                selectedStatus === 'red'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-300" />
              <span>Critical</span>
            </button>
          </div>
        </div>

        {/* Live Animated Heartbeat SVG Line (Motion Graphic) */}
        <div className="relative bg-slate-900 rounded-2xl p-4 overflow-hidden border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>CONTINUOUS CORRIDOR SYNC</span>
            </div>
            <span className="text-slate-400">Deterministic Engine Active</span>
          </div>

          {/* Animated ECG Wave */}
          <div className="relative h-14 w-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 500 60"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 30 L 70 30 L 80 15 L 90 45 L 100 5 L 110 55 L 120 30 L 190 30 L 200 20 L 210 40 L 220 30 L 300 30 L 310 12 L 320 50 L 330 8 L 340 52 L 350 30 L 420 30 L 430 22 L 440 38 L 450 30 L 500 30"
                fill="none"
                stroke={
                  selectedStatus === 'green'
                    ? '#10b981'
                    : selectedStatus === 'yellow'
                    ? '#f59e0b'
                    : '#ef4444'
                }
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-ecg"
              />
            </svg>
            <div className="absolute right-3 top-2 flex items-center gap-1 text-xs font-mono font-bold text-white bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>{current.pulse}</span>
            </div>
          </div>
        </div>

        {/* Real-time Physiological Vitals Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Blood Pressure
            </span>
            <span className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
              {current.bp}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Fasting Sugar
            </span>
            <span className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
              {current.sugar}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Blood Oxygen
            </span>
            <span className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
              98% SpO2
            </span>
          </div>
        </div>

        {/* Bilingual AI Intelligence Explanation Module */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800/50 dark:to-blue-950/20 border border-slate-200/70 dark:border-slate-700/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Instant Bilingual Triage Translation</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold">
              <button
                onClick={() => setLanguage('hinglish')}
                className={`px-2 py-0.5 rounded transition ${
                  language === 'hinglish'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                🇮🇳 Hinglish
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={`px-2 py-0.5 rounded transition ${
                  language === 'english'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {language === 'hinglish' ? current.summaryHinglish : current.summaryEnglish}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-700/50 text-[11px]">
            <span className="text-slate-500">{current.actionText}</span>
            <span className={`font-bold capitalize ${current.colorClass}`}>
              ● Status: {selectedStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
