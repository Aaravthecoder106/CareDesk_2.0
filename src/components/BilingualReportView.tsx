'use client';

import React, { useState } from 'react';
import { Biomarker, MedicalReport } from '@/lib/types';
import { TrafficLightBadge } from './TrafficLightBadge';
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  CheckSquare,
  Clock,
  Copy,
  FileText,
  HeartHandshake,
  HelpCircle,
  Languages,
  Printer,
  Share2,
  Sparkles,
  Stethoscope,
  User,
} from 'lucide-react';

interface BilingualReportViewProps {
  report: MedicalReport;
}

export function BilingualReportView({ report }: BilingualReportViewProps) {
  const [langTab, setLangTab] = useState<'hinglish' | 'en'>('hinglish');
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [isCopied, setIsCopied] = useState(false);

  const toggleQuestion = (idx: number) => {
    setCheckedQuestions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const currentQuestions = langTab === 'hinglish' ? report.doctorQuestionsHinglish : report.doctorQuestionsEn;

  const handleCopyQuestions = () => {
    const textToCopy = currentQuestions
      .map((q, i) => `${i + 1}. ${q}`)
      .join('\n');
    navigator.clipboard.writeText(`CareDesk Medical Consultation Questions (${report.title}):\n\n${textToCopy}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                {report.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Test Date: {report.testDate}</span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {report.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Uploaded by {report.uploadedByName} • Analyzed with Google Gemini AI
            </p>
          </div>

          {/* Action buttons: Print & Share */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print</span>
            </button>
            <button
              onClick={handleCopyQuestions}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition text-xs font-semibold flex items-center gap-1.5"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{isCopied ? 'Copied!' : 'Copy Qs'}</span>
            </button>
          </div>
        </div>

        {/* Bilingual Language Switcher Tabs */}
        <div className="flex items-center gap-2 mt-5 bg-white/80 dark:bg-slate-800/80 p-1 rounded-xl w-fit border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setLangTab('hinglish')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              langTab === 'hinglish'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <span>🇮🇳 Hinglish (Elder-Friendly)</span>
          </button>
          <button
            onClick={() => setLangTab('en')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              langTab === 'en'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <span>🇬🇧 Standard English (Clinical)</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>
              {langTab === 'hinglish' ? 'Report Summary aasan bhasha mein' : 'Executive Clinical Summary'}
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
            {langTab === 'hinglish' ? report.summaryHinglish : report.summaryEn}
          </p>
        </div>

        {/* Biomarkers Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-indigo-500" />
              <span>Extracted Lab Parameters & Safe Ranges</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {report.biomarkers?.length || 0} biomarkers analyzed
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Value</th>
                  <th className="py-3 px-4">Reference Target</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Plain Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {report.biomarkers?.map((b, idx) => {
                  const statusColors = {
                    normal: 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 border-emerald-200',
                    high: 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40 border-rose-200',
                    low: 'text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40 border-blue-200',
                    critical: 'text-rose-800 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/60 border-rose-300',
                  }[b.status] || 'text-slate-700 bg-slate-50';

                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        {b.name}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                        {b.value} <span className="font-sans font-normal text-slate-400 text-xs">{b.unit}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-xs">
                        {b.referenceRange}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${statusColors}`}>
                          {b.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-xs max-w-xs">
                        {langTab === 'hinglish' ? b.explanationHinglish : b.explanationEn}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Questions for the Doctor Checklist */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {langTab === 'hinglish'
                  ? 'Doctor Sahab se agle visit par ye zaroori sawal poochiye'
                  : 'Key Questions to ask your Doctor at the next consultation'}
              </h3>
            </div>
            <button
              onClick={handleCopyQuestions}
              className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold hover:underline flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{isCopied ? 'Copied to Clipboard!' : 'Copy to send on WhatsApp'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {currentQuestions?.map((q, idx) => {
              const isChecked = checkedQuestions[idx] || false;
              return (
                <div
                  key={idx}
                  onClick={() => toggleQuestion(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  <div className="pt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <div className="w-4 h-4 rounded border border-slate-400 dark:border-slate-500" />
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isChecked
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {q}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 italic text-center">
          Note: CareDesk AI summaries are designed to assist families in understanding lab reports and preparing for consultations. Always follow the explicit instructions and diagnosis of your certified medical physician.
        </p>
      </div>
    </div>
  );
}
