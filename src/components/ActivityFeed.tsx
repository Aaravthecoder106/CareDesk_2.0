'use client';

import React from 'react';
import { AuditLogItem } from '@/lib/types';
import {
  Activity,
  AlertTriangle,
  Clock,
  FileText,
  History,
  ShieldAlert,
  Sparkles,
  User,
} from 'lucide-react';

interface ActivityFeedProps {
  logs: AuditLogItem[];
  title?: string;
  limit?: number;
}

export function ActivityFeed({ logs, title = 'Care & Audit Activity Feed', limit }: ActivityFeedProps) {
  const displayLogs = limit ? logs.slice(0, limit) : logs;

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'vitals_logged':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'report_analyzed':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'alert_triggered':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <History className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <History className="w-4 h-4 text-slate-500" />
          <span>{title}</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          {logs.length} logged events
        </span>
      </div>

      <div className="space-y-3">
        {displayLogs.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">No activity recorded yet.</p>
        ) : (
          displayLogs.map((log) => {
            const date = new Date(log.timestamp);
            const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

            return (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-3 transition hover:bg-slate-100/60 dark:hover:bg-slate-800/70"
              >
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                  {getActionIcon(log.actionType)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {log.actorName}
                    </p>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {dateStr} • {timeStr}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {log.description}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
