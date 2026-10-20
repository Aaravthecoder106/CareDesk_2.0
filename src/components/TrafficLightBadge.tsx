import React from 'react';
import { StatusLevel } from '@/lib/types';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TrafficLightBadgeProps {
  status: StatusLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelOverride?: string;
  className?: string;
}

export function TrafficLightBadge({
  status,
  size = 'md',
  showLabel = true,
  labelOverride,
  className = '',
}: TrafficLightBadgeProps) {
  const config = {
    green: {
      label: 'Optimal (Safe)',
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
      dot: 'bg-emerald-500 shadow-emerald-500/40',
      icon: CheckCircle2,
      pulse: false,
    },
    yellow: {
      label: 'Attention Needed',
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400',
      dot: 'bg-amber-500 shadow-amber-500/40',
      icon: AlertTriangle,
      pulse: true,
    },
    red: {
      label: 'Critical / Review',
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400',
      dot: 'bg-rose-500 shadow-rose-500/40',
      icon: ShieldAlert,
      pulse: true,
    },
  }[status] || {
    label: 'Unknown',
    bg: 'bg-slate-100 border-slate-300 text-slate-600',
    dot: 'bg-slate-400',
    icon: CheckCircle2,
    pulse: false,
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs md:text-sm px-2.5 py-1 gap-2',
    lg: 'text-sm md:text-base px-3.5 py-1.5 gap-2.5 font-medium',
  }[size];

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium transition-all ${config.bg} ${sizeClasses} ${className}`}
    >
      <span className="relative flex items-center justify-center">
        {config.pulse && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${dotSizes} ${config.dot}`} />
      </span>
      {showLabel && <span>{labelOverride || config.label}</span>}
    </span>
  );
}
