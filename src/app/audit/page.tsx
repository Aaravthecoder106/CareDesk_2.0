'use client';

import React from 'react';
import { useCare } from '@/context/CareContext';
import { Navbar } from '@/components/Navbar';
import { ActivityFeed } from '@/components/ActivityFeed';
import {
  FileText,
  History,
  Lock,
  RotateCcw,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export default function AuditPage() {
  const { activeElder, activeElderAuditLogs, resetToMockData } = useCare();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Role-Level Security &amp; Compliance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Audit Trail &amp; Consent Log
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Complete, immutable ledger of vitals checked, reports analyzed, and alerts triggered for {activeElder.fullName}.
            </p>
          </div>

          <button
            onClick={resetToMockData}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Telemetry</span>
          </button>
        </div>

        {/* Security Architecture Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>Row-Level Security (RLS)</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every medical reading and report in Supabase PostgreSQL is strictly guarded by explicit patient-caregiver relationship policies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <UserCheck className="w-4 h-4" />
              <span>Explicit Consent Architecture</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Caregiver permissions are attributed to individual user IDs. Non-consented third parties cannot query elder vital records.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Deterministic Validation</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Erroneous blood pressures (systolic &lt; diastolic, out of human bounds) are rejected at input time to prevent medical pollution.
            </p>
          </div>
        </div>

        {/* Audit Log Activity Feed */}
        <ActivityFeed logs={activeElderAuditLogs} title={`Audit Log: ${activeElder.fullName}`} />
      </main>
    </div>
  );
}
