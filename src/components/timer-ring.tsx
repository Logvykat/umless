"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ── constants ── */
const CX = 170;
const CY = 170;
const R = 125;
const STROKE = 48;
const GAP_DEG = 24;
const START_ANGLE = -90;
const MAX_TIME = 420;

const ZONES = [
  { label: "5:00", from: 0, to: 300, color: "#22c55e", gradEnd: "#84cc16" },
  { label: "6:00", from: 300, to: 360, color: "#eab308", gradEnd: "#facc15" },
  { label: "7:00", from: 360, to: 420, color: "#ef4444", gradEnd: "#f87171" },
];

const totalUsableDeg = 360 - GAP_DEG * 3;
const zoneSpans = ZONES.map((z) => ((z.to - z.from) / MAX_TIME) * totalUsableDeg);

const segStarts: number[] = [];
let cur = START_ANGLE + GAP_DEG / 2;
zoneSpans.forEach((span) => {
  segStarts.push(cur);
  cur += span + GAP_DEG;
});

function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function arcPath(a1: number, a2: number) {
  const x1 = CX + R * Math.cos(toRad(a1));
  const y1 = CY + R * Math.sin(toRad(a1));
  const x2 = CX + R * Math.cos(toRad(a2));
  const y2 = CY + R * Math.sin(toRad(a2));
  return `M ${x1} ${y1} A ${R} ${R} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

/* dot + label positions */
const dotData = ZONES.map((z, i) => {
  const gapCenter = segStarts[i] + zoneSpans[i] + GAP_DEG / 2;
  const dotR = R + 48;
  const labelR = R + 68;
  const rotDeg = gapCenter + 90;
  return {
    cx: CX + dotR * Math.cos(toRad(gapCenter)),
    cy: CY + dotR * Math.sin(toRad(gapCenter)),
    lx: CX + labelR * Math.cos(toRad(gapCenter)),
    ly: CY + labelR * Math.sin(toRad(gapCenter)),
    rot: rotDeg,
    angle: gapCenter,
    label: z.label,
  };
});

/* Dashed arc */
const DASH_R = R + 48;
const DASH_DOT_R = 1.5;
const DASH_SPACING = 3.2;
const dashDots: { cx: number; cy: number }[] = [];
const dashStart = dotData[0].angle;
const dashEnd = dotData[2].angle;
let a = dashStart;
const endNorm = dashEnd < dashStart ? dashEnd + 360 : dashEnd;
while (a <= endNorm) {
  dashDots.push({
    cx: CX + DASH_R * Math.cos(toRad(a)),
    cy: CY + DASH_R * Math.sin(toRad(a)),
  });
  a += DASH_SPACING;
}

export type TimerStatus = "idle" | "running" | "paused";

interface TimerRingProps {
  status: TimerStatus;
  elapsed: number;
  onElapsedChange: (elapsed: number | ((prev: number) => number)) => void;
}

export function TimerRing({ status, elapsed, onElapsedChange }: TimerRingProps) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tick = useCallback(() => onElapsedChange((e: number) => e + 1), [onElapsedChange]);

  useEffect(() => {
    if (status === "running") {
      timerRef.current = setInterval(tick, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, tick]);

  const fills = ZONES.map((z) => {
    if (elapsed <= z.from) return 0;
    if (elapsed >= z.to) return 1;
    return (elapsed - z.from) / (z.to - z.from);
  });

  return (
    <div className="flex items-center justify-center">
      <svg
        width="440"
        height="440"
        viewBox="-30 -30 400 400"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Green zone gradient */}
          <linearGradient
            id="zg0"
            gradientUnits="userSpaceOnUse"
            x1={CX + R * Math.cos(toRad(segStarts[0]))}
            y1={CY + R * Math.sin(toRad(segStarts[0]))}
            x2={CX + R * Math.cos(toRad(segStarts[0] + zoneSpans[0]))}
            y2={CY + R * Math.sin(toRad(segStarts[0] + zoneSpans[0]))}
          >
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="40%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          {/* Yellow zone gradient */}
          <linearGradient
            id="zg1"
            gradientUnits="userSpaceOnUse"
            x1={CX + R * Math.cos(toRad(segStarts[1]))}
            y1={CY + R * Math.sin(toRad(segStarts[1]))}
            x2={CX + R * Math.cos(toRad(segStarts[1] + zoneSpans[1]))}
            y2={CY + R * Math.sin(toRad(segStarts[1] + zoneSpans[1]))}
          >
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          {/* Red zone gradient */}
          <linearGradient
            id="zg2"
            gradientUnits="userSpaceOnUse"
            x1={CX + R * Math.cos(toRad(segStarts[2]))}
            y1={CY + R * Math.sin(toRad(segStarts[2]))}
            x2={CX + R * Math.cos(toRad(segStarts[2] + zoneSpans[2]))}
            y2={CY + R * Math.sin(toRad(segStarts[2] + zoneSpans[2]))}
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        {/* Track segments (inactive) */}
        {zoneSpans.map((span, i) => (
          <path
            key={`t${i}`}
            d={arcPath(segStarts[i], segStarts[i] + span)}
            fill="none"
            stroke="rgba(57, 60, 60, 0.12)"
            strokeWidth={STROKE}
            strokeLinecap="butt"
          />
        ))}

        {/* Filled progress */}
        {zoneSpans.map((span, i) => {
          if (fills[i] <= 0) return null;
          const a1 = segStarts[i];
          const a2 = a1 + Math.max(span * fills[i], 2);
          return (
            <path
              key={`f${i}`}
              d={arcPath(a1, a2)}
              fill="none"
              stroke={`url(#zg${i})`}
              strokeWidth={STROKE}
              strokeLinecap="butt"
            />
          );
        })}

        {/* Dashed arc */}
        {dashDots.map((d, i) => (
          <circle
            key={`dash${i}`}
            cx={d.cx}
            cy={d.cy}
            r={DASH_DOT_R}
            fill="#393C3C"
          />
        ))}

        {/* Dot markers + time labels */}
        {dotData.map((m, i) => (
          <g key={`d${i}`}>
            <circle cx={m.cx} cy={m.cy} r={4} fill="#393C3C" />
            <text
              x={m.lx}
              y={m.ly}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${m.rot}, ${m.lx}, ${m.ly})`}
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                fill: "#393C3C",
              }}
            >
              {m.label}
            </text>
          </g>
        ))}

        {/* Timer text — stays #393C3C always */}
        <text
          x={CX}
          y={CY + 2}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontWeight: 600,
            fontSize: 48,
            fill: "#393C3C",
            letterSpacing: "-1.5px",
          }}
        >
          {fmt(elapsed)}
        </text>
      </svg>
    </div>
  );
}
