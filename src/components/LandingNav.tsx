'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Users, Shield, Sparkles, ArrowRight, Menu, X, Play } from 'lucide-react';
import { UserRole, useCare } from '@/context/CareContext';

interface LandingNavProps {
  onOpenSignup: (role?: UserRole) => void;
}

export function LandingNav({ onOpenSignup }: LandingNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useCare();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  CareDesk
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                  2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold hidden sm:block">
                Remote Elder-Care, Simplified
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-slate-700">
            <a href="#roles" className="hover:text-blue-600 transition">
              Patient vs Caregiver
            </a>
            <a href="#features" className="hover:text-blue-600 transition">
              Clinical Features
            </a>
            <a href="#security" className="hover:text-blue-600 transition">
              Audit &amp; Privacy
            </a>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-blue-700 font-extrabold hover:text-blue-800 hover:underline"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Interactive Demo</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition"
              >
                Go to Dashboard ({currentUser.name})
              </Link>
            ) : (
              <>
                <Link
                  href="/elder"
                  className="px-3.5 py-2 text-xs font-extrabold text-teal-800 hover:text-teal-950 transition flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-teal-700" />
                  <span>Elder Portal</span>
                </Link>
                <button
                  onClick={() => onOpenSignup('caregiver')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-500/25 flex items-center gap-1.5 transition hover:scale-102"
                >
                  <span>Sign Up Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenSignup('caregiver')}
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200/60 dark:border-slate-800 py-4 space-y-3 animate-in slide-in-from-top-2">
            <a
              href="#roles"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Patient vs Caregiver
            </a>
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Clinical Features
            </a>
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg"
            >
              Open Interactive Demo Dashboard →
            </Link>
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSignup('patient');
                }}
                className="w-full py-2.5 rounded-xl border border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 text-xs font-bold"
              >
                Elder Portal
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSignup('caregiver');
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Caregiver Signup
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
