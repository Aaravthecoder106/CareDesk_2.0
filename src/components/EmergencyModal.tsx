import React from 'react';
import { Elder } from '@/lib/types';
import { AlertTriangle, HeartPulse, PhoneCall, ShieldAlert, X } from 'lucide-react';

interface EmergencyModalProps {
  elder: Elder;
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyModal({ elder, isOpen, onClose }: EmergencyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 shadow-2xl overflow-hidden">
        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Emergency Quick-Response</h2>
              <p className="text-xs text-rose-100">Critical contacts for {elder.fullName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Elder Medical Quick-Card */}
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-100 dark:border-rose-900/60 flex items-center justify-between">
            <div>
              <p className="text-xs text-rose-700 dark:text-rose-300 font-semibold uppercase tracking-wider">
                Patient Medical Snapshot
              </p>
              <p className="text-base font-bold text-slate-900 dark:text-white">
                {elder.fullName} ({elder.age} yrs, {elder.gender})
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Blood Group: <span className="font-bold text-rose-600">{elder.bloodGroup}</span> | Allergies:{' '}
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {elder.allergies.join(', ') || 'None reported'}
                </span>
              </p>
            </div>
            <HeartPulse className="w-8 h-8 text-rose-500 animate-pulse" />
          </div>

          {/* Primary Doctor Direct Dial */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Immediate Contacts
            </p>

            <a
              href={`tel:${elder.primaryDoctorPhone}`}
              className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  Dr
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    {elder.primaryDoctorName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Primary Treating Doctor</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-100/60 dark:bg-emerald-950 px-3 py-1.5 rounded-lg">
                <PhoneCall className="w-4 h-4" />
                <span>Call Doctor</span>
              </div>
            </a>

            {/* Family Emergency Contact */}
            <a
              href={`tel:${elder.emergencyContactPhone}`}
              className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                  SOS
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                    {elder.emergencyContactName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Next of Kin / Family</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-100/60 dark:bg-blue-950 px-3 py-1.5 rounded-lg">
                <PhoneCall className="w-4 h-4" />
                <span>Call Family</span>
              </div>
            </a>

            {/* National Ambulance Direct Dial */}
            <a
              href="tel:102"
              className="flex items-center justify-between p-3.5 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl border border-rose-200 dark:border-rose-900/60 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 flex items-center justify-center font-bold">
                  102
                </div>
                <div>
                  <p className="text-sm font-bold text-rose-900 dark:text-rose-200">National Ambulance (India)</p>
                  <p className="text-xs text-rose-600 dark:text-rose-400">Emergency Medical Service (102 / 112)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm bg-rose-200/80 px-3 py-1.5 rounded-lg">
                <PhoneCall className="w-4 h-4" />
                <span>Dial 102</span>
              </div>
            </a>
          </div>

          {/* Quick First Aid / Guidance */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">First-Response Checklist:</span> Ensure patient is sitting upright in a well-ventilated room, unbutton tight collar, check breathing & pulse, and keep their recent prescription card ready for emergency staff.
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
