'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { Navbar } from '@/components/Navbar';
import { TrafficLightBadge } from '@/components/TrafficLightBadge';
import { VitalsChart } from '@/components/VitalsChart';
import { VitalsModal } from '@/components/VitalsModal';
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  PlusCircle,
  Scale,
  ShieldCheck,
  User,
  Wind,
} from 'lucide-react';

export default function VitalsPage() {
  const { activeElder, activeElderVitals } = useCare();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCheckIn={() => setIsCheckInOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Deterministic Health Parser</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Daily Vitals Log & History
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Continuous monitoring for <strong className="text-slate-700 dark:text-slate-300">{activeElder.fullName}</strong>. Ambiguous inputs are deterministically filtered.
            </p>
          </div>

          <button
            onClick={() => setIsCheckInOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition hover:scale-102"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Record New Reading</span>
          </button>
        </div>

        {/* Visual Trend Chart */}
        <VitalsChart vitals={activeElderVitals} />

        {/* Comprehensive Vitals Log Table */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-500" />
                <span>Historical Telemetry Records</span>
              </h2>
              <p className="text-xs text-slate-500">
                Sorted by most recent check-in. Validated with AHA & ADA guidelines.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {activeElderVitals.length} Entries
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Blood Pressure</th>
                  <th className="py-3 px-4">Blood Sugar</th>
                  <th className="py-3 px-4">Pulse</th>
                  <th className="py-3 px-4">SpO2</th>
                  <th className="py-3 px-4">Weight</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Notes & Caregiver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeElderVitals.map((v) => {
                  const date = new Date(v.recordedAt);
                  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
                  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                  return (
                    <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300 text-xs">
                        <div className="font-semibold text-slate-900 dark:text-white">{dateStr}</div>
                        <div className="text-slate-400 text-[11px]">{timeStr}</div>
                      </td>

                      <td className="py-3 px-4">
                        {v.systolic ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900 dark:text-white">
                              {v.systolic}/{v.diastolic}
                            </span>
                            <span className="text-[10px] text-slate-400">mmHg</span>
                            {v.bloodPressureStatus && (
                              <TrafficLightBadge status={v.bloodPressureStatus} size="sm" showLabel={false} />
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {v.bloodSugarValue ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900 dark:text-white">
                              {v.bloodSugarValue}
                            </span>
                            <span className="text-[10px] text-slate-400">{v.bloodSugarType}</span>
                            {v.bloodSugarStatus && (
                              <TrafficLightBadge status={v.bloodSugarStatus} size="sm" showLabel={false} />
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono">
                        {v.heartRate ? `${v.heartRate} bpm` : '—'}
                      </td>

                      <td className="py-3 px-4 font-mono">
                        {v.spo2 ? `${v.spo2}%` : '—'}
                      </td>

                      <td className="py-3 px-4 font-mono">
                        {v.weightKg ? `${v.weightKg} kg` : '—'}
                      </td>

                      <td className="py-3 px-4">
                        <TrafficLightBadge status={v.overallStatus} size="sm" />
                      </td>

                      <td className="py-3 px-4 text-xs text-slate-600 dark:text-slate-300 max-w-xs">
                        <p>{v.notes || 'Normal routine check'}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">By {v.recordedByName || 'Caregiver'}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <VitalsModal isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />
    </div>
  );
}
