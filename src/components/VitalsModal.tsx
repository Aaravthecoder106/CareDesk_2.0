'use client';

import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { useCare } from '@/context/CareContext';
import { BloodSugarType } from '@/lib/types';
import { parseAndEvaluateVitals, VitalsInputRaw } from '@/lib/vitalsEngine';
import { TrafficLightBadge } from './TrafficLightBadge';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Heart,
  Scale,
  Sparkles,
  Wind,
  X,
  Zap,
} from 'lucide-react';

interface VitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VitalsModal({ isOpen, onClose }: VitalsModalProps) {
  const { activeElder, addVitalReading } = useCare();

  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [sugarType, setSugarType] = useState<BloodSugarType>('fasting');
  const [heartRate, setHeartRate] = useState('');
  const [spo2, setSpo2] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [recordedBy, setRecordedBy] = useState('Aarav (Caregiver Son)');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live real-time deterministic preview
  const livePreview = useMemo(() => {
    return parseAndEvaluateVitals({
      bloodPressure,
      bloodSugar,
      sugarType,
      heartRate,
      spo2,
      weight,
      notes,
    });
  }, [bloodPressure, bloodSugar, sugarType, heartRate, spo2, weight, notes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!livePreview.isValid) {
      setSubmitError(Object.values(livePreview.errors)[0] || 'Please fix the highlighted errors before saving.');
      return;
    }

    setIsSubmitting(true);
    const result = addVitalReading(
      {
        bloodPressure,
        bloodSugar,
        sugarType,
        heartRate,
        spo2,
        weight,
        notes,
      },
      recordedBy
    );

    if (!result.success) {
      setSubmitError(result.error || 'Failed to record vitals.');
      setIsSubmitting(false);
      return;
    }

    // If green, trigger joyous confetti!
    if (result.result?.overallStatus === 'green') {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#06b6d4'],
        });
      } catch (err) {
        // Safe no-op if blocked in iframe
      }
    }

    // Reset form and close
    setIsSubmitting(false);
    setBloodPressure('');
    setBloodSugar('');
    setHeartRate('');
    setSpo2('');
    setWeight('');
    setNotes('');
    onClose();
  };

  const applyPreset = (preset: 'optimal' | 'mild_elevated' | 'high_sugar') => {
    if (preset === 'optimal') {
      setBloodPressure('118/76');
      setBloodSugar('94');
      setSugarType('fasting');
      setHeartRate('72');
      setSpo2('98');
      setWeight('72.2');
      setNotes('Morning routine completed. Feeling energetic.');
    } else if (preset === 'mild_elevated') {
      setBloodPressure('134/86');
      setBloodSugar('116');
      setSugarType('fasting');
      setHeartRate('78');
      setSpo2('97');
      setWeight('72.5');
      setNotes('Slept later than usual, mild tension.');
    } else if (preset === 'high_sugar') {
      setBloodPressure('126/82');
      setBloodSugar('185');
      setSugarType('post_prandial');
      setHeartRate('82');
      setSpo2('96');
      setWeight('72.6');
      setNotes('Checked 2 hours after festive family dinner.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Daily Vitals Check-in
              </h2>
              <p className="text-xs text-slate-500">
                Recording for <span className="font-semibold text-blue-600">{activeElder.fullName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Sample Presets */}
        <div className="px-6 pt-4 pb-2 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 flex items-center gap-1 shrink-0 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500" /> Quick Presets:
          </span>
          <button
            type="button"
            onClick={() => applyPreset('optimal')}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-lg shrink-0 font-medium transition"
          >
            🟢 Optimal Morning
          </button>
          <button
            type="button"
            onClick={() => applyPreset('mild_elevated')}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 rounded-lg shrink-0 font-medium transition"
          >
            🟡 Mild Elevation
          </button>
          <button
            type="button"
            onClick={() => applyPreset('high_sugar')}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 rounded-lg shrink-0 font-medium transition"
          >
            🔴 Post-Meal Spike
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {submitError && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Section 1: Blood Pressure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Blood Pressure (Systolic / Diastolic)</span>
              </label>
              {livePreview.bpStatus && (
                <TrafficLightBadge status={livePreview.bpStatus} size="sm" />
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 120/80"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono transition outline-none focus:ring-2 ${
                  livePreview.errors.bloodPressure
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white'
                }`}
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-sans pointer-events-none">
                mmHg
              </span>
            </div>
            {livePreview.errors.bloodPressure && (
              <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{livePreview.errors.bloodPressure}</span>
              </p>
            )}
            <p className="text-[11px] text-slate-500">
              Format: 120/80. Rejects invalid physiological values (systolic must be &gt; diastolic).
            </p>
          </div>

          {/* Section 2: Blood Sugar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span>Blood Sugar (Glucose)</span>
              </label>
              {livePreview.sugarStatus && (
                <TrafficLightBadge status={livePreview.sugarStatus} size="sm" />
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2 relative">
                <input
                  type="number"
                  placeholder="e.g. 105"
                  value={bloodSugar}
                  onChange={(e) => setBloodSugar(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono transition outline-none focus:ring-2 ${
                    livePreview.errors.bloodSugar
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/20'
                      : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white'
                  }`}
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-sans pointer-events-none">
                  mg/dL
                </span>
              </div>
              <select
                value={sugarType}
                onChange={(e) => setSugarType(e.target.value as BloodSugarType)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
              >
                <option value="fasting">Fasting (Empty Stomach)</option>
                <option value="post_prandial">Post-Meal (2 hrs)</option>
                <option value="random">Random / Daytime</option>
              </select>
            </div>
            {livePreview.errors.bloodSugar && (
              <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{livePreview.errors.bloodSugar}</span>
              </p>
            )}
          </div>

          {/* Section 3: Heart Rate, SpO2, Weight (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Heart Rate */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Heart Rate (Pulse)</span>
                {livePreview.heartRateStatus && (
                  <TrafficLightBadge status={livePreview.heartRateStatus} size="sm" showLabel={false} />
                )}
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="72"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-mono bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 top-2 text-[11px] text-slate-400 pointer-events-none">
                  bpm
                </span>
              </div>
            </div>

            {/* SpO2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Oxygen (SpO2)</span>
                {livePreview.spo2Status && (
                  <TrafficLightBadge status={livePreview.spo2Status} size="sm" showLabel={false} />
                )}
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="98"
                  value={spo2}
                  onChange={(e) => setSpo2(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-mono bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 top-2 text-[11px] text-slate-400 pointer-events-none">
                  %
                </span>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Weight (Optional)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  placeholder="72.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-mono bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 top-2 text-[11px] text-slate-400 pointer-events-none">
                  kg
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Notes & Context */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Daily Context / Notes (Symptoms, Medicines, Activity)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Took morning BP tablet with breakfast, walked for 20 mins, feeling well."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Recorded By attribution */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Check-in Logged By:</span>
            <input
              type="text"
              value={recordedBy}
              onChange={(e) => setRecordedBy(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium"
            />
          </div>

          {/* Live Dynamic Triage Preview Box */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Live Deterministic Triage Preview
              </span>
              <TrafficLightBadge status={livePreview.overallStatus} size="sm" />
            </div>

            {livePreview.recommendations.length > 0 ? (
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                {livePreview.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-500 shrink-0">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Enter readings above to see real-time clinical assessment and recommendations.
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !livePreview.isValid}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition hover:scale-101"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording...' : 'Save & Log Check-in'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
