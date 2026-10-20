'use client';

import React, { useMemo, useState } from 'react';
import { VitalReading } from '@/lib/types';
import { TrafficLightBadge } from './TrafficLightBadge';
import { Activity, Calendar, Heart, TrendingUp } from 'lucide-react';

interface VitalsChartProps {
  vitals: VitalReading[];
}

export function VitalsChart({ vitals }: VitalsChartProps) {
  const [metric, setMetric] = useState<'bp' | 'glucose'>('bp');
  const [timeframe, setTimeframe] = useState<7 | 14 | 30>(14);
  const [hoveredPoint, setHoveredPoint] = useState<VitalReading | null>(null);

  // Filter and sort chronologically (oldest to newest for graphing)
  const chartData = useMemo(() => {
    const sorted = [...vitals].sort(
      (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
    );

    // Limit to requested timeframe relative to latest recorded reading
    if (sorted.length === 0) return [];
    const latestTimestamp = new Date(sorted[sorted.length - 1].recordedAt).getTime();
    const cutoffTime = latestTimestamp - timeframe * 24 * 60 * 60 * 1000;
    const filtered = sorted.filter((v) => new Date(v.recordedAt).getTime() >= cutoffTime);
    return filtered.length > 0 ? filtered : sorted.slice(-7);
  }, [vitals, timeframe]);

  // Dimensions
  const width = 640;
  const height = 240;
  const padding = { top: 25, right: 30, bottom: 40, left: 50 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Compute scales based on selected metric
  const { minVal, maxVal, getY, pointsSys, pointsDia, pointsSugar } = useMemo(() => {
    let min = 50;
    let max = 180;

    if (metric === 'glucose') {
      min = 60;
      max = 240;
    }

    const getYCoord = (val: number) => {
      const clamped = Math.max(min, Math.min(max, val));
      const ratio = (clamped - min) / (max - min);
      return padding.top + plotHeight - ratio * plotHeight;
    };

    const getXCoord = (index: number, total: number) => {
      if (total <= 1) return padding.left + plotWidth / 2;
      return padding.left + (index / (total - 1)) * plotWidth;
    };

    const sysPoints: { x: number; y: number; reading: VitalReading }[] = [];
    const diaPoints: { x: number; y: number; reading: VitalReading }[] = [];
    const sugarPoints: { x: number; y: number; reading: VitalReading }[] = [];

    chartData.forEach((d, idx) => {
      const x = getXCoord(idx, chartData.length);
      if (d.systolic !== undefined) {
        sysPoints.push({ x, y: getYCoord(d.systolic), reading: d });
      }
      if (d.diastolic !== undefined) {
        diaPoints.push({ x, y: getYCoord(d.diastolic), reading: d });
      }
      if (d.bloodSugarValue !== undefined) {
        sugarPoints.push({ x, y: getYCoord(d.bloodSugarValue), reading: d });
      }
    });

    return {
      minVal: min,
      maxVal: max,
      getY: getYCoord,
      pointsSys: sysPoints,
      pointsDia: diaPoints,
      pointsSugar: sugarPoints,
    };
  }, [metric, chartData, plotWidth, plotHeight, padding.top, padding.left]);

  const makePath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    return points.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  };

  const sysPath = makePath(pointsSys);
  const diaPath = makePath(pointsDia);
  const sugarPath = makePath(pointsSugar);

  // Normal safe corridor
  const normalRangeTop = metric === 'bp' ? getY(120) : getY(140);
  const normalRangeBottom = metric === 'bp' ? getY(80) : getY(70);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      {/* Controls & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-600 dark:text-blue-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Vitals Trend Analytics</span>
              <span className="text-xs font-normal text-slate-500">
                ({chartData.length} records)
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Deterministic tracking against clinical guideline corridors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-start">
          {/* Metric Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setMetric('bp')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                metric === 'bp'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Blood Pressure</span>
            </button>
            <button
              onClick={() => setMetric('glucose')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                metric === 'glucose'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-amber-500" />
              <span>Blood Sugar</span>
            </button>
          </div>

          {/* Timeframe Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
            {([7, 14, 30] as const).map((days) => (
              <button
                key={days}
                onClick={() => setTimeframe(days)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  timeframe === days
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[500px] select-none"
        >
          {/* Shaded Normal Safe Zone Band */}
          <rect
            x={padding.left}
            y={normalRangeTop}
            width={plotWidth}
            height={Math.abs(normalRangeBottom - normalRangeTop)}
            fill="#10b981"
            fillOpacity="0.08"
            rx="4"
          />
          <text
            x={width - padding.right - 6}
            y={normalRangeTop + 13}
            textAnchor="end"
            fontSize="10"
            fill="#10b981"
            fontWeight="bold"
          >
            {metric === 'bp' ? 'Optimal Zone (80-120)' : 'Optimal Target (70-140)'}
          </text>

          {/* Grid lines & Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const val = Math.round(minVal + pct * (maxVal - minVal));
            const y = getY(val);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                  className="dark:stroke-slate-800"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Metric Lines */}
          {metric === 'bp' ? (
            <>
              {/* Systolic Line */}
              <path
                d={sysPath}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Diastolic Line */}
              <path
                d={diaPath}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {pointsSys.map((p, idx) => (
                <circle
                  key={`sys-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint?.id === p.reading.id ? 6 : 4}
                  fill="#ffffff"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all hover:scale-125"
                  onMouseEnter={() => setHoveredPoint(p.reading)}
                />
              ))}

              {pointsDia.map((p, idx) => (
                <circle
                  key={`dia-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint?.id === p.reading.id ? 6 : 4}
                  fill="#ffffff"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all hover:scale-125"
                  onMouseEnter={() => setHoveredPoint(p.reading)}
                />
              ))}
            </>
          ) : (
            <>
              {/* Blood Sugar Line */}
              <path
                d={sugarPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {pointsSugar.map((p, idx) => (
                <circle
                  key={`sugar-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint?.id === p.reading.id ? 6 : 4.5}
                  fill="#ffffff"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all hover:scale-125"
                  onMouseEnter={() => setHoveredPoint(p.reading)}
                />
              ))}
            </>
          )}

          {/* X Axis Dates */}
          {chartData.map((d, idx) => {
            if (chartData.length > 8 && idx % 2 !== 0 && idx !== chartData.length - 1) return null;
            const x =
              chartData.length <= 1
                ? padding.left + plotWidth / 2
                : padding.left + (idx / (chartData.length - 1)) * plotWidth;
            const dateStr = new Date(d.recordedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
            return (
              <text
                key={idx}
                x={x}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                {dateStr}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend & Hover Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        {/* Legend */}
        <div className="flex items-center gap-4">
          {metric === 'bp' ? (
            <>
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span>Systolic (mmHg)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Diastolic (mmHg)</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Blood Glucose (mg/dL)</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" />
            <span>Target Safe Corridor</span>
          </div>
        </div>

        {/* Selected / Hovered tooltip summary */}
        {hoveredPoint ? (
          <div className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">
              {new Date(hoveredPoint.recordedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
              :
            </span>
            {metric === 'bp' && hoveredPoint.systolic && (
              <span>
                BP {hoveredPoint.systolic}/{hoveredPoint.diastolic} mmHg
              </span>
            )}
            {metric === 'glucose' && hoveredPoint.bloodSugarValue && (
              <span>
                Sugar {hoveredPoint.bloodSugarValue} mg/dL ({hoveredPoint.bloodSugarType})
              </span>
            )}
            <TrafficLightBadge status={hoveredPoint.overallStatus} size="sm" showLabel={false} />
          </div>
        ) : (
          <span className="text-slate-400 italic">Hover any node to inspect exact reading</span>
        )}
      </div>
    </div>
  );
}
