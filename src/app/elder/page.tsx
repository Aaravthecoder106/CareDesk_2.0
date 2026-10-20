'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCare } from '@/context/CareContext';
import { TrafficLightBadge } from '@/components/TrafficLightBadge';
import confetti from 'canvas-confetti';
import {
  Heart,
  PhoneCall,
  Volume2,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ArrowLeft,
  Activity,
  ShieldAlert,
  Clock,
  Sparkles,
  Users,
  PlusCircle,
  VolumeX,
} from 'lucide-react';

export default function ElderPortalPage() {
  const {
    activeElder,
    elders,
    setActiveElderId,
    activeElderVitals,
    activeElderMedications,
    toggleMedication,
    addVitalReading,
    triggerEmergencySOS,
  } = useCare();

  // Vitals Quick Check-In State
  const [bpInput, setBpInput] = useState('');
  const [sugarInput, setSugarInput] = useState('');
  const [pulseInput, setPulseInput] = useState('');
  const [checkInFeedback, setCheckInFeedback] = useState<{ message: string; status: 'green' | 'yellow' | 'red' } | null>(null);

  // SOS Emergency State
  const [isSosActive, setIsSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [sosDispatched, setSosDispatched] = useState<string | null>(null);

  // Text to speech voice playback state
  const [isSpeaking, setIsSpeaking] = useState(false);

  const latestVital = activeElderVitals[0];

  // Daily Voice Greeting message in Hinglish
  const hinglishAdvice = `Namaste ${activeElder.fullName} ji! Aaj ka din shubh ho. Aapka current health status ${
    activeElder.currentStatus === 'green' ? 'ekdum safe aur santulit' : 'monitoring par'
  } hai. Kripya apni subah ki dawai samay par lein, paryapt paani piyein, aur koi bhi takleef hone par seedha laal SOS button dabayein. Aarav beta hamesha aapse connected hai.`;

  const handleSpeakAdvice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert(hinglishAdvice);
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(hinglishAdvice);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.lang = 'hi-IN';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // SOS Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosCountdown !== null && sosCountdown > 0) {
      timer = setTimeout(() => {
        setSosCountdown(sosCountdown - 1);
      }, 1000);
    } else if (sosCountdown === 0) {
      // Dispatch SOS
      const res = triggerEmergencySOS(
        activeElder.id,
        `${activeElder.fullName} tapped the 1-Tap Emergency SOS button in Elder Companion Portal`
      );
      setSosDispatched(res.message);
      setSosCountdown(null);
      setIsSosActive(true);
    }
    return () => clearTimeout(timer);
  }, [sosCountdown, activeElder, triggerEmergencySOS]);

  const handleStartSOS = () => {
    setSosCountdown(5);
  };

  const handleCancelSOS = () => {
    setSosCountdown(null);
  };

  // Handle Senior Vitals Quick Submit
  const handleQuickVitalsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bpInput.trim() && !sugarInput.trim()) {
      setCheckInFeedback({
        message: 'Kripya Blood Pressure ya Sugar reading enter karein.',
        status: 'yellow',
      });
      return;
    }

    const res = addVitalReading(
      {
        bloodPressure: bpInput.trim() || undefined,
        bloodSugar: sugarInput.trim() || undefined,
        sugarType: 'fasting',
        heartRate: pulseInput.trim() || undefined,
        notes: 'Senior 1-Tap Portal Check-in',
      },
      `${activeElder.fullName} (Self)`
    );

    if (res.success && res.result) {
      if (res.result.overallStatus === 'green') {
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        } catch {}
        setCheckInFeedback({
          message: `Shabaash ${activeElder.fullName} ji! Aapki readings bilkul safe aur normal hain. Records save ho gaye.`,
          status: 'green',
        });
      } else if (res.result.overallStatus === 'yellow') {
        setCheckInFeedback({
          message: `Readings save ho gayi hain. Thoda elevated hai, ek glass taaza paani piyein aur shaant baithiye.`,
          status: 'yellow',
        });
      } else {
        setCheckInFeedback({
          message: `Dhhyan dein: Readings boundary se bahar hain. Aarav beta aur Doctor ko auto-notify kiya ja raha hai.`,
          status: 'red',
        });
      }
      setBpInput('');
      setSugarInput('');
      setPulseInput('');
    } else {
      setCheckInFeedback({
        message: res.error || 'Format check karein (jaise BP: 120/80, Sugar: 110)',
        status: 'yellow',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20 font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Elder Care Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm px-4 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl border border-blue-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Caregiver Desk</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Elder:</span>
            <select
              value={activeElder.id}
              onChange={(e) => setActiveElderId(e.target.value)}
              className="bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-teal-500"
            >
              {elders.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.fullName} ({el.age} yrs)
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Welcome Greeting Banner */}
        <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-teal-100">
                <Heart className="w-3.5 h-3.5 fill-current" />
                Senior Companion Portal
              </span>
              <TrafficLightBadge status={activeElder.currentStatus} size="lg" />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Namaste, {activeElder.fullName}! 🙏
              </h1>
              <p className="text-base sm:text-lg text-teal-100 font-medium mt-1">
                Aapka Swasthya Surakshit Hai • Always in care of Aarav (Son)
              </p>
            </div>

            {/* Voice Audio Readout Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSpeakAdvice}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white text-teal-900 font-black text-sm sm:text-base shadow-lg hover:bg-teal-50 active:scale-98 transition"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-5 h-5 text-rose-600 animate-pulse" />
                    <span>Aawaz Rokein (Stop Audio)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 text-teal-700" />
                    <span>Suno: Aaj Ki Salaah (Listen 🔊)</span>
                  </>
                )}
              </button>

              <span className="text-xs text-teal-100/90 font-medium">
                {isSpeaking ? 'Voice running in Hindi...' : 'Tap to hear your morning health guidance in Hinglish.'}
              </span>
            </div>
          </div>
        </section>

        {/* SOS Countdown or Active Alert Banner */}
        {sosCountdown !== null && (
          <div className="p-6 rounded-3xl bg-rose-600 text-white shadow-2xl border-4 border-rose-300 animate-pulse text-center space-y-4">
            <ShieldAlert className="w-12 h-12 mx-auto" />
            <h2 className="text-2xl font-black">
              SOS DISPATCH IN {sosCountdown} SECONDS...
            </h2>
            <p className="text-sm font-semibold text-rose-100">
              Galti se dab gaya? Click cancel immediately:
            </p>
            <button
              onClick={handleCancelSOS}
              className="px-8 py-3 bg-white text-rose-700 font-black text-base rounded-2xl shadow-lg hover:bg-rose-50"
            >
              CANCEL SOS (Galti Se Daba)
            </button>
          </div>
        )}

        {isSosActive && (
          <div className="p-6 rounded-3xl bg-red-600 text-white shadow-2xl border-4 border-red-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-7 h-7 animate-bounce" />
                <h2 className="text-xl font-black">EMERGENCY PROTOCOL ACTIVE</h2>
              </div>
              <button
                onClick={() => setIsSosActive(false)}
                className="text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30"
              >
                Dismiss Banner
              </button>
            </div>
            <p className="text-sm text-red-100 font-bold">
              {sosDispatched || `Automated SMS with GPS and medical profile sent to ${activeElder.emergencyContactName}.`}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${activeElder.emergencyContactPhone}`}
                className="px-5 py-2.5 bg-white text-red-700 font-black rounded-xl text-sm flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Son Aarav ({activeElder.emergencyContactPhone})</span>
              </a>
              <a
                href={`tel:${activeElder.primaryDoctorPhone}`}
                className="px-5 py-2.5 bg-emerald-500 text-white font-black rounded-xl text-sm flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {activeElder.primaryDoctorName}</span>
              </a>
              <a
                href="tel:102"
                className="px-5 py-2.5 bg-slate-900 text-white font-black rounded-xl text-sm flex items-center gap-2"
              >
                <span>Dial 102 (Ambulance)</span>
              </a>
            </div>
          </div>
        )}

        {/* Primary 1-Tap Emergency SOS Button */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-lg text-center space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-rose-600">
            Emergency Distress Safety Net
          </p>
          <button
            onClick={handleStartSOS}
            disabled={sosCountdown !== null}
            className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white font-black text-xl sm:text-2xl shadow-xl shadow-rose-600/30 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-3"
          >
            <ShieldAlert className="w-8 h-8 animate-pulse" />
            <span>🆘 EMERGENCY SOS / MADAD CHAHIYE</span>
          </button>
          <p className="text-xs text-slate-500 font-semibold">
            One tap dispatches automated SMS alert to Aarav (+91 98765 43210) &amp; Dr. Verma.
          </p>
        </section>

        {/* Daily Medication & Routine Checklist (Large Touch Targets) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-6 h-6 text-teal-600" />
                <span>Aaj Ki Dawaiyan (Daily Medicines)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                Tap the circle when you have taken your medicine.
              </p>
            </div>
            <span className="text-xs font-black bg-teal-100 text-teal-900 px-3 py-1.5 rounded-full">
              {activeElderMedications.filter((m) => m.takenToday).length} / {activeElderMedications.length} Done
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {activeElderMedications.map((med) => (
              <div
                key={med.id}
                onClick={() => toggleMedication(med.id)}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between gap-4 select-none ${
                  med.takenToday
                    ? 'bg-emerald-50/80 border-emerald-300 text-slate-900'
                    : 'bg-slate-50 border-slate-200 hover:border-teal-400 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    aria-label={`Toggle medication ${med.name}`}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition shrink-0 ${
                      med.takenToday
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}
                  >
                    {med.takenToday ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {med.name}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                        {med.dosage}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                      {med.instructions} • <strong className="capitalize text-teal-700">{med.timing}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black ${
                      med.takenToday
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {med.takenToday ? 'Maine Le Li ✅' : 'Baki Hai ⏳'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1-Tap Quick Vitals Check-in Form for Seniors */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600">
              <Activity className="w-4 h-4" />
              <span>Easy Health Check-In</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Apna BP Aur Sugar Darj Karein
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
              Enter the numbers from your home monitor machine. Large text, instant reassurance.
            </p>
          </div>

          {checkInFeedback && (
            <div
              className={`p-4 rounded-2xl border-2 font-bold text-sm ${
                checkInFeedback.status === 'green'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : checkInFeedback.status === 'yellow'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              {checkInFeedback.message}
            </div>
          )}

          <form onSubmit={handleQuickVitalsSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* BP Field */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus-within:border-teal-500 transition">
                <label className="block text-xs font-black text-slate-700 uppercase">
                  Blood Pressure (BP)
                </label>
                <input
                  type="text"
                  placeholder="120/80"
                  value={bpInput}
                  onChange={(e) => setBpInput(e.target.value)}
                  className="w-full bg-transparent text-2xl font-black text-slate-900 focus:outline-none mt-1 placeholder:text-slate-400"
                />
                <span className="text-[11px] text-slate-500 font-semibold">e.g. 118/76 or 130/85</span>
              </div>

              {/* Sugar Field */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus-within:border-teal-500 transition">
                <label className="block text-xs font-black text-slate-700 uppercase">
                  Blood Sugar (Fasting)
                </label>
                <input
                  type="text"
                  placeholder="105"
                  value={sugarInput}
                  onChange={(e) => setSugarInput(e.target.value)}
                  className="w-full bg-transparent text-2xl font-black text-slate-900 focus:outline-none mt-1 placeholder:text-slate-400"
                />
                <span className="text-[11px] text-slate-500 font-semibold">mg/dL (e.g. 95 to 120)</span>
              </div>

              {/* Pulse / Heart Rate */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus-within:border-teal-500 transition">
                <label className="block text-xs font-black text-slate-700 uppercase">
                  Pulse / Heart Rate
                </label>
                <input
                  type="text"
                  placeholder="74"
                  value={pulseInput}
                  onChange={(e) => setPulseInput(e.target.value)}
                  className="w-full bg-transparent text-2xl font-black text-slate-900 focus:outline-none mt-1 placeholder:text-slate-400"
                />
                <span className="text-[11px] text-slate-500 font-semibold">BPM (Normal 60-100)</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-lg shadow-lg shadow-teal-600/20 active:scale-98 transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Save Readings (Record Ho Gaya)</span>
            </button>
          </form>
        </section>

        {/* Recent Vitals & Emergency Contacts Snapshot */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Latest Reading Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-black uppercase text-slate-500">Pichli Reading (Last Check-in)</span>
            {latestVital ? (
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">
                    BP {latestVital.systolic}/{latestVital.diastolic}
                  </span>
                  <span className="text-xs font-bold text-slate-500">mmHg</span>
                </div>
                <p className="text-sm text-slate-600 font-bold">
                  Sugar: <span className="text-teal-700">{latestVital.bloodSugarValue || '--'} mg/dL</span> | Pulse: {latestVital.heartRate || '--'} BPM
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {new Date(latestVital.recordedAt).toLocaleDateString()} at{' '}
                  {new Date(latestVital.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ) : (
              <p className="text-sm font-semibold text-slate-500">Abhi tak koi reading darj nahi hui.</p>
            )}
          </div>

          {/* Quick Doctor & Family Call */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-black uppercase text-slate-500">Zaroori Phone Numbers</span>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${activeElder.emergencyContactPhone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-black text-sm border border-blue-200 transition"
              >
                <span>Aarav (Son)</span>
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> Call
                </span>
              </a>
              <a
                href={`tel:${activeElder.primaryDoctorPhone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-black text-sm border border-emerald-200 transition"
              >
                <span>{activeElder.primaryDoctorName}</span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> Call
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
