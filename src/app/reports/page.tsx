'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { Navbar } from '@/components/Navbar';
import { ReportUploader } from '@/components/ReportUploader';
import { BilingualReportView } from '@/components/BilingualReportView';
import { MedicalReport } from '@/lib/types';
import {
  Calendar,
  FileCheck2,
  FileText,
  History,
  Languages,
  Sparkles,
} from 'lucide-react';

export default function ReportsPage() {
  const { activeElder, activeElderReports } = useCare();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(
    activeElderReports[0]?.id || null
  );

  const selectedReport =
    activeElderReports.find((r) => r.id === selectedReportId) || activeElderReports[0];

  const handleNewReport = (report: MedicalReport) => {
    setSelectedReportId(report.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span>Multimodal Gemini 2.5 Flash Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Bilingual AI Lab Report Analyzer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload blood tests, urine panels, or discharge summaries. Instant plain English and Hinglish explanations with consultation checklists.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 p-3 rounded-xl border border-purple-200/50 dark:border-purple-800/40">
            <Languages className="w-5 h-5 text-purple-600" />
            <span>English &amp; Hinglish Dual Output</span>
          </div>
        </div>

        {/* Upload & Analysis Component */}
        <ReportUploader onAnalysisComplete={handleNewReport} />

        {/* Report Archive Tabs & Active Report Viewer */}
        <div className="space-y-4">
          {activeElderReports.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <History className="w-3.5 h-3.5" /> Previous Reports:
              </span>
              {activeElderReports.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReportId(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
                    (selectedReport?.id === r.id)
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{r.title}</span>
                  <span className="opacity-70 text-[10px]">({r.testDate})</span>
                </button>
              ))}
            </div>
          )}

          {selectedReport ? (
            <BilingualReportView report={selectedReport} />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-400">
              <FileCheck2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                No lab report selected
              </p>
              <p className="text-xs mt-1">
                Select a sample above or upload a lab test PDF to view bilingual analysis.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
