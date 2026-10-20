'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCare, UserRole } from '@/context/CareContext';
import confetti from 'canvas-confetti';
import {
  X,
  Heart,
  User,
  Users,
  Shield,
  Sparkles,
  Phone,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Globe,
  Bell,
  Activity,
  HeartPulse,
} from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
}

export function SignupModal({ isOpen, onClose, initialRole = 'caregiver' }: SignupModalProps) {
  const router = useRouter();
  const { registerUser } = useCare();

  const [role, setRole] = useState<UserRole>(initialRole);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<'hinglish' | 'english' | 'hindi'>('hinglish');
  
  // Patient specific fields
  const [patientAge, setPatientAge] = useState('68');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [checkInMethod, setCheckInMethod] = useState<'whatsapp' | 'web' | 'sms'>('whatsapp');

  // Caregiver specific fields
  const [relationship, setRelationship] = useState('Son / Daughter');
  const [parentName, setParentName] = useState('Ramesh Sharma');
  const [parentAge, setParentAge] = useState('68');
  const [alertThreshold, setAlertThreshold] = useState<'all' | 'yellow_red' | 'red_only'>('yellow_red');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSubmitting(true);

    try {
      // Trigger liquid celebratory confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#2563eb', '#0d9488', '#f59e0b', '#ec4899', '#6366f1'],
      });
    } catch {
      // Ignore confetti issues if canvas is unavailable
    }

    // Save profile to context and localStorage
    registerUser({
      name: fullName.trim(),
      role,
      phone: phone.trim(),
      language: preferredLanguage,
      elderName: role === 'caregiver' ? parentName.trim() : fullName.trim(),
      relationship: role === 'caregiver' ? relationship : 'Self (Patient)',
      checkInMethod,
      emergencyPhone: role === 'patient' ? emergencyContact.trim() : phone.trim(),
    });

    setStep('success');
    setIsSubmitting(false);

    // Redirect to dashboard after a brief celebratory view
    setTimeout(() => {
      onClose();
      router.push('/dashboard');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Liquid Backdrop Blur */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 z-10 transition-all overflow-hidden text-slate-900">
        {/* Subtle decorative glowing mesh orbs inside modal */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'success' ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome to CareDesk, {fullName}!
            </h3>
            <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
              Your {role === 'patient' ? 'Elder / Patient' : 'Family Caregiver'} account has been set up with clinical data protection. Redirecting to your personal health desk...
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Launching Secure CareDesk Session...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero-Friction Medical Health Setup</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Create Your CareDesk Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Select how you will be using CareDesk to tailor the interface for maximum ease and clinical clarity.
              </p>
            </div>

            {/* Role Switcher Cards (Dual Persona) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Option 1: Caregiver */}
              <button
                type="button"
                onClick={() => setRole('caregiver')}
                className={`p-4 rounded-2xl text-left border-2 transition-all relative overflow-hidden ${
                  role === 'caregiver'
                    ? 'border-blue-600 bg-blue-50/90 shadow-md shadow-blue-500/10'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
                      role === 'caregiver'
                        ? 'bg-blue-600 shadow-blue-600/30'
                        : 'bg-slate-400'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                  </div>
                  {role === 'caregiver' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      Selected
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  I am a Family Caregiver
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  Son, daughter, or doctor caring for parents remotely. View traffic-light status, vital trends, and bilingual reports.
                </p>
              </button>

              {/* Option 2: Patient */}
              <button
                type="button"
                onClick={() => setRole('patient')}
                className={`p-4 rounded-2xl text-left border-2 transition-all relative overflow-hidden ${
                  role === 'patient'
                    ? 'border-teal-600 bg-teal-50/90 shadow-md shadow-teal-500/10'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
                      role === 'patient'
                        ? 'bg-teal-600 shadow-teal-600/30'
                        : 'bg-slate-400'
                    }`}
                  >
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  {role === 'patient' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-600 text-white">
                      Selected
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  I am a Senior / Patient
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  Tracking my own daily vitals simply. Big buttons, zero medical jargon, 1-tap SOS, and WhatsApp check-in reminders.
                </p>
              </button>
            </div>

            {/* Tailored Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={role === 'caregiver' ? 'e.g. Aarav Sharma' : 'e.g. Ramesh Sharma'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              {/* Role Specific Fields */}
              {role === 'caregiver' ? (
                <div className="space-y-3 p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5" />
                    <span>Elder Information to Monitor</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Parent / Elder Full Name
                      </label>
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Elder Age
                      </label>
                      <input
                        type="number"
                        value={parentAge}
                        onChange={(e) => setParentAge(e.target.value)}
                        placeholder="68"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Relationship
                      </label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      >
                        <option value="Son / Daughter">Son / Daughter</option>
                        <option value="Primary Caregiver">Primary Caregiver</option>
                        <option value="Physician / Doctor">Physician / Doctor</option>
                        <option value="Visiting Nurse">Visiting Nurse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Alert Sensitivity
                      </label>
                      <select
                        value={alertThreshold}
                        onChange={(e) => setAlertThreshold(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      >
                        <option value="yellow_red">Amber & Red (Caution + Emergency)</option>
                        <option value="red_only">Red Critical Only</option>
                        <option value="all">Every Single Vital Logged</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 uppercase tracking-wider">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>Elder Preferences & Emergency SOS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Age
                      </label>
                      <input
                        type="number"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Emergency SOS Contact (Son/Daughter) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        placeholder="+91 98111 22334 (Son's Phone)"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Check-In Routine
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckInMethod('whatsapp')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center ${
                          checkInMethod === 'whatsapp'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setCheckInMethod('web')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center ${
                          checkInMethod === 'web'
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        Web Portal
                      </button>
                      <button
                        type="button"
                        onClick={() => setCheckInMethod('sms')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center ${
                          checkInMethod === 'sms'
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        SMS Text
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Language Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Report Summary Language
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredLanguage('hinglish')}
                    className={`p-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                      preferredLanguage === 'hinglish'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>🇮🇳 Hinglish</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredLanguage('english')}
                    className={`p-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                      preferredLanguage === 'english'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredLanguage('hindi')}
                    className={`p-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                      preferredLanguage === 'hindi'
                        ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>हिंदी Hindi</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-2xl text-white font-extrabold text-sm sm:text-base shadow-xl transition flex items-center justify-center gap-2 mt-4 ${
                  role === 'caregiver'
                    ? 'liquid-button-primary'
                    : 'liquid-button-patient'
                }`}
              >
                <span>Complete Signup as {role === 'caregiver' ? 'Family Caregiver' : 'Senior / Patient'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
