'use client';

import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileCheck2, HeartHandshake, CheckCircle2 } from 'lucide-react';

export function LandingSecurity() {
  return (
    <section id="security" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="rounded-3xl liquid-glass p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle blue accent glow */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Security &amp; Consent by Design</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Health Data Belongs Exclusively to the Family
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Elder health monitoring involves deep vulnerability. We built CareDesk on the unshakeable premise that medical data must never be commercialized, scraped for ad networks, or exposed without explicit elder consent.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Row-Level Security (RLS)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      PostgreSQL policies restrict all reading queries solely to verified family members.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 shrink-0">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      No Ad Network Tracking
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Zero tracking pixels. Your parents&apos; blood pressure isn&apos;t commodified for medication ads.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 shrink-0">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Cryptographic Audit Trail
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Inspect every timestamp when a vitals check-in or PDF analysis was conducted.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Elder Revocation Rights
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Elders maintain full authority to revoke or grant caregiver access at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Live Audit Snapshot */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-900 text-slate-200 p-5 font-mono text-xs space-y-3 border border-slate-800 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>AUDIT_CORRIDOR_VERIFIED</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">SHA-256</span>
                </div>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-800">
                    <span className="text-blue-400 font-bold">[10:15 AM]</span> BP Reading: 128/82 mmHg
                    <div className="text-[10px] text-slate-400 mt-0.5">Actor: Ramesh Sharma (Self) • Deterministic Hash: OK</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-800">
                    <span className="text-purple-400 font-bold">[11:30 AM]</span> Lab Report Analyzed: &quot;Lipid Profile&quot;
                    <div className="text-[10px] text-slate-400 mt-0.5">Actor: Aarav (Caregiver Son) • Gemini 2.5 Flash</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-800">
                    <span className="text-emerald-400 font-bold">[11:32 AM]</span> Consent Verified: Elder Consent Token #8942
                    <div className="text-[10px] text-slate-400 mt-0.5">Status: Active Patient Consent Granted</div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 pt-1 text-center">
                  Immutable audit records persisted in encrypted storage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
