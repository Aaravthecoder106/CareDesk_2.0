'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCare } from '@/context/CareContext';
import { TrafficLightBadge } from './TrafficLightBadge';
import { EmergencyModal } from './EmergencyModal';
import {
  Activity,
  ChevronDown,
  FileText,
  Heart,
  History,
  LayoutDashboard,
  PhoneCall,
  PlusCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenCheckIn?: () => void;
}

export function Navbar({ onOpenCheckIn }: NavbarProps) {
  const pathname = usePathname();
  const { elders, activeElder, setActiveElderId, isLiveMode, resetToMockData } = useCare();
  const [isElderDropdownOpen, setIsElderDropdownOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Daily Vitals', href: '/vitals', icon: Activity },
    { label: 'AI Report Analyzer', href: '/reports', icon: Sparkles },
    { label: 'Audit Trail', href: '/audit', icon: History },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Brand Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      CareDesk
                    </span>
                    <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                      2.0
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                    Remote Elder-Care, Simplified
                  </p>
                </div>
              </Link>

              {/* Navigation Links (Desktop) */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Controls: Elder Switcher, SOS, Check-in */}
            <div className="flex items-center gap-3">
              {/* Elder Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsElderDropdownOpen(!isElderDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition border border-slate-200/60 dark:border-slate-700"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center text-xs font-bold text-blue-800 shrink-0">
                    {activeElder.fullName[0]}
                  </div>
                  <div className="text-left hidden xs:block">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {activeElder.fullName}
                    </span>
                  </div>
                  <TrafficLightBadge status={activeElder.currentStatus} size="sm" showLabel={false} />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {isElderDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Monitored Loved Ones
                    </div>
                    {elders.map((elder) => (
                      <button
                        key={elder.id}
                        onClick={() => {
                          setActiveElderId(elder.id);
                          setIsElderDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between text-sm transition-colors ${
                          elder.id === activeElder.id
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300">
                            {elder.fullName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-xs sm:text-sm">{elder.fullName}</p>
                            <p className="text-[11px] text-slate-500">
                              {elder.age} yrs • {elder.conditions[0] || 'Elder'}
                            </p>
                          </div>
                        </div>
                        <TrafficLightBadge status={elder.currentStatus} size="sm" />
                      </button>
                    ))}

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1 pt-1 px-2">
                      <button
                        onClick={() => {
                          resetToMockData();
                          setIsElderDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset to Demo Data</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Emergency SOS Button */}
              <button
                onClick={() => setIsEmergencyOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-rose-600/30 transition hover:scale-102"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                <span>SOS</span>
              </button>

              {/* Check-In Vitals Button */}
              {onOpenCheckIn && (
                <button
                  onClick={onOpenCheckIn}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-blue-600/20 transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Check-In Vitals</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-200/60 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 px-2 py-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium rounded-lg ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Emergency Modal */}
      <EmergencyModal
        elder={activeElder}
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </>
  );
}
