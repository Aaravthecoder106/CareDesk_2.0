'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShieldAlert, ArrowRight } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                CareDesk 2.0
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Zero-friction remote elder-care telemetry dashboard built for families, aging parents, and geriatric care coordinators.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs text-slate-600">
            <div className="space-y-2">
              <p className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px]">
                Platform
              </p>
              <ul className="space-y-1.5 font-medium">
                <li>
                  <Link href="/dashboard" className="hover:text-blue-600 transition">
                    Care Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/vitals" className="hover:text-blue-600 transition">
                    Daily Vitals Engine
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="hover:text-blue-600 transition">
                    AI Report Analyzer
                  </Link>
                </li>
                <li>
                  <Link href="/audit" className="hover:text-blue-600 transition">
                    Audit Trail
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px]">
                Personas
              </p>
              <ul className="space-y-1.5 font-medium">
                <li>
                  <a href="#roles" className="hover:text-blue-600 transition">
                    For Family Caregivers
                  </a>
                </li>
                <li>
                  <a href="#roles" className="hover:text-blue-600 transition">
                    For Elderly Patients
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-600 transition">
                    WhatsApp Check-in
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-blue-600 transition">
                    Consent &amp; Security
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2 sm:col-span-1 col-span-2">
              <p className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px]">
                Open Source &amp; Creator
              </p>
              <ul className="space-y-1.5 font-medium">
                <li>
                  <a
                    href="https://github.com/Aaravthecoder106/CareDesk_2.0"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 transition"
                  >
                    GitHub (CareDesk_2.0)
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/builder_aarav"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 transition"
                  >
                    X (@builder_aarav)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600 font-medium">
          <p>© 2026 CareDesk 💙 — Built with relentless focus by Aarav.</p>
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>CareDesk is a family health tracking system, not an emergency ambulance service.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
