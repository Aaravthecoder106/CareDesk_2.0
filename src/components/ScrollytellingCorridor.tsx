'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Activity,
  Heart,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Compass,
  Radio,
  Volume2,
  AlertOctagon,
  Users,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { UserRole } from '@/context/CareContext';

interface ScrollytellingCorridorProps {
  onOpenSignup: (role?: UserRole) => void;
}

interface CorridorStage {
  id: string;
  stepNumber: string;
  badge: string;
  badgeColor: string;
  title: string;
  headline: string;
  description: string;
  telemetryMetric: string;
  telemetryLabel: string;
  statusText: string;
  statusType: 'green' | 'amber' | 'red' | 'ai';
  hinglishQuote?: string;
  systemAction: string;
}

const STAGES: CorridorStage[] = [
  {
    id: 'stage-green',
    stepNumber: '01',
    badge: 'STAGE I • DETERMINISTIC BASELINE',
    badgeColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
    title: 'Peace of Mind in the Safe Zone',
    headline: 'Continuous Baseline Telemetry',
    description:
      'Every morning, your parent logs their vitals via a 1-tap WhatsApp message or home cuff. Mathematical boundaries verify systolic, diastolic, and sugar readings against strict clinical corridors with zero hallucination.',
    telemetryMetric: '118/78 mmHg',
    telemetryLabel: 'Fasting Sugar: 96 mg/dL • SpO2: 98%',
    statusText: 'Optimal Corridor • Routine Sync',
    statusType: 'green',
    systemAction: 'Logged to Immutable Audit Trail • Next reminder: 8:00 PM',
  },
  {
    id: 'stage-amber',
    stepNumber: '02',
    badge: 'STAGE II • PROACTIVE TRIAGE',
    badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
    title: 'Mild Elevation Caught Before Symptoms',
    headline: 'Deterministic Early Caution',
    description:
      'When blood pressure nudges past baseline into the yellow corridor, CareDesk never sounds a panic alarm. It gently prompts a hydration check, reminds the elder about afternoon medication, and flags an unobtrusive digest for the family caregiver.',
    telemetryMetric: '128/82 mmHg',
    telemetryLabel: 'Pulse: 76 bpm • +8 mmHg above 30-day median',
    statusText: 'Caution Corridor • Re-check Prompted',
    statusType: 'amber',
    systemAction: 'Gentle hydration check triggered • Caregiver silent notification logged',
  },
  {
    id: 'stage-red',
    stepNumber: '03',
    badge: 'STAGE III • AUTONOMOUS EMERGENCY DISPATCH',
    badgeColor: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
    title: 'Instant Action Across 2,000 Kilometers',
    headline: 'Critical Threshold Emergency SOS',
    description:
      'If blood pressure spikes past emergency boundaries (e.g. 162/98) or the senior taps the big SOS button, CareDesk bypasses chat queues. In under 1.8 seconds, automated SMS alerts with GPS and medical profiles are dispatched to sons, daughters, and emergency doctors.',
    telemetryMetric: '162/98 mmHg',
    telemetryLabel: 'EMERGENCY PROTOCOL EXECUTED IN 1.8s',
    statusText: 'Critical Corridor • Active SOS Alert',
    statusType: 'red',
    systemAction: 'SMS sent to Aarav (+91 98111 22334) • Dr. Verma hotline auto-connected',
  },
  {
    id: 'stage-ai',
    stepNumber: '04',
    badge: 'STAGE IV • BILINGUAL EMPATHY BRIDGE',
    badgeColor: 'text-sky-400 border-sky-500/40 bg-sky-950/40',
    title: 'Warm Human Dignity Meets Gemini 2.5',
    headline: 'Medical Jargon Translated to Care',
    description:
      'Dense hospital printouts with terrifying words like "Hypercholesterolemia" or "Ischemic ST Depression" are translated into respectful, comforting Hinglish that elders trust, while formulating crisp clinical questions for the physician.',
    telemetryMetric: 'HbA1c 6.8%',
    telemetryLabel: 'LDL 138 mg/dL • Lipid Panel Analyzed',
    statusText: 'Gemini 2.5 Empathy Synthesis Active',
    statusType: 'ai',
    hinglishQuote:
      '"Namaste Ramesh ji, aapka sugar control mein hai. Subah ki 20-minute walk jaari rakhein aur thoda ghee kam karein."',
    systemAction: 'Audio synthesis generated • 4 physician appointment questions prepared',
  },
];

export function ScrollytellingCorridor({ onOpenSignup }: ScrollytellingCorridorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Monitor scroll progress relative to this pinned section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Distance from top of container to top of viewport
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // Determine active stage based on progress (4 equal intervals)
      const stageIdx = Math.min(Math.floor(progress * STAGES.length), STAGES.length - 1);
      setActiveStageIndex(stageIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas visual rendering with particles, glowing rings, and morphing cardiac corridor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Handle high DPI
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle nodes for cosmic telemetry field
    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.001,
      speedY: (Math.random() - 0.5) * 0.001,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Interpolate colors based on activeStageIndex
      let coreColor = 'rgba(16, 185, 129, 0.8)'; // green
      let glowColor = 'rgba(16, 185, 129, 0.15)';
      let pulseSpeed = 1.5;

      if (activeStageIndex === 1) {
        coreColor = 'rgba(245, 158, 11, 0.85)'; // amber
        glowColor = 'rgba(245, 158, 11, 0.2)';
        pulseSpeed = 2.2;
      } else if (activeStageIndex === 2) {
        coreColor = 'rgba(239, 68, 68, 0.9)'; // red
        glowColor = 'rgba(239, 68, 68, 0.25)';
        pulseSpeed = 3.5;
      } else if (activeStageIndex === 3) {
        coreColor = 'rgba(56, 189, 248, 0.85)'; // sky / gemini blue
        glowColor = 'rgba(147, 197, 253, 0.2)';
        pulseSpeed = 1.8;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.28;

      // Draw background ambient starfield
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (0.4 + Math.sin(time + p.x * 10) * 0.2)})`;
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Outer Volumetric Aura
      const auraGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        baseRadius * 0.4,
        centerX,
        centerY,
        baseRadius * 1.8
      );
      auraGradient.addColorStop(0, glowColor);
      auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Orbital Concentric Rings (Rotating Gyroscope Effect)
      for (let i = 0; i < 3; i++) {
        const ringRadius = baseRadius * (0.85 + i * 0.22);
        const rotation = time * 0.5 * (i % 2 === 0 ? 1 : -1) + (scrollProgress * Math.PI * 2);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, ringRadius, ringRadius * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle =
          i === 0
            ? coreColor
            : `rgba(255, 255, 255, ${0.12 - i * 0.03})`;
        ctx.lineWidth = i === 0 ? 1.5 : 1;
        ctx.setLineDash(i === 1 ? [6, 8] : i === 2 ? [3, 6] : []);
        ctx.stroke();

        // Orbiting Beacon node on first ring
        if (i === 0) {
          const beaconAngle = time * pulseSpeed;
          const beaconX = Math.cos(beaconAngle) * ringRadius;
          const beaconY = Math.sin(beaconAngle) * (ringRadius * 0.6);
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(beaconX, beaconY, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = coreColor;
          ctx.beginPath();
          ctx.arc(beaconX, beaconY, 9, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Core Luminous Pulsing Telemetry Orb
      const currentRadius =
        baseRadius * 0.65 + Math.sin(time * pulseSpeed) * (baseRadius * 0.04);
      const coreGradient = ctx.createRadialGradient(
        centerX - currentRadius * 0.3,
        centerY - currentRadius * 0.3,
        currentRadius * 0.1,
        centerX,
        centerY,
        currentRadius
      );
      coreGradient.addColorStop(0, '#ffffff');
      coreGradient.addColorStop(0.35, coreColor);
      coreGradient.addColorStop(0.85, 'rgba(15, 23, 42, 0.95)');
      coreGradient.addColorStop(1, 'rgba(2, 6, 23, 0)');

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Holographic Scanlines / Grid Overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      const scanStep = 20;
      for (let y = centerY - currentRadius; y <= centerY + currentRadius; y += scanStep) {
        const dx = Math.sqrt(Math.max(0, currentRadius * currentRadius - (y - centerY) * (y - centerY)));
        ctx.beginPath();
        ctx.moveTo(centerX - dx, y);
        ctx.lineTo(centerX + dx, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeStageIndex, scrollProgress]);

  const activeStage = STAGES[activeStageIndex];

  return (
    <section
      id="corridor"
      ref={containerRef}
      className="relative w-full bg-[#030712] text-white select-none"
      style={{ height: '400vh' }}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-12 z-20">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Top HUD Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-30">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/90">
                TERAFAB-SCALE CLINICAL TELEMETRY
              </span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="text-xs text-white/60 font-mono hidden sm:inline">
                SCROLL TO TRAVERSE CORRIDOR
              </span>
            </div>
          </div>

          {/* Quick Stage Jump Buttons */}
          <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-xl">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  if (!containerRef.current) return;
                  const targetScroll =
                    containerRef.current.offsetTop +
                    (idx / STAGES.length) * (containerRef.current.offsetHeight - window.innerHeight);
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                  activeStageIndex === idx
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{s.stepNumber}</span>
                <span className="hidden md:inline capitalize">
                  {s.id.replace('stage-', '')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Main Split: Scrollytelling Narrative (Left) + Interactive Reactor Canvas (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto relative z-30">
          {/* Left Narrative Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-500 shadow-lg">
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  activeStage.statusType === 'green'
                    ? 'bg-emerald-400'
                    : activeStage.statusType === 'amber'
                    ? 'bg-amber-400'
                    : activeStage.statusType === 'red'
                    ? 'bg-rose-500'
                    : 'bg-sky-400'
                }`}
              />
              <span className={activeStage.badgeColor}>{activeStage.badge}</span>
            </div>

            {/* Giant Display Headline with Scroll-driven illumination */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-sans">
                {activeStage.headline}
              </h2>
              <p className="text-base sm:text-xl font-bold text-sky-200/90 font-sans">
                {activeStage.title}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              {activeStage.description}
            </p>

            {/* Stage Special Audio / Hinglish Quote Card if Stage 4 */}
            {activeStage.hinglishQuote && (
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                  <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" />
                  <span>Gemini Voice &amp; Tone Synthesis</span>
                </div>
                <p className="text-xs sm:text-sm text-sky-100 italic leading-relaxed">
                  {activeStage.hinglishQuote}
                </p>
              </div>
            )}

            {/* Action Card with Live Metric */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                  REAL-TIME TELEMETRY BUFFER
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                    activeStage.statusType === 'green'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : activeStage.statusType === 'amber'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : activeStage.statusType === 'red'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  }`}
                >
                  {activeStage.statusText}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                  {activeStage.telemetryMetric}
                </span>
                <span className="text-xs font-mono text-white/70">
                  {activeStage.telemetryLabel}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/80 pt-1 font-mono">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{activeStage.systemAction}</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex items-center gap-4 pt-1">
              <button
                onClick={() => onOpenSignup('caregiver')}
                className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-extrabold text-sm flex items-center gap-2 hover:bg-slate-100 transition shadow-xl"
              >
                <span>Protect Your Family Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/dashboard"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition"
              >
                Launch Live Sandbox
              </Link>
            </div>
          </div>

          {/* Right Visual Reactor Column (6 cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[360px] sm:min-h-[460px] lg:min-h-[540px]">
            {/* HTML5 Canvas Render Layer */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded-3xl pointer-events-none"
            />

            {/* Overlaid Floating Dynamic Hud Hologram Card */}
            <div className="relative z-10 w-full max-w-md p-6 rounded-3xl bg-slate-950/75 backdrop-blur-2xl border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      Ramesh Sharma (Father)
                    </span>
                    <span className="text-[10px] text-white/50 font-mono">
                      Telemetry Node #CD-9942 • 68 yrs
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400 block">
                    SYNCED
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">2,000 km link</span>
                </div>
              </div>

              {/* Live Waveform graphic inside hologram */}
              <div className="bg-black/60 rounded-xl p-3 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/60 mb-1">
                  <span>CARDIAC RHYTHM</span>
                  <span className="text-white/90 font-bold">72 BPM</span>
                </div>
                <div className="h-10 w-full relative flex items-center">
                  <svg className="w-full h-full" viewBox="0 0 300 40" preserveAspectRatio="none">
                    <path
                      d="M 0 20 L 50 20 L 60 10 L 70 30 L 80 5 L 90 35 L 100 20 L 170 20 L 180 12 L 190 28 L 200 20 L 300 20"
                      fill="none"
                      stroke={
                        activeStage.statusType === 'green'
                          ? '#10b981'
                          : activeStage.statusType === 'amber'
                          ? '#f59e0b'
                          : activeStage.statusType === 'red'
                          ? '#ef4444'
                          : '#38bdf8'
                      }
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-ecg"
                    />
                  </svg>
                </div>
              </div>

              {/* Comparative Hardware / Ecosystem Metric */}
              <div className="grid grid-cols-2 gap-2 text-center pt-1 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">AUDIT SHA-256</span>
                  <span className="font-bold text-white truncate block">0x89e2...c41a</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block">ALERT LATENCY</span>
                  <span className="font-bold text-emerald-400 block">&lt; 1.8 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Progress Bar */}
        <div className="space-y-2 border-t border-white/10 pt-4 relative z-30">
          <div className="flex items-center justify-between text-xs font-mono text-white/60">
            <span>CORRIDOR TRAVERSAL</span>
            <span>{Math.round(scrollProgress * 100)}% COMPLETE</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 via-rose-500 to-sky-400 transition-all duration-150"
              style={{ width: `${Math.max(scrollProgress * 100, 3)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
