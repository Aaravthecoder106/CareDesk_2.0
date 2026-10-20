'use client';

import React from 'react';
import { Elder, VitalReading } from '@/lib/types';
import { TrafficLightBadge } from './TrafficLightBadge';
import {
  Activity,
  AlertCircle,
  Calendar,
  Heart,
  Pill,
  Shield,
  Stethoscope,
  User,
} from 'lucide-react';

interface ElderProfileCardProps {
  elder: Elder;
  latestVital?: VitalReading;
  onOpenCheckIn: () => void;
}

export function ElderProfileCard({ elder, latestVital, onOpenCheckIn }: ElderProfileCardProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5">
      {/* Profile Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
              {elder.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <span className="absolute -bottom-1 -right-1">
              <TrafficLightBadge status={elder.currentStatus} size="sm" showLabel={false} />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {elder.fullName}
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {elder.age} yrs • {elder.gender}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span>Blood Group: <strong className="text-slate-700 dark:text-slate-300">{elder.bloodGroup}</strong></span>
              <span>•</span>
              <span>Son: {elder.emergencyContactName}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCheckIn}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-xl transition"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>New Check-in</span>
        </button>
      </div>

      {/* Conditions & Prescriptions Pill List */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Care Profile:
          </span>
          {elder.conditions.map((cond, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40 font-medium"
            >
              {cond}
            </span>
          ))}
          {elder.allergies.map((all, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/40 font-medium flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 text-rose-500" />
              <span>Allergy: {all}</span>
            </span>
          ))}
        </div>

        {elder.notes && (
          <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-2">
            <Pill className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
            <span>{elder.notes}</span>
          </p>
        )}
      </div>

      {/* Latest Vitals Snapshot Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        {/* Blood Pressure */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" /> BP
            </span>
            {latestVital?.bloodPressureStatus && (
              <TrafficLightBadge status={latestVital.bloodPressureStatus} size="sm" showLabel={false} />
            )}
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
            {latestVital?.systolic ? `${latestVital.systolic}/${latestVital.diastolic}` : '—'}
            <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">mmHg</span>
          </div>
        </div>

        {/* Blood Sugar */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-amber-500" /> Sugar
            </span>
            {latestVital?.bloodSugarStatus && (
              <TrafficLightBadge status={latestVital.bloodSugarStatus} size="sm" showLabel={false} />
            )}
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
            {latestVital?.bloodSugarValue || '—'}
            <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">mg/dL</span>
          </div>
        </div>

        {/* Heart Rate / Pulse */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Pulse</span>
            {latestVital?.heartRateStatus && (
              <TrafficLightBadge status={latestVital.heartRateStatus} size="sm" showLabel={false} />
            )}
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
            {latestVital?.heartRate || '—'}
            <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">bpm</span>
          </div>
        </div>

        {/* Oxygen SpO2 */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>SpO2</span>
            {latestVital?.spo2Status && (
              <TrafficLightBadge status={latestVital.spo2Status} size="sm" showLabel={false} />
            )}
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
            {latestVital?.spo2 ? `${latestVital.spo2}%` : '—'}
          </div>
        </div>
      </div>

      {/* Primary Doctor Ribbon */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Doctor: <strong className="text-slate-900 dark:text-white">{elder.primaryDoctorName}</strong>
          </span>
        </div>
        <a
          href={`tel:${elder.primaryDoctorPhone}`}
          className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
        >
          {elder.primaryDoctorPhone}
        </a>
      </div>
    </div>
  );
}
