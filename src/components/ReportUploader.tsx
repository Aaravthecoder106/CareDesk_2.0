'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { SAMPLE_REPORTS } from '@/lib/gemini';
import { MedicalReport } from '@/lib/types';
import {
  AlertCircle,
  CheckCircle2,
  FileCheck2,
  FileText,
  FileUp,
  Loader2,
  Sparkles,
  UploadCloud,
  Zap,
} from 'lucide-react';

interface ReportUploaderProps {
  onAnalysisComplete?: (report: MedicalReport) => void;
}

export function ReportUploader({ onAnalysisComplete }: ReportUploaderProps) {
  const { activeElder, addReport } = useCare();
  const [activeTab, setActiveTab] = useState<'sample' | 'upload' | 'text'>('sample');
  const [selectedSampleKey, setSelectedSampleKey] = useState<string>('lipid_glucose');
  const [pastedText, setPastedText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileMime, setFileMime] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setFileMime(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setFileBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      let payload: any = {
        elderName: activeElder.fullName,
        elderId: activeElder.id,
      };

      if (activeTab === 'sample') {
        const sample = SAMPLE_REPORTS[selectedSampleKey];
        if (!sample) throw new Error('Sample report not found');
        payload.textReport = `${sample.title}\n\nSummary:\n${sample.summaryEn}\n\nBiomarkers:\n${JSON.stringify(sample.biomarkers)}`;
      } else if (activeTab === 'text') {
        if (!pastedText.trim()) {
          setErrorMsg('Please paste lab report text or doctor notes first.');
          setIsAnalyzing(false);
          return;
        }
        payload.textReport = pastedText;
      } else if (activeTab === 'upload') {
        if (!fileBase64) {
          setErrorMsg('Please choose a PDF or image report to upload.');
          setIsAnalyzing(false);
          return;
        }
        payload.fileBufferBase64 = fileBase64;
        payload.mimeType = fileMime;
      }

      // Call Next.js API route
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      const generatedReport: MedicalReport = {
        ...data.report,
        id: `report-${Date.now()}`,
        elderId: activeElder.id,
        uploadedByName: 'Aarav (Caregiver Son)',
      };

      addReport(generatedReport);
      if (onAnalysisComplete) {
        onAnalysisComplete(generatedReport);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while analyzing report. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Bilingual AI Medical Report Analyzer</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                Gemini 2.5 Flash
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Instantly converts medical lab jargon into simple English & Hinglish summaries with doctor questions.
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium self-stretch sm:self-auto justify-between">
          <button
            onClick={() => setActiveTab('sample')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeTab === 'sample'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Sample Reports</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload PDF / Image</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeTab === 'text'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Paste Text</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tab 1: Instant Sample Reports */}
      {activeTab === 'sample' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setSelectedSampleKey('lipid_glucose')}
            className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
              selectedSampleKey === 'lipid_glucose'
                ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/30 ring-2 ring-purple-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Comprehensive Lipid & HbA1c Panel
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Total Cholesterol 218, LDL 138, HbA1c 6.8%, Fasting Glucose 118 mg/dL.
              </p>
              <span className="inline-block mt-2 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                Patient: Ramesh Sharma (68 yrs)
              </span>
            </div>
          </div>

          <div
            onClick={() => setSelectedSampleKey('complete_blood_count')}
            className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
              selectedSampleKey === 'complete_blood_count'
                ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/30 ring-2 ring-purple-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="p-2 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-lg shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Complete Blood Count (CBC)
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Hemoglobin 10.4 g/dL (Mild Anemia), WBC 6400, Platelets 245K.
              </p>
              <span className="inline-block mt-2 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                Patient: Sunita Sharma (64 yrs)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Upload File */}
      {activeTab === 'upload' && (
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition">
          <input
            type="file"
            id="lab-report-file"
            accept=".pdf,image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="lab-report-file" className="cursor-pointer flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <FileUp className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {selectedFileName ? selectedFileName : 'Click to upload or drag & drop Lab Report'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports PDF, PNG, JPG, WEBP (Max 15MB)
            </p>
            {selectedFileName && (
              <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> File Selected
              </span>
            )}
          </label>
        </div>
      )}

      {/* Tab 3: Paste Text */}
      {activeTab === 'text' && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Paste Laboratory Values or Discharge Summary
          </label>
          <textarea
            rows={4}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste text like: Fasting Blood Sugar: 130 mg/dL, HbA1c: 7.1%, Serum Creatinine: 1.1 mg/dL, Total Cholesterol: 220 mg/dL..."
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-purple-500 font-mono"
          />
        </div>
      )}

      {/* Action Button */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-slate-500 flex items-center gap-1.5">
          <span>Target Patient:</span>
          <strong className="text-slate-800 dark:text-slate-200">{activeElder.fullName}</strong>
        </p>

        <button
          onClick={handleStartAnalysis}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-purple-600/20 transition hover:scale-101"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing with Gemini...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyze Report (English & Hinglish)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
