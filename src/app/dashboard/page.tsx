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
import { AddElderModal } from '@/components/AddElderModal';
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
  ArrowLeft,
  UserCheck,
  UserPlus,
  Clock,
  Circle,
  Share2,
  Copy,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    activeElder,
    elders,
    activeElderVitals,
    activeElderReports,
    activeElderAuditLogs,
    activeElderMedications,
    toggleMedication,
    updateElder,
    isLiveMode,
  } = useCare();

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isAddElderOpen, setIsAddElderOpen] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const latestVital = activeElderVitals[0];
  const latestReport = activeElderReports[0];

  const handleCopyDoctorBrief = () => {
    const medList = activeElderMedications.map(m => `- ${m.name} (${m.dosage}, ${m.timing})`).join('\n');
    const brief = `*CAREDESK CLINICAL CONSULTATION BRIEF*\nPatient: ${activeElder.fullName} (${activeElder.age} yrs, ${activeElder.gender})\nTreating Doctor: ${activeElder.primaryDoctorName}\nConditions: ${activeElder.conditions.join(', ')}\n\n*Recent Vitals (Last 7 Days):*\n- Latest BP: ${latestVital ? `${latestVital.systolic}/${latestVital.diastolic} mmHg` : 'N/A'}\n- Blood Sugar: ${latestVital ? `${latestVital.bloodSugarValue} mg/dL (${latestVital.bloodSugarType})` : 'N/A'}\n- Heart Rate: ${latestVital ? `${latestVital.heartRate} BPM` : 'N/A'}\n\n*Active Daily Prescriptions:*\n${medList}\n\n*Key Clinical Questions:*\n${latestReport?.doctorQuestionsEn?.slice(0, 3).map((q, i) => `${i + 1}. ${q}`).join('\n') || 'Review medication dosages.'}`;

    navigator.clipboard.writeText(brief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar onOpenCheckIn={() => setIsCheckInOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb / Return to Landing */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to CareDesk Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/elder"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 fill-teal-600" />
              <span>Open Senior Portal View (for Parents)</span>
            </Link>
            <button
              onClick={() => setIsAddElderOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Elder Profile</span>
            </button>
          </div>
        </div>

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
                  Live Mode: Connected to Supabase &amp; Gemini AI
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Interactive Care Desk: Monitoring {activeElder.fullName} with deterministic clinical safety
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyDoctorBrief}
              className="text-slate-700 dark:text-slate-300 font-bold hover:text-blue-600 flex items-center gap-1 text-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedBrief ? 'Copied to Clipboard! ✅' : 'Copy Doctor Brief'}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link
              href="/reports"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Analyze Lab Report</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Critical Emergency Red SOS Alert Banner */}
        {activeElder.currentStatus === 'red' && (
          <div className="p-5 rounded-2xl bg-rose-600 text-white shadow-xl border-2 border-rose-300 animate-in slide-in-from-top space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
                <h2 className="text-lg font-black tracking-tight">
                  CRITICAL HEALTH ALERT: {activeElder.fullName} Needs Immediate Attention
                </h2>
              </div>
              <button
                onClick={() => updateElder(activeElder.id, { currentStatus: 'yellow' })}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl font-bold transition"
              >
                Mark Triage Acknowledged
              </button>
            </div>
            <p className="text-xs sm:text-sm text-rose-100 font-medium">
              A recent reading or SOS dispatch breached physiological safety boundaries (e.g. BP &gt;= 180/120 or emergency distress). Take immediate action below:
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={`tel:${activeElder.primaryDoctorPhone}`}
                className="px-4 py-2 bg-white text-rose-700 hover:bg-rose-50 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Primary Doctor ({activeElder.primaryDoctorName})</span>
              </a>
              <a
                href={`tel:${activeElder.emergencyContactPhone}`}
                className="px-4 py-2 bg-rose-950 text-white hover:bg-black font-black rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Emergency Contact</span>
              </a>
              <a
                href="tel:102"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <span>Dial 102 (National Ambulance)</span>
              </a>
            </div>
          </div>
        )}

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

        {/* Clinical Advisory Alert (if Yellow) */}
        {activeElder.currentStatus === 'yellow' && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Traffic-Light Advisory for {activeElder.fullName}
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                Recent readings indicate mildly elevated blood pressure (128/82 mmHg) or fasting glucose. Ensure morning medication (Telmisartan 40mg) has been taken, encourage 2 liters of water intake, and check evening BP before dinner.
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

            {/* Daily Medication & Prescription Routine Card */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Prescription Adherence</span>
                </h3>
                <span className="text-[11px] font-black bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-200/50">
                  {activeElderMedications.filter(m => m.takenToday).length} / {activeElderMedications.length} Taken
                </span>
              </div>

              <div className="space-y-2">
                {activeElderMedications.map((med) => (
                  <div
                    key={med.id}
                    onClick={() => toggleMedication(med.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between gap-3 ${
                      med.takenToday
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700 hover:border-teal-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        aria-label={`Toggle medication ${med.name}`}
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                          med.takenToday
                            ? 'bg-emerald-600 text-white'
                            : 'border border-slate-300 dark:border-slate-600 text-transparent'
                        }`}
                      >
                        {med.takenToday && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {med.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {med.dosage} • <span className="capitalize text-teal-600 dark:text-teal-400 font-semibold">{med.timing}</span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        med.takenToday
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {med.takenToday ? 'Taken' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/elder"
                className="w-full py-2 px-3 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-teal-200/60 dark:border-teal-800/50"
              >
                <Heart className="w-3.5 h-3.5 fill-teal-600" />
                <span>Open Senior 1-Tap Portal View →</span>
              </Link>
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
            <Link href="/" className="hover:text-blue-600 transition">
              Home Landing
            </Link>
            <span>•</span>
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

      {/* Add Elder Profile Modal */}
      <AddElderModal isOpen={isAddElderOpen} onClose={() => setIsAddElderOpen(false)} />
    </div>
  );
}
