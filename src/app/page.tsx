'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCare } from '@/context/CareContext';
import { Navbar } from '@/components/Navbar';
import { TrafficLightBadge } from '@/components/TrafficLightBadge';
import { ElderProfileCard } from '@/components/ElderProfileCard';
import { VitalsChart } from '@/components/VitalsChart';
import { VitalsModal } from '@/components/VitalsModal';
import { BilingualReportView } from '@/components/BilingualReportView';
import { ActivityFeed } from '@/components/ActivityFeed';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Heart,
  History,
  Info,
  PhoneCall,
  PlusCircle,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    activeElder,
    activeElderVitals,
    activeElderReports,
    activeElderAuditLogs,
    isLiveMode,
  } = useCare();

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const latestVital = activeElderVitals[0];
  const latestReport = activeElderReports[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCheckIn={() => setIsCheckInOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Environment / Mode Notification Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200/60 dark:border-blue-900/40 text-xs gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1 rounded-md bg-blue-600 text-white font-bold text-[10px]">
              V2.0
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              {isLiveMode ? (
                <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Live Mode: Connected to Supabase & Gemini API
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Interactive Demo Mode: Pre-seeded with realistic elder health telemetry for {activeElder.fullName}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/reports"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Analyze Lab Report</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Hero Welcome & Traffic Light Triage Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Namaste Aarav 👋</span>
              <span>•</span>
              <span>Family Caregiver Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Monitoring {activeElder.fullName}&apos;s Health
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {activeElder.age} yrs • Primary care: {activeElder.conditions.join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Current Health Status
              </span>
              <div className="mt-1 flex items-center justify-end">
                <TrafficLightBadge status={activeElder.currentStatus} size="lg" />
              </div>
            </div>

            <button
              onClick={() => setIsCheckInOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition hover:scale-102"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Log Daily Vitals</span>
            </button>
          </div>
        </div>

        {/* Clinical Advisory Alert (if Yellow or Red) */}
        {activeElder.currentStatus !== 'green' && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Traffic-Light Advisory for {activeElder.fullName}
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                Recent readings indicate mildly elevated blood pressure (128/82 mmHg) and fasting glucose (114 mg/dL). Ensure morning medication (Telmisartan 40mg) has been taken, encourage 2 liters of water intake, and check evening BP before dinner.
              </p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Profile & Trend Charts & Latest Report */}
          <div className="lg:col-span-2 space-y-8">
            {/* Elder Profile Snapshot Card */}
            <ElderProfileCard
              elder={activeElder}
              latestVital={latestVital}
              onOpenCheckIn={() => setIsCheckInOpen(true)}
            />

            {/* Interactive Trend Chart */}
            <VitalsChart vitals={activeElderVitals} />

            {/* Latest AI Analyzed Lab Report Spotlight */}
            {latestReport && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Latest Bilingual AI Report Analysis
                    </h2>
                  </div>
                  <Link
                    href="/reports"
                    className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <span>View All Reports</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <BilingualReportView report={latestReport} />
              </div>
            )}
          </div>

          {/* Right Column: Quick Vitals CTA, Reports List & Audit Feed */}
          <div className="space-y-8">
            {/* Quick Check-in CTA Card */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 shadow-md shadow-blue-600/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Zero-Friction Tracking
                </span>
                <Heart className="w-5 h-5 text-rose-300 fill-rose-300 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold leading-tight">
                Daily Vitals Check-in
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Strict deterministic validation ensures zero medical ambiguities. BP, Fasting Sugar, Pulse, and SpO2 logged in seconds.
              </p>
              <button
                onClick={() => setIsCheckInOpen(true)}
                className="w-full py-2.5 px-4 bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-xl text-sm transition shadow-sm"
              >
                + Check-In Vitals Now
              </button>
            </div>

            {/* Analyzed Reports Quick List */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>Lab Reports</span>
                </h3>
                <Link
                  href="/reports"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  + Upload New
                </Link>
              </div>

              <div className="space-y-2.5">
                {activeElderReports.map((r) => (
                  <Link
                    key={r.id}
                    href="/reports"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-purple-300 transition block group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-purple-600">
                        {r.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {r.testDate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {r.summaryEn}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Audit & Care Activity Trail */}
            <ActivityFeed logs={activeElderAuditLogs} limit={5} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CareDesk 💙 — Built with relentless focus by Aarav.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Aaravthecoder106/CareDesk_2.0"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition"
            >
              GitHub Repo
            </a>
            <span>•</span>
            <a
              href="https://x.com/builder_aarav"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition"
            >
              X (@builder_aarav)
            </a>
          </div>
        </div>
      </footer>

      {/* Vitals Modal */}
      <VitalsModal isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />
    </div>
  );
}
